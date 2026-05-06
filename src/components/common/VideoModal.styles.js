import styled from "styled-components";
import { motion } from "framer-motion";

export const VideoModal = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(14px);
`;

export const ModalContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: min(90vw, 1400px);
  height: 90vh;
  aspect-ratio: 16 / 9;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.04);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    border-radius: 18px;
  }

  iframe {
    display: block;
    width: 100%;
    height: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary}90,
      ${({ theme }) => theme.colors.secondary}70,
      ${({ theme }) => theme.colors.accent}60
    );
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
  }
`;

export const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(220, 38, 38, 0.9);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 25px rgba(220, 38, 38, 0.35);
  }

  svg {
    color: white;
    width: 22px;
    height: 22px;
  }
`;