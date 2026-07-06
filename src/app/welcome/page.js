'use client';

import React from 'react';
import styled from 'styled-components';

import ThemeToggle from '@/components/common/ThemeToggle';
import { Container, Title, Description, ColorDemo, ColorBox } from '@/styles/common/welcome.styles';

export default function Welcome() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return null;
  }

  return (
    <Container>
      <Title>Welcome to ADRS Mali</Title>
      <Description>
        Plateforme de gestion intégrée pour ADRS Mali
      </Description>
      
      <div style={{ marginTop: '2rem' }}>
        <ThemeToggle />
      </div>
      
      <ColorDemo>
        <ColorBox bg="var(--primary-color)" color="white">
          Primary
        </ColorBox>
        <ColorBox bg="#10b981" color="white">
          Success
        </ColorBox>
        <ColorBox bg="#f59e0b" color="white">
          Warning
        </ColorBox>
        <ColorBox bg="#ef4444" color="white">
          Error
        </ColorBox>
      </ColorDemo>
      
      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem',
        background: 'var(--background-secondary)',
        borderRadius: '12px',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          Current theme applied instantly. Try clicking the theme buttons above!
        </p>
      </div>
    </Container>
  );
}