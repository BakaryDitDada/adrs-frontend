'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import { SectionContainer, SectionContent } from '@/styles/pages/contact.styles';

// Fix for default markers in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export default function ContactMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current) {
      const map = L.map('map').setView([13.0333, -9.4833], 8); // Kita, Mali coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([13.0333, -9.4833]).addTo(map)
        .bindPopup('ADRS - Kita, Mali')
        .openPopup();

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
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
          <h2 style={{ fontSize: '2.4rem', marginBottom: '2rem', fontWeight: 700 }}>
            Notre <span style={{ color: 'var(--primary)' }}>localisation</span>
          </h2>
          <MapWrapper id="map" />
        </motion.div>
      </SectionContent>
    </SectionContainer>
  );
}