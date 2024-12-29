import {FC, useEffect, useState, useRef} from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getChat, getMessages } from '../../../store/reducers/MessengerSlice';
import Message from './Message';
import {VscSend} from '@react-icons/all-files/vsc/VscSend'
import { sendMessage } from '../../../store/reducers/MessengerSlice';
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";

const ModalChat: FC<{className?: string,contentHeight?: number}> = ({className,contentHeight}) => {
    const dispatch = useAppDispatch();
    const {group} = useAppSelector(state=> state.GroupSlice);
    const {chat} = useAppSelector(state=> state.MessengerSlice);
    const [msg, setMsg] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        enterMessageText
    }: {
        enterMessageText: ITranslateItemString
    } = translations.messenger

    const {
        yourGroupChatText
    } : {
        yourGroupChatText: ITranslateItemString
    } = translations.groups

    useEffect(() => {
        if(group?.dialog_id) {
            const fetchData = async()=> {
                await dispatch(getChat(group?.dialog_id));
                await dispatch(getMessages({id: group?.dialog_id, noLimit: true}));
            }
            void fetchData();
        }
    }, [dispatch, group?.dialog_id])

    useEffect(() => {
        if(chat.messages.length && messagesContainerRef?.current !== null && !messagesContainerRef?.current.scrollTop) {
            if(messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
            }
        }
    }, [chat]);


    const sendMessageHandler = async () => {
        
        if(msg.length > 0 && group?.dialog_id) {

            await dispatch(sendMessage({msg, userid: group?.dialog_id, fileList: [], audio: undefined, reply: null}));

            // GroupSendMessageSocket({room: groupId, msg: {id: (Date.now() + Math.random()).toString(), name: user.name, sname: user.sname, msg: message}})
            setMsg('');
            if(messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView();
            }
        }
    }

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            void sendMessageHandler();
        }
    }


    return (
        <div className='flex flex-col flex-1 h-full'>
            <p className='text-red-500 text-xl font-bold mb-2 text-center'>{yourGroupChatText[language]}</p>
            <div className={["flex-1 flex flex-col h-[300px]  rounded-lg overflow-hidden bg-gray-200 shadow-xl 2xl:w-[550px]  pb-4", className].join(' ')}>
                <div className="flex items-center border-b-gray-600 border-b-2 px-4 pt-2 pb-2 shadow-2xl shadow-white bg-gray-300">
                    <img className='mr-4 w-12' src={chat.user.avatar} alt="avatar" />
                    <h2 className="text-lg">{chat.user.name}</h2>
                </div>
                <div className={`px-4 mt-5 flex-grow overflow-auto h-[${contentHeight || 100}px]`} ref={messagesContainerRef}>
                    {chat.messages.map(message=>
                        message.type !== 'system' &&
                        <Message message={message} key={message._id}/>
                    )}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="px-3">
                    <div className="flex items-center border-2 border-[#CCC] rounded-full justify-between py-1 px-4 mt-3">
                        <input onKeyDown={e=> onKeyDownHandler(e)} type="text" placeholder={enterMessageText[language]} className='w-full bg-transparent focus:outline-none'  value={msg} onChange={e=> setMsg(e.target.value)}/>
                        <div onClick={void sendMessageHandler} className="cursor-pointer"><VscSend/></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModalChat;