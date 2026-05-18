import React from 'react';

import { useDropdown } from './Dropdown';

const DropdownTrigger = ({
  children,
  asChild = false,
}) => {
  const {
    toggle,
    triggerRef,
  } = useDropdown();

  if (asChild) {
    return React.cloneElement(children, {
      ref: triggerRef,
      onClick: toggle,
    });
  }

  return (
    <button
      type="button"
      ref={triggerRef}
      onClick={toggle}
    >
      {children}
    </button>
  );
};

export default DropdownTrigger;