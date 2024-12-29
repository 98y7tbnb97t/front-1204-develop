import {FC, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import Button from '../../../UI/Button';
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose'
import {CgMoveRight} from '@react-icons/all-files/cg/CgMoveRight'
import IcoButton from '../../../UI/IcoButton';
import {useParams} from 'react-router-dom';
import AddUserToGroupModal from '../../../Modals/AddUserToGroupModal';
import {AiFillEdit} from '@react-icons/all-files/ai/AiFillEdit';
import {AiOutlineArrowLeft} from '@react-icons/all-files/ai/AiOutlineArrowLeft';
import {AiOutlineArrowRight} from '@react-icons/all-files/ai/AiOutlineArrowRight';
import {BsCheckLg} from '@react-icons/all-files/bs/BsCheckLg'
import ContentEditable, {ContentEditableEvent} from 'react-contenteditable';
import DialogService from '../../../../services/DialogService';
import sanitize from 'sanitize-html';
import UploadFile from '../UploadFile';
import GroupMedia from './GroupMedia';
import {IoIosArrowDown} from '@react-icons/all-files/io/IoIosArrowDown'
import {Menu} from '@headlessui/react'
import CreateFullGroupModal from '../../../Modals/CreateFullGroupModal';
import {BsArrowLeft} from "@react-icons/all-files/bs/BsArrowLeft";
import { FaArchive } from "@react-icons/all-files/fa/FaArchive";
import {translations} from "../../../../utils/translations.tsx";
import {setRoleColor, UserRoles} from "../../../../utils/userRoles.ts";
import { IDialogType } from '../../../../models/IDialogType.ts';
import { editChatTag } from '../../../../store/reducers/UserSlice.ts';
import ArchiveGroupModal from '../../../Modals/ArchiveGroupModal.tsx';
import CreateNewTagModal from '../../../Modals/CreateNewTagModal.tsx';
import RemoveGroupModal from '../../../Modals/RemoveGroupModal.tsx';
import AnonymGroupModal from '../../../Modals/AnonymGroupModal.tsx';
import RemoveUserModal from '../../../Modals/RemoveUserModal.tsx';
import RemoveUserFromChatModal from '../../../Modals/RemoveUserFromChatModal.tsx';
import MoveUserToChatModal from '../../../Modals/MoveUserToChatModal.tsx';
import FormerChatParticipantsModal from '../../../Modals/FormerChatParticipantsModal.tsx';
import { User } from '../../../../models/User.ts';
import Input from '../../../UI/Input.tsx';
import AutoSMSModal from '../../../Modals/AutoSMSModal.tsx';
import AutoSMSListModal from '../../../Modals/AutoSMSListModal.tsx';

interface GroupInfoProps {
    active: boolean;
    setActive: (bool: boolean) => void;
}

interface IgroupInfoBool {
    name: boolean,
    description: boolean
}

interface IgroupInfo {
    name: string,
    description: string
}

const GroupInfo: FC<GroupInfoProps> = ({active, setActive}) => {
    const [groupMedia, setGroupMedia] = useState<boolean>(false);
    const {chat, archived} = useAppSelector(state => state.MessengerSlice);
    const language = useAppSelector(state => state.TranslateSlice.language);
    const {user} = useAppSelector(state => state.UserSlice);
    const [modal, setModal] = useState<boolean>(false);
    const [modalAdd, setModalAdd] = useState<boolean>(false);
    const [modalRemove, setModalRemove] = useState<boolean>(false);
    const [modalMove, setModalMove] = useState<boolean>(false);
    const [modalAutoSMS, setModalAutoSMS] = useState<boolean>(false);
    const [modalFormerChatParticipants, setModalFormerChatParticipants] = useState<boolean>(false);
    const [modalRemoveInfo, setModalRemoveInfo] = useState<{ user: User }>({ user: {} as User});
    const [archiveUserModal, setArchiveUserModal] = useState<boolean>(false);
    const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<IDialogType | null>(null);
    const [archive, setArchive] = useState<boolean>(false);
    const [archiveModal, setArchiveModal] = useState<boolean>(false);
    const [anonim, setAnonim] = useState<boolean>(false);
    const [anonimModal, setAnonimModal] = useState<boolean>(false);
    const [newTagModal, setNewTagModal] = useState<boolean>(false);
    const [removeGroupModal, setRemoveGroupModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [usersList, setUsersList] = useState<User[]>([]);

    const dispatch = useAppDispatch();
    const [groupInfoBool, setGroupInfoBool] = useState<IgroupInfoBool>({
        name: false,
        description: false
    })
    const [groupInfo, setGroupInfo] = useState<IgroupInfo>({
        name: chat.user.name,
        description: chat.description
    })
    const [groupInfoHTML, setGroupInfoHTML] = useState<IgroupInfo>({
        name: chat.user.name,
        description: chat.description
    })
    const isChatArchived = archived.some(c => c._id === chat._id)
    const {userid} = useParams();
    useEffect(() => {
        setActive(false);
    }, [setActive, userid])
    const f = (str: string) => {
        // eslint-disable-next-line no-useless-escape
        const urlPattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\z`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
        const withlink = str.replace(
            // eslint-disable-next-line no-useless-escape
            urlPattern,
            '<a class="text-blue-400" target="_blank" href="$1">$1</a>'
        );
        return withlink;
    }
    
    useEffect(() => {
        setTag(null);
        const allTagsTemp = new Set<string>();
        user.dialog_types?.forEach((type) => {
            allTagsTemp.add(type.name);
            if (type.dialog === chat._id) {
                setTag(type);
            }
        })
        setTags(Array.from(allTagsTemp));
    }, [chat._id, user.dialog_types])

    useEffect(() => {
        setGroupInfo({name: chat.user.name, description: chat.description});
        if (chat.description) {
            setGroupInfoHTML({name: chat.user.name, description: f(chat.description)});
        } else {
            setGroupInfoHTML({name: chat.user.name, description: chat.description});
        }
    }, [chat])

    useEffect(() => {
        setDeletedUsers(chat?.formerParticipants || []);
    }, [chat?.formerParticipants])

    useEffect(() => {
        if (chat?.users) {
            setUsersList(
                chat.users
                    .filter(u => !u.archive && 
                        (
                            chat.isTech ||
                            ![UserRoles.STUDENT, UserRoles.TRANER, UserRoles.TRANERMETODIST].includes(user.role) ||
                            [UserRoles.STUDENT, UserRoles.TRANER, UserRoles.TRANERMETODIST, UserRoles.ADMIN].includes(u.role)
                        )
                    )
                    .filter(u => `${u.name} ${u.sname} ${u.tname || ''} ${u.email}`.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
    }, [chat?.users, searchQuery, setUsersList])

    const handleChangeName = (e: ContentEditableEvent) => {
        const target = e.target as HTMLInputElement;
        const sanitizeConf = {
            allowedTags: ["br", "div", "p"],
        };
        setGroupInfo({...groupInfo, name: sanitize(target.value, sanitizeConf)});
        setGroupInfoHTML({...groupInfoHTML, name: sanitize(target.value, sanitizeConf)});
    };

    const handleChangeDesc = (e: ContentEditableEvent) => {
        const target = e.target as HTMLInputElement;
        const sanitizeConf = {
            allowedTags: ["br", "div", "a", "p"],
            allowedAttributes: {a: ["href"]}
        };
        setGroupInfo({...groupInfo, description: sanitize(target.value, sanitizeConf)});
        setGroupInfoHTML({...groupInfoHTML, description: sanitize(target.value, sanitizeConf)});
    };
    const handleEdit = (file: FileList | undefined) => {
        let avatar: File | undefined = undefined;
        if (file) {
            avatar = file[0];
        }
        if (userid) {
            void DialogService.editChat(userid, groupInfo.name, groupInfo.description, avatar);
        }
        setGroupInfoBool({name: false, description: false});
    }

    const removeHandler = (user: User) => {
        setModalRemoveInfo({user});
        setModalRemove(true);
    }

    const moveHandler = (user: User) => {
        setModalRemoveInfo({user});
        setModalMove(true);
    }

    const archiveUserHandler = (user: User) => {
        setModalRemoveInfo({user});
        setArchiveUserModal(true);
    }

    const {
        supportDescriptionText,
        supportForParentsText,
        groupDescriptionTitleText,
        descriptionTitleText,
        documentsLinkText,
        technicalLinkText,
        lessonsLinkText,
        levelsLinkText,
        forNewTrainersText,
        crmText,
        zoomLinkText,
        conferenceIdText,
        accessCodeText,
        importantNewsText,
        programmersText,
        importantNewsDescriptionText,
        offlineTournamentsText,
        onlineSimultaneousText,
        aboutSimultaneousText,
        psychoWebinarsText,
        trainerPlatformProblemsText,
        technicalProblemsDescriptionText,
        armenianTrainersText,
        adminText,
        trialLessonQuestionsText,
        adminPlatformProblemsText,
        mediaFilesText,
        usersText,
        addUserText,
        archiveText,
        traditionalTournamentsText,
        onlineSimultaneousSundayText,
        eduProgramText,
        trialLessonForAdminText,
        groupMediaText,
        aboutTrialLessonText,
        removeFromGroupText,
        moveToAnotherGroupText,
        lessonsInArmenianText,
        lessonsInFrenchText,
        lessonsInGermanText,
        lessonsInEnglishText,
        lessonsInRussianText,
        addToGroupsText,
        addToTagText,
        createNewCategoryText,
        removeFromCategoryText,
        deleteText,
        unArchiveText,
        viewFormerParticipantsText
    }= translations.messenger

    const {
        toAnonymText,
        unAnonymText
    } = translations.access

    const linkTexts = [
        documentsLinkText,
        technicalLinkText,
        lessonsLinkText,
        levelsLinkText,
        forNewTrainersText,
        crmText,
        zoomLinkText,
        conferenceIdText,
        accessCodeText,
    ]

    let nameText: string = groupInfo.name || ""
    let descriptionText: string = groupInfo.description || ""
    switch (groupInfo?.name?.trim()) {
        case supportForParentsText.ru: {
            descriptionText = supportDescriptionText[language]
            nameText = supportForParentsText[language]
            break;
        }
        case importantNewsText.ru: {
            descriptionText = importantNewsDescriptionText[language]
            nameText = importantNewsText[language]
            break;
        }
        case programmersText.ru: {
            nameText = programmersText[language]
            break;
        }
        case offlineTournamentsText.ru: {
            nameText = offlineTournamentsText[language]
            break;
        }
            case lessonsInFrenchText.ru+'.': {
            nameText = lessonsInFrenchText[language]
            break;
        }
            case lessonsInGermanText.ru: {
            nameText = lessonsInGermanText[language]
            break;
        }
            case lessonsInEnglishText.ru+".": {
            nameText = lessonsInEnglishText[language]
            break;
        }
            case lessonsInRussianText.ru: {
            nameText = lessonsInRussianText[language]
            break;
        }
        case onlineSimultaneousText.ru: {
            descriptionText = f(aboutSimultaneousText[language])
            nameText = onlineSimultaneousText[language]
            break;
        }
        case psychoWebinarsText.ru: {
            nameText = psychoWebinarsText[language]
            break;
        }
        case trainerPlatformProblemsText.ru: {
            descriptionText = technicalProblemsDescriptionText[language]
            nameText = trainerPlatformProblemsText[language]
            break;
        }
        case armenianTrainersText.en: {
            nameText = lessonsInArmenianText[language]
            break;
        }
        case onlineSimultaneousSundayText.ru: {
            nameText = onlineSimultaneousSundayText[language],
                descriptionText = traditionalTournamentsText[language]
            break;
        }
        case adminText.ru: {
            nameText = adminText[language]
            break;
        }
        case trialLessonQuestionsText.ru: {
            nameText = trialLessonQuestionsText[language];
            descriptionText = aboutTrialLessonText[language]
            break;
        }
        case adminPlatformProblemsText.ru: {
            nameText = adminPlatformProblemsText[language];
            break;
        }
        case eduProgramText.ru: {
            nameText = eduProgramText[language];
            break;
        }
        case trialLessonForAdminText.ru: {
            nameText = trialLessonForAdminText[language]
            break;
        }
        case '♥️ ♾️ Ararat international.': {
            const replacedTxt:string = linkTexts.reduce((acc:string, cur) => {
                acc = acc.replace(cur.am, cur[language]).replace(/<a/g,'<a class=\'text-blue-400\'')
                return acc;
            }, groupInfo.description)
            descriptionText = replacedTxt
        }
    }

    const avatar = chat.user.avatar

    const menuHandler = async(name: string) => {
        await dispatch(editChatTag({dialog_id: chat._id, name: name}));
    }

    const ArchiveHandler = (archive: boolean) => {
        setArchiveModal(true);
        setArchive(archive);
    }
    const AnonimHandler = (anonim: boolean) => {
        setAnonimModal(true);
        setAnonim(anonim);
    }
    
    return (
        <>
            {active &&
                <>
                    <div
                        className='w-full max-w-full sm:max-w-[400px] absolute top-0 z-[11] bg-white right-0 h-[calc(100%)] xl:w-[700px] flex flex-col'>
                        {groupMedia
                            ?
                            <>
                                <div
                                    className='bg-[#f0f2f5] border-l-2 flex border-gray-700 pl-1 md:pl-5 py-1 md:py-5 md:h-16 text-white text-xl items-center'>
                                    <IcoButton className='!text-gray-800 hover:!text-white'
                                               onClick={() => setGroupMedia(false)} icon={<AiOutlineArrowLeft/>}/>
                                    <p className='text-gray-800'>{groupMediaText[language]}</p>
                                </div>
                                <GroupMedia messages={chat.messages}/>
                            </>
                            :
                            <>
                                <div
                                    className='relative bg-[#f0f2f5] border-l-2 flex justify-between pl-16 py-1 md:py-5 md:h-16 text-white text-sm md:text-xl items-center'>
                                    <div className='absolute left-2 xl:hidden'>
                                        <IcoButton className='!text-gray-800 hover:!text-black'
                                                   onClick={() => setActive(false)} icon={<BsArrowLeft/>}/>
                                    </div>
                                    <p className='text-gray-800'>{groupDescriptionTitleText[language]}</p>
                                    <div className=' hidden xl:block '>
                                        <IcoButton className='text-black hover:!text-white'
                                                   onClick={() => setActive(false)} icon={<AiOutlineClose/>}/>
                                    </div>
                                </div>
                                <div className="overflow-auto h-full">
                                    <div className="flex flex-col  px-1 md:px-4 h-full">
                                        <div className="flex justify-center relative">
                                            <img
                                                className='w-10 h-10 md:w-20 md:h-20 xl:w-52 xl:h-52 bg-black rounded-full'
                                                src={avatar} alt="avatar"/>
                                            {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                                <div className="flex justify-center items-center">
                                                    <UploadFile accept='.jpg,.jpeg,.png,.webp'
                                                                setFilesHandler={handleEdit} id='avatar-upload'
                                                                theme='dark' multiple={false}/>
                                                </div>
                                            }
                                        </div>
                                        <div className="relative w-full pr-10 mt-2 md:mt-5">
                                            {groupInfoBool.name
                                                ?
                                                <>
                                                    {((user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && !chat.group_id) &&
                                                        <>
                                                            <ContentEditable className='text-sm md:text-2xl mb-3'
                                                                             tagName="h2" html={nameText}
                                                                             onChange={handleChangeName}
                                                                             disabled={false}/>
                                                            <IcoButton onClick={() => handleEdit(undefined)}
                                                                       className='absolute top-0 right-0 !text-gray-900 hover:!text-white !p-2'
                                                                       icon={<BsCheckLg/>}/>
                                                        </>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <p className='whitespace-pre-wrap break-all text-ms md:text-2xl md:mb-3'
                                                       dangerouslySetInnerHTML={{__html: nameText}}></p>
                                                    {((user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && !chat.group_id) &&
                                                        <IcoButton onClick={() => setGroupInfoBool({
                                                            ...groupInfoBool,
                                                            name: true
                                                        })}
                                                                   className='absolute top-0 right-0 !text-gray-900 hover:!text-white !p-2'
                                                                   icon={<AiFillEdit/>}/>
                                                    }
                                                    {(((user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') || user.role === 'ADMIN') && chat.group_id) &&
                                                        <IcoButton onClick={() => setModal(true)}
                                                                   className='absolute top-0 right-0 !text-gray-900 hover:!text-white !p-2'
                                                                   icon={<AiFillEdit/>}/>
                                                    }
                                                </>
                                            }
                                        </div>
                                        <p className='text-sm md:text-lg mb-1 md:mb-3'>{descriptionTitleText[language]}:</p>
                                        <div className="relative w-full pr-10">
                                            {groupInfoBool.description
                                                ?
                                                <>
                                                    {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                                        <>
                                                            <ContentEditable html={descriptionText}
                                                                             onChange={handleChangeDesc}
                                                                             disabled={false}/>
                                                            <IcoButton onClick={() => handleEdit(undefined)}
                                                                       className='absolute top-0 right-0 !text-gray-900 hover:!text-white !p-2'
                                                                       icon={<BsCheckLg/>}/>
                                                        </>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <p className='whitespace-pre-wrap break-all'
                                                       dangerouslySetInnerHTML={{__html: descriptionText}}></p>
                                                    {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                                        <IcoButton onClick={() => setGroupInfoBool({
                                                            ...groupInfoBool,
                                                            description: true
                                                        })}
                                                                   className='absolute top-0 right-0 !text-gray-900 hover:!text-white !p-2'
                                                                   icon={<AiFillEdit/>}/>
                                                    }
                                                </>
                                            }
                                        </div>
                                        <button
                                            className='text-left font-medium text-lg text-gray-500 py-1 md:py-4 flex relative items-center'
                                            onClick={() => setGroupMedia(true)}>{mediaFilesText[language]}
                                            <AiOutlineArrowRight className='ml-4'/></button>
                                        <div className="">
                                        {user.role !== 'STUDENT' &&
                                            <>
                                                {tag?.name !== 'archive' &&
                                                    <Button className='mb-2' onClick={()=> menuHandler('archive')}>{addToGroupsText[language]}</Button>
                                                }
                                                {
                                                    tags.map(ctag=>
                                                        ctag !== 'archive' && ctag !== tag?.name &&
                                                        <Button key={ctag} className='mb-2' onClick={()=>  menuHandler(ctag)}>{addToTagText[language]} {ctag}</Button>
                                                    )
                                                }
                                                <Button className='mb-2' onClick={()=> setNewTagModal(true)}>{createNewCategoryText[language]}</Button>
                                                <Button className='mb-2' onClick={()=> menuHandler('other')}>{tag?.name === 'group' ? removeFromGroupText[language] : removeFromCategoryText[language]}</Button>
                                            </>
                                        }
                                        {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                            <Button className='mb-2' onClick={()=> AnonimHandler(!chat.anonim)}>{chat.anonim ? unAnonymText[language] : toAnonymText[language]}</Button>
                                        }
                                        {
                                            !chat.tagId &&
                                            <>
                                                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN') &&
                                                    <Button className='mb-2' onClick={()=> ArchiveHandler(!isChatArchived)}>{!isChatArchived ? archiveText[language] : unArchiveText[language]}</Button>
                                                }
                                                {((user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && isChatArchived) &&
                                                    <Button className='mb-2' onClick={()=> setRemoveGroupModal(true)}>{deleteText[language]}</Button>
                                                }
                                            </>
                                        }
                                        </div>
                                        { (user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && 
                                            <Button className='mb-2' onClick={() => setModalAutoSMS(true)}>Добавить авто смс</Button>
                                        }
                                        { (user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') && 
                                            <AutoSMSListModal className='mb-2' dialog_id={chat._id} users={chat.users || []}/>
                                        }
                                        <div className={'flex items-center justify-between gap-5 mb-3'}>
                                        {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN') &&
                                            <Button className={'max-w-[250px]'} onClick={() => setModalAdd(true)}>{addUserText[language]}</Button>
                                        }
                                        <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='Поиск...' type='text'/>
                                        </div>
                                        {(!chat.anonim || user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                            <p className='text-lg mb-2'>{usersText[language]}:</p>
                                        }
                                        <div className="flex flex-col max-h-full relative">
                                            {(!chat.anonim || user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                                usersList.map((useritm, id) =>
                                                    <div key={id}
                                                         className='flex items-center justify-between mb-2 md:mb-5'>
                                                        <div className="flex items-center">
                                                            <div className='w-8 md:w-12 mr-3'><img className='w-full'
                                                                                                   src={useritm.avatar}
                                                                                                   alt="avatar"/></div>
                                                            <div className="flex flex-col ">
                                                                <p className={`font-medium ${setRoleColor(useritm.role)}`}>{useritm.name} {useritm.sname}</p>
                                                                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR') &&
                                                                    <>
                                                                        <p className={'text-gray-700'}>{useritm.email}</p>
                                                                        {useritm.lichess &&
                                                                            <a className='text-blue-400'
                                                                               href={useritm.lichess}
                                                                               target='_blank'>@{useritm.lichess.split('@/').pop()}</a>
                                                                        }
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                        {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN') &&
                                                            <div className="flex">
                                                                <Menu>
                                                                    <Menu.Button><IoIosArrowDown/></Menu.Button>
                                                                    <Menu.Items
                                                                        className='z-10 bg-gray-800 rounded-sm h-auto absolute right-0'>
                                                                        <Menu.Item>
                                                                            <button
                                                                                onClick={() => removeHandler(useritm)}
                                                                                className={['hover:bg-gray-700 py-3 px-5 rounded-sm transition-all flex items-center text-white text-sm'].join(' ')}>
                                                                                <span
                                                                                    className='text-xl mr-3'><AiOutlineClose/></span>{removeFromGroupText[language]}</button>
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            <button
                                                                                onClick={() => moveHandler(useritm)}
                                                                                className={['hover:bg-gray-700 py-3 px-5 rounded-sm transition-all flex items-center text-white text-sm'].join(' ')}>
                                                                                <span
                                                                                    className='text-xl mr-3'><CgMoveRight/></span>{moveToAnotherGroupText[language]}</button>
                                                                        </Menu.Item>
                                                                        <Menu.Item>
                                                                            <button
                                                                                onClick={() => {archiveUserHandler(useritm)}}
                                                                                className={['hover:bg-gray-700 py-3 px-5 rounded-sm transition-all flex items-center text-white text-sm'].join(' ')}>
                                                                                <span
                                                                                    className='text-xl mr-3'><FaArchive/></span>{archiveText[language]}
                                                                            </button>
                                                                        </Menu.Item>
                                                                    </Menu.Items>
                                                                </Menu>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            }
                                            <Button onClick={() => setModalFormerChatParticipants(true)} className='mt-2 mb-2'>{viewFormerParticipantsText[language]}</Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <AddUserToGroupModal modal={modalAdd} setModal={setModalAdd}/>
                    <RemoveUserFromChatModal user={modalRemoveInfo.user}
                                              modal={modalRemove} setModal={setModalRemove}/>
                    <MoveUserToChatModal user={modalRemoveInfo.user} modal={modalMove}
                                          setModal={setModalMove}/>
                </>
            }
            {modal && chat.group_id &&
                <CreateFullGroupModal group_id={chat.group_id} modal={modal} setModal={setModal} edit={true}/>
            }
            <FormerChatParticipantsModal 
                active={modalFormerChatParticipants}
                onClose={setModalFormerChatParticipants}
                archivedUsers={chat?.users?.filter(u => u.archive) || []}
                deletedUsers={deletedUsers}
            />
            <ArchiveGroupModal modal={archiveModal} setModal={setArchiveModal} _id={chat._id} archive={archive}/>
            <AnonymGroupModal modal={anonimModal} setModal={setAnonimModal} _id={chat._id} anonym={anonim}/>
            <CreateNewTagModal modal={newTagModal} setModal={setNewTagModal} _id={chat._id}/>
            <RemoveUserModal
                modal={archiveUserModal}
                setModal={setArchiveUserModal}
                _id={modalRemoveInfo.user._id}
                email={modalRemoveInfo.user._id}
                archive={false}
            />
            <RemoveGroupModal modal={removeGroupModal} setModal={setRemoveGroupModal} _id={chat._id}/>
            <AutoSMSModal active={modalAutoSMS} setActive={setModalAutoSMS} dialog_id={chat._id} users={chat.users || []}/>
            
        </>
    )
}

export default GroupInfo;