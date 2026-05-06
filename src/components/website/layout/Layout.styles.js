import styled, { css } from 'styled-components';
import Link from 'next/link';
import responsive from '@/styles/Responsive';

export const MainContent = styled.main`
  min-height: 100vh;
  padding-top: 13rem; /* Account for fixed header */
  
  @media (max-width: 768px) {
    padding-top: 10rem;
  }

`;

/************************ ******************/
/*********** PUBLIC HEADER STYLES **********/
/************************ ******************/
/**
 * Header Container with dynamic background based on scroll
 * @param {boolean} isScrolled - Indicates if the page is scrolled
 */
export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme, $isScrolled }) => 
    $isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) => $isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: 1px solid ${({ theme, $isScrolled }) => 
    $isScrolled ? theme.colors.border : 'transparent'};
  transition: all 0.3s ease;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: ${({ $isColumn }) => $isColumn ? 'column' : 'row'};
  gap: ${({ $gap }) => $gap || '1.5rem'};
  
  @media (max-width: 1024px) {
    gap: 1.5rem;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: ${({ $isColumn }) => $isColumn ? 'flex-start' : 'center'};
  gap: ${({ $isColumn }) => $isColumn ? '1.2rem' : '.8rem'};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  
  svg {
    flex-shrink: 0;
    margin-top: 2px;
    width: 1.6rem;
    height: 1.6rem;
  }
  
  span {
    line-height: 1.5;
  }
`;

/** 
 * Top Bar Styles
 */
export const TopBar = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: .8rem 0;
  
  ${responsive(css`
    display: none;
  `, "sm")}

`;

export const TopBarContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
`;

export const MainNav = styled.nav`
  padding: .8rem 0;
  background: ${({theme}) => theme.colors.background.primary};
`;

export const NavContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  text-decoration: none;
  z-index: 1001;
  padding: 1rem;
  border: 1px solid #ab9bf8;
  border-radius: 8px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  
  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    line-height: 1.2;
  }
  
  span {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  ${responsive(css`
    h1 {
      font-size: 20px;
    }
    span {
      font-size: 12px;
    }
  `, "sm")}
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  
  ${responsive(css`
    gap: 30px
  `, "lg")}
  
  ${responsive(css`
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => $isOpen ? '0' : '-100%'};
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.colors.background.primary};
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    transition: left 0.3s ease;
    padding: 80px 20px;`,
    "sm"
  )}
`;

export const NavLink = styled(Link)`
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 16px;
  position: relative;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ $isActive }) => $isActive ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const CTAButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1.2rem 2.4rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  ${responsive(css`
    font-size: 18px;
    padding: 15px 30px;`, 
  "sm")}
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  padding: 8px;
  z-index: 1001;

  ${responsive(css`display: block;`, "sm")}

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

/************************ ******************/
/*********** PUBLIC FOOTER STYLES **********/
/************************ ******************/
export const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding-top: 6.5rem;
  position: relative
`;

export const GoToTop = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  width: 6rem;
  height: 6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.primary};
  cursor: pointer;
  transition: border .3s ease-in-out;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const FooterContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const FooterSection = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 2rem;
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

export const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  
  li {
    margin-bottom: 1.4rem;
  }
  
  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: none;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      padding-left: .5rem;
    }
  }
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  // font-size: ${({ theme }) => theme.fontSizes.caption};
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

export const NewsletterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

export const NewsletterDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

export const Hours = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  
  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;

/************************ *********************/
/*********** DASHBOARD LAYOUT STYLES **********/
/************************ *********************/
export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const DashMainContent = styled.main`
  flex: 1;
  margin-left: ${({ $sidebarOpen }) => ($sidebarOpen ? '260px' : '0')};
  margin-top: 70px;
  padding: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  transition: margin-left 0.3s ease;
  min-height: calc(100vh - 70px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;
