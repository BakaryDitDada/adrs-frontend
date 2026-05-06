import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ================= GRID ================= */

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/* ================= CARD ================= */

export const ValueCard = styled(motion.div)`
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.background.primary},
    ${({ theme }) => theme.colors.background.secondary}
  );
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};

    .value-icon {
      transform: scale(1.1) rotate(5deg);
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ $color }) => $color},
      ${({ $color }) => `${$color}80`}
    );
  }
`;

/* ================= ICON ================= */

export const ValueIcon = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ $color }) => `${$color}15`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  svg {
    color: ${({ $color }) => $color};
    width: 2.8rem;
    height: 2.8rem;
  }
`;

/* ================= TEXT ================= */

export const ValueTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

export const ValueDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;