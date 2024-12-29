import { ForwardedRef, forwardRef } from 'react';
import uniqid from 'uniqid';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  className?: string;
  iconClass?: string;
  wrapperClasses?: string;
  labelClasses?: string;
  label?: string;
  name?: string;
  error?: string;
  placeholder?: string;
  type: string;
  ref?: ForwardedRef<HTMLInputElement>;
  value?: string;
  onClickIcon?: () => void;
  register?: UseFormRegisterReturn;
  icon?: React.JSX.Element;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClasses,
      labelClasses,
      iconClass,
      label,
      name,
      error,
      register,
      type,
      value,
      icon,
      onChange,
      onInput,
      onClickIcon,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const uid: string = uniqid();
    return (
      <div className={['flex flex-col relative', wrapperClasses].join(' ')}>
        {label && (
          <label
            className={['block text-sm text-gray-600 mb-2', labelClasses].join(
              ' ',
            )}
            htmlFor={uid}
          >
            {label}
          </label>
        )}
        {icon && (
          <button
            disabled={!onClickIcon}
            onClick={(e) => {
              if (onClickIcon) {
                e.stopPropagation();
                onClickIcon();
              }
            }}
            className={`absolute cursor-pointer disabled:cursor-default top-1/2 left-3 -translate-y-1/2 text-gray-900 ${
              iconClass || ''
            }`}
          >
            {icon}
          </button>
        )}
        <input
          ref={ref}
          type={type}
          value={value}
          id={uid}
          name={name}
          onChange={onChange}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          {...register}
          className={[
            'block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40',
            icon ? 'pl-9' : null,
            className,
          ].join(' ')}
          {...props}
        />
        {error && (
          <p className="whitespace-nowrap text-red-600 text-sm absolute -bottom-0.5 translate-y-full">
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default Input;
