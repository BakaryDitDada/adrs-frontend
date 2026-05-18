'use client';

import { useState } from 'react';

import DocumentsHero from '@/components/website/sections/documents/DocumentsHero';
import DocumentsFilters from '@/components/website/sections/documents/DocumentsFilters';
import DocumentsGrid from '@/components/website/sections/documents/DocumentsGrid';
import { PageContainer as DocumentsPageContainer } from '../Home.styles';
import CTASection from '@/components/common/CTASection';
import { AreaChartIcon, MessageSquare } from 'lucide-react';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');

  return (
    <DocumentsPageContainer>
      <DocumentsHero />
      <DocumentsFilters
        searchQuery={searchQuery}
        category={category}
        type={type}
        year={year}
        setSearchQuery={setSearchQuery}
        setCategory={setCategory}
        setType={setType}
        setYear={setYear}
      />
      <DocumentsGrid 
        searchQuery={searchQuery}
        category={category}
        type={type}
        year={year}
      />

      <CTASection 
        title="Besoin d'aide pour trouver le bon document ?"
        description="Contactez notre équipe pour une assistance personnalisée."
        actions={[
          {
            label: 'Nous contacter',
            href: '/contact',
            icon: MessageSquare,
          },
          {
            label: "Voir nos réalisations",
            href: '/realisations',
            icon: AreaChartIcon,
            variant: 'secondary',
          },
        ]}
      />
    </DocumentsPageContainer>
  );
}