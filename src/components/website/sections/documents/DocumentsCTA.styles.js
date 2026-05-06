import styled from 'styled-components';
import Link from 'next/link';

export const CTAContainer = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  margin: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md} ${theme.spacing.xxl}`};
  color: white;
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xxl}`};
    margin: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xxl}`};
  }
`;

export const CTATitle = styled.h3`
  font-size: clamp(2rem, 5vw, ${({ theme }) => theme.fontSizes.h3});
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

export const CTADescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const CTAButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const PrimaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const SecondaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: white;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;