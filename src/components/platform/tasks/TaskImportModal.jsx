import { useBulkCreateTasksMutation } from '@/store/features/tasks/tasksApi';
import { taskSchema, TASK_LEAF_FIELDS } from '@/schemas/taskSchema';
import { BulkImportModal } from '@/components/platform/bulkImportModal/BulkImportModal';

export function TaskImportModal(props) {
  const [bulkCreate] = useBulkCreateTasksMutation();

  const handleImport = async (rows) => bulkCreate(rows).unwrap();

  return (
    <BulkImportModal
      {...props}
      onImport={handleImport}
      schema={taskSchema}
      entityLabel="Tâches"
      leafFields={TASK_LEAF_FIELDS}
    />
  );
}