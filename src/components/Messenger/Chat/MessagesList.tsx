import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { IMessage } from '../../../models/IMessage';
import Loader from '../../UI/Loader';
import { PayloadAction } from '@reduxjs/toolkit';
import { IgetMessages } from '../../../models/response/MessengerResponses';

interface MessagesListProps {
    messages: IMessage[];
    renderMessage: (message: IMessage) => JSX.Element;
    hasMoreMessages: boolean;
    chatContainerRef: React.RefObject<HTMLDivElement>;
    chatId: string;
    onEndScroll: () =>Promise<PayloadAction<IgetMessages> | null>;
    firstNotReadedMessageRef: React.MutableRefObject<string | null>;
    onScroll: (e: Event) => void;
}

const MessagesList: FC<MessagesListProps> = ({ 
    messages, 
    renderMessage, 
    hasMoreMessages, 
    chatContainerRef, 
    chatId, 
    onEndScroll, 
    firstNotReadedMessageRef,
    onScroll
}) => {
    const [isFirstEnter, setIsFirstEnter] = useState(true);
    const lastTopMessageRef = useRef<IMessage | null>(null);

    useEffect(() => {
        setIsFirstEnter(true);
    }, [chatId]);

    const handleEndScroll = useCallback(async () => {
        if (chatContainerRef.current && hasMoreMessages) {
            lastTopMessageRef.current = messages[0];
            const response = await onEndScroll();
            if (response?.payload) {
                setTimeout(() => {
                    if (lastTopMessageRef.current && chatContainerRef.current) {
                        const newTopMessage = chatContainerRef.current.querySelector(`[data-message-id="${lastTopMessageRef.current._id}"]`);
                        if (newTopMessage) {
                            const newScrollPosition = newTopMessage.getBoundingClientRect().top + chatContainerRef.current.scrollTop - chatContainerRef.current.getBoundingClientRect().top;
                            chatContainerRef.current.scrollTop = newScrollPosition;
                        }
                    }
                }, 0);
            }
        }
    }, [chatContainerRef, hasMoreMessages, messages, onEndScroll]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            const handleScroll = (e: Event) => {
                onScroll(e);
                if (chatContainer.scrollTop === 0) {
                    void handleEndScroll();
                }
            };
            chatContainer.addEventListener('scroll', handleScroll);
            return () => chatContainer.removeEventListener('scroll', handleScroll);
        }
    }, [chatContainerRef, handleEndScroll, onScroll]);

    useEffect(() => {
        if (messages.length > 0 && isFirstEnter) {
            setTimeout(() => {  
                if (chatContainerRef.current) {
                    if (firstNotReadedMessageRef.current) {
                        const firstUnreadMessage = chatContainerRef.current.querySelector(`[data-message-id="${firstNotReadedMessageRef.current}"]`);
                        if (firstUnreadMessage) {
                            firstUnreadMessage.scrollIntoView({ behavior: 'instant', block: 'start' });
                        }
                    } else {
                        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                    }
                }
                setIsFirstEnter(false);
            }, 0)
        }
    }, [chatId, messages.length, isFirstEnter, chatContainerRef, firstNotReadedMessageRef]);

    useEffect(() => {
        setTimeout(() => {
            if (chatContainerRef.current) {
                const { scrollHeight, clientHeight, scrollTop  } = chatContainerRef.current;
                const distanceFromBottom = scrollHeight - clientHeight - scrollTop;
                if (distanceFromBottom < 500) {
                    chatContainerRef.current.scrollTop = scrollHeight - clientHeight + 100;
                }
            }
        }, 100)
    }, [chatContainerRef, messages.length]);

    return (
        <div>
            {hasMoreMessages && <div className='flex justify-center mb-2 mt-2'><Loader /></div>}
            {messages.map(renderMessage)}
        </div>
    );
};

export default MessagesList