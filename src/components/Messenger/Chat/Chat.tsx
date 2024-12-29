import {FC, useEffect, useRef, useState} from 'react'
import TopInfo from './TopInfo';
import Message from './Message';
import EmptyChat from './EmptyChat';
import SendMessage from './SendMessage';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import MessageMenu from './Menus/MessageMenu/MessageMenu';
import {IContext} from '../../../models/IContext';
import AttachmentModal from '../../Modals/AttachmentModal';
import {setAttachmentModal} from '../../../store/reducers/MessengerSlice';
import GroupInfo from './GroupInfo/GroupInfo';
import ChatCall from '../Chats/Call/ChatCall';
import Data from './Data';
import format from 'date-fns/format';
import isThisWeek from 'date-fns/isThisWeek';
import isToday from 'date-fns/isToday';
import ru from 'date-fns/locale/ru';
import {translations} from "../../../utils/translations.tsx";
import {IMessage} from "../../../models/IMessage.ts";
import {getRequisites} from "../../../store/reducers/BalansSlice.ts";
import {getCurMsgRequisite, getRequisiteFullName} from "../../../utils/requisites.ts";
import MessageReaded from './MessageReaded.tsx';
import { IgetMessages } from '../../../models/response/MessengerResponses.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { isAppleDevice } from '../../../utils/getDeviceType';
import MessagesList from './MessagesList.tsx';
import VirtualizedMessagesList from './VirtualizedMessagesList.tsx';

interface ChatProps {
    onEndScroll: () => Promise<PayloadAction<IgetMessages> | null>;
}

const Chat: FC<ChatProps> = ({ onEndScroll }) => {
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.TranslateSlice.language)
    const {user} = useAppSelector(state => state.UserSlice)
    const {chat, messagesLimit, hasMoreMessages, isChatLoading} = useAppSelector(state => state.MessengerSlice)
    const requisites = useAppSelector(state => state.BalanceSlice.requisites)
    const {attachment, attachmentModal} = useAppSelector(state => state.MessengerSlice);
    const [info, setInfo] = useState<boolean>(false);
    const [callState, setCallState] = useState<boolean>(false);
    const [requisiteFilterId, setRequisiteFilterId] = useState<string>("");
    const [context, setContext] = useState<IContext>({
        active: false,
        x: 0,
        y: 0,
        message_id: '',
        message_text: '',
        isMe: false
    });
    const [unreadMsgsFiltered, setUnreadMsgsFiltered] = useState<boolean>(false)
    const [indUserChatId, setIndUserChatId] = useState<string>('')
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const firstNotReadedMessageRef = useRef<string | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const messagesRef = useRef<IMessage[] | null>(null);
    
    const {
        supportForTrainersText,
        supportForParentsText,
        newMessagesText
    } = translations.messenger

    const dirRoles = ['DIRECTOR', 'ZDIRECTOR', 'ADMIN']
    const isUserDirector = dirRoles.includes(user.role || "")
    const userMessages = chat.messages.filter(item => item?.from?.role && !dirRoles.includes(item.from.role))
    const dirMessages = chat.messages.filter(item => item?.from?.role && dirRoles.includes(item.from.role))
    const replyIds = dirMessages
        .filter(item => item.reply)
        .map(item => item?.reply?._id)
    const unreadMessages = userMessages.filter(item => !replyIds.includes(item._id))
    const techChats = [supportForTrainersText.ru, supportForParentsText.ru]
    const isTech = !!((techChats.includes(chat.user.name) || chat.requisite) && isUserDirector)
    
    useEffect(() => {
        if(!requisites || !requisites.length) {
            void dispatch(getRequisites())
        }
    }, [dispatch, requisites]);

    messagesRef.current = chat.messages
    const curIndUser = indUserChatId && chat.users ? chat.users.find(item => item._id === indUserChatId) : undefined

    if (indUserChatId) {
        messagesRef.current = messagesRef.current.filter(item => (
            item.from?._id === indUserChatId ||
            item.to === indUserChatId ||
            (curIndUser && item.msg.startsWith(`@${curIndUser.email}`))
        ))
    }

    if(firstNotReadedMessageRef.current === null) {
        const firstUnreadedId = chat.messages.find(m => !m.readed?.includes(user._id))?._id;
        if (firstUnreadedId) {
            firstNotReadedMessageRef.current = firstUnreadedId;
        }
    }

    useEffect(() => {
        firstNotReadedMessageRef.current = null;
    }, [user._id]);

    if(requisiteFilterId) {
        const curRequisiteFilter = requisiteFilterId && requisites.find(item => item._id === requisiteFilterId)

        if(curRequisiteFilter) {
            messagesRef.current = messagesRef.current
                .map(item => ({
                    ...item,
                    requisite: getCurMsgRequisite(messagesRef.current || [], item)
                })).filter(item => item.requisite === `(${getRequisiteFullName(curRequisiteFilter)})` && item.type !== 'system')
        }
    }

    if(unreadMsgsFiltered) {
        const userMessages = messagesRef.current.filter(item => item?.from?.role && !dirRoles.includes(item.from.role))
        const unreadMessages = userMessages.filter(item => !replyIds.includes(item._id))
        messagesRef.current = unreadMessages
    }

    const dateGroups = useRef<Date[]>([]);
    dateGroups.current = [];

    useEffect(() => {
        if (!unreadMessages.length && unreadMsgsFiltered) setUnreadMsgsFiltered(false)
    }, [chat.messages, unreadMessages.length, unreadMsgsFiltered]);

    const setM = (bool: boolean) => {
        dispatch(setAttachmentModal({modal: bool, attachment: {}}));
    }

    const isUnansvered = (msg: IMessage): boolean => {
        return (
            isTech &&
            !!(unreadMessages.find(item => item._id === msg._id))
        )
    }

    const clearIndUserChatId = () => {
        if (indUserChatId) setIndUserChatId('')
    }

    const onReplyClick = (msg: IMessage) => {
        const messageElement = document.querySelector(`[data-message-id="${msg._id}"]`);
        if (messageElement && chatContainerRef.current) {
            const containerRect = chatContainerRef.current.getBoundingClientRect();
            const messageRect = messageElement.getBoundingClientRect();
            chatContainerRef.current.scrollTop += messageRect.top - containerRect.top - 150;
        }
    }

    const renderMessage = (message: IMessage) => (
        <div className='pb-2' key={message._id} data-message-id={message._id}>
            {
                firstNotReadedMessageRef.current === message._id &&
                <div className='text-center mb-2 py-1 bg-black/15'>
                    {newMessagesText[language]}
                </div>
            }
            <div style={{height: 40}}>
            {
                showDate(message.time) &&
                <Data data={isThisWeek(new Date(message.time)) ? 
                    isToday(new Date(message.time)) ? 'сегодня' : format(new Date(message.time), 'EEEE', {locale: ru}) :
                    format(new Date(message.time), 'dd.MM.Y')}
                />
            }
            </div>
            <MessageReaded myId={user._id} msg={message}>
                <Message
                    msg={message}
                    user={message.from?._id === user._id ? user : chat.user}
                    isMe={message.from?._id === user._id}
                    setContext={setContext}
                    isUnansvered={isUnansvered(message)}
                    setIndUserChatId={setIndUserChatId}
                    isTech={isTech}
                    users={chat.users}
                    onReplyClick={onReplyClick}
                />
            </MessageReaded>
        </div>
    )

    const showDate = (time: Date) => {
        if (!dateGroups.current.some(d => format(d, 'dd.MM.Y') === format(new Date(time), 'dd.MM.Y'))) {
            dateGroups.current.push(new Date(time));
            return true;
        }
        return false;
    }

    return (
        <>
            <div className='h-full w-full bg-gray-300 bg-chat-pattern flex flex-col'>
                <TopInfo
                    setCallActive={setCallState}
                    setInfo={setInfo}
                    data={chat.user}
                    setUnreadMsgsFiltered={setUnreadMsgsFiltered}
                    unreadMsgsFiltered={unreadMsgsFiltered}
                    unreadMsgsCount={unreadMessages.length}
                    isTech={isTech}
                    curIndUser={curIndUser}
                    setIndUserChatId={setIndUserChatId}
                    clearIndUserChatId={clearIndUserChatId}
                    requisiteFilterId={requisiteFilterId}
                    setRequisiteFilterId={setRequisiteFilterId}
                />
                <div
                    ref={chatContainerRef}
                    className={['flex-grow custom-scroll overflow-x-hidden', context.active ? 'overflow-y-hidden' : 'overflow-y-auto'].join(' ')}>
                    <div
                        ref={rootRef}
                        className={['w-full flex flex-col mx-auto max-w-[1350px]', chat.messages.length > 0 ? '' : 'h-full justify-center'].join(' ')}>
                        
                        {chat.messages.length > 0 ? (
                            isAppleDevice() ? (
                                <MessagesList
                                    messages={messagesRef.current}
                                    renderMessage={renderMessage}
                                    hasMoreMessages={hasMoreMessages}
                                    chatContainerRef={chatContainerRef}
                                    chatId={chat._id}
                                    onEndScroll={onEndScroll}
                                    firstNotReadedMessageRef={firstNotReadedMessageRef}
                                    onScroll={() => {
                                        dateGroups.current = [];
                                    }}
                                />
                            ) : (
                                <VirtualizedMessagesList
                                    messages={messagesRef.current}
                                    chatContainerRef={chatContainerRef}
                                    renderMessage={renderMessage}
                                    firstNotReadedMessageRef={firstNotReadedMessageRef}
                                    isChatLoading={isChatLoading}
                                    chatId={chat._id}
                                    onEndScroll={onEndScroll}
                                    hasMoreMessages={hasMoreMessages}
                                    messagesLimit={messagesLimit}
                                    itemsRendered={() => {
                                        dateGroups.current = [];
                                    }}
                                />
                            )
                        ) : (
                            <>{!isChatLoading && <EmptyChat/>}</>
                        )}
                        <MessageMenu context={context} setContext={setContext}/>
                    </div>
                </div>
                <AttachmentModal modal={attachmentModal} setModal={setM} attachment={attachment}/>
                <SendMessage
                    indUserEmail={curIndUser?.email || null}
                    clearIndUserChatId={clearIndUserChatId}
                    onReplyClick={onReplyClick}
                />
            </div>
            <GroupInfo active={info} setActive={setInfo}/>
            {user._id &&
                <ChatCall setActive={setCallState} active={callState} roomid={user._id} username={user.name}
                          email={user.email}/>
            }
        </>
    )
}

export default Chat;