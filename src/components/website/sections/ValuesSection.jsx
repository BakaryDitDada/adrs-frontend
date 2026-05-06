'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Users, Target, Shield, TrendingUp, Globe, Award } from 'lucide-react';
import {
  ValuesSectionContainer,
  ValuesContent,
  SectionTitle,
  SectionSubtitle,
  ValuesGrid,
  ValueCard,
  ValueIcon,
  ValueTitle,
  ValueDescription,
  ValuesQuote
} from './ValuesSection.styles'; 

const values = [
  {
    id: 1,
    icon: <Heart size={24} />,
    title: 'Engagement',
    description: 'Envers les communautés rurales avec dévouement et passion.',
    color: '#ef4444'
  },
  {
    id: 2,
    icon: <Eye size={24} />,
    title: 'Transparence',
    description: 'Dans la gestion des ressources avec intégrité et honnêteté.',
    color: '#3b82f6'
  },
  {
    id: 3,
    icon: <Target size={24} />,
    title: 'Innovation',
    description: 'Pour des solutions adaptées aux défis locaux et évolutifs.',
    color: '#8b5cf6'
  },
  {
    id: 4,
    icon: <Shield size={24} />,
    title: 'Durabilité',
    description: 'Des actions entreprises pour un impact à long terme.',
    color: '#10b981'
  },
  {
    id: 5,
    icon: <Users size={24} />,
    title: 'Collaboration',
    description: 'Partage des connaissances et travail d\'équipe efficace.',
    color: '#f59e0b'
  },
  {
    id: 6,
    icon: <TrendingUp size={24} />,
    title: 'Excellence',
    description: 'Recherche constante de la qualité et de l\'amélioration.',
    color: '#ec4899'
  },
  {
    id: 7,
    icon: <Globe size={24} />,
    title: 'Respect',
    description: 'De l\'environnement, des cultures et des traditions locales.',
    color: '#0ea5e9'
  },
  {
    id: 8,
    icon: <Award size={24} />,
    title: 'Responsabilité',
    description: 'Envers nos bénéficiaires, partenaires et bailleurs de fonds.',
    color: '#6366f1'
  }
];

export default function ValuesSection() {
  const [hoveredValue, setHoveredValue] = useState(null);

  return (
    <ValuesSectionContainer>
      <ValuesContent>
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
            Les principes qui guident chaque action et décision au sein de l&apos;ADRS.
          </SectionSubtitle>

          <ValuesGrid>
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onMouseEnter={() => setHoveredValue(value.id)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <ValueCard
                  $isHovered={hoveredValue === value.id}
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  <ValueIcon color={value.color}>
                    {value.icon}
                  </ValueIcon>
                  
                  <ValueTitle>{value.title}</ValueTitle>
                  
                  <ValueDescription>
                    {value.description}
                  </ValueDescription>
                </ValueCard>
              </motion.div>
            ))}
          </ValuesGrid>

          <ValuesQuote>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>
                Nos valeurs ne sont pas seulement des mots sur un mur, 
                ce sont des engagements concrets qui guident chaque projet, 
                chaque décision et chaque relation.
              </p>
              <span>- L&apos;Équipe ADRS</span>
            </motion.div>
          </ValuesQuote>
        </motion.div>
      </ValuesContent>
    </ValuesSectionContainer>
  );
}