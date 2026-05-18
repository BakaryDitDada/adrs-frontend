import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-right: auto;
  }
`;

export const ViewSwitcher = styled.div`
  display: flex;
  gap: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

export const ViewButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: transparent;
  border: none;
  color: ${({ theme, $active }) =>
    $active === "true" ? theme.colors.primary : theme.colors.text.secondary};
  font-weight: ${({ theme, active }) =>
    active ? theme.fontWeights.semibold : theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: none;
  }

  ${({ active, theme }) =>
    active &&
    css`
      background-color: ${theme.colors.primary + '10'};
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.primary};
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

// Status badge adapted for tasks (A Faire, En Cours, Terminé)
export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'Terminé': return theme.colors.success + '20';
      case 'En Cours': return theme.colors.warning + '20';
      case 'A Faire':
      default: return theme.colors.background.tertiary;
    }
  }};
  color: ${({ theme, status }) => {
    switch (status) {
      case 'Terminé': return theme.colors.success;
      case 'En Cours': return theme.colors.warning;
      case 'A Faire':
      default: return theme.colors.text.secondary;
    }
  }};
`;

// Priority badge
export const PriorityBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ theme, priority }) => {
    switch (priority) {
      case 'Elevée': return theme.colors.error + '20';
      case 'Médium': return theme.colors.warning + '20';
      case 'Bas':
      default: return theme.colors.background.tertiary;
    }
  }};
  color: ${({ theme, priority }) => {
    switch (priority) {
      case 'Elevée': return theme.colors.error;
      case 'Médium': return theme.colors.warning;
      case 'Bas':
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

export const KanbanPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;