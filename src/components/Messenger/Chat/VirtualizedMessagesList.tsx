import { FC, useRef, useEffect, useCallback, useState } from 'react';
import { ListItem, Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { IMessage } from '../../../models/IMessage';
import classNames from 'classnames';
import Loader from '../../UI/Loader';
import { PayloadAction } from '@reduxjs/toolkit';
import { IgetMessages } from '../../../models/response/MessengerResponses';

interface VirtualizedMessagesListProps {
    messages: IMessage[];
    chatContainerRef: React.RefObject<HTMLDivElement>;
    renderMessage: (message: IMessage) => JSX.Element;
    firstNotReadedMessageRef: React.MutableRefObject<string | null>;
    isChatLoading: boolean;
    hasMoreMessages: boolean;
    onEndScroll: () =>Promise<PayloadAction<IgetMessages> | null>;
    chatId: string;
    messagesLimit: number;
    itemsRendered?: ((items: ListItem<IMessage>[]) => void)
}

const VirtualizedMessagesList: FC<VirtualizedMessagesListProps> = ({
    messages,
    chatContainerRef,
    renderMessage,
    firstNotReadedMessageRef,
    isChatLoading,
    hasMoreMessages,
    onEndScroll,
    chatId,
    messagesLimit,
    itemsRendered
}) => {
    const INITIAL_ITEM_COUNT = messagesLimit || 0;
    const virtuso = useRef<VirtuosoHandle>(null);
    const atBottomState = useRef<boolean | null>(null);
    const [firstItemIndex, setFirstItemIndex] = useState<number>(999999999999);
    const scrolledAlreadyRef = useRef<boolean>(false);

    const Header = () => (
        <div 
            className={classNames('flex justify-center mb-4 mt-2')}
        >
            {isChatLoading && <Loader />}
        </div>
    )

    const handleEndScroll = useCallback(async () => {
        if (firstItemIndex > 0 && hasMoreMessages) {
            const response = await onEndScroll();
            if (response?.payload) {
                setFirstItemIndex((prev) => prev-response.payload.messages.length);
            }
        }
    }, [onEndScroll, firstItemIndex, hasMoreMessages]);

    useEffect(() => {
        scrolledAlreadyRef.current = false;
        setFirstItemIndex(999999999999);
    }, [chatId, firstNotReadedMessageRef]);

    useEffect(() => {
        if (virtuso.current && atBottomState.current === true) {
            setTimeout(() => {
                virtuso.current?.scrollToIndex(messages.length)
            }, 100)
        }
    }, [INITIAL_ITEM_COUNT, messages.length, virtuso]);

    return (
        <Virtuoso
            initialTopMostItemIndex={{ index: INITIAL_ITEM_COUNT - 1, align: 'start', offset: 400 }}
            data={messages}
            style={{ height: chatContainerRef.current?.clientHeight }}
            itemContent={(_, message) => renderMessage(message)}
            startReached={() => void handleEndScroll()}
            components={{
                Header
            }}
            itemsRendered={itemsRendered}
            increaseViewportBy={window.innerHeight * 2}
            atBottomStateChange={(atBottom) => {
                atBottomState.current = atBottom;
                if (firstNotReadedMessageRef.current && atBottom && !scrolledAlreadyRef.current) {
                    const index = messages.findIndex(m => m._id === firstNotReadedMessageRef.current);
                    if (index !== -1) {
                        scrolledAlreadyRef.current = true;
                        virtuso.current?.scrollToIndex({ index, align: 'start'});
                    }
                }
            }}
            ref={virtuso}
            firstItemIndex={firstItemIndex}
        />
    );
};

export default VirtualizedMessagesList;