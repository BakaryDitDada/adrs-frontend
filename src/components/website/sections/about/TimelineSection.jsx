'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { Calendar, Target, Users, TrendingUp, Award, Globe } from 'lucide-react';

import { SectionContainer, SectionContent, SectionTitle, SectionSubtitle } from '@/styles/pages/about.styles';
import * as S from "./TimelineSection.styles";

export default function TimelineSection() {
  const theme = useTheme();

  const milestones = [
    {
      year: '2010',
      title: 'Fondation de l\'ADRS',
      description: 'Création de l\'Agence de Développement Rural...',
      icon: <Target />
    },
    {
      year: '2013',
      title: 'Premier Projet Majeur',
      description: 'Formation de 500 agriculteurs.',
      icon: <Users />
    },
    {
      year: '2016',
      title: 'Expansion Territoriale',
      description: 'Extension à plus de 10 communes.',
      icon: <Globe />
    },
    {
      year: '2018',
      title: 'Périmètre G/H à Mahina',
      description: 'Aménagement de 300 hectares.',
      icon: <TrendingUp />
    },
    {
      year: '2021',
      title: 'Innovation Digitale',
      description: 'Digitalisation des services.',
      icon: <Award />
    },
    {
      year: '2023',
      title: 'Reconnaissance Nationale',
      description: 'Acteur clé du développement rural.',
      icon: <Target />
    }
  ];

  return (
    <SectionContainer style={{ backgroundColor: theme.colors.background.primary }}>
      <SectionContent>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <SectionTitle>
            Notre <span>Parcours</span> en Chiffres
          </SectionTitle>

          <SectionSubtitle>
            Des années d&apos;engagement et de réalisations qui ont transformé les communautés rurales.
          </SectionSubtitle>

          <S.TimelineContainer>

            {milestones.map((milestone, index) => (
              <S.TimelineItem
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >

                <S.TimelineDot />

                <S.TimelineContent>
                  <S.IconWrapper>
                    {milestone.icon}
                  </S.IconWrapper>

                  <S.TimelineYear>
                    <Calendar size={16} />
                    {milestone.year}
                  </S.TimelineYear>

                  <S.TimelineTitle>{milestone.title}</S.TimelineTitle>
                  <S.TimelineDescription>{milestone.description}</S.TimelineDescription>
                </S.TimelineContent>

              </S.TimelineItem>
            ))}

          </S.TimelineContainer>

        </motion.div>

      </SectionContent>
    </SectionContainer>
  );
}