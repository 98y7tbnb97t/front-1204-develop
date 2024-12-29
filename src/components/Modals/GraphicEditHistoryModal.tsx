import { FC, memo, useState } from 'react'
import Modal from '../UI/Modal';
import { useAppSelector } from '../../hooks/redux';
import {ITranslateItemString, translations} from "../../utils/translations.tsx";
import { EWeekDays, IScheduleEditHistory } from '../../models/User.ts';
import { createCalendarGraphic, getUSerSchedule, calendarDayTexts, ICalendarItem } from '../UI/GraphicCalendar.tsx';
import GraphicList from '../UI/GraphicList.tsx';

interface GraphicEditHistoryModalProps {
    scheduleEditHistory: IScheduleEditHistory[];
}

const GraphicEditHistoryModal: FC<GraphicEditHistoryModalProps> = memo(({ scheduleEditHistory = [] }) => {
    const [modal, setModal] = useState<boolean>(false);
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        historyText
    }: {
        historyText: ITranslateItemString
    } = translations.groups
    
    const {
        dateText
    }: {
        dateText: ITranslateItemString
    } = translations.waitGroup

    return (
        <>
            {
                (scheduleEditHistory && scheduleEditHistory.length) ?
                (<p className='text-center text-[18px] font-bold text-red-600 cursor-pointer' onClick={() => setModal(true)}>{historyText[language]} - {scheduleEditHistory.length}</p>)
                : ''
            }
            <Modal active={modal} setActive={setModal} className='!max-w-[700px] max-2xl:!max-w-[500px] p-0 items-center'>
                <div className="flex flex-col bg-[#F0F0F0] rounded-3xl w-full">
                <div className='m-5 p-5 bg-[#f0f0f0] rounded-xl flex justify-between flex-col'>
                    {[...scheduleEditHistory].sort((a, b) => Number(new Date(b.acceptedAt)) - Number(new Date(a.acceptedAt))).map(item => {
                        const schedule = item.schedule;
                        const calendar = createCalendarGraphic();
                        const calendarItems = getUSerSchedule(calendar, schedule);
                        const dates: string[][] = Object.keys(calendarDayTexts)
                            .map((day) => {
                                let from: ICalendarItem | null = null;
                                let to: ICalendarItem | null = null;
                                const arr = calendarItems.reduce(
                                    (acc: { from: string; to: string }[], cur, index) => {
                                    if (index !== calendarItems.length - 1) {
                                        if (!from && cur[day as keyof ICalendarItem]) from = cur;
                                        if (
                                        cur[day as keyof ICalendarItem] &&
                                        !calendarItems[index + 1]?.[day as keyof ICalendarItem]
                                        ) {
                                        to = cur;
                                        if (from)
                                            acc.push({ from: from.time, to: calendarItems[to.id + 1].time });
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
                            }).filter((item) => item[1]);
                        return (
                            <div className='mb-4' key={item.acceptedAt}>
                                <p className='mb-2 text-lg'>{dateText[language]}: <strong>{new Date(item.acceptedAt).toLocaleString()}</strong></p>
                                <GraphicList dates={dates}/>
                            </div>
                        );
                    })}
                </div>
                </div>     
            </Modal>
        </>
    )
})

export default GraphicEditHistoryModal;