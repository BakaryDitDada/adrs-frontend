'use client';

import * as S from './Loading.styles';

export default function LoadingOverlay() {
  return (
    <S.Overlay>
      <S.Spinner size={32} />
    </S.Overlay>
  );
}