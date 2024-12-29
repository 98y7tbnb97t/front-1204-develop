import { FC, FormEvent, useCallback, useState } from 'react'
import Modal from '../UI/Modal.tsx';
import Button from '../UI/Button.tsx';
import {useAppSelector} from "../../hooks/redux.ts";
import {translations,ITranslateItemString} from "../../utils/translations.tsx";

interface CommentToDebtorModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    onSubmit: (comment: string, trustLessonForbidden: boolean) => void
}

const CommentToDebtorModal: FC<CommentToDebtorModalProps> = ({ modal, setModal, onSubmit }) => {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [comment, setComment] = useState('');
    const {
        commentsText,
        closeAccessText,
        closeAccessNoTrustText,
    }: {
        commentsText: ITranslateItemString,
        closeAccessText: ITranslateItemString,
        closeAccessNoTrustText: ITranslateItemString,
        noText: ITranslateItemString,
    } = translations.access

    const submit = useCallback((trustLessonForbidden: boolean) => {
        void onSubmit(comment, trustLessonForbidden);
        setComment('');
        setModal(false);
    }, [comment, setModal, onSubmit]);

    const commentChangeHandler = useCallback((e: FormEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        setComment(target.value)
    }, [])

    return (
        <>
            <Modal maxWidth={800} active={modal} setActive={setModal} className='items-center'>
                <h1 className='text-2xl mb-5 font-semibold tracking-wider text-gray-800 capitalize '>{commentsText[language]}</h1>
                <textarea className='mb-2 max-w-lg w-full min-h-48 p-2 mx-3 border-2 border-[#17212B]' onInput={commentChangeHandler} value={comment} />
                <div className="">
                    <Button className='mb-12' onClick={() => submit(false)}>{closeAccessText[language]}</Button>
                    <Button onClick={() => submit(true)}>{closeAccessNoTrustText[language]}</Button>
                </div>
            </Modal>
        </>
    )
}

export default CommentToDebtorModal;