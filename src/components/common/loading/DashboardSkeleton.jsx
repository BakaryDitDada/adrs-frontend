'use client';

import StatsCardSkeleton from './StatsCardSkeleton';
import * as S from './Loading.styles';

export default function DashboardSkeleton() {
  return (
    <S.Wrapper>
      <S.Header>
        <S.SkeletonBlock
          width="34rem"
          height="5.2rem"
        />

        <S.SkeletonBlock
          width="26rem"
          height="2.2rem"
        />
      </S.Header>

      <S.StatsGrid>
        {[...Array(4)].map((_, index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </S.StatsGrid>

      <S.ChartsGrid>
        {[...Array(2)].map((_, index) => (
          <S.ChartCard key={index}>
            <S.SkeletonBlock
              width="24rem"
              height="3.2rem"
            />

            <div style={{ height: '3rem' }} />

            <S.SkeletonBlock
              width="100%"
              height="30rem"
              radius="1.6rem"
            />
          </S.ChartCard>
        ))}
      </S.ChartsGrid>
    </S.Wrapper>
  );
}