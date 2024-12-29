import {FC, FormEvent, useEffect, useRef} from 'react'
import {useAppSelector} from '../../../hooks/redux';
import {translations} from "../../../utils/translations.tsx";
import TecSupportReplyToBlock from "./TecSupportReplyToBlock.tsx";
import {ImCross} from "@react-icons/all-files/im/ImCross";

interface TextareaProps {
    msg: string;
    setMsg: (msg: string) => void,
    setReplyUserEmail: (id: string) => void,
    replyUserEmail: string,
    onKeyDownHandler: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void,
    setFilesHandler: (files: FileList) => void,
    clearIndUserChatId: () => void,
}

const Textarea: FC<TextareaProps> = ({
                                         msg,
                                         setMsg,
                                         onKeyDownHandler,
                                         setFilesHandler,
                                         replyUserEmail,
                                         setReplyUserEmail,
                                         clearIndUserChatId,
                                     }) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const {chat, reply, editMsg} = useAppSelector(state => state.MessengerSlice)
    const {user} = useAppSelector(state => state.UserSlice)
    const users = useAppSelector(state => state.MessengerSlice.chat.users)
    const language = useAppSelector(state => state.TranslateSlice.language)


    useEffect(() => {
        if(!msg && ref.current) ref.current.style.height = "39px"
    }, [msg]);

    const textAreaHandler = (e: FormEvent) => {
        const target = e.target as HTMLInputElement;
        setMsg(target.value);
        if (ref.current) {
            ref.current.style.height = "39px";
            ref.current.style.height = ref.current.scrollHeight.toString() + "px";
        }
    }

    useEffect(() => {
        if (editMsg) {
            if (ref.current) {
                ref.current.focus();
            }
        }
    }, [editMsg])


    const onPasteHandler = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        if (e.clipboardData) {
            const items = e.clipboardData.items;
            const dt = new DataTransfer();
            if (items[0] && items[0].type.indexOf("image") !== -1) {
                const blob = items[0].getAsFile();
                if (blob) {
                    dt.items.add(blob);
                    setFilesHandler(dt.files);
                }
            }
        }

        setMsg(target.value);
        if (ref.current) {
            ref.current.style.height = "25px";
            ref.current.style.height = ref.current.scrollHeight.toString() + "px";
        }
    }

    const {
        enterMessageText,
        writeDisabledText
    } = translations.messenger

    const cancelReplying = () => {
        setReplyUserEmail("")
        clearIndUserChatId()
    }

    const replyUser = replyUserEmail && users?.find(item => item.email === replyUserEmail)


    return (
        <>
            {(chat.isTech || chat.requisite) && (user.role !== 'STUDENT' && user.role !== 'TRANER') && !replyUserEmail && !reply
                ?
                <TecSupportReplyToBlock
                    setReplyUserEmail={setReplyUserEmail}
                />
                :
                chat.isChanel && (user.role !== 'DIRECTOR' && user.role !== 'ZDIRECTOR')
                    ?
                    <div>{writeDisabledText[language]}</div>
                    :
                    <>
                        {
                            replyUser &&
                            <div
                                className='mb-[4px] bg-[#ccc] px-[6px] py-[4px] text-[14px] rounded-[4px] w-fit  border-0 flex justify-center items-center gap-[4px]'>
                                <p>{replyUser.name} {replyUser.sname}</p>
                                <button
                                    onClick={cancelReplying}
                                    className='pointer border-0 bg-transparent'
                                >
                                    <ImCross/>
                                </button>
                            </div>
                        }
                        <textarea
                            id="textReply"
                            onPaste={e => onPasteHandler(e)}
                            onKeyDown={e => onKeyDownHandler(e)}
                            ref={ref}
                            value={msg}
                            placeholder={enterMessageText[language]}
                            onInput={e => textAreaHandler(e)}
                            className='px-1 xl:px-5 py-1 xl:py-2 w-full rounded-lg shadow-sm text-[15px] resize-none custom-scroll focus:outline-none bg-white text-black h-[40px] max-h-[80px] sm:max-h-[180px]'
                        ></textarea>
                    </>
            }
        </>
    )
}

export default Textarea;