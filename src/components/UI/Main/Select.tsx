import { FC } from 'react';
import { Listbox } from '@headlessui/react';
import { ISelect } from '../../../models/ISelect';
import tr from '../../../assets/tr.svg'

interface SelectProps {
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
  onSearch?: (value: string) => void;
  searchQuery?: string;
}

const Select: FC<SelectProps> = ({
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
  onSearch,
  searchAble,
  searchQuery,
}) => {
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
            {labelText ? labelText :name}
          </p>
        </Listbox.Button>
        <Listbox.Options className="z-10 bg-white w-full border border-t-0 pt-2 overflow-hidden border-[#B7975A] rounded-b-3xl">
          {searchAble&&onSearch?<input
            onChange={(event) => onSearch(event.target.value)}
            value={searchQuery}
          />:<></>}
          <div className="max-h-[200px] overflow-auto">
            {options.map((option) => {
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

export default Select;
