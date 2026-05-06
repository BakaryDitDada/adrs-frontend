'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { Shield, Target, Users, Leaf, Heart, Zap } from 'lucide-react';

import { SectionContainer, SectionContent, SectionTitle, SectionSubtitle } from '@/styles/pages/about.styles';
import * as S from "./ValuesSection.styles";

export default function AboutValuesSection() {
  const theme = useTheme();

  const values = [
    {
      icon: Shield,
      title: 'Intégrité',
      description: 'Nous agissons avec transparence et éthique dans toutes nos interventions.',
      color: '#2563eb'
    },
    {
      icon: Target,
      title: 'Impact Durable',
      description: 'Des résultats durables qui transforment les communautés rurales.',
      color: '#10b981'
    },
    {
      icon: Users,
      title: 'Inclusion',
      description: 'Un développement équitable pour tous, sans discrimination.',
      color: '#7c3aed'
    },
    {
      icon: Leaf,
      title: 'Durabilité Environnementale',
      description: 'Préservation des ressources naturelles et agriculture responsable.',
      color: '#22c55e'
    },
    {
      icon: Heart,
      title: 'Solidarité',
      description: 'Collaboration étroite avec les communautés locales.',
      color: '#ec4899'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Solutions innovantes pour les défis du développement rural.',
      color: '#f59e0b'
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
            Nos <span>Valeurs</span> Fondamentales
          </SectionTitle>

          <SectionSubtitle>
            Les principes qui guident notre action quotidienne.
          </SectionSubtitle>

          <S.ValuesGrid>
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <S.ValueCard
                  key={value.title}
                  $color={value.color}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >

                  <S.ValueIcon className="value-icon" $color={value.color}>
                    <Icon />
                  </S.ValueIcon>

                  <S.ValueTitle>{value.title}</S.ValueTitle>
                  <S.ValueDescription>{value.description}</S.ValueDescription>

                </S.ValueCard>
              );
            })}
          </S.ValuesGrid>

        </motion.div>

      </SectionContent>
    </SectionContainer>
  );
}