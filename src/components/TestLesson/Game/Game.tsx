import { FC, useState } from 'react'
import { Tab } from '@headlessui/react'
import {MdDeleteSweep} from '@react-icons/all-files/md/MdDeleteSweep'

import { useAppSelector } from '../../../hooks/redux';
import User from './User'
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";
import ChatMain from "../../OnlineLesson/Chat/ChatMain.tsx";

interface GameProps {
    moves: Array<{ id: string; user_id: string, name: string; sname: string; moves: Array<{color: string, move: string}>;}>;
    rightPanelMode: string,
    setRightPanelMode: (value: string) => void;
    moveMode: boolean,
    position?: string;
    className?: string;
    materialId: string;
}

const Game: FC<GameProps> = ({moves, rightPanelMode, setRightPanelMode, moveMode, cgame, setGame, position, materialId,className}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        chatText,
        movesText,
    }: {
        chatText: ITranslateItemString,
        movesText: ITranslateItemString,
        finishLessonText: ITranslateItemString,
        lessonSuccessfullyFinishedText: ITranslateItemString
    } = translations.lessons

    const { game } = useAppSelector(state=> state.GroupSlice);
    const { user } = useAppSelector(state=> state.UserSlice);
    const { testUser } = useAppSelector(state=> state.UserSlice);
    const [allClose, setAllClose] = useState<boolean>(false);
  
    return (
        <div className={`flex flex-col flex-1 ${className ? className : ""}`}>
            <Tab.Group>
                <Tab.List as='div' className='pl-5 xl:pl-16 bg-[#e8e1d3] px-3 py-2 rounded-full flex justify-between xl:h-16 z-10'>
                    <Tab className='mr-2 xl:mr-4 rounded-full bg-gradient-button w-full px-2 xl:px-4 py-1 xl:py-3 text-base font-semibold flex justify-center items-center'>{movesText[language]}</Tab>
                    <Tab className='mr-2 xl:mr-4 rounded-full bg-gradient-button w-full px-2 xl:px-4 py-1 xl:py-2 text-base font-semibold flex justify-center items-center'>{chatText[language]}</Tab>
                </Tab.List>
                {(rightPanelMode === 'game' || rightPanelMode === 'none') &&
                    <Tab.Panels as='div' className='relative border-2 border-[#CCC] -mt-8 pl-3 p-5 pt-14 rounded-b-2xl border-t-0 h-full'>
                    <div className={"flex flex-col overflow-auto max-h-[calc(100vh-200px)] "}>
                        <Tab.Panel>
                            <button onClick={()=> {setAllClose(allClose ? false : true); setRightPanelMode('game')}} title='Закрыть удаленные ходы всех учеников' className='cursor-pointer absolute z-10 right-4 text-xl bg-gray-200 p-1 rounded-md text-green-600'><MdDeleteSweep/></button>
                            {game.map(move=> {
                                const i = 0;
                                return (
                                    <>
                                        {user.role !== 'STUDENT'
                                        ?
                                            <User test_user_id={move.user_id} materialId={materialId} allClose={allClose} setAllClose={setAllClose} game={cgame} setGame={setGame} position={position} moveMode={moveMode} key={move.id} move={move} i={i}/>
                                        :
                                            (user._id === move.user_id || testUser._id === move.user_id) &&
                                            <User test_user_id={move.user_id} materialId={materialId} allClose={allClose} setAllClose={setAllClose} game={cgame} setGame={setGame} position={position} moveMode={moveMode} key={move.id} move={move} i={i}/>
                                        }
                                    </>
                                )
                            })}
                        </Tab.Panel>
                        <Tab.Panel><ChatMain/></Tab.Panel>
                    </div>
                </Tab.Panels>
                }
            </Tab.Group>
        </div>
    )
}

export default Game;