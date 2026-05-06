import styled from 'styled-components';
import { flexCenter, flexColumn } from '../../../styles/mixins/flexbox';

export const HeroSliderContainer = styled.section`
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 50rem;
  max-height: 80rem;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 60vh;
    min-height: 40rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 50vh;
    min-height: 35rem;
  }
`;

export const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$isActive ? 1 : 0};
  transition: opacity 0.8s ease-in-out;
  ${flexCenter}
`;

export const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

export const Overlay = styled.div`
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
`;

export const SlideContent = styled.div`
  position: relative;
  z-index: 3;
  color: ${props => props.theme.colors.neutral.white};
  text-align: ${props => props.$alignment};
  max-width: 75rem;
  // padding: ${props => props.theme.spacing.xl};
  padding: 10rem;
  
  ${props => {
    switch (props.$alignment) {
      case 'left':
        return 'margin-right: auto;';
      case 'right':
        return 'margin-left: auto;';
      case 'center':
      default:
        return 'margin: 0 auto;';
    }
  }}

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.lg};
    text-align: center;
  }

  & .subtitle {
    display: inline-block;
    font-size: ${({ theme }) => theme.fontSizes.caption};
    // font-size: 1.2rem;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 255, 255, 0.1);
    padding: .8rem 2rem;
    border-radius: 5rem;
    margin-bottom: 2rem;
    margin-left: 2rem;
    backdrop-filter: blur(10px);
    // opacity: ${({ active }) => active ? 1 : 0};
    transform: translateX(${({ active }) => active ? 0 : '-20px'});
    transition: all 0.5s ease 0.4s;
  }

`;

export const SlideTitle = styled.h1`
  // font-size: 4rem;
  font-size: ${props => props.theme.fontSizes.h1};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const SlideSubtitle = styled.p`
  // font-size: 1.4rem;
  font-size: ${props => props.theme.fontSizes.bodyLg};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1.4;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

export const CTAButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => {
    switch (props.$size) {
      case 'sm': return `${props.theme.spacing.md} ${props.theme.spacing.sm}`;
      case 'md': return `${props.theme.spacing.md} ${props.theme.spacing.lg}`;
      case 'lg': return `${props.theme.spacing.lg} ${props.theme.spacing.xl}`;
      default: return `${props.theme.spacing.md} ${props.theme.spacing.lg}`;
    }
  }};
  border-radius: 4px;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.body};
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: ${props.theme.colors.primary};
          color: ${props.theme.colors.neutral.white};
          border: 2px solid ${props.theme.colors.primary};
          border-radius: .5rem;
          transition: all .3s ease-in-out;

          &:hover {
            background: ${props.theme.colors.primaryDark};
            border-color: ${props.theme.colors.primaryDark};
            transform: translateY(-2px);
          }
        `;
      case 'secondary':
        return `
          background: ${props.theme.colors.secondary};
          color: ${props.theme.colors.neutral.white};
          border: 2px solid ${props.theme.colors.secondary};
          border-radius: .5rem;
          transition: all .3s ease-in-out;

          &:hover {
            background: ${props.theme.colors.secondaryDark};
            border-color: ${props.theme.colors.secondaryDark};
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${props.theme.colors.neutral.white};
          // border: 2px solid ${props.theme.colors.neutral.white};
          border: 2px solid ${props.theme.colors.accent};
          border-radius: .5rem;
          transition: all .3s ease-in-out;

          &:hover {
            background: ${props.theme.colors.accent};
            color: ${props.theme.colors.neutral.white};
            transform: translateY(-2px);
          }
        `;
    }
  }}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${(props) => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
    font-size: ${props => props.theme.fontSizes.body};
  }
`;

export const NavigationButtons = styled.div`
  position: absolute;
  bottom: ${props => props.theme.spacing.xl};
  // TO REMOVE
  top: 95%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  z-index: 4;
`;

export const DotButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => 
    props.$isActive 
      ? props.theme.colors.neutral.white 
      : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.neutral.white};
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: ${props => props.theme.colors.neutral.white};
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 4;
  ${flexCenter}
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.prev {
    left: ${props => props.theme.spacing.md};
  }

  &.next {
    right: ${props => props.theme.spacing.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;

    &.prev {
      left: ${props => props.theme.spacing.md};
    }

    &.next {
      right: ${props => props.theme.spacing.md};
    }
  }
`;