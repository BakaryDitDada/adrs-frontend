import styled, { keyframes } from 'styled-components';

// Typing animation for button loading
const dotPulse = keyframes`
  0%, 20% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

export const Container = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h1};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 60rem;
  margin: 0 auto;
  line-height: 1.6;
`;

export const FormCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const QueryInput = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme, $isError }) => $isError === "true" ? theme.colors.error : theme.colors.border};
  // border-radius: ${({ theme }) => theme.radii.xl};
  border-radius: 3.2rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    // border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    background-color: ${({ theme }) => theme.colors.background.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.error};
  padding-left: ${({ theme }) => theme.spacing.sm};
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px ${({ theme }) => theme.colors.primary}40;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const StatusCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TypingDots = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  span {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: white;
    animation: ${dotPulse} 1.4s infinite ease-in-out both;
  }
  span:nth-child(1) { animation-delay: -0.32s; }
  span:nth-child(2) { animation-delay: -0.16s; }
`;

export const ErrorCard = styled.div`
  background-color: ${({ theme }) => theme.colors.error}15;
  border: 1px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ReportsList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  // padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.lg} auto;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: box-shadow 0.3s ease;

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => `${theme.spacing.lg}`};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    font-size: ${({ theme }) => theme.fontSizes.body};
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.background.secondary};
      color: ${({ theme }) => theme.colors.primary};
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const ReportCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  overflow: hidden;
`;

export const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.secondary};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    flex-shrink: 0;
  }
`;

export const ReportContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.7;

  /* Markdown styling */

  h1, h2, h3, h4, h5, h6 {
    margin-top: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  h1 { font-size: ${({ theme }) => theme.fontSizes.h1}; }
  h2 { font-size: ${({ theme }) => theme.fontSizes.h2}; }
  h3 { font-size: ${({ theme }) => theme.fontSizes.h3}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }

  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    margin: ${({ theme }) => theme.spacing.md} 0;
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    border-radius: ${({ theme }) => theme.radii.sm};
  }

  code {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    padding: 0.2rem 0.4rem;
    border-radius: ${({ theme }) => theme.radii.sm};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.9em;
  }

  pre {
    margin: ${({ theme }) => theme.spacing.md} 0;
    border-radius: ${({ theme }) => theme.radii.md};
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${({ theme }) => theme.spacing.md} 0;
    font-size: ${({ theme }) => theme.fontSizes.caption};
  }

  th, td {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  img {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.radii.md};
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }
`;