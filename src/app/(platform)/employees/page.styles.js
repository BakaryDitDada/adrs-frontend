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

export const SearchBox = styled.div`
  input {
    width: 100%;
    max-width: 40rem;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    font-size: ${({ theme }) => theme.fontSizes.body};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.body};

  th {
    padding: ${({ theme }) => theme.spacing.md};
    text-align: left;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text.secondary};
    background-color: ${({ theme }) => theme.colors.background.secondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    cursor: pointer;
    user-select: none;
  }

  td {
    padding: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ theme, role }) => {
    switch (role) {
      case 'admin': return theme.colors.primary + '20';
      case 'hr': return theme.colors.secondary + '20';
      case 'manager': return theme.colors.warning + '20';
      default: return theme.colors.background.tertiary;
    }
  }};
  color: ${({ theme, role }) => {
    switch (role) {
      case 'admin': return theme.colors.primaryDark;
      case 'hr': return theme.colors.secondaryDark;
      case 'manager': return theme.colors.warning;
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