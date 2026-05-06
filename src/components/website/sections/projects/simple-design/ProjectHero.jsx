'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroWrapper = styled.section`
  padding: 4rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 5rem 2rem;
  }
`;

const Category = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  display: block;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const MetaGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
    margin-right: 0.5rem;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  
  &.en-cours {
    background: #10b98120;
    color: #10b981;
    border: 1px solid #10b981;
  }
  &.acheve {
    background: #6b728020;
    color: #6b7280;
    border: 1px solid #6b7280;
  }
  &.planifie {
    background: #f59e0b20;
    color: #f59e0b;
    border: 1px solid #f59e0b;
  }
`;

const Progress = styled.div`
  max-width: 400px;
  margin-top: 2rem;
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  .progress-bar {
    height: 6px;
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

export default function ProjectHero({ project }) {
  return (
    <HeroWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Category>{project.categoryLabel}</Category>
        <Title>{project.title}</Title>
        <Subtitle>{project.subtitle}</Subtitle>

        <MetaGrid>
          <MetaItem><strong>Localisation :</strong> {project.location}</MetaItem>
          <MetaItem><strong>Début :</strong> {project.startDate}</MetaItem>
          {project.endDate && <MetaItem><strong>Fin :</strong> {project.endDate}</MetaItem>}
          <MetaItem><strong>Budget :</strong> {project.budget}</MetaItem>
          {project.beneficiaries && <MetaItem><strong>Bénéficiaires :</strong> {project.beneficiaries}</MetaItem>}
        </MetaGrid>

        <StatusBadge className={project.status}>
          {project.status === 'en-cours' ? 'En cours' : 
           project.status === 'acheve' ? 'Achevé' : 'Planifié'}
        </StatusBadge>

        {project.status === 'en-cours' && (
          <Progress>
            <div className="progress-header">
              <span>Progression</span>
              <span>{project.progress}%</span>
            </div>
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </Progress>
        )}
      </motion.div>
    </HeroWrapper>
  );
}