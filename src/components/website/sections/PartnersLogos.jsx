"use client";

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Shield,
  Target,
  Users,
  Award,
  Briefcase,
  Heart,
  Zap,
  Leaf,
  Cloud,
  Droplets,
  Sun,
  Wind,
  TreePine,
  Banknote,
  TrendingUp,
  Network,
  Star,
  Building,
  Factory,
  Store,
  Warehouse,
} from "lucide-react";
import {
  PartnersLogosContainer,
  PartnersContent,
  SectionTitle,
  SectionSubtitle,
  LogosWrapper,
  LogosTrack,
  LogoItem,
  LogoIcon,
  LogoName,
  PauseButton,
  Controls,
} from "./PartnersLogos.styles";
import { BenefitItem, CollaborationBenefits, CollaborationDescription, CollaborationSection, CollaborationTitle } from "./PartnersSection.styles";
import { Handshake } from "lucide-react";

const partners = [
  { name: "PASSIP/GIZ", icon: <Globe size={28} />, color: "#10b981" },
  { name: "KfW", icon: <Banknote size={28} />, color: "#0ea5e9" },
  { name: "USAID", icon: <Award size={28} />, color: "#f59e0b" },
  { name: "FAO", icon: <Leaf size={28} />, color: "#22c55e" },
  { name: "World Bank", icon: <Building size={28} />, color: "#2563eb" },
  { name: "UNDP", icon: <Network size={28} />, color: "#8b5cf6" },
  {
    name: "African Development Bank",
    icon: <TrendingUp size={28} />,
    color: "#ec4899",
  },
  { name: "European Union", icon: <Star size={28} />, color: "#3b82f6" },
  {
    name: "Ministère du Développement Rural",
    icon: <Building2 size={28} />,
    color: "#0f766e",
  },
  { name: "Coopération Suisse", icon: <Shield size={28} />, color: "#ef4444" },
  {
    name: "Coopération Française",
    icon: <Heart size={28} />,
    color: "#6366f1",
  },
  { name: "Coopération Allemande", icon: <Zap size={28} />, color: "#f97316" },
  { name: "PNUD", icon: <Target size={28} />, color: "#06b6d4" },
  { name: "UNICEF", icon: <Users size={28} />, color: "#8b5cf6" },
  { name: "OMS", icon: <Cloud size={28} />, color: "#22c55e" },
  { name: "UNESCO", icon: <Briefcase size={28} />, color: "#ec4899" },
  { name: "FIDA", icon: <TreePine size={28} />, color: "#16a34a" },
  { name: "Coopération Japonaise", icon: <Sun size={28} />, color: "#facc15" },
  {
    name: "Coopération Canadienne",
    icon: <Wind size={28} />,
    color: "#3b82f6",
  },
  {
    name: "Coopération Hollandaise",
    icon: <Droplets size={28} />,
    color: "#0ea5e9",
  },
  { name: "Banque Islamique", icon: <Factory size={28} />, color: "#15803d" },
  { name: "Fondation Bill Gates", icon: <Store size={28} />, color: "#7c3aed" },
  {
    name: "Fondation Rockefeller",
    icon: <Warehouse size={28} />,
    color: "#dc2626",
  },
];

const benefits = [
  'Échange de connaissances et d\'expertise',
  'Mobilisation des ressources financières',
  'Renforcement des capacités techniques',
  'Accès aux innovations technologiques',
  'Amélioration de la gouvernance locale',
  'Durabilité des interventions'
];

// Duplicate partners for seamless infinite scroll
const duplicatedPartners = [...partners, ...partners];

export default function PartnersLogos() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState("left"); // 'left' or 'right'

  // Initialize animation
  // useEffect(() => {
  //   const track = trackRef.current;
  //   if (!track) return;

  //   let animationId;
  //   let position = 0;
  //   const speed = 2; // pixels per frame

  //   const animate = () => {
  //     if (!isPaused && !isHovered) {
  //       position -= speed;

  //       // Reset position when half of the track has scrolled
  //       if (Math.abs(position) >= track.scrollWidth / 2) {
  //         position = 0;
  //       }

  //       track.style.transform = `translateX(${position}px)`;
  //     }

  //     animationId = requestAnimationFrame(animate);
  //   };

  //   animationId = requestAnimationFrame(animate);

  //   return () => {
  //     cancelAnimationFrame(animationId);
  //   };
  // }, [isPaused, isHovered]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId;
    let position = 0;
    let lastTime = performance.now();

    const speed = 30; // pixels per second (⬅️ adjust this)

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused && !isHovered) {
        const movement = (speed * delta) / 1000;

        position += direction === "left" ? -movement : movement;

        if (Math.abs(position) >= track.scrollWidth / 2) {
          position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isHovered, direction]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const changeDirection = () => {
    setDirection(direction === "left" ? "right" : "left");
  };

  return (
    <PartnersLogosContainer>
      <PartnersContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>
            Nos <span>Partenaires</span> & Collaborations clés
          </SectionTitle>

          <SectionSubtitle>
            Nous collaborons avec des institutions nationales et internationales
            de premier plan pour un développement rural durable.
          </SectionSubtitle>

          <LogosWrapper
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <LogosTrack
              ref={trackRef}
              direction={direction}
              $isPaused={isPaused || isHovered}
            >
              {duplicatedPartners.map((partner, index) => (
                <LogoItem key={`${partner.name}-${index}`}>
                  <LogoIcon color={partner.color}>{partner.icon}</LogoIcon>
                  <LogoName>{partner.name}</LogoName>
                </LogoItem>
              ))}
            </LogosTrack>
          </LogosWrapper>

          <Controls>
            <PauseButton
              onClick={togglePause}
              $isPaused={isPaused}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPaused ? "▶️" : "⏸️"}
              <span>{isPaused ? "Reprendre" : "Pause"}</span>
            </PauseButton>

            <PauseButton
              onClick={changeDirection}
              $isPaused={false}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginLeft: "10px" }}
            >
              {direction === "left" ? "➡️" : "⬅️"}
              <span>Changer direction</span>
            </PauseButton>
          </Controls>
        </motion.div>
      </PartnersContent>
      
      <div style={{ width: '85%', margin: '40px auto', }}>
        <CollaborationSection $bg="primary">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CollaborationTitle>
              <Handshake size={24} />
              Avantages de la Collaboration
            </CollaborationTitle>

            <CollaborationDescription>
              Nos partenariats stratégiques permettent de créer des synergies et
              d&apos;amplifier l&apos;impact de nos interventions.
            </CollaborationDescription>

            <CollaborationBenefits>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BenefitItem>
                    <Award size={16} />
                    {benefit}
                  </BenefitItem>
                </motion.div>
              ))}
            </CollaborationBenefits>
          </motion.div>
        </CollaborationSection>
      </div>
    </PartnersLogosContainer>
  );
}
