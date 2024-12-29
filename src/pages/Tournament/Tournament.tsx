import group from '../../assets/icons/group.png';
import info from '../../assets/icons/info.png';
import logo from '../../assets/icons/logo.png';
import groupBlack from '../../assets/icons/groupBlack.png';
import groupYellow from '../../assets/icons/groubYellow.png';
import crown from '../../assets/icons/crown.png';
import rabbit from '../../assets/icons/rabbit.png';
import person from '../../assets/person.png';
import { useAppSelector } from '../../hooks/redux';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import TournamentModal from './TournamentModal';
import addTournament from '../../assets/addTournament.png';
import setting from '../../assets/settings.png';
import EditSetting from './EditSetting';
import Paggination from './Paggination';
import TournamentComponent from './TournamentComponent';
import prev from '../../assets/prev.svg'
import next from '../../assets/next.png'

const data = [
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
  { place: 'Межгрупповой', count: '4', time: 'через 10 минут' },
];

const Tournament = () => {
  

  const [openModal, setOpenModal] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [filter, setFilter] = useState('')
  const { user } = useAppSelector((state) => state.UserSlice);
  const dataLimit = user.role == 'TRANER' || user.role == 'DIRECTOR' ? 7 : 10 
  const [pages] = useState(Math.round(data.length / dataLimit));
  const pageLimit = 5
  const [currentPage, setCurrentPage] = useState(1);
  function goToNextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }
  function goToPreviousPage() {
    setCurrentPage((currentPage) => currentPage - 1);
  }
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      {openModal && <TournamentModal setOpenModal={setOpenModal} />}
      {openSetting && <EditSetting setOpenSetting={setOpenSetting} />}
      {user.role == 'STUDENT' && (
          <div className="w-full flex h-[170px] items-center justify-center bg-[#2c2c2c]">
            <button className={`w-[250px] p-4 min-h-[40px] mx-5 rounded-[30px] ${filter == 'tournamentArarat' ? 'bg-gradient-chat' :'bg-gradient-button'}`} onClick={()=>{setFilter('tournamentArarat')}}>
            Турниры Арарат
            </button >
            <button className={`w-[250px] p-4 min-h-[40px] mx-5 rounded-[30px] ${filter == 'tournamentGroup' ? 'bg-gradient-chat' :'bg-gradient-button'}`} onClick={()=>{setFilter('tournamentGroup')}}>
            Турниры Группы
            </button>
            <button className={`w-[250px] p-4 min-h-[40px] mx-5 rounded-[30px] ${filter == 'leageArarat' ? 'bg-gradient-chat' :'bg-gradient-button'}`} onClick={()=>{setFilter('leageArarat')}}>
            Лиги Арарат
            </button>
            <button className={`w-[250px] p-4 min-h-[40px] mx-5 rounded-[30px] ${filter == 'interschool' ? 'bg-gradient-chat' :'bg-gradient-button'}`} onClick={()=>{setFilter('interschool')}}>
            Межшкольние лиги
            </button>
          </div>
        )}
      {!openSetting && (
        <div className="sm:w-[calc(99vw-250px)] h-[98vh] border-2  rounded-[30px]">
          
          {user.role != 'STUDENT' && (
            <div className="h-[200px] flex border-b-2 ">
              <div className="">
                <img src={group} className="h-[115px] ml-8 mt-4 " />
                <img
                  src={info}
                  className="ml-5"
                  onClick={() => {
                    setOpenModal(!openModal);
                  }}
                />
              </div>
              <div className="flex flex-col items-center ml-20 ">
                <h1 className="text-red-600 text-3xl font-semibold mt-[20px]">
                  Ararat International School
                </h1>
                <p className="text-gray-500 mt-[20px]  indent-[50px] text-center">
                  Международная школа Арарат — как в онлайн формате, так и в
                  офлайн формате способствует повышению уровня интеллектуального
                  развития Ваших детей и детей из детских домов разных стран.
                </p>
              </div>
              <img src={logo} className="h-[190px]  ml-auto" />
            </div>
          )}
          {user.role == 'TRANER' && (
            <div className="h-[150px] flex items-center border-b-2 justify-center">
              <div className="flex flex-col items-center justify-center ml-10 mr-auto">
                <img src={groupBlack} className="h-[100px]" />
                <p className="-mt-6 italic font-medium ml-1 hover:underline">
                  Турниристы
                </p>
              </div>
              <h1 className=" text-[40px] text-[#353535]">ТУРНИРЫ</h1>
              <div className="flex flex-col items-center justify-center ml-auto mr-10">
                <img src={crown} className="" />
                <p className=" italic font-medium ml-1 hover:underline">
                  Тренеры
                </p>
              </div>
            </div>
          )}
          {user.role == 'DIRECTOR' && (
            <div className="h-[150px] flex items-center border-b-2 justify-center">
              <div className="flex flex-col items-center justify-center ml-10 ">
                <Link to={`/TournamentPlayersList/`}>
                  {' '}
                  <img src={groupBlack} className="h-[110px]" />
                  <p className="-mt-6 italic font-medium ml-1 hover:underline">
                    Турниристы
                  </p>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center ml-5 ">
                <img src={crown} className="h-[9  0px]" />
                <p className=" italic font-medium ml-1 hover:underline">
                  Тренеры
                </p>
              </div>
              <h1 className=" text-[40px] text-[#353535] mr-auto  ml-auto">
                ТУРНИРЫ
              </h1>

              <div className="flex flex-col items-center justify-center ml-10 hover:underline">
                <img src={addTournament} className="h-[80px] mt-5 " />
                <p className=" italic font-medium  text-[#8A6E3ECC]">
                  Создать турнир
                </p>
              </div>
              <div
                className="flex flex-col items-center justify-center hover:underline "
                onClick={() => {
                  setOpenSetting(true);
                }}
              >
                <img src={setting} className="h-[110px]" />
                <p className=" italic font-medium ml-1 -mt-3  text-red-600">
                  Настройки
                </p>
              </div>
            </div>
          )}
          <div className="h-full">
            <Paggination
              data={data}
              pageLimit={pageLimit}
              dataLimit={dataLimit}
              RenderComponent={TournamentComponent}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
             <div className="flex w-full justify-center mt-5">
        <button
                onClick={goToPreviousPage}
                className={`prev ${currentPage <= 1 ? 'hidden' : ''} h-[30px] font-medium w-[30px] bg-gradient-button rounded-full flex items-center justify-center`}
              >
                        <img src={prev} alt="" />
              </button>
              {getPaginationGroup().map((item, index) => (
                <button
                  key={index}
                  onClick={changePage}
                  className={`h-[30px] font-medium w-[30px] bg-gradient-button rounded-full mx-2   ${
                    currentPage === item
                      ? '   text-blue-600 rounded-full '
                      : null
                  }`}
                >
                  <span>{item}</span>
                </button>
              ))}
              
              
              <button
                onClick={goToNextPage}
                className={` ${currentPage >= pages ? 'hidden' : ''} h-[30px] font-medium w-[30px] bg-gradient-button rounded-full flex items-center justify-center`}
              >
                <img src={next} alt="" />
              </button></div>
    </div>
  );
};

export default Tournament;
