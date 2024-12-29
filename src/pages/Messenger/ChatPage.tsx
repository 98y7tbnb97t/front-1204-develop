import React, { FC, useEffect, Suspense } from 'react'
import Chats from '../../components/Messenger/Chats/Chats';
const Chat =  React.lazy(() => import('../../components/Messenger/Chat/Chat')) ;
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getChat, getMessages } from '../../store/reducers/MessengerSlice';
import { useParams } from "react-router-dom";
import { socket } from '../../sockets/socket';
import { ChatRoomSocket, ChatRoomDisconnectSocket } from '../../sockets/MessengerSockets';
import { setReplyMessage, setEditMessage, setMessagesOffset, clearChat } from '../../store/reducers/MessengerSlice';
import { ServerError } from '../../models/response/ServerError';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/UI/Loader';
import { IgetMessages } from '../../models/response/MessengerResponses';
import { PayloadAction } from '@reduxjs/toolkit';
import StartMessaging from '../../components/Messenger/StartMessaging';

const ChatPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userid } = useParams();
    const user = useAppSelector(state => state.UserSlice.user);
    const { isChatLoading, hasMoreMessages, messagesOffset, messagesLimit, isStartMessaging } = useAppSelector(state => state.MessengerSlice);
    
    const getDialog = async () => {
        if(userid) {
            dispatch(clearChat());
            const response = await dispatch(getChat(userid));
            await dispatch(getMessages({id: userid}));
            const err = response.payload as ServerError
            if(err.error) {
                navigate('/messenger');
            }
        }
    };

    const onEndScroll = async () => {
        if (hasMoreMessages && !isChatLoading) {
            dispatch(setMessagesOffset(messagesOffset + messagesLimit));
            if (userid) {
                return await dispatch(getMessages({id: userid})) as unknown as Promise<PayloadAction<IgetMessages>>;
            }
        }
        return null;
    };

    useEffect(() => {
        void getDialog();
        return () => {
            if(userid) {
                ChatRoomDisconnectSocket(userid);
            }
            dispatch(setReplyMessage(null));
            dispatch(setEditMessage(null));
        }
    }, [userid]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(userid) {
            ChatRoomSocket(userid, user._id);
        }
    }, [userid, socket, user._id])  // eslint-disable-line react-hooks/exhaustive-deps
    

    return (
        <>
            <div className={ isStartMessaging && 'hidden sm:block'}>
                <Chats/>
            </div>
           { isStartMessaging
             ? <Suspense fallback={<Loader />}>
                 <Chat onEndScroll={onEndScroll}/>
                </Suspense>
             : <StartMessaging/>
           }
        </>
    )
}

export default ChatPage;
