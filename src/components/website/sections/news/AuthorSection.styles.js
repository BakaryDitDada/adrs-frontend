import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AuthorContainer = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const AuthorCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const AuthorAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: linear-gradient(
    135deg,
    ${({ theme }) => `${theme.colors.primary}20`},
    ${({ theme }) => `${theme.colors.secondary}20`}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 60px;
    height: 60px;
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0;
  }
`;

export const AuthorInfo = styled.div`
  flex: 1;
`;

export const AuthorName = styled.h3`
  // font-size: 1.75rem;
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const AuthorRole = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const AuthorBio = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const AuthorSocial = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.secondary};
    transition: all 0.3s ease;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;