import { FC, useState } from 'react'
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { ServerError } from '../../models/response/ServerError';
import AuthErrorModal from './AuthError';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {ITranslateItemArray, ITranslateItemString, translations} from "../../utils/translations.tsx";
import {removeUserFromChat} from "../../store/reducers/MessengerSlice.ts";
import { User } from '../../models/User.ts';

interface RemoveUserFromChatModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    user: User;
}

const RemoveUserFromChatModal: FC<RemoveUserFromChatModalProps> = ({ modal, setModal, user }) => {
    const dispatch = useAppDispatch()
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const {userid} = useParams();
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        removeUserFromGroupText,
        sureAboutDeleteText,
        yesText,
        noText
    }: {
        removeUserFromGroupText: ITranslateItemString,
        sureAboutDeleteText: ITranslateItemArray,
        yesText: ITranslateItemString,
        noText: ITranslateItemString
    } = translations.messenger

    const Submit = async () => {
        if(userid) {
            await dispatch(removeUserFromChat({user, dialog_id: userid}))
                .then(_ => {
                    setModal(false)
                })
                .catch((e: AxiosError) => {
                    const event = e.response?.data as ServerError;
                        setModalError(event.error)
                        setEModal(true);
                })
        }
    }

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center'>
                <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize '>{removeUserFromGroupText[language]}</h1>
                <p className='mb-5 text-center'>{sureAboutDeleteText[language][0]} {user.email} {sureAboutDeleteText[language][1]}</p>
                <div className="flex items-center">
                    <Button className='mr-5' onClick={()=> void Submit()}>{yesText[language]}</Button>
                    <Button onClick={()=>setModal(false)}>{noText[language]}</Button>
                </div>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
        </>
    )
}

export default RemoveUserFromChatModal;