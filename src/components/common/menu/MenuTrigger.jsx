import React from 'react';

import {
  useMenu,
} from './Menu';

const MenuTrigger = ({
  children,
}) => {
  const {
    toggle,
    triggerRef,
  } = useMenu();

  return React.cloneElement(
    children,
    {
      ref: triggerRef,
      onClick: toggle,
    }
  );
};

export default MenuTrigger;

// import React from 'react';

// import {
//   useMenu,
// } from './Menu';

// import {
//   MenuWrapper,
// } from './Menu.styles';

// const MenuTrigger = ({
//   children,
//   className,
// }) => {
//   const {
//     toggle,
//     triggerRef,
//   } = useMenu();

//   return (
//     <MenuWrapper>

//       <button
//         ref={triggerRef}
//         type="button"
//         className={className}
//         onClick={toggle}
//       >
//         {children}
//       </button>

//     </MenuWrapper>
//   );
// };

// export default MenuTrigger;