import { FC, PropsWithChildren, useState } from 'react'
import Modal from '../UI/Modal';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import Button from '../UI/Button.tsx';
import { Link } from 'react-router-dom';
import PermissionsService, { IPayload } from '../../services/PermissionsService.ts';

import { editUserAccess, editTrustLesson } from '../../store/reducers/UserSlice.ts';

interface DebtorWarningModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    className?: string;
}

const DebtorWarningModal: FC<PropsWithChildren<DebtorWarningModalProps>> = ({ modal, setModal, className }) => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [sModal, setSModal] = useState<boolean>(false);
    const { user } = useAppSelector(
        (state) => state.UserSlice,
      );
    const dispatch = useAppDispatch();
    const {
        debtorWarningText,
        goToRequizitesText,
        writeToAdminPlatformText,
        writeToAdminWhatsUpText,
        takeTrustLessonText,
        trustLessonTakenText,
        trustLessonOpenedText,
        debtorNotificationText,
        commentsFromAdminText,
    }: {
        debtorWarningText: ITranslateItemString,
        goToRequizitesText: ITranslateItemString,
        writeToAdminPlatformText: ITranslateItemString,
        writeToAdminWhatsUpText: ITranslateItemString,
        takeTrustLessonText: ITranslateItemString,
        trustLessonTakenText: ITranslateItemString,
        trustLessonOpenedText: ITranslateItemString,
        debtorNotificationText: ITranslateItemString,
        commentsFromAdminText: ITranslateItemString,
    } = translations.access

    const addTrustLesson = async () => {
        if (user.trustLesson === null) {
            await PermissionsService.setRole(user._id, { trustLesson: true, access: true } as IPayload).then(()=> {setSModal(true); setModal(false);});
            dispatch(editUserAccess(true))
            dispatch(editTrustLesson(true))
            setSModal(true)
        }
    }

    return (
        <>
            <Modal maxWidth={1000} active={modal} setActive={setModal} className={['items-center', className].join(' ')}>
                <p className='text-lg dark:text-[#c7c7c7] text-center'>{debtorWarningText[language]}</p>
                <p className='text-lg dark:text-[#c7c7c7] text-center mt-2'>{debtorNotificationText[language]}</p>
                {
                    user.commentToDebtor && (
                        <>
                            <p className='text-lg dark:text-[#c7c7c7] mb-3 border-2 border-red-600 mt-4 p-2'><span className='font-medium'>{commentsFromAdminText[language]}</span> - {user.commentToDebtor}</p>
                        </>
                    )
                }
                <Link to="/balance" className='mt-5'>
                    <Button>
                        {goToRequizitesText[language]}
                    </Button>
                </Link>
                <Link to="/messenger/chat/651c1e9fbfbc95c1f9d7f8b8" className='mt-2'>
                    <Button>
                        {writeToAdminPlatformText[language]}
                    </Button>
                </Link>
                <Link to="https://web.whatsapp.com/send/?phone=37499553191" className='mt-2'>
                    <Button>
                        {writeToAdminWhatsUpText[language]}
                    </Button>
                </Link>
                {
                    !user.trustLessonForbidden && (
                        <>
                            <Button onClick={addTrustLesson} className='mt-5 max-w-[700px]'>
                                {takeTrustLessonText[language]}
                            </Button>
                            {
                                user.trustLesson !== null && (
                                    <p className='text-lg dark:text-[#c7c7c7] text-center'>{trustLessonTakenText[language]} {new Date(user.trustLessonDates?.at(-1) || '').toLocaleString()}</p>
                                )
                            }
                        </>
                    )
                }
                
            </Modal>
            <Modal maxWidth={1000} active={sModal} setActive={setSModal}>
                <p className='text-lg dark:text-[#c7c7c7] text-center'>{trustLessonOpenedText[language]}</p>
                <Link to="/balance" className='mt-5'>
                    <Button>
                        {goToRequizitesText[language]}
                    </Button>
                </Link>
                <Link to="/messenger/chat/651c1e9fbfbc95c1f9d7f8b8" className='mt-2'>
                    <Button>
                        {writeToAdminPlatformText[language]}
                    </Button>
                </Link>
                <Link to="https://web.whatsapp.com/send/?phone=37499553191" className='mt-2'>
                    <Button>
                        {writeToAdminWhatsUpText[language]}
                    </Button>
                </Link>
            </Modal>
        </>
    )
}

export default DebtorWarningModal;