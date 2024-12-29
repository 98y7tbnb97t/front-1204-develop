
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { FC } from 'react';

interface SwitchProps {
    label?: string,
    value?: boolean,
    className?: string,
    onChange?: (checked: boolean) => void;
}


const TournamentSwitch: FC<SwitchProps> = ({value, onChange}) => {
  return (
    <HeadlessSwitch checked={value} onChange={onChange} className='bg-[#353535] relative inline-flex h-10 min-w-16 items-center rounded-full'>
                <span className="sr-only">Автовыбор задач при выборе темы</span>
                <span className={`${value ? 'translate-x-7 bg-gradient-appricot' : 'translate-x-1'} inline-block h-8 w-8 transform rounded-full bg-white transition`}/>
            </HeadlessSwitch>
  )
}

export default TournamentSwitch