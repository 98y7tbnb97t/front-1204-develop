import { FC } from 'react';
import Logo from '../../../assets/logo_sm_white.png';
import Logo2 from '../../../assets/logo2.png';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Sidebar: FC = () => {
    
    return (
        <aside className='w-full justify-between sm:gap-0 items-center  sm:w-20 bg-gray-900 sm:py-7 px-2 flex sm:flex-col'>
            <Link to='/'><img className='hidden sm:block xl:w-14 sm:mb-8' src={Logo} alt="logo"/></Link>
            <Link to='/'><img className='h-14 sm:h-20 sm:hidden' src={Logo2} alt="logo"/></Link>
            <Menu/>
        </aside>
    )
}

export default Sidebar;