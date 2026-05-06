import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.md}; // 8px
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg}; // 24px
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const Header = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.h3}; // 24px
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StepContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px

  & h3 {
    font-size: ${({ theme }) => theme.fontSizes.bodyLg};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  & p {
    font-size: ${({ theme }) => theme.fontSizes.caption}; 
  }
`;

export const DropZone = styled.div`
  border: 2px dashed ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl}; // 40px
  text-align: center;
  border-radius: ${({ theme }) => theme.radii.sm}; // 4px
  font-size: ${({ theme }) => theme.fontSizes.body};
  cursor: pointer;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const FileName = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-top: ${({ theme }) => theme.spacing.xs}; // 8px
`;

export const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 18px
`;

export const MappingTable = styled.table`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.md} 0; // 16px

  & thead {
    font-size: ${({ theme }) => theme.fontSizes.h3};
    text-align: left;
  }

  & tbody {
    font-size: ${({ theme }) => theme.fontSizes.body};

    & select {
      padding: ${({ theme }) => theme.spacing.xs};
    }
  }

  th, td {
    padding: ${({ theme }) => theme.spacing.xs}; // 8px
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const SummaryBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md}; // 16px
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // 12px
  font-size: ${({ theme }) => theme.fontSizes.caption};
  
  .error { color: ${({ theme }) => theme.colors.error}; }
`;

export const TableWrapper = styled.div`
  max-height: 300px;
  overflow: auto;
  padding-right: ${({ theme }) => theme.spacing.sm}; // espace entre contenu et scrollbar
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: ${({ theme }) => theme.spacing.xs}; // 6px
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  th {
    font-size: ${({ theme }) => theme.fontSizes.body};
  }

  td {
    font-size: ${({ theme }) => theme.fontSizes.caption};
  }
  
  .has-error { background: ${({ theme }) => theme.colors.error}10; }
  
  .error-cell ul {
    margin: 0;
    padding-left: ${({ theme }) => theme.spacing.md}; // 16px
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm}; // 12px
  margin-top: ${({ theme }) => theme.spacing.md}; // 16px
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg}; // 10px 24px
  border-radius: ${({ theme }) => theme.radii.sm}; // 4px
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  background: ${({ theme }) => theme.colors.background.secondary};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xs}; // 8px
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs}; // 8px
`;