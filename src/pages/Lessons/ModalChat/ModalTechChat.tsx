import { FC, useEffect, useState, useRef } from 'react'
import {useAppSelector } from '../../../hooks/redux';
import Message from './Message';
import {VscSend} from '@react-icons/all-files/vsc/VscSend'
import DialogService from '../../../services/DialogService';
import { IgetChat } from '../../../models/response/MessengerResponses';
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";

const ModalTechChat: FC = () => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const {group} = useAppSelector(state=> state.GroupSlice);
    const [chat, setChat] = useState<IgetChat>();
    const [msg, setMsg] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(group?.dialog_id) {
            const fetchData = async()=> {
                await DialogService.getChat('651c1e9fbfbc95c1f9d7f8b8').then(response => response && setChat(response.data)).catch(console.error)
                await DialogService.getMessages('651c1e9fbfbc95c1f9d7f8b8', 0).then(response => response && setChat(prev => ({...prev, messages: response.data.messages.reverse()} as IgetChat))).catch(console.error)
            }
            void fetchData();
        }
    }, [group?.dialog_id])


    useEffect(() => {
        if(chat?.messages?.length && messagesContainerRef.current !== null && !messagesContainerRef.current.scrollTop) {
            if(messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
            }
        }
    }, [chat]);

    const sendMessageHandler = async () => {
        
        if(msg.length > 0 && group?.dialog_id) {

            await DialogService.sendMessage(msg, '651c1e9fbfbc95c1f9d7f8b8', undefined, [], null).then(response=>{
                const temp = chat;
                temp?.messages.push(response.data.message)
                setChat(temp);
                const scrollToMyRef = () => {
                    if(messagesEndRef.current) {
                        messagesEndRef.current.scrollIntoView();
                    }
                }

                setTimeout(scrollToMyRef, 200);
            });
            
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

    const {
        enterMessageText,
        supportForTrainersText,
        supportForParentsText
    }: {
        enterMessageText: ITranslateItemString,
        supportForTrainersText: ITranslateItemString,
        supportForParentsText: ITranslateItemString
    } = translations.messenger
    const {
        technicalSupportChatText
    }: {
        technicalSupportChatText: ITranslateItemString
    } = translations.lessons


    let chatName = chat?.user?.name

    switch (chatName) {
        case supportForParentsText.ru: {
            chatName = supportForParentsText[language];
            break;
        }
        case supportForTrainersText.ru: {
            chatName = supportForTrainersText[language];
            break;
        }
    }
    
    return (
        <div className='flex flex-col flex-1 h-full'>
            <p className='text-red-500 text-xl font-bold mb-2 text-center'>{technicalSupportChatText[language]}</p>
            <div className="flex-1 flex flex-col gap-3  rounded-lg overflow-hidden bg-gray-200 shadow-xl 2xl:w-[550px] h-[300px] pb-4 lg:mr-5">
                <div className="flex items-center border-b-gray-600 border-b-2 px-4 pt-2 pb-2 shadow-2xl shadow-white bg-gray-300">
                    <img className='mr-4 w-12 rounded-full overflow-hidden' src={chat?.user?.avatar} alt="avatar" />
                    <h2 className="text-lg">{chatName}</h2>
                </div>
                <div className="px-4 mt-5 flex-grow overflow-auto h-[100px]" ref={messagesContainerRef}>
                    {chat?.messages?.map(message=>
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

export default ModalTechChat;