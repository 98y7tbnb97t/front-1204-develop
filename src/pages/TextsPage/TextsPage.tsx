import { ChangeEvent, FC, useState } from 'react';
import AdvicesForParentsTexts from './AdvicesForParentsTexts';
import AdvicesForTranersTexts from './AdvicesForTranersTexts';
import RecomendationText from './RecomendationText';
import HomeworkText from './HomeworkText';
import StockText from './StockText';
import WaitForCoachText from './WaitForCoachText';
import AutoSMSStartLesson30minText from './AutoSMSStartLesson30minText';
import AutoSMSStartLesson10minText from './AutoSMSStartLesson10minText';
import AutoSMSStartLesson120minText from './AutoSMSStartLesson120minText';
import PresenceText from './PresenceText';
import StudentAddedToGroupText from './StudentAddedToGroupText';
import MyNotificationsText from './MyNotificationsText';
import Input from '../../components/UI/Input';
import { useDebounce } from '../../hooks/useDebounce';
import InfoTextsService from '../../services/InfoTextsService';
import EstimateAutoSMS from './EstimateAutoSMS';
import HomeworkReminder from './HomeworkReminder';
import HomeworkReminderFiveHours from './HomeworkReminderFiveHours';
import HomeworkDeadlineAdvice from './HomeworkDeadlineAdvice';
import { useAppSelector } from '../../hooks/redux';
import { translations } from '../../utils/translations';

type ComponentsType = {
    AutoSMSStartLesson30min: string;
    AutoSMSStartLesson10min: string;
    AutoSMSStartLesson120min: string;
    studentAddedToGroupText: string;
    willBePresent: string;
    willNotBePresent: string;
    advicesForParentsTexts: string,
    advicesForTranersTexts: string,
    recomendationText: string,
    homeworkText: string,
    stockText: string,
    waitForCoachText: string,
    myNotificationsText: string;
    estimateAutoSMS: string;
    homeworkReminder: string;
    homeworkDeadlineAdvice: string;
    homeworkReminderFiveHours: string;
};

enum Components {
    AutoSMSStartLesson30min = 'AutoSMSStartLesson30min',
    AutoSMSStartLesson10min = 'AutoSMSStartLesson10min',
    AutoSMSStartLesson120min = 'AutoSMSStartLesson120min',
    StudentAddedToGroup = 'StudentAddedToGroup',
    Presence = 'Presence',
    AdvicesForParents = 'AdvicesForParents',
    AdvicesForTraners = 'AdvicesForTraners',
    Recomendation = 'Recomendation',
    Homework = 'Homework',
    Stock = 'Stock',
    WaitForCoach = 'WaitForCoach',
    myNotificationsText = 'myNotificationsText',
    estimateAutoSMS = 'estimateAutoSMS',
    homeworkReminder = 'homeworkReminder',
    homeworkDeadlineAdvice = 'homeworkDeadlineAdvice',
    homeworkReminderFiveHours = 'homeworkReminderFiveHours',
}

const components: ComponentsType  = {
    AutoSMSStartLesson30min: 'AutoSMSStartLesson30min',
    AutoSMSStartLesson10min: 'AutoSMSStartLesson10min',
    AutoSMSStartLesson120min: 'AutoSMSStartLesson120min',
    studentAddedToGroupText: 'StudentAddedToGroup',
    willBePresent: 'Presence',
    willNotBePresent: 'Presence',
    advicesForParentsTexts: 'AdvicesForParents',
    advicesForTranersTexts: 'AdvicesForTraners',
    recomendationText: 'Recomendation',
    homeworkText: 'Homework',
    stockText: 'Stock',
    waitForCoachText: 'WaitForCoach',
    myNotificationsText: 'myNotificationsText',
    estimateAutoSMS: 'estimateAutoSMS',
    homeworkReminder: 'homeworkReminder',
    homeworkDeadlineAdvice: 'homeworkDeadlineAdvice',
    homeworkReminderFiveHours: 'homeworkReminderFiveHours',
}

const componentsTranslations: {[key in Components]: { ru: string, en: string, am: string}} = {
    AutoSMSStartLesson30min: {
        ru: 'Автосмс для учеников за 30 минут про начало урока',
        am: 'Ավտոսմս ուսանողների համար 30 րոպե առաջ դասի սկսվելու մասին',
        en: 'Auto SMS for students 30 minutes before the start of the lesson'
    },
    AutoSMSStartLesson10min: {
        ru: 'Автосмс для тренеров за 10 минут про начало урока',
        am: 'Ավտոսմս մարզիչների համար 10 րոպե առաջ դասի սկսվելու մասին',
        en: 'Auto SMS for coaches 10 minutes before the start of the lesson'
    },
    AutoSMSStartLesson120min: {
        ru: 'Автосмс для инд. учеников за 120 минут про начало урока',
        am: 'Ավտոսմս անհատ ուսանողների համար 120 րոպե առաջ դասի սկսվելու մասին',
        en: 'Auto SMS for individual students 120 minutes before the start of the lesson'
    },
    StudentAddedToGroup: {
        ru: 'Ученик добавлен в группу',
        am: 'Ուսանողը ավելացված է խմբում',
        en: 'Student added to the group'
    },
    Presence: {
        ru: "Буду на уроке",
        am: "Կլինեմ դասին",
        en: "I will be in the lesson"
    },
    AdvicesForParents: {
        ru: "Советы для родителей",
        am: "Խորհուրդներ ծնողների համար",
        en: "Advice for parents"
    },
    AdvicesForTraners: {
        ru: "Советы для тренеров",
        am: "Խորհուրդներ մարզիչների համար",
        en: "Advice for coaches"
    },
    Recomendation: {
        ru: "Рекомендую школу шахмат",
        am: "Սահմանում եմ շախմատի դպրոցը",
        en: "I recommend the chess school"
    },
    Homework: {
        ru: "Домашнее задание",
        am: "Տնային աշխատանք",
        en: "Homework"
    },
    Stock: {
        ru: "Акция",
        am: "Ռեկորդ",
        en: "Promotion"
    },
    WaitForCoach: {
        ru: "Дождитесь пока тренер начнет конференцию",
        am: "Սպասեք, որ մարզիչը սկսի կոնֆերանսը",
        en: "Wait for the coach to start the conference"
    },
    myNotificationsText: {
        ru: "Мои уведомления",
        am: "Իմ ծանուցումները",
        en: "My notifications"
    },
    estimateAutoSMS: {
        ru: "Спасибо за оценку",
        am: "Շնորհակալություն գնահատականի համար",
        en: "Thank you for the rating"
    },
    homeworkReminder: {
        ru: "Инструкция как выполнять дз",
        am: "Նվազագույն դասի հանձնարարական",
        en: "Instructions on how to complete homework"
    },
    homeworkDeadlineAdvice: {
        ru: "Дэдлайн дз",
        am: "Տնային աշխատանքների վերջնաժամկետ",
        en: "Homework deadline"
    },
    homeworkReminderFiveHours: {
        ru: "Уведомление о дз за 5 часов",
        am: "Ուսումնական աշխատանքների մասին ծանուցում 5 ժամ առաջ",
        en: "Homework reminder 5 hours before"
    }
};

const TextsPage: FC = () => {
    const language = useAppSelector((state) => state.TranslateSlice.language);
    const { searchText } = translations.infoTexts;
    const [activeComponent, setActiveComponent] = useState<string>('AdvicesForParents');
    const [searchComponents, setSearchComponents] = useState<Array<keyof ComponentsType>>([]);
    const renderComponent = () => {
        switch (activeComponent) {
            case 'AdvicesForParents':
                return <AdvicesForParentsTexts />;
            case 'AdvicesForTraners':
                return <AdvicesForTranersTexts />;
            case 'Recomendation':
                return <RecomendationText />;
            case 'Homework':
                return <HomeworkText />;
            case 'Stock':
                return <StockText />;
            case 'WaitForCoach':
                return <WaitForCoachText />;
            case 'AutoSMSStartLesson30min':
                return <AutoSMSStartLesson30minText />;
            case 'AutoSMSStartLesson10min':
                return <AutoSMSStartLesson10minText />;
            case 'AutoSMSStartLesson120min':
                return <AutoSMSStartLesson120minText />;
            case 'Presence':
                return <PresenceText />;
            case 'StudentAddedToGroup':
                return <StudentAddedToGroupText />;
            case 'myNotificationsText':
                return <MyNotificationsText />;
            case 'estimateAutoSMS':
                return <EstimateAutoSMS />;
            case 'homeworkReminder':
                return <HomeworkReminder />;
            case 'homeworkDeadlineAdvice':
                return <HomeworkDeadlineAdvice />;
            case 'homeworkReminderFiveHours':
                return <HomeworkReminderFiveHours />;
            default:
                return null;
        }
    };

    const searchHandler = useDebounce(async (e: ChangeEvent<HTMLInputElement>) => {
        const res = await InfoTextsService.searchInfoTexts(e.target.value);
        setSearchComponents(res.data.fields as Array<keyof ComponentsType>);
    }, 200);

    return (
        <div className="w-full p-5 flex flex-col gap-5">
            <Input placeholder={`${searchText[language]}...`} type='search' onChange={searchHandler}/>
            <div className="flex justify-center space-x-4 mb-5 space-y-2 flex-wrap">
                {Object.entries(Components).filter(([value]) => {
                    return !searchComponents.length || searchComponents.some(c => (components)[c] === value)
                }).map(([value]) => (
                    <button
                        key={value}
                        className={`px-4 py-2 rounded ${activeComponent === value ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveComponent(value)}
                    >
                        {componentsTranslations[value as Components][language]}
                    </button>
                ))}
            </div>
            {renderComponent()}
        </div>
    );
};

export default TextsPage;