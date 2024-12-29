import { useEffect, useLayoutEffect, useState } from 'react';
import SeansCard from '../../../components/UI/cards/SeansCard';
import StartSeansTable from '../../../components/UI/tables/StartSeansTable';
import { GiCheckMark } from '@react-icons/all-files/gi/GiCheckMark';
import Modal from '../../../components/UI/Modal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  getOneSeans,
  leaveSeans,
  setOneSeans,
  startSeans,
  studentJoin,
} from '../../../store/reducers/SeansSlice';
import {
  disconnectSeansSocketRoom,
  joinSeansSocketRoom,
} from '../../../sockets/SeansSockets';
import { socket/* , seansSocket */ } from '../../../sockets/socket';

const SeansToStartPage = () => {
  const [modal, setModal] = useState<boolean>(false);
  const { seansId } = useParams();
  const { user } = useAppSelector((state) => state.UserSlice);
  const { /*oneSeansLoaing,*/ oneSeans } = useAppSelector(
    (state) => state.SeansSlice,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (seansId) {
      joinSeansSocketRoom(seansId);
    }

    // return ()=>{
    //   if (seansId) {
    //     disconnectSeansSocketRoom(JSON.stringify(seansId));
    //   }
    // }//
  }, [seansId]);

  useEffect(() => {
    dispatch(getOneSeans(seansId));
  }, []);

  useEffect(() => {
    socket.on('seans:getOne', async (d) => {
      dispatch(setOneSeans(d));
    });
  }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

  const startTheGame = async () => {
    let a = await dispatch(
      startSeans({ seansId, playings: oneSeans.games?.length }),
    );
    // @ts-ignore
    navigate(`/session/${a.payload._id}/game/s`);
  };

  return (
    <div className="bg-[#F0F0F0] text-[#353535]">
      <div></div>
      <div className="h-[90vh] grid grid-cols-[1fr_5fr] gap-5 justify-between p-5">
        <div className="flex flex-col justify-between">
          <div>
            <SeansCard
              // seansId={oneSeans._id}
              additionalTime={oneSeans?.additionalTime}
              startTime={oneSeans?.startTime}
              seansTitle={`${oneSeans?.seanser?.name} ${oneSeans?.seanser?.sname}`}
              seanser={oneSeans?.seanser}
              extraTime={oneSeans?.extraTime}
              seanserColor={oneSeans?.seanserColor}
            />
          </div>
          <button
            onClick={() => setModal(true)}
            className="bg-gradient-button text-red-600 underline text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-appricot text-center"
          >
            Как вести сеанс
          </button>
        </div>
        <div className="rounded-2xl shadow bg-white">
          <div className="flex flex-row justify-between border-b-2  p-5">
            <div>
              <h3 className="text-5xl ">{oneSeans?.name}</h3>
            </div>
            <div className="flex flex-col">
              {user.role === 'STUDENT' ? (
                oneSeans?.status === 'playing' ? (
                  <Link
                    to={`/session/${seansId}/game/${user._id}`}
                    className="bg-gradient-button-green shadow-lg rounded-3xl mt-4 py-3 px-4 font-semibold text-white flex flex-row items-center justify-center"
                  >
                    Старт ({oneSeans?.games?.length}){' '}
                    <GiCheckMark className="ml-3" />
                  </Link>
                ) : (
                  <>
                    {oneSeans?.games?.find(
                      (e: any) => e?.user?._id === user._id,
                    ) ||
                    oneSeans?.studentsJoin?.find(
                      (e: any) => e?._id === user._id,
                    ) ? (
                      ''
                    ) : (
                      <button
                        onClick={() => {
                          dispatch(studentJoin(seansId));
                        }}
                        className="bg-gradient-blue shadow-lg rounded-3xl mt-4 py-3 px-10 font-semibold text-white flex flex-row items-center justify-center"
                      >
                        Участвовать
                      </button>
                    )}
                    {oneSeans?.studentsJoin?.find(
                      (e: any) => e?._id === user._id,
                    ) && (
                      <button
                        onClick={() => {
                          dispatch(leaveSeans(seansId));
                        }}
                        className="bg-gradient-blue shadow-lg rounded-3xl mt-4 py-3 px-4 font-semibold text-white flex flex-row items-center justify-center"
                      >
                        Покинуть
                      </button>
                    )}
                  </>
                )
              ) : (
                <>
                  <button className="bg-gradient-red shadow-lg rounded-3xl py-3 px-10 font-semibold text-white flex flex-row items-center justify-center">
                    Отменить
                    <span className="ml-5">X</span>
                  </button>
                  {/* <button
                    //  onClick={()=>{

                    // }}
                    className="bg-gradient-blue shadow-lg rounded-3xl mt-4 py-3 px-4 font-semibold text-white flex flex-row items-center justify-center"
                  >
                    Принять случайного кандидата{' '}
                    <GiCheckMark className="ml-3" />
                  </button> */}
                </>
              )}
              {user.role === 'STUDENT' ? (
                <></>
              ) : (
                <button
                  disabled={!oneSeans?.games?.length}
                  onClick={startTheGame}
                  className="bg-gradient-button-green shadow-lg rounded-3xl mt-4 py-3 px-4 font-semibold text-white flex flex-row items-center justify-center"
                >
                  Старт ({oneSeans?.games?.length})
                  <GiCheckMark className="ml-3" />
                </button>
              )}
            </div>
          </div>
          <StartSeansTable
            leftData={oneSeans?.studentsJoin}
            rightData={oneSeans?.games}
            startPosition={oneSeans?.startPosition}
          />
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
            мероприятия, в котором один человек (сеансёр) одновременно играет в
            интеллектуальную игру (шахматы, шашки, го) с несколькими
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
};

export default SeansToStartPage;
