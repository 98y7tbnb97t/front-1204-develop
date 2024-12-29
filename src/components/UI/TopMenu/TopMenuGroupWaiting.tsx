import { ChangeEvent, FC } from 'react'
import { ITopMenu } from '../../../models/ITopMenu';
import MenuItem from './MenuItem';
import { useAppSelector } from '../../../hooks/redux';

import "./TopMenu.css"
import {useLocation, useParams} from "react-router-dom";
import Input from '../Main/Input';
import { ITranslateItemString, translations } from '../../../utils/translations';
import debounce from 'lodash.debounce';
interface TopMenuGroupWaitingProps {
    menu?: ITopMenu[];
    className?: string;
    fetchData: (search?: string) => Promise<void>;
}

const TopMenuGroupWaiting: FC<TopMenuGroupWaitingProps> = ({menu, className, fetchData}) => {
    const location = useLocation()
    const params = useParams()
    const {user} = useAppSelector(state=> state.UserSlice);
    const language = useAppSelector((state) => state.TranslateSlice.language);
    const isStudentLesson = location.pathname.includes('lesson') && params.groupId && user?.role === "STUDENT"

    const SearchDebounce = debounce((e: string) => {
      void fetchData(e);
    }, 1000);

    const {
      searchText,
    }: {
      searchText: ITranslateItemString;
    } = translations.messenger;
    
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
                <Input
                  className=""
                  onChange={(e: ChangeEvent<HTMLInputElement>) => void SearchDebounce(e.target.value)}
                  type="text"
                  placeholder={searchText[language]}
                />
            </div>
        </>

    )
}

export default TopMenuGroupWaiting;