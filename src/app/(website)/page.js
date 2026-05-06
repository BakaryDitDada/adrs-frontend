'use client';

import HeroSlider from '@/components/website/sections/HeroSlider';
import StatsSection from '@/components/website/sections/StatsSection';
import FeaturesSection from '@/components/website/sections/FeaturesSection';
import AboutSection from '@/components/website/sections/AboutSection';
import AchievementsSection from '@/components/website/sections/AchievementsSection';
import ValuesSection from '@/components/website/sections/ValuesSection';
import PartnersLogos from '@/components/website/sections/PartnersLogos';
import {
  PageContainer,
} from './Home.styles';
import { sampleHeroConfig } from '@/data/sampleHeroConfig';
import CTASection from '@/components/common/CTASection';
import { ArrowRight, MessageSquare, Users } from 'lucide-react';

export default function Home() {
  return (
    <PageContainer>
      <HeroSlider config={sampleHeroConfig} />
      
      <AboutSection />

      <StatsSection />
      
      <FeaturesSection />
      
      {/* We'll build these sections later */}
      <AchievementsSection />

      <ValuesSection />

      {/* <PartnersSection /> */}

      <PartnersLogos />
      
      {/* <CtaSection>
        <CtaContentWrapper>
        <CtaContent>
          <CtaTitle>Rejoignez notre mission</CtaTitle>
          <CtaDescription>
            Ensemble, construisons une vallée du fleuve Sénégal prospère, 
            résiliente et solidaire.
          </CtaDescription>
          <CtaButton href="/contact">
            Nous Contacter
          </CtaButton>
        </CtaContent>
        </CtaContentWrapper>
      </CtaSection> */}
      <CTASection
        title="Rejoignez notre mission"
        description="Ensemble, construisons une vallée du fleuve Sénégal prospère, résiliente et solidaire."
        actions={[
          {
            label: 'Nous contacter',
            href: '/contact',
            icon: MessageSquare,
          },
          {
            label: 'À propos de nous',
            href: '/about',
            icon: Users,
            variant: 'secondary',
          },
          // {
          //   label: 'Voir nos réalisations',
          //   href: '/about',
          //   icon: ArrowRight,
          //   variant: 'secondary',
          // },
        ]}
      />
    </PageContainer>
  );
}