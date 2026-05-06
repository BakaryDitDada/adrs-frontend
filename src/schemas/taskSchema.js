import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const taskSchema = z.object({
  _id: z.string().regex(objectIdRegex).optional(),
  title: z.string().min(1).max(120),
  description: z.string().optional(),
  type: z.enum(['Réunion', 'Mission de Terrain', 'Atelier de Formation', 'Tâche de Bureau', 'Autre']).optional(),
  status: z.enum(['A Faire', 'En Cours', 'Terminé']).optional(),
  percentage: z.coerce.number().min(0).max(100).optional(),
  priority: z.enum(['Elevée', 'Médium', 'Bas']).optional(),
  assignedTo: z.array(z.string().regex(objectIdRegex)).optional(),
  attachments: z.array(z.string().regex(objectIdRegex)).optional(),
  startDate: z.string().refine(d => !isNaN(Date.parse(d))),
  dueDate: z.string().refine(d => !isNaN(Date.parse(d))).optional(),
  projectId: z.string().regex(objectIdRegex).optional(),
  categories: z.string().optional(),
  notes: z.string().min(20).max(500).optional(),
});

/**
 * Recursively extracts all leaf paths in dot notation.
 * Example: ['firstName', 'lastName', ..., 'salaryInfo.baseSalary', 'salaryInfo.currency', ...]
 */
export function getLeafFieldPaths(schema, prefix = '') {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    let paths = [];
    for (const key in shape) {
      const subSchema = shape[key];
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (subSchema instanceof z.ZodObject) {
        // Recurse into nested object
        paths = paths.concat(getLeafFieldPaths(subSchema, newPrefix));
      } else {
        paths.push(newPrefix);
      }
    }
    return paths;
  }
  return [];
}

// All available leaf paths that can appear in a column header
export const TASK_LEAF_FIELDS = getLeafFieldPaths(taskSchema);