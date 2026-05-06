import styled, { keyframes, css } from 'styled-components';

/* -------------------------------------------------------------------------- */
/* Layout & Header                                                            */
/* -------------------------------------------------------------------------- */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background.primary};
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  h1 {
    font-size: ${({ theme }) => theme.typography.elements.h2.fontSize};
    font-weight: ${({ theme }) => theme.typography.elements.h2.fontWeight};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

/* -------------------------------------------------------------------------- */
/* Buttons (used inside Actions)                                              */
/* -------------------------------------------------------------------------- */
export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.body};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const OutlineButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.body};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/* -------------------------------------------------------------------------- */
/* Badge (employee status)                                                    */
/* -------------------------------------------------------------------------- */
const getStatusColor = (theme, status) => {
  console.log("Status (getStatusColor) ::: ", status);
  const map = {
    active: theme.colors.success,
    ["En activité"]: theme.colors.success,
    ["Approuvé"]: theme.colors.success,
    on_leave: theme.colors.warning,
    ["En congé"]: theme.colors.warning,
    ["A la retraite"]: theme.colors.warning,
    terminated: theme.colors.error,
    ["Licencié"]: theme.colors.error,
    ["Rejeté"]: theme.colors.error,
    ["Annulé"]: theme.colors.error,
    ["Contrat terminé"]: theme.colors.error,
    ["En Formation"]: theme.colors.info,
    ["En attente"]: theme.colors.info,
    ["Non payé"]: theme.colors.info,
    ["En cours"]: theme.colors.info,
  };
  return map[status] || theme.colors.text.secondary;
};

export const Badge = styled.span`
  min-width: 10rem;
  display: inline-block;
  padding: 0.5rem 0.8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: capitalize;
  text-align: center;
  background-color: ${({ theme, status }) => getStatusColor(theme, status) + '20'};
  color: ${({ theme, status }) => getStatusColor(theme, status)};
`;

/* -------------------------------------------------------------------------- */
/* Access denied & mock data banner                                           */
/* -------------------------------------------------------------------------- */
export const AccessDenied = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.text.secondary};

  h2 {
    margin: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  svg {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const MockDataBanner = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.warning + '20'};
  border-left: 4px solid ${({ theme }) => theme.colors.warning};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

/* -------------------------------------------------------------------------- */
/* Table & related components (from CustomTable)                              */
/* -------------------------------------------------------------------------- */
export const TableContainer = styled.section`
  width: ${props => props.width || '100%'};
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.shadows.md};
  // padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  // margin: ${({ theme }) => theme.spacing.lg} auto;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.body};

  .btn__container {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const DashSearchInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  width: ${props => props.width || '350px'};
  font-size: ${({ theme }) => theme.fontSizes.body};
  ${props => props.$flex && `flex: ${props.$flex}`};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TableHead = styled.thead`
  font-size: ${({ theme }) => theme.fontSizes.body};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};

   & tr {
    border-bottom: 2px solid ${({ theme }) => theme.colors.border}; /* thicker bottom for header */
    cursor: default;
    &:hover {
      background-color: transparent;
      box-shadow: none;
    }
  }
`;

export const TableBody = styled.tbody`
  font-size: ${({ theme }) => theme.fontSizes.caption};
`;

export const TableRow = styled.tr`
  // border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    /* Optional: add a subtle scale effect (uncomment if desired) */
    /* transform: scale(1.01); */
  }
`;

export const TableCellTh = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  text-align: left;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};

  .actions__icons {
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  .icon {
    font-size: ${({ theme }) => theme.fontSizes.caption};
    cursor: pointer;
  }

  .red {
    color: ${({ theme }) => theme.colors.error};
  }

  .green {
    color: ${({ theme }) => theme.colors.success};
  }
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  span {
    font-size: ${({ theme }) => theme.fontSizes.body};
  }

  .table-footer__input {
    width: 10rem;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.fontSizes.body};
    background-color: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.secondary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.sm};
    outline: none;
    text-align: center;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '40'};
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.background.tertiary};
      border-color: ${({ theme }) => theme.colors.border};
      cursor: not-allowed;
    }
  }
`;

export const TableCheckbox = styled.input`
  appearance: none;
  font: inherit;
  color: currentColor;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  padding: 0 10px;
  background: ${({ theme }) => theme.colors.background.primary};

  &::before {
    content: '';
    width: 1em;
    height: 1em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    background-color: ${({ theme }) => theme.colors.primary};
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform-origin: bottom left;
  }

  &.checkbox__multi-checked-status {
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      width: 1.2rem;
      height: 0.4rem;
      background-color: ${({ theme }) => theme.colors.primaryDark};
      clip-path: none !important;
      position: absolute;
      top: 7px;
      z-index: 1;
    }

    &::before {
      content: '';
      width: 1.5rem !important;
      height: 1.5rem !important;
      background-color: ${({ theme }) => theme.colors.secondary + 'BD'}; /* ~74% opacity */
      clip-path: none !important;
      position: absolute;
      transform: none !important;
      z-index: 1;
    }
  }

  &:checked::before {
    transform: scale(1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* -------------------------------------------------------------------------- */
/* Action buttons (edit/delete)                                               */
/* -------------------------------------------------------------------------- */
export const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ danger, theme }) =>
    danger ? theme.colors.error : theme.colors.text.secondary};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ danger, theme }) =>
      danger ? theme.colors.error : theme.colors.primary};
  }
`;

/* -------------------------------------------------------------------------- */
/* Loading spinner                                                            */
/* -------------------------------------------------------------------------- */
const LoadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || '100vh'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${props => props.border || 'none'};

  .spinner {
    font-size: ${props => props.$iconSize || '3.5rem'};
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    animation: ${LoadingAnimation} 2s ease infinite;
  }

  .large {
    font-size: 15rem !important;
  }

  .medium {
    font-size: 8rem !important;
  }
`;

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */
export const PaginationButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const PaginationButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.body};
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    opacity: 0.85;
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;   /* prevents any hover/click interaction */
  }

  /* Optional: keep pointer-events: auto if you want to show a tooltip, but then you must handle clicks in JS */
  /* If you want to allow hover but keep disabled appearance: */
  /*
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    &:hover {
      opacity: 0.4;
    }
  }
  */

  &.activePage {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }

  &.numbers-btn {
    width: 3.9rem;
  }
`;

/* -------------------------------------------------------------------------- */
/* Search box (standalone, used on EmployeesPage)                             */
/* -------------------------------------------------------------------------- */
export const SearchBox = styled.div`
  input {
    width: 100%;
    max-width: 60rem;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    font-size: ${({ theme }) => theme.fontSizes.body};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

// import styled, { keyframes } from "styled-components";

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${({ theme }) => theme.spacing.lg};
// `;

// export const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   gap: ${({ theme }) => theme.spacing.md};

//   h1 {
//     font-size: ${({ theme }) => theme.fontSizes.h2};
//     font-weight: ${({ theme }) => theme.fontWeights.bold};
//   }
// `;

// export const Actions = styled.div`
//   display: flex;
//   gap: ${({ theme }) => theme.spacing.md};
//   align-items: center;
// `;

// // ------------------------
// // TABLE STYLING -- START
// // ------------------------
// export const TableContainer = styled.section`
//   width: ${props => props.width || '95%'}; 
//   background: ${props => props.theme.tableBackground};
//   color: ${props => props.theme.color};
//   box-shadow: ${props => props.theme.boxShadow};
//   padding: 1.5rem;
//   border-radius: 8px;
//   margin: 1.5rem auto;
// `;

// export const TableHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;
//   gap: 2rem;

//   font-size: 1.5rem;

//   & .btn__container {
//     display: flex;
//     gap: 2rem;
//   }
// `;

// export const DashSearchInput = styled.input`
//   padding: ${props => props.$padding || "10px"};
//   border: none;
//   border-radius: 4px;
//   width: ${props => props.width || "200px"};
//   ${(props) => props.$flex && `flex: ${props.$flex}`};
//   background: ${props => props.theme.active};
//   color: ${props => props.theme.text};
//   outline: 0;
// `;

// export const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-bottom: 1.5rem;
// `;

// export const TableHead = styled.thead`
//   font-size: 1.5rem;
//   // background: ${props => props.theme.background};
// `;

// export const TableBody = styled.tbody`
//   font-size: 1.4rem;
//   // background: ${props => props.theme.background};
// `;

// export const TableRow = styled.tr`
//   border-bottom: 1px solid #ccc;
// `;

// export const TableCellTh = styled.th`
//   padding: 10px;
//   border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
//   text-align: left;
// `;

// export const TableCell = styled.td`
//   padding: 10px;
//   border-bottom: ${props => `1px solid ${props.theme.borderColor}`};

//   & .actions__icons {
//     display: flex;
//     gap: 1.2rem;
//   }

//   & .icon {
//     font-size: 1.4rem;
//     cursor: pointer;
//   }

//   & .red { color: red; }

//   & .green { color: green; }
// `;

// export const TableFooter = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 2rem;

//   & span {
//     font-size: 1.2rem;
//   }

//   & .table-footer__input {
//     width: 6rem; /* Adjust the width to fit the input content */
//     padding: 5px 10px; /* Add padding for a comfortable touch target */
//     font-size: 16px; /* Set a readable font size */
//     // border: 1px solid #ccc; /* Add a light border */
//     background-color: ${props => props.theme.paginationBg};
//     border: 1px solid ${props => props.theme.paginationBorder};
//     border-radius: 4px; /* Round the corners */
//     outline: none; /* Remove the default outline */
//     transition: border-color 0.3s ease; /* Smooth transition for border color change */
//     text-align: center;
//   }
  
//   & .table-footer__input:focus {
//     border-color: var(--color-primary); /* Change border color on focus */
//     box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a shadow for better focus indication */
//   }
  
//   & .table-footer__input::-webkit-inner-spin-button,
//   & .table-footer__input::-webkit-outer-spin-button {
//     -webkit-appearance: none; /* Hide the default spin buttons in WebKit browsers */
//     margin: 0; /* Remove margin */
//   }
  
//   & .table-footer__input[type='number'] {
//     -moz-appearance: textfield; /* Hide the default spin buttons in Firefox */
//   }
  
//   & .table-footer__input:disabled {
//     background-color: #f9f9f9; /* Light background for disabled state */
//     border-color: #ddd; /* Lighter border for disabled state */
//     cursor: not-allowed; /* Indicate disabled state with cursor */
//   }
// `;

// export const TableCheckbox = styled.input`
//   appearance: none;
//   font: inherit;
//   color: currentColor;
//   width: 2rem;
//   height: 2rem;
//   // border: 1px solid #bbc2c2c2;
//   border: 1px solid #6b6464c2;
//   border-radius: .2rem;
//   transform: translateY(-0.075em);
//   display: grid;
//   place-content: center;
//   padding: 0 10px;

//   &.checkbox-input-1 {
//     // border: 1px solid #6b6464c2 !important;
//   }

//   &::before {
//     content: "";
//     width: 1em;
//     height: 1em;
//     transform: scale(0);
//     transition: 120ms transform ease-in-out;
//     box-shadow: inset 1em 1em rgb(0, 255, 225);

//     background-color: rgb(0, 255, 225);
//     z-index: 1;

//     transform-origin: bottom left;
//     clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
//   }

//   &.checkbox__multi-checked-status {
//     display: flex;
//     align-items: center;
//     justify-content: center;
    
//     &::after {
//       content: '';
//       width: 1.2rem;
//       height: .4rem;
//       background-color: rgb(18, 87, 79);
//       clip-path: none !important;
//       top: 7px;
//       z-index: 1;
//       position: absolute;
//     }

//     &::before {
//       content: '';
//       width: 1.5rem !important;
//       height: 1.5rem !important;
//       background-color: rgba(2, 165, 146, 0.74);
//       clip-path: none !important;
//       position: absolute;
//       z-index: 1;
//       transform: none !important;
//     }
//   }

//   &:checked::before {
//     transform: scale(1);
//   }

//   &:disabled {
//     --form-control-color: var(--form-control-disabled);

//     color: var(--form-control-disabled);
//     cursor: not-allowed;
//   }


// `;
// // ------------------------
// // TABLE STYLING -- END
// // ------------------------

// // ------------------------
// // CUSTOM LOADING -- START
// // ------------------------

// const LoadingAnimation = keyframes`
//   0% {
//       transform: rotate(0deg);
//   }
//   100% {
//       transform: rotate(360deg);
//   }
// `;

// export const LoadingContainer = styled.div`
//   width: ${props => props.width ? props.width : "auto"};
//   height: ${props => props.height ? props.height : "100vh"};
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border: ${props => props.border ? props.border : "none"};

//   & .spinner {
//       font-size: ${props => props.$iconSize ? props.$iconSize : "3.5rem"};
//       margin: 0;

//       color: #659af4e6;
//       animation: ${LoadingAnimation} 2s ease infinite;
//   }

//   & .large {
//       font-size: 15rem !important;
//   }
  
//   & .medium {
//       font-size: 8rem !important;
//   }
// `;
// // ------------------------
// // CUSTOM LOADING -- END
// // ------------------------

// // --------------------------
// // CUSTOM PAGINATION -- START
// // --------------------------
// export const PaginationButtons = styled.div`
//     // width: 100%;
//     display: flex;
//     justify-content: flex-end;
//     gap: .5rem;
//     padding: 1rem;
// `;

// export const PaginationButton = styled.button`
//     padding: .8rem 1rem;
//     background-color: ${props => props.theme.paginationBg};
//     border: 2px solid ${props => props.theme.paginationBorder};
//     border-radius: 4px;
//     cursor: pointer;
//     transition: all .3s ease;

//     &:hover {
//       opacity: .85;
//     }

//     &.activePage {
//       border: 2px solid var(--color-secondary);
//       color: var(--color-secondary);
//       // border: 2px solid ${props => props.theme.colorSecondary};
//     }

//     &.numbers-btn {
//         width: 3.9rem;
//     }
// `;
// // --------------------------
// // CUSTOM PAGINATION -- END
// // --------------------------

// // --------------------------
// // BUTTONS -- START
// // --------------------------
// export const PrimaryButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => theme.spacing.xs};
//   padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border: none;
//   border-radius: ${({ theme }) => theme.radii.md};
//   font-weight: ${({ theme }) => theme.fontWeights.semibold};
//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.primaryDark};
//   }
// `;

// export const OutlineButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => theme.spacing.xs};
//   padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
//   background: transparent;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   color: ${({ theme }) => theme.colors.text.secondary};
//   border-radius: ${({ theme }) => theme.radii.md};
//   font-weight: ${({ theme }) => theme.fontWeights.medium};
//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.background.tertiary};
//     color: ${({ theme }) => theme.colors.primary};
//     border-color: ${({ theme }) => theme.colors.primary};
//   }
// `;
// // --------------------------
// // BUTTONS -- END
// // --------------------------

// // --------------------------
// // INPUTS -- START
// // --------------------------
// export const SearchBox = styled.div`
//   input {
//     width: 100%;
//     max-width: 40rem;
//     padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
//     border: 1px solid ${({ theme }) => theme.colors.border};
//     border-radius: ${({ theme }) => theme.radii.md};
//     font-size: ${({ theme }) => theme.fontSizes.body};
//     color: ${({ theme }) => theme.colors.text.primary};
//     background-color: ${({ theme }) => theme.colors.background.primary};
//     outline: none;
//     transition: border-color 0.2s;

//     &:focus {
//       border-color: ${({ theme }) => theme.colors.primary};
//     }
//   }
// `;
// // --------------------------
// // INPUT -- END
// // --------------------------

