import { useState } from 'react';
import x from '../../assets/х.png';
import Switch from '../../components/UI/Switch';
import TournamentSwitch from '../../components/UI/TournamentSwitch';
const EditSetting = ({ setOpenSetting }: any) => {
  const [toggles, setToggles] = useState({
    toggle1: false,
    toggle2: false,
    toggle3: false,
    toggle4: false,
    toggle5: false,
    toggle6: false,
    toggle7: false,
    toggle8: false,
    toggle9: false,
    toggle10: false,
    toggle11: false,
    toggle12: false,
    toggle13: false,
    toggle14: false,
    toggle15: false,
    toggle16: false,
    toggle17: false,
    toggle18: false,
    toggle19: false,
    toggle20: false,
    toggle21: false,
    toggle22: false,
    toggle23: false,
    toggle24: false,
    toggle25: false,
    toggle26: false,
    toggle27: false,
    toggle28: false,
  });

  const handleToggleChange = (name: any) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [name]: !prevToggles[name],
    }));
  };
  return (
    <div className="w-[calc(99vw-250px)] h-[98vh] border-2 border-[#B7975AD9] rounded-[30px] flex flex-col items-center">
      <h1 className="text-[40px] text-gray-700">Редактировать настройки</h1>
      <input
        type="text"
        className="w-[90%] border-2 border-[#B7975AD9] h-14 mt-10 rounded-[30px] placeholder:text-black placeholder:font-semibold placeholder:text-lg text-lg shadow-xl text-center"
        placeholder="Имя"
      />
      <input
        type="text"
        className="w-[90%] border-2 border-[#B7975AD9] h-24 mt-10 rounded-[30px] shadow-x  placeholder:font-semibold placeholder:text-lg text-lg text-center"
        placeholder="Описание"
      />
      <input
        type="text"
        className="w-[90%] border-2 border-[#B7975AD9] h-14 mt-10 rounded-[30px] shadow-x  placeholder:font-semibold placeholder:text-lg text-lg text-center"
        placeholder="Добавить нового лидера"
      />
      <div className=" mt-5 w-[80vw] table  bd  text-center  rounded-t-[30px]">
        <div className=" table-header-group w-full   bd border-spacing-0 h-[100px]  ">
          <div className="table-row h-[100px]">
            <div className="border-b-2 table-cell border-r-2 bg-[#DADADA] rounded-tl-[30px]  border-gray-300 w-[150px] h-[100px] "></div>
            <div className="border-b-2 table-cell border-r-2 bg-[#DADADA] border-gray-300 w-[150px] text-center h-[120px] align-middle">
              <strong>Публичный</strong> <br />
              Видимо как лидер на странице команды
            </div>
            <div className="border-b-2 table-cell border-r-2 bg-[#DADADA] border-gray-300 w-[150px] text-center align-middle">
              <strong>Настройки</strong> <br />
              Изменить настройки и описания
            </div>
            <div className="border-b-2 table-cell border-r-2 bg-[#DADADA] border-gray-300 w-[150px] text-center align-middle ">
              <strong>Турниры</strong>
              <br />
              Создавать, управлять и присоединиться к командным турнирам
            </div>
            <div className="border-b-2 table-cell border-r-2 bg-[#DADADA] border-gray-300 w-[150px] text-center align-middle">
              <strong>На модерации</strong>
              <br />
              Модерируйте форум и чаты
            </div>
            <div className="border-b-2 table-cell border-r-2 bg-[#DADADA] border-gray-300 w-[150px] text-center align-middle">
              <strong>Запросы</strong> <br />
              Принять и отказаться от запросов присоединения
            </div>
            <div className="border-b-2 table-cell border-r-2 bg-[#DADADA] border-gray-300 w-[150px] text-center align-middle">
              <strong>Пинать</strong> <br />
              Назнайте членов команды
            </div>
            <div className="border-b-2 table-cell bg-[#DADADA] rounded-tr-[30px] border-gray-300 w-[150px] text-center align-middle ">
              <strong>Админ</strong>
              <br />
              Управление разрешениями лидера
            </div>
          </div>
        </div>
        <div className="table-row-group ">
          <div className="table-row h-[60px] ">
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#DADADA] text-center">
              Hrachya{' '}
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle1}
                onChange={() => handleToggleChange('toggle1')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle2}
                onChange={() => handleToggleChange('toggle2')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle3}
                onChange={() => handleToggleChange('toggle3')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle4}
                onChange={() => handleToggleChange('toggle4')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle5}
                onChange={() => handleToggleChange('toggle5')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle6}
                onChange={() => handleToggleChange('toggle6')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle7}
                onChange={() => handleToggleChange('toggle7')}
              />
            </div>
          </div>
          <div className="table-row h-[60px]">
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#DADADA] text-center">
              Anahit
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle8}
                onChange={() => handleToggleChange('toggle8')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle9}
                onChange={() => handleToggleChange('toggle9')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle10}
                onChange={() => handleToggleChange('toggle10')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle11}
                onChange={() => handleToggleChange('toggle11')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle12}
                onChange={() => handleToggleChange('toggle12')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle13}
                onChange={() => handleToggleChange('toggle13')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle14}
                onChange={() => handleToggleChange('toggle14')}
              />
            </div>
          </div>
          <div className="table-row h-[60px]">
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#DADADA] text-center">
              Lider 1
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle15}
                onChange={() => handleToggleChange('toggle15')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle16}
                onChange={() => handleToggleChange('toggle16')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle17}
                onChange={() => handleToggleChange('toggle17')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle18}
                onChange={() => handleToggleChange('toggle18')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle19}
                onChange={() => handleToggleChange('toggle19')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle20}
                onChange={() => handleToggleChange('toggle20')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle21}
                onChange={() => handleToggleChange('toggle21')}
              />
            </div>
          </div>
          <div className="table-row h-[60px]">
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#DADADA] text-center rounded-bl-[30px] ">
              Lider 2
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle22}
                onChange={() => handleToggleChange('toggle22')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle23}
                onChange={() => handleToggleChange('toggle23')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle24}
                onChange={() => handleToggleChange('toggle24')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle25}
                onChange={() => handleToggleChange('toggle25')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle26}
                onChange={() => handleToggleChange('toggle26')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle27}
                onChange={() => handleToggleChange('toggle27')}
              />
            </div>
            <div className="table-cell align-middle border-b-2 border-r-2 bg-[#ececec]">
              <TournamentSwitch
                value={toggles.toggle28}
                onChange={() => handleToggleChange('toggle28')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" font-semibold float-left w-full items-center flex mt-10">
        <p className="text-red-500 hover:underline float-left ml-20" onClick={()=>{setOpenSetting(false)}}>Отменить</p>
      <button className='mr-20 ml-auto bg-gradient-button h-[80px] text-2xl w-[400px] rounded-[30px]' onClick={()=>{setOpenSetting(false)}}>СОХРАНИТЬ</button>
      </div>
    </div>
  );
};

export default EditSetting;
