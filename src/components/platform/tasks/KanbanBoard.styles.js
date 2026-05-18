import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  min-height: 50vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-width: 30rem;
  max-width: 35rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: unset;
    max-width: unset;
  }
`;

export const ColumnHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, color }) => {
    const c = theme.colors[color] || theme.colors.primary;
    return c + '10';
  }};
  border-radius: ${({ theme }) => theme.radii.lg} ${({ theme }) => theme.radii.lg} 0 0;
`;

export const ColumnTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TaskCount = styled.span`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.2rem 0.8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const TaskList = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  flex: 1;

  overflow-y: auto;

  min-height: 20rem;
  max-height: calc(100vh - 24rem);

  transition: background-color 0.2s ease;

  background-color: ${({ theme, $isDraggingOver }) =>
    $isDraggingOver === 'true'
      ? theme.colors.primary + '08'
      : 'transparent'};

  scrollbar-width: thin;
  scrollbar-color:
    ${({ theme }) => theme.colors.borderLight}
    transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent !important;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.full};

    transition: background 0.2s ease;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin-block: 0.4rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.borderLight};
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

// export const TaskList = styled.div`
//   padding: ${({ theme }) => theme.spacing.md};
//   flex: 1;
//   overflow-y: auto;
//   min-height: 10rem;
//   background-color: ${({ theme, $isDraggingOver }) =>
//     $isDraggingOver === "true" ? theme.colors.primary + '05' : 'transparent'};
//   transition: background-color 0.2s;
// `;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid
    ${({ theme, status }) => {
      switch (status) {
        case 'A Faire':
          return theme.colors.neutral.gray400;

        case 'En cours':
          return theme.colors.info;

        case 'Terminé':
          return theme.colors.success;

        default:
          return theme.colors.primary;
      }
    }};

  border-radius: ${({ theme }) => theme.radii.lg};

  padding: ${({ theme }) => theme.spacing.md};

  margin-bottom: ${({ theme }) => theme.spacing.md};

  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0.02),
      transparent
    ),
    ${({ theme }) => theme.colors.background.primary};

  box-shadow: ${({ theme, $isDragging }) =>
    $isDragging === "true"
      ? theme.shadows.xl
      : theme.shadows.sm};

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  cursor: grab;

  user-select: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:active {
    cursor: grabbing;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};

  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// export const Card = styled.div`
//   background-color: ${({ theme }) => theme.colors.background.primary};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.radii.md};
//   padding: ${({ theme }) => theme.spacing.md};
//   margin-bottom: ${({ theme }) => theme.spacing.sm};
//   box-shadow: ${({ theme, isDragging }) =>
//     isDragging ? theme.shadows.lg : theme.shadows.sm};
//   cursor: grab;
//   transition: box-shadow 0.2s;
//   &:hover {
//     box-shadow: ${({ theme }) => theme.shadows.md};
//   }
//   &:active {
//     cursor: grabbing;
//   }
// `;

// export const CardTitle = styled.h4`
//   font-size: ${({ theme }) => theme.fontSizes.body};
//   font-weight: ${({ theme }) => theme.fontWeights.medium};
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: ${({ theme }) => theme.spacing.xs};
// `;

export const CardTitle = styled.h4`
  flex: 1;

  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  color: ${({ theme }) => theme.colors.text.primary};

  line-height: 1.4;

  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.4;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const PriorityBadge = styled.span`
  padding: 0.1rem 0.6rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  background-color: ${({ theme, priority }) => {
    switch (priority) {
      case 'low': return theme.colors.background.tertiary;
      case 'medium': return theme.colors.warning + '20';
      case 'high': return theme.colors.error + '20';
      case 'critical': return theme.colors.error + '30';
      default: return theme.colors.background.tertiary;
    }
  }};
  color: ${({ theme, priority }) => {
    switch (priority) {
      case 'low': return theme.colors.text.secondary;
      case 'medium': return theme.colors.warning;
      case 'high': return theme.colors.error;
      case 'critical': return theme.colors.error;
      default: return theme.colors.text.secondary;
    }
  }};
`;

export const DueDate = styled.span`
  font-size: 1.1rem;
  color: ${({ theme, overdue }) =>
    overdue === "true" ? theme.colors.error : theme.colors.text.light};
  font-weight: ${({ overdue }) => (overdue === "true" ? '500' : 'normal')};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const Assignees = styled.div`
  display: flex;
  align-items: center;
`;

export const AssigneeGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const AssigneeAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${({ theme }) => theme.colors.background.primary};

  margin-left: -0.6rem;

  &:first-child {
    margin-left: 0;
  }
`;

export const RemainingUsers = styled.div`
  margin-left: 0.8rem;
  font-size: ${({ theme }) => theme.fontSizes.caption || "1.2rem"};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 600;
`;

export const Unassigned = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.light};
`;

export const Assignee = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.light};
`;

// export const Actions = styled.div`
//   display: flex;
//   gap: 0.4rem;
//   opacity: 0;
//   ${Card}:hover & {
//     opacity: 1;
//   }
//   transition: opacity 0.2s;
// `;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  opacity: 0.7;

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

export const ActionBtn = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, danger }) =>
    danger === "true" ? theme.colors.error : theme.colors.text.secondary};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-color: ${({ theme, danger }) =>
      danger ? theme.colors.error : theme.colors.primary};
    color: ${({ theme, danger }) =>
      danger ? theme.colors.error : theme.colors.primary};
  }
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
`;

export const EmptyColumn = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};

  padding: ${({ theme }) => theme.spacing.lg};

  text-align: center;

  color: ${({ theme }) => theme.colors.text.light};

  font-size: ${({ theme }) => theme.fontSizes.caption};
`;