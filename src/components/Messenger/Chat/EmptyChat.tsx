import {FC} from 'react'
import { IoChatbubblesOutline } from '@react-icons/all-files/io5/IoChatbubblesOutline'
import {useAppSelector} from "../../../hooks/redux.ts";
import {translations} from "../../../utils/translations.tsx";

const EmptyChat: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)



    return (
        <div className='flex flex-col items-center justify-center w-full text-gray-800'>
            <div className="text-9xl mb-5"><IoChatbubblesOutline/></div>
            <p className='text-xl font-medium'>{translations.messenger.emptyDialogText[language]}</p>
        </div>
    )
}

export default EmptyChat;