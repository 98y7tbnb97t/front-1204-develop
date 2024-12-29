import { FC, useState } from 'react'
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { ServerError } from '../../models/response/ServerError';
import AuthErrorModal from './AuthError';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {ITranslateItemArray, ITranslateItemString, translations} from "../../utils/translations.tsx";
import {removeUserFromGroup} from "../../store/reducers/GroupSlice.ts";
import RemoveUserModal from './RemoveUserModal.tsx';

interface RemoveUserFromGroupModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    email: string,
    _id: string,
    onRemove?: (email: string) => void,
}

const RemoveUserFromGroupModal: FC<RemoveUserFromGroupModalProps> = ({ modal, setModal, email, _id, onRemove }) => {
    const dispatch = useAppDispatch()
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const {groupId, userid} = useParams();
    const [archiveModal, setArchiveModal] = useState<boolean>(false);
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
        if(groupId || userid) {
            // await DialogService.removeUserFromChat(_id, userid)
            //     .then(()=> setModal(false))
            //     .catch((e: AxiosError)=> {
            //     const event = e.response?.data as ServerError;
            //     setModalError(event.error)
            //     setEModal(true);
            // });
            await dispatch(removeUserFromGroup({email, group_id: (groupId || userid) as string}))
                .then(data => {
                    if (data.payload.userWithoutGroups) {
                        setArchiveModal(true)
                    }
                    onRemove?.(email)
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
                <p className='mb-5 text-center'>{sureAboutDeleteText[language][0]} {email} {sureAboutDeleteText[language][1]}</p>
                <div className="flex items-center">
                    <Button className='mr-5' onClick={()=> void Submit()}>{yesText[language]}</Button>
                    <Button onClick={()=>setModal(false)}>{noText[language]}</Button>
                </div>
            </Modal>
            <RemoveUserModal
                modal={archiveModal}
                setModal={setArchiveModal}
                email={email}
                _id={_id}
                archive={false}
            />
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
        </>
    )
}

export default RemoveUserFromGroupModal;