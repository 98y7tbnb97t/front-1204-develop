import {UserRoles} from "./userRoles.ts";
import {ITranslateItemString, translations} from "./translations.tsx";

const {
    supportForTrainersText,
    supportForParentsText,
    adminsText,
    trainerPlatformProblemsText,
    adminPlatformProblemsText,
    lessonsInRussianText,
    lessonsInEnglishText,
    lessonsInFrenchText,
    lessonsInGermanText,
    eduProgramText,
    importantNewsText,
    psychoWebinarsText,
    trialLessonQuestionsText,
    lessonsInArmenianText,
    programmersText,
    urgentText,
    reportText
} = translations.messenger

const {
    readyForSimulationsText,
    onlineTournamentsChatsText,
    offlineTournamentsChatsText,
} = translations.access

export enum EGroupChatKeys {
    techTrainer = 'techTrainer',
    techStudents = 'techStudents',
    programmers = 'programmers',
    adminProblems = 'adminProblems',
    admins = 'admins',
    trainerProblems = 'trainerProblems',
    trainingProgram = 'trainingProgram',
    testLessonQuestions = 'testLessonQuestions',
    araratInt = 'araratInt',
    testForNewTrainers = 'testForNewTrainers',
    groupForNewTrainers = 'groupForNewTrainers',
    importantNews = 'importantNews',
    chatForChecks = 'chatForChecks',
    psycho = 'psycho',
    seance = 'seance',
    online = 'online',
    offline = 'offline',
    armTrainers = 'armTrainers',
    rusTrainers = 'rusTrainers',
    engTrainers = 'engTrainers',
    fraTrainers = 'fraTrainers',
    gerTrainers = 'gerTrainers',
    notifications = 'notifications',
    urgent = 'urgent',
    report = 'report'
}

export interface IBasicChats {
    forRoles?: UserRoles[],
    key: EGroupChatKeys,
    text: string | ITranslateItemString
    defaultActive?: UserRoles[],
    autoAdd?: boolean,
    fixedIndex?: { [key in UserRoles]?: number },
    index?: { [key in UserRoles]?: number },
}

export const basicChats: IBasicChats[] = [
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        defaultActive: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.araratInt,
        text: "♥️ ♾️ Ararat international",
        fixedIndex: {
            [UserRoles.TRANER]: 2,
            [UserRoles.TRANERMETODIST]: 2,
            [UserRoles.ADMIN]: 5,
            [UserRoles.ZDIRECTOR]: 5,
            [UserRoles.DIRECTOR]: 5,
        }
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST , UserRoles.STUDENT],
        defaultActive: [UserRoles.TRANER,UserRoles.TRANERMETODIST , UserRoles.STUDENT],
        key: EGroupChatKeys.notifications,
        text: "Уведомление",
        fixedIndex: {
            [UserRoles.TRANER]: 1,
            [UserRoles.TRANERMETODIST]: 1,
            [UserRoles.STUDENT]: 1,
        }
    },
    {
        forRoles: [
            UserRoles.TRANER,
            UserRoles.TRANERMETODIST,
            UserRoles.ADMIN,
            UserRoles.STUDENT,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR
        ],
        index: {
            [UserRoles.TRANER]: 9,
            [UserRoles.TRANERMETODIST]: 9,
            [UserRoles.ADMIN]: 12,
            [UserRoles.STUDENT]: 4,
            [UserRoles.DIRECTOR]: 12,
            [UserRoles.ZDIRECTOR]: 12
        },
        defaultActive: [
            UserRoles.TRANER,
            UserRoles.TRANERMETODIST,
            UserRoles.ADMIN,
            UserRoles.STUDENT,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR,
        ],
        key: EGroupChatKeys.psycho,
        text: psychoWebinarsText,
    },
    {
        forRoles: [UserRoles.STUDENT, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        defaultActive: [UserRoles.STUDENT, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.techStudents,
        fixedIndex: {
            [UserRoles.STUDENT]: 2,
            [UserRoles.ADMIN]: 1,
            [UserRoles.ZDIRECTOR]: 1,
            [UserRoles.DIRECTOR]: 1,
        },
        text: supportForParentsText,
    },
    {
        forRoles: [UserRoles.PROGRAMMER],
        defaultActive: [UserRoles.PROGRAMMER],
        key: EGroupChatKeys.programmers,
        fixedIndex: {
            [UserRoles.PROGRAMMER]: 1,
        },
        text: programmersText,
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        defaultActive: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        key: EGroupChatKeys.techTrainer,
        fixedIndex: {
            [UserRoles.TRANER]: 3,
            [UserRoles.TRANERMETODIST]: 3,
            [UserRoles.ADMIN]: 2,
            [UserRoles.DIRECTOR]: 2,
            [UserRoles.ZDIRECTOR]: 2,
        },
        text: supportForTrainersText
    },
    {
        forRoles: [UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        defaultActive: [UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.admins,
        fixedIndex: {
            [UserRoles.ADMIN]: 3,
            [UserRoles.DIRECTOR]: 3,
            [UserRoles.ZDIRECTOR]: 3,
        },
        text: adminsText
    },
    {
        forRoles: [UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        defaultActive: [UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        key: EGroupChatKeys.testLessonQuestions,
        fixedIndex: {
            [UserRoles.ADMIN]: 4,
            [UserRoles.ZDIRECTOR]: 4,
            [UserRoles.DIRECTOR]: 4,
        },
        text: trialLessonQuestionsText
    },
    {
        forRoles: [UserRoles.ADMIN,UserRoles.PROGRAMMER,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        defaultActive: [UserRoles.ADMIN,UserRoles.PROGRAMMER,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        key: EGroupChatKeys.adminProblems,
        text: adminPlatformProblemsText,
        index: {
            [UserRoles.ADMIN]: 6,
            [UserRoles.DIRECTOR]: 6,
            [UserRoles.ZDIRECTOR]: 6,
            [UserRoles.PROGRAMMER]: 3,
        },

    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.PROGRAMMER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        defaultActive: [UserRoles.TRANER,UserRoles.PROGRAMMER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        key: EGroupChatKeys.trainerProblems,
        fixedIndex: {
            [UserRoles.TRANER]: 4,
            [UserRoles.TRANERMETODIST]: 4,
            [UserRoles.PROGRAMMER]: 4,
        },
        index: {
            [UserRoles.ADMIN]: 7,
            [UserRoles.DIRECTOR]: 7,
            [UserRoles.ZDIRECTOR]: 7,
        },
        text: trainerPlatformProblemsText
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.PROGRAMMER,  UserRoles.TRANERMETODIST, UserRoles.STUDENT, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        defaultActive: [UserRoles.TRANER,UserRoles.PROGRAMMER, UserRoles.TRANERMETODIST, UserRoles.STUDENT, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.importantNews,
        fixedIndex: {
            [UserRoles.TRANER]: 5,
            [UserRoles.STUDENT]: 3,
            [UserRoles.TRANERMETODIST]: 5,
            [UserRoles.PROGRAMMER]: 2,
        },
        index: {
            [UserRoles.ADMIN]: 8,
            [UserRoles.DIRECTOR]: 8,
            [UserRoles.ZDIRECTOR]: 8,
        },
        text: importantNewsText
    },
    {
        forRoles: [UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.chatForChecks,
        index: {
            [UserRoles.ADMIN]: 19,
            [UserRoles.DIRECTOR]: 19,
            [UserRoles.ZDIRECTOR]: 19,
        },
        text: "ЧАТ ДЛЯ ЧЕКОВ"
    },
    {
        forRoles: [
            UserRoles.TRANER,
            UserRoles.TRANERMETODIST,
            UserRoles.ADMIN,
            UserRoles.STUDENT,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR
        ],
        key: EGroupChatKeys.seance,
        defaultActive: [UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR, UserRoles.TRANER,UserRoles.TRANERMETODIST],
        index: {
            [UserRoles.ADMIN]: 9,
            [UserRoles.DIRECTOR]: 9,
            [UserRoles.ZDIRECTOR]: 9,
            [UserRoles.STUDENT]: 5,
            [UserRoles.TRANER]: 6,
            [UserRoles.TRANERMETODIST]: 6,
        },
        text: readyForSimulationsText
    },
    {
        forRoles: [
            UserRoles.TRANER,
            UserRoles.TRANERMETODIST,
            UserRoles.ADMIN,
            UserRoles.STUDENT,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR
        ],
        key: EGroupChatKeys.online,
        defaultActive: [UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR, UserRoles.TRANER,UserRoles.TRANERMETODIST],
        index: {
            [UserRoles.ADMIN]: 10,
            [UserRoles.ZDIRECTOR]: 10,
            [UserRoles.DIRECTOR]: 10,
            [UserRoles.STUDENT]: 6,
            [UserRoles.TRANER]: 7,
            [UserRoles.TRANERMETODIST]: 7,
        },
        text: onlineTournamentsChatsText
    },
    {
        forRoles: [
            UserRoles.TRANER,
            UserRoles.TRANERMETODIST,
            UserRoles.ADMIN,
            UserRoles.STUDENT,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR
        ],
        key: EGroupChatKeys.offline,
        index: {
            [UserRoles.ADMIN]: 11,
            [UserRoles.DIRECTOR]: 11,
            [UserRoles.ZDIRECTOR]: 11,
            [UserRoles.STUDENT]: 7,
            [UserRoles.TRANER]: 8,
            [UserRoles.TRANERMETODIST]: 8,
        },
        defaultActive: [UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR, UserRoles.TRANER,UserRoles.TRANERMETODIST],
        text: offlineTournamentsChatsText
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST],
        defaultActive: [UserRoles.TRANER,UserRoles.TRANERMETODIST],
        key: EGroupChatKeys.trainingProgram,
        text: eduProgramText,
        index: {
            [UserRoles.TRANER]: 10,
            [UserRoles.TRANERMETODIST]: 10,
        }
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST],
        defaultActive: [UserRoles.TRANER,UserRoles.TRANERMETODIST],
        key: EGroupChatKeys.testForNewTrainers,
        text: "а ТЕСТ для новых тренеров",
        index: {
            [UserRoles.TRANER]: 11,
            [UserRoles.TRANERMETODIST]: 11,
        }
    },
    {
        forRoles: [UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        defaultActive: [UserRoles.ADMIN,UserRoles.ZDIRECTOR,UserRoles.DIRECTOR],
        key: EGroupChatKeys.groupForNewTrainers,
        index: {
            [UserRoles.ADMIN]: 13,
            [UserRoles.ZDIRECTOR]: 13,
            [UserRoles.DIRECTOR]: 13,
        },
        text: "ГРУППА ДЛЯ ТЕХ НОВЫХ УЧЕНИКОВ, КТО НЕ НАЧИЛ ОБУЧЕНИЯ, С ЭТОЙ ГРУППЫ В АРХИВ КИДАТЬ тест. тренер)"
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.armTrainers,
        defaultActive: [
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR,
        ],
        index: {
            [UserRoles.ADMIN]: 14,
            [UserRoles.DIRECTOR]: 14,
            [UserRoles.ZDIRECTOR]: 14,
            [UserRoles.TRANER]: 12,
            [UserRoles.TRANERMETODIST]: 12,
        },
        text: lessonsInArmenianText
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.rusTrainers,
        defaultActive: [
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR,
        ],
        index: {
            [UserRoles.ADMIN]: 15,
            [UserRoles.DIRECTOR]: 15,
            [UserRoles.ZDIRECTOR]: 15,
            [UserRoles.TRANER]: 13,
            [UserRoles.TRANERMETODIST]: 13,
        },
        text: lessonsInRussianText
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.engTrainers,
        defaultActive: [
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR,
        ],
        index: {
            [UserRoles.ADMIN]: 16,
            [UserRoles.DIRECTOR]: 16,
            [UserRoles.ZDIRECTOR]: 16,
            [UserRoles.TRANER]: 14,
            [UserRoles.TRANERMETODIST]: 14,
        },
        text: lessonsInEnglishText
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.fraTrainers,
        defaultActive: [
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR,
        ],
        index: {
            [UserRoles.ADMIN]: 17,
            [UserRoles.DIRECTOR]: 17,
            [UserRoles.ZDIRECTOR]: 17,
            [UserRoles.TRANER]: 15,
            [UserRoles.TRANERMETODIST]: 15,
        },
        text: lessonsInFrenchText
    },
    {
        forRoles: [UserRoles.TRANER,UserRoles.TRANERMETODIST, UserRoles.ADMIN,UserRoles.DIRECTOR,UserRoles.ZDIRECTOR],
        key: EGroupChatKeys.gerTrainers,
        defaultActive: [
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.ZDIRECTOR,
        ],
        index: {
            [UserRoles.ADMIN]: 18,
            [UserRoles.DIRECTOR]: 18,
            [UserRoles.ZDIRECTOR]: 18,
            [UserRoles.TRANER]: 15,
            [UserRoles.TRANERMETODIST]: 15,
        },
        text: lessonsInGermanText
    },
    {
        forRoles: [UserRoles.ADMIN],
        key: EGroupChatKeys.urgent,
        defaultActive: [
            UserRoles.ADMIN,
        ],
        text: urgentText
    },
    {
        forRoles: [UserRoles.ADMIN],
        key: EGroupChatKeys.report,
        defaultActive: [
            UserRoles.ADMIN,
        ],
        text: reportText
    },
]