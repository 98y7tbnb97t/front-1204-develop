import { FC, useState } from 'react'
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import AuthErrorModal from './AuthError';
import PermissionsService from '../../services/PermissionsService';
import SuccessModal from './SuccessModal';
import {useAppSelector} from "../../hooks/redux.ts";
import {translations,ITranslateItemString} from "../../utils/translations.tsx";

interface RemoveUserModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    email: string | undefined,
    _id: string,
    archive: boolean,
    onArchive?: (id: string) => void
}

const RemoveUserModal: FC<RemoveUserModalProps> = ({ modal, setModal, email, _id, archive,onArchive }) => {
    const [modalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const [sModal, setSModal] = useState<boolean>(false);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        sureArchiveText,
        archiveUserText,
        unArchiveUserText,
        yesText,
        noText,
        sureUnArchiveText
    }: {
        sureArchiveText: ITranslateItemString,
        archiveUserText: ITranslateItemString,
        unArchiveUserText: ITranslateItemString,
        yesText: ITranslateItemString,
        noText: ITranslateItemString,
        sureUnArchiveText: ITranslateItemString,
    } = translations.access


    const Submit = async () => {
        await PermissionsService.setRole(_id,{ archive: !archive}).then(()=> {setSModal(true); setModal(false);});
        if(onArchive) onArchive(_id)
    }

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center'>
                <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize '>{archive? unArchiveUserText[language] : archiveUserText[language]}</h1>
                <p className='mb-5 text-center'>{archive ? sureUnArchiveText[language] : sureArchiveText[language]} {email} ?</p>
                <div className="flex items-center">
                    <Button className='mr-5' onClick={()=> void Submit()}>{yesText[language]}</Button>
                    <Button onClick={()=>setModal(false)}>{noText[language]}</Button>
                </div>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
            <SuccessModal modal={sModal} setModal={setSModal} message='User archiver successfully!'/>
        </>
    )
}

export default RemoveUserModal;