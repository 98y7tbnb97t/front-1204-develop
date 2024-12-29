import {FC, MouseEventHandler, useState} from 'react'
import {User} from '../../../models/User';
import Avatar from '../../UI/Avatar';
import IcoButton from '../../UI/IcoButton';
import {BiSolidMessageSquareMinus} from "@react-icons/all-files/bi/BiSolidMessageSquareMinus";
import {ImCross} from "@react-icons/all-files/im/ImCross";
import {MdMessage} from "@react-icons/all-files/md/MdMessage";
import {useDispatch} from "react-redux"
import {BsTelephone} from '@react-icons/all-files/bs/BsTelephone';
import {BsCameraVideo} from '@react-icons/all-files/bs/BsCameraVideo';
import {LuListVideo } from '@react-icons/all-files/lu/LuListVideo';
import {useAppSelector} from '../../../hooks/redux';
import {CallChatSocket} from '../../../sockets/MessengerSockets';
import {Link, useParams} from 'react-router-dom';
import {BsArrowLeft} from "@react-icons/all-files/bs/BsArrowLeft";
import {translations} from "../../../utils/translations.tsx";
import {FaCoins} from "@react-icons/all-files/fa/FaCoins";
import {getRequisiteFullName} from "../../../utils/requisites.ts";
import {IoClose} from "@react-icons/all-files/io5/IoClose";
import {RiUserSearchFill} from "@react-icons/all-files/ri/RiUserSearchFill";
import TopInfoUserSeacrh from "./TopInfoUserSeacrh.tsx";
import { UserRoles } from '../../../utils/userRoles.ts';
import { setIsStartMessaging } from "./../../../store/reducers/MessengerSlice"

interface TopInfoProps {
    data: User;
    setInfo: (bool: boolean) => void;
    setCallActive: (bool: boolean) => void;
    setIndUserChatId: (id: string) => void;
    setUnreadMsgsFiltered: (value: boolean) => void,
    unreadMsgsFiltered: boolean,
    unreadMsgsCount: number,
    isTech: boolean,
    curIndUser: User | undefined,
    clearIndUserChatId: () => void,
    requisiteFilterId: string,
    setRequisiteFilterId: (val: string) => void
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
    unansweredText,
    allText,
    lessonsInArmenianText,
    lessonsInFrenchText,
    lessonsInGermanText,
    lessonsInEnglishText,
    lessonsInRussianText
} = translations.messenger

const {
    requisitesText
} = translations.requisites

const TopInfo: FC<TopInfoProps> = ({
                                       data,
                                       setInfo,
                                       setCallActive,
                                       setUnreadMsgsFiltered,
                                       unreadMsgsFiltered,
                                       unreadMsgsCount,
                                       isTech,
                                       curIndUser,
                                       setIndUserChatId,
                                       clearIndUserChatId,
                                       requisiteFilterId,
                                       setRequisiteFilterId,
                                   }) => {
    const {chat} = useAppSelector(state => state.MessengerSlice)
    const {user} = useAppSelector(state => state.UserSlice)
    const language = useAppSelector(state => state.TranslateSlice.language)
    const requisites = useAppSelector(state => state.BalanceSlice.requisites)
    const {userid} = useParams();
    const [requisitesListOpened,setRequisitesListOpened] = useState<boolean>(false)
    const [userSearchOpened,setUserSearchOpened] = useState<boolean>(false)
    const dispatch = useDispatch()


    const onToggleRequisitesListOpened = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setRequisitesListOpened(prevState => !prevState)
    }

    const onToggleUsersListOpened = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setUserSearchOpened(prevState => !prevState)
    }

    const onSelectRequisiteFilter = (e: React.MouseEvent<HTMLButtonElement>,id: string) => {
        e.stopPropagation()
        setRequisiteFilterId(id)
        setRequisitesListOpened(false)
    }

    const onSelectIndUser = (e: React.MouseEvent<HTMLButtonElement>,id: string) => {
        e.stopPropagation()
        setIndUserChatId(id)
        setUserSearchOpened(false)
    }

    const clickHandler = () => {
        if (chat.isGroup) setInfo(true);
    }
    const callHandler = () => {

        if (userid) {
            CallChatSocket(chat.user, user._id, chat.user._id);
            setCallActive(true);
        }
    }



    let chatName = `${(data.name || "")} ${(data.sname || "")}`

    switch (chatName.trim()) {
        case supportForParentsText.ru: {
            chatName = supportForParentsText[language];
            break;
        }
        case lessonsInFrenchText.ru + '.': {
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
        case offlineTournamentsText.ru: {
            chatName = offlineTournamentsText[language];
            break;
        }
        case traditionalTournamentsText.ru: {
            chatName = traditionalTournamentsText[language];
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
            chatName = trialLessonQuestionsText[language];
            break;
        }
        case adminPlatformProblemsText.ru: {
            chatName = adminPlatformProblemsText[language];
            break;
        }
        case onlineSimultaneousSundayText.ru: {
            chatName = onlineSimultaneousSundayText[language]
            break;
        }
        case eduProgramText.ru: {
            chatName = eduProgramText[language];
            break;
        }
        case trialLessonForAdminText.ru: {
            chatName = trialLessonForAdminText[language]
            break;
        }
    }
    const avatar = data.avatar


    const enableUnreadMessages: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        setUnreadMsgsFiltered(true)
    }
    const disableUnreadMessages: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        setUnreadMsgsFiltered(false)
    }


    const onClearIndUserChatId: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        clearIndUserChatId()
    }
    return (
        <div className='bg-[#f0f2f5] flex justify-between px-2 p-2'>
            <div className="flex items-center w-full">
                <div
                     className={['w-full flex gap-3 items-center', chat.isGroup ? 'cursor-pointer' : null].join(' ')}>
                    <Link onClick={()=> dispatch(setIsStartMessaging(false))} className='text-3xl'><BsArrowLeft/></Link>
                    <Avatar avatar={avatar} className='mr-3'/>
                    <div className="flex flex-col text-gray-900 w-full">
                        <h2 className='font-semibold flex gap-[6px] w-full justify-between items-center'>
                            <p className='flex items-center gap-[4px] line-clamp-2'>
                                <span
                                    onClick={clickHandler}
                                >
                                {curIndUser ? `${curIndUser.name} ${curIndUser.sname}` : chatName}
                                </span>
                                {
                                    chat.group_id && [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) &&
                                    <Link to={`/video/${chat.group_id || ''}`}><LuListVideo  size={23}/></Link>
                                }
                                {
                                    curIndUser &&
                                    <button
                                        onClick={onClearIndUserChatId}
                                        className='cursor-pointer border-0 bg-transparent'
                                    >
                                        <ImCross/>
                                    </button>
                                }
                            </p>
                            {
                                isTech &&
                                <div className='flex justify-center items-center gap-[6px]'>
                                    {
                                        chat.requisite &&
                                        <>
                                            <div className={'relative flex'}>
                                                <button
                                                    onClick={onToggleUsersListOpened}
                                                    className={`bg-transparent text-[24px] text-black font-medium flex items-center gap-[3px] relative mr-[10px]`}>
                                                    <RiUserSearchFill/>
                                                </button>
                                                {
                                                    userSearchOpened &&
                                                    <TopInfoUserSeacrh setIndUser={onSelectIndUser}/>
                                                }
                                            </div>
                                            <div className={'relative flex'}>
                                                <button
                                                    onClick={onToggleRequisitesListOpened}
                                                    className={`text-[16px] bg-green-600 px-2 py-1 rounded-[4px] text-white font-medium flex items-center gap-[3px] relative mr-[10px]`}>
                                                    <span
                                                        className={'hidden sm:block'}>{requisitesText[language]}</span>
                                                    <span className={'block sm:hidden'}>
                                        <FaCoins/>
                                        </span>
                                                </button>
                                                {
                                                    requisiteFilterId &&
                                                    <button onClick={(e) => {
                                                        e.stopPropagation()
                                                        setRequisiteFilterId("")
                                                    }}
                                                            className={'text-[24px] text-white font-medium p-1 bg-green-600 rounded-[4px]'}>
                                                        <IoClose/>
                                                    </button>
                                                }

                                                {
                                                    requisitesListOpened &&
                                                    <div
                                                        className={'absolute flex flex-col items-start -bottom-[8px] right-0 bg-gray-300 rounded-[20px] py-2 translate-y-[100%] z-[2] w-[300px] max-w-screen'}>
                                                        {
                                                            requisites.map(item => (
                                                                <button
                                                                    key={item._id}
                                                                    className={'w-full p-2 border-b-[1px] border-gray-400 text-left hover:bg-blue-300'}
                                                                    onClick={(e) => onSelectRequisiteFilter(e, item._id)}
                                                                >
                                                                    {getRequisiteFullName(item)}
                                                                </button>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </>
                                    }


                                    <div className={'w-[3px] h-[20px] rounder-full bg-[#ccc]'}></div>
                                    <button
                                        onClick={disableUnreadMessages}
                                        className={`bg-transparent text-[16px] ${!unreadMsgsFiltered ? 'text-blue-500' : 'text-black'} font-medium flex items-center gap-[3px] relative mr-[10px]`}>
                                    <span
                                        className='md:block hidden'>{allText[language]}</span>
                                        <span className={'text-[24px] block md:hidden'}>
                                                    <MdMessage/>
                                        </span>
                                    </button>
                                    <div className={'w-[3px] h-[20px] rounder-full bg-[#ccc]'}></div>
                                    <button
                                        onClick={enableUnreadMessages}
                                        className={`bg-transparent text-[16px] ${unreadMsgsFiltered ? 'text-blue-500' : 'text-black'} font-medium flex items-center gap-[3px] relative mr-[10px]`}>
                                    <span
                                        className='md:block hidden'>{unansweredText[language]}</span>
                                        <span className={'text-[24px] block md:hidden'}>
                                                    <BiSolidMessageSquareMinus/>
                                        </span>
                                        <span
                                            className={`absolute md:static right-[-8px] top-[-8px] rounded-full w-[20px] h-[20px] bg-${unreadMsgsCount > 0 ? 'red' : 'green'}-500 text-white text-[12px] flex justify-center items-center`}>{unreadMsgsCount}</span>
                                    </button>
                                </div>
                            }
                        </h2>
                        <p className='text-sm text-apricot'>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                {!chat.isGroup &&
                    <>
                        <IcoButton onClick={callHandler} icon={<BsTelephone/>} className='mr-2'/>
                        {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                            <IcoButton onClick={callHandler} icon={<BsCameraVideo/>}/>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default TopInfo;
