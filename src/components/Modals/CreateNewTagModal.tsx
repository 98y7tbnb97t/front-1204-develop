import { FC } from 'react'
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useForm, SubmitHandler } from "react-hook-form";
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { editChatTag } from '../../store/reducers/UserSlice';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface CreateNewTagModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    _id: string;
}

type Form = {
    name: string,
};

const CreateNewTagModal: FC<CreateNewTagModalProps> = ({ modal, setModal, _id }) => {
    const { register, handleSubmit, formState: {errors} } = useForm<Form>();
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        createNewTagText,
        tagNameText,
        createTagText
    }: {
        createNewTagText: ITranslateItemString,
        tagNameText: ITranslateItemString,
        createTagText: ITranslateItemString
    } = translations.messenger

    const onSubmit: SubmitHandler<Form> = async (data, e) => {
        e?.preventDefault();
        await dispatch(editChatTag({dialog_id: _id, name: data.name}));
        setModal(false);
    }

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center'>
                <h1 className='text-2xl font-semibold tracking-wider text-gray-800 capitalize '>{createNewTagText[language]}</h1>
                <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className='bg-white container mx-auto flex flex-col px-10 py-5 max-w-2xl'>
                    <Input wrapperClasses='mb-5' type="text" label={`${tagNameText[language]}:`} placeholder={`${tagNameText[language]}:`} error={errors.name?.message} register={register('name', { required: "The field must be filled" })}/>
                    <Button>{createTagText[language]}</Button>
                </form>
            </Modal>
        </>
    )
}

export default CreateNewTagModal;