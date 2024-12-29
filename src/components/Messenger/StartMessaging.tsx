import { FC } from 'react'
import { IoChatbubblesOutline } from '@react-icons/all-files/io5/IoChatbubblesOutline'
import {useAppSelector} from "../../hooks/redux.ts";
import {translations} from "../../utils/translations.tsx";

const StartMessaging: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    return (
        <div className='hidden sm:flex grow flex-col items-center justify-center w-full text-gray-800'>
            <div className="text-9xl mb-5"><IoChatbubblesOutline/></div>
            <p className='text-xl font-medium'>{translations.messenger.selectChatText[language]}</p>
        </div>
    )
}

export default StartMessaging;