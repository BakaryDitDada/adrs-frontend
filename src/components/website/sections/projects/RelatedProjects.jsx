'use client';

import { ArrowRight, MapPin } from 'lucide-react';
import { SectionContainer, SectionContent, SectionTitle } from '@/styles/pages/project-detail.styles';
import {
  RelatedGrid,
  RelatedCard,
  CardImage,
  PlaceholderImage,
  CardContent,
  CardCategory,
  CardTitle,
  CardLocation,
  ReadLink,
} from './RelatedProjects.styles';

export default function RelatedProjects({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <SectionContainer>
      <SectionContent>
        <SectionTitle>
          Projets <span>similaires</span>
        </SectionTitle>

        <RelatedGrid>
          {projects.map((project, index) => (
            <RelatedCard
              key={project.id ?? project.slug ?? index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <CardImage>
                <PlaceholderImage>Image</PlaceholderImage>
              </CardImage>

              <CardContent>
                <CardCategory>{project.categoryLabel}</CardCategory>
                <CardTitle>{project.title}</CardTitle>

                {project.location && (
                  <CardLocation>
                    <MapPin size={14} />
                    <span>{project.location}</span>
                  </CardLocation>
                )}

                <ReadLink href={`/projects/${project.slug}`}>
                  Voir le projet
                  <ArrowRight size={14} />
                </ReadLink>
              </CardContent>
            </RelatedCard>
          ))}
        </RelatedGrid>
      </SectionContent>
    </SectionContainer>
  );
}