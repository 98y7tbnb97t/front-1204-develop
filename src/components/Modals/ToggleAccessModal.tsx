import { FC, useState } from 'react'
import Modal from '../UI/Modal.tsx';
import Button from '../UI/Button.tsx';
import AuthErrorModal from './AuthError.tsx';
import PermissionsService, { IPayload } from '../../services/PermissionsService.ts';
import SuccessModal from './SuccessModal.tsx';
import {useAppSelector} from "../../hooks/redux.ts";
import {translations,ITranslateItemString} from "../../utils/translations.tsx";
import CommentToDebtorModal from './CommentToDebtorModal.tsx';
import { socket } from '../../sockets/socket.ts';

interface ToggleAccessModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    email: string | undefined,
    _id: string,
    access: boolean,
    onToggleAccess?: (id: string) => void
}

const ToggleAccessModal: FC<ToggleAccessModalProps> = ({ modal, setModal, email, _id, access, onToggleAccess }) => {
    const [modalError] = useState<string>('');
    const [eModal, setEModal] = useState<boolean>(false);
    const [sModal, setSModal] = useState<boolean>(false);
    const [cModal, setCModal] = useState<boolean>(false);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        closeAccess,
        sureCloseAccess,
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

    const Submit = async (comment: string, trustLessonForbidden: boolean) => {
        await PermissionsService.setRole(_id, { access: !access, trustLesson: null, commentToDebtor: comment, trustLessonForbidden } as IPayload).then(()=> {setSModal(true); setModal(false);});
        if (access) {
            socket.emit('user:admin_closed_access', _id);
        }
        if(onToggleAccess) onToggleAccess(_id);
    }

    const toggleAccess = () => {
        if (access !== false) {
            setCModal(true);
        } else {
            void Submit('', false);
        }
    }

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center'>
                <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize '>{access === false ? openAccess[language] : closeAccess[language]}</h1>
                <p className='mb-5 text-center'>{access === false ? sureOpenAccess[language] : sureCloseAccess[language]} {email} ?</p>
                <div className="flex items-center">
                    <Button className='mr-5' onClick={toggleAccess}>{yesText[language]}</Button>
                    <Button onClick={()=>setModal(false)}>{noText[language]}</Button>
                </div>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
            <SuccessModal modal={sModal} setModal={setSModal} message={access === false ? 'Access opened successfully!' : 'Access closed successfully!'}/>
            <CommentToDebtorModal modal={cModal} setModal={setCModal} onSubmit={(message: string, trustLessonForbidden: boolean) => void Submit(message, trustLessonForbidden)}/>
        </>
    )
}

export default ToggleAccessModal;