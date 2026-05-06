import React from 'react';
import { useBulkImport, STEPS } from '@/hooks/useBulkImport';
import { UploadStep } from './steps/UploadStep';
import { MappingStep } from './steps/MappingStep';
import { ValidationStep } from './steps/ValidationStep';
import { ManualTextEditor } from './steps/ManualTextEditor';
import * as S from './BulkImport.styles';

/**
 * Generic BulkImportModal
 * - Orchestrates step rendering
 * - Delegates domain logic via props (onImport, schema, entityLabel)
 */
export function BulkImportModal({ 
  isOpen, 
  onClose, 
  onImport, 
  schema, 
  entityLabel = 'records',
  leafFields = [],
}) {
  const {
    file, parsedResult, mapping, validatedRows, step, error,
    validCount, errorCount, importing,
    handleFileDrop, updateMapping, handleManualText, handleImport,
    setStep, setError, reset,
  } = useBulkImport({ onClose, onImport, schema, leafFields });

  if (!isOpen) return null;

  const renderStep = () => {
    switch (step) {
      case STEPS.UPLOAD:
        return <UploadStep onDrop={handleFileDrop} error={error} file={file} />;
      case STEPS.MANUAL_TEXT:
        return (
          <ManualTextEditor 
            onSubmit={handleManualText} 
            rawText={parsedResult?.rawText} 
            error={error} 
          />
        );
      case STEPS.MAPPING:
        return (
          <MappingStep
            headers={parsedResult?.headers || []}
            mapping={mapping}
            onChange={updateMapping}
            onContinue={() => setStep(STEPS.VALIDATION)}
            leafFields={leafFields}
          />
        );
      case STEPS.VALIDATION:
      case STEPS.IMPORTING:
      case STEPS.DONE:
        return (
          <ValidationStep
            rows={validatedRows}
            validCount={validCount}
            errorCount={errorCount}
            importing={importing}
            onImport={handleImport}
            onBack={() => setStep(STEPS.MAPPING)}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <S.Overlay>
      <S.Modal>
        <S.Header>
          <h2>Bulk Import {entityLabel}</h2>
          {step !== STEPS.IMPORTING && (
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
          )}
        </S.Header>

        {renderStep()}

        {step === STEPS.DONE && (
          <S.SuccessMessage>
            Import successful! {validCount} {entityLabel} added.
          </S.SuccessMessage>
        )}
      </S.Modal>
    </S.Overlay>
  );
}