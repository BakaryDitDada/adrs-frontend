import React from 'react';
import { LEAF_FIELDS } from '@/schemas/employeeSchema';
import * as S from '../BulkImport.styles';
import { PrimaryButton } from '@/components/common/Common.styles';

// Group leaf paths by top-level key for a nicer display
function groupLeafPaths(leafFields) {
  const groups = {};
  leafFields.forEach(path => {
    const topKey = path.split('.')[0];
    if (!groups[topKey]) groups[topKey] = [];
    groups[topKey].push(path);
  });
  return groups;
}

export function MappingStep({ headers, mapping, onChange, onContinue, leafFields }) {
  const handleFieldChange = (header, newValue) => {
    const updated = { ...mapping, [header]: newValue || null };
    onChange(updated);
  };

  const allMapped = Object.values(mapping).every(v => v !== null);
  const grouped = groupLeafPaths(leafFields);

  return (
    <S.StepContainer>
      <h3>Mapping des colonnes (correspondance)</h3>
      <p>Associez chaque colonne de votre fichier à la bonne case de l&apos;employé (les champs imbriqués utilisent la notation par points).</p>
      <S.MappingTable>
        <thead>
          <tr>
            <th>Colonnes du fichier</th>
            <th>→</th>
            <th>Champs d&apos;employés </th>
          </tr>
        </thead>
        <tbody>
          {headers.map(header => (
            <tr key={header}>
              <td>{header}</td>
              <td>→</td>
              <td>
                <select
                  value={mapping[header] || ''}
                  onChange={(e) => handleFieldChange(header, e.target.value)}
                >
                  <option value="">-- Skip / Ignore --</option>
                  {Object.entries(grouped).map(([group, paths]) => (
                    <optgroup key={group} label={group.charAt(0).toUpperCase() + group.slice(1)}>
                      {paths.map(path => (
                        <option key={path} value={path}>
                          {path.split('.').map(part =>
                            part.charAt(0).toUpperCase() + part.slice(1)
                          ).join(' → ')}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </S.MappingTable>
      <S.ButtonRow>
        <PrimaryButton onClick={onContinue} disabled={!allMapped}>
          Continuer avec la validation
        </PrimaryButton>
      </S.ButtonRow>
    </S.StepContainer>
  );
}