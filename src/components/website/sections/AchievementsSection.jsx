'use client';

import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users, Award, Calendar, Target } from 'lucide-react';
import {
  AchievementsSectionContainer,
  AchievementsContent,
  SectionTitle,
  SectionSubtitle,
  AchievementsGrid,
  AchievementCard,
  AchievementIcon,
  AchievementYear,
  AchievementTitle,
  AchievementDescription,
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineDate
} from './AchievementsSection.styles';

// To get it from "homeContent"
const achievements = [
  {
    id: 1,
    icon: <Target size={24} />,
    year: '2023',
    title: 'Périmètre G/H à Mahina',
    description: 'Réalisation et achèvement du périmètre contribuant à l\'extension des surfaces cultivables de 200 hectares.',
    color: '#10b981'
  },
  {
    id: 2,
    icon: <TrendingUp size={24} />,
    year: '2022',
    title: 'Fichier Fournisseurs',
    description: 'Constitution d\'un fichier fournisseurs pour une gestion transparente et efficace des marchés publics.',
    color: '#3b82f6'
  },
  {
    id: 3,
    icon: <Users size={24} />,
    year: '2023',
    title: 'Appui Technique aux Agriculteurs',
    description: 'Appui technique et logistique aux campagnes agricoles, notamment en période de crue favorable.',
    color: '#8b5cf6'
  },
  {
    id: 4,
    icon: <Award size={24} />,
    year: '2024',
    title: 'Programme de Formation Avancée',
    description: 'Formation de 500 agriculteurs sur les techniques agricoles modernes et durables.',
    color: '#f59e0b'
  }
];

export default function AchievementsSection() {
  return (
    <AchievementsSectionContainer>
      <AchievementsContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>
            Nos <span>Réalisations</span> Phares
          </SectionTitle>
          
          <SectionSubtitle>
            Des projets concrets qui transforment la vie des communautés rurales et 
            contribuent au développement durable de la région.
          </SectionSubtitle>

          <AchievementsGrid>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <AchievementCard>
                  <AchievementIcon color={achievement.color}>
                    {achievement.icon}
                  </AchievementIcon>
                  
                  <AchievementYear>{achievement.year}</AchievementYear>
                  
                  <AchievementTitle>{achievement.title}</AchievementTitle>
                  
                  <AchievementDescription>
                    {achievement.description}
                  </AchievementDescription>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '15px',
                    color: achievement.color,
                    fontSize: '14px'
                  }}>
                    <CheckCircle size={16} />
                    <span>Projet Réussi</span>
                  </div>
                </AchievementCard>
              </motion.div>
            ))}
          </AchievementsGrid>

          {/* Timeline View for Mobile */}
          <Timeline>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TimelineItem>
                  <TimelineDot color={achievement.color} />
                  
                  <TimelineContent>
                    <TimelineDate>{achievement.year}</TimelineDate>
                    <h4 style={{
                      color: 'var(--text-primary)',
                      marginBottom: '5px',
                      fontSize: '1.125rem'
                    }}>
                      {achievement.title}
                    </h4>
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.9375rem',
                      margin: 0
                    }}>
                      {achievement.description}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              </motion.div>
            ))}
          </Timeline>
        </motion.div>
      </AchievementsContent>
    </AchievementsSectionContainer>
  );
}