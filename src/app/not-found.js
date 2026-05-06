// app/not-found.js
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Home, Search } from 'lucide-react';

const NotFoundContainer = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 600px;
  text-align: center;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-bottom: 1rem;
  text-shadow: 4px 4px 0 ${({ theme }) => theme.colors.primary}20;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: 1.5rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 10px 25px ${({ theme }) => theme.colors.primary}30;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}10;
    transform: translateY(-2px);
  }
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
      <Content>
        <ErrorCode
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </ErrorCode>
        
        <Title
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Page non trouvée
        </Title>
        
        <Description
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          Vérifiez l&apos;URL ou retournez à l&apos;accueil.
        </Description>
        
        <ButtonGroup
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <PrimaryButton href="/">
            <Home size={20} />
            Retour à l&apos;accueil
          </PrimaryButton>
          <SecondaryButton href="/contact">
            <Search size={20} />
            Nous contacter
          </SecondaryButton>
        </ButtonGroup>
      </Content>
    </NotFoundContainer>
  );
}