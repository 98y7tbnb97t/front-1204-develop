import male from '../../../assets/icons/male.png';
import female from '../../../assets/icons/female.png';
import format from 'date-fns/format';
import styles from './SeansTable.module.css';
import { useAppSelector } from '../../../hooks/redux';
import { getDatesArray } from '../../../utils/startEndDate';
import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight';
import { useState } from 'react';
import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft';

const SeansTable = ({ data, startDate, endDate }: any) => {
  const { user } = useAppSelector((state) => state.UserSlice);
  const [showAll, setShowAll] = useState(false);

  return (
    <div>
      <table className={`w-full bg-[#f0f0f0] rounded-xl ${styles.table}`}>
        <thead className="bg-gray-300 text-[#0B56A7]">
          <tr>
            <td className="text-center font-semibold text-xl py-2 px-1">№</td>
            <td className="text-center font-semibold text-xl py-2 px-1">ФИО</td>
            
            {showAll ? (
              <>
              <td className="text-center font-semibold text-xl py-2 px-1">
              Очки
            </td>
              {getDatesArray(startDate, endDate).map((e: any, id: number) => (
                <td className="text-center font-semibold text-xl py-2 px-1">
                  {id === 0 && (
                    <button onClick={() => setShowAll((prev) => !prev)}>
                      {' '}
                      <AiOutlineArrowLeft className="text-red-600" />
                    </button>
                  )}
                  {e}
                </td>
              ))}
                  </>
            ) : (
              <>
                <td className="text-center font-semibold text-xl py-2 px-1">
                  Тренер
                </td>
                <td className="text-center font-semibold text-xl py-2 px-1">
                  Группа
                </td>
                <td className="text-center font-semibold text-xl py-2 px-1">
                  Дата рож.
                </td>
                <td className="text-center font-semibold text-xl py-2 px-1">
                  Пол
                </td>
                <td className="text-center font-semibold text-xl py-2 px-1">
                  Рейтинг
                </td>
                <td className="text-center font-semibold text-xl py-2 px-1">
                  Очки
                </td>

                <td>
                  {getDatesArray(startDate, endDate)[0]}{' '}
                  <button onClick={() => setShowAll((prev) => !prev)}>
                    <AiOutlineArrowRight className="text-red-600" />{' '}
                  </button>
                </td>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: any) => (
              <tr
                key={item.user.id}
                className={`border-b-2 border-b-[#C4C4C4] ${
                  item.seanser?.seanserId !== user._id && 'notMySeans'
                }`}
              >
                <td className="text-center p-1">{item.numberPlace}</td>
                <td className="p-1 seans_username">
                  {item.user.name} {item.user.sname}
                </td>
                
                {showAll ? (
                  <>
                    <td className="p-1">{item.user.totalPoints}</td>
                    {item.seansGames?.map((e: any, id: number) => (
                      <td
                        className={`p-1 text-xl font-medium ${
                          e.point == 3
                            ? 'text-[#1EA413]'
                            : e.point == 2
                            ? 'text-[#E7C173]'
                            : 'text-[#FF0000]'
                        }`}
                      >
                        {e?.point}
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                  <td className="p-1 seans_traner">
                  <div className="flex flex-row text-3xl">
                    <span>
                      {item.seanser?.name} {item.seanser?.sname}
                    </span>
                    <span>{item.tranerMonthes}</span>
                  </div>
                </td>
                    <td className="p-1 seans_group">
                      <div className="flex flex-row text-3xl">
                        <span>{item.group?.name}</span>
                        <span>{item.groupMonthes}</span>
                      </div>
                    </td>
                    <td className="p-1">
                      {format(new Date(item.user.born), 'dd/MM/Y')}
                    </td>
                    <td className="p-1">
                      {item.user.sex === 'man' ? (
                        <img src={male} alt="male" />
                      ) : (
                        <img src={female} alt="female" />
                      )}
                    </td>
                    <td className="p-1">{item.rating}</td>
                    <td className="p-1">{item.user.totalPoints}</td>
                    <td>{item.seansGames?.find((e:any)=>e)?.point}</td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeansTable;
