import {FC, useState} from 'react';
import MovesModal from "../Modals/MovesModal.tsx";
import {useAppSelector} from "../../hooks/redux.ts";
import {translations} from "../../utils/translations.tsx";

const AboutMovesBtn:FC<{className?: string}> = ({className}) =>  {
    const language = useAppSelector(state => state.TranslateSlice.language)
    const [movesModalOpened,setMovesModalOpened] = useState<boolean>(false)
    const {whoseMoveText} = translations.homework

    const openMovesModal = ():void => setMovesModalOpened(true)
    const closeMovesModal = ():void => setMovesModalOpened(false)

    return (
        <>
            <p
                onClick={openMovesModal}
                className={`text-blue-700 cursor-pointer font-medium text-[14px] flex justify-end pt-[4px] ${className || ""}`}
            >{whoseMoveText[language]}</p>
            <MovesModal active={movesModalOpened} onClose={closeMovesModal}/>
        </>
    );
}

export default AboutMovesBtn;