'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, Droplets, Users, Target, 
  Building2, TrendingUp, Shield, Globe 
} from 'lucide-react';
import {
  FeaturesSectionContainer,
  FeaturesContent,
  SectionTitle,
  SectionSubtitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  FeatureButton
} from './FeaturesSection.styles'; 

// Put this inside "homeContent"
const features = [
  {
    id: 1,
    icon: <Sprout size={28} />,
    title: 'Agriculture Durable',
    description: 'Développement de périmètres agricoles innovants, amélioration des rendements et diversification des cultures.',
    color: '#10b981'
  },
  {
    id: 2,
    icon: <Droplets size={28} />,
    title: 'Hydraulique Rurale',
    description: 'Accès à l\'eau potable, systèmes d\'irrigation modernes et gestion durable des ressources en eau.',
    color: '#0ea5e9'
  },
  {
    id: 3,
    icon: <Users size={28} />,
    title: 'Formation & Accompagnement',
    description: 'Renforcement des capacités techniques et organisationnelles des producteurs et organisations paysannes.',
    color: '#8b5cf6'
  },
  {
    id: 4,
    icon: <Target size={28} />,
    title: 'Infrastructures Rurales',
    description: 'Construction de pistes rurales, magasins de stockage et marchés agricoles modernes.',
    color: '#f59e0b'
  },
  {
    id: 5,
    icon: <Building2 size={28} />,
    title: 'Aménagement Hydro-Agricole',
    description: 'Planification et mise en œuvre de projets d\'aménagement hydro-agricole intégrés.',
    color: '#3b82f6'
  },
  {
    id: 6,
    icon: <TrendingUp size={28} />,
    title: 'Commercialisation Agricole',
    description: 'Appui à la commercialisation des produits agricoles et accès aux marchés porteurs.',
    color: '#ec4899'
  },
  {
    id: 7,
    icon: <Shield size={28} />,
    title: 'Gestion des Ressources',
    description: 'Gestion durable des ressources naturelles et adaptation aux changements climatiques.',
    color: '#22c55e'
  },
  {
    id: 8,
    icon: <Globe size={28} />,
    title: 'Partenariats Stratégiques',
    description: 'Mobilisation de financements et collaboration avec partenaires techniques et financiers.',
    color: '#6366f1'
  }
];

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <FeaturesSectionContainer>
      <FeaturesContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Nos Domaines d&apos;Intervention</SectionTitle>
          <SectionSubtitle>
            Des solutions intégrées pour un développement rural durable et inclusif
          </SectionSubtitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <FeatureCard
                  $isHovered={hoveredCard === feature.id}
                  whileHover={{ y: -8 }}
                >
                  <FeatureIcon color={feature.color}>
                    {feature.icon}
                  </FeatureIcon>
                  
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  
                  <FeatureButton
                    href="/about"
                    $isHovered={hoveredCard === feature.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    En savoir plus
                  </FeatureButton>
                </FeatureCard>
              </motion.div>
            ))}
          </FeaturesGrid>
        </motion.div>
      </FeaturesContent>
    </FeaturesSectionContainer>
  );
}