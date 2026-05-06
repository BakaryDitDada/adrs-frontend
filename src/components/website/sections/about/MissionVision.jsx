'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { Target, Eye, Trophy } from 'lucide-react';

import * as S from "./MissionVision.styles";

export default function MissionVision() {
  const theme = useTheme();

  const cards = [
    {
      icon: <Target />,
      title: 'Notre Mission',
      description: 'Promouvoir un développement rural intégré, durable et équitable dans la vallée du fleuve Sénégal.',
      color: '#2563eb',
      items: [
        'Planification et mise en œuvre de projets agricoles',
        'Renforcement des capacités des producteurs',
        'Appui à la commercialisation des produits agricoles',
        'Gestion durable des ressources naturelles',
        'Mobilisation des financements pour le développement local'
      ]
    },
    {
      icon: <Eye />,
      title: 'Notre Vision',
      description: 'Une vallée du fleuve Sénégal prospère, résiliente et solidaire où chaque communauté rurale s\'épanouit.',
      color: '#7c3aed',
      items: [
        'L\'autosuffisance alimentaire régionale',
        'L\'émancipation économique des agriculteurs',
        'La préservation des écosystèmes naturels',
        'L\'innovation agricole durable',
        'L\'inclusion sociale et économique'
      ]
    },
    {
      icon: <Trophy />,
      title: 'Nos Valeurs',
      description: 'Les principes qui guident chacune de nos actions et décisions.',
      color: '#10b981',
      items: [
        'Intégrité et transparence',
        'Équité et inclusion',
        'Durabilité environnementale',
        'Innovation et adaptation',
        'Collaboration et partenariat',
        'Responsabilité sociale'
      ]
    }
  ];

  return (
    <S.SectionContainer style={{ backgroundColor: theme.colors.background.secondary }}>
      <S.SectionContent>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <S.SectionTitle>
            Notre <span>Raison d&apos;Être</span>
          </S.SectionTitle>

          <S.SectionSubtitle>
            Au cœur de notre action, une triple vocation : mission claire, vision ambitieuse, 
            valeurs ancrées dans l&apos;éthique du développement durable.
          </S.SectionSubtitle>

          <S.Grid>
            {cards.map((card, index) => (
              <S.Card
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <S.CardIcon color={card.color}>
                  {card.icon}
                </S.CardIcon>

                <S.CardTitle>{card.title}</S.CardTitle>
                <S.CardDescription>{card.description}</S.CardDescription>

                <S.List>
                  {card.items.map((item, itemIndex) => (
                    <S.ListItem
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * itemIndex }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {item}
                    </S.ListItem>
                  ))}
                </S.List>

              </S.Card>
            ))}
          </S.Grid>

        </motion.div>

      </S.SectionContent>
    </S.SectionContainer>
  );
}