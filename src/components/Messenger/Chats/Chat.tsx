import {FC, useEffect, useState} from 'react'
import {IChat} from '../../../models/IChat';
import {Link, useParams} from 'react-router-dom';
import format from 'date-fns/format';
import {IContextChat} from '../../../models/IContext';
import {useAppSelector} from "../../../hooks/redux.ts";
import {translations} from "../../../utils/translations.tsx";
import {groupCountries} from "../../../utils/countries.ts";
import {IoIosArrowDown} from "@react-icons/all-files/io/IoIosArrowDown";
import {IoIosVolumeOff} from "@react-icons/all-files/io/IoIosVolumeOff";
import {closedText, setRequisiteChats} from "../../../utils/chats.ts";
import {setIsStartMessaging} from "./../../../store/reducers/MessengerSlice"
import {useDispatch} from "react-redux"
interface ChatProps {
    data: IChat;
    context: IContextChat;
    setContext: (obj: IContextChat) => void;
    type?: string;
}
const Chat: FC<ChatProps> = ({
    data,
    type,
    context,
    setContext
}) => {
    const {userid} = useParams();
    const dispatch = useDispatch()
    const language = useAppSelector(state => state.TranslateSlice.language)
    const user = useAppSelector(state => state.UserSlice.user)
    const [isMuted, setIsMuted] = useState<boolean>(false);

    useEffect(() => {
        const isMutedForUser = data.mutedUsers?.some(mutedUser => mutedUser.user_id === user._id) || false;
        setIsMuted(isMutedForUser);
      }, [data.mutedUsers, user]);
    const { isStartMessaging } = useAppSelector(state => state.MessengerSlice);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        const item: HTMLElement | null = (e.target as HTMLElement).closest('.chat-item')
        if (!item) return;
        const {top, width} = item.getBoundingClientRect()

        const x = window.innerWidth > 640 ? width + 60 : width - 10
        setContext({...context, name: data.name, mutedUsers: data.mutedUsers, active: true, x, y: top, chat_id: data._id, type: type, isBasic: !!(data.tagId)});
    }
    const {
        supportForTrainersText,
        supportForParentsText,
        importantNewsText,
        programmersText,
        offlineTournamentsText,
        traditionalTournamentsText,
        onlineSimultaneousText,
        psychoWebinarsText,
        trainerPlatformProblemsText,
        armenianTrainersText,
        adminText,
        trialLessonQuestionsText,
        adminPlatformProblemsText,
        onlineSimultaneousSundayText,
        eduProgramText,
        trialLessonForAdminText,
        lessonsInArmenianText,
        lessonsInFrenchText,
        lessonsInGermanText,
        lessonsInEnglishText,
        lessonsInRussianText,
        closedDialogText,
    } = translations.messenger

    let chatName = data.name + ' ' + data.sname
    switch (chatName.trim()) {
        case supportForParentsText.ru: {
            chatName = supportForParentsText[language];
            break;
        }
        case supportForTrainersText.ru: {
            chatName = supportForTrainersText[language];
            break;
        }

        case importantNewsText.ru: {
            chatName = importantNewsText[language];
            break;
        }
        case programmersText.ru: {
            chatName = programmersText[language];
            break;
        }
        case traditionalTournamentsText.ru: {
            chatName = traditionalTournamentsText[language];
            break;
        }

        case offlineTournamentsText.ru: {
            chatName = offlineTournamentsText[language];
            break;
        }
        case lessonsInFrenchText.ru + ".": {
            chatName = lessonsInFrenchText[language];
            break;
        }
        case lessonsInGermanText.ru: {
            chatName = lessonsInGermanText[language];
            break;
        }
        case lessonsInEnglishText.ru + ".": {
            chatName = lessonsInEnglishText[language];
            break;
        }
        case lessonsInRussianText.ru: {
            chatName = lessonsInRussianText[language];
            break;
        }
        case onlineSimultaneousText.ru: {
            chatName = onlineSimultaneousText[language];
            break;
        }
        case psychoWebinarsText.ru: {
            chatName = psychoWebinarsText[language];
            break;
        }
        case trainerPlatformProblemsText.ru: {
            chatName = trainerPlatformProblemsText[language];
            break;
        }
        case armenianTrainersText.en: {
            chatName = lessonsInArmenianText[language];
            break;
        }
        case adminText.ru: {
            chatName = adminText[language];
            break;
        }
        case trialLessonQuestionsText.ru: {
            chatName = trialLessonQuestionsText[language]
            break;
        }
        case adminPlatformProblemsText.ru: {
            chatName = adminPlatformProblemsText[language]
            break;
        }
        case onlineSimultaneousSundayText.ru: {
            chatName = onlineSimultaneousSundayText[language]
            break;
        }

        case eduProgramText.ru: {
            chatName = eduProgramText[language]
            break;
        }
        case trialLessonForAdminText.ru: {
            chatName = trialLessonForAdminText[language]
            break;
        }
    }


    const groupCountry = groupCountries.find(item => item.slug === data.country)

    const avatar = groupCountry?.img || data.avatar

    const mention = data.lastmsg?.msg?.includes(`@${user.name}`) && data.unreaded > 0
    let lastMsg = (!data?.lastmsg?.usersToSend || data?.lastmsg?.usersToSend.length === 0 || data?.lastmsg?.usersToSend.includes(user._id)) ? data.lastmsg?.msg || "" : ""
    if(data.lastmsg?.msg === closedText) {
        lastMsg = closedDialogText[language]
    }

    return (
        <Link onContextMenu={e => handleClick(e)} onClick={()=>{dispatch(setIsStartMessaging(true))}} to={'/messenger/chat/' + data._id}
              className={['chat-item group p-[6px]  relative   text-black hover:bg-gray-300 pb-0 pr-0', userid === data._id && isStartMessaging ? 'bg-gray-300' : null].join(' ')}>
            <div className={'w-full items-center grid grid-cols-[auto,1fr] pr-[8px] overflow-x-hidden '}>
                <div
                    className={['flex-shrink-0 w-[52px] h-[58px] pb-[6px]  mr-3 relative ', data.isOnline ? 'before:absolute before:w-4 before:h-4 before:bg-green-400 before:rounded-full before:bottom-0 before:right-0 before:border-[3px] before:border-gray-800' : null].join(' ')}>
                    <img className='rounded-full bg-black  h-full aspect-square' src={avatar} alt="avatar"/>
                </div>
                <div
                    className={'flex h-full overflow-x-hidden justify-between items-center pb-[6px] border-b-0 sm:border-b-[1px] border-[#ccc] pr-[6px]'}>
                    <div className="flex flex-col items-start overflow-hidden">
                        <h2 className='line-clamp-2 relative text-black text-sm text-inherit font-medium md:mb-1 max-w-[100%] sm: pr-2 xl:pr-10'>{chatName}

                        </h2>
                        <p className='text-gray-500 text-sm max-w-[270px] pr-5 whitespace-nowrap overflow-hidden text-ellipsis w-full'>{lastMsg || ''}&#160;</p>
                    </div>
                    <div className='flex gap-1'>
                        {isMuted && <IoIosVolumeOff className='mt-[2px] text-gray-500'/>}
                        <div className='flex  flex-col gap-[3px] justify-between h-full justify-self-end items-end'>
                            {data.lastmsg &&
                                <span
                                    className="text-sm text-gray-500 ">{format(new Date(data.lastmsg.time), 'H:mm')}</span>
                            }
                            <div className="flex gap-1 text-green-500 font-bold">
                                {mention ? '@' : ''}
                                {data.unreaded > 0 &&
                                    <span
                                        className='bg-green-500 text-white px-1 pb-0.5  rounded-full text-sm flex items-center justify-center min-w-[20px]  font-semibold w-fit'>{data.unreaded}</span>
                                }
                            </div>

                            <div
                                className='arr-menu  group-hover:visible invisible  justify-end ml-auto align-middle gap-3 text-xl'
                                onClick={e => handleClick(e)}>
                                <div><IoIosArrowDown/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Chat;
