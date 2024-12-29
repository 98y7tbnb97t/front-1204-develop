import rabbit from '../../assets/icons/rabbit.png';
import lock from '../../assets/icons/lock.png';
import setting from '../../assets/icons/setting.png';
import tour from '../../assets/icons/TournamentBlack.png';
import magnifier from '../../assets/icons/magnifier.png';
import doubleBack from '../../assets/icons/doubleBack.png';
import doubleNext from '../../assets/icons/doubleNext.png';
import next from '../../assets/icons/next.png';
import back from '../../assets/icons/back.png';
import done from '../../assets/Done.png';
import berserk from '../../assets/Berserk.png';
import { useAppSelector } from '../../hooks/redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  { sender: 'sender2', text: 'piprivetzda' },
  { sender: 'sender3', text: 'privet' },
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  { sender: 'sender3', text: 'privet' },
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  { sender: 'sender3', text: 'zhprivetopa' },
  { sender: 'sender1', text: 'privet' },
  { sender: 'sender2', text: 'privet' },
  { sender: 'sender3', text: 'privet' },
];

const TouranamentStart = () => {
  const location = useLocation();

  const [locations, setLocations] = useState('');
  useEffect(() => {
    switch (location.pathname.split('/')[3]) {
      case 'intergroup':
        setLocations('Межгрупповой');
        break;
      case 'interschool':
        setLocations('Межшкольный');
        break;
      case 'Swiss':
        setLocations('Швейцарский');
        break;
      case 'area':
        setLocations('Арена');
        break;
      default:
        break;
    }
  }, []);

  const { user } = useAppSelector((state) => state.UserSlice);
  return (
    <div className="bg-tour sm:ml-10 flex mt-2 w-11/12 overflow-auto   rounded-3xl flex-col items-center shadow-2xl">
      {user.role == 'TRANER' && (
        <div className="bg-gradient-button flex flex-row w-11/12  px-2 py-5 ml-5 min-h-36 items-center rounded-3xl mt-2 overflow-auto align-middle">
          <h1 className="text-3xl mr-5 ml-5 whitespace-nowrap ">
            Турнир №5 {locations}
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
        <div className="flex flex-col">
          <div className="bg-white h-[300px] sm:ml-10 ml-2 mt-5 max-w-[400px]  rounded-3xl mr-auto">
            <div className="flex">
              <img src={rabbit} className="ml-6 mt-5 h-[70px] w-[70px]" />
              <p className="mt-4 ml-4 font-medium text-xl">
                7+3 • Рапид • 7 туров
                <br />
                Рейтинговый • {locations}
              </p>
              <img src={setting} className="w-10 h-10 ml-auto mr-2 mt-5" />
            </div>
            <div className="flex items-center">
              <img src={lock} className="ml-6 mt-5 h-[60px]" />
              <p className="mt-3 ml-7 font-medium text-base text-red-600">
                Рейтинг ≥ 1200 в Рапид X<br />
                Лига X <br />
                {user.role == 'DIRECTOR' && (
                  <>
                    <span className="text-green-400">
                      Вы должны быть ученик
                    </span>
                    <br />
                    <span className="text-blue-700 underline flex">
                      Ararat international school{' '}
                      <img src={done} className="" />
                    </span>
                  </>
                )}
              </p>
            </div>

            <hr className="border-solid border-t-2 border-gray-400 mt-3 w-11/12 ml-3" />
            {user.role == 'DIRECTOR' && (
              <div className="">
                <img src={berserk} className="ml-6 h-[22px] inline-block " />
                <p className="ml-2 font-normal text-lg inline-block">
                  Берсерк не допускается
                </p>
              </div>
            )}

            <div className="flex">
              <div className="bg-green-600 rounded-full w-3 h-3 mt-3 ml-8"></div>
              <div className="flex flex-col ml-2 mt-1">
                <p>Тренер А. Новикович</p>
                <p className="text-gray-500">28 янв. 2024 г., 12:00</p>
              </div>
            </div>
          </div>
          <div className=" bg-white h-96 mt-5 max-w-[400px] rounded-3xl  border-[#6d573383] border sm:ml-10 ml-2 relative  ">
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
          {(user.role == 'TRANER' || user.role == 'DIRECTOR') ? (<button className="bg-gradient-button text-pink-600 text-2xl h-12 rounded-3xl ml-14 font-semibold relative m-5">
            Как вести турнир 
          </button>):(
            <span className='text-3xl text-wrap w-[400px] text-center sm:ml-10 mt-5 font-medium'>Мое место в лиге <br />
            <p className='text-red-600'>Название лиги<br />
            ТАБЛИЦА</p></span>
          )}
        </div>
        <div
          className={`bg-white ${
            user.role == 'TRANER' && 'h-[60vh]'
          } mt-5 w-[80vw] sm:w-[calc(100%-550px)] sm:ml-auto flex ml-6 flex-col sm:mr-10 rounded-3xl `}
        >
          <div className="flex min-h-[150px] flex-wrap ">


            <h1 className="text-[38px] sm:mt-7 sm:ml-4 text-gray-600 min-h-11 text-center">
            <img src={tour} className="h-11  sm:mt-2  w-11 float-left" /> ТУРНИР №5 {locations}
            </h1>
            <p className="text-red-600 text-2xl ml-auto  sm:mt-11 mr-11 font-semibold h-11 relative">
              Через <strong>1:45</strong> минут
            </p>
          </div>

         {(user.role == 'STUDENT' ) && (locations == 'Межгрупповой' || locations == 'Межшкольный') && <> <div className="flex w-full border-gray-300 items-center border-t border-b h-[100px] mt-10 font-bold text-xl ">
            <span className="ml-10 text-gray-600"> 1</span>
            <p className="text-red-500 font-bold text-base ml-10">
              {locations == 'Межгрупповой' ? 'вс 11:00 40 мин. Армен. Новикович (ГРУППА 1)' : 'Школа 1'}
            </p>
          </div>
          <div className="flex w-full items-center border-b-2 h-[100px] font-bold text-xl">
            <span className="ml-10 text-gray-600"> 2</span>
            <p className="text-blue-800 font-bold text-base ml-10">
            {locations == 'Межгрупповой' ? 'вс 11:00 40 мин. Армен. Новикович (ГРУППА 2)' : 'Школа 1'}
            </p>
          </div></>}
          <div className=" w-full h-full ">
            <div className="bg-[#eaeaea] w-full sm:h-12  flex items-center justify-center sm:justify-start flex-wrap py-1">
              <img src={magnifier} className="sm:ml-8 ml-1 h-6" />
              <img src={doubleBack} className="sm:ml-8 ml-1 h-6" />
              <img src={back} className="sm:ml-8 ml-1 h-6" />
              <div className="sm:ml-8 ml-1 text-2xl font-semibold text-nowrap ">
                0-0 / 0
              </div>
              <img src={next} className="h-6 ml-1 " />
              <img src={doubleNext} className="h-6 ml-1 " />
              {(user.role == 'STUDENT' ) && <button className=" sm:ml-auto sm:mr-10 w-[180px] bg-gradient-button h-[35px] rounded-[30px] flex items-center ">
                <div className="border-[10px] border-solid border-transparent border-l-[15px] border-l-black w-[20px] h-[20px] ml-5"></div>{' '}
                <p className=" mr-auto font-semibold text-xl">Участвовать</p>
              </button>}
            </div>
            <div className="w-full  border borderb-gray-500 flex items-center">
              <p className="text-xl ml-6 font-semibold">1</p>
              <div className="bg-green-600 rounded-full w-3 h-3 ml-8"></div>
              <div className="ml-6">
                <p className="text-xl">anahittadevosyan</p>
                <p className="italic text-red-600 font-semibold ">
                  вс 11:00 40 мин. Армен. Новикович
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouranamentStart;
