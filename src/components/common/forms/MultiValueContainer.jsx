import { components } from 'react-select';
import { useTheme } from 'styled-components';

const MAX_VISIBLE_ITEMS = 3;

export default function MultiValueContainer(props) {
  const { index, getValue } = props;

  const theme = useTheme();

  const selectedValues = getValue();

  // Show first 3 normally
  if (index < MAX_VISIBLE_ITEMS) {
    return (
      <components.MultiValue {...props} />
    );
  }

  // Show overflow counter only once
  if (index === MAX_VISIBLE_ITEMS) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 4,
          marginRight: 2,
          fontSize: `${theme.fontSizes.caption}`,
          fontWeight: `${theme.fontWeights.semibold}`,
          opacity: 0.8,
        }}
      >
        +{selectedValues.length - MAX_VISIBLE_ITEMS}
      </div>
    );
  }

  // Hide remaining chips
  return null;
}