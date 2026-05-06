import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 ${({ theme }) => theme.colors.primary}40; }
  50% { box-shadow: 0 0 0 12px ${({ theme }) => theme.colors.primary}00; }
`;

const dotPulse = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 500;
  animation: ${pulse} 2s infinite;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ChatWindow = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 38rem;
  max-width: calc(100vw - 2rem);
  height: 55rem;
  max-height: calc(100vh - 4rem);
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  display: flex;
  flex-direction: column;
  z-index: 500;
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const ChatTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.light};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const MessageBubble = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-direction: ${({ role }) => (role === 'user' ? 'row-reverse' : 'row')};
`;

export const Avatar = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: ${({ theme, role }) =>
    role === 'user' ? theme.colors.primary : theme.colors.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const MessageContent = styled.div`
  max-width: 75%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme, role }) =>
    role === 'user'
      ? `${theme.radii.lg} 0 ${theme.radii.lg} ${theme.radii.lg}`
      : `0 ${theme.radii.lg} ${theme.radii.lg} ${theme.radii.lg}`};
  background-color: ${({ theme, role }) =>
    role === 'user' ? theme.colors.primary : theme.colors.background.secondary};
  color: ${({ theme, role }) =>
    role === 'user' ? 'white' : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  line-height: 1.5;
  word-wrap: break-word;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 100%;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.caption};
`;

export const Timestamp = styled.span`
  display: block;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.light};
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-align: right;
`;

// Typing indicator
export const TypingIndicator = styled.div`
  align-self: flex-start;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.light};
`;

export const TypingDots = styled.div`
  display: flex;
  gap: 0.3rem;
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.text.light};
    display: inline-block;
    animation: ${dotPulse} 1.4s infinite both;
  }
  span:nth-child(2) { animation-delay: 0.2s; }
  span:nth-child(3) { animation-delay: 0.4s; }
`;

// Input bar
export const ChatInputBar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const Input = styled.textarea`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-family: inherit;
  resize: none;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const SendButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.sm};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;