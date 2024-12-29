import React, { useEffect, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import {
  BoardOrientation,
  Piece,
  Square,
} from 'react-chessboard/dist/chessboard/types';
import { /* seansSocket, */ socket } from '../../../sockets/socket';
import {
  moveInSeans,
  seansUpdateGame,
  setOneGameTimer,
} from '../../../store/reducers/SeansSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useNavigate, useParams } from 'react-router-dom';

interface SeansChessBoardProps {
  globalMode?: boolean;
  game: any;
  setGame: any;
  safeGameMutate: (modify: any) => any;
  boardOrientation: BoardOrientation;

  blackTimer: any;
  whiteTimer: any;
  setMoves: any;
  setWhiteCaptures: any;
  setBlackCaptures: any;
}

const SeansChessBoard: React.FC<SeansChessBoardProps> = ({
  globalMode,
  game,
  setGame,
  boardOrientation,
  safeGameMutate,
  blackTimer,
  whiteTimer,
  setMoves,
  setBlackCaptures,
  setWhiteCaptures,
  // setCurrentMoveIndex
}) => {
  const { seansId, userId } = useParams();
  const redoHistory = useRef([]);
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [moveFrom, setMoveFrom] = useState('');
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { oneSeans, autoChange } = useAppSelector((state) => state.SeansSlice);
  // const currentGame = oneSeans?.games?.find((e: any) => e.user._id === userId);

  function makeAMove(
    move: { from: Square; to: Square; promotion?: any },
    sendData: boolean,
  ) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    const possibleMove = game.moves();
    // setCurrentMoveIndex(currentGame.moves.length);
    const currentPlayer = game.turn() === 'w' ? 'white' : 'black';
    const winner = game.turn() === 'w' ? 'black' : 'white';
    if (!possibleMove.length) {
      const currentGame = oneSeans.games.find(
        (e: any) => e.user._id === userId,
      );
      dispatch(
        seansUpdateGame({
          statusGame: oneSeans.seanserColor == winner ? 'lose' : 'win',
          seansId,
          userId,
          fen: currentGame.fen,
          timerGoingOn: 'none',
        }),
      );
      return;
    }
    if (game.isCheckmate) {
      const currentGame = oneSeans.games.find(
        (e: any) => e.user._id === userId,
      );
      dispatch(
        seansUpdateGame({
          statusGame: oneSeans.seanserColor == winner ? 'lose' : 'win',
          seansId,
          userId,
          fen: currentGame.fen,
          timerGoingOn: 'none',
        }),
      );
      return;
      // }
    } else if (game.isDraw) {
      dispatch(
        seansUpdateGame({
          statusGame: 'draw',
          seansId,
          userId,
          fen: oneSeans.games.find((e: any) => e.user._id === userId).fen,
          timerGoingOn: 'none',
        }),
      );
      return;
    } else if (game.isCheck) {
      return;
    }
    if (result) {
      setGame(gameCopy);

      let captured = {};
      if (result.captured) {
        if (result.color === 'w') {
          captured = {
            blackCapture: result.captured,
            hasCaptureBlack: true,
          };
          setBlackCaptures((prev: string[]) => [...prev, result.captured]);
        } else {
          captured = {
            whiteCapture: result.captured,
            hasCaptureWhite: true,
          };
          setWhiteCaptures((prev: string[]) => [...prev, result.captured]);
        }
      }
      if (sendData) {
        if (currentPlayer === 'white') {
          whiteTimer.start();
          blackTimer.pause();
        } else {
          blackTimer.start();
          whiteTimer.pause();
        }
        dispatch(
          moveInSeans({
            seansId: seansId,
            userId: userId,
            game: {
              from: move.from,
              to: move.to,
              promotion: move.promotion,
            },
            fen: game.fen(),
            move: `${result.piece} ${result.san}`,
            ...captured,
            whiteTimer: whiteTimer.time,
            blackTimer: blackTimer.time,
            timerGoingOn: currentPlayer,
          }),
        );
      }
      setMoves((prev: string[]) => [...prev, `${result.piece} ${result.san}`]);
    }

    if (oneSeans.seanser?._id === user?._id && autoChange) {
      navigate(`/session/${seansId}/game/${userId}`);
    }
    return result;
  }

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece) {
    makeAMove(
      {
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? 'q',
        // promotion: piece
      },
      true,
    );

    return false;
  }

  useEffect(() => {
    socket.on('seans:getGame', async (data) => {
      makeAMove(data.game, false);
      dispatch(setOneGameTimer(data));
    });
  }, [socket]);

  // function getMoveOptions(square: Square) {
  //   const moves = game.moves({
  //     square,
  //     verbose: true,
  //   });
  //   if (moves.length === 0) {
  //     setOptionSquares({});
  //     return false;
  //   }

  //   const newSquares:any = {};
  //   moves.map((move:any) => {
  //     newSquares[move.to] = {
  //       background:
  //         game.get(move.to) &&
  //         game.get(move.to).color !== game.get(square).color
  //           ? blackSquares.includes(move.to)
  //             ? 'radial-gradient(circle, rgba(97,112,64,1) 85%, transparent 85%)'
  //             : 'radial-gradient(circle, rgba(130,151,105,1) 85%, transparent 85%)'
  //           : blackSquares.includes(move.to)
  //           ? 'radial-gradient(circle, rgba(97,112,64,1) 20%, transparent 20%)'
  //           : 'radial-gradient(circle, rgba(130,151,105,1) 20%, transparent 20%)',
  //       borderRadius: '50%',
  //     };
  //     return move;
  //   });
  //   newSquares[square] = {
  //     background: blackSquares.includes(square)
  //       ? 'rgba(97,112,64,1)'
  //       : 'rgba(130,150,105,1)',
  //   };
  //   setOptionSquares(newSquares);
  //   return true;
  // }

  // function onSquareRightClick(square) {
  //   const colour = 'rgba(0, 0, 255, 1)';
  //   setRightClickedSquares({
  //     ...rightClickedSquares,
  //     [square]:
  //       rightClickedSquares[square] &&
  //       rightClickedSquares[square].backgroundColor === colour
  //         ? undefined
  //         : { backgroundColor: colour },
  //   });
  // }

  // function onPieceDragBegin(piece, sourceSquare) {
  //   //if(moveMode || user.role === 'DIRECTOR' || user.role === 'TRANER') {
  //   setMoveFrom(sourceSquare);
  //   const hasMoveOptions = getMoveOptions(sourceSquare);
  //   //}
  // }
  // function onPieceDragEnd(piece, sourceSquare) {
  //   //if(moveMode || user.role === 'DIRECTOR' || user.role === 'TRANER') {

  //   const hasMoveOptions = getMoveOptions(null);
  //   //}
  // }
  // function onDragOverSquare(square) {
  //   setMoveTo(square);
  // }

  return (
    <div>
      <Chessboard
        // arePiecesDraggable={
        //   moveMode ||
        //   user.role === 'DIRECTOR' ||
        //   user.role === 'ZDIRECTOR' ||
        //   user.role === 'TRANER'
        //     ? true
        //     : false
        // }

        boardOrientation={boardOrientation}
        position={game.fen()}
        id="BasicBoard"
        onPieceDrop={onDrop}

        // onPieceDragBegin={onPieceDragBegin}
        // onPieceDragEnd={onPieceDragEnd}
        // onDragOverSquare={onDragOverSquare}
        // // onSquareClick={onSquareClick}
        // onSquareRightClick={onSquareRightClick}
      />
    </div>
  );
};

export default SeansChessBoard;
