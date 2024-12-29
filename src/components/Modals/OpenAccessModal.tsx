import { FC, useState } from 'react'
import Modal from '../UI/Modal.tsx';
import Button from '../UI/Button.tsx';
import AuthErrorModal from './AuthError.tsx';
import PermissionsService, { IPayload } from '../../services/PermissionsService.ts';
import SuccessModal from './SuccessModal.tsx';
import {useAppSelector} from "../../hooks/redux.ts";
import {translations,ITranslateItemString} from "../../utils/translations.tsx";

interface OpenAccessModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    _id: string,
    onOpenAccess?: (id: string) => void
}

const OpenAccessModal: FC<OpenAccessModalProps> = ({ modal, setModal, _id, onOpenAccess }) => {
    const [modalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const [sModal, setSModal] = useState<boolean>(false);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        openAccess,
        sureOpenAccess,
        yesText,
        noText,
    }: {
        openAccess: ITranslateItemString,
        sureOpenAccess: ITranslateItemString,
        closeAccess: ITranslateItemString,
        sureCloseAccess: ITranslateItemString,
        yesText: ITranslateItemString,
        noText: ITranslateItemString,
    } = translations.access

    const Submit = async () => {
        await PermissionsService.setRole(_id, { access: true, trustLesson: null, trustLessonForbidden: false } as IPayload).then(()=> {setSModal(true); setModal(false);});
        if(onOpenAccess) onOpenAccess(_id);
    }

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center'>
                <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize '>{openAccess[language]}</h1>
                <p className='mb-5 text-center'>{sureOpenAccess[language] }</p>
                <div className="flex items-center">
                    <Button className='mr-5' onClick={Submit}>{yesText[language]}</Button>
                    <Button onClick={()=>setModal(false)}>{noText[language]}</Button>
                </div>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
            <SuccessModal modal={sModal} setModal={setSModal} message={'Access opened successfully!'}/>
        </>
    )
}

export default OpenAccessModal;