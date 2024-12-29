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

const TournamentBeginning = () => {

  const location = useLocation();

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
  const { user } = useAppSelector((state) => state.UserSlice);
  return (
    <div className="bg-tour sm:min-h-[calc(100%_-_1rem)]   pb flex mt-2 w-11/12  ml-6 rounded-3xl flex-col items-center shadow-2xl">
      {user.role == 'TRANER' && (
        <div className="bg-gradient-button flex flex-row w-11/12 h- px-2 py-5 ml-5 min-h-36 items-center rounded-3xl mt-5 overflow-y-hidden align-middle">
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
          <div className="bg-white h-[300px] sm:ml-5 ml-2 mt-5 max-w-[400px]  rounded-3xl mr-auto">
            <div className="flex">
              <img src={rabbit} className="ml-6 mt-5 h-[70px] w-[70px]" />
              <p className="mt-4 ml-4 font-medium text-xl">
                7+3 • Рапид • 7 туров
                <br />
                Рейтинговый • Швейцарка
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
          <div className="flex flex-col">
            <div className={` bg-white h-[calc(384px-50px)] shadow-2xl max-w-[400px]  rounded-3xl  border-[#6d573383] border sm:ml-5 ml-2 relative ${user.role=='DIRECTOR' ?  'mt-10' : 'mt-5'}`}>
              <div className="  flex bg-gradient-chat h-12 rounded-3xl text-2xl font-bold text-[#6D5733] items-center justify-center ">
                Чат
              </div>
              <div className="ml-2 mb-8 overflow-auto max-h-[calc(384px-100px)] ">
                {messages.map((message) => (
                  <div className="text-wrap overflow-x-auto">
                    <strong>{message.sender}</strong> {message.text}
                  </div>
                ))}
              </div>
            </div>
            <button className="bg-gradient-button text-pink-600 text-2xl h-12 rounded-3xl font-semibold relative m-10">
              Как вести турнир
            </button>
          </div>
        </div>
        <div
          className={`bg-white ${
            user.role == 'TRANER' && 'h-[60vh]'
          } mt-5 w-[80vw] sm:w-[calc(100%-800px)]  flex ml-6 flex-col sm:mr-5 rounded-3xl`}
        >
          <div className="flex">
            <img src={tour} className="h-11 mt-10 ml-10 w-11" />
            <h1 className="text-[30px] mt-7 ml-4 text-gray-600 h-11 text-nowrap">
              {(locations == 'Арена' || locations == 'Швейцарский' ) ? `ТУРНИР №5 ${locations}` : `${locations} турнир`}
            </h1>
            <p className="text-red-600 text-2xl  ml-auto  mt-11  w-[180px] font-bold h-11">
              {(locations == 'Арена' || locations == 'Швейцарский' ) ?  <>Через <strong>1:45</strong> минут</>  : <>24:11</>}
            </p>
          </div>
          <div className='h-12 w-full border-b flex items-center border-t'>
          <span className='ml-10 text-xl'>1</span>
            <p className='text-red-500 ml-5 font-bold'>вс 11:00 40 мин. Армен. Новикович (РУППА 1)</p>
            <span className='ml-auto mr-14 text-xl'>60</span>
          </div>
          <div className='h-12 w-full border-b flex items-center border-t'>
          <span className='ml-10 text-xl'>1</span>
            <p className='text-red-500 ml-5 font-bold'>вс 11:00 40 мин. Армен. Новикович (РУППА 1)</p>
            <span className='ml-auto mr-14 text-xl'>60</span>
          </div>
          <div className=" w-full h-fullx">
            <div className="bg-[#eaeaea] w-full h-12  flex items-center">
              <img src={magnifier} className="ml-8 h-8" />
              <img src={doubleBack} className="ml-8 h-8" />
              <img src={back} className="ml-8 h-8" />
              <h1 className="ml-8 text-2xl font-semibold">0-0 / 0</h1>
              <img src={next} className="ml-8 h-8" />
              <img src={doubleNext} className="ml-8 h-8" />
            </div>
            <div className="w-full h-14 border borderb-gray-500 flex items-center">
              <p className="text-xl ml-6 font-semibold">1</p>
              <div className="bg-green-600 rounded-full w-3 h-3 ml-8"></div>
              <div className="ml-6 text-xl"><p>anahittadevosyan</p>                <p className='text-red-500 italic text-base font-semibold'>сб 10:00 60 мин. Армен. Новикович</p></div>
              <div className="text-xl mr-auto ml-auto">
                <ColoredNumbers numbers={'024'} />
              </div>
              <div className="text-2xl font-bold mr-10 flex">
                <img src={flame} alt="" />

              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="w-[300px] ">
            <h1 className="mt-5 text-2xl ">
              <strong>#1</strong> Hrachya777{' '}
              <span className="italic font-semibold">(2118)</span>{' '}
              <span className="text-red-500 float-end">7:48</span>
            </h1>
            <div className="bg-white w-[300px] h-96  mt-4 rounded-3xl relative  "></div>
          </div>
          <div className="w-[200px] ">
            <h1 className=" text-2xl ">
              <strong>#1</strong> Hrachya777{' '}
              <span className="italic font-semibold">(2118)</span>{' '}
              <span className="text-red-500 float-end">7:48</span>
            </h1>
            <div className="bg-tour border mt-4 border-gray-300 shadow-xl w-[300px] h-72 mr-10  rounded-3xl   ">
              <div className=" flex bg-gradient-chat h-14 rounded-3xl text-3xl font-bold text-[#6D5733] items-center justify-center ">
                ТОП ИГРЫ
              </div>
              <div className="h-12 border-b-2">
                <div className="float-start ml-4 text-gray-500">
                  <strong>gendel</strong>
                  <br />
                  <span className="bg-white">#5</span> 2256
                </div>
                <div className="float-end mr-4 text-gray-500">
                  <span className="bg-white">#5</span> 2256
                  <br />
                  <strong>gendel</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentBeginning;
