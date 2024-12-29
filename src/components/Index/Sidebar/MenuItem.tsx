import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom';
import { useLocation  } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';

interface MenuItemProps {
    to: string,
    ico: string | React.ReactNode;
    closedmenu?: boolean;
    title?: string;
    setModal: (bool: boolean) => void;
    diabled?: boolean;
}

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({to, children, ico, closedmenu, title, setModal,diabled}) => {
    const { group } = useAppSelector(state=> state.GroupSlice);
    const { user } = useAppSelector(state=> state.UserSlice);
    const location = useLocation();
    

    return (
        <li translate="no" title={title} className={['border-b-white notranslate border-b-2', location.pathname === to ? 'relative before:bg-apricot before:absolute before:w-[5px] before:h-full before:block before:top-0 before:-left-5': null].join(' ')}>
            <Link
                to={!diabled && (!group?.open || user.role === 'ADMIN') ? to : null}
                {...(group?.open && { onClick: ()=> void setModal(true) })}
                className={['items-stretch text-white hover:text-apricot transition-all text-lg  font-medium flex ', location.pathname === to ? '!text-apricot' : null].join(' ')}
            >
                <div className={["p-1", closedmenu ? 'mx-auto' : 'mr-2 items-center min-w-[42px] flex border-r-white border-r-2'].join(' ')}>
                    {typeof ico === 'string' ? <img className='w-8' src={ico}/> : ico}
                </div> <span className='self-center flex'>{!closedmenu && children}</span>
            </Link>
        </li>
    )
}

export default MenuItem;