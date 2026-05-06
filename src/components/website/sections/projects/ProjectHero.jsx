'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import * as S from './ProjectHero.styles';

export default function ProjectHero({ project }) {
  const infoItems = [
    { icon: <MapPin />, label: 'Localisation', value: project.location },
    { icon: <Calendar />, label: 'Début', value: project.startDate },
    { icon: <Calendar />, label: 'Fin', value: project.endDate || 'En cours' },
    { icon: <DollarSign />, label: 'Budget', value: project.budget },
    { icon: <Users />, label: 'Bénéficiaires', value: project.beneficiaries },
  ];

  return (
    <S.HeroContainer>
      <S.HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <S.CategoryBadge>{project.categoryLabel}</S.CategoryBadge>
          <S.ProjectTitle>{project.title}</S.ProjectTitle>
          <S.ProjectSubtitle>{project.subtitle}</S.ProjectSubtitle>

          <S.InfoGrid>
            {infoItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <S.InfoItem>
                  <div className="icon">{item.icon}</div>
                  <div className="label">{item.label}</div>
                  <div className="value">{item.value}</div>
                </S.InfoItem>
              </motion.div>
            ))}
          </S.InfoGrid>

          <S.StatusBadge className={project.status}>
            {project.status === 'en-cours' ? 'En cours' : 
             project.status === 'acheve' ? 'Achevé' : 'Planifié'}
          </S.StatusBadge>

          {project.status === 'en-cours' && (
            <S.ProgressContainer $progress={project.progress}>
              <div className="progress-header">
                <span>Progression</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </S.ProgressContainer>
          )}
        </motion.div>
      </S.HeroContent>
    </S.HeroContainer>
  );
}