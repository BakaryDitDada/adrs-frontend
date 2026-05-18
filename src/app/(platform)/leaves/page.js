'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Upload, AlertCircle } from 'lucide-react';

import {
  useDeleteLeaveMutation,
  useDeleteLeavesMutation,
  useApproveLeaveMutation,
  useBulkCreateLeavesMutation,
  useGetLeavesWithPaginationQuery,
} from '@/store/features/leaves/leavesApi';

import CustomTable from '@/components/common/CustomTable';
import LeaveModal from '@/components/platform/leaves/LeavesModal';
import { BulkImportModal } from '@/components/platform/bulkImportModal/BulkImportModal';

import {
  leavesFilteredExcelData,
  leavesFilteredPDFData,
  leavesTableData,
} from '@/data/platform';
import { leaveSchema, LEAVE_LEAF_FIELDS } from '@/schemas/leaveSchema';

import { SAMPLE_LEAVES } from '@/lib/samples/leavesData';

import * as S from './leavesPage.styles';
import { PrimaryButton } from '@/components/common/Common.styles';

export default function LeavesPage() {
  // -----------------------------
  // State
  // -----------------------------
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [showBulkImport, setShowBulkImport] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // -----------------------------
  // API
  // -----------------------------
  const {
    data: leavesData,
    isLoading,
    isSuccess,
    isError,
  } = useGetLeavesWithPaginationQuery({
    page,
    limit,
    search,
  });

  const [deleteLeave] = useDeleteLeaveMutation();
  const [approveLeave] = useApproveLeaveMutation();
  const [deleteLeaves] = useDeleteLeavesMutation();
  const [bulkCreateLeaves] = useBulkCreateLeavesMutation();

  const isUsingMockData = isError || !leavesData?.data;

  const leaves = useMemo(() => {
    if (isUsingMockData) return SAMPLE_LEAVES;
    return leavesData?.data || [];
  }, [leavesData, isUsingMockData]);

  // -----------------------------
  // Access control (same as employees: only admin/hr/manager)
  // -----------------------------
  if (user?.role === 'employee') {
    return (
      <S.Container>
        <S.AccessDenied>
          <AlertCircle size={32} />
          <h2>Accès refusé</h2>
          <p>Vous n&apos;avez pas la permission de consulter cette page.</p>
        </S.AccessDenied>
      </S.Container>
    );
  }

  const pagination = leavesData?.pagination || {};
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
    if (!window.confirm('Supprimer ce congé ?')) return;

    try {
      await deleteLeave(id).unwrap();
    } catch {
      alert('Échec de la suppression');
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Approver ce congé ?')) return;

    try {
      await approveLeave(id).unwrap();
    } catch {
      alert("Échec de l'approbation !!!");
    }
  };

  const handleDeleteMany = async (ids) => {
    if (!window.confirm('Supprimer les congés sélectionnés ?')) return;

    try {
      await deleteLeaves({ ids }).unwrap(); 
      setCheckedItems([]);
    } catch {
      alert('Échec de la suppression multiple');
    }
  };

  const handleEdit = (id) => {
    const leave = leaves.find((l) => l._id === id || l.id === id);
    setEditingLeave(leave);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <S.Container>
      <S.Header>
        <h1>Liste des congés</h1>
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
        data={leaves}
        filteredData={{
          excel: leavesFilteredExcelData(leaves),
          pdf: leavesFilteredPDFData(leaves),
        }}
        tableData={leavesTableData}
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
        allItemsChecked={leaves.map((e) => e._id)}
        handleAllItemsChecked={handleAllItemsChecked}
        toggleItemsChecked={toggleItemsChecked}

        handleDelete={handleDelete}
        handleDeleteMany={handleDeleteMany}
        handleApprove={handleApprove}
        displayActionIcons={{add: true, delete: true, approve: true}}

        onEdit={handleEdit}

        exportedFileName="Liste-des-congés"
      />

      {/* Modals */}
      <LeaveModal
        isOpen={showCreateModal || !!editingLeave}
        onClose={() => {
          setShowCreateModal(false);
          setEditingLeave(null);
        }}
        leave={editingLeave}
      />

      <BulkImportModal
        isOpen={showBulkImport}
        onClose={() => setShowBulkImport(false)}
        onImport={bulkCreateLeaves}
        schema={leaveSchema}
        entityLabel="Congés"
        leafFields={LEAVE_LEAF_FIELDS}
      />
    </S.Container>
  );
}