import { useState, useMemo } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

export default function AsyncMultiSelect({
  name,
  control,
  label,
  queryHook,
  mapOption,
  isMulti = true,
  placeholder = 'Rechercher...',
}) {
  const [search, setSearch] = useState('');

  const { data:  response, isLoading } = queryHook(
    { search, limit: 20 },
    { skip: !search }
  );

  const options = useMemo(() => {
    if (!response?.data) return [];
    return response.data.map(mapOption);
  }, [response, mapOption]);

  return (
    <div>
      {label && <label style={{ fontWeight: 500 }}>{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = isMulti
            ? options.filter((opt) => field.value?.includes(opt.value))
            : options.find((opt) => opt.value === field.value) || null;

          return (
            <Select
              isMulti={isMulti}
              options={options}
              isLoading={isLoading}
              value={selected}
              onInputChange={(val) => setSearch(val)}
              onChange={(val) => {
                if (isMulti) {
                  field.onChange(val?.map((v) => v.value) || []);
                } else {
                  field.onChange(val?.value || null);
                }
              }}
              placeholder={placeholder}
              noOptionsMessage={() => 'Aucun résultat'}
            />
          );
        }}
      />
    </div>
  );
}