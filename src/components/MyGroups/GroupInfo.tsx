import { FC, useState, useEffect, useCallback } from 'react'
import { useBasePath } from '../../hooks/useBasePath';
import { useAppSelector } from '../../hooks/redux';
import { AiOutlineEdit } from '@react-icons/all-files/ai/AiOutlineEdit'
import EditGroupDescriptionModal from '../Modals/EditGroupDescriptionModal';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { getGroup } from '../../store/reducers/GroupSlice';
import SuccessModal from '../Modals/SuccessModal';
import MainButton from '../UI/MainButton';
import OpenGroupModal from '../Modals/OpenGroupModal';
import CreateFullGroupModal from '../Modals/CreateFullGroupModal';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import { FaArchive } from '@react-icons/all-files/fa/FaArchive';
import { FaHistory } from '@react-icons/all-files/fa/FaHistory';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { CgMoveRight } from '@react-icons/all-files/cg/CgMoveRight';
import { Menu } from '@headlessui/react';
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import MoveUserToGroupModal from '../Modals/MoveUserToGroupModal.tsx';
import RemoveUserFromGroupModal from '../Modals/RemoveUserFromGroupModal.tsx';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import ArchiveRemoveGroupModal from '../Modals/ArchiveRemoveGroupModal.tsx';
import { UserRoles } from '../../utils/userRoles.ts';
import RemoveUserModal from '../Modals/RemoveUserModal.tsx';
import EditSubstituteTranerCommentModal from '../Modals/EditSubstituteTranerCommentModal.tsx';
import TestLessonHistoryModal from '../Modals/TestLessonHistoryModal.tsx';

const GroupInfo:FC<{openChat?: (bool: boolean) => void; chat?: boolean}> = ({openChat, chat}) => {
    const path = useBasePath();
    const navigate = useNavigate();
    const language = useAppSelector(state => state.TranslateSlice.language)
    const { user } = useAppSelector(state=> state.UserSlice);
    const { group } = useAppSelector(state=> state.GroupSlice);
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [modal3, setModal3] = useState<boolean>(false);
    const [modal4, setModal4] = useState<boolean>(false);
    const [archiveGroupModal, setArchiveGroupModal] = useState<boolean>(false);
    const [archiveUserModal, setArchiveUserModal] = useState<boolean>(false);
    const [substituteTranerCommentModal, setSubstituteTranerCommentModal] = useState<boolean>(false);
    const [modalRemoveInfo, setModalRemoveInfo] = useState<{ _id: string, email: string }>({_id: '', email: ''});
    const [modalMove, setModalMove] = useState<boolean>(false);
    const [modalRemove, setModalRemove] = useState<boolean>(false);
    const [message] = useState<string>('');
    const [close] = useState<boolean>(false);
    const { groupId } = useParams();
    const [testLessonHistoryModal, setTestLessonHistoryModal] = useState<boolean>(false);
    const [testUserId, setTestUserId] = useState<string>('');
    const dispatch = useAppDispatch();

    const {
        addStudentText,
        groupDescriptionText,
        openGroupChatText,
        sendHomeworkText,
        substituteTranerComment
    }: {
        addStudentText: ITranslateItemString,
        groupDescriptionText: ITranslateItemString,
        openGroupChatText: ITranslateItemString,
        sendHomeworkText: ITranslateItemString,
        substituteTranerComment: ITranslateItemString
    } = translations.groups

    const {
        removeFromGroupText,
        moveToAnotherGroupText,
        archiveText
    } = translations.messenger

    useEffect(() => {
        const fetchData = async() => {
            if(groupId) {
                await dispatch(getGroup(groupId));
            }
        }
        void fetchData();
    }, [dispatch])  // eslint-disable-line react-hooks/exhaustive-deps

    const removeUserFromGroupHandler = useCallback((email: string) => {
        if (group.users) {
            const studentsCount = group.users.reduce<number>((prev, curr) => {
                if(curr.role === UserRoles.STUDENT && email !== curr.email) {
                    return prev + 1;
                }
                return prev;
            }, 0)
    
            if (studentsCount === 0) {
                setArchiveGroupModal(true)
            }
        }
    }, [group.users])

    const removeHandler = (_id: string, email: string) => {
        setModalRemoveInfo({_id: _id, email: email});
        setModalRemove(true);
    }

    const moveHandler = (_id: string, email: string) => {
        setModalRemoveInfo({_id: _id, email: email});
        setModalMove(true);
    }

    const archiveHandler = (_id: string, email: string) => {
        setModalRemoveInfo({_id: _id, email: email});
        setArchiveUserModal(true);
    }

    const testLessonHistoryHandler = (testUserId: string) => {
        setTestUserId(testUserId);
        setTestLessonHistoryModal(true);
    }

    return (
        <div className='m-2 lg:m-5 p-2 sm:p-5 bg-[#f0f0f0] rounded-xl flex flex-col 2xl:flex-row justify-between'>
            <div className=" ml-auto 2xl:ml-none">
                <ul className='flex gap-4 lg:gap-0 flex-wrap w-full lg:w-[730px]'>
                    {group?.users &&
                        group.users.map(groupUser =>
                            (groupUser.role !== 'TRANER' && groupUser.role !== 'ADMIN' && groupUser.role !== 'DIRECTOR' && groupUser.role !== 'ZDIRECTOR') &&
                            <li key={groupUser._id} className='mb-3 ml-auto lg:mr-3 border-2 border-[#C4C4C4] rounded-full relative flex justify-center items-center text-2xl font-semibold px-2 py-2 lg:basis-[calc(50%-15px)]'>
                                    {groupUser.name} {groupUser.sname}
                                    {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN') &&
                                        <Menu>
                                        <Menu.Button className={'ml-3 self-end'}><IoIosArrowDown/></Menu.Button>
                                        <Menu.Items
                                            className='z-10 bg-gray-800 rounded-sm h-auto absolute bottom-0 translate-y-full'>
                                            <Menu.Item>
                                                <button
                                                    onClick={() => removeHandler(groupUser._id, groupUser.email)}
                                                    className={['hover:bg-gray-700 py-3 px-5 rounded-sm transition-all flex items-center text-white text-sm'].join(' ')}>
                                                    <span
                                                        className='text-xl mr-3'><AiOutlineClose/></span>{removeFromGroupText[language]}</button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button
                                                    onClick={() => moveHandler(groupUser._id, groupUser.email)}
                                                    className={['hover:bg-gray-700 py-3 px-5 rounded-sm transition-all flex items-center text-white text-sm'].join(' ')}>
                                                    <span
                                                        className='text-xl mr-3'><CgMoveRight/></span>{moveToAnotherGroupText[language]}</button>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button
                                                    onClick={() => {archiveHandler(groupUser._id, groupUser.email)}}
                                                    className={['hover:bg-gray-700 py-3 px-5 rounded-sm transition-all flex items-center text-white text-sm'].join(' ')}>
                                                    <span
                                                        className='text-xl mr-3'><FaArchive/></span>{archiveText[language]}
                                                </button>
                                            </Menu.Item>
                                            {/* {groupUser.test_user_id && <Menu.Item>
                                                <button
                                                    onClick={() => {testLessonHistoryHandler(groupUser.test_user_id)}}
                                                    className={['hover:bg-gray-700 py-3 px-5 rounded-sm transition-all flex items-center text-white text-sm'].join(' ')}>
                                                    <span className='text-xl mr-3'><FaHistory/></span>История пробного урока
                                                </button>
                                            </Menu.Item>} */}
                                        </Menu.Items>
                                    </Menu>
                                    }
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="flex flex-col items-end">
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN')
                    ?
                    <button onClick={()=> setModal2(true)} className='bg-gradient-button p-3 text-2xl font-semibold rounded-full py-4 px-12 mb-5 flex items-center'>{group?.name || ""}<AiOutlineEdit className='ml-3'/></button>
                    :
                    <div className='bg-gradient-button text-lg md:text-2xl font-semibold rounded-full py-4 px-4 lg:px-12 mb-5 text-right'>{group.name}</div>
                }
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN' || user.role === 'TRANER') &&
                    <button onClick={()=> setSubstituteTranerCommentModal(true)} className='bg-gradient-button text-2xl font-semibold rounded-full py-2 sm:py-4 px-4 sm:px-12 mb-5 flex items-center'>
                        {substituteTranerComment[language]} <br/>
                        { (group.substituteTranerCommentBy && group.substituteTranerCommentAt) && (
                            <>
                                {group.substituteTranerCommentBy?.name} {group.substituteTranerCommentBy?.sname}, {new Date(group.substituteTranerCommentAt || '').toLocaleString()}
                            </>
                        ) }
                    </button>
                }
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN' || user.role === 'TRANER') &&
                    <button onClick={()=> setModal(true)} className='bg-gradient-button text-2xl font-semibold rounded-full py-2 sm:py-4 px-4 sm:px-12 mb-5 flex items-center'>{groupDescriptionText[language]}</button>
                }
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN') &&
                    <button className='bg-gradient-button text-2xl font-semibold rounded-full py-2 sm:py-4 px-4 sm:px-12' onClick={() => void setModal4(true)}>{addStudentText[language]}</button>
                }
                {path === '/group' &&
                    !chat &&
                    <button className='mt-5 bg-gradient-button text-2xl font-semibold rounded-full py-2 sm:py-4 px-4 sm:px-12' onClick={() => void openChat?.(true)}>{openGroupChatText[language]}</button>
                }
                {path === '/group' &&
                    <Link 
                    to={user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR'?`/session/${groupId || ''}/create`:`/session/${groupId || ''}`}
                     className='mt-5 bg-gradient-button text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-appricot flex items-center'>
                        <span className="text-red-600">(не готово)</span>
                        Создать Сеанс <AiOutlinePlus className="ml-3" /></Link>
                }
                {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN' || user.role === 'TRANER') &&
                    <Link 
                    to={`/Tournament/${groupId}`}
                     className='mt-5 bg-gradient-button text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-appricot flex items-center'>
                        <span className="text-red-600">(не готово)</span>
                        Создать Турнир <AiOutlinePlus className="ml-3" /></Link>
                }
            </div>
            {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN' || user.role === 'TRANER') &&
                <EditGroupDescriptionModal modal={modal} setModal={setModal}/>
            }
            {(user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN' || user.role === 'TRANER') &&
                <EditSubstituteTranerCommentModal modal={substituteTranerCommentModal} setModal={setSubstituteTranerCommentModal}/>
            }
            {((user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' || user.role === 'ADMIN') && modal2) &&
                <CreateFullGroupModal modal={modal2} setModal={setModal2} edit={true}/>
            }
            <SuccessModal modal={modal3} setModal={setModal3} message={message}>
                {close &&
                    <MainButton className='mt-5' onClick={()=> groupId && navigate('/group/'+groupId+'/homework/add')}>{sendHomeworkText[language]}</MainButton>
                }
            </SuccessModal>
            <OpenGroupModal modal={modal4} setModal={setModal4} group={group}/>
            <RemoveUserFromGroupModal 
                _id={modalRemoveInfo._id} email={modalRemoveInfo.email}
                modal={modalRemove} 
                setModal={setModalRemove}
                onRemove={removeUserFromGroupHandler}
            />
            <MoveUserToGroupModal _id={modalRemoveInfo._id} email={modalRemoveInfo.email} modal={modalMove}
                                    setModal={setModalMove}/>
            <RemoveUserModal
                modal={archiveUserModal}
                setModal={setArchiveUserModal}
                email={modalRemoveInfo.email}
                _id={modalRemoveInfo._id}
                archive={false}
            />
            <ArchiveRemoveGroupModal modal={archiveGroupModal} setModal={setArchiveGroupModal} action={'archive'} groupInfo={{_id: group._id, name: group.name }} />
            <TestLessonHistoryModal active={testLessonHistoryModal} setActive={setTestLessonHistoryModal} testUserId={testUserId} />
        </div>
    )
}

export default GroupInfo;