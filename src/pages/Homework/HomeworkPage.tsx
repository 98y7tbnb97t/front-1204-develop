import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {  useAppDispatch } from '../../hooks/redux';
import { getGroup } from '../../store/reducers/GroupSlice';
import Container from '../../components/Homework/Container';
import { GroupRoomSocket, GroupRoomDisconnectSocket } from '../../sockets/GroupSockets';
import {isDeviceMobile} from "../../utils/getDeviceType.ts";

import "./HomeworkPage.css"
const HomeworkPage: FC = () => {
    const dispatch = useAppDispatch();
    const { groupId } = useParams();
    useEffect(() => {
        const fetchData = async() => {
            if(groupId) {
                await dispatch(getGroup(groupId));
            }
        }
        void fetchData();
    }, [dispatch])  // eslint-disable-line react-hooks/exhaustive-deps

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

    return (
        <div className='w-full relative flex flex-col h-screen'>
            <div className={isDeviceMobile() ? "homework-container" : "flex flex-col h-[calc(100vh-10px)]"}>
                <Container />
            </div>
        </div>
    )
}

export default HomeworkPage;