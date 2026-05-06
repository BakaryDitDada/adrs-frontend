'use client';

import { motion } from 'framer-motion';
import { Users, Droplets, Sprout, TrendingUp } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/project-detail.styles';
import * as S from './ProjectDetail.styles';

// Mock stats - replace with real data from project
export default function ProjectDetail({ project }) {
  const stats = [
    {
      icon: <Users />,
      value: `${project.beneficiaries}+`,
      label: 'Bénéficiaires directs'
    },
    {
      icon: <Droplets />,
      value: '30%',
      label: "Réduction consommation d'eau"
    },
    {
      icon: <Sprout />,
      value: '50%',
      label: "Augmentation des rendements"
    },
    {
      icon: <TrendingUp />,
      value: '150',
      label: 'Emplois créés'
    },
  ];

  return (
    <SectionContainer>
      <SectionContent>
        <S.StatsGrid>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <S.StatCard>
                <S.StatIcon>{stat.icon}</S.StatIcon>
                <S.StatValue>{stat.value}</S.StatValue>
                <S.StatLabel>{stat.label}</S.StatLabel>
              </S.StatCard>
            </motion.div>
          ))}
        </S.StatsGrid>
      </SectionContent>
      <S.DescriptionContainer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <S.Content dangerouslySetInnerHTML={{ __html: project.description }} />
      </S.DescriptionContainer>
    </SectionContainer>
  );
}