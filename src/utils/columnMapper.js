// src/utils/columnMapper.js
// import { LEAF_FIELDS } from '@/schemas/employeeSchema';

const clean = (str) => str.toLowerCase().replace(/[^a-z]/g, '');

/**
 * Builds a mapping from each original file header to the matching LEAF_FIELD dot path,
 * or null if not matched.
 */
export function autoMapHeaders(parsedHeaders, leafFields) {
  const mapping = {};
  const cleanedLeafs = leafFields.map(path => ({ path, clean: clean(path) }));

  for (const header of parsedHeaders) {
    const cleanHeader = clean(header);
    const match = cleanedLeafs.find(f => f.clean === cleanHeader);
    mapping[header] = match ? match.path : null;
  }
  return mapping;
}