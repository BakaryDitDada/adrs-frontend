'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/projects.styles';
import * as S from './ProjectsCTA.styles';

export default function ProjectsCTA() {
  return (
    <S.CTAContainer>
      <S.CTAContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <S.CTATitle>
            Vous avez un projet de développement rural ?
          </S.CTATitle>
          <S.CTADescription>
            Que vous soyez une organisation, une collectivité ou un partenaire, 
            nous sommes à votre écoute pour étudier toute opportunité de collaboration.
          </S.CTADescription>
          <S.CTAButtonGroup>
            <S.PrimaryCTA href="/contact">
              Nous contacter
              <Mail size={20} />
            </S.PrimaryCTA>
            <S.SecondaryCTA href="/documents">
              Voir les appels à projets
              <ArrowRight size={20} />
            </S.SecondaryCTA>
          </S.CTAButtonGroup>
        </motion.div>
      </S.CTAContent>
    </S.CTAContainer>
  );
}