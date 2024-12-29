import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { EWeekDays, IScheduleEditHistory, User, UserSchedule } from '../../models/User.ts';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import { UserRoles, isUserDirector } from '../../utils/userRoles.ts';
import CheckBox from './Main/Checkbox/CheckBox.tsx';
import GraphicList from './GraphicList.tsx';
import GraphicEditHistoryModal from '../Modals/GraphicEditHistoryModal.tsx';
import Button from './Button.tsx';
import EditScheduleTextModal from '../Modals/EditScheduleTextModal.tsx';
import { Elanguages } from '../../store/reducers/TranslateSlice.ts';
import { EInfoTextFields } from '../../models/IInfoTexts.ts';
import { editInfoText, getInfoText } from '../../store/reducers/InfoTextsSlice.ts';
import GraphicListTimezone from './GraphicListTimezone.tsx';

export interface ICalendarItem {
  id: number;
  time: string;
  pn: boolean;
  vt: boolean;
  sr: boolean;
  ct: boolean;
  pt: boolean;
  sb: boolean;
  vs: boolean;
}

interface GraphicCalendarProps {
  calendar: ICalendarItem[];
  disabled?: boolean;
  calendarError: string;
  scheduleEditHistory: IScheduleEditHistory[];
  setCalendar: (
    clb: ((state: ICalendarItem[]) => ICalendarItem[]) | ICalendarItem[],
  ) => void;
  profileOwner?: User;
  curRole?: UserRoles;
}

export type IDayItem = { [key in EWeekDays]?: boolean };

export const createCalendarGraphic = (timeFrom = 5, timeTo = 25) => {
  const calendar: ICalendarItem[] = [];
  let index = 0;

  for (let i = timeFrom; i <= timeTo; i++) {
    const item = (time: string): ICalendarItem => ({
      id: index,
      time,
      [EWeekDays.PN]: false,
      [EWeekDays.VT]: false,
      [EWeekDays.SR]: false,
      [EWeekDays.CT]: false,
      [EWeekDays.PT]: false,
      [EWeekDays.SB]: false,
      [EWeekDays.VS]: false,
    });
    calendar.push(item(`${String(i % 24).padStart(2, '0')}:00`));
    index++;
    if (i < timeTo) {
      calendar.push(item(`${String(i % 24).padStart(2, '0')}:30`));
      index++;
    }
  }

  return calendar;
};

const {
  monDayText,
  tueDayText,
  wedDayText,
  thuDayText,
  friDayText,
  satDayText,
  sunDayText,
  editText
} = translations.profile;

const { selectAllText } = translations.access;

export const calendarDayTexts: { [key in EWeekDays]: ITranslateItemString } = {
  [EWeekDays.PN]: monDayText,
  [EWeekDays.VT]: tueDayText,
  [EWeekDays.SR]: wedDayText,
  [EWeekDays.CT]: thuDayText,
  [EWeekDays.PT]: friDayText,
  [EWeekDays.SB]: satDayText,
  [EWeekDays.VS]: sunDayText,
};

export const getUSerSchedule = (
  calendar: ICalendarItem[],
  schedule: UserSchedule[],
) => {
  const calendarCopy = [...calendar];
  schedule.forEach((item) => {
    const calendarItemIndex = calendar.findIndex(
      (col) => col.time === item.time,
    );
    if (calendarItemIndex !== -1) {
      const daysObj: IDayItem = item.days.reduce((acc: IDayItem, cur) => {
        acc[cur] = true;
        return acc;
      }, {});

      calendarCopy[calendarItemIndex] = {
        ...calendarCopy[calendarItemIndex],
        ...daysObj,
      };
    }
  });
  return calendarCopy;
};

export interface IScheduleText {
  [Elanguages.RU]: string | undefined;
  [Elanguages.EN]: string | undefined;
  [Elanguages.AM]: string | undefined;
}

const GraphicCalendar: FC<GraphicCalendarProps> = ({
  calendar,
  calendarError,
  setCalendar,
  disabled,
  scheduleEditHistory,
  profileOwner,
  curRole
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const user = useAppSelector((state) => state.UserSlice.user);
  const scheduleInfo = useAppSelector((state) => state.InfoTextsSlice[EInfoTextFields.scheduleInfo]);
  const [editScheduleTextModal, setEditScheduleTextModal] = useState<boolean>(false);
  const [scheduleText, setScheduleText] = useState<IScheduleText>({
    [Elanguages.RU]: '',
    [Elanguages.EN]: '',
    [Elanguages.AM]: ''
  });

  useEffect(() => {
    if (scheduleInfo) {
      setScheduleText(scheduleInfo);
    }
  }, [scheduleInfo]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getInfoText({ field: EInfoTextFields.scheduleInfo }));
    }
    void fetchData();
  }, [dispatch]);

  const onEditScheduleText = async (text: IScheduleText) => {
    await dispatch(editInfoText({ text, field: EInfoTextFields.scheduleInfo }));
    setEditScheduleTextModal(false);
  }
  
  const values: string[][] = Object.keys(calendarDayTexts)
    .map((day) => {
      let from: ICalendarItem | null = null;
      let to: ICalendarItem | null = null;
      const arr = calendar.reduce(
        (acc: { from: string; to: string }[], cur, index) => {
          if (index !== calendar.length - 1) {
            if (!from && cur[day as keyof ICalendarItem]) from = cur;
            if (
              cur[day as keyof ICalendarItem] &&
              !calendar[index + 1]?.[day as keyof ICalendarItem]
            ) {
              to = cur;
              if (from)
                acc.push({ from: from.time, to: calendar[to.id + 1].time });
              from = null;
            }
          }
          return acc;
        },
        [],
      );
      return [
        calendarDayTexts[day as EWeekDays][language],
        arr.map((item) => `(${item.from} - ${item.to})`).join(', '),
      ];
    })
    .filter((item) => item[1]);

  const onChange = (day: string, index: number) => {
    if (disabled) return;
    setCalendar((state) =>
      state.map((item) =>
        item.id === index
          ? {
              ...item,
              [day]: !item[day as keyof ICalendarItem],
            }
          : item,
      ),
    );
  };

  
  const halfOfData = Math.floor(calendar.length / 2);

  const calendarFirstPart = calendar.slice(0, halfOfData);
  const calendarSecPart = calendar.slice(halfOfData);

  const calendarHead = (index: 0 | 1) =>
    Object.keys(calendarDayTexts).map((day) => {
      const parts = [calendarFirstPart, calendarSecPart];

      const checkedArr = !index
        ? parts[index]
        : parts[index].slice(0, parts[index].length - 1);
      const checked = checkedArr.every(
        (item) => item[day as keyof ICalendarItem],
      );

      const onChange = () => {
        let payload = [];
        if (index === 0) {
          payload = [
            ...calendarFirstPart.map((item) => ({ ...item, [day]: !checked })),
            ...calendarSecPart,
          ];
        } else {
          payload = [
            ...calendarFirstPart,
            ...calendarSecPart.map((item, index) =>
              index === calendarSecPart.length - 1
                ? item
                : { ...item, [day]: !checked },
            ),
          ];
        }
        setCalendar(payload);
      };

      return (
        <div key={day} className={'flex flex-col gap-2 pb-[20px]'}>
          <p className="px-3 w-[56px] font-bold text-red-600" key={day}>
            {calendarDayTexts[day as EWeekDays][language]}
          </p>
          <CheckBox
            checked={checked}
            isImportant={true}
            onChange={onChange}
            wrapperClass="h-[28px] flex items-center justify-center"
          />
        </div>
      );
    });
  return (
    <>
      <div className="w-full flex flex-col">
        {((!disabled && ([UserRoles.STUDENT, UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) || curRole === UserRoles.STUDENT)) ||
          isUserDirector(user?.role)) && (
          <>
            <div className='my-3 text-center' dangerouslySetInnerHTML={{__html: scheduleText[language] || ''}}></div>
            {isUserDirector(user?.role) && 
              <Button 
                type={'button'}
                className={'w-max mx-auto mb-4'} 
                onClick={() => setEditScheduleTextModal(true)}
              >
                {editText[language]}
              </Button>
            }
          </>
        )}

        <div>
          <div
            className={
              'w-full flex justify-between gap-4 overflow-x-auto'
            }
          >
            <div className="flex flex-col  items-center border-r-2 border-red-500">
              <div className={'flex  w-full justify-end items-center '}>
                <span
                  className={'text-[14px] mt-[10px] text-center max-w-[70px]'}
                >
                  {selectAllText[language]}
                </span>
                {calendarHead(0)}
              </div>
              {calendarFirstPart.map((item, idx) => (
                <div key={idx} className={'w-fit flex'}>
                  <p className="px-3 py-1 min-w-[70px]">{item.time}</p>
                  {Object.keys(calendarDayTexts).map((day, indx) => (
                    <div
                      className="px-3 flex justify-center items-center"
                      key={indx}
                    >
                      <CheckBox
                        checked={!!item[day as keyof ICalendarItem]}
                        onChange={() => onChange(day, idx)}
                        wrapperClass="h-[28px] flex items-center justify-center"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className='flex flex-grow justify-around gap-2'>
            <div>
                {!!values.length && (
                  <GraphicListTimezone dates={values} />
                )}
                {
                  ((profileOwner?.role === UserRoles.TRANER && ([UserRoles.TRANER, UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role)))
                  || (profileOwner?.role === UserRoles.STUDENT && ([UserRoles.ADMIN, UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role))))
                  && <GraphicEditHistoryModal scheduleEditHistory={scheduleEditHistory}/>
                }
              </div>
              {!!values.length && (
              <div className='h-full border-l-2 border-red-500'></div>
              )}
              <div>
                {!!values.length && (
                  <GraphicList dates={values} />
                )}
                {
                  ((profileOwner?.role === UserRoles.TRANER && ([UserRoles.TRANER, UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role)))
                  || (profileOwner?.role === UserRoles.STUDENT && ([UserRoles.ADMIN, UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role))))
                  && <GraphicEditHistoryModal scheduleEditHistory={scheduleEditHistory}/>
                }
              </div>
            </div>
            <div className="flex flex-col  items-center border-l-2 border-red-500">
              <div className={'flex w-full justify-end items-center'}>
                <span
                  className={'text-[14px] mt-[10px] text-center max-w-[70px]'}
                >
                  {selectAllText[language]}
                </span>

                {calendarHead(1)}
              </div>
              {calendarSecPart
                .slice(0, calendarSecPart.length - 1)
                .map((item, idx) => (
                  <div key={idx} className={'w-fit flex'}>
                    <p className="px-3 py-1 min-w-[70px]">{item.time}</p>
                    {Object.keys(calendarDayTexts).map((day, indx) => (
                      <div
                        className="px-3 flex justify-center items-center"
                        key={indx}
                      >
                        <CheckBox
                          checked={!!item[day as keyof ICalendarItem]}
                          onChange={() => onChange(day, idx + halfOfData)}
                          wrapperClass="h-[28px] flex items-center justify-center"
                        />
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <p className="text-red-500 font-bold text-lg">{calendarError || ''}</p>
      </div>
      <EditScheduleTextModal 
        active={editScheduleTextModal} 
        setActive={setEditScheduleTextModal} 
        text={scheduleText} 
        setText={setScheduleText}
        onEditText={onEditScheduleText}
      />
    </>
  );
};

export default GraphicCalendar;
