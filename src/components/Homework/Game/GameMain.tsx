import {FC, useState} from 'react'
import { useAppSelector } from '../../../hooks/redux';
import User from './User'
import Title from '../../UI/Title';


import "./GameMain.css"
import MovesModal from "../../Modals/MovesModal.tsx";
import {isDeviceMobile} from "../../../utils/getDeviceType.ts";
import {translations} from "../../../utils/translations.tsx";
import AboutMovesBtn from "../AboutMovesBtn.tsx";

interface GameProps {
    moves: Array<{ id: string; user_id: string, name: string; sname: string; moves: Array<{color: string, move: string}>;}>;
    rightPanelMode: string,
    setRightPanelMode: (value: string) => void;
    position?: string;
    materialId?: string;
}

const GameMain: FC<GameProps> = ({  cgame, setGame, position, materialId }) => {
    const { game } = useAppSelector(state=> state.HomeworkSlice);

    return (
        <>
            <div className={[`flex flex-col justify-between overflow-auto h-[calc(100vh-300px)] ${!isDeviceMobile() ? 'game-main' : 'game-main-mob'}`].join(' ')}>
                <div>
                    {game.map(move => {
                        return (
                            <User materialId={materialId} game={cgame} setGame={setGame} position={position}
                                  move={move}/>
                        )
                    })}
                </div>

            </div>
            <AboutMovesBtn className={'hidden sm:flex'}/>
        </>
    )
}

export default GameMain;