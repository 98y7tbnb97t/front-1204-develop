import format from 'date-fns/format';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { IHomework } from '../../models/IHomwork';

import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import './Table.css';

interface TableProps {
  table: IHomework[];
}

const Table: FC<TableProps> = ({ table }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const {
    deadlineText,
    performTaskText,
    lessonDateText,
  }: {
    deadlineText: ITranslateItemString;
    performTaskText: ITranslateItemString;
    lessonDateText: ITranslateItemString;
  } = translations.homework;
  const {
    homeworkText,
  }: {
    homeworkText: ITranslateItemString;
  } = translations.lessons;

  const { user } = useAppSelector((state) => state.UserSlice);

  useEffect(() => {
    if (table) {
      setIsLoading(false);
    }
  }, [table]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-2 h-full lg:p-5">
      <div className="overflow-auto">
        {table.map((item) => (
          <div
            key={item._id}
            className={[
              'w-full rounded-xl p-3 flex justify-between mb-2 sm:mb-5',
              item?.completed?.includes(user._id)
                ? 'bg-green-600'
                : 'bg-gradient-top-menu',
              item.results
                ?.find((itm) => itm?.user_id === user._id)
                ?.results.filter((res) => res?.result === 'passed').length !==
                item?.program?.length && Number(item?.results?.length) > 0
                ? '!bg-blue-500'
                : 'bg-green-600',
            ].join(' ')}
          >
            <div className="flex w-full item-main">
              <div className="flex table-desk">
                {item.lesson && (
                  <div className="flex text-xl font-bold flex-col items-center justify-center bg-gradient-button rounded-xl px-3 mr-3 lg:mr-10">
                    <p className="text-[#8A6E3E]">{`${
                      lessonDateText[language]
                    } ${format(new Date(item?.lesson), 'd MMM')}`}</p>
                  </div>
                )}
                <div className="flex text-xl font-bold flex-col items-center justify-center bg-gradient-button rounded-xl px-3 mr-3 lg:mr-10">
                  <p className="text-[#8A6E3E]">
                    {deadlineText[language]}{' '}
                    {format(new Date(item.end), 'd MMM')}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-2xl text-white mb-3 title-text">
                    {homeworkText[language]}
                  </p>
                  <div className="flex">
                    <Link
                      to={'/homework/' + item._id}
                      className="bg-gradient-button rounded-full px-4 text-lg font-semibold"
                    >
                      {performTaskText[language]}
                    </Link>
                  </div>
                </div>

                <div className="flex min-w-[40px] h-[40px] mt-[1px] ml-5 justify-center font-semibold text-2xl text-black bg-apricot rounded-full items-center">
                  {item?.program?.length}
                </div>
              </div>
            </div>
            <div
              className="flex flex-col bg-gradient-button items-center rounded-xl sm:px-3 px-0 mr-3 lg:mr-10"
              style={{
                width: '30%',
                minHeight: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p
                className="w-full md:text-xl mb-3 title-text text-[#8A6E3E] sm:px-[10px] px-0 text-sm leading-5 font-bold"
                style={{
                  whiteSpace: 'normal',
                  textAlign: 'center',
                }}
              >
                {item.name}
              </p>
            </div>
            <div className="flex justify-center items-center max-w-[300px] border-l-4 border-l-[#B7975A] pl-0 lg:pl-5"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
