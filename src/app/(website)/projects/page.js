'use client';

import { useState } from 'react';

import ProjectsHero from '@/components/website/sections/projects/ProjectsHero';
import ProjectsFilters from '@/components/website/sections/projects/ProjectsFilters';
import ProjectsGrid from '@/components/website/sections/projects/ProjectsGrid';
import ProjectsCTA from '@/components/website/sections/projects/ProjectsCTA';
import { PageContainer as ProjectsPageContainer } from '../Home.styles';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [region, setRegion] = useState('');
  const [year, setYear] = useState('');
  
  return (
    <ProjectsPageContainer>
      <ProjectsHero />
        <ProjectsFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          region={region}
          setRegion={setRegion}
          year={year}
          setYear={setYear}
        />
        <ProjectsGrid 
          searchQuery={searchQuery}
          category={category}
          status={status}
          region={region}
          year={year}
        />
      <ProjectsCTA />
    </ProjectsPageContainer>
  );
}