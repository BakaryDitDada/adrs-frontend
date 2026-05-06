// import { EmployeeSchema } from '../schemas/employeeSchema';
import { setInPath } from './objectUtils';

export function validateRows(rows, fieldMapping, schema) {
  return rows.map((row, index) => {
    const data = {};

    // Build the raw object (all values are strings from the file)
    for (const [header, fieldPath] of Object.entries(fieldMapping)) {
      if (fieldPath && row[header] !== undefined && row[header] !== null && row[header] !== '') {
        setInPath(data, fieldPath, row[header]);
      }
    }

    // Validate and coerce
    const result = schema.safeParse(data);

    return {
      // ✨ Use the parsed/coerced object when valid, otherwise keep the raw one for error display
      data: result.success ? result.data : data,
      errors: result.success ? null : result.error.flatten().fieldErrors,
      rowIndex: index,
    };
  });
}