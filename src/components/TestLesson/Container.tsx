import { Chess } from 'chess.js';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Theory from '../../components/OnlineLesson/Theory/Theory';
import ChessBoard from '../../components/OnlineLesson/ChessBoard/ChessBoard';
import Game from '../../components/TestLesson/Game/Game';
import Program from '../../components/TestLesson/Program/Program';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IMove } from '../../models/MyGroups/IMove';
import { IMaterial } from '../../models/Program/IMaterial';
import TestLessonService from '../../services/TestLessonService';
import {
  GroupChangeMaterialSocket,
  GroupEntryModeSocket,
  GroupFullCleanSocket,
  GroupUpdateSocket,
} from '../../sockets/GroupSockets';
import { socket } from '../../sockets/socket';
import { editUserName, getTestGroup, setMovesState } from '../../store/reducers/GroupSlice';
import {ITranslateItemString, translations} from '../../utils/translations.tsx';
import Modal from '../UI/Modal.tsx';
import { editTestUserNameAuth } from '../../store/reducers/UserSlice.ts';

interface ContainerProps {
  program: IMaterial[];
  setProgram: Dispatch<SetStateAction<IMaterial[]>>;
  setLessonStarted: (lessonStarted: boolean) => void;
  lessonStarted: boolean;
}

const Container: FC<ContainerProps> = ({program, setProgram, setLessonStarted, lessonStarted}) => {
  const dispatch = useAppDispatch();
  const [rightPanelMode, setRightPanelMode] = useState<string>('none');
  const { groupId } = useParams();
  const [game, setGame] = useState(new Chess());
  const [moveMode, setmoveMode] = useState<boolean>(false);
  const [globalMode, setGlobalMode] = useState<boolean>(false);
  const [material, setMaterial] = useState<IMaterial>();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { testUser } = useAppSelector((state) => state.UserSlice);
  const { group } = useAppSelector((state) => state.GroupSlice);
  const [moves, setMoves] = useState<IMove[]>([]);
  const [clear, setClear] = useState<boolean>(false);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {
    clearChaptersText,
    turnOffMoveModeText,
    turnOnMoveModeText,
    clearStudentOptionsText,
    endTestLessonText
  }: {
    clearChaptersText: ITranslateItemString,
    turnOffMoveModeText: ITranslateItemString,
    turnOnMoveModeText: ITranslateItemString,
    clearStudentOptionsText: ITranslateItemString,
    endTestLessonText: ITranslateItemString,
  } = translations.lessons;
  
  useEffect(() => {
    // if(user.role !== 'STUDENT') {
    //     setGlobalMode(true);
    // }
    const fetchData = async () => {
      if (groupId) {
        await dispatch(getTestGroup(groupId));
      }
    };
    void fetchData();
  }, [groupId]);

  useEffect(() => {
    setmoveMode(group?.moveMode);
  }, [group?.moveMode]);

  useEffect(() => {
    if (group?.program) {
      setProgram(group?.program);
      if (group.current) {
        const cond = group?.program.findIndex((e) => e._id === group.current);
        if (cond !== -1) {
          setMaterial(group?.program[cond]);
        } else {
          setMaterial(group?.program[0]);
        }
      }
    }
  }, [group?.program]);

  useEffect(() => {
    const reciveMoveHandler = (data: {
      user_id: string;
      color: string;
      move: string;
    }) => {
      dispatch(setMovesState(data));
    };
    socket.on('group:recive_change_material', (data: IMaterial) => {
      setMaterial(data);
    });
    socket.on('group:recive_make_move', reciveMoveHandler);
    socket.on('group:recive_entry_mode', (data: boolean) => {
      setmoveMode(data);
    });
    socket.on('group:recive_update', async (data: string) => {
      await dispatch(getTestGroup(data));
    });
    socket.on("group:recive_user_edit", (data: {user_id: string, name: string, sname: string}) => {
      dispatch(editUserName(data));
      dispatch(editTestUserNameAuth({name: data.name, sname: data.sname}));
    })
    socket.on('group:recive_end_lesson', () => {
      if (lessonStarted) {
        setGlobalMode(false);
        setIsModalVisible(true);
        setLessonStarted(false);
      } else {
        setLessonStarted(true);
      }
    });
    socket.on(
      'group:recive_global_mode',
      (data: { user_id: string; bool: boolean }) => {
        if (user._id === data.user_id || testUser._id === data.user_id) {
          setmoveMode(data.bool)
          setGlobalMode(data.bool);
        }
      },
    );

    return () => {
      socket.off('group:recive_make_move', reciveMoveHandler);
    };
  }, []);

  const isStudent = user.role === 'STUDENT' || !!testUser._id;

  const moveModeHandler = async () => {
    setmoveMode(moveMode ? false : true);
    setGlobalMode(!moveMode);
    groupId &&
      GroupEntryModeSocket({ room: groupId, bool: moveMode ? false : true });
    groupId &&
      (await TestLessonService.editGroup(groupId, {
        moveMode: moveMode ? false : true,
      }));
  };

  const PrevBackTheme = (bool: boolean) => {
    const index = program.findIndex((item) => item._id === material?._id);
    if (groupId) {
      if (bool) {
        if (program[index + 1]) {
          setMaterial(program[index + 1]);
          GroupChangeMaterialSocket({
            room: groupId,
            material: program[index + 1],
          });
        }
      } else {
        if (program[index - 1]) {
          setMaterial(program[index - 1]);
          GroupChangeMaterialSocket({
            room: groupId,
            material: program[index - 1],
          });
        }
      }
    }
  };

  const clearProgramHandler = async () => {
    if (groupId) {
      await TestLessonService.editGroup(groupId, { program: [] });
      await dispatch(getTestGroup(groupId));
      GroupUpdateSocket({ room: groupId });
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Закрываем модалку
  };

  return (
    <>
    <div className="pt-2">
      <div className="flex m-5 mb-2 max-2xl:m-0 rounded-full z-20"></div>
      <div className="flex p-0"></div>
      <div className="flex justify-between mx-5 h-[calc(100vh-240px)] max-2xl:h-[calc(100vh-70px)] flex-col sm:flex-row ">
        <div
          className={`${
            isStudent ? 'md:block hidden' : ''
          } flex flex-col h-full justify-start w-full max-w-[450px] max-2xl:max-w-[330px]`}
        >
          <Program
            active={material?._id}
            setMaterial={setMaterial}
            program={program}
          />
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER' ||
            user.role === 'TRANERMETODIST') && (
            <button
              className="basis-[55%] w-full bg-gradient-button rounded-full my-4 max-h-[50px] text-lg font-semibold py-2 max-2xl:text-sm"
              onClick={() => void clearProgramHandler()}
            >
              {clearChaptersText[language]}
            </button>
          )}
          {/*{!isStudent && <Chat/>}*/}
        </div>
        <div className="w-full lg:w-fit mx-0 flex flex-col items-center text-center h-full">
          {material?.data.tags.FEN ? (
            <ChessBoard
              game={game}
              setGame={setGame}
              custom={material?.custom}
              type={material?.type}
              moveMode={moveMode}
              globalMode={globalMode}
              clear={clear}
              setClear={setClear}
              movesM={moves}
              setMoves={setMoves}
              PrevBackTheme={PrevBackTheme}
              materialId={material?._id}
              position={material?.data.tags.FEN}
            />
          ) : (
            <ChessBoard
              game={game}
              setGame={setGame}
              custom={material?.custom}
              type={material?.type}
              moveMode={moveMode}
              globalMode={globalMode}
              clear={clear}
              setClear={setClear}
              movesM={moves}
              setMoves={setMoves}
              PrevBackTheme={PrevBackTheme}
              materialId={material?._id}
              position={
                'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
              }
            />
          )}
        </div>
        <div className="flex flex-col h-full justify-between w-full max-w-[600px] max-2xl:max-w-[430px]">
          {material && (
            <Theory
              rightPanelMode={rightPanelMode}
              setRightPanelMode={setRightPanelMode}
              theory={material}
            />
          )}
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER' ||
            user.role === 'TRANERMETODIST') && (
            <div className="w-full flex justify-between  items-start">
              <button
                className="basis-[45%] mr-3 bg-gradient-button rounded-full my-1 text-lg font-semibold py-2 max-2xl:text-sm"
                onClick={() => moveModeHandler()}
              >
                {moveMode
                  ? turnOffMoveModeText[language]
                  : turnOnMoveModeText[language]}
              </button>
              <button
                className="basis-[55%] w-full bg-gradient-button rounded-full my-1 text-lg font-semibold py-2 max-2xl:text-sm"
                onClick={() => {
                  setClear(true),
                    groupId && GroupFullCleanSocket({ room: groupId });
                }}
              >
                {clearStudentOptionsText[language]}
              </button>
            </div>
          )}
          <Game
            cgame={game}
            setGame={setGame}
            position={material?.data.tags.FEN}
            moveMode={moveMode}
            rightPanelMode={rightPanelMode}
            setRightPanelMode={setRightPanelMode}
            moves={moves}
            className="flex-114"
          />
        </div>
      </div>
      {isModalVisible && (
        <Modal active={isModalVisible} setActive={setIsModalVisible}>
          <p className='text-center text-lg font-bold p-3'>{endTestLessonText[language]}</p>
        </Modal>
      )}
    </div>
    </>
  );
};

export default Container;
