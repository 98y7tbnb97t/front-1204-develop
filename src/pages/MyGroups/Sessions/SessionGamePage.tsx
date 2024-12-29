import React, { useLayoutEffect, useRef, useState } from 'react';
import SeansCard from '../../../components/UI/cards/SeansCard';
import Chat from '../../../components/TestLesson/Chat/Chat';
import Modal from '../../../components/UI/Modal';
import { Chess, ChessInstance } from 'chess.js';
import Switch from '../../../components/UI/Switch';
import GameCard from '../../../components/UI/cards/GameCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import SeansChessBoard from '../../../components/boards/SeansChessBoard/SeansChessBoard';
import { BoardOrientation } from 'react-chessboard/dist/chessboard/types';
import { useTimeModel } from 'react-compound-timer';
import { useParams } from 'react-router-dom';
import { getOneSeans, setAutoChangeAC } from '../../../store/reducers/SeansSlice';
import { withTimerChess } from '../../../components/UI/cards/TimerHoc';
import {
  disconnectSeansSocketRoom,
  joinSeansSocketRoom,
} from '../../../sockets/SeansSockets';
import { Link } from 'react-router-dom';

let isStudent = false;

const SeansGame: React.FC<{
  whiteTimer: any;
  blackTimer: any;
  currentGame: any;
}> = ({ blackTimer, whiteTimer, currentGame }) => {
  const { oneSeans, oneSeansLoading, autoChange } = useAppSelector(
    (state) => state.SeansSlice,
  );
  const {user} = useAppSelector(state=>state.UserSlice);
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [game, setGame] = useState(
    new Chess(currentGame?.fen),
  );

  const { value: whiteTimerValue } = useTimeModel(whiteTimer);
  const { value: blackTimerValue } = useTimeModel(blackTimer);
  const redoHistory = useRef([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [moves, setMoves] = useState(currentGame?.moves);
  const [whiteCaptures, setWhiteCaptures] = useState(
    currentGame?.whiteCaptures,
  );
  const [blackCaptures, setBlackCaptures] = useState(
    currentGame?.blackCaptures,
  );

  const [boardOrientation, setBoardOrientation] = useState<BoardOrientation>(
    user?._id === oneSeans?.seanser?._id
      ? oneSeans?.seanserColor
      : oneSeans?.seanserColor === 'white'
      ? 'black'
      : 'white'
  );

  function safeGameMutate(modify: any) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function back() {
    safeGameMutate((game: ChessInstance) => {
      if (game.history().pop()) {
        redoHistory.current.push(game.history().pop());
      }
      game.undo();
    });
  }

  function fastBack() {
    for (let i = 0; i <= game.history().length; i++) {
      back();
    }
  }

  function next() {
    const gameCopy = { ...game };
    const fen = redoHistory.current.pop();

    gameCopy.move(fen);
    setGame(gameCopy);
  }

  function fastNext() {
    while (redoHistory.current.length) {
      next();
    }
  }

  if (oneSeans) {
    return (
      <div className="p-3">
        <div className="flex flex-row min-h-screen shadow-md bg-gray-100 rounded-md">
          <div>
            <SeansCard
              // seansId={oneSeans._id}
              additionalTime={oneSeans?.additionalTime}
              startTime={oneSeans?.startTime}
              seansTitle={<Link to={`/session/${oneSeans?._id}/game/s`} >{oneSeans?.seanser?.name} {oneSeans?.seanser?.sname} </Link>}
              seanser={oneSeans?.seanser}
              extraTime={oneSeans?.extraTime}
              seanserColor={oneSeans?.seanserColor}
              users={oneSeans?.games}

            />
            <div
              className={`${
                isStudent ? 'desk-block' : ''
              } flex-1 overflow-auto`}
            >
              <Chat />
            </div>
            <button
              onClick={() => setModal(true)}
              className="bg-gradient-button text-red-600 underline text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-appricot text-center"
            >
              Как вести сеанс
            </button>
          </div>
          <div className="w-[75vmin]">
            <div className={`bg-white px-5 py-2 rounded-xl relative`}>
              {currentGame.status !== 'playing' && (
                <div className="w-full absolute z-10 h-full bg-[#eeea] text-red-500 text-3xl font-semibold flex justify-center items-center">
                  {currentGame.status === 'win'
                    ? 'Победил'
                    : currentGame.status === 'lose'
                    ? 'lose'
                    : currentGame.status === 'draw'
                    ? 'draw'
                    : ''}
                </div>
              )}
              <SeansChessBoard
                blackTimer={blackTimer}
                whiteTimer={whiteTimer}
                boardOrientation={boardOrientation}
                game={game}
                setGame={setGame}
                safeGameMutate={safeGameMutate}
                globalMode={true}
                setMoves={setMoves}
                setWhiteCaptures={setWhiteCaptures}
                setBlackCaptures={setBlackCaptures}
              />
            </div>
          </div>
          <div>
            <GameCard
              blackTimer={blackTimer}
              blackTimerValue={blackTimerValue}
              whiteTimer={whiteTimer}
              setBoardOrientation={setBoardOrientation}
              whiteTimerValue={whiteTimerValue}
              back={back}
              fastBack={fastBack}
              fastNext={fastNext}
              next={next}
              safeGameMutate={safeGameMutate}
              game={game}
              moves={moves}
              currentMoveIndex={currentMoveIndex}
              setCurrentMoveIndex={setCurrentMoveIndex}
              setGame={setGame}
              whiteCaptures={whiteCaptures}
              blackCaptures={blackCaptures}
              timerGoingOn={currentGame.timerGoingOn}
            />
            {user?._id === oneSeans?.seanser?._id && <div className="mt-5 flex flex-row">
              <Switch onChange={(checked:boolean)=>dispatch(setAutoChangeAC(checked))} value={autoChange} /> Автосмена
            </div>}
          </div>
        </div>

        <Modal
          noclosable={false}
          active={modal}
          className="!max-w-full rounded-xl"
          setActive={setModal}
        >
          <div className="text-2xl">
            <p className="mb-5">
              Что такое Сеанс? - Сеанс одновременной игры — форма спортивного
              мероприятия, в котором один человек (сеансёр) одновременно играет
              в интеллектуальную игру (шахматы, шашки, го) с несколькими
              противниками.
            </p>
            <p className="mb-5">
              ДЛЯ ТРЕНЕРА ИНСТРУКЦИЯ КАК СОЗДАТЬ СЕАНС в самом низу этого
              документа!
            </p>
            <p>(прочитать с детьми ДО СЕАНСА)</p>
            <p className="mb-5">Правила поведения во время игры</p>
            <p>Молчание – золото</p>
            <p className="mb-5">
              В шахматы играют молча. Для того чтобы подать голос, нужны веские
              основания.
            </p>
            <p className="mb-5">
              Необходимо соблюдать тишину. В первую очередь за доской.
              Категорически недопустимо мешать думать: комментировать ходы
              соперника, подсказки другим игрокам.
            </p>
            <p>Отпустил руку - ход сделан!</p>
            <p className="mb-5">
              Если сделал ход фигурой и отпустил руку - ход сделан и назад не
              возвращается.
            </p>
            <p>Правила во время проведения сеанса </p>
            <p className="mb-5">
              1. Ученик, который проиграл и у него на часах больше 10 минут,
              лишается права участвовать на следующем Сеансе, но может прийти и
              посмотреть (не играть) сеанс в качестве гостья.
            </p>
            <p>2. Ученик, который БЕСПЛАТНО ОТДАЛ фигуру, делает приседания.</p>
            <ul>
              <li>пешка - 5 приседаний</li>
              <li>конь, слон - 10 приседаний</li>
              <li>ладья - 15 приседаний</li>
              <li>ферзь - 20 приседаний</li>
              <li>
                не увидел, что грозит мат с одного хода или пропустил шанс
                поставить мат с одного хода - 25 приседаний
              </li>
            </ul>
            <span className="my-5">
              ........................................................................................................................................................................................................................................................................................
            </span>
          </div>
        </Modal>
      </div>
    );
  } else {
    return 'loading';
  }
};

const SessionGamePage = () => {
  const { oneSeans } = useAppSelector(
    (state) => state.SeansSlice,
  );
  const { seansId } = useParams();
  const dispatch = useAppDispatch();
  const Result = withTimerChess(SeansGame, oneSeans);

  useLayoutEffect(() => {
    dispatch(getOneSeans(seansId));
    if (seansId) {
      joinSeansSocketRoom(seansId);
    }

    return () => {
      if (seansId) {
        disconnectSeansSocketRoom(JSON.stringify(seansId));
      }
    };
  }, [seansId]);

  return <Result />;
};

export default SessionGamePage;
