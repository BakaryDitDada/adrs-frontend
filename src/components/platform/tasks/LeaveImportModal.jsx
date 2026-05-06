import { useBulkCreateTasksMutation } from '@/store/features/tasks/tasksApi';
import { taskSchema, TASK_LEAF_FIELDS } from '@/schemas/taskSchema';
import { BulkImportModal } from '@/components/platform/bulkImportModal/BulkImportModal';

export function TaskImportModal(props) {
  const [bulkCreate] = useBulkCreateTasksMutation();

  const handleImport = async (rows) => bulkCreate(rows).unwrap();

  // const handleImport = async (rows) => {
  //   // Normalize rows before sending to backend
  //   const normalizedRows = rows.map((row) => ({
  //     ...row,
  //     assignedTo: parseArrayField(row.assignedTo),
  //     attachments: parseArrayField(row.attachments),
  //     percentage:
  //       row.percentage !== undefined && row.percentage !== ''
  //         ? Number(row.percentage)
  //         : undefined,
  //   }));

  //   return bulkCreate(normalizedRows).unwrap();
  // };

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