import {useAppSelector} from "../../../hooks/redux.ts";
import {FC, useState} from "react";
import {isUserDirector} from "../../../utils/userRoles.ts";
import {translations} from "../../../utils/translations.tsx";

interface TopInfoUserSeacrh {
    setIndUser: (e: React.MouseEvent<HTMLButtonElement>,id:string) => void
}

const {
    searchText
} = translations.messenger

const TopInfoUserSearch:FC<TopInfoUserSeacrh> = ({setIndUser}) =>  {
    const chat = useAppSelector(state => state.MessengerSlice.chat)
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [searchValue,setSearchValue] = useState<string>("")


    return (
        <div className={'absolute flex flex-col items-start -bottom-[8px] right-0 bg-gray-300 rounded-[20px] py-2 translate-y-[100%] z-[2] w-[300px] max-w-screen'}>
            <div className={'px-2 w-full mb-2'}>
            <input
                type="text"
                className={'w-full bg-white border-0 rounded-[4px] px-2 py-1 '}
                placeholder={searchText[language]}
                onChange={e => setSearchValue(e.target.value)}
                value={searchValue}
            />
            </div>
            <div className={'flex flex-col w-full border-t-[1px] border-black'}>
                {
                    chat?.users &&
                    chat?.users
                        .filter(item => (
                            !isUserDirector(item.role) &&
                            (!searchValue || item.name.toLowerCase().startsWith(searchValue.toLowerCase()) || item.name.toLowerCase().startsWith(searchValue.toLowerCase()))
                        ))
                        .map(item => (
                            <button
                                key={item._id}
                                className={'w-full p-2 border-b-[1px] border-gray-400 text-left hover:bg-blue-300'}
                                onClick={(e) => setIndUser(e,item._id)}
                            >
                                {item.name} {item.sname}
                            </button>
                        ))
                }

            </div>
        </div>
    );
}

export default TopInfoUserSearch;