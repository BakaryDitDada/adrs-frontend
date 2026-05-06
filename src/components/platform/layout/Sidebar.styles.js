import Link from 'next/link';
import styled, { css } from 'styled-components';

export const DesktopSidebar = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ collapsed }) => (collapsed === "true" ? '8rem' : '26rem')};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

// export const Logo = styled.div`
//   padding: 0 ${({ theme }) => theme.spacing.lg};
//   margin-bottom: ${({ theme }) => theme.spacing.xl};
//   font-size: 2.4rem;
//   font-weight: ${({ theme }) => theme.fontWeights.bold};
//   color: ${({ theme }) => theme.colors.primary};
//   text-align: center;
// `;

// ---------- LOGO STYLING
export const LogoWrapper = styled.div`
  width: 90%;
  margin: 0 auto;

  &.mb {
    margin-bottom: 2rem;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-decoration: none;
  z-index: 1001;
  padding: 10px;
  border: 1px solid #ab9bf8;
  border-radius: 8px;
  transition: border-color 0.2s ease;

  & .mb { margin-bottom: 2rem; };

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    line-height: 1.2;
  }
  
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 20px;
    }
    span {
      font-size: 12px;
    }
  }
`;

export const LogoImage = styled.div`
  width: 60px;
  height: 50px;
  border-radius: 8px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 20px;

  & .green { color: #07740a; }
  & .yellow { color: #FFEB3B; }
  & .red { color: #F44336; }
`;
// ----------- END ---------------

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xm};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

// export const NavItem = styled.a`
export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme, $active }) =>
    $active === "true" ? theme.colors.primary : theme.colors.text.secondary};
  background-color: ${({ theme, $active }) =>
    $active === "true" ? theme.colors.primary + '10' : 'transparent'};
  transition: all 0.2s;
  cursor: pointer;
  ${({ $collapsed }) =>
    $collapsed === "true" &&
    css`
      justify-content: center;
      padding: ${({ theme }) => theme.spacing.md} 0;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary + '20'};
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    white-space: nowrap;
  }
`;

export const CollapseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MobileDrawer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 26rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  z-index: 200;
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;