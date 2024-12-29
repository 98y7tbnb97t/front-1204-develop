import { FC } from 'react'
import Modal from '../UI/Modal';
import { useAppSelector } from '../../hooks/redux';
import MainButton from '../UI/MainButton';
import History from '../History/History';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface HistoryModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
}

const HistoryModal: FC<HistoryModalProps> = ({ modal, setModal }) => {
    const { group } = useAppSelector(state=> state.GroupSlice);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        goBackToLessonText
    }: {
        goBackToLessonText: ITranslateItemString
    } = translations.lessons


    return (
        <>
            <Modal active={modal} setActive={setModal} className='!max-w-[1600px] max-2xl:!max-w-[1300px] p-0 items-center'>
                <div className="flex flex-col bg-[#F0F0F0] rounded-3xl w-full">
                <div className='m-5 p-5 bg-[#f0f0f0] rounded-xl flex justify-between flex flex-col'>
                    {group &&
                        <History group={group}/>
                    }
                </div>
                    <div className='px-5'>
                    <MainButton onClick={() => {setModal(false);}} className='my-5'>{goBackToLessonText[language]}</MainButton>
                    </div>
                </div>     
            </Modal>
        </>
    )
}

export default HistoryModal;