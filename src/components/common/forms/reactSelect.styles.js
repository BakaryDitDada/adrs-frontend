export const reactSelectStyles = (theme) => ({
  control: (base, state) => ({
    ...base,

    minHeight: '4.4rem',

    backgroundColor: theme.colors.background.primary,

    borderColor: state.isFocused
      ? theme.colors.primary
      : theme.colors.border,

    borderRadius: theme.radii.md,

    boxShadow: 'none',

    transition: 'all 0.2s ease',

    '&:hover': {
      borderColor: theme.colors.primary,
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: `0 ${theme.spacing.sm}`,
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,

    color: theme.colors.text.primary,

    fontSize: theme.fontSizes.body,

    fontFamily: theme.fonts.primary,
  }),

  placeholder: (base) => ({
    ...base,

    color: theme.colors.text.light,

    fontSize: theme.fontSizes.body,

    fontFamily: theme.fonts.primary,
  }),

  singleValue: (base) => ({
    ...base,

    color: theme.colors.text.primary,

    fontSize: theme.fontSizes.body,

    fontFamily: theme.fonts.primary,
  }),

  multiValue: (base) => ({
    ...base,

    backgroundColor: theme.colors.background.tertiary,

    borderRadius: theme.radii.sm,
  }),

  multiValueLabel: (base) => ({
    ...base,

    color: theme.colors.text.primary,

    fontSize: theme.fontSizes.caption,

    fontWeight: theme.fontWeights.medium,
  }),

  multiValueRemove: (base) => ({
    ...base,

    color: theme.colors.text.secondary,

    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.error,
      color: theme.colors.text.inverse,
    },
  }),

  menu: (base) => ({
    ...base,

    backgroundColor: theme.colors.background.primary,

    borderRadius: theme.radii.md,

    overflow: 'hidden',

    zIndex: 9999,

    boxShadow: theme.shadows.lg,
  }),

  menuList: (base) => ({
    ...base,

    padding: theme.spacing.xs,

    maxHeight: '24rem',
  }),

  option: (base, state) => ({
    ...base,

    cursor: 'pointer',

    borderRadius: theme.radii.sm,

    padding: `${theme.spacing.sm} ${theme.spacing.md}`,

    backgroundColor: state.isSelected
      ? theme.colors.primary
      : state.isFocused
      ? theme.colors.background.tertiary
      : 'transparent',

    color: state.isSelected
      ? theme.colors.text.inverse
      : theme.colors.text.primary,

    fontSize: theme.fontSizes.body,

    transition: 'all 0.15s ease',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (base) => ({
    ...base,

    color: theme.colors.text.secondary,

    '&:hover': {
      color: theme.colors.primary,
    },
  }),

  clearIndicator: (base) => ({
    ...base,

    color: theme.colors.text.secondary,

    '&:hover': {
      color: theme.colors.error,
    },
  }),

  noOptionsMessage: (base) => ({
    ...base,

    color: theme.colors.text.secondary,

    fontSize: theme.fontSizes.caption,
  }),

  loadingMessage: (base) => ({
    ...base,

    color: theme.colors.text.secondary,

    fontSize: theme.fontSizes.caption,
  }),
});