'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const PartnersWrapper = styled.section`
  padding: 4rem 1rem;
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

const LogoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  align-items: center;
`;

const Partner = styled(motion.div)`
  text-align: center;
  
  .logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background.secondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }
  
  .name {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 0.875rem;
  }
`;

export default function ProjectPartners({ partners }) {
  return (
    <PartnersWrapper>
      <Title>Partenaires</Title>
      <LogoGrid>
        {partners.map((partner, idx) => (
          <Partner
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="logo">
              {/* Replace with actual image */}
              <div style={{ fontSize: '0.75rem', color: '#666' }}>Logo</div>
            </div>
            <div className="name">{partner.name}</div>
          </Partner>
        ))}
      </LogoGrid>
    </PartnersWrapper>
  );
}