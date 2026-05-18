import React, { memo, useEffect, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { DropdownItem, DropdownMenu, DropdownTrigger, TableActionsDropdown, TableActionsInline } from './RowActions.styles';

const RowActions = memo(({
  actions = [],
  mode = 'auto'
}) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const visibleActions = actions.filter(Boolean);

  const resolvedMode =
    mode === 'auto'
      ? visibleActions.length > 2
        ? 'dropdown'
        : 'inline'
      : mode;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  if (!visibleActions.length) {
    return null;
  }

  if (resolvedMode === 'inline') {
    return (
      <TableActionsInline className="table-actions-inline">
        {visibleActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.key}
              type="button"
              className="icon-button"
              aria-label={action.label}
              onClick={action.onClick}
            >
              <Icon
                size={18}
                className={`icon ${action.variant || ''}`}
              />
            </button>
          );
        })}
      </TableActionsInline>
    );
  }

  return (
    <TableActionsDropdown
      className="table-actions-dropdown"
      ref={dropdownRef}
    >
      <DropdownTrigger
        type="button"
        className="dropdown-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreHorizontal size={18} />
      </DropdownTrigger>

      {open && (
        <DropdownMenu className="dropdown-menu">

          {visibleActions.map((action) => {
            const Icon = action.icon;

            return (
              <DropdownItem
                key={action.key}
                type="button"
                className={`dropdown-item ${action.variant || ''}`}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
              >
                <Icon size={16} />

                <span>{action.label}</span>
              </DropdownItem>
            );
          })}

        </DropdownMenu>
      )}
    </TableActionsDropdown>
  );
});

RowActions.displayName = 'RowActions';

export default RowActions;