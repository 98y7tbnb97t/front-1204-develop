import { FC, PropsWithChildren } from 'react';

interface MainButtonProps {
  className?: string;
  onClick?: () => void;
  type?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const MainButton: FC<PropsWithChildren<MainButtonProps>> = ({
  children,
  className,
  onClick,
  type,
  style,
  disabled = false
}) => {
  return (
    <button
      disabled={disabled}
      type={type ? 'button' : 'submit'}
      onClick={onClick}
      style={style}
      className={[
        className,
        'justify-center w-full text-white text-xl font-semibold py-1 md:py-3 px-2 md:px-4 rounded-full',
        disabled ? '!bg-gray-500' : 'bg-gradient-menu'
      ].join(' ')}
    >
      {children}
    </button>
  );
};

export default MainButton;
