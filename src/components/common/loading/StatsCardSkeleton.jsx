'use client';

import * as S from './Loading.styles';

export default function StatsCardSkeleton() {
  return (
    <S.Card>
      <S.IconWrapper>
        <S.SkeletonBlock
          width="6.4rem"
          height="6.4rem"
          radius="1.6rem"
        />
      </S.IconWrapper>

      <S.Content>
        <S.SkeletonBlock
          width="5rem"
          height="3.2rem"
        />

        <div style={{ height: '1.2rem' }} />

        <S.SkeletonBlock
          width="70%"
          height="2rem"
        />
      </S.Content>
    </S.Card>
  );
}