'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { CheckCircle, Clock, Calendar } from 'lucide-react';

const TimelineWrapper = styled.section`
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 3rem;
  text-align: center;
`;

const PhasesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${({ theme }) => theme.colors.border};
      z-index: 1;
    }
  }
`;

const Phase = styled(motion.div)`
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    gap: 1.5rem;
    text-align: left;
    align-items: flex-start;
  }
`;

const PhaseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 3px solid ${({ $status, theme }) => 
    $status === 'completed' ? theme.colors.success :
    $status === 'in-progress' ? theme.colors.primary :
    theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: ${({ $status, theme }) => 
    $status === 'completed' ? theme.colors.success :
    $status === 'in-progress' ? theme.colors.primary :
    theme.colors.text.light};
  background: ${({ theme }) => theme.colors.background.primary};
  
  svg {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 1rem 0 0;
    width: 60px;
    height: 60px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const PhaseContent = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1;
  }
`;

const PhaseTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

const PhaseDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }
`;

const PhaseStatus = styled.span`
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  
  &.completed {
    background: ${({ theme }) => theme.colors.success}20;
    color: ${({ theme }) => theme.colors.success};
  }
  &.in-progress {
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
  }
  &.planned {
    background: ${({ theme }) => theme.colors.text.light}20;
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

export default function ProjectTimeline({ timeline }) {
  return (
    <TimelineWrapper>
      <TimelineContainer>
        <Title>Phases du projet</Title>
        <PhasesList>
          {timeline.map((phase, idx) => (
            <Phase
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <PhaseIcon $status={phase.status}>
                {phase.status === 'completed' ? <CheckCircle /> : 
                 phase.status === 'in-progress' ? <Clock /> : 
                 <Calendar />}
              </PhaseIcon>
              <PhaseContent>
                <PhaseTitle>{phase.phase}</PhaseTitle>
                <PhaseDate>
                  <Calendar size={14} />
                  {phase.date}
                </PhaseDate>
                <PhaseStatus className={phase.status}>
                  {phase.status === 'completed' ? 'Terminé' :
                   phase.status === 'in-progress' ? 'En cours' : 'Planifié'}
                </PhaseStatus>
              </PhaseContent>
            </Phase>
          ))}
        </PhasesList>
      </TimelineContainer>
    </TimelineWrapper>
  );
}