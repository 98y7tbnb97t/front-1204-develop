import { FC, PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux.ts';

import { isDeviceMobile } from '../../../../utils/getDeviceType.ts';
import {
  ITranslateItemString,
  translations,
} from '../../../../utils/translations.tsx';
import './MenuItemMobileAdaptive.css';

interface MenuItemProps {
  to: string;
  ico: string;
  closedmenu?: boolean;
  title?: string;
  setModal: (bool: boolean) => void;
  active?: boolean;
}

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({
  to,
  children,
  ico,
  closedmenu,
  title,
  setModal,
}) => {
  const location = useLocation();
  const { group } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const onClickLink = (): void => {
    group?.open ? setModal(true) : window.scrollTo(0, 0);
  };

  const {
    lessonsText,
    messengerText,
  }: {
    lessonsText: ITranslateItemString;
    messengerText: ITranslateItemString;
  } = translations.menu;

  return (
    <li
      translate="no"
      title={title}
      className={[
        'relative notranslate border-x-[1px] h-14 flex-1 flex align-middle justify-center',
        location.pathname === to ? 'bg-gradient-appricot' : null,
        title === lessonsText[language] && isDeviceMobile() ? 'hidden' : '',
        title === messengerText[language] ? '' : '',
      ].join(' ')}
    >
      <Link
        disabled={true}
        to={!group?.open || user.role === 'ADMIN' ? to : null}
        onClick={onClickLink}
        className={[
          'text-white hover:text-apricot transition-all text-lg max-2xl:text-base font-medium flex items-center',
          location.pathname === to ? '!text-apricot' : null,
        ].join(' ')}
      >
        <div className="h-full flex justify-center flex-col items-center">
          <img className="h-full item-img" src={ico} />
          <span className="item-text">{title}</span>
        </div>
        {!closedmenu && children}
      </Link>
    </li>
  );
};

export default MenuItem;
