'use client';

import AboutHero from '@/components/website/sections/about/AboutHero';
import MissionVision from '@/components/website/sections/about/MissionVision';
import TimelineSection from '@/components/website/sections/about/TimelineSection';
import TeamSection from '@/components/website/sections/about/TeamSection';
import ValuesSection from '@/components/website/sections/about/ValuesSection';
import { PageContainer } from '../Home.styles';

export default function AboutPage() {
  return (
    <PageContainer>
      <AboutHero />
      <MissionVision />
      <TimelineSection />
      <TeamSection />
      <ValuesSection />
    </PageContainer>
  );
}