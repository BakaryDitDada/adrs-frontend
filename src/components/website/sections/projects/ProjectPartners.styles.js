import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PartnersContainer = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ $padding }) => $padding || "4rem 1rem"};
`;

export const PartnersTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  text-align: center;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    // font-size: 2.5rem;
  }
`;

export const PartnersGrid = styled.div`
  width: 100%;
  gap: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    // grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const PartnerItem = styled(motion.div)`
  text-align: center;
  
  .logo {
    width: 12rem;
    height: 12rem;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${({ theme }) => theme.colors.background.secondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  
  .name {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;