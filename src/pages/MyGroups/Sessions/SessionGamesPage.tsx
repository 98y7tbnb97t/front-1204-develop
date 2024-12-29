import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Chessboard } from 'react-chessboard';
import { useEffect, useLayoutEffect } from 'react';
import { /* seansSocket, */ socket } from '../../../sockets/socket';
import {
  disconnectSeansSocketRoom,
  joinSeansSocketRoom,
} from '../../../sockets/SeansSockets';
import {
  getOneSeans,
  setOneGame,
  setSeansUpdate,
} from '../../../store/reducers/SeansSlice';

const SessionGamesPage = () => {
  const { seansId } = useParams();
  const { oneSeans, oneSeansLoading } = useAppSelector(
    (state) => state.SeansSlice,
  );
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getOneSeans(seansId));
    if (seansId) {
      joinSeansSocketRoom(seansId);
    }

    return () => {
      if (seansId) {
        disconnectSeansSocketRoom(JSON.stringify(seansId));
      }
    }; //
  }, [seansId]);

  useEffect(() => {
    socket.on('seans:getGame', async (data) => {
      dispatch(setOneGame(data));
    });
    socket.on('seans:getSeansGame', async (data) => {
      dispatch(setSeansUpdate(data));
    });
  }, [socket]);

  if (oneSeans) {
    return (
      <div className="p-3">
        <div className=" min-h-screen shadow-md bg-gray-100 rounded-md p-5">
          <div>
            <div>
              <div
                className="grid py-5 items-center"
                style={{ gridTemplateColumns: '5% 70% 25%' }}
              >
                <div className="font-medium text-xl">
                  {oneSeans.status === 'ended' ? 'Завершён' : ''}
                </div>
                <h2 className="text-center text-blue-700 text-4xl font-semibold">
                  {oneSeans.name}
                </h2>
                <div>
                  <Link
                    to={`/session/${seansId}/table`}
                    className="mt-5 bg-gradient-red text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-red flex items-center hover:text-white"
                  >
                    Результаты лиги
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-8 text-2xl pt-7 font-semibold">
                <div className=" text-center">
                  <p className="font-bold">{oneSeans.playings}</p>
                  <p className="font-normal">ИГРАЮТСЯ</p>
                </div>
                <div className="text-green-700 text-center">
                  <p className="font-bold">{oneSeans.wins}</p>
                  <p className="font-normal">ПОБЕД</p>
                </div>
                <div className="text-yellow-500 text-center">
                  <p className="font-bold">{oneSeans.draws}</p>
                  <p className="font-normal">НИЧЬИХ</p>
                </div>
                <div className="text-red-600 text-center">
                  <p className="font-bold">{oneSeans.defeats}</p>
                  <p className="font-normal">ПОРАЖЕНИЙ</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5 flex flex-row flex-wrap gap-5">
            {oneSeans?.games &&
              oneSeans?.games?.map((e: any) => (
                <Link to={`/session/${seansId}/game/${e.user._id}`}>
                  <div style={{ height: '300px', width: '300px' }}>
                    <div className="flex flex-row justify-between">
                      <p>{e.user.sname}</p>
                    </div>
                    <Chessboard arePiecesDraggable={false} position={e.fen} />
                    <div>
                      <p>{oneSeans.seanser?.name}</p> 
                      
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return 'loading';
  }
};

export default SessionGamesPage;
