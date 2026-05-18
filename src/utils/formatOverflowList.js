export const formatOverflowList = (
  items,
  {
    maxVisible = 3,
    emptyValue = "—",
  } = {}
) => {
  if (
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return emptyValue;
  }

  const visible =
    items.slice(0, maxVisible);

  const remaining =
    items.length - maxVisible;

  return remaining > 0
    ? `${visible.join(", ")}, ...[+${remaining}]`
    : visible.join(", ");
};