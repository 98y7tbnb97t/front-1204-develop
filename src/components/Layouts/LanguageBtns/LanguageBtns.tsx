import {FC, useState} from 'react';
import {languages} from "../../../constants.ts";
import { useAppSelector} from "../../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";
import LanguageModal from "../../Modals/LanguageModal.tsx";

interface LanguageBtns {
    className?: string
}

const LanguageBtns: FC<LanguageBtns> = ({className}) =>  {
    const language = useAppSelector(state => state.TranslateSlice.language);
    const [isModalOpened,setIsModalOpened] = useState(false)


    const {
        languageText,
    }: {
        languageText: ITranslateItemString,
    } = translations.profile


    return (
        <div className={`flex gap-2 mb-2  ${className || ""}`}>
            <button
                onClick={() => setIsModalOpened(true)}
                type={'button'}
                className='px-[10px] py-[6px] rounded-[50px] bg-gradient-menu text-white text-[18px] sm:max-w-[200px] w-full text-center  mb-[10px] flex items-center justify-center gap-1'>
                {languageText[language]}
                <span className='flex gap-[5px]'>
                    {
                        Object.values(languages).map(item => (
                            <img src={item.img} alt="language" key={item.text} className='rounded-full w-[20px]'/>
                        ))
                    }
                </span>
            </button>
            <LanguageModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened}/>
        </div>
    );
}

export default LanguageBtns;