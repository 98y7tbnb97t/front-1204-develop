import React, { useMemo, useState } from 'react';

import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS} from './Columns'
import TableHead from './Table/TableHead';
import TableBody from './Table/TableBody';

const TournamentPlayersList = () => {
     const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    const [butActive, setButActive] = useState(false)

    const [tableData, setTableData] = useState(data);
  return (
    <div className="flex items-center w-full h-full justify-center">
      <div className="sm:w-[calc(99vw-250px)] w-[calc(99vw] h-[98vh] border-2  rounded-[30px] bg-gray-200 flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center sm:mt-5 mt-20 w-full justify-center">
          <div className=" ml-auto mr-auto relative sm:left-[150px]">
            <h1 className="text-3xl text-red-500 ">ТУРНИРИСТЫ</h1>
            <p className="italic text-gray-600 font-semibold text-xl">
              Список Участников
            </p>
          </div>
          <button className={` w-[200px] h-[50px]  ${butActive ? 'bg-gradient-chat' : 'bg-gradient-button'} sm:mr-20 rounded-3xl hover:underline font-semibold text-xl flex items-center justify-center `} onClick={()=>{setButActive(!butActive)}}>Мои ученики</button>
        </div>
        <table className=' border-collapse border border-slate-500 w-[80vw] '>
        
    <TableHead columns={columns} />
    <TableBody columns={columns} tableData={tableData} />
        </table>
      </div>
    </div>
  );
};

export default TournamentPlayersList;
