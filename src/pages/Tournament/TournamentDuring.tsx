import rabbit from '../../assets/icons/rabbit.png';
import lock from '../../assets/icons/lock.png';
import setting from '../../assets/icons/setting.png';
import tour from '../../assets/icons/TournamentBlack.png';
import magnifier from '../../assets/icons/magnifier.png';
import doubleBack from '../../assets/icons/doubleBack.png';
import doubleNext from '../../assets/icons/doubleNext.png';
import next from '../../assets/icons/next.png';
import back from '../../assets/icons/back.png';
import flame from '../../assets/icons/flame.png';
import ColoredNumbers from './ColoredNumbers';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Chess } from 'chess.js';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  clearGameState,
  clearUserMoves,
  editGroup,
  pushGame,
  setGameState,
  stepBack,
} from '../../store/reducers/GroupSlice.ts';
import Chat from '../../components/OnlineLesson/Chat/Chat';
import ChessBoard from '../../components/OnlineLesson/ChessBoard/ChessBoard';
import Game from '../../components/OnlineLesson/Game/Game';
import Program from '../../components/OnlineLesson/Program/Program';
import Theory from '../../components/OnlineLesson/Theory/Theory';
import ChessboardArrows from '../../utils/ChessboardArrows';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IMove } from '../../models/MyGroups/IMove';
import { IMaterial } from '../../models/Program/IMaterial';
import GroupService from '../../services/GroupService';
import {
  GroupChangeGameSocket,
  GroupChangeMaterialSocket,
  GroupEntryModeSocket,
  GroupFullCleanSocket,
  GroupMakeMoveSocket,
  GroupUpdateSocket,
} from '../../sockets/GroupSockets';
import { socket } from '../../sockets/socket';
import {
  getGroup,
  initOnlineLesson,
  setMovesState,
} from '../../store/reducers/GroupSlice';

import {
  ITranslateItemElement,
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import ChessBoardTournament from './ChessBoardTournament.tsx';
import { Link } from 'react-router-dom';
import Devoluciones from '../../assets/icons/Devoluciones.png'
import lose from '../../assets/icons/lose.png'
import { AiFillFastBackward } from '@react-icons/all-files/ai/AiFillFastBackward';
import { AiFillFastForward } from '@react-icons/all-files/ai/AiFillFastForward';
import { AiFillStepBackward } from '@react-icons/all-files/ai/AiFillStepBackward';
import { AiFillStepForward } from '@react-icons/all-files/ai/AiFillStepForward';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import { CgArrowsExchangeAltV } from '@react-icons/all-files/cg/CgArrowsExchangeAltV';
import { FaFastBackward } from '@react-icons/all-files/fa/FaFastBackward';
import { FaFastForward } from '@react-icons/all-files/fa/FaFastForward';
import { Chessboard } from 'react-chessboard';
import Engine from '../../utils/engine.ts';

const data = [
  'Teacher',
  'Student 1',
  'Student 2',
  'Student 3',
  'Student 4',
  'Student 5',
  'Student 6',
  'Student 7',
  'Student 8',
];
const messages = [
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  {
    sender: 'sender3',
    text: 'zhopaаааааааааааааааааааа аааааааааааааааааааааааааааааааааааааааа   fаааааааааааааааааааааааааааааааааааааааааааааа',
  },
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  { sender: 'sender3', text: 'privet' },
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  { sender: 'sender3', text: 'privet' },
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  { sender: 'sender3', text: 'privet' },
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  { sender: 'sender3', text: 'privet' },
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  { sender: 'sender3', text: 'privet' },
];

const TournamentDuring = () => {
  const location = useLocation();
  const engine = useMemo(() => new Engine(), []);
  const [locations, setLocations] = useState('');
  useEffect(()=>{
    switch (location.pathname.split('/')[3]) {
      case 'intergroup':
        setLocations('Межгрупповой')
        break;
      case 'interschool':
        setLocations('Межшкольный')
        break;
        case 'Swiss':
        setLocations('Швейцарский')
        break;
      case 'area':
        setLocations('Арена')
        break;
      default:
        break;
    }
  },[])

  const ref = useRef();
  const setApi = null;
  const dispatch = useAppDispatch();
  const [rightPanelMode, setRightPanelMode] = useState<string>('none');
  const { groupId } = useParams();
  const [game, setGame] = useState(new Chess());
  const [program, setProgram] = useState<IMaterial[]>([]);
  const [editor, setEditor] = useState<boolean>(false);
  const [moveMode, setmoveMode] = useState<boolean>(false);
  const [globalMode, setGlobalMode] = useState<boolean>(false);
  const type = program[0]?.type
  const [material, setMaterial] = useState<IMaterial>();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { group } = useAppSelector((state) => state.GroupSlice);
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const [movesM, setMoves] = useState<IMove[]>([]);
  const [clear, setClear] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState(0);
  const [moveFrom, setMoveFrom] = useState('');
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [boardOrientation, setBoardOrientation] = useState('white');
  const [optionSquares, setOptionSquares] = useState({});
  const materialId = material?._id
  const relPos = useRef<string>('');
  const position  = material?.data.tags.FEN ? material?.data.tags.FEN : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
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
          await dispatch(
            editGroup({
              groupId: groupId,
              payload: {
                material: materialId,
                move: {
                  user_id: user._id,
                  name: user.name,
                  sname: user.sname,
                  moves: [],
                },
              },
            }),
          );
          GroupAddGameUserSocket({
            room: groupId,
            move: {
              user_id: user._id,
              name: user.name,
              sname: user.sname,
              moves: [],
            },
          });
          dispatch(
            pushGame({
              user_id: user._id,
              name: user.name,
              sname: user.sname,
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
      safeGameMutate((game) => {
        game.load(position);
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

  function isDoubleCheck({chess, from, to}:{ chess: ChessInstance, from, to }): boolean {
    if (!chess.in_check()) {
      return false;
    }

    const currentColor = chess.turn();
    const kingSquare = chess.board().reduce((acc: {x: number, y: number}, row, y) => {
      row.forEach((piece, x) => {
        if (piece && piece.type === 'k' && piece.color === currentColor) {
          acc = { x, y };
        }
      });
      return acc;
    }, {} as  {x: number, y: number});

    if (!kingSquare || !Object.keys(kingSquare).length) {
      return false; // Неверный FEN, король не найден
    }

    const getSquare = (x: number, y: number): string | undefined => {
      let letter = '';
      switch (x) {
        case 0:
          letter = 'a'
          break;
        case 1:
          letter = 'b'
          break;
        case 2:
          letter = 'c'
          break;
        case 3:
          letter = 'd'
          break;
        case 4:
          letter = 'e'
          break;
        case 5:
          letter = 'f'
          break;
        case 6:
          letter = 'g'
          break;
        case 7:
          letter = 'h'
          break;
      }

      if (!letter) {
        return;
      }

      return `${letter}${y}`
    }

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
    }

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
    }

    const checkRocketStep = (x: number, y: number): boolean => {
      if (x !== kingSquare.x &&  y !== kingSquare.y) {
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
    }


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
          if (x === kingSquare.x ||  y === kingSquare.y) {
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

            const isDouble = isDoubleCheck({chess: gameCopy, from: moveFrom, to: square});
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
          const isDouble = isDoubleCheck({chess: gameCopy, from: sourceSquare, to: targetSquare});
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
          const isDouble = isDoubleCheck({chess: gameCopy, from: moveFrom, to: moveTo});
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
    <div className="bg-tour sm:min-h-[calc(100%_-_1rem)] justify-center  pb flex mt-2 w-11/12  ml-6 rounded-3xl flex-col items-center shadow-2xl">
      {user.role == 'TRANER' && (
        <div className="bg-gradient-button flex flex-row w-11/12 h- px-2 py-5 ml-5 min-h-36 items-center rounded-3xl mt-5 overflow-y-hidden align-middle">
          <h1 className="text-3xl mr-5 ml-5 whitespace-nowrap ">
          {(locations == 'Арена' || locations == 'Швейцарский' ) ? `ТУРНИР №5 ${locations}` : `${locations} турнир`}
          </h1>
          {data.map((item) => (
            <div
              className="h-[120px] px-4 border-gray-200 bg-white rounded-[30px] w-26 border-2 items-center flex mx-0.5 whitespace-nowrap"
              key={item}
            >
              <p className="text-lg font-semibold">{item}</p>
            </div>
          ))}
        </div>
      )}


      <div className="flex-row flex flex-wrap w-full">
        {user.role == 'TRANER' && (
          <div className="flex flex-col">
            <div className="bg-white h-[300px] sm:ml-10 ml-2 mt-8 max-w-80  rounded-3xl mr-auto shadow-2xl">
              <div className="flex">
                <img src={rabbit} className="ml-6 mt-5 h-[70px] w-[70px]" />
                <p className="mt-4 ml-4 font-medium text-xl">
                  7+3 • Рапид • 7 туров
                  <br />
                  Рейтинговый • Швейцарка
                </p>
                <img src={setting} className="w-10 h-10 ml-auto mr-2 mt-5" />
              </div>
              <div className="flex ">
                <img src={lock} className="ml-6 mt-5" />
                <p className="mt-3 ml-7 font-medium text-base text-red-600">
                  Рейтинг ≥ 1200 в Рапид X<br />
                  Лига X
                </p>
              </div>

              <hr className="border-solid border-t-2 border-gray-400 mt-3 w-11/12 ml-3" />
              <div className="flex">
                <div className="bg-green-600 rounded-full w-3 h-3 mt-3 ml-8"></div>
                <div className="flex flex-col ml-2 mt-1">
                  <p>Тренер А. Новикович</p>
                  <p className="text-gray-500">28 янв. 2024 г., 12:00</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className=" bg-white h-[calc(384px)] shadow-2xl  max-w-80 rounded-3xl  border-[#6d573383] border sm:ml-10 ml-2 relative mt-5">
                <div className=" max-w-[400px] flex bg-gradient-chat h-12 rounded-3xl text-2xl font-bold text-[#6D5733] items-center justify-center ">
                  Чат
                </div>
                <div className="ml-2 mb-8 overflow-auto max-h-[calc(384px-50px)] ">
                  {messages.map((message) => (
                    <div className="text-wrap overflow-x-auto">
                      <strong>{message.sender}</strong> {message.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="ml-8 mt-8 flex flex-col">
        <div className='sm:w-[65vmin] w-[75vmin]' >


            <div id="board_wrapper">
                <canvas id="primary_canvas" 
                // className='w-[calc(100vh-281px)] h-[calc(100vh-281px)] max-2xl:w-[calc(100vh-200px)] max-2xl:h-[calc(100vh-200px)]'
                className='sm:w-[65vmin] w-[75vmin]'
                ></canvas>
                <canvas id="drawing_canvas" 
                className='sm:w-[65vmin] w-[75vmin]'
                // className='w-[calc(100vh-281px)] h-[calc(100vh-281px)] max-2xl:w-[calc(100vh-200px)] max-2xl:h-[calc(100vh-200px)]'
                ></canvas>
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
            

        </div>
          <div className="border-2 w-full h-18 border-gray-400 flex mt-4">
            <div className="h-full w-[45%] ">
              <div className="float-end mr-4  text-xl font-semibold flex flex-col text-center">
                <span>1</span> <span>0</span>
              </div>
            </div>
            <div className="w-[10%] flex">
              <div className=" text-xl font-semibold flex flex-col bg-orange-400 text-center w-10">
                <span>1</span> <span>0</span>
              </div>
              <div className=" text-xl font-semibold flex flex-col bg-cyan-100 text-center w-10">
                <span>1</span> <span>0</span>
              </div>
            </div>
            <div className="h-full w-[45%] mt-1 pl-4 float-end ">
              <div className="flex">
                <p>Hrachya777</p>
                <span className="ml-auto mr-4 font-bold text-green-700">3</span>
              </div>
              <div className="flex">
                <p>Hrachya777</p>
                <span className="ml-auto mr-4 font-bold text-red-600">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          {user.role == 'DIRECTOR' && (
            <>
              <div className="bg-white h-[200px] sm:ml-10 ml-2 mt-8 w-[400px]  rounded-3xl mr-auto shadow-2xl">
                <div className="flex">
                  <img src={rabbit} className="ml-6 mt-5 h-[50px] w-[50px]" />
                  <p className="mt-4 ml-4 font-medium text-xl">
                    7+3 • Рапид • 7 туров
                    <br />
                    Рейтинговый • Швейцарка
                  </p>
                  <img src={setting} className="w-10 h-10 ml-auto mr-2 mt-5" />
                </div>
                <div className='flex items-center font-sans '><div className="bg-gray-600 shadow-2xl  shadow-black rounded-full mt-1 w-3 h-3 ml-8 mr-4"></div>ararat {(locations == 'Межгрупповой' || locations == 'Межшкольный')   && <div className='text-red-500 ml-4 font-semibold'>{locations == 'Межшкольный' ? 'Школа' : 'Группа'} № 1</div>}</div>
                <div className='flex items-center font-sans '><div className="bg-white border shadow-2xl border-black rounded-full mt-1 w-3 h-3 ml-8 mr-4"></div>ararat</div>
                <hr className="border-solid border-t-2 border-gray-400 mt-3 w-[90%] ml-[5%]" />
                <div className="flex mt-5">
                  <p className='text-blue-600 ml-10'>ТУРНИР №5 АРЕНА</p>
                  <span className='text-xl font-extrabold text-red-500  ml-auto mr-20 text-shad '>24:11</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className=" bg-white h-[204px] shadow-xl  w-[40vw] rounded-3xl  border-[#6d573383] border sm:ml-10 ml-2 relative mt-3">
                  <div className=" w-[40vw] flex bg-gradient-chat h-12 rounded-3xl text-2xl font-bold text-[#6D5733] items-center justify-center ">
                    Чат
                  </div>
                  <div className="ml-2 mb-8 overflow-auto max-h-[calc(204px-50px)] ">
                    {messages.map((message) => (
                      <div className="text-wrap overflow-x-auto">
                        <strong>{message.sender}</strong> {message.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="w-[110px] h-12 border-t-2 bg-white border-r-2 border-l-2 rounded-t-3xl mt-4 sm:ml-10 border-gray-300 ml-2 relative text-2xl font-semibold text-center">
            6:40
          </div>
          <div
            className={`${
              user.role == 'DIRECTOR' ? 'w-[600px] ' : 'w-[300px] sm:w-[30vw]'
            } max-h-[300px] min-h-[200px] border-2 rounded-e-3xl  sm:ml-10 border-gray-300 flex flex-col justify-center ml-2 bg-white`}
          >
            <div className="h-12 border-b-2 border-gray-300 flex items-center">
              <div className="bg-green-600 rounded-full w-3 h-3 ml-8"></div>
              <p className="text-lg text-gray-500 ml-4">Hrachya777</p>
            </div>
            <div className="flex   flex-col">
              <div className="font-bold ml-3 mt-3 mr-auto text-gray-600 text-lg">1.e4 e5</div>
            </div>
            <div className='flex items-center ml-auto mr-auto mt-auto'><img src={Devoluciones} alt="" /><span className='font-semibold text-xl m-3'>0/1</span> <img src={lose} alt="" /></div>
            
            <div className="h-12 border-t-2 mt-auto border-gray-300 flex items-center">
              <div className="bg-green-600 rounded-full w-3 h-3 ml-8"></div>
              <p className="text-lg text-gray-500 ml-4">Hrachya777</p>
            </div>
            <div className="h-12 border-t-2 mt-auto border-gray-300 flex items-center ">
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
          className="text-xl max-2xl:text-base"
          title="Перевернуть доску"
          onClick={() => {
            setBoardOrientation((currentOrientation) =>
              currentOrientation === 'white' ? 'black' : 'white',
            );
          }}
        >
          <CgArrowsExchangeAltV />
        </button>
      </div>
          </div>
          <div className='w-full flex items-center'>
          <div className=" ml-2 w-[110px] bg-green-300 h-12 border-b-2 border-r-2 border-l-2 rounded-b-3xl sm:ml-10 border-gray-300 text-2xl font-semibold text-center">
            7:50
          </div>
          <Link to={`/tournament/${groupId}/area`} className='ml-auto mr-10 text-blue-700 hover:underline font-semibold text-lg'>Вернуться к турниру</Link>
          </div>
          {user.role == 'TRANER' && <button className="bg-gradient-button h-14 rounded-3xl ml-10 mt-12 text-blue-700 hover:underline font-semibold text-lg">
            <Link to={`/tournament/${groupId}/${locations == 'area' ? 'area' : 'Swiss'}`}>Вернуться к турниру</Link>
          </button>}
        </div>
      </div>
    </div>
  );
};

export default TournamentDuring;
