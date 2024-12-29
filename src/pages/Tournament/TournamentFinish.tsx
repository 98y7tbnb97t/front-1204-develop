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
import podium1 from '../../assets/podium1.png';
import podium2 from '../../assets/podium2.png';
import podium3 from '../../assets/podium3.png';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import done from '../../assets/Done.png'
import berserk from '../../assets/Berserk.png'
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
  { sender: 'sender1', text: 'hui' },
  { sender: 'sender2', text: 'pizda' },
  {
    sender: 'sender3',
    text: 'zhopaаааааааааааааааааааа аааааааааааааааааааааааааааааааааааааааа   fаааааааааааааааааааааааааааааааааааааааааааааа',
  },
  { sender: 'sender1', text: 'hui' },
  { sender: 'sender2', text: 'pizda' },
  { sender: 'sender3', text: 'zhopa' },
  { sender: 'sender1', text: 'hui' },
  { sender: 'sender2', text: 'pizda' },
  { sender: 'sender3', text: 'zhopa' },
  { sender: 'sender1', text: 'hui' },
  { sender: 'sender2', text: 'pizda' },
  { sender: 'sender3', text: 'zhopa' },
  { sender: 'sender1', text: 'hui' },
  { sender: 'sender2', text: 'pizda' },
  { sender: 'sender3', text: 'zhopa' },
  { sender: 'sender1', text: 'hui' },
  { sender: 'sender2', text: 'pizda' },
  { sender: 'sender3', text: 'zhopa' },
];

const TournamentFinish = () => {
  const { user } = useAppSelector((state) => state.UserSlice);
    const {groupId} = useParams()
    const location = useLocation();

    const [locations, setLocations] = useState('')
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

  return (
    <div className="bg-tour sm:min-h-[calc(100%_-_1rem)] justify-center   pb flex mt-2 w-11/12  ml-6 rounded-3xl flex-col items-center shadow-2xl">
      
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
        <div className="flex flex-col ">
        <div className="bg-white h-[300px] sm:ml-10 ml-2 mt-5 max-w-[400px]  rounded-3xl mr-auto">
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
                {user.role =='DIRECTOR' && <><span className='text-green-400'>
                Вы должны быть ученик</span><br />
                <span className='text-blue-700 underline flex'>Ararat international school <img src={done} className='' /></span></>}
              </p>
            </div>

            <hr className="border-solid border-t-2 border-gray-400 mt-3 w-11/12 ml-3" />
            {user.role =='DIRECTOR' && <div className="">
              <img src={berserk} className='ml-6 h-[22px] inline-block '/>
              <p className='ml-2 font-normal text-lg inline-block'>Берсерк не допускается</p>
            </div>}
           
            <div className="flex">
             
              <div className="bg-green-600 rounded-full w-3 h-3 mt-3 ml-8"></div>
              <div className="flex flex-col ml-2 mt-1">
                <p>Тренер А. Новикович</p>
                <p className="text-gray-500">28 янв. 2024 г., 12:00</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <div className=" bg-white h-[calc(384px-50px)] shadow-2xl  max-w-[400px]  rounded-3xl  border-[#6d573383] border sm:ml-10   relative mt-10">
              <div className=" max-w-[400px] flex bg-gradient-chat h-12 rounded-3xl text-2xl font-bold text-[#6D5733] items-center justify-center ">
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
           <button className="bg-gradient-button text-blue-600 text-xl h-12 rounded-3xl w-[90%] font-semibold relative mt-5 ml-10 hover:underline">
           <Link to={`/Tournament/${groupId}/area/during`}> Вернуться к уроку</Link>
            </button>
          </div>
        </div>

        <div className="bg-white w-[50vw] h-[77vh] ml-10 mt-5 shadow-xl rounded-3xl flex flex-col ">
          <div className="flex">
            {' '}
            <img src={tour} className="h-11 mt-10 ml-10" />
            <h1 className="text-[42px] mt-7 ml-4 text-gray-600 h-11">
              ТУРНИР №5 {locations}
            </h1>
          </div>
          <div className="flex">
            <div className="ml-3 mt-10 ">
              <img src={podium2} className="h-[250px] " />
              <p className="ml-10 italic">
                <strong className="text-lg">elmira_aiguzhinova</strong>{(locations=='Межшкольный'|| locations=='Межгрупповой') && <span className='text-lg ml-2 font-semibold text-red-500 text-nowrap'>{locations=='Межшкольный' ? 'Школа' : 'Группа'} 1</span> } <br />
                Перформанс 1333
                <br />
                Сыграно партий 1<br />
                Победы 100%
              </p>
            </div>
            <div className="ml-3 ">
              <img src={podium1} className="h-[250px] " />
              <p className="ml-10 italic"> 
                <strong className="text-lg">elmira_aiguzhinova</strong>{(locations=='Межшкольный'|| locations=='Межгрупповой') && <span className='text-lg ml-2 font-semibold text-red-500 text-nowrap'>{locations=='Межшкольный' ? 'Школа' : 'Группа'} 1</span> } <br />
                Перформанс 1333
                <br />
                Сыграно партий 1<br />
                Победы 100%
              </p>
            </div>
            <div className="ml-3 mt-20">
              <img src={podium3} className="h-[250px] " />
              <p className="ml-10 italic">
                <strong className="text-lg">elmira_aiguzhinova</strong>{(locations=='Межшкольный'|| locations=='Межгрупповой') && <span className='text-lg ml-2 font-semibold text-red-500 text-nowrap'>{locations=='Межшкольный' ? 'Школа' : 'Группа'} 1</span> } <br />
                Перформанс 1333
                <br />
                Сыграно партий 1<br />
                Победы 100%
              </p>
            </div>
          </div>
          <div className="bg-[#eaeaea] w-full h-12 mt-[50px] flex items-center">
            <img src={magnifier} className="ml-8 h-8" />
            <img src={doubleBack} className="ml-8 h-8" />
            <img src={back} className="ml-8 h-8" />
            <h1 className="ml-8 text-2xl font-semibold">0-0 / 0</h1>
            <img src={next} className="ml-8 h-8" />
            <img src={doubleNext} className="ml-8 h-8" />
            <button className='text-white bg-gradient-red text-xl flex justify-center hover:underline w-[315px] h-[35px] rounded-3xl ml-auto mr-14'>Результаты лиги</button>
          </div>
          <div className="flex items-center border-b-gray-300 border w-full min-h-10">
            <span className="text-gray-500 font-semibold text-xl ml-4">1</span>
            <div className="bg-green-600 rounded-full w-3 h-3 ml-2" />
            <p className="ml-4 text-gray-600 font-medium">
              anahittadevosyan <span className='italic text-gray-900'>(1500)</span>{(locations=='Межшкольный'|| locations=='Межгрупповой') && <span className='text-lg ml-2 font-semibold text-red-500 text-nowrap'>{locations=='Межшкольный' ? 'Школа' : 'Группа'} 1</span> }
            </p>
            <div className="text-gray-500 font-semibold ml-auto">0 2 1 3</div>
            <div className="font-semibold mr-10 ml-5">5</div>
          </div>
          <div className="flex items-center border-b-gray-300 border w-full min-h-10">
            <span className="text-gray-500 font-semibold text-xl ml-4">2</span>
            <div className="bg-green-600 rounded-full w-3 h-3 ml-2" />
            <p className="ml-4 text-gray-600 font-medium">
              anahittadevosyan <span className='italic text-gray-900'>(1500)</span>{(locations=='Межшкольный'|| locations=='Межгрупповой') && <span className='text-lg ml-2 font-semibold text-red-500 text-nowrap'>{locations=='Межшкольный' ? 'Школа' : 'Группа'} 1</span> }
            </p>
          </div>
          <div className="flex items-center border-b-gray-300 border w-full min-h-10">
            <span className="text-gray-500 font-semibold text-xl ml-4">3</span>
            <div className="bg-green-600 rounded-full w-3 h-3 ml-2" />
            <p className="ml-4 text-gray-600 font-medium">
              anahittadevosyan <span className='italic text-gray-900'>(1500)</span>{(locations=='Межшкольный'|| locations=='Межгрупповой') && <span className='text-lg ml-2 font-semibold text-red-500 text-nowrap'>{locations=='Межшкольный' ? 'Школа' : 'Группа'} 1</span> }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentFinish;
