import { FC, useEffect } from 'react'
import Modal from '../UI/Modal';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { getThemes } from '../../store/reducers/ProgramSlice';
import MainButton from '../UI/MainButton';
import GroupInfo from '../MyGroups/GroupInfo';
import Description from '../MyGroups/Description/Description';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";

interface DescriptionModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
}

const DescriptionModal: FC<DescriptionModalProps> = ({ modal, setModal }) => {
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        goBackToLessonText
    }: {
        goBackToLessonText: ITranslateItemString
    } = translations.lessons

    useEffect(() => {
        const fetchData = async() => {
            await dispatch(getThemes({}))
        }
        void fetchData();
    }, [dispatch])


    return (
        <Modal active={modal} setActive={setModal} className='!max-w-[1600px] max-2xl:!max-w-[1300px] p-0 items-center'>
            <div className="flex flex-col bg-[#F0F0F0] rounded-3xl w-full">
                <GroupInfo />
                <Description/>
                <div className='px-5'>
                <MainButton onClick={() => {setModal(false);}} className='my-5 '>{goBackToLessonText[language]}</MainButton>
            </div>
            </div>
        </Modal>
    )
}

export default DescriptionModal;