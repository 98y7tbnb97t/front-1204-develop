import { FC, PropsWithChildren } from 'react'
import Modal from '../UI/Modal';
import { BsCheckCircle } from "@react-icons/all-files/bs/BsCheckCircle";
import {useAppSelector} from "../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface SuccessModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    message: string,
    noclosable?: boolean;
    title?: string;
    className?: string;
}

const SuccessModal: FC<PropsWithChildren<SuccessModalProps>> = ({ modal, title, setModal, className, message, children, noclosable }) => {
    const language = useAppSelector(state => state.TranslateSlice.language)


    const {
        successText
    }: {
        successText: ITranslateItemString
    } = translations.lessons

    return (
        <Modal noclosable={noclosable} active={modal} setActive={setModal} className={['items-center', className].join(' ')}>
            <BsCheckCircle className='text-green-500 text-8xl mb-3'/>
            <h2 className='text-3xl dark:text-white font-medium mb-3 text-center'>{title ? title : successText[language]}</h2>
            <p className='text-lg dark:text-[#c7c7c7] text-center'>{message}</p>
            {children}
        </Modal>
    )
}

export default SuccessModal;