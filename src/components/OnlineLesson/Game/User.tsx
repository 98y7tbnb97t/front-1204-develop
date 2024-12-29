import { Disclosure } from '@headlessui/react';
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import { BsChevronUp } from '@react-icons/all-files/bs/BsChevronUp';
import { MdOutlineDeleteOutline } from '@react-icons/all-files/md/MdOutlineDeleteOutline';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IMove } from '../../../models/MyGroups/IMove';
import GroupService from '../../../services/GroupService';
import {
  GroupGlobalModeSocket,
  GroupUserCleanSocket,
} from '../../../sockets/GroupSockets';
import { clearUserMoves } from '../../../store/reducers/GroupSlice';
import { getGameMove } from '../../../utils/gameMoves.ts';
import Switch from '../../UI/Switch';
import { ChessInstance } from 'chess.js';

interface UserProps {
  move: IMove;
  i: number;
  moveMode: boolean;
  position?: string;
  allClose: boolean;
  setAllClose: (bool: boolean) => void;
  materialId: string;
  game: ChessInstance;
  setGame: (game: ChessInstance) => void
  isMove?: boolean

}

const User: FC<UserProps> = ({
  move,
  moveMode,
  game,
  setGame,
  position,
  allClose,
  setAllClose,
  materialId,
  isMove = false
}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<boolean>(false);
  const { groupId } = useParams();
  const { user } = useAppSelector((state) => state.UserSlice);
  const group = useAppSelector((state) => state.GroupSlice);
  const setValueHandler = (bool: boolean) => {
    setValue(bool);
    if (groupId) {
      GroupGlobalModeSocket({
        room: groupId,
        user_id: move.user_id,
        bool: bool,
      });
    }
  };

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  const removeMovesHandler = async (user_id: string) => {
    if (groupId) {
      if (user_id === user._id) {
        safeGameMutate((game) => {
          game.load(position);
        });
      }
      dispatch(clearUserMoves(user_id));
      GroupUserCleanSocket({ room: groupId, user_id: user_id });

      const moves = group.game.find((item) => item.user_id === user_id)?.moves;
      if (moves) {
        if (moves?.length > 0) {
          await GroupService.editGroup(groupId, {
            open: true,
            material: materialId,
            deleted: { user_id: user_id, moves: [moves] },
          });
        }
      }
    }
  };

  const [turn, setTurn] = useState<string>('');

  let i = 0;
  useEffect(() => {
    setTurn(game.turn());
  }, [position]);

  return (
    <div key={move.id} className="mb-1">
      <div className='font-bold flex flex-wrap text-lg break-all text-[#353535] relative pl-3'>
      {isMove && <div className='bg-red-500 w-[8px] h-[8px] rounded-full absolute top-[10px] left-0'></div>}
        {user.role !== 'STUDENT' && (
          <Switch
            value={value}
            onChange={setValueHandler}
            className="border-none"
          />
        )}
        <span className="text-[#8A6E3E] mr-2">
          {move.name} {move.sname}:{' '}
        </span>
        {move.deleted && (
          <>
            <Disclosure defaultOpen={true}>
              {({ open, close }) => {
                useEffect(() => {
                  if (allClose) {
                    close();
                    setAllClose(false);
                  }
                }, [allClose]);
                return (
                  /* Use the `open` state to conditionally change the direction of an icon. */
                  <>
                    <Disclosure.Button>
                      <p className="flex text-base items-center">
                        Удаленные ходы{' '}
                        {open ? (
                          <BsChevronUp className="ml-1" />
                        ) : (
                          <BsChevronDown className="ml-1" />
                        )}
                      </p>
                    </Disclosure.Button>
                    <div className="basis-full"></div>
                    <Disclosure.Panel>
                      {move.deleted.map((item) => {
                        let i = 0;
                        return (
                          <>
                            <div className="flex flex-wrap ">
                              <p className="text-sm bg-apricot mt-1 rounded-lg py-[1px] mr-2">
                                Удалено:
                              </p>
                              {item.map((move) => {
                                move.color === 'w' && i++;
                                return (
                                  <p
                                    key={move.move}
                                    className={['mr-1 mt-1 text-sm rounded-lg px-1 py-[1px] bg-apricot line-through'].join(' ')}
                                    >
                                      {move.color === 'w' && i.toString() + '. '}
                                      {move.move}
                                    </p>
                                );
                              })}
                            </div>
                            <div className="basis-full"></div>
                          </>
                        );
                      })}
                    </Disclosure.Panel>
                  </>
                );
              }}
            </Disclosure>

            <div className="basis-full"></div>
          </>
        )}

        {[0].map(() => {
          if (turn === 'b' && move.moves[0]?.color !== 'w') {
            i++;
            return (
              <p
                className={['mr-1 mt-1 text-sm rounded-lg px-1 py-[1px]'].join(
                  ' ',
                )}
              >
                {i.toString() + '. '}...
              </p>
            );
          }
        })}

        {move.moves.map((move) => {
          move.color === 'w' && i++;
          const { peaceName, imgSrc } = getGameMove(move);
          return (
            <p
              key={move.move}
              className={[
                'flex mr-1 mt-1 text-sm rounded-lg px-1 py-[1px]',
                move.color === 'w' ? '' : 'bg-gradient-button shadow-md',
                move.deleted && '!bg-gray-500',
              ].join(' ')}
            >
              {move.color === 'w' && i.toString() + '. '}
              <img src={imgSrc} width={17} />
              {peaceName}
            </p>
          );
        })}
        {(user.role !== 'STUDENT' || moveMode) && (
          <button
            onClick={() => removeMovesHandler(move.user_id)}
            title="Удалить ходы пользователя"
            className="bg-red-500 cursor-pointer ml-3 w-6 h-6 p-1 mt-1 rounded-md flex justify-center items-center text-white"
          >
            <MdOutlineDeleteOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
