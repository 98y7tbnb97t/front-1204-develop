import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import GroupService from '../../../services/GroupService';
import {
  GroupAddGameUserSocket,
  GroupChangeBoardOrientation,
  GroupChangeGameSocket,
  GroupMakeMoveBackSocket,
  GroupMakeMoveSocket,
  GroupStepBackSocket,
  GroupStepNextSocket,
} from '../../../sockets/GroupSockets';
import Engine from '../../../utils/engine';

import { AiFillFastBackward } from '@react-icons/all-files/ai/AiFillFastBackward';
import { AiFillFastForward } from '@react-icons/all-files/ai/AiFillFastForward';
import { AiFillStepBackward } from '@react-icons/all-files/ai/AiFillStepBackward';
import { AiFillStepForward } from '@react-icons/all-files/ai/AiFillStepForward';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import { CgArrowsExchangeAltV } from '@react-icons/all-files/cg/CgArrowsExchangeAltV';
import { FaFastBackward } from '@react-icons/all-files/fa/FaFastBackward';
import { FaFastForward } from '@react-icons/all-files/fa/FaFastForward';
import { socket } from '../../../sockets/socket';
import {
  clearGameState,
  clearUserMoves,
  editGroup,
  pushGame,
  setGameState,
  setMovesState,
  stepBack,
} from '../../../store/reducers/GroupSlice';
import ChessboardArrows from '../../../utils/ChessboardArrows';
import '../../../utils/chessboard-arrows.css';
import Star from '../../../assets/pawns/star.png';
import './Chessboard.css';
import { UserRoles } from '../../../utils/userRoles.ts';
import { ChessInstance, Move, PieceType } from 'chess.js';
import { sq } from 'date-fns/locale';
import { yo_NG } from '@faker-js/faker';
import { Link } from 'react-router-dom';
import sessionIcon from '../../../assets/menu-icons/session_icon.svg'

interface ChessBoardProps {
  moveMode: boolean;
  globalMode: boolean;
  clear: boolean;
  setClear: (bool: boolean) => void;
  position?: string;
  materialId?: string;
  movesM: Array<{
    id: string;
    user_id: string;
    name: string;
    sname: string;
    moves: Array<{ color: string; move: string }>;
  }>;
  setMoves: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: string;
        user_id: string;
        name: string;
        sname: string;
        moves: Array<{ color: string; move: string }>;
      }>
    >
  >;
  PrevBackTheme: (bool: boolean) => void;
  type: string;
  custom: [{ square: string; type: string }];
  game: ChessInstance;
  setGame: (game: ChessInstance) => void;
  onMove?: () => void
}

const ChessBoard: FC<ChessBoardProps> = ({
  moveMode,
  globalMode,
  clear,
  setClear,
  position,
  materialId,
  movesM,
  setMoves,
  PrevBackTheme,
  type,
  custom,
  game,
  setGame,
  onMove
}) => {
  const { groupId } = useParams();
  const dispatch = useAppDispatch();

  const [moveFrom, setMoveFrom] = useState('');
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [boardOrientation, setBoardOrientation] = useState('white');
  const [optionSquares, setOptionSquares] = useState({});
  const engine = useMemo(() => new Engine(), []);
  const { user } = useAppSelector((state) => state.UserSlice);
  const { testUser } = useAppSelector((state) => state.UserSlice);
  const redoHistory = useRef([]);
  const ref = useRef();
  const relPos = useRef<string>('');
  const blackSquares = [
    'a1',
    'c1',
    'e1',
    'g1',
    'b2',
    'd2',
    'f2',
    'h2',
    'a3',
    'c3',
    'e3',
    'g3',
    'b4',
    'd4',
    'f4',
    'h4',
    'a5',
    'c5',
    'e5',
    'g5',
    'b6',
    'd6',
    'f6',
    'h6',
    'a7',
    'c7',
    'e7',
    'g7',
    'b8',
    'd8',
    'f8',
    'h8',
  ];

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
    if (groupId) {
      ref.current = new ChessboardArrows();
      ref.current.ChessboardArrows(
        'board_wrapper',
        groupId,
        user.role,
        globalMode,
        2,
        'rgb(21, 120, 27)',
        new Map(),
        !!testUser._id
      );
    }
  }, [groupId]);

  useEffect(() => {
    ref.current.setGlobalMode(globalMode);
  }, [globalMode]);

  useEffect(() => {
    const updateHistory = async () => {
      if (groupId) {
        if (game.history() && user.role !== 'STUDENT') {
          await dispatch(
            editGroup({ groupId: groupId, payload: { current: materialId } }),
          );
        }
        if (
          user.role !== 'TRANER' &&
          user.role !== 'DIRECTOR' &&
          user.role !== 'ZDIRECTOR'
        ) {
          const editUser = user._id ? user : testUser;
          await dispatch(
            editGroup({
              groupId: groupId,
              payload: {
                material: materialId,
                move: {
                  user_id: editUser._id,
                  name: editUser.name,
                  sname: editUser.sname,
                  moves: [],
                },
              },
            }),
          );
          GroupAddGameUserSocket({
            room: groupId,
            move: {
              user_id: editUser._id,
              name: editUser.name,
              sname: editUser.sname,
              moves: [],
            },
          });
          dispatch(
            pushGame({
              user_id: editUser._id,
              name: editUser.name,
              sname: editUser.sname,
              moves: [],
            }),
          );
        }
        dispatch(setGameState(materialId));
      }
    };
    void updateHistory();
    if (position) {
      relPos.current = position;
      const gameCopy = { ...game };
      gameCopy.load(position);
      setGame(gameCopy);
      setMoves([]);
      if (game.turn() === 'w') {
        setBoardOrientation('white');
      } else {
        setBoardOrientation('black');
      }
      ref.current.clearCanvas();
    }
  }, [position, materialId]);

  useEffect(() => {
    if (clear) {
      setClear(false);
      safeGameMutate((game: ChessInstance) => {
        game.load(position || '');
      });
      dispatch(clearGameState());
    }
  }, [clear]);

  useEffect(() => {
    socket.on('group:recive_change_game', (data) => {
      const gameCopy = { ...game };
      gameCopy.move(data.game);
      setGame(gameCopy);
      if (data.fen !== game.fen()) {
        safeGameMutate((game) => {
          game.load(data.fen);
        });
      }
    });
    socket.on('group:recive_move_back', () => {
      back();
    });
    socket.on('group:recive_change_board_orientation', (orientation: 'white' | 'black') => {
      setBoardOrientation(orientation);
    });
    socket.on('group:recive_full_clean', () => {
      safeGameMutate((game) => {
        game.load(relPos.current);
      });
      dispatch(clearGameState());
    });
    socket.on('group:recive_user_clean', (data) => {
      if (user._id === data) {
        safeGameMutate((game) => {
          game.load(relPos.current);
        });
        dispatch(clearUserMoves(data));
      } else {
        dispatch(clearUserMoves(data));
      }
    });
    socket.on('group:back_recive', (user_id) => {
      dispatch(stepBack({ user_id: user_id }));
    });
    socket.on('group:next_recive', (data) => {
      dispatch(
        setMovesState({
          user_id: data.user_id,
          color: data.color,
          move: data.move,
        }),
      );
    });

    socket.on('group:recive_add_game_user', (data) => {
      dispatch(pushGame(data));
    });

    socket.on('group:recive_draw_arrow', (data) => {
      ref.current.socketDrawArrowToCanvas(
        data.fromx,
        data.fromy,
        data.tox,
        data.toy,
        data.color,
        data.resolution,
      );
    });
    socket.on('group:recive_draw_circle', (data) => {
      ref.current.drawCircleSocket(data.x, data.y, data.color, data.resolution);
    });
    socket.on('group:recive_clear_canvas', () => {
      ref.current.clearCanvas();
    });
  }, [socket]);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function back() {
    if (game.history().pop()) {
      dispatch(stepBack({ user_id: user._id }));
      GroupStepBackSocket({ room: groupId, user_id: user._id });
    }
    if (groupId) {
      if (globalMode) {
        GroupMakeMoveBackSocket({ room: groupId });
      }
    }
    safeGameMutate((game) => {
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

    if (fen) {
      const color = game.turn() === 'w' ? 'w' : 'b';
      GroupStepNextSocket({
        room: groupId,
        user_id: user._id,
        color: color,
        move: fen,
      });
      dispatch(setMovesState({ user_id: user._id, color: color, move: fen }));
    }

    gameCopy.move(fen);
    setGame(gameCopy);

    if (groupId) {
      if (globalMode) {
        GroupChangeGameSocket({ room: groupId, game: fen, fen: game.fen() });
      }
    }
  }

  function fastNext() {
    while (redoHistory.current.length) {
      next();
    }
  }

  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? blackSquares.includes(move.to)
              ? 'radial-gradient(circle, rgba(97,112,64,1) 85%, transparent 85%)'
              : 'radial-gradient(circle, rgba(130,151,105,1) 85%, transparent 85%)'
            : blackSquares.includes(move.to)
            ? 'radial-gradient(circle, rgba(97,112,64,1) 20%, transparent 20%)'
            : 'radial-gradient(circle, rgba(130,151,105,1) 20%, transparent 20%)',
        borderRadius: '50%',
      };
      return move;
    });
    newSquares[square] = {
      background: blackSquares.includes(square)
        ? 'rgba(97,112,64,1)'
        : 'rgba(130,150,105,1)',
    };
    setOptionSquares(newSquares);
    return true;
  }

  function isDoubleCheck({
    chess,
    from,
    to,
  }: {
    chess: ChessInstance;
    from;
    to;
  }): boolean {
    if (!chess.in_check()) {
      return false;
    }

    const currentColor = chess.turn();
    const kingSquare = chess
      .board()
      .reduce((acc: { x: number; y: number }, row, y) => {
        row.forEach((piece, x) => {
          if (piece && piece.type === 'k' && piece.color === currentColor) {
            acc = { x, y };
          }
        });
        return acc;
      }, {} as { x: number; y: number });

    if (!kingSquare || !Object.keys(kingSquare).length) {
      return false; // Неверный FEN, король не найден
    }

    const getSquare = (x: number, y: number): string | undefined => {
      let letter = '';
      switch (x) {
        case 0:
          letter = 'a';
          break;
        case 1:
          letter = 'b';
          break;
        case 2:
          letter = 'c';
          break;
        case 3:
          letter = 'd';
          break;
        case 4:
          letter = 'e';
          break;
        case 5:
          letter = 'f';
          break;
        case 6:
          letter = 'g';
          break;
        case 7:
          letter = 'h';
          break;
      }

      if (!letter) {
        return;
      }

      return `${letter}${y}`;
    };

    const checkSquare = (x: number, y: number): boolean => {
      const square = getSquare(x, y);
      if (!square) {
        return false;
      }

      const piece = chess.get(square as Square);

      if (!piece) {
        return false;
      }

      return piece.type !== 'k';
    };

    const checkBishepStep = (x: number, y: number): boolean => {
      if (kingSquare.y > y && kingSquare.x > x) {
        let currentY = y;
        let currentX = x;

        while (currentX <= kingSquare.x && currentY <= kingSquare.y) {
          if (checkSquare(currentX, currentY)) {
            return false;
          }

          if (currentX === kingSquare.x && currentY === kingSquare.y) {
            return true;
          }

          currentX++;
          currentY++;
        }
        return false;
      } else if (kingSquare.y < y && kingSquare.x < x) {
        let currentY = y;
        let currentX = x;

        while (currentX >= kingSquare.x && currentY >= kingSquare.y) {
          if (checkSquare(currentX, currentY)) {
            return false;
          }

          if (currentX === kingSquare.x && currentY === kingSquare.y) {
            return true;
          }

          currentX--;
          currentY--;
        }

        return false;
      } else if (kingSquare.y < y && kingSquare.x > x) {
        let currentY = y;
        let currentX = x;

        while (kingSquare.y <= currentY && kingSquare.x >= currentX) {
          if (checkSquare(currentX, currentY)) {
            return false;
          }

          if (currentX === kingSquare.x && currentY === kingSquare.y) {
            return true;
          }

          currentX++;
          currentY--;
        }

        return false;
      }

      let currentY = y;
      let currentX = x;

      while (currentX >= kingSquare.x && currentY <= kingSquare.y) {
        if (checkSquare(currentX, currentY)) {
          return false;
        }

        if (currentX === kingSquare.x && currentY === kingSquare.y) {
          return true;
        }

        currentX--;
        currentY++;
      }

      return false;
    };

    const checkRocketStep = (x: number, y: number): boolean => {
      if (x !== kingSquare.x && y !== kingSquare.y) {
        return false;
      }

      if (x === kingSquare.x) {
        let currentY = y;
        if (currentY < kingSquare.y) {
          while (currentY < kingSquare.y) {
            if (checkSquare(x, currentY)) {
              return false;
            }
            currentY++;
          }
        } else {
          while (currentY > kingSquare.y) {
            if (checkSquare(x, currentY)) {
              return false;
            }
            currentY--;
          }
        }
      }

      let currentX = x;
      if (currentX < kingSquare.x) {
        while (currentX < kingSquare.x) {
          if (checkSquare(currentX, y)) {
            return false;
          }
          currentX++;
        }
      } else {
        while (currentX > kingSquare.x) {
          if (checkSquare(currentX, y)) {
            return false;
          }
          currentX--;
        }
      }

      return true;
    };

    const attacker = chess.board().reduce((acc: number, row, y) => {
      row.forEach((piece, x) => {
        if (!piece) {
          return;
        }

        if (piece.color === currentColor) {
          return;
        }

        if (piece.square === to) {
          return;
        }

        if (['p', 'n', 'k'].includes(piece.type)) {
          return;
        }

        if (piece.type === 'b') {
          if (!checkBishepStep(x, y)) {
            return;
          }

          acc++;
          return;
        }

        if (piece.type === 'r') {
          if (!checkRocketStep(x, y)) {
            return;
          }

          acc++;
          return;
        }

        if (piece.type === 'q') {
          if (x === kingSquare.x || y === kingSquare.y) {
            if (!checkRocketStep(x, y)) {
              return;
            }

            acc++;
            return;
          }

          if (!checkBishepStep(x, y)) {
            return;
          }

          acc++;
          return;
        }
      });

      return acc;
    }, 0);

    return attacker >= 1;
  }

  async function onSquareClick(square: Square) {
    if (
      moveMode ||
      user.role === 'DIRECTOR' ||
      user.role === 'ZDIRECTOR' ||
      user.role === 'TRANER'
    ) {
      setRightClickedSquares({});
      // from square
      if (!moveFrom) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }
      // to square
      if (!moveTo) {
        // check if valid move before showing dialog
        const moves = game.moves({
          moveFrom,
          verbose: true,
        });
        const foundMove = moves.find(
          (m) => m.from === moveFrom && m.to === square,
        );
        // not a valid move
        if (!foundMove) {
          // check if clicked on new piece
          let hasMoveOptions;

          if (moveFrom === square) {
            hasMoveOptions = getMoveOptions(null);
          } else {
            hasMoveOptions = getMoveOptions(square);
          }

          // if new piece, setMoveFrom, otherwise clear moveFrom
          setMoveFrom(hasMoveOptions ? square : '');
          return;
        }
        
        // valid move
        setMoveTo(square);

        // if promotion move
        if (
          (foundMove.color === 'w' &&
            foundMove.piece === 'p' &&
            square[1] === '8') ||
          (foundMove.color === 'b' &&
            foundMove.piece === 'p' &&
            square[1] === '1')
        ) {
          setShowPromotionDialog(true);
          return;
        }

        // is normal move
        const gameCopy = { ...game };

        const move = gameCopy.move({
          from: moveFrom,
          to: square,
          promotion: 'q',
        });

        if (move) {
          if (movesM.find((item) => item.user_id === user._id)) {
            const tmp = movesM;
            const index = tmp.findIndex((item) => item.user_id === user._id);
            //tmp.pop()?.moves.pop().count
            tmp[index].moves.push({ color: move.color, move: move.san });
            setMoves([...tmp]);
          }
          onMove?.();

          if (groupId) {
            await GroupService.editGroup(groupId, {
              open: true,
              material: materialId,
              move: {
                user_id: user._id,
                name: user.name,
                sname: user.sname,
                moves: [{ color: move.color, move: move.san }],
              },
            });

            const isDouble = isDoubleCheck({
              chess: gameCopy,
              from: moveFrom,
              to: square,
            });
            const isDraw = gameCopy.in_draw();
            dispatch(
              setMovesState({
                user_id: user._id,
                color: move.color,
                move: move.san + (isDraw ? '½-½' : '') + (isDouble ? '+' : ''),
              }),
            );
            GroupMakeMoveSocket({
              room: groupId,
              user_id: user._id,
              color: move.color,
              move: move.san,
              role: user.role
            });
          }
        }

        // if invalid, setMoveFrom and getMoveOptions
        if (move === null) {
          const hasMoveOptions = getMoveOptions(square);
          if (hasMoveOptions) setMoveFrom(square);
          return;
        }
        if (groupId) {
          if (globalMode) {
            GroupChangeGameSocket({
              room: groupId,
              game: {
                from: moveFrom,
                to: square,
                promotion: 'q',
              },
              fen: game.fen(),
            });
          }
        }

        setGame(gameCopy);

        //setTimeout(findBestMove, 300);
        setMoveFrom('');
        setMoveTo(null);
        setOptionSquares({});
        return;
      }
    }
  }

  function findBestMove() {
    const gameCopy = { ...game };
    engine.evaluatePosition(game.fen(), 2);

    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        // In latest chess.js versions you can just write ```game.move(bestMove)```
        gameCopy.move({
          from: bestMove.substring(0, 2),
          to: bestMove.substring(2, 4),
          promotion: bestMove.substring(4, 5),
        });

        setGame(gameCopy);
      }
    });
  }

  function onPieceDragBegin(piece, sourceSquare) {
    //if(moveMode || user.role === 'DIRECTOR' || user.role === 'TRANER') {
    setMoveFrom(sourceSquare);
    const hasMoveOptions = getMoveOptions(sourceSquare);
    //}
  }
  function onPieceDragEnd(piece, sourceSquare) {
    //if(moveMode || user.role === 'DIRECTOR' || user.role === 'TRANER') {

    const hasMoveOptions = getMoveOptions(null);
    //}
  }
  function onDragOverSquare(square) {
    setMoveTo(square);
  }
  async function onDrop(sourceSquare, targetSquare, piece) {
    if (
      moveMode ||
      user.role === 'DIRECTOR' ||
      user.role === 'ZDIRECTOR' ||
      user.role === 'TRANER'
    ) {
      const gameCopy = { ...game };
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (type === 'customtask') {
        let tokens = gameCopy.fen().split(' ');
        tokens[1] = 'w';
        tokens[3] = '-';
        gameCopy.load(tokens.join(' '));
      }

      if (move) {
        if (movesM.find((item) => item.user_id === user._id)) {
          const tmp = movesM;
          const index = tmp.findIndex((item) => item.user_id === user._id);
          //tmp.pop()?.moves.pop().count
          tmp[index].moves.push({ color: move.color, move: move.san });
          setMoves([...tmp]);
        }
        onMove?.();
        if (groupId) {
          await GroupService.editGroup(groupId, {
            open: true,
            material: materialId,
            move: {
              user_id: user._id,
              name: user.name,
              sname: user.sname,
              moves: [{ color: move.color, move: move.san }],
            },
          });
          const isDouble = isDoubleCheck({
            chess: gameCopy,
            from: sourceSquare,
            to: targetSquare,
          });
          const isDraw = gameCopy.in_draw();
          dispatch(
            setMovesState({
              user_id: user._id,
              color: move.color,
              move: move.san + (isDraw ? '½-½' : '') + (isDouble ? '+' : ''),
            }),
          );
          GroupMakeMoveSocket({
            room: groupId,
            user_id: user._id,
            color: move.color,
            move: move.san,
            role: user.role
          });
          if (globalMode) {
            GroupChangeGameSocket({
              room: groupId,
              game: {
                from: sourceSquare,
                to: targetSquare,
                promotion: piece[1].toLowerCase() ?? 'q',
              },
              fen: game.fen(),
            });
          }
        }
      }

      // illegal move
      //if (move === null) return false;

      // exit if the game is over

      //if (game.game_over() || game.in_draw()) return false;

      setGame(gameCopy);
      setMoveFrom('');
      setMoveTo(null);
      //setTimeout(findBestMove, 300);
      return true;
    }
  }

  async function onPromotionPieceSelect(piece) {
    // if no piece passed then user has cancelled dialog, don't make move and reset
    if (piece) {
      const gameCopy = { ...game };
      const move = gameCopy.move({
        from: moveFrom,
        to: moveTo,
        promotion: piece[1].toLowerCase() ?? 'q',
      });
      if (move) {
        onMove?.();
        if (groupId) {
          await GroupService.editGroup(groupId, {
            open: true,
            material: materialId,
            move: {
              user_id: user._id,
              name: user.name,
              sname: user.sname,
              moves: [{ color: move.color, move: move.san }],
            },
          });
          const isDouble = isDoubleCheck({
            chess: gameCopy,
            from: moveFrom,
            to: moveTo,
          });
          const isDraw = gameCopy.in_draw();
          dispatch(
            setMovesState({
              user_id: user._id,
              color: move.color,
              move: move.san + (isDraw ? '½-½' : '') + (isDouble ? '+' : ''),
            }),
          );
          GroupMakeMoveSocket({
            room: groupId,
            user_id: user._id,
            color: move.color,
            move: move.san,
            role: user.role
          });
          if (globalMode) {
            GroupChangeGameSocket({
              room: groupId,
              game: {
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? 'q',
              },
              fen: game.fen(),
            });
          }
        }
      }
      setGame(gameCopy);
      //setTimeout(findBestMove, 300);
    }
    setMoveFrom('');
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

  function onSquareRightClick(square) {
    const colour = 'rgba(0, 0, 255, 1)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }

  const CustomPieceRenderer = (props) => {
    const { square, squareWidth } = props;
    const tmp = [] as Array<string>;
    custom.map((item) => {
      tmp.push(item.square);
    });
    return (
      <>
        {tmp.includes(square) ? (
          <img width="81" height="81" src={Star} alt="" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={squareWidth}
            height={squareWidth}
            viewBox={'1 1 43 43'}
          >
            <path d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z" />
          </svg>
        )}
      </>
    );
  };

  return (
    <div className={'h-full w-full'}>
      <div
        id="board_wrapper"
        className={`${
          user.role !== UserRoles.STUDENT ? 'board' : ''
        } aspect-square h-[350px] md:h-[calc(100%-50px)]`}
      >
        <canvas id="primary_canvas" className="w-full aspect-square"></canvas>
        <canvas id="drawing_canvas" className="w-full aspect-square"></canvas>
        <Chessboard
          animationDuration={200}
          arePiecesDraggable={
            moveMode ||
            user.role === 'DIRECTOR' ||
            user.role === 'ZDIRECTOR' ||
            user.role === 'TRANER'
              ? true
              : false
          }
          position={game.fen()}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          onPromotionPieceSelect={onPromotionPieceSelect}
          boardOrientation={boardOrientation}
          onDragOverSquare={onDragOverSquare}
          areArrowsAllowed={false}
          //promotionDialogVariant='vertical'
          customArrowColor="rgba(0,0,0,0)"
          customSquareStyles={{
            ...moveSquares,
            ...optionSquares,
          }}
          onPieceDragBegin={onPieceDragBegin}
          onPieceDragEnd={onPieceDragEnd}
          promotionToSquare={moveTo}
          showPromotionDialog={showPromotionDialog}
          onPieceDrop={onDrop}
          customPieces={
            type === 'customtask' && {
              bP: (props) => CustomPieceRenderer(props),
            }
          }
        />
      </div>
      <div className="mx-auto flex items-center w-[calc(100%-50px)] justify-center border-2 border-[#ccc] rounded-full py-2 mt-2 max-2xl:py-1">
        {(user.role === 'DIRECTOR' ||
          user.role === 'ZDIRECTOR' ||
          user.role === 'TRANER') && (
          <button
            title="Глава назад"
            className="mr-4 text-base text-red-500 max-2xl:text-sm"
            onClick={() => PrevBackTheme(false)}
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
            className="mr-4 text-base max-2xl:text-sm text-red-500"
            onClick={() => PrevBackTheme(true)}
          >
            <FaFastForward />
          </button>
        )}
        <button
          className="mr-4 text-xl max-2xl:text-base"
          title="В исходную позицию"
          onClick={() =>
            safeGameMutate((game) => {
              game.load(position);
            })
          }
        >
          <AiOutlineCloseCircle />
        </button>
        <button
          className="text-xl max-2xl:text-base mr-4"
          title="Перевернуть доску"
          onClick={() => {
            setBoardOrientation((currentOrientation) => {
              const orientation = currentOrientation === 'white' ? 'black' : 'white';
              if (groupId && [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR, UserRoles.TRANER].includes(user.role)) {
                GroupChangeBoardOrientation({room: groupId, orientation })
              }
              return orientation;
            });
          }}
        >
          <CgArrowsExchangeAltV />
        </button>
        <Link to={`/session/${groupId || ''}/create`} ><img src={sessionIcon} alt="session" width={14} height={14} /></Link>
      </div>
    </div>
  );
};

export default ChessBoard;
