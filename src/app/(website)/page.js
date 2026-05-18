'use client';

import { ArrowRight, MessageSquare, Users } from 'lucide-react';

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

export default function Home() {
  return (
    <PageContainer>
      <HeroSlider config={sampleHeroConfig} />
      
      <AboutSection />

      <StatsSection />
      
      <FeaturesSection />
    
      <AchievementsSection />

      <ValuesSection />

      <PartnersLogos />

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