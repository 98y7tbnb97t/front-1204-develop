import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';
import { useLocation  } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import {translations} from "../../../utils/translations.tsx";

interface MenuItemProps {
    to: string,
    ico: string;
    closedmenu?: boolean;
    title?: string;
    setModal: (bool: boolean) => void;
    active?: boolean;
}

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({to, children, ico, closedmenu, title, setModal}) => {
    const location = useLocation();
    const { group } = useAppSelector(state=> state.GroupSlice);
    const { user } = useAppSelector(state=> state.UserSlice);
    const language = useAppSelector(state => state.TranslateSlice.language);


    const onClickLink = (): void => {
        group?.open ? setModal(true) : window.scrollTo(0,0)
    }

    const messengerText:string = translations.menu.messengerText[language]

    return (
        <li translate="no" title={title} className={[' notranslate border-x-[1px] md:border-x-2  flex align-middle justify-center', location.pathname === to ? 'bg-gradient-appricot': null,title ===messengerText ? 'hidden':"",title === messengerText ? 'absolute right-3 bottom-0 bg-gradient-menu':""].join(' ')}>
            <Link  to={(!group?.open || user.role === 'ADMIN') ? to : null}
                   onClick={onClickLink} className={['text-white hover:text-apricot transition-all text-lg max-2xl:text-base font-medium flex items-center', location.pathname === to ? '!text-apricot' : null].join(' ')}>
                <div className={["p-2 max-2xl:p-1", closedmenu ? '' : ''].join(' ')}>
                    <img className='w-16 md:w-20 aspect-square' src={ico}/>
                </div>
                {!closedmenu && children}
            </Link>
        </li>
    )
}

export default MenuItem;