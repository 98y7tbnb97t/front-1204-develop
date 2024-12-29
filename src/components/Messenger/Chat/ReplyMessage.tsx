import {FC, MouseEventHandler} from 'react'
import { ImCross } from "@react-icons/all-files/im/ImCross";
import { IMessage } from '../../../models/IMessage';
import Attachment from './Attachments/Attachment';
import { useAppDispatch } from '../../../hooks/redux';
import { setBlinkMessage} from '../../../store/reducers/MessengerSlice';

interface ReplyMessageProps {
    msg: IMessage;
    onReplyClick?: (msg: IMessage) => void
    isInInput?: boolean,
    onCancel?: () => void,
}

const ReplyMessage: FC<ReplyMessageProps> = ({msg,isInInput,onCancel, onReplyClick}) => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        onReplyClick?.(msg)
        dispatch(setBlinkMessage(msg._id));
        setTimeout(() => {
            dispatch(setBlinkMessage(''))
        }, 1000)
    }

    const onCancelReplying:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        if(onCancel) onCancel()
    }

    return (
        <div onClick={clickHandler} className='cursor-pointer relative border-l-4 border-[#FFAE7A] px-2 py-3 rounded-sm overflow-hidden mb-2'>
            <div className="relative z-10">
                {msg?.attachments.length > 0 &&
                    <Attachment attachment={msg.attachments[0]}/>
                }
                {msg.type === 'text' &&
                    <p className={`text-xs break-all ${isInInput ? 'pr-[30px]' : ""}`}>{msg.msg}</p>
                }
                {msg.type === 'audio' &&
                    <p className='text-xs'>Audio message</p>
                }
                {
                    isInInput &&
                    <button onClick={onCancelReplying} className=" bg-transparent text-red-600 absolute right-[5px] top-[50%] translate-y-[-50%]">
                        <ImCross/>
                    </button>
                }
            </div>
            <div className="bg-gray-300 opacity-40 w-full h-full absolute top-0 left-0 z-0"></div>
        </div>
    )
}

export default ReplyMessage;