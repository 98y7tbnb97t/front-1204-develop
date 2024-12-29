import { FC, useState } from 'react'
import Modal from '../UI/Modal';
import { ServerError } from '../../models/response/ServerError';
import AuthErrorModal from './AuthError';
import SuccessModal from './SuccessModal';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { editGroup, deleteGroup } from '../../store/reducers/GroupSlice';
import MainButton from '../UI/MainButton';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface ArchiveRemoveGroupModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    action: string,
    groupInfo: {_id: string, name: string},
}

const ArchiveRemoveGroupModal: FC<ArchiveRemoveGroupModalProps> = ({ modal, setModal, action, groupInfo }) => {
    const [modalError, setModalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const [sModal, setSModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        sureArchiveGroupText,
        archiveGroupText,
        unArchiveGroupText,
        yesText,
        noText,
        sureUnArchiveGroupText,
        deleteGroupText,
        sureDeleteGroupText
    }: {
        sureArchiveGroupText: ITranslateItemString,
        archiveGroupText: ITranslateItemString,
        unArchiveGroupText: ITranslateItemString,
        yesText: ITranslateItemString,
        noText: ITranslateItemString,
        sureUnArchiveGroupText: ITranslateItemString,
        deleteGroupText: ITranslateItemString,
        sureDeleteGroupText: ITranslateItemString
    } = translations.access
    const Submit = async () => {
        if(action === 'archive' || action === 'unarchive') {
            let tmp = false;
            if(action === 'archive') {
                tmp = true;
            }
            const response = await dispatch(editGroup({groupId: groupInfo._id, payload: {archive: tmp}}));
            const res = response.payload as ServerError;
            if(res?.error) {
                setEModal(true);
                setModalError(res.error)
            } else {
                setModal(false);
            }
        } else if(action === 'remove') {
            const response = await dispatch(deleteGroup({groupId: groupInfo._id}));
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
            <Modal active={modal} setActive={setModal} className='items-center !rounded-3xl border-2 border-[#8A6E3E]'>
                <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize '>{action === 'archive' && archiveGroupText[language]}{action === 'unarchive' && unArchiveGroupText[language]}{action === 'remove' && deleteGroupText[language]}</h1>
                <p className='mb-5 text-center'>{action === 'archive' && sureArchiveGroupText[language]}{action === 'unarchive' && sureUnArchiveGroupText[language]}{action === 'remove' && sureDeleteGroupText[language]} {groupInfo.name}?</p>
                <div className="flex items-center">
                    <MainButton className='mr-5' onClick={()=> void Submit()}>{yesText[language]}</MainButton>
                    <MainButton onClick={()=>setModal(false)}>{noText[language]}</MainButton>
                </div>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
            <SuccessModal modal={sModal} setModal={setSModal} message={'Group '+ (action==='archive' ? 'archived' : action === 'unarchive' ? 'unarchived' : 'removed') + ' successfully!'}/>
        </>
    )
}

export default ArchiveRemoveGroupModal;