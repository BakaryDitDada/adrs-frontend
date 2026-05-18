'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Upload, AlertCircle, List, Columns, Table, Kanban } from 'lucide-react';

import {
  useGetTasksWithPaginationQuery,
  useDeleteTaskMutation,
  useDeleteTasksMutation,
  useBulkCreateTasksMutation,
  useUpdateTaskMutation
} from '@/store/features/tasks/tasksApi';

import CustomTable from '@/components/common/CustomTable';
// import TaskModal from '@/components/platform/tasks/TaskModal';
import TaskModal from '@/components/platform/tasks/TasksModal';
import { BulkImportModal } from '@/components/platform/bulkImportModal/BulkImportModal';

import {
  tasksFilteredExcelData,
  tasksFilteredPDFData,
  tasksTableData,
} from '@/data/platform';
import { taskSchema, TASK_LEAF_FIELDS } from '@/schemas/taskSchema';

import { SAMPLE_TASKS } from '@/lib/samples/tasksData';

import * as S from './tasksPage.styles';
import { PrimaryButton } from '@/components/common/Common.styles';
import KanbanBoard from '@/components/platform/tasks/KanbanBoard';

export default function TasksPage() {
  // -----------------------------
  // State
  // -----------------------------
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showBulkImport, setShowBulkImport] = useState(false);

  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'

  const { user } = useSelector((state) => state.auth);

  // -----------------------------
  // API
  // -----------------------------
  const {
    data: tasksData,
    isLoading,
    isSuccess,
    isError,
  } = useGetTasksWithPaginationQuery({
    page,
    limit,
    search,
  });

  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTasks] = useDeleteTasksMutation();
  const [bulkCreateTasks] = useBulkCreateTasksMutation();

  const isUsingMockData = isError || !tasksData?.data;

  const tasks = useMemo(() => {
    if (isUsingMockData) return SAMPLE_TASKS;
    return tasksData?.data || [];
  }, [tasksData, isUsingMockData]);

  // -----------------------------
  // Access control (same as leaves: no employee access)
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

  const pagination = tasksData?.pagination || {};
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
  // Actions (no approve for tasks)
  // -----------------------------
  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette tâche ?')) return;

    try {
      await deleteTask(id).unwrap();
    } catch {
      alert('Échec de la suppression');
    }
  };

  const handleDeleteMany = async (ids) => {
    if (!window.confirm('Supprimer les tâches sélectionnées ?')) return;

    try {
      await deleteTasks({ ids }).unwrap();
      setCheckedItems([]);
    } catch {
      alert('Échec de la suppression multiple');
    }
  };

  const handleEdit = (id) => {
    const task = tasks.find((t) => t._id === id || t.id === id);
    setEditingTask(task);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  // const handleTaskMove = async (taskId, newStatus) => {
  //   // Optimistically update parent state immediately
  //   // setTasks((prev) =>
  //   //   prev.map((task) =>
  //   //     String(task.id) === String(taskId)
  //   //       ? { ...task, status: newStatus }
  //   //       : task
  //   //   )
  //   // );

  //   try {
  //     const res = await updateTask(taskId, {
  //       status: newStatus,
  //     });

  //     console.log("Response (handleTaskMove) ::: ", res);
  //   } catch (error) {
  //     // rollback if needed
  //     console.log("Error::: ", error);
  //     refetchTasks();
  //   }

  // };

  const renderAdditionalTools = () => {
    return (
      <S.ViewSwitcher>
        <S.ViewButton
          $active={viewMode === 'table' ? "true" : "false"}
          onClick={() => setViewMode('table')}
        >
          <Table size={16} /> Tableau
        </S.ViewButton>
        <S.ViewButton
          $active={viewMode === 'kanban' ? "true" : "false"}
          onClick={() => setViewMode('kanban')}
        >
          <Kanban size={16} /> Kanban
        </S.ViewButton>
      </S.ViewSwitcher>
    )
  }

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <S.Container>
      <S.Header>
        <h1>Liste des tâches</h1>
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

      {viewMode === 'table' ? (
        <CustomTable
          data={tasks}
          filteredData={{
            excel: tasksFilteredExcelData(tasks),
            pdf: tasksFilteredPDFData(tasks),
          }}
          tableData={tasksTableData}
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
          allItemsChecked={tasks.map((e) => e._id)}
          handleAllItemsChecked={handleAllItemsChecked}
          toggleItemsChecked={toggleItemsChecked}

          handleDelete={handleDelete}
          handleDeleteMany={handleDeleteMany}
          // No handleApprove for tasks
          displayActionIcons={{ add: true, delete: true, view: true, approve: false }} // only add (edit) and delete

          onEdit={handleEdit}

          exportedFileName="Liste-des-tâches"
          additionalToolbarButtons={renderAdditionalTools()}
        />
      ) : (
        <KanbanBoard 
          tasks={tasks}
          onTaskMove={async (taskId, newStatus) => {
            // await patchStatus({ id: taskId, status: newStatus }).unwrap(); 
            await updateTask({ id: taskId, status: newStatus }).unwrap(); 
          }}
          onDelete={handleDelete}
          onEdit={(task) => { setEditingTask(task); setShowModal(true); }}
          isLoading={isLoading}
          additionalToolbarButtons={renderAdditionalTools()}
          onSearch={handleSearch}
        />
        // <S.KanbanPlaceholder>
        //   <Columns size={48} />
        //   <h2>Vue Kanban</h2>
        //   <p>Cette vue est en cours de développement et sera disponible prochainement.</p>
        // </S.KanbanPlaceholder>
      )}

      {/* Modals */}
      <TaskModal
        isOpen={showCreateModal || !!editingTask}
        onClose={() => {
          setShowCreateModal(false);
          setEditingTask(null);
        }}
        task={editingTask}
      />

      <BulkImportModal
        isOpen={showBulkImport}
        onClose={() => setShowBulkImport(false)}
        onImport={bulkCreateTasks}
        schema={taskSchema}
        entityLabel="Tâches"
        leafFields={TASK_LEAF_FIELDS}
      />
    </S.Container>
  );
}