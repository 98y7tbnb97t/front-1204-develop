import { useEffect, useState } from 'react';
import Modal from '../../../components/UI/Modal';
import { IoIosAlert } from '@react-icons/all-files/io/IoIosAlert';
import { FaUsers } from '@react-icons/all-files/fa/FaUsers';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { IoMdSettings } from '@react-icons/all-files/io/IoMdSettings';
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import logo from '../../../assets/2.png';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getAllSeans, pushSeansList } from '../../../store/reducers/SeansSlice';
import { socket/* , seansSocket */ } from '../../../sockets/socket';
import public_icon from '../../../assets/icons/public_icon.png';
import private_icon from '../../../assets/icons/school.png';


const CreateSeansDirectorPage = () => {
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { seansList } = useAppSelector((state) => state.SeansSlice);
  const { user } = useAppSelector((state) => state.UserSlice);

  useEffect(() => {
      dispatch(getAllSeans({}));
  }, []);

  useEffect(() => {
    socket.on('seans:getall', async (d) => {
      dispatch(pushSeansList(JSON.parse(d)));
    });
  }, [socket]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="p-5">
      <div className="bg-gray-200 rounded-3xl shadow-lg">
        <div className="flex flex-row bg-white mb-2">
          <div>
            <svg
              width="130"
              height="135"
              viewBox="0 0 130 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M45.0048 113.353H85.8138L83.5341 108.268C82.7605 106.41 82.0637 105.006 81.3407 103.098C76.4119 90.0975 73.8472 79.4437 73.8472 64.2588H56.9714C56.9714 74.3358 55.6961 83.1291 53.4221 91.0859C51.8279 96.6646 48.8346 105.346 46.2361 110.595C45.7794 111.518 45.2618 112.245 45.0039 113.352L45.0048 113.353Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M45.6211 21.9117C45.653 23.3586 47.0502 26.3782 47.5754 27.9358C48.2937 30.0673 49.0851 31.8602 49.8044 33.9918L54.2127 45.8449H75.6909C75.8851 45.0131 76.3746 43.8625 76.7422 42.9069L80.0327 33.9242C80.5288 32.5917 84.1766 23.1795 84.2817 21.9117C83.3308 22.4143 82.6875 22.7238 81.6972 23.3164C80.6685 23.9325 79.9155 24.1848 78.8915 24.8074C75.8297 26.6689 75.8222 25.5089 74.1099 23.1851L68.7554 15.6531C68.2049 14.8204 67.3197 13.8358 67.0993 13.0134C61.5272 13.0134 63.1786 12.7405 59.5589 17.7462L54.1349 25.2351C52.5361 26.6736 49.3214 23.8706 45.6211 21.9117Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.03609 117.029H33.6509C33.8375 114.791 34.7443 113.807 36.7192 113.347C36.437 112.137 34.0307 105.958 32.851 101.26C31.4688 95.7541 30.8892 91.6608 30.8892 85.4248H13.7059C13.7059 103.094 6.98885 112.935 6.03516 117.029H6.03609Z"
                fill="black"
                fillOpacity="0.71"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M93.793 113.347C95.7632 113.511 96.8613 114.844 96.8613 117.029H124.784C119.185 106.449 117.772 97.0398 116.806 85.4248H99.9305C99.9305 93.4735 97.2364 106.172 93.7939 113.347H93.793Z"
                fill="black"
                fillOpacity="0.71"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M30.8838 134.828H99.9227V126.236H30.8838V134.828Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.71512 60.571C9.71512 63.4977 9.66448 64.2686 10.9408 67.0162C11.63 68.5006 12.4909 69.3371 13.6218 70.4718C23.3059 80.1822 39.2551 68.5494 33.8603 56.6775C27.7358 43.202 9.71512 48.9898 9.71512 60.572V60.571Z"
                fill="black"
                fillOpacity="0.71"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M95.9424 60.574C95.9424 65.4391 96.4544 67.0417 99.8528 70.471C104.695 75.3586 112.561 75.1241 117.357 70.3285C125.663 62.0219 118.57 48.9141 109.443 48.9141H107.602C101.716 48.9141 95.9424 54.6878 95.9424 60.574Z"
                fill="black"
                fillOpacity="0.71"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M36.7207 123.168H93.793V116.418H36.7207V123.168Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.512695 127.461C0.512695 128.168 0.726502 128.382 1.43356 128.382H27.8218C27.8218 123.632 28.1669 123.165 33.6518 123.165V120.097H0.513633V127.461H0.512695Z"
                fill="black"
                fillOpacity="0.71"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M96.8604 123.165H99.3154C101.831 123.165 102.998 124.679 102.998 127.154V128.382H129.999V120.097H96.8613V123.165H96.8604Z"
                fill="black"
                fillOpacity="0.71"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M52.0577 53.5165H78.7526C81.9419 53.5165 82.1416 48.9141 79.0592 48.9141H51.751C48.5946 48.9141 48.7671 53.5165 52.0577 53.5165Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.71578 79.5956C9.71578 81.4796 11.1759 82.3573 13.0907 82.3573C16.3119 82.3573 31.7154 82.905 33.6631 81.7572C36.0046 80.3777 34.4423 77.1406 32.7281 77.1406H12.1699C10.6854 77.1406 9.71484 78.1112 9.71484 79.5956H9.71578Z"
                fill="black"
                fillOpacity="0.71"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M95.9424 79.5956C95.9424 81.4055 97.1877 82.3573 99.3173 82.3573H118.035C122.316 82.3573 121.37 77.1406 118.956 77.1406H98.3974C96.913 77.1406 95.9424 78.1112 95.9424 79.5956Z"
                fill="black"
                fillOpacity="0.71"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M53.9092 61.1845H76.9215V56.582H53.9092V61.1845Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M60.041 5.03403C60.041 12.1581 69.8602 11.3657 69.8602 5.34067C69.8602 -1.28921 60.041 -1.3436 60.041 5.03403Z"
                fill="black"
              />
            </svg>
            <button
              onClick={() => setModal(true)}
              className="text-blue-600 underline flex flex-row items-center py-1 my-2 text-xl font-semibold hover:text-blue-800"
            >
              <IoIosAlert className="text-3xl" />{' '}
              <span className="p-1 mb-1.5">Как вести сеанс</span>
            </button>
          </div>
          <div>
            <h1 className="text-red-500 text-3xl font-semibold text-center">
              Ararat International School
            </h1>
            <p className="text-center text-base text-gray-600">
              Международная школа Арарат — как в онлайн формате, так и в офлайн
              формате способствует повышению уровня интеллектуального развития
              Ваших детей и детей из детских домов разных стран.
            </p>
            <h6 className="text-lg text-center text-[#FF00D6] font-semibold">
              Руководители клуба: GM Elina, GM Zaven, GM Vahe, FM Lia, Hrachya,
              Anahit 
            </h6>
          </div>
          <div>
            <img className="w-52 h-52" src={logo} alt="logo" />
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between items-center py-5 my-1 bg-white px-5">
            <div>
              <FaUsers />
              <p className="font-semibold text-xl text-center">Сеансисты</p>
            </div>
            <h3 className="text-4xl font-medium">СЕАНСЫ</h3>
            <div className="flex flex-row font-semibold">
              {user.role == 'DIRECTOR' ? (
                <>
                  {' '}
                  <Link to={`/session/create`} className="flex flex-col items-center mr-8">
                    <span className="text-white bg-gradient-appricot w-11 h-11 flex items-center justify-center rounded-full">
                      <FaPlus className="text-2xl" />
                    </span>
                    <span className="text-[#DA3535]">Создать сеанс</span>
                    <span className="text-red-600">(не готово)</span>
                  </Link>
                  {/* <button className="text-[#DA3535] flex flex-col items-center ">
                    <span className="w-12 h-12 flex items-center justify-center">
                      <IoMdSettings className="text-7xl" />
                    </span>
                    <span>Настройки</span>
                  </button> */}
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="mt-2 bg-white rounded-b-xl">
            <ul>
              {seansList?.length ?
                seansList?.map((e) => (
                  <Link
                    to={e.status === 'created' ? `tostart/${e._id}`: `${e._id}/game/s` }
                    // onClick={()=>{}}
                    className="grid border-b py-2 px-5 hover:bg-slate-200 hover:cursor-pointer"
                    style={{ gridTemplateColumns: '4fr 2fr 1fr 1fr' }}
                    key={e._id}
                  >
                    <div>
                      <p className="text-xl">{e.name}</p>
                      <p className="text-gray-600">
                        Сеанс №{e.num} Сеансёр: {e.seanser?.sname}{' '}
                        {e.seanser?.name} • {e.s} • Стандарт
                      </p>
                    </div>
                    <div>
                      <p className="text-xl">
                        {e.visibility === 'private' ? 'Школьный' : 'Публичный'}
                      </p>
                      <p>{e.whenStarts}</p>
                    </div>
                    <div className="flex flex-row items-center">
                      <span className="mr-1">
                        <FaUser />
                      </span>
                      <span>{e.games?.length}</span>
                    </div>
                    <div>{e.visibility === 'private' ? <img src={private_icon} alt="private" /> : <img src={public_icon} alt="public" /> }</div>
                  </Link>
                )):""}
            </ul>
          </div>
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

export default CreateSeansDirectorPage;
