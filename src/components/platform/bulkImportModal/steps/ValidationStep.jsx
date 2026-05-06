import React from 'react';
import * as S from '../BulkImport.styles';
import { PrimaryButton, OutlineButton } from '@/components/common/Common.styles';

export function ValidationStep({
  rows, validCount, errorCount, importing, onImport, onBack, error
}) {
  return (
    <S.StepContainer>
      <h3>Prévisualisation (validation)</h3>
      <S.SummaryBar>
        <span>{validCount} lignes valides</span>
        {errorCount > 0 && <span className="error">{errorCount} lignes avec des erreurs</span>}
      </S.SummaryBar>

      <S.TableWrapper>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Données</th>
              <th>Erreurs</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 20).map((row, idx) => (
              <tr key={idx} className={row.errors ? 'has-error' : ''}>
                <td>{idx + 1}</td>
                <td>
                  <pre>{JSON.stringify(row.data, null, 1)}</pre>
                </td>
                <td className="error-cell">
                  {row.errors ? (
                    <ul>
                      {Object.entries(row.errors).map(([field, msgs]) => (
                        <li key={field}><strong>{field}:</strong> {msgs.join(', ')}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="ok">✓</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length > 20 && <p>...et {rows.length - 20} lignes supplémentaires</p>}
      </S.TableWrapper>

      {error && <S.ErrorText>{error}</S.ErrorText>}

      <S.ButtonRow>
        <OutlineButton onClick={onBack} disabled={importing}>
          ← Retour au Mapping
        </OutlineButton>
        <PrimaryButton onClick={onImport} disabled={importing || validCount === 0}>
          {importing ? 'Importation en cours...' : `Import ${validCount} Employé(e)s`}
        </PrimaryButton>
      </S.ButtonRow>
    </S.StepContainer>
  );
}