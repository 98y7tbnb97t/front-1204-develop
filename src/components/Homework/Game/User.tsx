import {FC, useEffect, useState} from 'react'
import {IMove} from '../../../models/MyGroups/IMove';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {BsPlusLg} from '@react-icons/all-files/bs/BsPlusLg'
import {BsUiChecksGrid} from '@react-icons/all-files/bs/BsUiChecksGrid'
import {clearFullUserMoves, clearUserMoves, setMovesState} from '../../../store/reducers/HomeworkSlice';
import HomeworkService from '../../../services/HomeworkService';
import {useParams} from 'react-router-dom';
import {isDeviceMobile} from "../../../utils/getDeviceType.ts";

import "./User.css"
import Wb from "../../../assets/pawns/Wb.svg";
import Bb from "../../../assets/pawns/Bb.svg";
import Wq from "../../../assets/pawns/Wq.svg";
import Bq from "../../../assets/pawns/Bq.svg";
import Wn from "../../../assets/pawns/Wn.svg";
import Bn from "../../../assets/pawns/Bn.svg";
import Wk from "../../../assets/pawns/Wk.svg";
import Bk from "../../../assets/pawns/Bk.svg";
import Wr from "../../../assets/pawns/Wr.svg";
import Br from "../../../assets/pawns/Br.svg";
import Wp from "../../../assets/pawns/Wp.svg";
import Bp from "../../../assets/pawns/Bp.svg";
import {getGameMove, setMove} from "../../../utils/gameMoves.ts";

interface UserProps {
    move: IMove;
    position?: string;
    materialId?: string;
}


const User: FC<UserProps> = ({move, game, setGame, position, materialId}) => {
    let i = 0;
    const [turn, setTurn] = useState<string>('');
    const {user} = useAppSelector(state => state.UserSlice);
    const homework = useAppSelector(state => state.HomeworkSlice);
    const dispatch = useAppDispatch();
    const {groupId} = useParams();
    useEffect(() => {
        setTurn(game.turn());
    }, [position])

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = {...g};
            modify(update);
            return update;
        });
    }

    const removeMovesHandler = async () => {
        safeGameMutate((game) => {
            game.load(position);
        });
        if (groupId) {
            if (homework.game[0].moves.length > 0) {
                await HomeworkService.editHomework(groupId, {
                    material: materialId,
                    deleted: {user_id: user._id, moves: [homework.game[0].moves]}
                });
            }
        }
        dispatch(clearUserMoves(user._id));
    }

    const makeMainVariant = async (item) => {
        dispatch(clearFullUserMoves(user._id));
        const gameCopy = {...game};
        gameCopy.load(position);
        item.map(move => {
            gameCopy.move(move.move);
            dispatch(setMovesState({
                user_id: user._id,
                name: user.name,
                sname: user.sname,
                color: move.color,
                move: move.move
            }));
        })
        setGame(gameCopy);
        if (groupId) {
            await HomeworkService.editHomework(groupId, {
                material: materialId,
                deleted: {user_id: user._id, moves: [homework.game[0].moves]},
                move: {user_id: user._id, name: user.name, sname: user.sname, moves: [...item]},
                movesHistory: game.history()
            });
        }

    }
    return (
        <div key={move.id} className="mb-1">
            <p className={`font-bold flex flex-wrap text-lg break-all text-[#353535] relative ${isDeviceMobile() ? "studentTest-text" : ""}`}>
                <span className='text-[#8A6E3E] mr-2'>{move.name} {move.sname}: </span>
                {move.deleted &&
                    <>
                        {move.deleted.map((item) => {
                            let i = 0;
                            return (
                                <>
                                    <div className="flex flex-wrap "><p
                                        className='text-sm bg-apricot mt-1 rounded-lg py-[1px] mr-2 mb0'>Прошлый
                                        вариант:</p>
                                        {
                                            item.map(move => {
                                                move.color === 'w' && i++;
                                                return (
                                                    <p className={['mr-1 mt-1 text-sm rounded-lg px-1 py-[1px] bg-apricot line-through'].join(' ')}>{move.color === 'w' && i.toString() + '. '}{move.move}</p>
                                                )
                                            })
                                        }
                                    </div>
                                    <button onClick={() => makeMainVariant(item)} title='Сделать вариант основным'
                                            className="bg-green-400 cursor-pointer ml-2 w-6 h-6 p-[1px] text-base mt-1 rounded-md flex justify-center items-center text-white">
                                        <BsUiChecksGrid/></button>
                                    <div className="basis-full"></div>
                                </>
                            )
                        })}
                        <div className="basis-full"></div>
                    </>
                }
                <div className='flex flex-wrap gap-1'>
                    {[0].map(() => {
                        if (turn === 'b') {
                            i++
                            return (
                                <p className={['w-full sm:max-w-[85px] max-w-[70px] sm:text-[16px] text-[12px] rounded-lg px-2 py-[1px'].join(' ')}>{i.toString() + '. '}...</p>
                            )
                        }
                    })}
                    {move.moves.map((move) => {
                        move.color === 'w' && i++;

                        const {peaceName,imgSrc} = getGameMove(move)
                        return (
                            <p className='w-full sm:max-w-[85px] max-w-[70px]'>
                                <p className={['flex items-center sm:text-[16px] whitespace-nowrap text-[12px] w-fit mr-1 mt-1 rounded-lg px-2 py-[1px]', move.color === 'w' ? '' : 'bg-gradient-button shadow-md'].join(' ')}>
                                    {move.color === 'w' && i.toString() + '. '}
                                    <img src={imgSrc} width={17}/>
                                    {peaceName}
                                </p>
                            </p>
                        )
                    })}
                </div>
                <button onClick={() => removeMovesHandler()} title='Добавить новый варинат'
                        className="bg-orange-400 cursor-pointer ml-3 w-7 h-7 p-1 mt-1 rounded-md flex justify-center items-center text-white text-2xl">
                    <BsPlusLg/></button>
            </p>
        </div>
    )
}

export default User;