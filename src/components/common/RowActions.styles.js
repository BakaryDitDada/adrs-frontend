import styled from "styled-components";

export const TableActionsInline = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & .icon-button {
    padding: .6rem .6rem .2rem .6rem !important;
    transition: all .3s ease-in-out;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.borderLight};
    }
  }
`;

export const TableActionsDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownTrigger = styled.button`
  &.dropdown-trigger {  
    padding: .2rem .8rem;
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.secondary};
    transition: background 0.2s ease;
    cursor: pointer;
    border-radius: 0.5rem;

    &:hover {
      background: rgba(0,0,0,0.05);
    }
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;

  top: calc(100% + 0.25rem);
  right: 0;

  min-width: 18rem;
  min-height: 9rem;
  padding: .8rem;

  background: ${({ theme }) => theme.colors.background.primary || "white"};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};

  box-shadow:
    0 10px 25px rgba(0,0,0,0.08);

  z-index: 100;
  overflow: hidden;
`;

export const DropdownItem = styled.button`
  &.dropdown-item {  
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: none;
    background: transparent;
    padding: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.caption};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    cursor: pointer;


    transition: background 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.background.secondary};
    }
  }

  &.dropdown-item.red {
    color: #dc2626;
  }

  &.dropdown-item.green {
    color: #16a34a;
  }

  &.dropdown-item.blue {
    color: #5c88f5;
    font-size: ${({ theme }) => theme.fontSizes.caption};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

`;
