import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as S from '../BulkImport.styles';

export function UploadStep({ onDrop, error, file }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  return (
    <S.StepContainer>
      <S.DropZone {...getRootProps()} $active={isDragActive}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez le fichier ici ...</p>
        ) : (
          <p>Glissez-déposez un fichier ici, ou cliquez pour en sélectionneer (CSV, Excel, PDF)</p>
        )}
      </S.DropZone>
      {file && <S.FileName>{file.name}</S.FileName>}
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.StepContainer>
  );
}