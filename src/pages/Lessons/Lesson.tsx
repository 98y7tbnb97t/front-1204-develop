import { FC, useEffect } from 'react'
import TopMenu from '../../components/UI/TopMenu/TopMenu';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { getGroup } from '../../store/reducers/GroupSlice';
import StudentBoy from '../../assets/studentBoy.png'
import StudentGirl from '../../assets/studentGirl.png'
import Time from '../../assets/icons/time.png'
import Container from '../../components/OnlineLesson/Container';
import { GroupRoomSocket, GroupRoomDisconnectSocket } from '../../sockets/GroupSockets';
import ModalChat from './ModalChat/ModalChat';
import ModalTechChat from './ModalChat/ModalTechChat';
import { socket } from '../../sockets/socket';
import { ChatRoomSocket } from '../../sockets/MessengerSockets';
import { EInfoTextFields } from '../../models/IInfoTexts.ts';
import { getInfoText } from '../../store/reducers/InfoTextsSlice.ts';

const Lesson: FC = () => {
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.TranslateSlice.language);
    const waitForCoachText = useAppSelector(state => state.InfoTextsSlice[EInfoTextFields.waitForCoachText]);
    const { user } = useAppSelector(state => state.UserSlice);
    const { group } = useAppSelector(state => state.GroupSlice);
    const { groupId } = useParams();

    useEffect(() => {
        const fetchData = async() => {
            void dispatch(getInfoText({ field: EInfoTextFields.waitForCoachText }))
            if(groupId) {
                await dispatch(getGroup(groupId));
            }
        }
        void fetchData();
    }, [dispatch, groupId]);

    useEffect(() => {
        if(groupId) {
            GroupRoomSocket(groupId);
        }
        return () => {
            if(groupId) {
                GroupRoomDisconnectSocket(groupId);
            }
        }
    }, [groupId])

    useEffect(() => {
        if(group?.dialog_id) {
            ChatRoomSocket(group?.dialog_id);
        }
    }, [group?.dialog_id, socket])

    useEffect(() => {
        const lessonStartListener = async() => {
            if(groupId) {
                await dispatch(getGroup(groupId));
            }
        }
        socket.on('group:recive_end_lesson', lessonStartListener);
    
        return () => {
            socket.off('group:recive_end_lesson', lessonStartListener);
        };
    }, [])



    return (
        <div className='w-full h-full relative overflow-y-auto'>
            <TopMenu/>
            {group?.open ?
                <div className="w-full">
                    <Container lesson={true}/>
                </div>
                :
                <>
                    <div className="p-[15px]  w-full overflow-y-scroll md:overflow-y-auto relative  bg-white bg-opacity-75 flex flex-col items-center h-full ">
                        <div className="mt-[20px] xl:mt-[0px] bg-white border-2 border-[#B7975A] rounded-lg flex flex-col-reverse md:flex-row items-center px-2 lg:px-10 mb-2 lg:mb-5">
                            <div className="flex flex-col">
                                <div dangerouslySetInnerHTML={{__html: waitForCoachText[language] || ''}}></div>
                            </div>
                            <div className="flex">
                                <div className="w-[70px]"><img src={Time} alt="time" /></div>
                                <div className='ml-5 border-2 rounded-lg p-12 py-8 border-[#CCCCCC] flex flex-col items-center'>
                                    <img className='mb-4 max-w-[150px]' src={user.sex === 'man' ? StudentBoy : StudentGirl} alt="student" />
                                    <p className='text-xl text-center'>{user.name} {user.sname}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col md:flex-row gap-3">
                            <ModalTechChat />
                            <ModalChat />
                        </div>
                    </div>

                </>
            }
        </div>
    )
}

export default Lesson;