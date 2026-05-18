import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Header = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h1};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  }
`;

export const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;


export const KPIIcon = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primary + '20';
      case 'secondary':
        return theme.colors.secondary + '20';
      case 'warning':
        return theme.colors.warning + '20';
      case 'success':
        return theme.colors.success + '20';
      default:
        return theme.colors.primary + '20';
    }
  }};
  color: ${({ theme, color }) => {
    switch (color) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'warning':
        return theme.colors.warning;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const KPICard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};

    & ${KPIIcon} {
      filter: brightness(1.1);
      transform: rotate(15deg);
    }
  }
`;

export const KPIContent = styled.div`
  flex: 1;
`;

export const KPIValue = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.2;
`;

export const KPILabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.light};
`;

export const ChartPlaceholder = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

export const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error + '20'};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.error}; 
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  margin-top: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const MockDataBanner = styled.div`
  background-color: ${({ theme }) => theme.colors.warning + '15'};
  border: 1px solid ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.warning};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;