'use client';

import { motion } from 'framer-motion';
import { Newspaper, Calendar, TrendingUp, Users } from 'lucide-react';
import {
  HeroContainer,
  HeroContent,
  HeroTitle,
  HeroDescription,
  StatsGrid,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel
} from './NewsHero.styles';

export default function NewsHero() {
  const stats = [
    { icon: <Newspaper />, number: '100+', label: 'Articles Publiés', color: '#2563eb' },
    { icon: <Calendar />, number: '24', label: 'Mises à Jour Mensuelles', color: '#10b981' },
    { icon: <TrendingUp />, number: '10K+', label: 'Lecteurs Engagés', color: '#7c3aed' },
    { icon: <Users />, number: '50+', label: 'Auteurs Experts', color: '#f59e0b' }
  ];

  return (
    <HeroContainer>
      <HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroTitle>
            <span className="gradient-text">Actualités</span> &{' '}
            <span className="gradient-text">Mises à Jour</span>
          </HeroTitle>
          
          <HeroDescription>
            Restez informé des dernières nouvelles, projets et développements 
            dans la vallée du fleuve Sénégal. Suivez notre impact en temps réel.
          </HeroDescription>
          
          <StatsGrid
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <StatCard>
                  <StatIcon color={stat.color}>{stat.icon}</StatIcon>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              </motion.div>
            ))}
          </StatsGrid>
        </motion.div>
      </HeroContent>
    </HeroContainer>
  );
}
