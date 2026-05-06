import { motion } from 'framer-motion';
import styled from 'styled-components';

export const HeroWrapper = styled.section`
  padding: 4rem 1rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, ${({ theme }) => theme.fontSizes.h1});
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HeroSubtitle = styled(motion.p)`
  // font-size: 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;