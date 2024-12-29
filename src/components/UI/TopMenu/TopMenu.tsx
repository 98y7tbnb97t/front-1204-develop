import { FC } from 'react'
import { ITopMenu } from '../../../models/ITopMenu';
import MenuItem from './MenuItem';
import { useAppSelector } from '../../../hooks/redux';

import "./TopMenu.css"
import {useLocation, useParams} from "react-router-dom";
interface TopMenuProps {
    menu?: ITopMenu[];
    className?: string;

}

const TopMenu: FC<TopMenuProps> = ({menu,className}) => {
    const location = useLocation()
    const params = useParams()
    const {user} = useAppSelector(state=> state.UserSlice);
    const isStudentLesson = location.pathname.includes('lesson') && params.groupId && user?.role === "STUDENT"

    return (
        <>
            <div
                className={`${isStudentLesson ? 'hidden' : ""}  grow bg-[#2c2c2c] flex  w-full sm:gap-3 gap-[4px] lg:gap-0 flex-row sm:p-5 p-[10px] relative justify-between ${className as string}`}
            >
                {menu &&
                    menu.map(item=>{
                        return (
                            !item.dropdown &&
                            !item.scope
                                ?
                                <MenuItem key={item.id} item={item} className={item.excludeMob?.includes(user?.role as string) ? "menuItem-mob" : ""}/>
                                :
                                item.scope?.includes(user?.role as string) &&
                                <MenuItem key={item.id} item={item} className={item.excludeMob?.includes(user?.role as string) ? "menuItem-mob" : ""}/>
                        )
                        }
                    )
                }
            </div>
        </>

    )
}

export default TopMenu;