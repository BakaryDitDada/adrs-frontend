import styled from 'styled-components';

// ---------- LAYOUT ----------

export const Page = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  // background: ${({ theme }) => theme.mode === 'dark' ? '#020817' : theme.colors.background.secondary};
  // background: ${({ theme }) => theme.mode === 'dark' ? '#020817' : theme.colors.background.secondary};
`;

export const Container = styled.div`
  max-width: 160rem;
  margin: 0 auto;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $hasSidebar }) =>
    $hasSidebar ? 'minmax(0, 1fr) minmax(0, 32rem)' : '1fr'};
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  position: sticky;
  top: 2rem;
  height: fit-content;
`;

// ---------- BREADCRUMBS ----------

export const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const BreadcrumbLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const BreadcrumbText = styled.span``;

export const BreadcrumbSeparator = styled.span`
  margin: 0 0.4rem;
  // color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.borderSecondary};
`;

// ---------- HEADER & ACTIONS ----------

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.4rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.caption};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'danger' ? theme.colors.error : theme.colors.borderSecondary};
  background-color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'danger'
      ? 'transparent'
      : theme.colors.background.primary};
  color: ${({ theme, variant }) =>
    variant === 'primary'
      ? 'white'
      : variant === 'danger'
      ? theme.colors.error
      : theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'primary'
        ? theme.colors.primaryDark
        : variant === 'danger'
        ? theme.colors.error + '10'
        : theme.colors.background.tertiary};
    border-color: ${({ theme, variant }) =>
      variant === 'danger' ? theme.colors.error : theme.colors.primary};
    color: ${({ theme, variant }) =>
      variant === 'danger' ? theme.colors.error : theme.colors.primary};
  }
`;

export const Card = styled.section`
  // background: ${({ theme }) => theme.colors.background.primary};
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const CardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CardIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Divider = styled.hr`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  border: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// ---------- INFO GRID ----------

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const InfoContent = styled.div`
  min-heigh: 20rem;
`;

export const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

export const InfoDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  margin-top: .5rem;
`;

export const InfoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 4rem;
`;

export const InfoFooterSection = styled.div`
  display: flex;
  gap: 1rem;
`;

// ---------- BADGES ----------

export const StatusBadge = styled.span`
  display: inline-flex;
  padding: 0.8rem 1.6rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => `${theme.colors.primary}20`};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const PriorityBadge = styled.span`
  display: inline-flex;
  padding: 0.8rem 1.6rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => `${theme.colors.warning}20`};
  border: 1px solid ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 700;
`;

// ---------- PROGRESS / WORKFLOW ----------
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

// ---------- DESCRIPTION ----------

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  font-size: 1.7rem;
`;

// ---------- SUBTASKS ----------

export const SubtaskList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubtaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SubtaskLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Checkbox = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $completed, theme }) =>
    $completed
      ? `background: ${theme.colors.primary}; color: white;`
      : `border: 1px solid ${theme.colors.border};`}
`;

export const SubtaskLabel = styled.div`
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  opacity: ${({ $completed }) => ($completed ? 0.6 : 1)};
`;

export const SubtaskRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SubtaskDate = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: 1.5rem;
`;

export const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const AddSubtask = styled.button`
  margin-top: ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 1.6rem;
  text-align: left;
`;

// ---------- SIDEBAR ELEMENTS ----------

export const AssigneeList = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AddAvatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 2rem;
`;

export const MetadataList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const MetadataRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
`;

export const AttachmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const AttachmentItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AttachmentItem = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const AttachmentName = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.4rem;
  font-weight: 600;
`;

export const AttachmentMeta = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.4rem;
`;