import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: ${({ collapsed }) => (collapsed === "true" ? '8rem' : '26rem')};
  transition: margin-left 0.3s ease;
  background-color: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
  }
`;

export const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;