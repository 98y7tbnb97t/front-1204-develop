import { FC, useEffect, useState } from 'react';
import { ISelect } from '../../../models/ISelect';
import tr from '../../../assets/tr.svg';
import magnifier from '../../../assets/icons/magnifier.png'

interface SelectProps {
  options: ISelect[];
  value: ISelect | ISelect[] | null;
  onChange(value: never | ISelect[]): void;
  multiple?: boolean;
  name?: string;
  className?: string;
  wrapperClass?: string;
  error?: string;
  showMultipleValues?: boolean;
  placeholder?: string;
}

interface initialOptionsType{
    label: string;
    value: string;
    checked: boolean;
}

const SelectGroup: FC<SelectProps> = ({
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

    const initialOptions: initialOptionsType[] = [
        { label: 'Vue', value: 'Vue', checked: false },
        { label: 'React', value: 'React', checked: false },
        { label: 'Angular', value: 'Angular', checked: false },
        { label: 'PHP', value: 'PHP', checked: false },
      ];
  
      const [optionsSel, setOptions] = useState(initialOptions);
      const selectedOptions = optionsSel.filter(optionsSel => optionsSel.checked);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = optionsSel.filter((person) =>
        person.label.toLowerCase().includes(searchTerm),
    );
    setSearchResults(results);

  }, [searchTerm, optionsSel]);
  const [open, setOpen] = useState(false)
  return (
    <div className={['relative w-full ', wrapperClass].join(' ')}>
        
      <div className='border-[#B7975A] border rounded-3xl bg-white'>
        <div className="  bg-white rounded-full py-0 md:py-2 px-2 md:px-5 w-full flex items-center justify-center">
        <div className='flex w-full justify-center' onClick={()=>{setOpen(!open)}}>
          <p className=" rounded-full py-1 font-semibold ml-auto">
            
{  selectedOptions.length >0  ?        <div className="flex">{selectedOptions.map(opt => opt.label).join(', ')}</div> : <h1>Выбрать определенные группы или учеников</h1>}
          </p>
          <img src={tr}  className="ml-auto" /></div>
        </div>
       {open && <div className="z-10 bg-white w-full border-t-0 pt-2 overflow-hidden  rounded-b-3xl">
          <div className="max-h-[200px] overflow-auto">
            <input
              type="text"
              placeholder="Поиск..."
              className='w-[90%] ml-[5%] outline-none shadow-2xl drop-shadow-2xl border rounded-3xl text-center font-bold text-xl'
              value={searchTerm}
              onChange={handleChange}
            />
            <div className='flex flex-col'>
            {!searchTerm && <img src={magnifier} className='absolute h-7 top-[60px] right-[80px] ' />}
            {searchResults.map((option: initialOptionsType) =>  <>
                
               
                <label className='h-8 flex mt-1 border-b justify-center bg-gradient-silver'>
                <input
                key={option.value}
                checked={option.checked}
                type='checkbox'
                  className={[
                    true && 'bg-gradient-select',
                    'text-center cursor-pointer px-1 md:px-3 py-2 hover:bg-gradient-select border-b last:border-b-0 font-semibold ml-4 mr-auto ',
                  ].join(' ')}
                  value={option.label}
                  
                  onChange={() => {
                    const updatedOptions = optionsSel.map(opt =>
                      opt.value == option.value
                        ? { ...opt, checked: !opt.checked }
                        : opt
                    );
                    setOptions(updatedOptions);
                  }}
                /><p className='flex mr-[50%]'>{option.label}</p></label>
                </>
                    
                  
                
            )}</div>
            
          </div>
        </div>}
        </div>
      
      
      {error && (
        <p className="text-red-600 text-sm absolute bottom-0 translate-y-full">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectGroup;
