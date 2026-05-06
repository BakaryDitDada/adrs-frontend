import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FiltersContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 16px;
  padding: 2rem;
  // margin-top: -2rem;
  position: relative;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ClearButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  // font-size: 0.875rem;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.error};
    border-color: ${({ theme }) => theme.colors.error}40;
    background: ${({ theme }) => theme.colors.error}08;
  }
`;

export const SearchBar = styled.div`
  position: relative;
  margin-bottom: 2rem;
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    background: ${({ theme }) => theme.colors.background.primary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    // font-size: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.body};
    color: ${({ theme }) => theme.colors.text.primary};
    transition: all 0.3s ease;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.text.light};
    }
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
  }
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FilterGroup = styled.div`
  label {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: ${({ theme }) => theme.colors.primary};
      width: 16px;
      height: 16px;
    }
  }
`;

export const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const FilterPill = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.background.primary};
  color: ${({ $active, theme }) => 
    $active ? 'white' : theme.colors.text.secondary};
  border: 1px solid ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.border};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ $active, theme }) => 
      $active ? theme.colors.primaryDark : theme.colors.background.tertiary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SelectedFilters = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SelectedFilter = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    
    &:hover {
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;