import { FC, useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ISelect } from '../../../models/ISelect';

interface SelectSearchProps {
  options: ISelect[];
  value: ISelect | ISelect[] | null | undefined;
  onChange(value: never | ISelect): void;
  multiple?: boolean;
  name?: string;
  className?: string;
  wrapperClass?: string;
  error?: string;
  showMultipleValues?: boolean;
  placeholder?: string;

  searchAble?: boolean;
}

const SelectSearch: FC<SelectSearchProps> = ({
  options,
  value,
  onChange,
  multiple,
  name,
  showMultipleValues,
  error,
  className,
  wrapperClass,
  placeholder,
}) => {
  const [optionsFiltered, setOptionsFiltered] = useState<ISelect[]>(options);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const selectHandler = (e: never) => {
    if (multiple) {
      const val = e as ISelect[];
      if (isSelected(val[val.length - 1]) && Array.isArray(value)) {
        const tmp = value.filter((item) => item.id !== val[val.length - 1].id);
        onChange(tmp);
      } else {
        onChange(e);
      }
    } else {
      onChange(e);
    }
    setSearchQuery('');
  };

  const isSelected = (val: ISelect) => {
    if (multiple && Array.isArray(value)) {
      return !!value?.find((item) => item.id === val.id);
    }
  };
  let labelText: string = !Array.isArray(value) ? value?.name || '' : '';
  if (multiple && Array.isArray(value)) {
    if (showMultipleValues) {
      if (value?.length) {
        labelText = value?.map((v) => v.name).join(', ') + ' ';
      } else {
        labelText = placeholder || '';
      }
    } else {
      labelText = value?.length.toString();
    }
  }

  const onSearch = (value: string) => {
    setSearchQuery(value);
  }

//   useEffect(() => {
//     if (searchQuery) {
//         setOptionsFiltered(options.filter(item => String(item.name).toLowerCase().includes(searchQuery.toLowerCase())))
//     } else {
//       setOptionsFiltered(options);
//     }
// }, [searchQuery]);

  useEffect(() => {
      if (searchQuery) {
          setOptionsFiltered(options.filter(item => String(item.name).toLowerCase().includes(searchQuery.toLowerCase())))
      } else {
        setOptionsFiltered(options);
      }
  }, [options, searchQuery]);

  return (
    <div className={['relative w-full', wrapperClass].join(' ')}>
      <Listbox
        multiple={multiple}
        id="selectFilter"
        className={[
          'text-gray-700 placeholder-gray-400  rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40',
          className,
        ].join(' ')}
        as="div"
        value={value}
        onChange={(e: never) => {
          selectHandler(e);
        }}
      >
        <Listbox.Button className="border border-[#B7975A] bg-white rounded-full py-0 md:py-2 px-2 md:px-5 w-full">
          <p className="border rounded-full py-1 font-semibold">
            {name && <span className='text-red-500'>{name}:</span>} {labelText ? labelText : ''}
          </p>
        </Listbox.Button>
        <Listbox.Options className="z-10 bg-white w-full border border-t-0 pt-2 overflow-hidden border-[#B7975A] rounded-b-3xl">
          <div className="px-1">
            <input
              className='w-full p-2 border-2 border-gray-100'
              placeholder='Поиск..'
              
              onChange={(event) => onSearch(event.target.value)}
              value={searchQuery}
            />
          </div>
          <div className="max-h-[200px] overflow-auto">
            {optionsFiltered.map((option) => {
              const selected = isSelected(option);

              const nameText = option.name;
              return (
                <Listbox.Option
                  className={[
                    selected && 'bg-gradient-select',
                    'text-center cursor-pointer px-1 md:px-3 py-2 hover:bg-gradient-select border-b last:border-b-0 font-semibold',
                  ].join(' ')}
                  key={option.id}
                  value={option}
                >
                  {nameText}
                </Listbox.Option>
              );
            })}
          </div>
        </Listbox.Options>
      </Listbox>
      {error && (
        <p className="text-red-600 text-sm absolute bottom-0 translate-y-full">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectSearch;
