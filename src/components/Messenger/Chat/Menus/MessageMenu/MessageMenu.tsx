import { FC, useRef, useEffect } from 'react'
import { MdOutlineEdit } from '@react-icons/all-files/md/MdOutlineEdit'
import { BsArrow90DegLeft } from '@react-icons/all-files/bs/BsArrow90DegLeft'
import { MdContentCopy } from '@react-icons/all-files/md/MdContentCopy'
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete'
import MenuItem from './MenuItem';
import { IContext } from '../../../../../models/IContext'
import { clickOuter } from '../../../../../utils/clickOuter'
import copy from 'copy-to-clipboard';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { setReplyMessage, setEditMessage, deleteMessage } from '../../../../../store/reducers/MessengerSlice'
import { useParams } from 'react-router-dom'
import {translations} from "../../../../../utils/translations.tsx";

interface MessageMenuProps {
    context: IContext;
    setContext: (obj: IContext) => void;
}

const MessageMenu: FC<MessageMenuProps> = ({ context, setContext }) => {
    const { userid } = useParams();
    const { user } = useAppSelector(state => state.UserSlice);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.TranslateSlice.language)


    const {
        deleteText,
        answerText,
        editText,
        copyText,
    } = translations.messenger

    useEffect(() => {
        if(menuRef.current) {
            return clickOuter(menuRef.current, ()=>setContext({...context, active: false}));
        }
    }, [context, setContext]);

    const copyHandler = () => {
        copy(context.message_text);
        setContext({...context, active: false})
    }

    const replyHandler = () => {
        const textReply = document.getElementById("textReply");
        textReply?.focus();
        dispatch(setReplyMessage(context.message_id))
        setContext({...context, active: false})
    }

    const editMessageHandler = () => {
        dispatch(setEditMessage(context.message_id))
        setContext({...context, active: false})
    }

    const deleteMessageHandler = async() => {
        if(userid) {
            await dispatch(deleteMessage({msg_id:context.message_id, dialog_id: userid}));
        }
        setContext({...context, active: false})
    }
    const left = context.isMe
        ? context.x - 50
        : context.x + 50

    return (
        <>
                <div
                    ref={menuRef}
                    style={{left: left, top: context.y}}
                    className={[
                    'z-10 bg-gray-800 rounded-sm h-auto fixed',
                    context.y < 280 ? '' : '-translate-y-full',
                        context.active ? "visible" : "invisible"
                ].join(' ')}>
                    <ul className='flex flex-col'>
                        <MenuItem onClick={replyHandler} icon={<BsArrow90DegLeft/>}>{answerText[language]}</MenuItem>
                        {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                            <MenuItem onClick={editMessageHandler} icon={<MdOutlineEdit/>}>{editText[language]}</MenuItem>
                        }
                        {/*<MenuItem icon={<BsArrow90DegRight/>}>Resend</MenuItem>*/}
                        <MenuItem onClick={copyHandler} icon={<MdContentCopy/>}>{copyText[language]}</MenuItem>
                        {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                            <MenuItem onClick={deleteMessageHandler} icon={<AiOutlineDelete/>}>{deleteText[language]}</MenuItem>
                        }
                        {/*<MenuItem icon={<AiOutlineCheckCircle/>}>Select</MenuItem>*/}
                    </ul>
                </div>
        </>
    )
}

export default MessageMenu;