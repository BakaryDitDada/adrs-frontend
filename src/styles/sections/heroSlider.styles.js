import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const HeroSliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  min-height: 600px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 70vh;
    min-height: 500px;
  }
`;

export const SlideContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform, opacity; /* Optimize for animations */
`; 

export const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
  will-change: opacity; /* Optimize animations */
`;

export const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
  color: white;
  
  .subtitle {
    display: inline-block;
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 50px;
    margin-bottom: 20px;
    backdrop-filter: blur(10px);
    will-change: transform, opacity; /* Optimize animations */
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    text-align: center;
    
    .subtitle {
      font-size: 0.875rem;
      padding: 6px 15px;
    }
  }
`;

export const SlideTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.1;
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  will-change: transform, opacity; /* Optimize animations */
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 4vw, 3rem);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  }
`;

export const SlideDescription = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.25rem);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  will-change: transform, opacity; /* Optimize animations */
  
  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 1rem;
  }
`;

export const SlideButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  will-change: transform, background-color; /* Optimize animations */
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    border-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    
    svg {
      transform: translateX(5px);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const SliderControls = styled.div`
  position: absolute;
  bottom: 50%;
  left: 0;
  right: 0;
  transform: translateY(50%);
  z-index: 3;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none; /* Allow clicks through */
  
  @media (max-width: 768px) {
    bottom: 40px;
    transform: none;
  }
`;

export const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  pointer-events: auto; /* Re-enable clicks */
  will-change: transform, background-color; /* Optimize animations */
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 3;
  
  @media (max-width: 768px) {
    bottom: 20px;
  }
`;

export const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  will-change: transform, background-color; /* Optimize animations */
  
  &:hover:not(:disabled) {
    background: ${({ theme, active }) => 
      active ? theme.colors.primary : 'rgba(255, 255, 255, 0.8)'};
    transform: scale(1.3);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: ${({ active }) => active ? 1 : 0.5};
  }
`;