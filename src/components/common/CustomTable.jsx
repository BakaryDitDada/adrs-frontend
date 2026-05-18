import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Check, Download, Edit, Eye, Trash } from 'lucide-react';

import { selectCurrentUser } from '@/store/features/auth/authSlice';
import { exportPDF, exportExcel } from '@/utils/exportFile';
import { formatDate, isItemChecked } from '@/utils';

import {
  TableContainer,
  TableHeader,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableCellTh,
  TableRow,
  DashSearchInput,
  TableFooter,
  TableCheckbox,
  OutlineButton as Button,
} from './Common.styles';

import Pagination from './CustomPagination';
import Loading from './Loading';
import RowActions from './RowActions';

const normalizeLimit = (value, fallback = 1) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) return fallback;
  return parsed;
};

const getRowKey = (item, index) =>
  item?._id ?? item?.slug ?? item?.employeeId?._id ?? `${index}`;

const getDisplayName = (item) =>
  [
    item?.employee?.first_name ?? item?.employeeId?.firstName ?? '',
    item?.employee?.last_name ?? item?.employeeId?.lastName ?? '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

const CustomTable = memo(function CustomTable({
  data = [],
  filteredData = {},
  pages = 1,
  page = 1,
  setPage,
  onSearch,
  limit = 10,
  setLimit,
  pagesArray = [],
  checker = true,
  tableData = [],
  checkedItems = [],
  allItemsChecked = [],
  handleAllItemsChecked,
  toggleItemsChecked,
  handleDelete,
  handleApprove,
  handleDeleteMany,
  onEdit,
  onAddNew, // kept for API compatibility; currently unused
  displayActionIcons = { add: true, delete: true, view: false, approve: false },
  isId = true,
  isSuccess = true,
  isLoading = false,
  exportedFileName = '',
  additionalToolbarButtons = null,
}) {
  const user = useSelector(selectCurrentUser);

  const [term, setTerm] = useState('');
  const [localLimit, setLocalLimit] = useState(limit);
  const router = useRouter();
  let content = null;

  const items = Array.isArray(data) ? data : [];
  const pdfRows = useMemo(() => Array.isArray(filteredData?.pdf) ? filteredData.pdf : [], [filteredData?.pdf]);
  const excelRows = useMemo(() =>Array.isArray(filteredData?.excel) ? filteredData.excel : [], [filteredData?.excel]);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    setLocalLimit(limit);
  }, [limit]);

  const canManageItem = useCallback(
    (item) => {
      if (isAdmin) return true;

      const userServiceNumber = user?.service_number;
      const itemServiceNumber =
        item?.employee?.service_number ?? item?.employeeId?.service_number;

      return Boolean(userServiceNumber && itemServiceNumber && userServiceNumber === itemServiceNumber);
    },
    [isAdmin, user]
  );

  const handleSearch = useCallback(
    (value) => {
      setTerm(value);
      onSearch?.(value);
    },
    [onSearch]
  );

  const handleLimitBlur = useCallback(() => {
    const normalized = normalizeLimit(localLimit, limit);
    setLocalLimit(normalized);

    if (normalized !== limit) {
      setLimit?.(normalized);
    }
  }, [localLimit, limit, setLimit]);

  const handleLimitKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  }, []);

  const handleEdit = useCallback(
    (item) => {
      if (!onEdit) return;
      onEdit(isId ? item?._id || item?.id : item?.slug);
    },
    [isId, onEdit]
  );

  const canShowBulkDelete = checkedItems.length > 1 || (checkedItems.length === items.length && items.length > 0);

  const canExport = pdfRows.length > 0 && excelRows.length > 0;

  const renderCell = useCallback(
    (column, item, index) => {
      const rowKey = getRowKey(item, index);

      if (column.badge === 'actions') {
        const actions = [];

        const canManage = canManageItem(item);

        if (
          displayActionIcons?.edit !== false &&
          canManage
        ) {
          actions.push({
            key: 'edit',
            label: 'Modifier',
            icon: Edit,
            variant: 'green',
            onClick: () => handleEdit(item),
          });
        }

        if (
          displayActionIcons?.approve !== false &&
          canManage 
        ) {
          actions.push({
            key: 'approve',
            label: 'Approuver',
            icon: Check,
            variant: 'blue',
            onClick: () => 
              handleApprove?.(
                isId
                  ? item?._id || item?.id
                  : item?.slug
              ),
          });
        }

        if (
          displayActionIcons?.view !== false &&
          canManage
        ) {
          actions.push({
            key: 'view',
            label: 'Détail',
            icon: Eye,
            variant: 'blue',
            onClick: () => router.push(isId ? `/tasks/${item?._id || item?.id}` : `/tasks/${item?.slug}`)
              // handleView?.(
              //   isId
              //     ? item?._id || item?.id
              //     : item?.slug
              // ),
          });
        }

        if (
          displayActionIcons?.delete !== false &&
          canManage
        ) {
          actions.push({
            key: 'delete',
            label: 'Supprimer',
            icon: Trash,
            variant: 'red',
            onClick: () =>
              handleDelete?.(
                isId
                  ? item?._id || item?.id
                  : item?.slug
              ),
          });
        }

        return (
          <TableCell key={`${rowKey}-actions`}>
            <RowActions
              actions={actions}
              mode={column.actionsDisplayMode || 'auto'}
            />
          </TableCell>
        );
            
        // return (
        //   <TableCell key={`${rowKey}-actions`}>
        //     <div className="actions__icons">
        //       {(displayActionIcons?.edit !== false) && canManageItem(item) && (
        //         <button
        //           type="button"
        //           className="icon-button"
        //           aria-label="Edit row"
        //           onClick={() => handleEdit(item)}
        //         >
        //           <Edit className="icon green" />
        //         </button>
        //       )}

        //       {(displayActionIcons?.delete !== false) && canManageItem(item) && (
        //         <button
        //           type="button"
        //           className="icon-button"
        //           aria-label="Delete row"
        //           onClick={() => handleDelete?.(isId ? item?._id || item?.id : item?.slug)}
        //         >
        //           <Trash className="icon red" />
        //         </button>
        //       )}
        //     </div>
        //   </TableCell>
        // );
      }

      if (typeof column.cellRenderer === 'function') {
        const cellValue = column.field ? item?.[column.field] : null;

        return (
          <TableCell key={`${rowKey}-${column.field ?? index}`}>
            <div className="td-wrapper">{column.cellRenderer(cellValue, item)}</div>
          </TableCell>
        );
      }

      if (column.type === 'date') {
        return (
          <TableCell key={`${rowKey}-${column.field ?? index}`}>
            <div className="td-wrapper">{formatDate(item?.[column.field])}</div>
          </TableCell>
        );
      }

      if (column.field === 'employee' || column.field === 'employeeId') {
        
        return (
          <TableCell key={`${rowKey}-${column.field ?? index}`}>
            <div className="td-wrapper">{getDisplayName(item)}</div>
          </TableCell>
        );
      }

      const rawValue =
        column.field === 'postedBy' || column.field === 'orderedBy'
          ? item?.[column.field]?.username
          : item?.[column.field];

      return (
        <TableCell key={`${rowKey}-${column.field ?? index}`}>
          <div className="td-wrapper">{rawValue ?? '-'}</div>
        </TableCell>
      );
    },
    [canManageItem, displayActionIcons, handleDelete, handleEdit, isId]
  );

  const renderExportButtons = useMemo(() => {
    if (!canExport) return null;

    return (
      <>
        <Button type="button" onClick={() => exportPDF(pdfRows, exportedFileName)}>
          <Download size={20} />
          PDF
        </Button>

        <Button type="button" onClick={() => exportExcel(excelRows, exportedFileName)}>
          <Download size={20} />
          EXCEL
        </Button>
      </>
    );
  }, [canExport, excelRows, exportedFileName, pdfRows]);

  if(isLoading) content = <Loading height="30rem" iconSize="4rem" />;
  if(isSuccess) content = (
    <TableContainer>
      <TableHeader>
        <DashSearchInput
          placeholder="Rechercher..."
          value={term}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div className="btn__container">
          {renderExportButtons}

          {additionalToolbarButtons}
          {canShowBulkDelete ? (
            <Button
              type="button"
              style={{ borderColor: 'red', color: 'red' }}
              onClick={() => handleDeleteMany?.(checkedItems)}
            >
              Tout supprimer
            </Button>
          ) : null}
        </div>
      </TableHeader>

      {isSuccess ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                {checker && (
                  <TableCellTh>
                    <TableCheckbox
                      id="select-all-rows"
                      type="checkbox"
                      className={
                        checkedItems.length > 0 && checkedItems.length < items.length
                          ? 'checkbox__multi-checked-status'
                          : ''
                      }
                      checked={items.length > 0 && checkedItems.length === items.length}
                      onChange={() => handleAllItemsChecked?.(items)}
                    />
                  </TableCellTh>
                )}

                {tableData.map((column, index) => (
                  <TableCellTh key={column.field ?? column.header ?? index}>
                    {column.header}
                  </TableCellTh>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item, index) => {
                const rowKey = getRowKey(item, index);

                return (
                  <TableRow key={rowKey}>
                    {checker && (
                      <TableCell>
                        <TableCheckbox
                          id={`row-checkbox-${rowKey}`}
                          type="checkbox"
                          checked={isItemChecked(checkedItems, item?._id)}
                          onChange={() => toggleItemsChecked?.(item?._id)}
                        />
                      </TableCell>
                    )}

                    {tableData.map((column, columnIndex) => renderCell(column, item, columnIndex))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <TableFooter>
            <span style={{ marginLeft: "1.5rem" }}>
              Page {page} of {pages}
            </span>

            <input
              className="table-footer__input"
              type="number"
              min={1}
              value={localLimit}
              onChange={(e) => setLocalLimit(e.target.value)}
              onBlur={handleLimitBlur}
              onKeyDown={handleLimitKeyDown}
            />

            <Pagination pagesArray={pagesArray} page={page} pages={pages} setPage={setPage} />
          </TableFooter>
        </>
      ) : (
        <Loading height="30rem" iconSize="4rem" />
      )}
    </TableContainer>
  )

  return (
    <>{content}</>
  );
});

export default CustomTable;
