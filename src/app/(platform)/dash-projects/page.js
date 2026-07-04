"use client";

import React from "react";
import * as S from "../DevPage.styles";

// ==========================================
// RENDU DU COMPOSANT
// ==========================================
export default function DevelopmentPage() {
  return (
    <S.PageContainer>
      
      {/* 1. L'ARRIÈRE-PLAN : Le Maillage Cyberpunk de l'image originale */}
      <S.WireframeWaves>
        <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Lignes de perspective horizontales (vagues de la grille) */}
          <path d="M0 320C120 340 240 380 480 340C720 300 960 220 1200 270C1320 295 1380 330 1440 340V600H0V320Z" fill="none" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="1.5" />
          <path d="M0 380C150 410 300 450 600 390C900 330 1050 280 1250 320C1350 340 1400 370 1440 380" fill="none" stroke="rgba(59, 130, 246, 0.15)" strokeWidth="1" />
          <path d="M0 460C200 480 400 520 700 460C1000 400 1150 360 1300 390C1380 410 1410 430 1440 440" fill="none" stroke="rgba(96, 165, 250, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Les mailles verticales qui créent l'effet "Grid 3D" */}
          {[...Array(16)].map((_, i) => (
            <path key={i} d={`M${i * 100} 240 C${i * 100 + 30} 350, ${i * 100 - 50} 480, ${i * 100} 600`} fill="none" stroke="rgba(37, 99, 235, 0.12)" strokeWidth="1" />
          ))}
        </svg>
      </S.WireframeWaves>

      {/* Halo lumineux d'ambiance */}
      <S.GlowHalo />

      {/* Contenu principal */}
      <S.ContentWrapper>
        
        {/* 2. L'ICÔNE : La grue de chantier technologique fidèle à la maquette */}
        <S.PremiumIconContainer>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Base et Structure Réseau Arrière */}
            <path d="M20 85H50M28 85V45M42 85V55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M28 70H42M28 55H42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
            
            {/* La Grue Principale */}
            <path d="M35 85V20H40V85" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M35 32H40M35 48H40M35 64H40" stroke="currentColor" strokeWidth="1.5"/>
            
            {/* Flèche de la grue (Bras horizontal) */}
            <path d="M10 20H80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M35 10L40 20M35 20L20 10H35" stroke="currentColor" strokeWidth="1.5"/>
            
            {/* Câble de suspension et Crochet */}
            <path d="M68 20V38" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2"/>
            
            {/* Fenêtre de Code Suspendue (Navigateur Web avec </>) */}
            <rect x="53" y="38" width="30" height="22" rx="4" fill="#060b16" stroke="currentColor" strokeWidth="2.5"/>
            <path d="M53 44H83" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="57" cy="41" r="1" fill="currentColor"/>
            <circle cx="61" cy="41" r="1" fill="currentColor"/>
            
            {/* Symbole </> à l'intérieur */}
            <path d="M62 49L59 51L62 53M74 49L77 51L74 53M69 48L67 54" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </S.PremiumIconContainer>

        {/* Textes informatifs */}
        <S.MainTitle>Développement en cours</S.MainTitle>
        <S.SubTitle>Page en cours de développement</S.SubTitle>
        <S.Description>
          Désolé, cette section est toujours en cours de construction. Nous travaillons dur pour la finaliser.
          <br />
          Revenez bientôt pour les nouveautés !
        </S.Description>

        {/* Boutons d'interaction */}
        <S.ButtonGroup>
          <S.PrimaryButton>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            M&apos;inscrire pour les mises à jour
          </S.PrimaryButton>

          <S.SecondaryButton href="/">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Retour à l&apos;accueil
          </S.SecondaryButton>
        </S.ButtonGroup>
      </S.ContentWrapper>

      {/* Marque d'angle "N" */}
      <S.CornerLogo>
        <div>N</div>
      </S.CornerLogo>

    </S.PageContainer>
  );
}