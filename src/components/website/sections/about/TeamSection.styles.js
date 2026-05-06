import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ================= GRID ================= */

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/* ================= CARD ================= */

export const TeamCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.xl};

    .team-image {
      transform: scale(1.05);
    }
  }
`;

/* ================= HEADER ================= */

export const CardHeader = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

export const TeamImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.secondary}10
  );

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.3;
  }
`;

export const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

/* ================= SOCIAL ================= */

export const SocialButton = styled.a`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

/* ================= BODY ================= */

export const CardBody = styled.div`
  padding: 1.5rem;
`;

export const MemberName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MemberRole = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  margin-bottom: 1rem;
`;

export const MemberBio = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  margin-bottom: 1rem;
`;

/* ================= TAGS ================= */

export const ExpertiseList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ExpertiseTag = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  padding: 0.25rem 0.75rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;