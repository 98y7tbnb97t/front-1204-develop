import React from 'react';
import { GiCheckMark } from '@react-icons/all-files/gi/GiCheckMark';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { acceptPlayerToSeans, kickFromToSeans } from '../../../store/reducers/SeansSlice';

interface StartSeansTableProps {
  leftData: any[];
  rightData: any[];
  startPosition: string;
}


const StartSeansTable: React.FC<StartSeansTableProps> = ({
  leftData,
  rightData,
  startPosition
}) => {
  const { seansId } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserSlice);

  const acceptPlayer =  (data:any) => {
    dispatch(acceptPlayerToSeans({...data,startPosition}))
  }
  const kickPlayer =  (data:any) => {
    dispatch(kickFromToSeans(data))
  }

  

  return (
    <div className="grid grid-cols-2 justify-between p-7">
      <div className="border-r border-b-2 border-gray-300">
        {leftData&&leftData?.map((e) => (
          <div
            className="grid grid-cols-[16px_200px_32px] items-center text-2xl mb-5 gap-x-3"
            key={e.id}
          >
            <span
              className={`w-4 h-4 rounded-full mr-2 ${
                e.online ? 'bg-green-400' : 'bg-red-600'
              } `}
            ></span>
            <span>
              {e.name} {e.sname}
              <span className="font-semibold ml-2">({e.rating})</span>
            </span>
            {user.role!=="STUDENT"&&<button
            onClick={()=>{
              acceptPlayer({seansId, studentId: e._id})
            }}
            className="active:bg-slate-600 hover:cursor-pointer bg-gradient-blue w-8 h-8 ml-3 text-white flex items-center justify-center rounded-md">
              <GiCheckMark />
            </button>}
          </div>
        ))}
      </div>
      <div className="border-b-2 border-gray-300 pl-7">
        {rightData&&rightData?.map((e) => (
          <div
            className="grid grid-cols-[16px_200px_32px] items-center text-2xl mb-5 gap-x-3"
            key={e.id}
          >
            <span
              className={`w-4 h-4 rounded-full mr-2 ${
                e.online ? 'bg-green-400' : 'bg-red-600'
              } `}
            ></span>
            <span>
              {e.user?.name} {e.user?.sname}
              <span className="font-semibold ml-2">({e.rating})</span>
            </span>
            {user.role !== 'STUDENT' && <button onClick={()=>{
              kickPlayer({seansId, studentId: e.user._id})
            }} className="active:bg-slate-600 hover:cursor-pointer bg-gradient-red w-8 h-8 ml-3 text-white flex items-center justify-center rounded-md">
              X
            </button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartSeansTable;
