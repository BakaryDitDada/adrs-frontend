'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import { MessageSquare, FileText } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/project-detail.styles';

const CTAContainer = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  border-radius: 30px;
  padding: 3rem 2rem;
  margin: 2rem 1rem 4rem;
  color: white;
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 4rem 3rem;
    margin: 2rem 2rem 4rem;
  }
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: 1.5rem;
  }
`;

const PrimaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const SecondaryCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: white;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

export default function ProjectCTA() {
  return (
    <SectionContainer>
      <SectionContent>
        <CTAContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CTATitle>Intéressé par ce projet ?</CTATitle>
            <CTADescription>
              Contactez-nous pour plus d&apos;informations ou pour discuter d&apos;une collaboration.
            </CTADescription>
            <CTAButtonGroup>
              <PrimaryCTA href="/contact">
                <MessageSquare size={20} />
                Nous contacter
              </PrimaryCTA>
              <SecondaryCTA href="/documents">
                <FileText size={20} />
                Voir les documents
              </SecondaryCTA>
            </CTAButtonGroup>
          </motion.div>
        </CTAContainer>
      </SectionContent>
    </SectionContainer>
  );
}