'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Calendar } from 'lucide-react';
import * as S from './ProjectTimeline.styles';

export default function ProjectTimeline({ timeline }) {
  return (
    <S.TimelineWrapper>
      <S.TimelineContainer>
        <S.Title>Phases du projet</S.Title>
        <S.PhasesList>
          {timeline.map((phase, idx) => (
            <S.Phase
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <S.PhaseIcon $status={phase.status}>
                {phase.status === 'completed' ? <CheckCircle /> : 
                 phase.status === 'in-progress' ? <Clock /> : 
                 <Calendar />}
              </S.PhaseIcon>
              <S.PhaseContent>
                <S.PhaseTitle>{phase.phase}</S.PhaseTitle>
                <S.PhaseDate>
                  <Calendar size={14} />
                  {phase.date}
                </S.PhaseDate>
                <S.PhaseStatus className={phase.status}>
                  {phase.status === 'completed' ? 'Terminé' :
                   phase.status === 'in-progress' ? 'En cours' : 'Planifié'}
                </S.PhaseStatus>
              </S.PhaseContent>
            </S.Phase>
          ))}
        </S.PhasesList>
      </S.TimelineContainer>
    </S.TimelineWrapper>
  );
}