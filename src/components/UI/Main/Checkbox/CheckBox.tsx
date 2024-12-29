import {forwardRef, useId} from 'react'
import {UseFormRegisterReturn} from 'react-hook-form';

import "./Checkbox.css"
import classNames from 'classnames';

interface InputProps {
    className?: string,
    isImportant?: boolean,
    wrapperClass?: string,
    labelClass?: string,
    checked?: boolean,
    label?: string | React.ReactNode
    register?: UseFormRegisterReturn,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    error?: string,
    children?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLInputElement>,
    width?: string;
    height?: string;
}

const CheckBox = forwardRef<HTMLInputElement, InputProps>(({
                                                               className,
                                                               isImportant,
                                                               wrapperClass,
                                                               checked,
                                                               register,
                                                               onChange,
                                                               onClick,
                                                               error,
                                                               label,
                                                               labelClass,
                                                               width,
                                                               height,
                                                               ...props
                                                           },
                                                           ref) => {
    const id = useId();
    return (
        <div className={['relative', wrapperClass].join(' ')}>
            <div className={classNames("flex align-middle", {}, [width ? `w-[${width}]` : '', height ? `h-[${height}]` : ''])}>
                <input ref={ref} type="checkbox" id={id} className={['peer hidden', className].join(' ')}
                       checked={checked} {...props} onClick={onClick} onChange={onChange} {...register}/>
                <label
                    className={`cursor-pointer text-[#353535] font-semibold peer-checked:after:content-["✓"] after:absolute after:left-[5px] after:text-white  ${isImportant ? `peer-checked:before:bg-red-600`: 'peer-checked:before:bg-[#B7975A]'} relative before:absolute before:left-0 pl-8 before:border-2 before:border-[#353535] before:w-6 before:h-6 checkbox ${labelClass || ""}`}
                    htmlFor={id}>
                    {label}
                </label>
            </div>


            {error &&
                <p className="text-red-600 text-sm absolute -bottom-0.5 translate-y-full">{error}</p>
            }
        </div>
    )
})

export default CheckBox;
