import { FC, useState } from 'react'
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { ServerError } from '../../models/response/ServerError';
import AuthErrorModal from './AuthError';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { editChat } from '../../store/reducers/MessengerSlice';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface AnonymGroupModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    _id: string,
    anonym: boolean;
}

const AnonymGroupModal: FC<AnonymGroupModalProps> = ({ modal, setModal, _id, anonym }) => {
    const dispatch = useAppDispatch();
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        sureAnonymText,
        toAnonymText,
        unAnonymText,
        yesText,
        noText,
        sureUnAnonymText
    }: {
        sureAnonymText: ITranslateItemString,
        toAnonymText: ITranslateItemString,
        unAnonymText: ITranslateItemString,
        yesText: ITranslateItemString,
        noText: ITranslateItemString,
        sureUnAnonymText: ITranslateItemString,
    } = translations.access

    const Submit = async () => {
        if(_id) {
            const response = await dispatch(editChat({dialog_id: _id, anonim: anonym}));
            const res = response.payload as ServerError;
            if(res?.error) {
                setEModal(true);
                setModalError(res.error)
            } else {
                setModal(false);
            }
        }
    }

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center'>
                <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize '>{anonym ? toAnonymText[language] : unAnonymText[language]}</h1>
                <p className='mb-5 text-center'>{anonym ? sureAnonymText[language] : sureUnAnonymText[language]}</p>
                <div className="flex items-center">
                    <Button className='mr-5' onClick={()=> void Submit()}>{yesText[language]}</Button>
                    <Button onClick={()=>setModal(false)}>{noText[language]}</Button>
                </div>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
        </>
    )
}

export default AnonymGroupModal;