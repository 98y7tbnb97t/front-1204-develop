import {FC, useCallback, useState} from 'react'
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import {SubmitHandler, useForm} from "react-hook-form";
import {ServerError} from '../../models/response/ServerError';
import AuthErrorModal from './AuthError';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {addUsersToChat} from '../../store/reducers/MessengerSlice';
import {User} from '../../models/User';
import {translations} from "../../utils/translations.tsx";
import {roleColors} from "../../utils/userRoles.ts";
import UsersAddSearch from '../Widgets/UsersAddSearch.tsx';

interface AddUserToGroupModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
}

type Form = {
    emails: string,
};

const AddUserToGroupModal: FC<AddUserToGroupModalProps> = ({modal, setModal}) => {
    const dispatch = useAppDispatch();
    const chat = useAppSelector(state => state.MessengerSlice.chat)
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm<Form>();
    const {userid} = useParams();
    const [users, setUsers] = useState<User[]>([]);
    const [dropdown, setDropDown] = useState<boolean>(false);
    const language = useAppSelector(state => state.TranslateSlice.language)


    const onSubmit: SubmitHandler<Form> = async (data, e) => {
        e?.preventDefault();
        if (userid) {
            await dispatch(addUsersToChat({emails: data.emails.split(', '), dialog_id: userid})).then((res) => {
                setModal(false)
                setValue('emails', '');
                setDropDown(false);
                const error = res.payload as ServerError;
                if (error.error) {
                    setEModal(true);
                    setModalError(error.error);
                    setModal(false);
                }
            });
        }
    }

    const {
        addUserInGroupText,
        addUserText,
    } = translations.messenger

    const onChangeUsers = useCallback((nusers: User[]) => {
        setUsers(nusers)
        setValue('emails', nusers.map(u => u.email).join(', '))
    }, [setValue])

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center'>
                <h1 className='text-2xl text-center font-semibold tracking-wider text-gray-800 capitalize '>{addUserInGroupText[language]}</h1>
                <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}
                      className='bg-white container mx-auto flex flex-col px-2 py-5 max-w-2xl'>
                    <input 
                        type="hidden"
                        value={users.join(', ')}
                        {...register('emails', {required: "The field must be filled"})}
                    />
                    <UsersAddSearch 
                        chatUsers={chat.users}
                        errors={errors}
                        dropdown={dropdown}
                        setDropDown={setDropDown}
                        onChangeUsers={onChangeUsers}
                    />
                    <Button
                        disabled={!users.length || !users.find(item => getValues().emails.includes(item.email))}
                    >
                        {addUserText[language]}
                    </Button>
                </form>
                <div className={'flex justify-around w-full'}>
                    {
                        Object.values(roleColors).map((item, idx) => (
                            <div key={idx} className={'flex items-center gap-1 mt-2.5'}>
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

export default AddUserToGroupModal;