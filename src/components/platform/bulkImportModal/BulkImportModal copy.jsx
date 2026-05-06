import React from 'react';
import { useBulkImport } from '@/hooks/useBulkImport';
import { UploadStep } from './steps/UploadStep';
import { MappingStep } from './steps/MappingStep';
import { ValidationStep } from './steps/ValidationStep';
import { ManualTextEditor } from './steps/ManualTextEditor';
import * as S from './BulkImport.styles';

export function BulkImportModal({ isOpen, onClose, onImport }) {
  const {
    file, parsedResult, mapping, validatedRows, step, error,
    validCount, errorCount, importing,
    handleFileDrop, updateMapping, handleManualText, handleImport,
    setStep, setError, reset,
  } = useBulkImport({ onClose, onImport });

  if (!isOpen) return null;

  // Render step content
  const renderStep = () => {
    switch (step) {
      case 'UPLOAD':
        return <UploadStep onDrop={handleFileDrop} error={error} file={file} />;
      case 'MANUAL_TEXT':
        return <ManualTextEditor onSubmit={handleManualText} rawText={parsedResult?.rawText} error={error} />;
      case 'MAPPING':
        return (
          <MappingStep
            headers={parsedResult.headers}
            mapping={mapping}
            onChange={updateMapping}
            onContinue={() => setStep('VALIDATION')}
          />
        );
      case 'VALIDATION':
      case 'IMPORTING':
      case 'DONE':
        return (
          <ValidationStep
            rows={validatedRows}
            validCount={validCount}
            errorCount={errorCount}
            importing={importing}
            onImport={handleImport}
            onBack={() => setStep('MAPPING')}
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
          <h2>Importation d&apos;employé(e)s</h2>
          {step !== 'IMPORTING' && <S.CloseButton onClick={onClose}>×</S.CloseButton>}
        </S.Header>

        {renderStep()}

        {step === 'DONE' && (
          <S.SuccessMessage>
            Importation réussie! {validCount} employé(e)s ajouté(e)s.
          </S.SuccessMessage>
        )}
      </S.Modal>
    </S.Overlay>
  );
}