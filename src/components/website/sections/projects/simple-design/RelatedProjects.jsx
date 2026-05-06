'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const RelatedWrapper = styled.section`
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const RelatedContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const CardCategory = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const CardTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const CardLocation = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  svg {
    transition: transform 0.2s;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

export default function RelatedProjects({ projects }) {
  return (
    <RelatedWrapper>
      <RelatedContainer>
        <Title>Projets similaires</Title>
        <Grid>
          {projects.slice(0, 3).map((project, idx) => (
            <Card
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <CardCategory>{project.categoryLabel}</CardCategory>
              <CardTitle>{project.title}</CardTitle>
              <CardLocation>{project.location}</CardLocation>
              <CardLink href={`/projects/${project.slug}`}>
                Voir le projet
                <ArrowRight size={14} />
              </CardLink>
            </Card>
          ))}
        </Grid>
      </RelatedContainer>
    </RelatedWrapper>
  );
}