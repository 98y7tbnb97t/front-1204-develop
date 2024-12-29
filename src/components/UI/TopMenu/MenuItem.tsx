import { FC } from 'react';
import { ITopMenu } from '../../../models/ITopMenu';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  item: ITopMenu;
  className?: string;
  onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ item, className, onClick }) => {
  return (
    <>
      {item.path ? (
        <Link
          to={item.path}
          className={[
            'bg-gradient-top-menu-item text-[#353535] flex items-center justify-center text-xl py-1 lg:py-2 px-2  rounded-full font-bold lg:whitespace-pre-wrap text-center',
            className,
          ].join(' ')}
        >
          {item.name}
        </Link>
      ) : (
        <div
          onClick={onClick}
          className={[
            'bg-gradient-top-menu-item text-[#353535] flex items-center justify-center text-md text-[12px] sm:text-xl md:text-base py-2 lg:py-2 px-1 md:px-3  rounded-full font-bold xl:whitespace-pre-wrap text-center',
            className,
          ].join(' ')}
        >
          {item.name}
        </div>
      )}
    </>
  );
};

export default MenuItem;
