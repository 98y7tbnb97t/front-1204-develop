import { FC, useState, useCallback } from 'react'
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';
import { useForm, SubmitHandler } from "react-hook-form";
import { createChat } from '../../store/reducers/MessengerSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { ServerError } from '../../models/response/ServerError';
import {User} from '../../models/User';
import AuthErrorModal from './AuthError';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import UsersAddSearch from '../Widgets/UsersAddSearch.tsx';
import CheckBox from '../UI/Main/Checkbox/CheckBox.tsx';

interface CreateGroupModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
}

type Form = {
    name: string,
    description: string,
    emails: string,
    showNames: boolean
};

const CreateGroupModal: FC<CreateGroupModalProps> = ({ modal, setModal }) => {
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const { register, handleSubmit, formState: {errors}, setValue } = useForm<Form>();
    const dispatch = useAppDispatch();
    const [dropdown, setDropDown] = useState<boolean>(false);
    const [isAnonym, setIsAnonym] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);
    const language = useAppSelector(state => state.TranslateSlice.language)
    const {
        createAnonimGroupText,
        createSimpleGroupText,
        createGroupText,
        descriptionTitleText,
        nameText,
        usersSeeNames
    }: {
        createAnonimGroupText: ITranslateItemString,
        createSimpleGroupText: ITranslateItemString,
        createGroupText: ITranslateItemString,
        descriptionTitleText: ITranslateItemString,
        nameText: ITranslateItemString,
        usersSeeNames: ITranslateItemString
    } = translations.messenger

    const onSubmit: SubmitHandler<Form> = async (data, e) => {
        e?.preventDefault();
        const response = await dispatch(createChat({emails: data.emails.split(', '), name: data.name, description: data.description, anonim: isAnonym, showNames: data.showNames}));
        const res = response.payload as ServerError;
        if(res?.error) {
            setEModal(true);
            setModalError(res.error)
        } else {
            setModal(false);
        }
    }

    const onChangeUsers = useCallback((nusers: User[]) => {
        setUsers(nusers)
        setValue('emails', nusers.map(u => u.email).join(', '))
    }, [setValue])

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center'>
                <div className="flex gap-2">
                    <Button className={!isAnonym ? 'ring-opacity-50 ring-gray-300 ring' : ''} onClick={() => setIsAnonym(false)}>{createSimpleGroupText[language]}</Button>
                    <Button className={isAnonym ? 'ring-opacity-50 ring-gray-300 ring' : ''} onClick={() => setIsAnonym(true)}>{createAnonimGroupText[language]}</Button>
                </div>
                <h1 className='text-2xl mr-3 md:mr-0 font-semibold tracking-wider text-gray-800 capitalize '>{createGroupText[language]}</h1>
                <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className='bg-white container mx-auto flex flex-col px-10 py-5 max-w-2xl'>
                    <Input wrapperClasses='mb-5' type="text" label={`${nameText[language]}:`} placeholder={nameText[language]} error={errors.name?.message} register={register('name', { required: "The field must be filled" })}/>
                    <Textarea wrapperClasses='mb-5' label={`${descriptionTitleText[language]}:`} placeholder={descriptionTitleText[language]} error={errors.description?.message} register={register('description', { required: "The field must be filled" })}/>
                    <input 
                        type="hidden"
                        value={users.join(', ')}
                        {...register('emails')}
                    />
                    <UsersAddSearch
                        errors={errors}
                        dropdown={dropdown}
                        setDropDown={setDropDown}
                        onChangeUsers={onChangeUsers}
                    />
                    {isAnonym &&
                        <CheckBox label={usersSeeNames[language]} wrapperClass='mb-2' register={register('showNames')}/>
                    }
                    <Button>{isAnonym ? createAnonimGroupText[language] : createSimpleGroupText[language]}</Button>
                </form>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
        </>
    )
}

export default CreateGroupModal;