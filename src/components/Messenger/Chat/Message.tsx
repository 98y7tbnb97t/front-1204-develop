import {FC, useEffect, useRef, useState, memo} from 'react'
import {IMessage} from '../../../models/IMessage'
import {User} from '../../../models/User';
import format from 'date-fns/format';
import {BsCheckAll} from '@react-icons/all-files/bs/BsCheckAll'
import Avatar from '../../UI/Avatar';
import {IContext} from '../../../models/IContext';
import AudioMessage from './AudioMessage';
import ReplyMessage from './ReplyMessage';
import Attachments from './Attachments/Attachments';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import sanitize from 'sanitize-html';
import {IoIosArrowDown} from '@react-icons/all-files/io/IoIosArrowDown'
import {Link, useParams} from 'react-router-dom';
import differenceInDays from 'date-fns/differenceInDays';

import {translations} from "../../../utils/translations.tsx";
import {setReaction, sendMessage, setReplyMessage, setReactionThunk} from "../../../store/reducers/MessengerSlice.ts";
import {isUserDirector, UserRoles} from "../../../utils/userRoles.ts";
import {closedText} from "../../../utils/chats.ts";
import {getCurMsgRequisite} from "../../../utils/requisites.ts";
import OnlineIndicator from '../../UI/OnlineIndicator.tsx';
import EmojiPicker from '../../UI/EmojiPicker.tsx';
import IcoButton from '../../UI/IcoButton.tsx';
import { BsEmojiSmile } from '@react-icons/all-files/bs/BsEmojiSmile';
import { EmojiClickData } from 'emoji-picker-react';
import MessageReactions from './MessageReactions.tsx';
import Button from '../../UI/Button.tsx';
import EstimateModal from '../../Modals/EstimateModal.tsx';
import { IEstimate } from '../../../models/IEstimate.tsx';
import EstimatesService from '../../../services/EstimatesService.ts';
import { formatDate } from '../../../utils/formatDate.ts';

interface MessageProps {
    className?: string;
    msg: IMessage;
    user?: User;
    isMe: boolean;
    setContext?: (obj: IContext) => void;
    setIndUserChatId: (id: string) => void;
    isUnansvered: boolean;
    isTech?: boolean;
    users: User[] | undefined;
    onReplyClick?: (msg: IMessage) => void
}


const Message: FC<MessageProps> = memo(({
                                       msg,
                                       isMe,
                                       setContext,
                                       className,
                                       isUnansvered,
                                       isTech,
                                       setIndUserChatId,
                                       users,
                                       onReplyClick
                                   }) => {
    const dispatch = useAppDispatch()
    const {userid} = useParams();
    const language = useAppSelector(state => state.TranslateSlice.language)
    const user = useAppSelector(state => state.UserSlice.user)
    const emojiButtonRef = useRef<HTMLButtonElement>(null);
    const [emojiPickerActive, setEmojiPickerActive] = useState<boolean>(false);
    const [estimateModal, setEstimateModal] = useState<boolean>(false);
    const showEmojiTimer = useRef<NodeJS.Timeout | null>(null);
    const [estimate, setEstimate] = useState<IEstimate | null>(null);
    const {
        userText,
        answerText,
        closeDialogText,
        closedDialogText,
        tranersComment
    } = translations.messenger

    const {
        willBeInLesson,
        willNotBeInLesson
    } = translations.autoSMS

    const {
        trainerText,
        directorText,
        zDirectorText,
        adminText,
        trainerMedhodistText
    } = translations.access

    const rolesTranslations: {[key in UserRoles]: string} = {
        [UserRoles.TRANER]: trainerText[language],
        [UserRoles.TRANERMETODIST]: trainerMedhodistText[language],
        [UserRoles.DIRECTOR]: directorText[language],
        [UserRoles.ZDIRECTOR]: zDirectorText[language],
        [UserRoles.ADMIN]: adminText[language],
        [UserRoles.NEWUSER]: '',
        [UserRoles.PROGRAMMER]: '',
        [UserRoles.STUDENT]: '',
    };

    const userPrefix = (role?: UserRoles) => {
        if (role && user.role === UserRoles.STUDENT) {
            return (
                rolesTranslations[role].slice(0, 1).toLocaleUpperCase() 
                + rolesTranslations[role].slice(1).toLocaleLowerCase()
                + ' '
            );
        }
        return '';
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (setContext) setContext({
            active: true,
            x: e.clientX - 150,
            y: e.clientY,
            message_id: msg._id,
            message_text: msg.msg,
            isMe
        });
    }

    const handleCloseDialog = async (reply: string) => {
        if (userid) {
            await dispatch(sendMessage({msg: closedText, userid, audio: undefined, fileList: [], reply}));
        }
    }

    const [wrapMessage, setWrapMessage] = useState<string>('');

    let message = msg.msgTranslations ? msg.msgTranslations[language] : msg.msg

    if (message === closedText) {
        message = closedDialogText[language]
    }

    const replyUser = users ? users.find(item => msg.msg.includes(item.email)) : null

    if (replyUser) {
        if (msg.type === "system" && replyUser._id === user._id) {
            message = `Новые реквизиты - <a href="/balance" class="text-blue-600" target="_blank">${message.slice(message.indexOf('('))}</a>`
        } else {
            const replaceTo = isUserDirector(user?.role)
                ? `@${replyUser.name.trim()}__${replyUser.sname} `
                : ""
            message = message.replace(`@${replyUser.email} `, replaceTo)
        }

    }

    useEffect(() => {
        const urlPattern = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/gi;   // eslint-disable-line no-useless-escape
        const regex = new RegExp(`${'@'}\\S*`, 'gi');


        const FirstReplace = message.replace(urlPattern, '<a class="text-blue-600" target="_blank" href="$&">$&</a>');
        const SecondReplace = FirstReplace.replace(regex, '<span class="text-blue-600">$&</span>');
        setWrapMessage(sanitize(SecondReplace, {
            allowedTags: ["span", "a"],
            allowedAttributes: {a: ["href", "target"]},
            allowedClasses: {'span': ['text-blue-600'], 'a': ['text-blue-600']}
        }))
    }, [language, message])

    const {blinkMessage} = useAppSelector(state => state.MessengerSlice)
    const {chat} = useAppSelector(state => state.MessengerSlice);
    const userfrom = chat.since?.find(item => item.user_id === msg.from?._id);


    const replyHandler = () => {
        dispatch(setReplyMessage(msg._id))
    }

    const onClickName = () => {
        if (msg.from) setIndUserChatId(msg.from._id)
    }

    const nameClickDisabled = !isTech || msg?.from?._id === user._id || isUserDirector(msg?.from?.role as UserRoles | undefined)

    let systemMsgLinkTo = null

    if (msg?.homework && (user.role !== 'STUDENT' || message.includes(`${user.name} ${user.sname}`))) {
        systemMsgLinkTo = user.role !== 'STUDENT' ? `/group/${chat?.group_id || ""}/homework/${msg?.homework || ""}` : `/homework/${msg?.homework || ""}`
    }


    const curMsgRequisite = getCurMsgRequisite(chat.messages,msg);

    const setEmojiTimeout = () => {
        showEmojiTimer.current = setTimeout(() => setEmojiPickerActive(true), 400);
    }

    const clearEmojiTimeout = () => {
        if (showEmojiTimer.current) {
            clearTimeout(showEmojiTimer.current);
        }
    }
    const systemMessageContent = (
        <div 
            onContextMenu={e => handleClick(e)}
            className={['w-full shadow-md transition-all rounded-md py-1 mx-4  sm:mx-3 px-4 relative before:absolute before:right-0 before:translate-x-1/2', msg.color === 'yellow' || systemMsgLinkTo ? 'bg-yellow-400 text-black order-1 mr-5 before:border-t-yellow-400' : msg.color === 'blue' ? 'bg-blue-500 order-1 mr-5 before:border-t-blue-500' : msg.color === 'green' ? 'bg-green-500 order-1 mr-5 before:border-t-yellow-400' : 'bg-red-500 order-1 mr-5 before:border-t-red-500'].join(' ')}
        >
            <div className="flex justify-between flex-col gap-2">
                <div className="">
                    <h2 className='font-medium mb-1'>System</h2>

                    <div className="flex items-center justify-between">
                        <p className='text-sm break-all'>{message}</p>
                    </div>
                </div>
            </div>
            { msg.additionalContent && <div 
                        dangerouslySetInnerHTML={{__html: 
                        msg.additionalContent
                        .replace('{{willBeInLesson}}', willBeInLesson[language])
                        .replace('{{willNotBeInLesson}}', willNotBeInLesson[language])
                        .replace('{{traners_comment}}', tranersComment[language])
            }}></div>}
            <div className="flex items-center justify-end">
                <p className='text-xs'>{format(new Date(msg.time), 'MM/dd HH:mm')}</p>
                {isMe &&
                    <span
                        className={['ml-1 text-lg', msg.readed ? 'text-blue-600' : 'text-gray-800'].join(' ')}><BsCheckAll/></span>
                }
            </div>
        </div>
    )

    const setReactionHandler = (msgId: string) => (emojiObject: EmojiClickData) => {
        void dispatch(setReaction({ msgId, reaction: emojiObject.emoji, from: user._id }));
        void dispatch(setReactionThunk({ msgId, reaction: { from: user._id, emoji: emojiObject.emoji }}));
    }

    if (msg.isAutoSMS) {
        return (
            <div id={msg._id}
                className={['flex sm:w-full box-border basis-full ml-4 mr-4 text-white', isMe ? 'self-center justify-center' : 'self-start justify-start '].join(' ')}>

                <div onContextMenu={e => handleClick(e)}
                        className={['w-full text-black shadow-md transition-all rounded-md py-2 px-4 relative before:absolute before:right-0 before:translate-x-1/2 bg-green-300 order-1 xl:mr-5 before:border-t-green-300'].join(' ')}>
                    <h2 className='font-medium mb-1'>System</h2>
                    <div dangerouslySetInnerHTML={{__html: message || ''}}></div>
                    { msg.additionalContent && <div 
                               dangerouslySetInnerHTML={{__html: 
                               msg.additionalContent
                                .replace('{{willBeInLesson}}', willBeInLesson[language])
                                .replace('{{willNotBeInLesson}}', willNotBeInLesson[language])
                                .replace('{{traners_comment}}', tranersComment[language])
                    }}></div>}
                    <div className="flex items-center justify-end">
                        <p className='text-xs'>{format(new Date(msg.time), 'MM/dd HH:mm')}</p>
                        {isMe &&
                            <span
                                className={['ml-1 text-lg', msg.readed ? 'text-blue-600' : 'text-gray-800'].join(' ')}><BsCheckAll/></span>
                        }
                    </div>
                </div>
            </div>
        )
    }

    const getEstimate = async (estId: string) => {
        if (estId && (!estimate || estimate._id !== estId)) {
            try {
                const res = await EstimatesService.getEstimate(estId);
                if (res.data && res.data.estimate) {
                    setEstimate(res.data.estimate);
                }
            } catch (error) {
                // console.error(error);
            }
        }
    }

    if (msg.additionalContent && msg.additionalContent.includes('estimateButton')) {
        const [_, estId] = msg.additionalContent.split('?id=');
        void getEstimate(estId);
    }

    if (estimate) {
        let lessonDate = new Date(estimate.lessonDate);
        if (user.role === UserRoles.STUDENT && user.timeZone) {
            lessonDate = new Date(lessonDate.toLocaleString('en-US', { timeZone: user.timeZone }));
        }
        const datetime = formatDate(lessonDate, true);
        const [date, time] = datetime.split(' ');
        message = message
            .replace('{{lessonDate}}', date)
            .replace('{{lessonTime}}', time)
            .replace('{{lessonDuration}}', String(Math.floor(estimate.lessonDuration)))
            .replace('{{tranersName}}', `${estimate.traner.name} ${estimate.traner.sname} ${estimate.traner.tname || ''}`);
    }

    return (
        <>
            {msg.type === 'system'
                ?
                msg.color === 'green'
                    ?
                    <div id={msg._id}
                        className={['flex sm:w-full box-border basis-full ml-4 mr-4 text-white', isMe ? 'self-center justify-center' : 'self-start justify-start '].join(' ')}>

                        <div onContextMenu={e => handleClick(e)}
                             className={['w-full text-black shadow-md transition-all rounded-md py-2 px-4 relative before:absolute before:right-0 before:translate-x-1/2 bg-green-300 order-1 xl:mr-5 before:border-t-green-300'].join(' ')}>
                            <h2 className='font-medium mb-1'>System</h2>
                            <div dangerouslySetInnerHTML={{__html: message || ''}}></div>
                            { msg.additionalContent && <div 
                                    dangerouslySetInnerHTML={{__html: 
                                    msg.additionalContent
                                        .replace('{{willBeInLesson}}', willBeInLesson[language])
                                        .replace('{{willNotBeInLesson}}', willNotBeInLesson[language])
                                        .replace('{{traners_comment}}', tranersComment[language])
                                        .replace(/estimateButton.*/, '')
                            }}></div>}
                            { estimate && (
                                <Button className='bg-sky-500 mt-2' onClick={() => setEstimateModal(true)}>Оценка урока и работы тренера</Button>
                            )}
                            <div className="flex items-center justify-end">
                                <p className='text-xs'>{format(new Date(msg.time), 'MM/dd HH:mm')}</p>
                                {isMe &&
                                    <span
                                        className={['ml-1 text-lg', msg.readed ? 'text-blue-600' : 'text-gray-800'].join(' ')}><BsCheckAll/></span>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    (systemMsgLinkTo ? 
                        <div>
                            <Link
                                to={systemMsgLinkTo}
                                id={msg._id}
                                className={['flex w-full basis-full text-white', isMe ? 'self-center justify-center' : 'self-start justify-start'].join(' ')}>
                                        {systemMessageContent}
                            </Link>
                        </div>
                        :
                        <div
                            className={['flex w-full basis-full text-white', isMe ? 'self-center justify-center' : 'self-start justify-start'].join(' ')}
                        >
                            {systemMessageContent}
                        </div>
                    )
                :
                <div className='flex gap-1 items-center group relative'>
                <div id={msg._id}
                    onTouchStart={setEmojiTimeout}
                    onTouchEnd={clearEmojiTimeout}
                     className={['flex grow px-1 md:px-2 max-w-[calc(100%-40px)] sm:max-w-[calc(100%-68px)] xl:[&>div>.arr-menu]:hover:block', isMe ? 'self-end justify-end' : 'self-start justify-start', className].join(' ')}>
                    {
                        !isMe && <Avatar className=' order-2' avatar={msg.from?.avatar}/>
                    }
                    <div onContextMenu={e => handleClick(e)}
                         className={[
                             'msg-con msg-item relative w-full group shadow-md transition-all rounded-md py-1 md:py-2 px-1 md:px-3 relative before:absolute before:border-[10px] before:border-transparent before:border-t-[10px] before:top-0',
                             isMe
                                 ? 'bg-apricot order-1 mr-2 before:border-t-apricot before:right-0 before:translate-x-1/2'
                                 : 'bg-white order-3 ml-2 md:ml-5 before:border-t-white before:left-0 before:-translate-x-1/2',
                             !isMe && blinkMessage === msg._id ? '!bg-gray-600' : null,
                             isMe && blinkMessage === msg._id ? '!bg-[#FFAE7A]' : null,
                             isUnansvered ? 'border-red-600 border-[3px]' : ""
                         ].join(' ')
                         }>
                        {msg.reactions && (
                            <div className='flex gap-1 absolute left-2 md:left-auto md:right-2 -bottom-1 translate-y-1/2 z-10'>
                                <MessageReactions msg={msg} user={user}/>
                            </div>
                        )}
                        <div
                            className={['arr-menu z-[3] group-hover:visible invisible absolute right-2 text-gray-800 top-2 text-xl cursor-pointer', isMe ? 'bg-apricot' : 'bg-white'].join(' ')}
                            onClick={e => handleClick(e)}><IoIosArrowDown/></div>
                        {
                            (
                                chat.requisite &&
                                !isUserDirector(msg.from?.role as UserRoles) &&
                                isUserDirector(user.role) &&
                                curMsgRequisite) &&
                            <h6 className={'text-[14px] text-red-600 font-medium'}>{curMsgRequisite}</h6>
                        }
                        {
                            !isMe &&
                            <div className='flex gap-1 items-center'>
                                <button
                                    disabled={nameClickDisabled}
                                    onClick={onClickName}
                                    className={[
                                        'block leading-[1] font-medium sm:text-sm text-[14px] whitespace-nowrap overflow-hidden max-w-full text-ellipsis cursor-pointer bg-transparent border-0 disabled:cursor-pointer',
                                        isUserDirector(msg?.from?.role as UserRoles | undefined) ? '!text-red-700' : "",
                                        isMe ? 'text-right ml-auto' : 'text-left'
                                    ].join(' ')}
                                    style={{color: msg.from?.hex}}>
                                    {
                                        (
                                            !chat.anonim ||
                                            user.role === 'DIRECTOR' ||
                                            user.role === 'ZDIRECTOR' ||
                                            user.role === UserRoles.PROGRAMMER ||
                                            (
                                                user.role === 'ADMIN' &&
                                                (
                                                    chat.isTech ||
                                                    chat.requisite
                                                )
                                            )
                                        ) ? 
                                            userPrefix(msg?.from?.role as UserRoles) + (msg?.from?.name || "") + ' ' + (msg?.from?.sname || "") :
                                            ((chat.tagId === 'admins' || chat.tagId === 'testLessonQuestions' || chat.showNames) ? (msg?.from?.name || "") : userText[language])}
                                    <span className='text-red-500'>
                                    {(userfrom && user.role !== UserRoles.PROGRAMMER ? (differenceInDays(new Date(), new Date(userfrom.date)) <= 10 ? ' (Новый пользователь)' : '') : '')}
                                </span>
                                </button>
                                <OnlineIndicator isOnline={msg?.from?.isOnline}/>
                            </div>
                        }
                        { /* eslint-disable-line @typescript-eslint/restrict-plus-operands*/}
                        {msg.reply &&
                            <ReplyMessage msg={msg.reply} onReplyClick={onReplyClick}/>
                        }
                        {msg.attachments.length > 0 &&
                            <Attachments attachments={msg.attachments}/>
                        }
                        
                        {msg.type === 'text' &&
                            <p className='text-sm whitespace-pre-wrap break-all'
                               dangerouslySetInnerHTML={{__html: wrapMessage}}></p>
                        }
                        
                        {msg.type === 'audio' &&
                            <AudioMessage msg={msg} isMe={isMe}/>
                        }

                        <div className="flex flex-col text-right items-end">
                            <div className='flex flex-row justify-end items-center gap-1'>    
                                <p className='text-xs text-gray-600'>{format(new Date(msg.time), 'dd/MM HH:mm')}</p>
                                {isMe &&
                                    <span
                                        className={['ml-1 text-lg', msg.readed && msg.readed.some(id => id !== user._id) ? 'text-blue-600' : 'text-gray-800'].join(' ')}><BsCheckAll/></span>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        isTech && !isMe && isUnansvered &&
                        <div className=' order-4 flex flex-col justify-center  gap-[6px]'>
                            <button
                                className='py-[2px] p-[4px] rounded-[4px] bg-blue-400 text-[14px] ml-[6px]'
                                onClick={replyHandler}
                            >
                                {answerText[language]}
                            </button>
                            <button
                                className='py-[2px] p-[4px] rounded-[4px] bg-blue-400 text-[14px] ml-[6px]'
                                onClick={() => void handleCloseDialog(msg._id)}
                            >
                                {closeDialogText[language]}
                            </button>
                        </div>

                    }
                </div>
                <IcoButton
                    ref={emojiButtonRef}
                    onClick={() => {
                        emojiPickerActive ? setEmojiPickerActive(false) : setEmojiPickerActive(true);
                    }}
                    icon={<BsEmojiSmile />}
                    className="!px-0 !py-0 !text-gray-800 hover:!bg-transparent hidden group-hover:block"
                />
                <EmojiPicker
                    button={emojiButtonRef.current}
                    onEmojiClick={setReactionHandler(msg._id)}
                    active={emojiPickerActive}
                    setActive={setEmojiPickerActive}
                    reactionsDefaultOpen={true}
                    className='right-10 -top-[5px] -translate-y-[100%] z-10'
                />
                </div>
            }
        <EstimateModal active={estimateModal} setActive={setEstimateModal} estimate={estimate} setEstimate={setEstimate}/>
        </>
    )
})

export default Message;