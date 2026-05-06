'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, Tag, X } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/news.styles';
import * as S from './NewsFilters.styles';

export default function NewsFilters({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  selectedYears,
  setSelectedYears,
  selectedTags,
  setSelectedTags,
}) {

  const categories = [
    'Projets Agricoles',
    'Hydraulique Rurale',
    'Formation',
    'Infrastructures',
    'Partenariats',
    'Innovation'
  ];

  const years = ['2024', '2023', '2022', '2021', '2020', '2019+'];
  const tags = ['Urgent', 'Succès', 'Événement', 'Rapport', 'Vidéo', 'PDF'];

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleYear = (year) => {
    setSelectedYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedYears([]);
    setSelectedTags([]);
    setSearchQuery('');
  };

  const removeCategory = (category) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const removeYear = (year) => {
    setSelectedYears(prev => prev.filter(y => y !== year));
  };

  const removeTag = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
                          selectedYears.length > 0 || 
                          selectedTags.length > 0;

  return (
    <SectionContainer style={{ paddingTop: "10rem !important" }}>
      <SectionContent>
        <S.FiltersContainer>
          <S.FiltersHeader>
            <h2>
              <Filter size={20} />
              Filtrer les Actualités
            </h2>
            
            {hasActiveFilters && (
              <S.ClearButton
                onClick={clearAllFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
                Tout effacer
              </S.ClearButton>
            )}
          </S.FiltersHeader>

          <S.SearchBar>
            <Search size={20} />
            <input
              type="text"
              placeholder="Rechercher des articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchBar>

          <S.FiltersGrid>
            <S.FilterGroup>
              <label>
                <Tag size={16} />
                Catégories
              </label>
              <S.FilterOptions>
                {categories.map((category) => (
                  <S.FilterPill
                    key={category}
                    $active={selectedCategories.includes(category)}
                    onClick={() => toggleCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </S.FilterPill>
                ))}
              </S.FilterOptions>
            </S.FilterGroup>

            <S.FilterGroup>
              <label>
                <Calendar size={16} />
                Année
              </label>
              <S.FilterOptions>
                {years.map((year) => (
                  <S.FilterPill
                    key={year}
                    $active={selectedYears.includes(year)}
                    onClick={() => toggleYear(year)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {year}
                  </S.FilterPill>
                ))}
              </S.FilterOptions>
            </S.FilterGroup>

            <S.FilterGroup>
              <label>
                <Tag size={16} />
                Tags
              </label>
              <S.FilterOptions>
                {tags.map((tag) => (
                  <S.FilterPill
                    key={tag}
                    $active={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </S.FilterPill>
                ))}
              </S.FilterOptions>
            </S.FilterGroup>
          </S.FiltersGrid>

          <AnimatePresence>
            {hasActiveFilters && (
              <S.SelectedFilters
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {selectedCategories.map((category) => (
                  <S.SelectedFilter
                    key={category}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {category}
                    <button onClick={() => removeCategory(category)}>
                      <X size={14} />
                    </button>
                  </S.SelectedFilter>
                ))}
                {selectedYears.map((year) => (
                  <S.SelectedFilter
                    key={year}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {year}
                    <button onClick={() => removeYear(year)}>
                      <X size={14} />
                    </button>
                  </S.SelectedFilter>
                ))}
                {selectedTags.map((tag) => (
                  <S.SelectedFilter
                    key={tag}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)}>
                      <X size={14} />
                    </button>
                  </S.SelectedFilter>
                ))}
              </S.SelectedFilters>
            )}
          </AnimatePresence>
        </S.FiltersContainer>
      </SectionContent>
    </SectionContainer>
  );
}