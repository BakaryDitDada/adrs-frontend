'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Upload, AlertCircle } from 'lucide-react';

import {
  useGetEmployeesWithPaginationQuery,
  useDeleteEmployeeMutation,
  useBulkCreateEmployeesMutation
} from '@/store/features/employees/employeesApi';

import CustomTable from '@/components/common/CustomTable';
import EmployeeModal from '@/components/platform/employees/EmployeesModal';
import { BulkImportModal } from '@/components/platform/bulkImportModal/BulkImportModal';

import {
  employeesFilteredExcelData,
  employeesFilteredPDFData,
  employeesTableData,
} from '@/data/platform';
import { EmployeeSchema, EMP_LEAF_FIELDS } from '@/schemas/employeeSchema';

import { SAMPLE_EMPLOYEES } from '@/lib/samples/employeesData';

import * as S from './page.styles';
import { PrimaryButton } from '@/components/common/Common.styles';

export default function EmployeesPage() {
  // -----------------------------
  // State
  // -----------------------------
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showBulkImport, setShowBulkImport] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // -----------------------------
  // API
  // -----------------------------
    const {
    data: employeesData,
    isLoading,
    isSuccess,
    isError,
  } = useGetEmployeesWithPaginationQuery({
    page,
    limit,
    search,
  });

  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [bulkCreateEmployees] = useBulkCreateEmployeesMutation();

  const isUsingMockData = isError || !employeesData?.data;

  const employees = useMemo(() => {
    if (isUsingMockData) return SAMPLE_EMPLOYEES;
    return employeesData?.data || [];
  }, [employeesData, isUsingMockData]);

  // -----------------------------
  // Access control
  // -----------------------------
  if (user?.role === 'employee') {
    return (
      <S.Container>
        <S.AccessDenied>
          <AlertCircle size={32} />
          <h2>Access Denied</h2>
          <p>You do not have permission to view this page.</p>
        </S.AccessDenied>
      </S.Container>
    );
  }

  const pagination = employeesData?.pagination || {};
  const pages = pagination.totalPages || 1; 
  const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);

  const handleAllItemsChecked = (items) => {
    if (checkedItems.length === items.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(items.map((item) => item._id));
    }
  };

  const toggleItemsChecked = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // -----------------------------
  // Actions
  // -----------------------------
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await deleteEmployee(id).unwrap();
    } catch {
      alert('Delete failed');
    }
  };

  const handleDeleteMany = async (ids) => {
    if (!window.confirm('Delete selected employees?')) return;

    try {
      await Promise.all(ids.map((id) => deleteEmployee(id).unwrap()));
      setCheckedItems([]);
    } catch {
      alert('Bulk delete failed');
    }
  };

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp._id === id || emp.id === id);
    setEditingEmployee(employee);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1); // reset pagination
  };

  // -----------------------------
  // Toolbar buttons
  // -----------------------------
  const toolbarButtons = (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <S.OutlineButton onClick={() => setShowBulkImport(true)}>
        {
          user?.role === 'admin' || user?.role === 'hr' || user?.role === 'manager' ? (
            <><Upload size={20} /> Import</>
          ) : null
        }
      </S.OutlineButton>

      <S.PrimaryButton onClick={() => setShowCreateModal(true)}>
        {/* <Plus size={16} /> Add Employee */}
        {
          user?.role === 'admin' || user?.role === 'hr' || user?.role === 'manager' ? (
            <><Plus size={20} /> Ajouter</>
          ) : null
        }
      </S.PrimaryButton>
    </div>
  );

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <S.Container>
      <S.Header>
        <h1>Liste des employé(e)s</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <PrimaryButton onClick={() => setShowBulkImport(true)}>
            <Upload size={20} /> Importer
          </PrimaryButton>

          <PrimaryButton onClick={() => setShowCreateModal(true)}>
            <Plus size={20} /> Ajouter
          </PrimaryButton>
        </div>
      </S.Header>

      {isUsingMockData && (
        <S.MockDataBanner>
          ⚠️ Le Backend n&apos;est pas disponible pour le moment – Affichage de données d&apos;exemple.
        </S.MockDataBanner>
      )}

      <CustomTable
        data={employees}
        filteredData={{
          excel: employeesFilteredExcelData(employees),
          pdf: employeesFilteredPDFData(employees),
        }}
        tableData={employeesTableData}
        page={page}
        pages={pages}
        setPage={setPage}
        pagesArray={pagesArray}

        limit={limit}
        setLimit={setLimit}

        onSearch={handleSearch}
        isSuccess={isSuccess}
        isLoading={isLoading}

        checker={true}

        checkedItems={checkedItems}
        allItemsChecked={employees.map((e) => e._id)}
        handleAllItemsChecked={handleAllItemsChecked}
        toggleItemsChecked={toggleItemsChecked}

        handleDelete={handleDelete}
        handleDeleteMany={handleDeleteMany}

        onEdit={handleEdit}

        exportedFileName='Liste-des-employé(e)s'

        // additionalToolbarButtons={toolbarButtons}
      />

      {/* Modals */}
      <EmployeeModal
        isOpen={showCreateModal || !!editingEmployee}
        onClose={() => {
          setShowCreateModal(false);
          setEditingEmployee(null);
        }}
        employee={editingEmployee}
      />

      <BulkImportModal
        isOpen={showBulkImport}
        onClose={() => setShowBulkImport(false)}
        onImport={bulkCreateEmployees}
        schema={EmployeeSchema}
        entityLabel="Employé(e)s"
        leafFields={EMP_LEAF_FIELDS}
      />
    </S.Container>
  );
}