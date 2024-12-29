import { DateTime } from 'luxon';

export default function convertScheduleWithDayChange(schedule: string[][], fromTimezone: string, toTimezone: string, language: string) {
    let daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    if (language === 'am') {
        daysOfWeek = ["Երկ", "Երք", "Չրք", "Հնգ", "Ուր", "Շբթ", "Կիր"];
    }
    if (language === 'en') {
        daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }

    // Преобразуем расписание
    const result: [string, string][] = [];
    schedule.forEach(([day, timeRanges]) => {
        const dayIndex = daysOfWeek.indexOf(day); // Определяем индекс текущего дня

        const ranges = timeRanges.split(', ').map(range => {
            const [start, end] = range.match(/\d{2}:\d{2}/g) ?? [];

            // Преобразуем время
            const startTime = DateTime.fromFormat(start || '', 'HH:mm', { zone: fromTimezone })
                .setZone(toTimezone);
            const endTime = DateTime.fromFormat(end, 'HH:mm', { zone: fromTimezone })
                .setZone(toTimezone);

            // Проверяем переход на следующий день
            let newDayIndex = dayIndex;
            if (endTime.day > startTime.day) {
                newDayIndex = (dayIndex + 1) % daysOfWeek.length; // Переход на следующий день
            }

            const convertedStart = startTime.toFormat('HH:mm');
            const convertedEnd = endTime.toFormat('HH:mm');
            return { range: `(${convertedStart} - ${convertedEnd})`, dayIndex: newDayIndex };
        });

        // Собираем результаты
        ranges.forEach(({ range, dayIndex: rangeDayIndex }) => {
            const targetDay = daysOfWeek[rangeDayIndex];
            const existingIndex = result.findIndex(([d]) => d === targetDay);
            if (existingIndex !== -1) {
                // Append range to the existing day
                result[existingIndex][1] += `, ${range}`;
            } else {
                // Add a new day and range
                result.push([targetDay, range]);
            }
        });
    });

    // Упорядочиваем дни
    result.sort(([dayA], [dayB]) => daysOfWeek.indexOf(dayA) - daysOfWeek.indexOf(dayB));
    return result;
}