'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { Linkedin, Mail, Users } from 'lucide-react';

import { SectionContainer, SectionContent, SectionTitle, SectionSubtitle } from '@/styles/pages/about.styles';
import * as S from "./TeamSection.styles";

export default function TeamSection() {
  const theme = useTheme();

  const teamMembers = [
    {
      id: 1,
      name: 'Moussa Ben Issak Diallo',
      role: 'Directeur Général',
      bio: 'Ingénieur en Constructions Civiles avec plus de 15 ans d\'expérience dans le développement rural.',
      expertise: ['Constructions Civiles', 'Gestion de Projets', 'Développement Rural'],
      social: { linkedin: '#', email: 'a.diallo@adrs.ml' }
    },
    {
      id: 2,
      name: 'Fatoumata Koné',
      role: 'Chef de Projet Hydraulique',
      bio: 'Spécialiste en hydraulique rurale et systèmes d\'irrigation modernes.',
      expertise: ['Hydraulique', 'Irrigation', 'Ressources en Eau'],
      social: { linkedin: '#', email: 'f.kone@adrs.ml' }
    },
    {
      id: 3,
      name: 'Moussa Traoré',
      role: 'Responsable Formation',
      bio: 'Expert en formation agricole et accompagnement des producteurs.',
      expertise: ['Formation', 'Accompagnement', 'Techniques Agricoles'],
      social: { linkedin: '#', email: 'm.traore@adrs.ml' }
    },
    {
      id: 4,
      name: 'Aïssata Diarra',
      role: 'Responsable Partenariats',
      bio: 'Spécialiste en développement de partenariats stratégiques.',
      expertise: ['Partenariats', 'Financement', 'Relations Internationales'],
      social: { linkedin: '#', email: 'a.diarra@adrs.ml' }
    },
    {
      id: 5,
      name: 'Boubacar Coulibaly',
      role: 'Expert Agricole',
      bio: 'Agronome spécialisé dans les systèmes de production durable.',
      expertise: ['Agroécologie', 'Conservation des Sols', 'Production Durable'],
      social: { linkedin: '#', email: 'b.coulibaly@adrs.ml' }
    },
    {
      id: 6,
      name: 'Youssouf BARRY',
      role: 'Responsable Infrastructure',
      bio: 'Ingénieur spécialisé dans les infrastructures rurales.',
      expertise: ['Infrastructures', 'Constructions Civiles', 'Aménagement'],
      social: { linkedin: '#', email: 'k.keita@adrs.ml' }
    }
  ];

  return (
    <SectionContainer style={{ backgroundColor: theme.colors.background.secondary }}>
      <SectionContent>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <SectionTitle>
            Notre <span>Équipe</span> d&apos;Experts
          </SectionTitle>

          <SectionSubtitle>
            Des professionnels passionnés et expérimentés dédiés au développement durable.
          </SectionSubtitle>

          <S.TeamGrid>
            {teamMembers.map((member, index) => (
              <S.TeamCard
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >

                <S.CardHeader>
                  <S.TeamImage>
                    <Users size={64} />
                  </S.TeamImage>

                  <S.CardOverlay>
                    <S.SocialButton href={`mailto:${member.social.email}`}>
                      <Mail size={18} />
                    </S.SocialButton>

                    <S.SocialButton href={member.social.linkedin} target="_blank">
                      <Linkedin size={18} />
                    </S.SocialButton>
                  </S.CardOverlay>
                </S.CardHeader>

                <S.CardBody>
                  <S.MemberName>{member.name}</S.MemberName>
                  <S.MemberRole>{member.role}</S.MemberRole>
                  <S.MemberBio>{member.bio}</S.MemberBio>

                  <S.ExpertiseList>
                    {member.expertise.map((skill, idx) => (
                      <S.ExpertiseTag key={idx}>{skill}</S.ExpertiseTag>
                    ))}
                  </S.ExpertiseList>
                </S.CardBody>

              </S.TeamCard>
            ))}
          </S.TeamGrid>

        </motion.div>

      </SectionContent>
    </SectionContainer>
  );
}