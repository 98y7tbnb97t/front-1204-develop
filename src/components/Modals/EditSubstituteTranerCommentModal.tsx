import { FC, useState, useEffect } from 'react'
import Modal from '../UI/Modal';
import Textarea from '../UI/Main/Textarea';
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from '../../hooks/redux';
import { ServerError } from '../../models/response/ServerError';
import AuthErrorModal from './AuthError';
import MainButton from '../UI/MainButton';
import GroupService from '../../services/GroupService';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface EditSubstituteTranerCommentModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
}

type Form = {
    comment: string,
};

const EditSubstituteTranerCommentModal: FC<EditSubstituteTranerCommentModalProps> = ({ modal, setModal }) => {
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const language = useAppSelector(state => state.TranslateSlice.language)
    const { group } = useAppSelector(state => state.GroupSlice);
    const {groupId} = useParams();

    const {  register, setValue, handleSubmit, formState: {errors} } = useForm<Form>();
    useEffect(() => {
        if(group?.substituteTranerComment) {
            setValue('comment', group?.substituteTranerComment);
        }
    }, [group, setValue])
    const onSubmit: SubmitHandler<Form> = async (data, e) => {
        e?.preventDefault();
        if(groupId) {
            await GroupService.editGroup(groupId, {substituteTranerComment: data.comment}).then(()=> setModal(false)).catch((e: AxiosError)=> {
                const event = e.response?.data as ServerError;
                setModalError(event.error)
                setEModal(true);
            });
        }
    }

    const {
        substituteTranerComment,
        closeText,
        saveText,
    }: {
        substituteTranerComment: ITranslateItemString,
        closeText: ITranslateItemString,
        saveText: ITranslateItemString,
    } = translations.groups

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center max-w-[600px] !rounded-3xl border-2 border-[#8A6E3E]'>
                <h1 className='text-2xl font-bold tracking-wider text-gray-800 capitalize '>{substituteTranerComment[language]}</h1>
                <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className='bg-white container mx-auto flex flex-col px-5 py-5 max-w-2xl'>
                    <Textarea className='min-h-[150px]' wrapperClasses='mb-2' placeholder={substituteTranerComment[language]} error={errors.comment?.message} register={register('comment', { required: "The field must be filled" })}/>
                    { (group.substituteTranerCommentBy && group.substituteTranerCommentAt) && (
                            <>
                                {group.substituteTranerCommentBy?.name} {group.substituteTranerCommentBy?.sname}, {new Date(group.substituteTranerCommentAt || '').toLocaleString()}
                            </>
                    ) }
                    <div className="flex justify-end mt-5">
                        <MainButton type='button' onClick={()=>setModal(false)} className='mr-5 !px-10'>{closeText[language]}</MainButton>
                        <MainButton className='!px-10 bg-gradient-button-green'>{saveText[language]}</MainButton>
                    </div>
                </form>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
        </>
    )
}

export default EditSubstituteTranerCommentModal;