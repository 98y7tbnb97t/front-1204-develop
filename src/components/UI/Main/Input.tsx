import { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
    type?: string,
    placeholder?: string,
    className?: string,
    wrapperClass?: string,
    value?: string,
    register?: UseFormRegisterReturn,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    error?: string,
    read?: boolean,
    children?: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    [key: string]: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                            type,
                                                            read,
                                                            placeholder,
                                                            className,
                                                            wrapperClass,
                                                            value,
                                                            register,
                                                            onChange,
                                                            onClick,
                                                            error,
                                                            children,
                                                            ...props
                                                        }, ref) => {
    return (
        <div className={['relative flex', wrapperClass].join(' ')}>
            <div className="absolute top-1/2 -translate-y-1/2 left-1 font-semibold text-[#B7975A]">{children}</div>
            <input
                ref={ref}
                readOnly={read}
                className={['w-full border border-[#B7975A] rounded-full text-left sm:text-center py-1 md:py-3 px-1 md:px-5 ', className].join(' ')}
                type={type || "text"}
                defaultValue={value}
                value={value}
                placeholder={placeholder}
                onClick={onClick}
                onChange={onChange}
                {...props}
                {...register}
            />
            {error &&
                <p className="text-red-600 font-medium whitespace-nowrap text-sm absolute -bottom-0.5 translate-y-full">{error}</p>
            }
        </div>
    )
})

export default Input;