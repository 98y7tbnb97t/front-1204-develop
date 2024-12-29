import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import { ITranslateItemString, translations } from '../../utils/translations';
import { Chess } from 'chess.js';
import { format } from 'date-fns';
import { useAppSelector } from '../../hooks/redux';
import { IMove } from '../../models/MyGroups/IMove';
import { IMaterial } from '../../models/Program/IMaterial';
import { isDeviceMobile } from '../../utils/getDeviceType';
import ChessBoard from '../Homework/ChessBoard';
import ProgramAndStepsMobileBlock from '../Homework/ProgramAndStepsMobileBlock/ProgramAndStepsMobileBlock';
import Game from '../OnlineLesson/Game/Game';
import Program from '../OnlineLesson/Program/Program';
import TestLessonService from '../../services/TestLessonService';
import { IHomework } from '../../models/IHomwork';
import { ITestLesson } from '../../models/ITestLesson';

export interface TestLessonHistoryModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  testUserId: string;
}

const TestLessonHistoryModal: React.FC<TestLessonHistoryModalProps> = ({ active, setActive, testUserId }) => {
  const [rightPanelMode, setRightPanelMode] = useState<string>('none');
  const [game, setGame] = useState(new Chess());
  const [homeworkProgram, setHomeworkProgram] = useState<IMaterial[]>([]);
  const [homeworkMaterial, setHomeworkMaterial] = useState<IMaterial>();
  const [homeworkMaterialName, setHomeworkMaterialName] = useState<string>('');
  const [testLessonProgram, setTestLessonProgram] = useState<IMaterial[]>([]);
  const [testLessonMaterial, setTestLessonMaterial] = useState<IMaterial>();
  const [testLessonMaterialName, setTestLessonMaterialName] = useState<string>('');
  const [homework, setHomework] = useState<IHomework>();
  const [testLesson, setTestLesson] = useState<ITestLesson>();
  const [moves, setMoves] = useState<IMove[]>([]);
  const language = useAppSelector(state => state.TranslateSlice.language)


  const {
      deadlineText,
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
      const fetchData = async() => {
          if(testUserId) {
              const {data: {testLesson, homework}} = await TestLessonService.getTestLessonHistory(testUserId);
              setHomework(homework);
              setTestLesson(testLesson)
              console.log(testLesson, homework);
          }
      }
      void fetchData();
      
  }, [testUserId])

  useEffect(() => {
      if(homework?.program) {
          setHomeworkProgram(homework?.program);
          setHomeworkMaterial(homework?.program[0]);
          setHomeworkMaterialName(homework?.program[0]?.theme_id?.name);
      }
  }, [homework?.program])
  useEffect(() => {
      if(testLesson?.program) {
          setTestLessonProgram(testLesson?.program);
          setTestLessonMaterial(testLesson?.program[0]);
          setTestLessonMaterialName(testLesson?.program[0]?.theme_id?.name);
      }
  }, [testLesson?.program])

  const PrevBackTheme = (bool: boolean) => {
    const index = testLessonProgram.findIndex(item=> item._id === testLessonMaterial?._id);
    if(bool) {
        if(testLessonProgram[index+1]) {
            setHomeworkMaterial(testLessonProgram[index+1]);
        }
    } else {
        if(testLessonProgram[index-1]) {
          setHomeworkMaterial(testLessonProgram[index-1]);
        }
    }
}

  return (
    <Modal className='!bg-white' active={active} setActive={setActive} maxWidth={2000}>
      <div className="flex m-5 mb-2 rounded-full z-20 top-block">
        <div className="bg-gradient-button flex px-10 items-center w-full h-[108px] rounded-3xl justify-between header">
            {testLessonProgram &&
                <div>
                    <p className='text-3xl font-bold mb-2 main-title'>{homeworkText[language]}:</p>
                    <p className='text-2xl font-bold steps-text'>{homeworkMaterialName}</p>
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
            <Program homework={true} active={testLessonMaterial?._id} setMaterial={setHomeworkMaterial} setMaterialName={setHomeworkMaterialName} program={testLessonProgram}/>
        </div>
        <div className="mx-0 chessboard-container flex flex-col items-center w-full text-center">
            <ChessBoard game={game} setGame={setGame} movesM={moves} setMoves={setMoves} PrevBackTheme={PrevBackTheme} materialId={testLessonMaterial?._id} position={testLessonMaterial?.data.tags.FEN ? homeworkMaterial?.data.tags.FEN : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
                type={testLessonProgram[0]?.type}
            />
        </div>
        <div className="flex flex-col h-full justify-between w-full max-w-[600px] game-container">
            <Game
                materialId={testLessonMaterial?._id}
                cgame={game}
                setGame={setGame}
                position={testLessonMaterial?.data.tags.FEN}
                rightPanelMode={rightPanelMode}
                setRightPanelMode={setRightPanelMode}
                moves={moves}
            />
        </div>
        <ProgramAndStepsMobileBlock
            program={testLessonProgram}
            homework={true}
            active={testLessonMaterial?._id}
            setMaterial={setHomeworkMaterial}
            materialId={testLessonMaterial?._id}
            cgame={game}
            setGame={setGame}
            position={testLessonMaterial?.data.tags.FEN}
            rightPanelMode={rightPanelMode}
            setRightPanelMode={setRightPanelMode}
            moves={moves}
        />
    </div>
    </Modal>
  );
};

export default TestLessonHistoryModal;