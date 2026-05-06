import styled from 'styled-components';

export const TogglerContainer = styled.div`
  display: flex;
  gap: 8px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  padding: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

export const TogglerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
      color: white;
    }
  }
`;
