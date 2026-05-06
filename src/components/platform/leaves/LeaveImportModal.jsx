import { useBulkCreateLeavesMutation } from '@/store/features/leaves/leavesApi';
import { leaveSchema, LEAVE_LEAF_FIELDS } from '@/schemas/leaveSchema';
import { BulkImportModal } from '@/components/platform/bulkImportModal/BulkImportModal';

console.log('LEAVE_LEAF_FIELDS:', LEAVE_LEAF_FIELDS); // Debug log to verify leaf fields are imported correctly

export function LeaveImportModal(props) {
  const [bulkCreate] = useBulkCreateLeavesMutation();

  const handleImport = async (rows) => bulkCreate(rows).unwrap();
 
  return (
    <BulkImportModal
      {...props}
      onImport={handleImport}
      schema={leaveSchema}
      entityLabel="Congés"
      leafFields={LEAVE_LEAF_FIELDS}
    />
  );
}
