'use client';

import * as S from './Loading.styles';

export default function TableSkeleton({
  rows = 6,
}) {
  return (
    <S.TableWrapper>
      <S.TableHeader>
        {[...Array(9)].map((_, index) => (
          <S.SkeletonBlock
            key={index}
            width="80%"
            height="2rem"
          />
        ))}
      </S.TableHeader>

      {[...Array(rows)].map((_, rowIndex) => (
        <S.TableRow key={rowIndex}>
          {[...Array(9)].map((_, colIndex) => (
            <S.SkeletonBlock
              key={colIndex}
              width="85%"
              height="2rem"
            />
          ))}
        </S.TableRow>
      ))}
    </S.TableWrapper>
  );
}