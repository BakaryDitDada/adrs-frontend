import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const OutlineButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

// Replaces the old "Badge" (employee role) – now for leave status
export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'Approuvé': return theme.colors.success + '20';
      case 'Rejeté': return theme.colors.error + '20';
      case 'Annulé': return theme.colors.warning + '20';
      case 'En attente':
      default: return theme.colors.background.tertiary;
    }
  }};
  color: ${({ theme, status }) => {
    switch (status) {
      case 'Approuvé': return theme.colors.success;
      case 'Rejeté': return theme.colors.error;
      case 'Annulé': return theme.colors.warning;
      case 'En attente':
      default: return theme.colors.text.secondary;
    }
  }};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const IconButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme, danger }) => danger ? theme.colors.error : theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme, danger }) => danger ? theme.colors.error + '10' : theme.colors.background.tertiary};
    border-color: ${({ theme, danger }) => danger ? theme.colors.error : theme.colors.primary};
    color: ${({ theme, danger }) => danger ? theme.colors.error : theme.colors.primary};
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};

  button {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    background: ${({ theme }) => theme.colors.background.secondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const AccessDenied = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 50vh;
  color: ${({ theme }) => theme.colors.error};
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
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