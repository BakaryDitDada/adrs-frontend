'use client';

import styled from 'styled-components';

// import SkeletonBlock from '@/components/ui/loading/SkeletonBlock';
import * as S from './Loading.styles';

export default function DashboardKPISkeleton() {
  return (
    <S.DashKPISkeletonCard>
      <S.SkeletonBlock
        width="6rem"
        height="6rem"
        radius="1.6rem"
      />

      <div style={{ flex: 1 }}>
        <S.SkeletonBlock
          width="6rem"
          height="3.2rem"
        />

        <div style={{ height: '1rem' }} />

        <S.SkeletonBlock
          width="70%"
          height="2rem"
        />
      </div>
    </S.DashKPISkeletonCard>
  );
}