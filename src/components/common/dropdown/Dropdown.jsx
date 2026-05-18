import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

const DropdownContext = createContext(null);

export const useDropdown = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      'Dropdown components must be used inside Dropdown'
    );
  }

  return context;
};

const DropdownRoot = ({
  children,
  defaultOpen = false,
  controlledOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] =
    useState(defaultOpen);

  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  const isControlled =
    typeof controlledOpen === 'boolean';

  const open = isControlled
    ? controlledOpen
    : internalOpen;

  const setOpen = useCallback(
    (value) => {
      if (!isControlled) {
        setInternalOpen(value);
      }

      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggle,
      triggerRef,
      contentRef,
    }),
    [open, setOpen, toggle]
  );

  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

export default DropdownRoot;