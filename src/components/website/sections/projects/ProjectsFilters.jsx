'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, MapPin, Calendar } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/projects.styles';
import * as S from './ProjectsFilters.styles';

export default function ProjectsFilters({
  searchQuery,
  category,
  status,
  region,
  year,
  setCategory,
  setSearchQuery,
  setStatus,
  setRegion,
  setYear
}) {

  const hasActiveFilters = category || status || region || year || searchQuery;

  const clearFilters = () => {
    setSearchQuery('');
    setCategory('');
    setStatus('');
    setRegion('');
    setYear('');
  };

  const removeFilter = (type) => {
    switch(type) {
      case 'category': setCategory(''); break;
      case 'status': setStatus(''); break;
      case 'region': setRegion(''); break;
      case 'year': setYear(''); break;
    }
  };

  return (
    <SectionContainer>
      <SectionContent>
        <S.FiltersContainer>
          <S.FiltersHeader>
            <h3>
              <Filter size={20} />
              Filtrer les projets
            </h3>
            {hasActiveFilters && (
              <S.ClearButton
                onClick={clearFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tout effacer
              </S.ClearButton>
            )}
          </S.FiltersHeader>

          <S.SearchBar>
            <Search size={20} />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </S.SearchBar>

          <S.FiltersGrid>
            <S.FilterGroup>
              <label>Catégorie</label>
              <S.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Toutes</option>
                <option value="agricole">Agriculture Durable</option>
                <option value="hydraulique">Hydraulique Rurale</option>
                <option value="infrastructure">Infrastructures Rurales</option>
                <option value="formation">Formation</option>
                <option value="partenariat">Partenariats</option>
              </S.Select>
            </S.FilterGroup>

            <S.FilterGroup>
              <label>Statut</label>
              <S.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Tous</option>
                <option value="en-cours">En cours</option>
                <option value="acheve">Achevé</option>
                <option value="planifie">Planifié</option>
              </S.Select>
            </S.FilterGroup>

            <S.FilterGroup>
              <label>Région</label>
              <S.Select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="">Toutes</option>
                <option value="kita">Kita</option>
                <option value="mahina">Mahina</option>
                <option value="bafoulabe">Bafoulabé</option>
                <option value="kayes">Kayes</option>
              </S.Select>
            </S.FilterGroup>

            <S.FilterGroup>
              <label>Année</label>
              <S.Select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Toutes</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </S.Select>
            </S.FilterGroup>
          </S.FiltersGrid>

          {hasActiveFilters && (
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
              {status && (
                <S.FilterTag>
                  Statut: {status === 'en-cours' ? 'En cours' : status === 'acheve' ? 'Achevé' : 'Planifié'}
                  <button onClick={() => removeFilter('status')}>
                    <X size={14} />
                  </button>
                </S.FilterTag>
              )}
              {region && (
                <S.FilterTag>
                  Région: {region}
                  <button onClick={() => removeFilter('region')}>
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
            </S.ActiveFilters>
          )}
        </S.FiltersContainer>
      </SectionContent>
    </SectionContainer>
  );
}