import styled from 'styled-components';

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 30rem;
`;

// -----------------------------
// CUSTOM TOOLTIP STYLING ------
// -----------------------------
export const TooltipContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 12px 14px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  min-width: 160px;
`;

export const TooltipTitle = styled.div`
  font-size:${({ theme }) => theme.fontSizes.bodyLg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const TooltipRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  // font-size: 13px;
  font-size:${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.secondary};

  strong {
    margin-left: auto;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const TooltipColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;