'use client';

import { useMemo, useState } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useTheme } from 'styled-components';

import { reactSelectStyles } from './reactSelect.styles';
import { useDebounce } from '@/hooks/useDebounce';
import MultiValueContainer from './MultiValueContainer';

export default function AsyncSearchSelect({
  name,
  control,
  label,

  queryHook,
  mapOption,

  isMulti = false,

  placeholder = 'Rechercher...',
  disabled = false,

  limit = 20,

  rules,
}) {
  const theme = useTheme();

  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  const {
    data: response,
    isLoading,
    isFetching,
  } = queryHook(
    {
      searchTerm: debouncedSearch,
      limit,
    },
    {
      skip: debouncedSearch.length < 1,
    }
  );

  const fetchedOptions = useMemo(() => {
    if (!response?.data) return [];

    return response.data.map(mapOption);
  }, [response, mapOption]);

  return (
    <div>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: `${theme.spacing.xs}`,
            fontSize: `${theme.fontSizes.caption}`,
            fontWeight: `${theme.fontWeights.semibold}`,
          }}
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          // IMPORTANT:
          // Merge current selected values with fetched options
          // so selected items always remain visible

          // const mergedOptions = [
          //   ...(field.value || []),
          //   ...fetchedOptions,
          // ];

          const selectedOptions = isMulti
            ? field.value || []
            : field.value
            ? [field.value]
            : [];

          const mergedOptions = [
            ...selectedOptions,
            ...fetchedOptions,
          ];

          const uniqueOptions = Array.from(
            new Map(
              mergedOptions.map((item) => [
                item.value,
                item,
              ])
            ).values()
          );

          return (
            <div>
              <Select
                isMulti={isMulti}
                options={uniqueOptions}
                isLoading={isLoading || isFetching}
                isDisabled={disabled}

                styles={reactSelectStyles(theme)}

                components={
                  isMulti ? { MultiValue: MultiValueContainer } : undefined
                }

                value={
                  field.value ||
                  (isMulti ? [] : null)
                }

                placeholder={placeholder}

                noOptionsMessage={() =>
                  debouncedSearch.length < 1
                    ? 'Commencez à taper...'
                    : 'Aucun résultat'
                }

                loadingMessage={() =>
                  'Recherche en cours...'
                }

                filterOption={null}

                onInputChange={(value, meta) => {
                  if (
                    meta.action === 'input-change'
                  ) {
                    setSearch(value);
                  }
                }}

                onChange={(selected) => {
                  field.onChange(selected);
                }}

                onBlur={field.onBlur}
              />

              {fieldState.error && (
                <p
                  style={{
                    color: theme.colors.error,
                    fontSize: '1.3rem',
                    marginTop: '0.6rem',
                  }}
                >
                  {fieldState.error.message}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}