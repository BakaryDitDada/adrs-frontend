'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { SectionContainer, SectionContent } from '@/styles/pages/contact.styles';

// 1. Extract configuration to eliminate magic numbers and strings
const MAP_CONFIG = {
  center: [13.0333, -9.4833], // Kita, Mali
  zoom: 8,
  popupText: `
    <div class="custom-leaflet-popup">
      <h3>ADRS - Kita, Mali</h3>
      <p>
        <strong>Coordonnées:</strong> 13.0333° N, 9.4833° W <br>
        <strong>Directeur Général:</strong> M. Moussa Ben Issak <br>
        <strong>Email:</strong> dialloben@yahoo.fr <br>
      </p>
    </div>
  `,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

// 2. Consolidate styling into styled-components
const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const Highlight = styled.span`
  color: var(--primary);
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background || '#f3f4f6'}; // Loading skeleton color

  & .custom-leaflet-popup {
    font-size: 1rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text || '#333'};
  }
`;

export default function ContactMap() {
  const mapNodeRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      // Prevent re-initialization
      if (!mapNodeRef.current || mapInstanceRef.current) return;

      // 4. Dynamically import Leaflet to bypass Next.js SSR window errors
      const L = (await import('leaflet')).default;
      
      if (!isMounted) return;

      // 5. Create a local icon instance instead of mutating the global prototype
      const customIcon = L.icon({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Pass the DOM node directly to Leaflet
      const map = L.map(mapNodeRef.current, {
        tap: false, // 👈 FIX: Prevents the page from jumping to top on marker click
        scrollWheelZoom: false // 👈 BONUS UX: Prevents the map from hijacking page scroll
      }).setView(MAP_CONFIG.center, MAP_CONFIG.zoom);

      L.tileLayer(MAP_CONFIG.tileLayer, {
        attribution: MAP_CONFIG.attribution
      }).addTo(map);

      L.marker(MAP_CONFIG.center, { icon: customIcon })
        .addTo(map)
        .bindPopup(MAP_CONFIG.popupText)
        .openPopup();

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <SectionContainer>
      <SectionContent>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title>
            Notre <Highlight>localisation</Highlight>
          </Title>
          <MapWrapper 
            ref={mapNodeRef} 
            aria-label="Interactive map showing our location in Kita, Mali" 
            role="region"
          />
        </motion.div>
      </SectionContent>
    </SectionContainer>
  );
}