'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionContainer, SectionContent, SectionTitle } from '@/styles/pages/project-detail.styles';
import Image from 'next/image';

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
`;

const GalleryItem = styled(motion.div)`
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.3)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 1000px;
  max-height: 80vh;
  
  img {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &.prev {
    left: 1rem;
  }
  
  &.next {
    right: 1rem;
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
`;

export default function ProjectGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <SectionContainer>
      <SectionContent>
        <SectionTitle>
          Galerie <span>photos</span>
        </SectionTitle>
        
        <GalleryGrid>
          {images.map((image, index) => (
            <GalleryItem
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedIndex(index)}
            >
              {/* Replace with Next.js Image when ready */}
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, #2563eb20, #7c3aed20)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}>
                Image {index + 1}
              </div>
            </GalleryItem>
          ))}
        </GalleryGrid>

        <AnimatePresence>
          {selectedIndex !== null && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalContent>
                <Image
                  src={images[selectedIndex]}
                  alt={`Project image ${selectedIndex + 1}`}
                  width={1000}
                  height={800}
                  style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain' }}
                  priority
                />
                
                <CloseButton onClick={() => setSelectedIndex(null)}>
                  <X size={20} />
                </CloseButton>
                
                {images.length > 1 && (
                  <>
                    <NavButton className="prev" onClick={handlePrev}>
                      <ChevronLeft size={24} />
                    </NavButton>
                    <NavButton className="next" onClick={handleNext}>
                      <ChevronRight size={24} />
                    </NavButton>
                    <Counter>
                      {selectedIndex + 1} / {images.length}
                    </Counter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </SectionContent>
    </SectionContainer>
  );
}