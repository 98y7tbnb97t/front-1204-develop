import React, { useEffect, useState } from 'react';
import SeansTable from '../../../components/UI/tables/SeansTable';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { seansResults } from '../../../store/reducers/SeansSlice';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import { format } from 'date-fns';

const MyCalendarContainer: React.FC<
  React.PropsWithChildren<{ className: string }>
> = ({ className, children }) => {
  const []=React.useState();

  return (
    <div>
      <CalendarContainer className={className}>
        {/* <div className='flex flex-row' >
        <div>
          <input type="radio" name="" id="" />
        </div> */}
        <div style={{ position: 'relative' }}>{children}</div>
        {/* </div> */}
      </CalendarContainer>
    </div>
  );
};

const SessionTablePage = () => {
  const { loadingSessionsResults, sessionsResults } = useAppSelector(
    (state) => state.SeansSlice,
  );
  const { user } = useAppSelector((state) => state.UserSlice);
  const dispatch = useAppDispatch();
  const [isMyStudents, setIsMyStudents] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const onChange = (
    dates: [Date | null, Date | null],
    event: React.SyntheticEvent<any, Event> | undefined,
  ) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    dispatch(
      seansResults({
        startDate,
        endDate,
        seanserId: isMyStudents ? user._id : undefined,
      }),
    );
  }, [isMyStudents, startDate, endDate]);

  return (
    <div>
      <div
        className="px-2 py-5 grid items-center"
        style={{ gridTemplateColumns: '2.5fr 1.5fr 1fr' }}
      >
        <div className="">
          <ReactDatePicker
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            customInput={
              <button className="bg-gradient-button text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-appricot flex items-center">
                Максимум:{' '}
                {startDate &&
                  format(
                    new Date(startDate.setMonth(new Date().getMonth() - 1)),
                    'dd.MM.Y',
                  )}{' '}
                - {endDate && format(new Date(endDate), 'dd.MM.Y')}
              </button>
            }
            calendarContainer={MyCalendarContainer}
          />
        </div>
        <div>
          <h2 className="font-semibold text-5xl text-red-600">СЕАНСИСТЫ</h2>
          <h3 className="font-semibold text-4xl text-gray-600">
            Список Участников
          </h3>
        </div>
        <div>
          <button
            onClick={() => setIsMyStudents((prev) => !prev)}
            className={`${
              isMyStudents ? 'bg-gradient-appricot' : 'bg-gradient-button'
            } text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-red flex items-center`}
          >
            Мои ученики
          </button>
        </div>
      </div>

      {sessionsResults?.length ? (
        <SeansTable
          data={sessionsResults}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default SessionTablePage;
