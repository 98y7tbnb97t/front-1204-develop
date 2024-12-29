import cls from './Tag.module.css';
import classNames from 'classnames';

interface TagProps<T> {
    className?: string;
    value: T;
    removable?: boolean;
    onClick?: (value: T) => void;
    onRemove?: (value: T) => void;
}

export function Tag<T extends string>(props: TagProps<T>) {
    const { 
        className,
        onClick,
        value,
        removable = false,
        onRemove } = props;
    return (
        <button 
            type='button'
            onClick={() => onClick?.(value)}
            className={classNames(cls.Tag, {}, [className])}
        >
            {value}
            {removable && <div className={cls.close} onClick={() => onRemove?.(value)}></div>}
        </button>
    );
}
