import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TopMenuTestLesson from '../../components/UI/TopMenu/TopMenuTestLesson';
import { ITopMenuOnlineLesson } from '../../models/ITopMenu';
import Container from '../../components/TestLesson/Container';
import { GroupRoomSocket, GroupRoomDisconnectSocket } from '../../sockets/GroupSockets';
import { registrationTestUser } from '../../store/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Modal from '../../components/UI/Modal';
import { useForm, SubmitHandler } from "react-hook-form";
import Input from '../../components/UI/Main/Input';
import MainButton from '../../components/UI/MainButton';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import { IMaterial } from '../../models/Program/IMaterial.ts';
import IJitsiMeetExternalApi from '@jitsi/react-sdk/lib/types/IJitsiMeetExternalApi';

type Form = {
    name: string,
    sname: string,
};

const TestLesson: FC = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<Form>();
    const {groupId} = useParams();
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=> state.UserSlice);
    const {testUser} = useAppSelector(state=> state.UserSlice);
    const [modal, setModal] = useState<boolean>(true);
    const language = useAppSelector(state => state.TranslateSlice.language);
    const [error, setError] = useState<string>('');
    const [program, setProgram] = useState<IMaterial[]>([]);
    const { userNameAlreadyExistsText } = translations.testLesson;
    const {
        programText
    }: {
        programText: ITranslateItemString
    } = translations.groups
    const [api, setApi] = useState<IJitsiMeetExternalApi|null>(null);
    const [lessonStarted, setLessonStarted] = useState<boolean>(false);

    useEffect(() => {
        const createGroup = async () => {
            // await TestLessonService.createGroup().then(resp=> {
            //     if(resp.data.group._id) {
            //         navigate('/testlesson/'+resp.data.group._id, {state: {from: location}, replace: true})
            //     }
            // });
        }
        void createGroup();
    }, [])

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
        setMenu([
            {id: 0, name: programText[language], openProgram: true},
        ])
    }, [language]);

    const onSubmit: SubmitHandler<Form> = async (data, e) => {
        e?.preventDefault();
        const res = await dispatch(registrationTestUser({name: data.name, sname: data.sname, test_lesson_id: groupId || ''}));
        if (res.type === 'userSlice/registrationTestUser/rejected') {
            return setError(userNameAlreadyExistsText[language]);
        }
        setModal(false);
    }

    const [menu,setMenu] = useState<ITopMenuOnlineLesson[]>([
        {id: 0, name: programText[language], openProgram: true}, // eslint-disable-line @typescript-eslint/restrict-template-expressions
    ])

    return(
        <div className='w-full'>
            <div className={`${!user.role || user.role === 'STUDENT' ? 'hidden md:block' : ""}`}>
                <TopMenuTestLesson menu={menu} program={program} api={api} setApi={setApi} lessonStarted={lessonStarted} setLessonStarted={setLessonStarted}/>
            </div>
            {(!user.role && !testUser.name) &&
                <Modal noclosable={true} active={modal} setActive={setModal}>
                    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className='bg-white container mx-auto flex flex-col px-10 py-5'>
                        <h1 className='text-2xl font-bold text-center mb-5'>Напишите имя ученика</h1>
                        <Input wrapperClass='mb-5' type="text" placeholder='Имя' error={errors.name?.message} register={register('name', { required: "The field must be filled" })}/>
                        <Input wrapperClass='mb-5' type="text" placeholder='Фамилия' error={errors.sname?.message} register={register('sname', { required: "The field must be filled" })}/>
                        {error && <p className='text-red-500 text-center mb-5'>{error}</p>}
                        <MainButton>Сохранить</MainButton>
                    </form>
                </Modal>
            }
            {(user.name || testUser.name) &&
                <Container program={program} setProgram={setProgram} setLessonStarted={setLessonStarted} lessonStarted={lessonStarted}/>
            }
        </div>
    )
}

export default TestLesson;