import { FC, useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useParams, useNavigate } from 'react-router-dom';
import Program from './Program/Program';
import { IMaterial } from '../../models/Program/IMaterial';
import ChessBoard from '../Homework/ChessBoard'
import Game from './Game/Game';
import { GroupChangeMaterialSocket } from '../../sockets/GroupSockets';
import { IMove } from '../../models/MyGroups/IMove';
import { getHomework } from '../../store/reducers/HomeworkSlice';
import format from 'date-fns/format';
import HomeworkService from '../../services/HomeworkService';
import SuccessModal from '../Modals/SuccessModal';
import MainButton from '../UI/MainButton';
import { Chess } from 'chess.js'
import Modal from '../UI/Modal';
import { useHomework } from '../../utils/useHomework';

import "./Container.css"
import ProgramAndStepsMobileBlock from "./ProgramAndStepsMobileBlock/ProgramAndStepsMobileBlock.tsx";
import {isDeviceMobile} from "../../utils/getDeviceType.ts";
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import { getGroup } from '../../store/reducers/GroupSlice.ts';
import Button from '../UI/Button.tsx';

const Container:FC = () => {
    const dispatch = useAppDispatch();
    const [rightPanelMode, setRightPanelMode] = useState<string>('none');
    const { groupId } = useParams();
    const { group } = useAppSelector(state=> state.GroupSlice);
    const [game, setGame] = useState(new Chess());
    const navigate = useNavigate();
    const [modal, setModal] = useState<boolean>(false);
    const [modal2, setModal2] = useState<boolean>(false);
    const [modal3, setModal3] = useState<boolean>(false);
    const [tranersCommentsModal, setTranersCommentsModal] = useState<boolean>(false);
    const [_, setGlobalMode] = useState<boolean>(false);
    const [program, setProgram] = useState<IMaterial[]>([]);
    const [material, setMaterial] = useState<IMaterial>();
    const [materialName, setMaterialName] = useState<string>('');
    const { user } = useAppSelector(state=> state.UserSlice);
    const { testUser } = useAppSelector(state=> state.UserSlice);
    const { homework } = useAppSelector(state=> state.HomeworkSlice);
    const [moves, setMoves] = useState<IMove[]>([]);
    const {analis} = useHomework(()=> {setModal3(false); setModal(true)}, homework?.group_id?._id, groupId);
    const language = useAppSelector(state => state.TranslateSlice.language)


    const {
        deadlineText,
        sendAnswersToCheckingText,
        haveYouSolvedText,
        returnToTasksText,
        homeworkSuccessfullySentText,
        goToChatText,
        sendHomeworkForCheckingText,
        sendHomeworkForCheckingShortText
    }: {
        deadlineText: ITranslateItemString,
        sendAnswersToCheckingText: ITranslateItemString,
        haveYouSolvedText: ITranslateItemString,
        returnToTasksText: ITranslateItemString,
        homeworkSuccessfullySentText: ITranslateItemString,
        goToChatText: ITranslateItemString,
        sendHomeworkForCheckingText: ITranslateItemString,
        sendHomeworkForCheckingShortText: ITranslateItemString
    } = translations.homework
    const {
        homeworkText
    }: {
        homeworkText: ITranslateItemString
    } = translations.lessons

    useEffect(() => {
        if(user.role !== 'STUDENT') {
            setGlobalMode(true);
        }
        const fetchData = async() => {
            if(groupId) {
                await dispatch(getHomework(groupId));
            }
        }
        void fetchData();
        
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            if(homework?.group_id) {
                await dispatch(getGroup(homework.group_id._id));
            }
        }
        void fetchData();
    }, [homework, groupId, dispatch])

    useEffect(() => {
        if(homework?.program) {
            setProgram(homework?.program);
            setMaterial(homework?.program[0]);
            setMaterialName(homework?.program[0]?.theme_id?.name);
        }
    }, [homework.program])
    
    const PrevBackTheme = (bool: boolean) => {
        const index = program.findIndex(item=> item._id === material?._id);
        if(groupId) {
            if(bool) {
                if(program[index+1]) {
                    setMaterial(program[index+1]);
                    GroupChangeMaterialSocket({room: groupId, material: program[index+1]});
                }
            } else {
                if(program[index-1]) {
                    setMaterial(program[index-1]);
                    GroupChangeMaterialSocket({room: groupId, material: program[index-1]});
                }
            }
        }
    }

    const sendHandler = async () => {
        try {
            if(groupId) {
                if(homework.autocheck) {
                    const {data: {homework}} = await HomeworkService.getHomework(groupId)
    
                    const tasks: { material: string | undefined; fen: string; moves: string[]; type: string}[] = [];
                    for (const item of homework.history) {
                        const program = homework.program.find(itm=> itm._id === item.material);
                        const fen = program?.data.tags.FEN ?? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
                        const type = program?.type ?? '';
                        const moves = item.moves.find(itm=> itm.user_id === user._id)?.moves ?? [];
                        const movesSan = moves.map(mv=> mv.move);
                        if (movesSan.length > 0) {
                            tasks.push({material: item.material, fen: fen, moves: movesSan, type})
                        }
                    }
                    if(tasks.length > 0) {
                        setModal2(false);
                        setModal3(true);
                        await analis(tasks);
                    } else {
                        await HomeworkService.sendHomework(homework?.group_id?._id, groupId)
                        setModal2(false);
                        setModal(true);
                    }
    
                } else {
                    await HomeworkService.sendHomework(homework?.group_id?._id, groupId)
                    setModal2(false);
                    setModal(true);
                }
    
            }
        } catch (e: any) {
            alert(e.message);
            console.error(e);
            throw e;
        }
    }

    const sendHomeworkForCheckingTextCond = isDeviceMobile() ? sendHomeworkForCheckingShortText[language] : sendHomeworkForCheckingText[language]

    const openSendAnswersPopup = () : void => setModal2(true)
    return (
        <>
            <div className="flex m-5 mb-2 rounded-full z-20 top-block">
                <div className="bg-gradient-button flex px-10 items-center w-full h-[108px] rounded-3xl justify-between header">
                    {program &&
                        <div>
                            <p className='text-3xl font-bold mb-2 main-title'>{homeworkText[language]}:</p>
                            <p className='text-2xl font-bold steps-text'>{materialName}</p>
                        </div>
                        
                    }
                    
                    {homework?.end &&
                        <div className="bg-gradient-top-menu px-4 py-2 items-center font-bold text-lg flex flex-col rounded-2xl text-white term-block">
                            <span>{deadlineText[language]} {format(new Date(homework.end), 'd MMM')}</span>

                        </div>
                    }
                </div>
            </div>
            <div className={`flex justify-between flex-1 overflow-auto mx-5 gap-1 ${isDeviceMobile() ? "main-container-mob" : "main-container"}`}>
                <div className="flex flex-col h-full justify-between w-full max-w-[450px] game-container">
                    
                    <Program setTranersCommentsModal={setTranersCommentsModal} homework={true} active={material?._id} setMaterial={setMaterial} setMaterialName={setMaterialName} program={program}/>
                    
                    <button onClick={openSendAnswersPopup} className='mr-3 bg-gradient-button rounded-full my-1 text-lg font-semibold py-2'>{sendHomeworkForCheckingTextCond}</button>
                </div>
                <div className="mx-0 chessboard-container flex flex-col items-center w-full text-center">
                    <ChessBoard game={game} setGame={setGame} movesM={moves} setMoves={setMoves} PrevBackTheme={PrevBackTheme} materialId={material?._id} position={material?.data.tags.FEN ? material?.data.tags.FEN : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
                        type={program[0]?.type}
                    />
                </div>
                <div className="flex flex-col h-full justify-between w-full max-w-[600px] game-container">
                    <Game
                        materialId={material?._id}
                        cgame={game}
                        setGame={setGame}
                        position={material?.data.tags.FEN}
                        rightPanelMode={rightPanelMode}
                        setRightPanelMode={setRightPanelMode}
                        moves={moves}
                    />
                </div>
                <ProgramAndStepsMobileBlock
                    program={program}
                    homework={true}
                    active={material?._id}
                    setMaterial={setMaterial}
                    materialId={material?._id}
                    cgame={game}
                    setGame={setGame}
                    position={material?.data.tags.FEN}
                    rightPanelMode={rightPanelMode}
                    setRightPanelMode={setRightPanelMode}
                    moves={moves}
                    openSendAnswersPopup={openSendAnswersPopup}
                />

                <SuccessModal noclosable={true} modal={modal} setModal={setModal} message={homeworkSuccessfullySentText[language]}>
                    {!testUser._id && <MainButton className='mt-5' onClick={()=> navigate(`/messenger/chat/${group.dialog_id}`)}>{goToChatText[language]}</MainButton>}
                </SuccessModal>
                <Modal active={modal2} setActive={setModal2} className='max-w-[520px] pt-[35px]'>
                    <h1 className='sm:text-2xl text-[16px] dark:text-white font-bold mb-5 text-center'>{haveYouSolvedText[language]}</h1>
                    <div className="flex">
                        <MainButton onClick={()=> void sendHandler()} className='mr-5 !bg-gradient-button-green !text-[16px] !sm:text-xl'>{sendAnswersToCheckingText[language]}</MainButton>
                        <MainButton
                            className={'!text-[16px] !sm:text-xl'}
                            onClick={()=> setModal2(false)}>{returnToTasksText[language]}</MainButton>
                    </div>
                </Modal>
                
                <Modal noclosable={true} active={modal3} setActive={setModal3} className='max-w-[520px]'>
                    <h1 className='text-2xl font-bold mb-5 text-center'>Идет отправка дз, не закрывайте вкладку до завершения процесса.</h1>
                </Modal>
                <Modal className='p-4' active={tranersCommentsModal} setActive={setTranersCommentsModal}>
                    <div dangerouslySetInnerHTML={{__html: homework.tranersComment || ''}} className='text-lg'></div>
                </Modal>
            </div>
        </>
    )
}

export default Container;