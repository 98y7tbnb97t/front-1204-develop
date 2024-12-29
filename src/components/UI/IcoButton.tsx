import { FC, forwardRef, ForwardedRef } from 'react'

interface IcoButtonProps {
    icon: React.JSX.Element;
    className?: string;
    onClick?: () => void;
        ref?: ForwardedRef<HTMLButtonElement>
}

const IcoButton: FC<IcoButtonProps> = forwardRef(({icon, className, onClick}, ref) => {
    return (
        <button ref={ref} className={['hover:bg-gray-700 py-2 xl:py-3 px-2 xl:px-5 rounded-sm transition-all xl:mr-2 text-black text-xl',className].join(' ')} onClick={onClick}>{icon}</button>
    )
})

export default IcoButton;