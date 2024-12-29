import {FC, useState} from 'react'
import Title from '../../UI/Title';
import GameMain from "./GameMain.tsx";
import {useAppSelector} from "../../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";
import MovesModal from "../../Modals/MovesModal.tsx";

interface GameProps {
    moves: Array<{
        id: string;
        user_id: string,
        name: string;
        sname: string;
        moves: Array<{ color: string, move: string }>;
    }>;
    rightPanelMode: string,
    setRightPanelMode: (value: string) => void;
    position?: string;
    materialId?: string;
}

const Game: FC<GameProps> = ({rightPanelMode, cgame, setGame, position, materialId}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        movesText
    }: {
        movesText: ITranslateItemString
    } = translations.homework


    return (
        <div className='flex flex-col h-full'>
            <div className='relative'>
                <Title name={movesText[language]} className={'py-[6px]'}/>
            </div>
            {(rightPanelMode === 'game' || rightPanelMode === 'none') &&
                <div className='relative h-full border-2 border-[#CCC]  pl-5 p-5 pt-5 rounded-b-2xl border-t-0'>
                    <GameMain
                        cgame={cgame}
                        setGame={setGame}
                        position={position}
                        materialId={materialId}
                    />
                </div>
            }

        </div>
    )
}

export default Game;