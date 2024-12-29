import { ForwardedRef, forwardRef} from 'react'
import uniqid from 'uniqid';
import {UseFormRegisterReturn} from 'react-hook-form';

interface CheckboxProps {
    className?: string,
    wrapperClasses?: string
    labelClasses?: string,
    label?: string,
    name?: string,
    error?: string,
    placeholder?: string,
    ref?: ForwardedRef<HTMLInputElement>,
    value?: string,
    register?: UseFormRegisterReturn,
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox  = forwardRef<HTMLInputElement,CheckboxProps>(({
                                              className,
                                              wrapperClasses,
                                              labelClasses,
                                              label,
                                              name,
                                              error,
                                              register,
                                              value,
                                              onChange,
                                              ...props
                                          },ref) => {
    const uid: string = uniqid();
    return (
        <div className={['flex flex-col relative', wrapperClasses].join(' ')}>
            {label &&
                <label className={['block text-sm text-gray-600 mb-2', labelClasses].join(' ')}
                       htmlFor={uid}>{label}</label>
            }
            <input ref={ref} type={'checkbox'} value={value} id={uid} name={name} onChange={onChange} {...register}
                   className={['block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40', null, className].join(' ')} {...props} />
            {error &&
                <p className="whitespace-nowrap text-red-600 text-sm absolute -bottom-0.5 translate-y-full">{error}</p>
            }
        </div>
    )
})

export default Checkbox;