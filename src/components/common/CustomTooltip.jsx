import * as S from './Charts.styles';

export default function CustomTooltip({ active, payload, label, theme }) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];

  return (
    <S.TooltipContainer>
      <S.TooltipTitle>{label}</S.TooltipTitle>

      <S.TooltipRow>
        <S.TooltipColor
          style={{ backgroundColor: data.color }}
        />
        <span>{data.name}:</span>
        <strong>{data.value}</strong>
      </S.TooltipRow>
    </S.TooltipContainer>
  );
}