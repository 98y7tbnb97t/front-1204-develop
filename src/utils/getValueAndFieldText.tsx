import {EditRequest, ELessonFormatTypes, EWeekDays, UserSchedule} from "../models/User.ts";
import { EUserLanguages } from "../models/EUserLanguages.ts";
import {lessonFormatTypes, userCountries, userLanguages} from "../constants.ts";
import {UserRoles} from "./userRoles.ts";
import {ITranslateItemString, translations} from "./translations.tsx";
import {Elanguages} from "../store/reducers/TranslateSlice.ts";
import { ReactNode } from "react";
import GraphicList from "../components/UI/GraphicList.tsx";
import { calendarDayTexts, createCalendarGraphic, getUSerSchedule, ICalendarItem } from "../components/UI/GraphicCalendar.tsx";
import { ECountries } from "../models/ECountries.ts";


const {
    nameText,
    sеcondNameText,
    surNameText,
    graphicText,
    parentNameText,
    actualMailText,
    nationalityText,
    languagesText,
    formatText,
    cityText,
    whatsAppNumberText,
    emailText,
    countryText,
    graphicCommentsText,
    sexText,
    birthDateText,
    maleText,
    femaleText,
    lessonDurationText
} = translations.profile

const {
    roleText,
    studentText,
    trainerText,
} = translations.access

export const fieldsTranslations = {
    name: nameText,
    email: emailText,
    country: countryText,
    comment: graphicCommentsText,
    born: birthDateText,
    sex: sexText,
    sname: sеcondNameText,
    tname: surNameText,
    shedule: graphicText,
    parentName: parentNameText,
    actualMail: actualMailText,
    nationality: nationalityText,
    languages: languagesText,
    format: formatText,
    city: cityText,
    role: roleText,
    durency: lessonDurationText,
    whatsappNumber: whatsAppNumberText,
}

const sexTypes: {
    man: ITranslateItemString
    woman: ITranslateItemString
} = {
    man: maleText,
    woman: femaleText
}

export const rolesTexts = {
    [UserRoles.STUDENT]: studentText,
    [UserRoles.TRANER]: trainerText,
}


export const getValueAndFieldText = (item: EditRequest,language: Elanguages) => {
    let value: string | ReactNode = typeof item.value === 'string' ? item.value : ""
    const name = item.field in fieldsTranslations ? fieldsTranslations[item.field as keyof typeof fieldsTranslations][language] : item.field

    switch (item.field) {
        case 'shedule': {
            const schedule = item.value as UserSchedule[];
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

            value = (<GraphicList dates={dates}/>)
            break;
        }
        case 'languages': {
            if (Array.isArray(item.value)) {
                value = item.value.map(lang => userLanguages[lang as EUserLanguages]?.text[language] || "").join(', ')
            }
            break;
        }
        case 'country': {
            value = userCountries?.[item.value as ECountries]?.text[language] || ""
            break;
        }
        case 'format': {
            value = lessonFormatTypes?.[item.value as ELessonFormatTypes]?.text[language] || ""
            break;
        }
        case 'born': {
            if (typeof item.value === "string") {
                value = new Date(item.value).toLocaleDateString()
            }
            break;
        }
        case 'sex': {
            if (item.value === 'man' || item.value === 'woman') {
                value = sexTypes[item.value][language]
            }
            break;
        }
        case 'role': {
            if (item.value === UserRoles.STUDENT || item.value === UserRoles.TRANER) {
                value = rolesTexts[item.value][language]
            }
            break;
        }
    }

    return {value, name}
}
