import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/store/features/auth/authSlice';
import { exportPDF, exportExcel } from "@/utils/exportFile";
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
  TableCheckbox
} from './Common.styles';
// import { PrimaryButton as Button } from './Common.styles';
import { OutlineButton as Button } from './Common.styles';
import Pagination from "./CustomPagination";
import { Download, Edit, Trash, Eye, User as UserIcon } from 'lucide-react';

import { areArraysEqual, formatDate, isItemChecked } from '@/utils';
import Loading from './Loading';
 
const CustomTable = ({
  data,
  filteredData,
  pages,
  page,
  setPage,
  onSearch,
  limit,
  setLimit,
  pagesArray,
  checker = true,
  tableData,
  checkedItems,
  allItemsChecked,
  handleAllItemsChecked,
  toggleItemsChecked,
  handleDelete,
  handleDeleteMany,
  onEdit,
  onAddNew,
  displayActionIcons = {add: true, delete: true, view: true},
  isId = false,
  isSuccess,
  exportedFileName = "",
  additionalToolbarButtons = null,
}) => { 
 
  const [term, setTerm] = useState('');
  const user = useSelector(selectCurrentUser);
  const [localLimit, setLocalLimit] = useState(limit);

  console.log("Table Data (CustomTable) ::: ", tableData);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setLocalLimit(limit);
  }, [limit]);

  const handleLimitBlur = () => {
    let newLimit = parseInt(localLimit, 10);
    if (isNaN(newLimit) || newLimit < 1) newLimit = 1;
    if (newLimit !== limit) setLimit(newLimit);
  };

  const handleLimitKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); // triggers onBlur
    }
  };

  const handleSearch = (value) => {
    setTerm(value);
    onSearch(value);
  }

  const handleEdit = (item) => {
    if(isId === true) {
      onEdit(item._id);
    } else {
      onEdit(item.slug);
    }
  }

  const renderContent = (value, item, index) => {
    // 1. Actions column
    if (value.badge === "actions") {
      return (
        <TableCell key={item._id + index + 3}>
          <div className="actions__icons">
            {(isAdmin || (user?.service_number === item?.employee?.service_number)) &&
              <Edit className="icon green" title="Edit" onClick={() => handleEdit(item)} />
            }
            {(isAdmin || (user?.service_number === item?.employee?.service_number)) &&
              <Trash className="icon red" title={`Delete ${item.shortcut}`} onClick={() => handleDelete(isId ? item._id : item.slug)} />
            }
            {/* {displayActionIcons.view && (
              <Eye className="icon gray" title="Detail" onClick={() => router.push(`/dashboard/employees/${item.slug}`)}/>
            )} */}
          </div>
        </TableCell>
      );
    }

    // 2. Custom cell renderer (new)
    if (value.cellRenderer && typeof value.cellRenderer === 'function') {
      const cellValue = value.field ? item[value.field] : null;
      return (
        <TableCell key={item._id + index + 4}>
          <div className="td-wrapper">
            {value.cellRenderer(cellValue, item)}
          </div>
        </TableCell>
      );
    }

    // 3. Date type
    if (value.type === 'date') {
      return (
        <TableCell key={item._id + index + 4}>
          <div className="td-wrapper">{formatDate(item[value.field])}</div>
        </TableCell>
      );
    }

    // 4. Special employee field (original logic)
    if (value.field === 'employee' || value.field === 'employeeId') {
      return (
        <TableCell key={item._id + index + 4}>
          <div className="td-wrapper">{`${item?.employee?.first_name || item?.employeeId?.firstName || ""} ${item?.employeeId?.lastName || ""}`}</div>
        </TableCell>
      );
    }

    // 5. Special type field for leaves (mapping to user-friendly labels)
    // if (value.field === 'type') {
    //   let label;
    //   switch (item.type) {
    //     case 'vacation':
    //       label = 'Vacances';
    //       break;
    //     case 'sick':
    //       label = 'Congé de maladie';
    //       break;
    //     case 'annual':
    //       label = 'Congé annuel';
    //       break;
    //     case 'unpaid':
    //       label = 'Non payé';
    //       break;
    //     case 'other':
    //       label = 'Autre';
    //       break;
    //     default:
    //       label = item.type;
    //   }

    //   return (
    //     <TableCell key={item._id + index + 4}>
    //       <div className="td-wrapper">{label}</div>
    //     </TableCell>
    //   );
    // }
    
    // 5. Default: plain text
    return (
      <TableCell key={`${item._id || item.employeeId} + index + 4`}>
        <div className="td-wrapper">
          {value.field === "postedBy" || value.field === "orderedBy"
            ? item[value.field]?.username
            : item[value.field]}
        </div>
      </TableCell>
    );
  };

  const renderExportButtons = (exportedFileName) => {
    if(filteredData.excel && filteredData.pdf && filteredData.excel.length > 0 && filteredData.pdf.length > 0) {
      return <>
        <Button onClick={() => exportPDF(filteredData.pdf, exportedFileName)}><Download />PDF</Button>
        <Button onClick={() => exportExcel(filteredData.excel, exportedFileName)}><Download />EXCEL</Button>
      </>
    } else {
      return null
    }
  }

  return (
    <TableContainer>

      <TableHeader>
        <DashSearchInput
          placeholder="Rechercher..."
          onChange={(e) => handleSearch(e.target.value)}
          value={term}
        />
        <div className="btn__container">
          {additionalToolbarButtons}   {/* <-- new */}
          {renderExportButtons(exportedFileName)}
          {(checkedItems.length === data?.length && data.length !== 0) || checkedItems.length > 1 ? (
            <Button style={{borderColor: "red", color: "red"}} onClick={() => handleDeleteMany(checkedItems)}>
              Tout supprimer
            </Button>
          ) : null}
        </div>
      </TableHeader>
      
      {

        isSuccess ?
          <>
            <Table>
              <TableHead>
                <TableRow>
                  {checker && (
                    <TableCellTh>
                      <TableCheckbox
                        className={checkedItems.length > 1 && checkedItems.length < data?.length ? 'checkbox__multi-checked-status' : ''}
                        id="checkbox1"
                        type="checkbox"
                        onChange={() => handleAllItemsChecked(data)}
                        checked={areArraysEqual(checkedItems, allItemsChecked) || checkedItems.length === data?.length}
                      />
                    </TableCellTh>
                  )}
                  {tableData?.map((value, index) => (

                    <TableCellTh key={index}>{value.header}</TableCellTh>

                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    {checker && (
                      <TableCell>
                        <TableCheckbox
                          id="checkbox1"
                          type="checkbox"
                          checked={isItemChecked(checkedItems, item._id)}
                          onChange={() => toggleItemsChecked(item._id)}
                        />
                      </TableCell>
                    )}
                    {tableData?.map((value, i) => renderContent(value, item, i))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TableFooter>
              <span>
                Page {page} of {pages}
              </span>

              <input 
                className="table-footer__input" 
                type="number" value={localLimit} 
                // onChange={(e) => setLimit(e.target.value)}
                onChange={(e) => setLocalLimit(e.target.value)}
                onBlur={handleLimitBlur}
                onKeyDown={handleLimitKeyDown}
              />

              <Pagination
                pagesArray={pagesArray}
                page={page}
                pages={pages}
                setPage={setPage}
              />
            </TableFooter> 
          </> : <Loading height={'30rem'} iconSize={'4rem'}/>
          
      }

    </TableContainer>
  );
};

export default CustomTable;