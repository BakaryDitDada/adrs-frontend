'use client';

import { motion } from 'framer-motion';
import { Mail, FileText } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/documents.styles';
import * as S from "./DocumentsCTA.styles";

export default function DocumentsCTA() {
  return (
    <SectionContainer>
      <SectionContent>
        <S.CTAContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <S.CTATitle>Vous ne trouvez pas ce que vous cherchez ?</S.CTATitle>
            <S.CTADescription>
              Contactez-nous pour obtenir des documents spécifiques ou poser une question.
            </S.CTADescription>
            <S.CTAButtonGroup>
              <S.PrimaryCTA href="/contact">
                <Mail size={20} />
                Nous contacter
              </S.PrimaryCTA>
              <S.SecondaryCTA href="#">
                <FileText size={20} />
                Demander un document
              </S.SecondaryCTA>
            </S.CTAButtonGroup>
          </motion.div>
        </S.CTAContainer>
      </SectionContent>
    </SectionContainer>
  );
}