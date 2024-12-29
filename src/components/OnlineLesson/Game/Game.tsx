import { Tab } from '@headlessui/react';
import { AiOutlineArrowDown } from '@react-icons/all-files/ai/AiOutlineArrowDown';
import { AiOutlineArrowUp } from '@react-icons/all-files/ai/AiOutlineArrowUp';
import { MdDeleteSweep } from '@react-icons/all-files/md/MdDeleteSweep';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import GroupService from '../../../services/GroupService';
import { GroupEndLessonSocket } from '../../../sockets/GroupSockets';
import { endLessonReducer } from '../../../store/reducers/GroupSlice';
import User from './User';

import { useParams } from 'react-router-dom';
import CloseOnlineLessonModal from '../../Modals/CloseOnlineLessonModal';
import './Game.css';

import {
  ITranslateItemString,
  translations,
} from '../../../utils/translations.tsx';
import { UserRoles } from '../../../utils/userRoles.ts';
import ChatMain from '../Chat/ChatMain.tsx';
import TeamsGameModal from '../../Modals/TeamsGameModal.tsx';
import { ChessInstance } from 'chess.js';
import { ITeam, ITeamsGame } from '../../../models/ITeam.ts';
import classNames from 'classnames';

interface GameProps {
  moves: Array<{
    id: string;
    user_id: string;
    name: string;
    sname: string;
    moves: Array<{ color: string; move: string }>;
  }>;
  rightPanelMode: string;
  setRightPanelMode: (value: string) => void;
  moveMode: boolean;
  position?: string;
  materialId: string;
  cgame: ChessInstance;
  setGame: (cgame: ChessInstance) => void
  startTeamGameHandler: (teams: ITeam[]) => void
  endTeamGameHandler: () => void
  teamsGame: ITeamsGame | null;
}

const Game: FC<GameProps> = ({
  rightPanelMode,
  setRightPanelMode,
  moveMode,
  cgame,
  setGame,
  position,
  materialId,
  startTeamGameHandler,
  teamsGame,
  endTeamGameHandler,
}) => {
  const { game } = useAppSelector((state) => state.GroupSlice);
  const { user } = useAppSelector((state) => state.UserSlice);
  const [allClose, setAllClose] = useState<boolean>(false);
  const [modal3, setModal3] = useState<boolean>(false);
  const [modalTeamsGame, setModalTeamsGame] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const { groupId } = useParams<{ groupId: string }>();
  const { group } = useAppSelector((state) => state.GroupSlice);
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const {
    chatText,
    movesText,
    leaderboardText,
    participantsText,
    finishLessonText,
    lessonSuccessfullyFinishedText,
    playFromCurrentPosition
  }: {
    chatText: ITranslateItemString;
    movesText: ITranslateItemString;
    leaderboardText: ITranslateItemString;
    participantsText: ITranslateItemString;
    finishLessonText: ITranslateItemString;
    lessonSuccessfullyFinishedText: ITranslateItemString;
    playFromCurrentPosition: ITranslateItemString;
  } = translations.lessons;

  const endLessonHandler = async (): Promise<void> => {
    if (groupId) {
      try {
        GroupEndLessonSocket({ room: groupId });
        setModal3(true);
        setMessage(lessonSuccessfullyFinishedText[language]);
        dispatch(endLessonReducer());

        const prevmaterials = group.program.map((item) => item._id);

        await GroupService.editGroup(groupId, {
          program: [],
          prevprogram: prevmaterials,
          userIdInLesson: user._id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={`flex flex-col h-full flex-1 `}>
        <Tab.Group>
          <Tab.List
            as="div"
            className="pl-[3.5rem] bg-[#e8e1d3] z-[1] px-3 py-2 rounded-full flex justify-between h-16"
          >
            <Tab className="mr-1 xl:mr-[5px] rounded-full bg-gradient-button w-full px-2 xl:px-1 py-1.5 xl:py-3 text-md xl:text-[14px] font-semibold flex justify-center items-center">
              {movesText[language]}
            </Tab>
            <Tab
              className={`${
                user.role === 'STUDENT' ? 'tab-desk' : 'flex'
              } mr-1 xl:mr-[5px] rounded-full bg-gradient-button w-full px-2 xl:px-1 py-1.5 xl:py-3 text-md xl:text-[14px] font-semibold  justify-center items-center`}
            >
              {leaderboardText[language]}
            </Tab>

            <Tab
              className={`${
                user.role === 'STUDENT' ? 'hidden' : 'flex'
              } mr-1 xl:mr-[5px] rounded-full bg-gradient-button w-full px-2 xl:px-1 py-1.5 xl:py-3 text-md xl:text-[14px] font-semibold  justify-center items-center`}
            >
              {participantsText[language]}
            </Tab>
            <Tab
              className={`tab-mob rounded-full bg-gradient-button w-full px-2 xl:px-4 py-1.5 xl:py-3 text-md xl:font-base flex justify-center items-center`}
            >
              {chatText[language]}
            </Tab>
            {user?.role === 'STUDENT' && (
              <Tab
                className={`${
                  user.role !== 'STUDENT' ? 'tab-desk' : ''
                } mr-1 xl:mr-4 rounded-full bg-gradient-button w-full px-2 xl:px-4 py-1 xl:py-2 text-md xl:text-base font-semibold flex justify-center items-center`}
                onClick={void endLessonHandler}
              >
                {finishLessonText[language]}
              </Tab>
            )}
          </Tab.List>
          {(rightPanelMode === 'game' || rightPanelMode === 'none') && (
            <Tab.Panels
              as="div"
              className={`relative border-2 border-[#CCC] mt-[-3.5rem] overflow-hidden pl-3 p-5 pt-20 rounded-b-2xl border-t-0 ${
                user.role === UserRoles.STUDENT
                  ? 'h-[calc(100%-20px)]'
                  : 'h-[calc(100%-20px)]'
              } transition-all`}
            >
              <div
                className={'flex flex-col overflow-auto h-full panelWrapper'}
              >
                <Tab.Panel>
                  <button
                    onClick={() => {
                      setAllClose(!allClose);
                      setRightPanelMode('game');
                    }}
                    title="Закрыть удаленные ходы всех учеников"
                    className="cursor-pointer absolute z-[1] right-4 text-xl bg-gray-200 p-1 rounded-md text-green-600"
                  >
                    <MdDeleteSweep />
                  </button>
                  { 
                    user.role !== UserRoles.STUDENT &&
                    !!game.length &&
                    <button className='mb-2 font-medium' onClick={() => setModalTeamsGame(true)}>
                      {playFromCurrentPosition[language]}
                    </button>
                  }
                  {game.map((move, index) => {
                    const i = 0;
                    const isMove = move.user_id === teamsGame?.teams[teamsGame.movesCount % teamsGame.teams.length].id
                    return (
                      <div key={index}>
                        {user.role !== 'STUDENT' ? (
                          <User
                            materialId={materialId}
                            allClose={allClose}
                            setAllClose={setAllClose}
                            game={cgame}
                            setGame={setGame}
                            position={position}
                            moveMode={moveMode}
                            key={move.id}
                            move={move}
                            i={i}
                            isMove={isMove}
                          />
                        ) : (
                          user._id === move.user_id && (
                            <User
                              materialId={materialId}
                              allClose={allClose}
                              setAllClose={setAllClose}
                              game={cgame}
                              setGame={setGame}
                              position={position}
                              moveMode={moveMode}
                              key={move.id}
                              move={move}
                              i={i}
                              isMove={isMove}
                            />
                          )
                        )}
                      </div>
                    );
                  })}
                </Tab.Panel>
                <Tab.Panel>{leaderboardText[language]}</Tab.Panel>
                <Tab.Panel>{participantsText[language]}</Tab.Panel>

                <Tab.Panel>
                  <div
                    className={user?.role === 'STUDENT' ? 'tab-mob h-full' : ''}
                  >
                    <ChatMain />
                  </div>
                </Tab.Panel>
                <button
                  onClick={() =>
                    setRightPanelMode(
                      rightPanelMode === 'game' ? 'none' : 'game',
                    )
                  }
                  className="text-green-500 text-5xl absolute top-0 z-[1] left-2"
                >
                  {rightPanelMode === 'game' ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </button>
              </div>
            </Tab.Panels>
          )}
        </Tab.Group>
      </div>
      {modal3 && (
        <CloseOnlineLessonModal
          modal={modal3}
          setModal={setModal3}
          message={message}
        />
      )}
      <div className={classNames('', {'hidden': !modalTeamsGame})}>
        <TeamsGameModal
          setModal={setModalTeamsGame}
          game={game}
          traner={user}
          startGame={startTeamGameHandler}
          teamsGame={teamsGame}
          endGame={endTeamGameHandler}
        />
      </div>
    </>
  );
};

export default Game;
