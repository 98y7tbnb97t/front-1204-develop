import { FC } from 'react'
import Title from '../../UI/Title';
import { useAppSelector } from '../../../hooks/redux';
import ChatMain from "./ChatMain.tsx";
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";

const Chat: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        chatText
    }: {
        chatText: ITranslateItemString
    } = translations.lessons

    return (
        <div className='flex flex-col h-full'>
            <Title name={chatText[language]} className='py-[10px]'/>
            <div className="border-2 border-[#CCC]  p-2 2xl:p-5 rounded-b-2xl border-t-0 flex flex-col h-[calc(100%-50px)]">
                <ChatMain/>
            </div>
        </div>
    )
}

export default Chat;