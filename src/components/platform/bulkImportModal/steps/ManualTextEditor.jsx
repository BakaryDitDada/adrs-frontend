// src/components/BulkImportModal/steps/ManualTextEditor.jsx
import React, { useState } from 'react';
import * as S from '../BulkImport.styles';
// import * as S from '../styles';

export function ManualTextEditor({ onSubmit, rawText, error }) {
  const [text, setText] = useState(rawText || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <S.StepContainer>
      <h3>Entrée de données manuelle</h3>
      <p>Nous n&apos;avons pas pu détecter automatiquement une table dans votre fichier. Passez le texte structuré ci-dessous (en CSV, TSV, ou séparé par des espaces).</p>
      <form onSubmit={handleSubmit}>
        <S.TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="e.g., First Name,Last Name,Email..."
        />
        {error && <S.ErrorText>{error}</S.ErrorText>}
        <S.ButtonRow>
          <S.PrimaryButton type="submit">Analyser le texte</S.PrimaryButton>
        </S.ButtonRow>
      </form>
    </S.StepContainer>
  );
}