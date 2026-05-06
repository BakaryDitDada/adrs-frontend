'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Search, Filter, X } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/documents.styles';
import * as S from "./DocumentsFilters.styles";

export default function DocumentsFilters({
  searchQuery,
  category,
  type,
  year,
  setCategory,
  setSearchQuery,
  setType,
  setYear
}) {
  const categories = [
    'Rapports annuels',
    'Études et analyses',
    'Guides techniques',
    'Publications',
    'Politiques et stratégies',
    'Communiqués',
  ];

  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017+'];
  const types = ['PDF', 'DOC', 'XLS', 'PPT', 'Autre'];

  const hasActiveFilters = searchQuery || category || year || type;

  const clearFilters = () => {
    setSearchQuery('');
    setCategory('');
    setYear('');
    setType('');
  };

  const removeFilter = (filterType) => {
    switch(filterType) {
      case 'category': setCategory(''); break;
      case 'year': setYear(''); break;
      case 'type': setType(''); break;
    }
  };

  return (
    <SectionContainer>
      <SectionContent>
        <S.FiltersContainer>
          <S.SearchBar>
            <Search size={20}/>
            <input
              type="text"
              placeholder="Rechercher un document..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchBar>

          <S.FiltersGrid>
            <S.FilterGroup>
              <label>Catégorie</label>
              <S.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Toutes</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </S.Select>
            </S.FilterGroup>

            <S.FilterGroup>
              <label>Année</label>
              <S.Select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Toutes</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </S.Select>
            </S.FilterGroup>

            <S.FilterGroup>
              <label>Type de fichier</label>
              <S.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Tous</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </S.Select>
            </S.FilterGroup>
          </S.FiltersGrid>

          {hasActiveFilters && (
            <>
              <S.ActiveFilters>
                {searchQuery && (
                  <S.FilterTag> 
                    Recherche: {searchQuery}
                    <button onClick={() => setSearchQuery('')}>
                      <X size={14} />
                    </button>
                  </S.FilterTag>
                )}
                {category && (
                  <S.FilterTag>
                    Catégorie: {category}
                    <button onClick={() => removeFilter('category')}>
                      <X size={14} />
                    </button>
                  </S.FilterTag>
                )}
                {year && (
                  <S.FilterTag>
                    Année: {year}
                    <button onClick={() => removeFilter('year')}>
                      <X size={14} />
                    </button>
                  </S.FilterTag>
                )}
                {type && (
                  <S.FilterTag>
                    Type: {type}
                    <button onClick={() => removeFilter('type')}>
                      <X size={14} />
                    </button>
                  </S.FilterTag>
                )}
              </S.ActiveFilters>
              <S.ClearButton
                onClick={clearFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Effacer tous les filtres
              </S.ClearButton>
            </>
          )}
        </S.FiltersContainer>
      </SectionContent>
    </SectionContainer>
  );
}