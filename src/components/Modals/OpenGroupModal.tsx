import { FC, useEffect, useState } from 'react'
import Modal from '../UI/Modal';
import MainButton from '../UI/MainButton';
import { useForm, SubmitHandler } from "react-hook-form";
import { ServerError } from '../../models/response/ServerError';
import AuthErrorModal from './AuthError';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { addUsersToGroup } from '../../store/reducers/GroupSlice';
import { User } from '../../models/User';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import {roleColors} from "../../utils/userRoles.ts";
import { IGroup } from '../../models/response/IGroup.ts';
import UsersAddSearch from '../Widgets/UsersAddSearch.tsx';
import { createAutoSMS } from '../../store/reducers/AutoSMSSlice.ts';
import { Units } from '../../models/IAutoSMS.ts';
import { getInfoText } from '../../store/reducers/InfoTextsSlice.ts';
import { EInfoTextFields } from '../../models/IInfoTexts.ts';

interface OpenGroupModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    group: IGroup,
}

type Form = {
    emails: string,
};

const OpenGroupModal: FC<OpenGroupModalProps> = ({ modal, setModal, group }) => {
    const dispatch = useAppDispatch();
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const { register, handleSubmit, setValue, formState: {errors} } = useForm<Form>();
    const [users, setUsers] = useState<User[]>([]);
    const { willBePresent, willNotBePresent } = useAppSelector((state) => state.InfoTextsSlice);
    const [dropdown, setDropDown] = useState<boolean>(false);
    const {AutoSMSStartLesson30min, AutoSMSStartLesson120min} = useAppSelector(state => state.InfoTextsSlice);
    const language = useAppSelector(state => state.TranslateSlice.language);
    useEffect(() => {
        void dispatch(getInfoText({ field: EInfoTextFields.AutoSMSStartLesson30min }));
        void dispatch(getInfoText({ field: EInfoTextFields.AutoSMSStartLesson120min }));
        void dispatch(getInfoText({ field: EInfoTextFields.willBePresent }));
        void dispatch(getInfoText({ field: EInfoTextFields.willNotBePresent }));
    }, [dispatch]);

    const onSubmit: SubmitHandler<Form> = async (data, e) => {
        e?.preventDefault();
        if(group._id) {
            await dispatch(addUsersToGroup({emails: data.emails.split(', '), group_id: group._id })).then((res)=> 
            {
                const allUsers = users.filter(u => group.users.every(gu => gu._id !== u._id));
                const indUsers = users.filter(u => group.users.every(gu => gu._id !== u._id) && u.format === 'ind');
                if (allUsers.length) {
                    void dispatch(createAutoSMS({ 
                        group_id: group._id,
                        notifications: [{
                            amount: 30,
                            unit: Units.MINUTES
                        }],
                        text: {
                            ru: AutoSMSStartLesson30min.ru || '',
                            en: AutoSMSStartLesson30min.en || '',
                            am: AutoSMSStartLesson30min.am || '',
                        }, 
                        sendToNotifications: true,
                        title: group.name + ' - напоминание об уроке за 30 минут',
                        enabled: true,
                        usersToSend: allUsers.map(u => u._id),
                        additionalContent: `
                        <div class='flex gap-2 mt-2'>
                                <a
                                    class='px-4 py-2 rounded bg-blue-500 text-white'
                                    href='/messenger/chat/${group.dialog_id}?msg=${encodeURI(`${(willBePresent.ru || '')} \n ${(willBePresent.en || '')} \n ${(willBePresent.am || '')}`)}'
                                >
                                    {{willBeInLesson}}
                                </a>
                                <a
                                    class='px-4 py-2 rounded bg-red-500 text-white'}
                                    href='/messenger/chat/${group.dialog_id}?msg=${encodeURI(`${(willNotBePresent.ru || '')} \n ${(willNotBePresent.en || '')} \n ${(willNotBePresent.am || '')}`)}'
                                >
                                    {{willNotBeInLesson}}
                                </a>
                            </div>
                        `,
                        isPersonal: false
                    }));
                }
                if (indUsers.length) {
                    void dispatch(createAutoSMS({ 
                        group_id: group._id,
                        notifications: [{
                            amount: 2,
                            unit: Units.HOURS
                        }],
                        text: {
                            ru: (AutoSMSStartLesson120min.ru || '').replace('{{чате группы}}', `[чате группы](/messenger/chat/${group.dialog_id})`),
                            en: (AutoSMSStartLesson120min.en || '').replace('{{group chat}}', `[group chat](/messenger/chat/${group.dialog_id})`),
                            am: (AutoSMSStartLesson120min.am || '').replace('{{խմբի չաթ}}', `[խմբի չաթ](/messenger/chat/${group.dialog_id})`),
                        }, 
                        sendToNotifications: true,
                        title: group.name + ' - напоминание об уроке за 120 минут',
                        enabled: true,
                        usersToSend: indUsers.map(u => u._id),
                        additionalContent: `
                        <div class='flex gap-2 mt-2'>
                                <a
                                    class='px-4 py-2 rounded bg-blue-500 text-white'
                                    href='/messenger/chat/${group.dialog_id}?msg=${encodeURI(`${(willBePresent.ru || '')} \n ${(willBePresent.en || '')} \n ${(willBePresent.am || '')}`)}'
                                >
                                    {{willBeInLesson}}
                                </a>
                                <a
                                    class='px-4 py-2 rounded bg-red-500 text-white'}
                                    href='/messenger/chat/${group.dialog_id}?msg=${encodeURI(`${(willNotBePresent.ru || '')} \n ${(willNotBePresent.en || '')} \n ${(willNotBePresent.am || '')}`)}'
                                >
                                    {{willNotBeInLesson}}
                                </a>
                            </div>
                        `,
                        isPersonal: false
                    }));
                }
                setValue('emails', '');
                setModal(false);
                const error = res.payload as ServerError;
                if(error.error) {
                    setEModal(true);
                    setModalError(error.error);
                    setModal(false);
                }
            });
        }
    }

    useEffect(() => {
        if (group.users) {
            setUsers(group.users);
        }
    }, [group.users, setUsers])

    const {
        addUserToGroupText,
        addUserText,
    }: {
        addUserToGroupText: ITranslateItemString,
        emailText: ITranslateItemString,
        addUserText: ITranslateItemString,
    } = translations.groups

    const onChangeUsers = (users: User[]) => {
        setUsers(users);
        setValue('emails', users.map(u => u.email).join(', '));
    }

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center border-2 border-[#8A6E3E] !rounded-3xl'>
                <h1 className='text-2xl font-semibold tracking-wider text-gray-800 capitalize '>{addUserToGroupText[language]}</h1>
                <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}
                      className=' container mx-auto flex flex-col py-5 max-w-2xl'>
                    <input 
                        type="hidden"
                        value={users.map(u => u.email).join(', ')}
                        {...register('emails', {required: "The field must be filled"})}
                    />
                    <UsersAddSearch 
                        chatUsers={users}
                        errors={errors}
                        dropdown={dropdown}
                        setDropDown={setDropDown}
                        onChangeUsers={onChangeUsers}
                    />
                    <MainButton>{addUserText[language]}</MainButton>
                </form>
                <div className={'flex justify-around w-full'}>
                    {
                        Object.values(roleColors).map(item => (
                            <div className={'flex items-center gap-1 mt-2.5'}>
                                <div className={`w-[30px] aspect-square rounded-full bg-${item.color}`}></div>
                                <p className={'dark:text-white'}>{item.text[language]}</p>
                            </div>
                        ))
                    }
                </div>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
        </>
    )
}

export default OpenGroupModal;