import { FC, PropsWithChildren } from 'react'
import Sidebar from '../../components/Index/Sidebar/Sidebar';
import MenuMobile from "../Index/Sidebar/MenuMobile.tsx";

interface LayoutMainProps {
    closedmenu?: boolean;
}

const LayoutMain: FC<PropsWithChildren<LayoutMainProps>> = ({children, closedmenu}) => {
    return (
        <main className='realtive xl:flex h-screen'>
            <Sidebar closedmenu={closedmenu}/>
            {children}
            <div className='absolute xl:hidden bottom-0 w-full bg-gradient-silver'>
                <MenuMobile/>
            </div>
        </main>
    )
}

export default LayoutMain;