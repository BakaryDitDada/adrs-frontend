'use client';

import * as S from './Loading.styles';

export default function ChartSkeleton() {
  return (
    <S.ChartSkeletonWrapper>
      <S.SkeletonBlock
        width="24rem"
        height="3rem"
      />

      <div style={{ height: '3rem' }} />

      <S.SkeletonBlock
        width="100%"
        height="30rem"
        radius="1.6rem"
      />
    </S.ChartSkeletonWrapper>
  );
}