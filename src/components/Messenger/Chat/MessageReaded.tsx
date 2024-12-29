import { ReactElement, useRef, FC, memo } from 'react';
import { useEndScroll } from '../../../hooks/useEndScroll';
import { IMessage } from '../../../models/IMessage';
import { useAppDispatch } from '../../../hooks/redux';
import { setMessageReaded } from '../../../store/reducers/MessengerSlice';

interface MessageReadedHocProps {
    myId: string;
    msg: IMessage;
    children: ReactElement;
}

const MessageReaded: FC<MessageReadedHocProps> = memo(({ myId, children, msg }) => {
        const eleRef = useRef<HTMLDivElement>(null);
        const readedRef = useRef<boolean>(false);
        const dispatch = useAppDispatch();
        const onIntersect = () => {
            if (!readedRef.current) {
                if (msg.readed?.includes(myId)) {
                    readedRef.current = true;
                }
                if (msg.from?._id !== myId && !readedRef.current) {
                    readedRef.current = true;
                    dispatch(setMessageReaded({ msgId: msg._id, userid: myId }));
                }
            }
        };
        useEndScroll({
            targetRef: eleRef, 
            rootRef: undefined,
            onIntersect: onIntersect,
            delay: 40
        });
        return (
            <div className='wrapper' ref={eleRef}>
                {children}
            </div>
        )
        
})

export default MessageReaded;