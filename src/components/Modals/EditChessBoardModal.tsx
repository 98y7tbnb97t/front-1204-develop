import { FC, useState, useEffect, useRef } from 'react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import AuthErrorModal from './AuthError';
import {useAppSelector} from '../../hooks/redux';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import {GroupChangeGameSocket} from '../../sockets/GroupSockets';
import Star from '../../assets/pawns/star.png'
import Wk from '../../assets/pawns/Wk.svg'
import Wq from '../../assets/pawns/Wq.svg'
import Wr from '../../assets/pawns/Wr.svg'
import Wb from '../../assets/pawns/Wb.svg'
import Wn from '../../assets/pawns/Wn.svg'
import Wp from '../../assets/pawns/Wp.svg'

import Bk from '../../assets/pawns/Bk.svg'
import Bq from '../../assets/pawns/Bq.svg'
import Br from '../../assets/pawns/Br.svg'
import Bb from '../../assets/pawns/Bb.svg'
import Bn from '../../assets/pawns/Bn.svg'
import Bp from '../../assets/pawns/Bp.svg'

import {BsFillTrashFill} from '@react-icons/all-files/bs/BsFillTrashFill'
import {BsArrowCounterclockwise} from '@react-icons/all-files/bs/BsArrowCounterclockwise'
import {RiDeleteBin6Line} from '@react-icons/all-files/ri/RiDeleteBin6Line'
import {HiArrowsUpDown} from '@react-icons/all-files/hi2/HiArrowsUpDown'


import FenParser from '@chess-fu/fen-parser';
import Select from '../UI/Main/Select';
import {ISelect} from '../../models/ISelect';
import CheckBox from '../UI/Main/Checkbox/CheckBox.tsx';
import {IMaterial} from '../../models/Program/IMaterial';
import {useParams} from 'react-router-dom';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import { Piece, Square } from 'react-chessboard/dist/chessboard/types';

interface EditChessBoardModalProps {
    modal: boolean,
    setModal: (bool: boolean) => void,
    theme_id: string,
    edit?: boolean
    material?: IMaterial,
    position: string
}

const EditChessBoardModal: FC<EditChessBoardModalProps> = ({modal, setModal, cgame, setCGame}) => {
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        editChessboardText,
        moveText,
        whiteText,
        blackText,
        elementsText,
        startingPositionText,
        clearBoardText,
        flipBoardText,
        castlingText,
        movePositionToOnlineLessonText
    }: {
        editChessboardText: ITranslateItemString,
        moveText: ITranslateItemString,
        whiteText: ITranslateItemString,
        blackText: ITranslateItemString,
        elementsText: ITranslateItemString,
        startingPositionText: ITranslateItemString,
        clearBoardText: ITranslateItemString,
        flipBoardText: ITranslateItemString,
        castlingText: ITranslateItemString,
        movePositionToOnlineLessonText: ITranslateItemString
    } = translations.lessons

    const {groupId} = useParams();
    const [modalError] = useState<string>('');
    const turnList = [{id: '1', name: whiteText[language], slug: 'w'}, {id: '2', name: blackText[language], slug: 'b'}]
    const [turn, setTurn] = useState<ISelect>(turnList[0]);
    const [castling, setCastling] = useState<{ wOO: boolean, wOOO: boolean, bOO: boolean, bOOO: boolean }>(
        {
            wOO: true,
            wOOO: true,
            bOO: true,
            bOOO: true
        }
    );

    const [eModal, setEModal] = useState<boolean>(false);
    const [game, setGame] = useState(new Chess(cgame.fen()));
    const [piece, setPiece] = useState<string>('');
    const [stars, setStars] = useState<string[]>([]);
    const [orientation, setOrientation] = useState<string>('white');
    const [fen, setFen] = useState<string>(game.fen());
    const chessContainerRef = useRef<HTMLDivElement>(null);
    const chessRef = useRef<string>('')
    const squareTargetRef = useRef<string>('');
    const isPieceLeave = useRef<boolean>(false);
    const selectedPiece = useRef<Square>();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fen = new FenParser(game.fen());
        const arr = [];
        if (castling.wOO) {
            arr.push('K')
        }
        if (castling.wOOO) {
            arr.push('Q')
        }
        if (castling.bOO) {
            arr.push('k')
        }
        if (castling.bOOO) {
            arr.push('q')
        }
        fen.castles = arr.join('');
        game.load(fen.toString());
        setFen(fen.toString());
    }, [castling])

    const createCustomMaterialHandler = async () => {
        let tmp = [] as [{ square: string, type: string }];
        stars.map(star => {
            tmp.push({ square: star, type: 'star' })
        });
        const gameCopy = { ...game };
        gameCopy.load(game.fen());

        cgame.load(game.fen())
        cgame.move(game)
        setCGame(game);
        setFen(game.fen());

        GroupChangeGameSocket({ room: groupId, game: gameCopy, fen: game.fen() });
        setModal(false);
    }

    const addFigure = (square: Square, piece?: string, source?: Square) => {
        if (!chessRef.current && !piece) {
            return;
        }

        const gameCopy = {...game};
        const ref = piece ?? chessRef.current;
        if (source) {
          gameCopy.remove(source);
        }

        if (ref === 'star') {
            gameCopy.put({type: 'p', color: 'b'}, square);
            setStars(prev => [...prev, square]);
        } else if (ref === 'p') {
            gameCopy.put({type: 'p', color: 'w'}, square);
        } else if (ref === 'k') {
            gameCopy.put({type: 'k', color: 'w'}, square);
        } else if (ref === 'q') {
            gameCopy.put({type: 'q', color: 'w'}, square);
        } else if (ref === 'r') {
            gameCopy.put({type: 'r', color: 'w'}, square);
        } else if (ref === 'b') {
            gameCopy.put({type: 'b', color: 'w'}, square);
        } else if (ref === 'n') {
            gameCopy.put({type: 'n', color: 'w'}, square);
        } else if (ref === 'bk') {
            gameCopy.put({type: 'k', color: 'b'}, square);
        } else if (ref === 'bq') {
            gameCopy.put({type: 'q', color: 'b'}, square);
        } else if (ref === 'br') {
            gameCopy.put({type: 'r', color: 'b'}, square);
        } else if (ref === 'bb') {
            gameCopy.put({type: 'b', color: 'b'}, square);
        } else if (ref === 'bn') {
            gameCopy.put({type: 'n', color: 'b'}, square);
        } else if (ref === 'bp') {
            gameCopy.put({type: 'p', color: 'b'}, square);
        } else if (ref === 'remove') {
            gameCopy.remove(square);
        }

        setGame(gameCopy);
        setFen(gameCopy.fen());
        chessRef.current = '';
    }

    const startPosition = () => {
        const gameCopy = {...game};
        gameCopy.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        setGame(gameCopy);
        setFen(gameCopy.fen())
    }
    const clearPosition = () => {
        const gameCopy = {...game};
        gameCopy.load('8/8/8/8/8/8/8/8 w - - 0 1');
        setGame(gameCopy);
        setFen(gameCopy.fen())
    }

    const onChangeTurn = (value: ISelect) => {
        setTurn(value);
        const fen = new FenParser(game.fen());
        fen.turn = value.slug;
        game.load(fen.toString());
        setFen(fen.toString())
    }

    const BlackRow: FC<{ piece: string, setPiece: (piece: string) => void }> = ({piece, setPiece}) => {
        return (
          <div className="flex mb-5 items-center">
              <button className={['mr-2 w-14', piece === 'bk' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'bk';
                      }}>
                  <img src={Bk} className='w-full h-full' alt="Bk"/>
              </button>
              <button className={['mr-2 w-14', piece === 'bq' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'bq';
                      }}>
                  <img src={Bq} className='w-full h-full' alt="Bq"/>
              </button>
              <button className={['mr-2 w-14', piece === 'br' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'br';
                      }}>
                  <img src={Br} className='w-full h-full' alt="Br"/>
              </button>
              <button className={['mr-2 w-14', piece === 'bb' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'bb';
                      }}>
                  <img src={Bb} className='w-full h-full' alt="Bb"/>
              </button>
              <button className={['mr-2 w-14', piece === 'bn' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'bn';
                      }}>
                  <img src={Bn} className='w-full h-full' alt="Bn"/>
              </button>
              <button className={['mr-2 w-14', piece === 'bp' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'bp';
                      }}>
                  <img src={Bp} className='w-full h-full' alt="Bp"/>
              </button>
              <button
                className={['mr-2 w-12 h-12 mt-2 flex justify-center items-center text-[35px] text-red-600', piece === 'remove' && 'border-2 rounded-lg border-apricot'].join(' ')}
                title='Remove' onDragStart={() => void setPiece('remove')}><BsFillTrashFill/></button>
          </div>
        )
    };


    const WhiteRow: FC<{ piece: string, setPiece: (piece: string) => void }> = ({piece, setPiece}) => {
        return (
          <div className="flex mb-5 items-center">
              <button className={['mr-2 w-14', piece === 'k' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'k';
                      }}>
                  <img src={Wk} className='w-full h-full' alt="Wk"/>
              </button>
              <button className={['mr-2 w-14', piece === 'q' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'q';
                      }}>
                  <img src={Wq} className='w-full h-full' alt="Wq"/>
              </button>
              <button className={['mr-2 w-14', piece === 'r' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'r';
                      }}>
                  <img src={Wr} className='w-full h-full' alt="Wr"/>
              </button>
              <button className={['mr-2 w-14', piece === 'b' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'b';
                      }}>
                  <img src={Wb} className='w-full h-full' alt="Wb"/>
              </button>
              <button className={['mr-2 w-14', piece === 'n' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'n';
                      }}>
                  <img src={Wn} className='w-full h-full' alt="Wn"/>
              </button>
              <button className={['mr-2 w-14', piece === 'p' && 'border-2 rounded-lg border-apricot'].join(' ')}
                      onDragStart={() => {
                          chessRef.current = 'p';
                      }}>
                  <img src={Wp} className='w-full h-full' alt="Wp"/>
              </button>
              <button
                className={['mr-2 w-12 h-12 mt-2 flex justify-center items-center text-[35px] text-red-600', piece === 'remove' && 'border-2 rounded-lg border-apricot'].join(' ')}
                title='Remove' onDragStart={() => void setPiece('remove')}><BsFillTrashFill/></button>
          </div>
        )
    }

    const setStep = (piece: Piece, source: Square) => {
      if (isPieceLeave.current) {
        return;
      }

      const currentPiece = piece[0] === 'b' ? piece.toLowerCase() : piece[1].toLowerCase();
      if (!squareTargetRef) {
        return;
      }

      addFigure(squareTargetRef.current as Square, currentPiece, source)
    }

    const handleChangePosition = () => {
      if (!chessContainerRef.current) {
        return;
      }

      const dropFigure = (event: DragEvent) => {
        if (!chessRef.current) {
          return;
        }

        //@ts-ignore
        addFigure(event.currentTarget.getAttribute('data-square'));
      };

      const dragLeave = () => {
        isPieceLeave.current = true;
      }

      const dragOn = () => {
        isPieceLeave.current = false;
      }

      chessContainerRef.current.removeEventListener('dragleave', dragLeave)
      chessContainerRef.current.removeEventListener('dragover', dragOn)

      chessContainerRef.current.addEventListener('dragleave', dragLeave)
      chessContainerRef.current.addEventListener('dragover', dragOn)

      chessContainerRef.current.querySelectorAll<HTMLDivElement>('[data-square]').forEach((item: HTMLDivElement) => {
        item.removeEventListener('drop', dropFigure)
      })

      chessContainerRef.current.querySelectorAll<HTMLDivElement>('[data-square]').forEach((item: HTMLDivElement) => {
        item.addEventListener('drop', dropFigure)
      })
    }

    useEffect(() => {
      if(!modalRef.current) {
        return;
      }

      const isDragEndOverBoard = () => {
        if (!isPieceLeave.current || !selectedPiece.current) {
          return;
        }

        const gameCopy = {...game};
        gameCopy.remove(selectedPiece.current);
        setGame(gameCopy);
        setFen(gameCopy.fen());
        isPieceLeave.current = false;
      }

      modalRef.current.addEventListener('dragend', isDragEndOverBoard)

      return () => {
        if(!modalRef.current) {
          return;
        }

        modalRef.current.removeEventListener('dragend', isDragEndOverBoard)
      }
    }, [modalRef.current]);

    return (
        <>
            <Modal active={modal} setActive={setModal} className='items-center !max-w-[1200px] !w-full'>
                <h1 className='text-2xl font-semibold tracking-wider text-gray-800 capitalize '>{editChessboardText[language]}</h1>
                <div className='w-full' ref={modalRef}>
                    <div className="flex my-3 justify-center">
                        <div className="flex flex-col items-center">
                            {orientation === 'white'
                              ?
                              <BlackRow piece={piece} setPiece={setPiece}/>
                              :
                              <WhiteRow piece={piece} setPiece={setPiece}/>
                            }
                            <div className="w-[500px] h-[500px] mr-5" ref={chessContainerRef}>
                                <Chessboard
                                    id={"customSquare"}
                                    position={game.fen()}
                                    getPositionObject={handleChangePosition}
                                    onPieceDragBegin={(_, square) => {
                                      selectedPiece.current = square;
                                    }}
                                    onPieceDragEnd={(piece, source) => {
                                      setStep(piece, source)
                                    }}
                                    onDragOverSquare={(square) => {
                                      squareTargetRef.current = square
                                    }}
                                    boardOrientation={orientation}
                                    />
                            </div>
                            {orientation === 'white'
                                ?
                                <WhiteRow piece={piece} setPiece={setPiece}/>
                                :
                                <BlackRow piece={piece} setPiece={setPiece}/>
                            }
                            <div className="flex items-center">
                                <p className='mb-1 font-semibold mr-2'>FEN:</p>
                                <p className="bg-white border-apricot border rounded-lg p-2 self-start">{fen}</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center mb-5">
                                <p className='text-lg font-semibold mr-5'>{moveText[language]}:</p>
                                <Select className='!mb-0' options={turnList} value={turn} onChange={onChangeTurn}/>
                            </div>
                            <div className="flex flex-col">
                                <p className='text-lg font-semibold mb-5'>{castlingText[language]}:</p>
                                <div className="flex flex-wrap">
                                    <CheckBox wrapperClass='basis-1/2 mb-3' checked={castling.wOO}
                                              onChange={() => setCastling({...castling, wOO: castling.wOO ? false : true})}
                                              label={`${whiteText[language]} О-О`}/>
                                    <CheckBox wrapperClass='basis-1/2 mb-3' checked={castling.wOOO}
                                              onChange={() => setCastling({...castling, wOOO: castling.wOOO ? false : true})}
                                              label='О-О-О'/>
                                    <CheckBox wrapperClass='basis-1/2 mb-3' checked={castling.bOO}
                                              onChange={() => setCastling({...castling, bOO: castling.bOO ? false : true})}
                                              label={`${blackText[language]} О-О`}/>
                                    <CheckBox wrapperClass='basis-1/2 mb-3' checked={castling.bOOO}
                                              onChange={() => setCastling({...castling, bOOO: castling.bOOO ? false : true})}
                                              label='О-О-О'/>
                                </div>
                            </div>

                            <p className='text-lg font-semibold mb-2'>{elementsText[language]}:</p>
                            <button className='mr-2 w-14 mb-5' onDragStart={() => chessRef.current = 'star'}><img src={Star}
                                                                                                          className={['w-full h-full', piece === 'star' && 'border-2 rounded-lg border-apricot'].join(' ')}
                                                                                                          alt="star"/>
                            </button>
                            <div className="flex flex-col items-start mb-5">
                                <button
                                    className='flex items-center text-lg text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-2 font-semibold'
                                    onClick={() => startPosition()}><BsArrowCounterclockwise
                                    className='mr-2'/>{startingPositionText[language]}</button>
                                <button
                                    className='flex items-center text-lg text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-2 font-semibold'
                                    onClick={() => clearPosition()}><RiDeleteBin6Line
                                    className='mr-2'/>{clearBoardText[language]}</button>
                                <button
                                    className='flex items-center text-lg text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-2 font-semibold'
                                    onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}>
                                    <HiArrowsUpDown className='mr-2'/>{flipBoardText[language]}</button>
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => void createCustomMaterialHandler()}
                            className='mt-2'>{movePositionToOnlineLessonText[language]}</Button>
                </div>
            </Modal>
            <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError}/>
        </>
    )
}

export default EditChessBoardModal;
