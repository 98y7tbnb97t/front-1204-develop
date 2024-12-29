import {FC} from 'react';
import {languages} from "../../constants.ts";
import Modal from "../UI/Modal.tsx";
import {changeLanguage, Elanguages} from "../../store/reducers/TranslateSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";

interface LanguageModalProps {
    isModalOpened: boolean,
    setIsModalOpened: (val: boolean) => void
}

const LanguageModal: FC<LanguageModalProps> = ({isModalOpened, setIsModalOpened}) => {
    const dispatch = useAppDispatch()
    const language: string = useAppSelector(state => state.TranslateSlice.language);

    const onLangChange = (lang: Elanguages) => {
        dispatch(changeLanguage(lang))
    }

    return (
        <Modal active={isModalOpened} setActive={setIsModalOpened}>
            <div className='flex flex-col gap-[10px] items-center py-[20px]'>
                {
                    Object.values(languages).map(({text, img, name}) => (
                        <button
                            type={'button'}
                            key={text}
                            className={` min-w-[220px] bg-gradient-button bg-transparent cursor-pointer border-blue-500 rounded-full flex justify-start items-center gap-[5px]  ${language === text ? 'border-[3px]' : "border-0"}`}
                            onClick={() => onLangChange(text)}
                        >
                            <img src={img} alt={text} className='w-[40px] rounded-full aspect-square'/>
                            <span className='text-[20px] flex-1 text-center'>{name}</span>
                        </button>
                    ))
                }
            </div>
        </Modal>
    );
}

export default LanguageModal;