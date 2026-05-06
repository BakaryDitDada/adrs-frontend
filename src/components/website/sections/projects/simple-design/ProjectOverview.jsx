'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Droplets, Sprout, TrendingUp, Users } from 'lucide-react';

const OverviewWrapper = styled.section`
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const OverviewContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const OverviewTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }
`;

const MetricItem = styled.div`
  text-align: center;
  
  .value {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.25rem;
  }
  
  .label {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

// We'll derive these from project data or keep static for demo
export default function ProjectOverview({ project }) {
  const metrics = [
    { value: `${project.beneficiaries}+`, label: 'Bénéficiaires' },
    { value: '30%', label: "Réduction eau" },
    { value: '50%', label: "Rendement +" },
    { value: '150', label: 'Emplois créés' },
  ];

  return (
    <OverviewWrapper>
      <OverviewContainer>
        <OverviewTitle>Impact en chiffres</OverviewTitle>
        <MetricsGrid>
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <MetricItem>
                <div className="value">{metric.value}</div>
                <div className="label">{metric.label}</div>
              </MetricItem>
            </motion.div>
          ))}
        </MetricsGrid>
      </OverviewContainer>
    </OverviewWrapper>
  );
}