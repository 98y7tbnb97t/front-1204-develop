// import React from 'react';
// import { Combobox } from '@headlessui/react';

// interface TreeSelectProps {
//     options: any[]; // array of objects with id, name, and children properties
//     selectedOption: any; // initially selected option
//     setSelectedOption: (option: any) => void; // callback to update selected option
//     className?: string; // additional class name for the component container
// }

// const TreeSelect: React.FC<TreeSelectProps> = ({ options, selectedOption, setSelectedOption, className }) => {
//   const [query, setQuery] = React.useState('');

//   const filterOptions = (options:any, query:any) => {
//     return options
//       .filter((option:any) => option.name.toLowerCase().includes(query.toLowerCase()))
//       .map((option:any) => ({
//         ...option,
//         children: option.children ? filterOptions(option.children, query) : [],
//       }));
//   };

//   const filteredOptions = filterOptions(options, query);

//   const renderOptions = (options:any) => {
//     return options.map((option:any) => (
//       <div key={option.id}>
//         <Combobox.Option value={option}>
//           {option.name}
//         </Combobox.Option>
//         {option.children && option.children.length > 0 && (
//           <div className="ml-4">
//             {renderOptions(option.children)}
//           </div>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className={`relative w-full ${className}`} >
//     <Combobox value={selectedOption} onChange={setSelectedOption}>
//       <Combobox.Input className='border border-[#B7975A] bg-white rounded-full py-0 md:py-2 px-2 md:px-5 w-full' aria-label="Assignee" onChange={(e) => setQuery(e.target.value)} />
//       <Combobox.Options>
//         {renderOptions(filteredOptions)}
//       </Combobox.Options>
//     </Combobox>
//     </div>
//   );
// };

// export default TreeSelect;

// import React from 'react';
// import { Combobox, Listbox } from '@headlessui/react';
// import { ISelect } from '../../../models/ISelect';

// interface TreeSelectOptionsType {
//   id: string;
//   name: string;
//   children?: TreeSelectOptionsType[];
// }

// interface TreeSelectProps {
//   options: TreeSelectOptionsType[];
//   value: ISelect | ISelect[] | null | undefined;
//   onChange(value: never | ISelect): void;
//   multiple?: boolean;
//   name?: string;
//   className?: string;
//   wrapperClass?: string;
//   error?: string;
//   showMultipleValues?: boolean;
//   placeholder?: string;

//   selectedOption: any;
//   setSelectedOption: any;
// }

// const TreeSelect: React.FC<TreeSelectProps> = ({
//   options,
//   value,
//   onChange,
//   multiple,
//   name,
//   showMultipleValues,
//   error,
//   className,
//   wrapperClass,
//   placeholder,

//   selectedOption,
//   setSelectedOption,
// }) => {
//   const selectHandler = (e: never) => {
//     if (multiple) {
//       const val = e as ISelect[];
//       if (isSelected(val[val.length - 1]) && Array.isArray(value)) {
//         const tmp = value.filter((item) => item.id !== val[val.length - 1].id);
//         onChange(tmp);
//       } else {
//         onChange(e);
//       }
//     } else {
//       onChange(e);
//     }
//   };

//   const isSelected = (val: ISelect) => {
//     if (multiple && Array.isArray(value)) {
//       return !!value?.find((item) => item.id === val.id);
//     }
//   };
//   let labelText: any = !Array.isArray(value) ? value?.name || '' : '';

//   if (multiple && Array.isArray(value)) {
//     if (showMultipleValues) {
//       if (value?.length) {
//         labelText = value?.map((v) => v.name).join(', ') + ' ';
//       } else {
//         labelText = placeholder || '';
//       }
//     } else {
//       labelText = value?.length.toString();
//     }
//   }

// //   const [query, setQuery] = React.useState('');

//   const filterOptions = (options: any, /* query: any */) => {
//     return options
//     //   ?.filter((option: any) =>
//     //     option.name.toLowerCase().includes(query.toLowerCase()),
//     //   )
//       ?.map((option: any) => ({
//         ...option,
//         children: option.children ? filterOptions(option.children/* , query */) : [],
//       }));
//   };
//   console.log('query', "query", '\selectedOption', selectedOption, '\nvalue', value);
//   const filteredOptions = filterOptions(options/* , query */);

// //   const renderOptions = (options: any) => {
// //     // const selected = isSelected(option);
// //     return options?.map((option: any) => (
// //       <div key={option.id}  >
// //         <Listbox.Option
// //           className={[
// //             'text-center cursor-pointer px-1 md:px-3 py-2 hover:bg-gradient-select border-b last:border-b-0 font-semibold',
// //           ].join(' ')}
// //           key={option.id}
// //           value={option}
// //         >
// //           {option.name}
// //         </Listbox.Option>
// //         {option.children && option.children.length > 0 && (
// //           <div className="ml-4">{renderOptions(option.children)}</div>
// //         )}
// //       </div>
// //     ));
// //   };

// const renderOptions = (options:any) => {
//     return options?.map((option:any) => (
//       <div key={option.id}>
//         <Combobox.Option value={option}>
//           {option.name}
//         </Combobox.Option>
//         {option.children && option.children.length > 0 && (
//           <div className="ml-4">
//             {renderOptions(option.children)}
//           </div>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className={['relative w-full', wrapperClass].join(' ')}>
//       <Combobox
//         multiple={true}
//         // className={`sm:mb-2 md:mb-5 text-gray-700 placeholder-gray-400  rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40`}
//         value={selectedOption}
//         onChange={(e)=>{ console.log("eeeeeee",e)}}
//       >
//         <Combobox.Button
//         //   onChange={(e) => setQuery(e.target.value)}
//           className="border border-[#B7975A] bg-white rounded-full py-0 md:py-2 px-2 md:px-5 w-full"
//         >

//         <p className="border rounded-full py-1 font-semibold">
//             {name} {labelText}
//           </p>
//         </Combobox.Button>
//         <Combobox.Options
//         className="z-10 bg-white w-full border border-t-0 pt-2 overflow-hidden border-[#B7975A] rounded-b-3xl"

//         >
//              <div className="max-h-[200px] overflow-auto">
//                 {renderOptions(filteredOptions)}
//              </div>
//         </Combobox.Options>
//       </Combobox>

//       {error && (
//         <p className="text-red-600 text-sm absolute bottom-0 translate-y-full">
//           {error}
//         </p>
//       )}
//     </div>
//   );
//   //   return (
//   //     <div className={['relative w-full', wrapperClass].join(' ')}>
//   //       <Listbox
//   //         multiple={multiple}
//   //         id="selectFilter"
//   //         className={[
//   //           'sm:mb-2 md:mb-5 text-gray-700 placeholder-gray-400  rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40',
//   //           className,
//   //         ].join(' ')}
//   //         as="div"
//   //         value={value}
//   //         onChange={(e: never) => {
//   //             console.log("es", e);
//   //         //   selectHandler(e);
//   //         }}
//   //       >
//   //         <Listbox.Button className="border border-[#B7975A] bg-white rounded-full py-0 md:py-2 px-2 md:px-5 w-full">
//   //           <p className="border rounded-full py-1 font-semibold">
//   //             {name} {labelText}
//   //           </p>
//   //         </Listbox.Button>
//   //         <Listbox.Options className="z-10 bg-white w-full border border-t-0 pt-2 overflow-hidden border-[#B7975A] rounded-b-3xl">
//   //           <div className="max-h-[200px] overflow-auto">
//   //             {renderOptions(filteredOptions)}
//   //             {/* {options.map((option) => {
//   //                             const selected = isSelected(option);

//   //                             const nameText = option.name
//   //                             return (
//   //                                 <Listbox.Option
//   //                                     className={[selected && 'bg-gradient-select', 'text-center cursor-pointer px-1 md:px-3 py-2 hover:bg-gradient-select border-b last:border-b-0 font-semibold'].join(' ')}
//   //                                     key={option.id}
//   //                                     value={option}
//   //                                 >
//   //                                     {nameText}
//   //                                 </Listbox.Option>
//   //                             )
//   //                         })} */}
//   //           </div>
//   //         </Listbox.Options>
//   //       </Listbox>
//   //       {error && (
//   //         <p className="text-red-600 text-sm absolute bottom-0 translate-y-full">
//   //           {error}
//   //         </p>
//   //       )}
//   //     </div>
//   //   );
// };

// export default TreeSelect;

import React from 'react';
import { Combobox } from '@headlessui/react';

interface TreeSelectOptionsType {
  id: string;
  name: string;
  children?: TreeSelectOptionsType[];
}

interface TreeSelectProps {
  options: TreeSelectOptionsType[];
  value: any;
  onChange(v: any[]): void;
  multiple?: boolean;
  labelText?: string;
  className?: string;
  wrapperClass?: string;
  error?: string;
  showMultipleValues?: boolean;
  placeholder?: string;
}

const TreeSelect: React.FC<TreeSelectProps> = ({
  options,
  onChange,
  value,
  className,
  wrapperClass,
  error,
  multiple,
  labelText,
  placeholder,
  showMultipleValues,
}) => {

  
    const renderOptions = (options: any) => {
    return options.map((option: any) => (
      <div key={option.id}>
        <Combobox.Option value={option}>
          {({ selected }) => (
            <span className={selected ? 'font-bold' : ''}>{option.name}</span>
          )}
        </Combobox.Option>
        {option.children && (
          <div className="ml-4">{renderOptions(option.children)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="relative w-full">
      <Combobox
        value={value}
        // onChange={(e)=>{console.log("es", e);handleSelect(e);}}
        onChange={onChange}
        // @ts-ignore
        multiple={true}
      >
        <Combobox.Button className="border border-[#B7975A] bg-white rounded-full py-0 md:py-2 px-2 md:px-5 w-full">
          <p className="border rounded-full py-1 font-semibold">{labelText}</p>
        </Combobox.Button>
        <Combobox.Options className="z-10 bg-white w-full border border-t-0 pt-2 overflow-hidden border-[#B7975A] rounded-b-3xl">
          <div className="max-h-[200px] overflow-auto">
            {renderOptions(options)}
          </div>
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default TreeSelect;
