import styled from 'styled-components';


export const StepsCompleted = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 5rem;
  }
`;

export const StepItem = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StepLine = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  width: 100%;
  height: 2px;
  background: ${({ $completed, theme }) =>
    $completed ? theme.colors.primary : theme.colors.border};
  z-index: 1;
`;

export const StepCircle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-weight: 700;

  ${({ status, theme }) => {
    switch (status) {
      case 'Achevée':
        return `
          background: ${theme.colors.success};
          color: white;
        `;
      case 'En cours':
        return `
          background: ${theme.colors.primary};
          color: white;
          box-shadow: 0 0 0 6px ${theme.colors.primary}20;
        `;
      default:
        return `
          border: 2px solid ${theme.colors.border};
          color: ${theme.colors.text.secondary};
          background: ${theme.colors.background.primary};
        `;
    }
  }}
`;

export const StepContent = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const StepLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

export const StepStatus = styled.div`
  // font-size: 1.4rem;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ status, theme }) => {
    switch (status) {
      case 'Achevée': return theme.colors.success;
      case 'En cours': return theme.colors.primary;
      default: return theme.colors.text.secondary;
    }
  }};
`;

export const WorkflowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 0.8rem;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const WorkflowStep = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  min-width: 16rem;
  gap: 1.2rem;
`;

export const WorkflowTrack = styled.div`
  display: flex;
  align-items: center;
`;

export const WorkflowNode = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.2rem;
  font-weight: 600;

  flex-shrink: 0;

  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease;

  ${({ status, theme }) => {
    switch (status) {
      case 'completed':
        return `
          background: ${theme.colors.success};
          color: white;
          border: 1px solid transparent;
        `;

      case 'in_progress':
        return `
          background: ${theme.colors.primary}15;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary}40;
        `;

      case 'blocked':
        return `
          background: ${theme.colors.danger}15;
          color: ${theme.colors.danger};
          border: 1px solid ${theme.colors.danger}30;
        `;

      default:
        return `
          background: ${theme.surface.card};
          color: ${theme.colors.text.secondary};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}
`;

export const WorkflowLine = styled.div`
  width: 8rem;
  height: 1px;
  margin-inline: 0.8rem;

  background:
    ${({ $active, theme }) =>
      $active
        ? theme.colors.primary
        : theme.colors.border};
`;

export const WorkflowContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const WorkflowLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};

  white-space: nowrap;
`;

export const WorkflowMeta = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;