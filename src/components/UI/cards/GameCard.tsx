import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { FaFastBackward } from '@react-icons/all-files/fa/FaFastBackward';
import { AiFillFastBackward } from '@react-icons/all-files/ai/AiFillFastBackward';
import { AiFillStepBackward } from '@react-icons/all-files/ai/AiFillStepBackward';
import { AiFillStepForward } from '@react-icons/all-files/ai/AiFillStepForward';
import { AiFillFastForward } from '@react-icons/all-files/ai/AiFillFastForward';
import { FaFastForward } from '@react-icons/all-files/fa/FaFastForward';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import { CgArrowsExchangeAltV } from '@react-icons/all-files/cg/CgArrowsExchangeAltV';
import { BoardOrientation } from 'react-chessboard/dist/chessboard/types';
import { seansUpdateGame } from '../../../store/reducers/SeansSlice';
import { Chess, ChessInstance } from 'chess.js';
import { TimerGoingOn } from '../../../models/seans/Seans';

const pieceSymbols = {
  p: '♟',
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  P: '♙',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
};

interface CapturedsListProps {
  title: string;
  capturedPieces: any[];
}

// const getMoveWithPiece = (move) => {
//     const moveObj = game.move(move);
//     game.undo(); // Отменяем ход, чтобы не нарушить текущее состояние игры
//     const piece = pieceSymbols[moveObj.piece];
//     return `${piece} ${move}`;
//   };

const CapturedsList: React.FC<CapturedsListProps> = ({
  capturedPieces,
  title,
}) => {
  return (
    <div>
      {title}:{' '}
      {capturedPieces.map((piece, index) => (
        // @ts-ignore
        <span key={index}>{pieceSymbols[piece]} </span>
      ))}
    </div>
  );
};

interface MovesListProps {
  moves: any[];
  goToMove: (index: number) => void;
  currentMoveIndex: number;
  getMoveWithPiece: (m: any, i: number) => string;
}

const MovesList: React.FC<MovesListProps> = ({
  moves,
  goToMove,
  currentMoveIndex,
  getMoveWithPiece,
}) => {
  return (
    <ol className="grid grid-cols-2 list-decimal px-3">
      {moves.map((move: any, index: number) => {
        // const [piece, san] = move.split(' ');

        const parts = move.split(' ');
        if (parts.length === 2) {
          const [piece, san] = parts;
          // return (
          //   <li key={index}>
          //     {pieceSymbols[piece]} {san}
          //   </li>
          // );
          return (
            <li key={index}>
              <button
                style={{
                  cursor: 'pointer',
                  fontWeight: currentMoveIndex === index ? 'bold' : 'normal',
                }}
                onClick={() => goToMove(index)}
              >
                {/* @ts-ignore */}
                {pieceSymbols[piece]} {san}
              </button>
            </li>
          );
        } else {
          const san = parts[0];

          return (
            <li key={index}>
              <button
                style={{
                  cursor: 'pointer',
                  fontWeight: currentMoveIndex === index ? 'bold' : 'normal',
                }}
                onClick={() => goToMove(index)}
              >
                {san}
              </button>
            </li>
          );
        }
      })}
    </ol>
  );
};

interface GameCardProps {
  next: () => void;
  fastNext: () => void;
  back: () => void;
  fastBack: () => void;
  safeGameMutate: (modify: any) => any;
  setBoardOrientation: (p: any) => void;
  // startTime: string;
  blackTimer: any;
  whiteTimer: any;
  blackTimerValue: any;
  whiteTimerValue: any;

  game: ChessInstance;
  moves: string[];
  setGame: any;
  setCurrentMoveIndex: (moveIndex: number) => void;
  currentMoveIndex: number;
  whiteCaptures: string[];
  blackCaptures: string[];
  timerGoingOn?: TimerGoingOn;
}

const GameCard: React.FC<GameCardProps> = ({
  back,
  fastBack,
  fastNext,
  next,
  safeGameMutate,
  setBoardOrientation,
  blackTimer,
  blackTimerValue,
  whiteTimer,
  whiteTimerValue,
  game,
  moves,
  setCurrentMoveIndex,
  setGame,
  currentMoveIndex,
  blackCaptures,
  whiteCaptures,
  timerGoingOn,
}) => {
  const { user } = useAppSelector((state) => state.UserSlice);
  const dispatch = useAppDispatch();
  const { seansId, userId } = useParams();
  const { oneSeans } = useAppSelector((state) => state.SeansSlice);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          back();
          break;
        case 'ArrowRight':
          next();
          break;
        case 'ArrowUp':
          fastBack();
          break;
        case 'ArrowDown':
          fastNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [back, next, fastBack, fastNext]);

  useEffect(() => {
    if (whiteTimer.time <= 0) {
      dispatch(
        seansUpdateGame({
          statusGame: oneSeans.seanserColor === 'white' ? 'win' : 'lose',
          seansId,
          userId,
          fen: game.fen(),
          timerGoingOn: 'timeout',
        }),
      );
    } else if (blackTimer.time <= 0) {
      dispatch(
        seansUpdateGame({
          statusGame: oneSeans.seanserColor === 'white' ? 'win' : 'lose',
          seansId,
          userId,
          fen: game.fen(),
          timerGoingOn: 'timeout',
        }),
      );
    }
  }, [whiteTimerValue.state, blackTimerValue.state]);

  const goToMove = (index: number) => {
    const newChess = new Chess();
    moves.slice(0, index + 1).forEach((move) => {
      const parts = move.split(' ');
      if (parts.length === 2) {
        const [_, san] = parts;
        newChess.move(san);
      } else {
        newChess.move(move);
      }
    });
    setGame(newChess);
    setCurrentMoveIndex(index); // Обновляем индекс текущего хода
  };

  const getMoveWithPiece = (move: any, index: number) => {
    const fromSquare = move.slice(0, 2);
    const pieceInfo = game.get(fromSquare);

    if (pieceInfo) {
      const piece = pieceSymbols[pieceInfo.type];
      return `${piece} ${move}`;
    }
    return move;
  };

  React.useEffect(() => {
    if (timerGoingOn === 'white') {
      whiteTimer.start();
      blackTimer.pause();
    } else if (timerGoingOn === 'black') {
      blackTimer.start();
      whiteTimer.pause();
    } else {
      blackTimer.pause();
      whiteTimer.pause();
    }
  }, [timerGoingOn]);

  return (
    <div>
      <div
        className="rounded-t-lg py-2.5 px-8 border font-semibold text-lg bg-white w-36"
        style={
          blackTimer.time < 100000
            ? { background: '#c33' }
            : {
                background:
                  blackTimerValue.state === 'PLAYING' ? '#0c3' : '#fff',
              }
        }
      >
        {blackTimerValue.m}:{blackTimerValue.s}:{blackTimerValue.ms}
      </div>
      <div className="rounded-e-lg bg-white w-80">
        <div className="flex flex-row items-center px-3 py-2">
          <span className="rounded-full w-5 h-5 bg-green-400 mr-2" />
          <p>
            {
              oneSeans.games?.find((e: any) => e.user._id === userId)?.user
                ?.name
            }
          </p>
        </div>
        <div className="mx-auto flex items-center w-[calc(100%-50px)] justify-center border-2 border-[#ccc] rounded-full py-2 mt-2 max-2xl:py-1">
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER') && (
            <button
              title="Глава назад"
              className="mr-4 text-base text-red-500 max-2xl:text-sm disabled:cursor-not-allowed"
              disabled
              // onClick={() => PrevBackTheme(false)}
            >
              <FaFastBackward />
            </button>
          )}
          <button
            className="mr-4 text-xl max-2xl:text-base"
            title="Все ходы назад"
            onClick={() => fastBack()}
          >
            <AiFillFastBackward />
          </button>
          <button
            className="mr-4 text-xl max-2xl:text-base"
            title="Ход назад"
            onClick={() => back()}
          >
            <AiFillStepBackward />
          </button>
          <button
            className="mr-4 text-xl max-2xl:text-base"
            title="Ход вперед"
            onClick={() => next()}
          >
            <AiFillStepForward />
          </button>
          <button
            className="mr-4 text-xl max-2xl:text-base"
            title="Все ходы вперед"
            onClick={() => fastNext()}
          >
            <AiFillFastForward />
          </button>
          {(user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER') && (
            <button
              title="Глава вперед"
              className="mr-4 text-base max-2xl:text-sm text-red-500 disabled:cursor-not-allowed"
              disabled
              // onClick={() => PrevBackTheme(true)}
            >
              <FaFastForward />
            </button>
          )}
          <button
            className="mr-4 text-xl max-2xl:text-base disabled:cursor-not-allowed"
            title="В исходную позицию"
            disabled
            //   onClick={() =>
            //     safeGameMutate((game) => {
            //       game.load(position);
            //     })
            //   }
          >
            <AiOutlineCloseCircle />
          </button>
          <button
            className="text-xl max-2xl:text-base"
            title="Перевернуть доску"
            onClick={() => {
              setBoardOrientation((currentOrientation: BoardOrientation) =>
                currentOrientation === 'white' ? 'black' : 'white',
              );
            }}
          >
            <CgArrowsExchangeAltV />
          </button>
        </div>
        <div className="px-5 py-2">
          <MovesList
            moves={moves}
            currentMoveIndex={currentMoveIndex}
            goToMove={goToMove}
            getMoveWithPiece={getMoveWithPiece}
          />
        </div>
        {/* <div className="h-80">
          <Link
            to={'s'}
            className="bg-gradient-button inline-block text- font-semibold rounded-full py-1 px-12 hover:bg-gradient-appricot text-center uppercase"
          >
            анализировать партию
          </Link>
        </div> */}
        <div className="flex flex-row items-center px-3 py-2">
          <span className="rounded-full w-5 h-5 bg-green-400 mr-2" />
          <p>{oneSeans.seanser?.name}</p>
        </div>
      </div>
      <div
        className="rounded-b-lg py-2.5 px-8 border bg-green-400 font-semibold text-lg w-36"
        style={
          whiteTimer.time < 100000
            ? { background: '#c33' }
            : {
                background:
                  whiteTimerValue.state === 'PLAYING' ? '#0c3' : '#fff',
              }
        }
      >
        {whiteTimerValue.m}:{whiteTimerValue.s}:{whiteTimerValue.ms}
      </div>

      <CapturedsList
        title="Белые фигуры, съеденные черными"
        capturedPieces={whiteCaptures} /* getMoveWithPiece={getMoveWithPiece} */
      />
      <CapturedsList
        title="Черные фигуры, съеденные белыми"
        capturedPieces={blackCaptures} /* getMoveWithPiece={getMoveWithPiece} */
      />
    </div>
  );
};

export default GameCard;
