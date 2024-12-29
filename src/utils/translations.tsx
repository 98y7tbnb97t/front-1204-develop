import { ru } from "date-fns/locale";
import { RepeatOptions, Units } from "../models/IAutoSMS";
import { en } from "@faker-js/faker";

export interface ITranslateItemString {
  ru: string;
  am: string;
  en: string;
}

export interface ITranslateItemArray {
  ru: string[];
  am: string[];
  en: string[];
}

export interface ITranslateItemElement {
  ru: JSX.Element;
  am: JSX.Element;
  en: JSX.Element;
}

export const translations = {
  menu: {
    messengerText: {
      ru: 'Мессенджер',
      am: 'Փոստարկղ',
      en: 'Messenger',
    },
    groupsText: {
      ru: 'Группы',
      am: 'Խմբեր',
      en: 'Groups',
    },
    myGroupsText: {
      ru: 'Мои группы',
      am: 'Իմ խմբերը',
      en: 'My groups',
    },
    tipsForParentsText: {
      ru: 'Советы родителям',
      am: 'Խորհուրդներ ծնողներին',
      en: 'Tips for parents',
    },
    tipsForTrainersText: {
      ru: 'Советы тренерам',
      am: 'Խորհուրդներ մարզիչներին',
      en: 'Adviсes for trainers',
    },
    tipsShortText: {
      ru: 'Советы',
      am: 'Խորհուրդներ',
      en: 'Tips',
    },
    lessonsText: {
      ru: 'Уроки',
      am: 'Դասեր',
      en: 'Lessons',
    },
    homeworkText: {
      ru: 'Домашнее задание',
      am: 'Տնային աշխատանք',
      en: 'Homework',
    },
    homeworkShortText: {
      ru: 'ДЗ',
      am: 'ՏԱ',
      en: 'Homework',
    },
    videoLessonsText: {
      ru: 'Видеоуроки',
      am: 'Վիդեո դասեր',
      en: 'Video lessons',
    },
    requisitesText: {
      ru: 'Баланс-реквизиты',
      am: 'Հաշվեկշիռ-ռեկվիզիտներ',
      en: 'Balance-requisites',
    },
    requisitesShortText: {
      ru: 'Реквизиты',
      am: 'Ռեկվիզիտներ',
      en: 'Requisites',
    },
    programText: {
      ru: 'Программа школы',
      am: 'Դպրոցի ծրագիր',
      en: 'School program',
    },
    programShortText: {
      ru: 'Программа',
      am: 'Ծրագիր',
      en: 'Program',
    },
    trialLessonText: {
      ru: 'Пробный урок',
      am: 'Փորձնական դաս',
      en: 'Trial lesson',
    },
    waitGroupText: {
      ru: 'Ждут группу',
      am: 'Խմբին սպասողներ',
      en: 'Waiting for the group',
    },
    myCommentsText: {
      ru: 'Мои комментарии',
      am: 'իմ մեկնաբանությունները',
      en: 'My comments',
    },
    commentText: {
      ru: 'Комментарии',
      am: 'մեկնաբանություններ',
      en: 'Comments',
    },
    waitGroupShortText: {
      ru: 'Ждут',
      am: 'Սպասում են',
      en: 'Waiting',
    },
    accessText: {
      ru: 'Доступ',
      am: 'Մուտք',
      en: 'Access',
    },
    textsText: {
      ru: 'Тексты',
      am: 'Տեքստեր',
      en: 'Texts',
    },
  },
  editRequestResults: {
    editRequestResultsTitleText: {
      ru: 'Ваш запрос на обновление ваших данных рассмотрен.',
      am: 'Ձեր տվյալները թարմացնելու Ձեր խնդրանքը վերանայվել է:',
      en: 'Your request to update your data has been reviewed.',
    },
    updateText: {
      ru: 'Если есть отклоненные данные, пожалуйста, обновите и мы снова их рассмотрим.',
      am: 'Եթե որևէ մերժված տեղեկություն կա, խնդրում ենք թարմացնել, և մենք նորից կվերանայենք:',
      en: 'If there is any rejected information, please update and we will review it again.',
    },
    rejectedText: {
      ru: 'Отклонено',
      am: 'Մերժված',
      en: 'Rejected',
    },
    acceptedText: {
      ru: 'Принято',
      am: 'Ընդունված է',
      en: 'Accepted',
    },
    profileBtnText: {
      ru: 'Профиль',
      am: 'Պրոֆիլ',
      en: 'Profile',
    },
  },
  homepage: {
    futurePlan1Text: {
      ru: 'Перевод всей платформы на армянский (ՀԱՅԵՐԵՆ) и на английский (ENGLISH) - ',
      am: 'Ամբողջ պլատֆորմայի թարգմանությունը հայերեն և անգլերեն - ',
      en: 'Translation of the entire platform into Armenian and English - ',
    },
    futurePlanDateText: {
      ru: 'до',
      am: 'մինչև',
      en: 'until',
    },
    futurePlan2Text: {
      ru: 'Мобильное приложение - ',
      am: 'Բջջային հավելված - ',
      en: 'Mobile application - ',
    },
    futurePlan4Text: {
      ru: 'Раздел лиги/турниры - до ',
      am: 'Լիգաներ/մրցաշարեր - մինչև ',
      en: 'League/tournament section - until ',
    },
    futurePlan5Text: {
      ru: 'Викторины по задачам - до ',
      am: 'Վիկտորինաներ ըստ առաջադրանքի - մինչև ',
      en: 'Quizzes by task - until ',
    },
    futurePlan6Text: {
      ru: 'Раздел дополнительные задачи - до ',
      am: 'Լրացուցիչ առաջադրանքներ - մինչև ',
      en: 'Additional tasks section - until ',
    },
    actionText: {
      ru: 'Скидка 50% за приведённого друга',
      am: '50% զեղչ նշված ընկերոջ համար',
      en: '50% discount for the friend you brought',
    },
    actionText2: {
      ru: 'АКЦИЯ до 15.07.2024',
      am: 'ԱԿՑԻԱ մինչև 15.07.2024',
      en: 'PROMOTION until 15.07.2024',
    },
    copyBtnText: {
      ru: (
        <>
          Копировать готовый текст рекомендации <br />
          для рассылки друзьям
        </>
      ),
      am: (
        <>
          Copy անել րեկոմենդացիայի պատրաստի տեքստը <br />
          ընկերներին ուղարկելու համար
        </>
      ),
      en: <>Copy the recommendation text to send to friends</>,
    },
    copyBtn2Text: {
      ru: 'Узнать подробнее про акцию',
      am: 'Իմանալ ավելին ակցիայի մասին ',
      en: ' Find out more about the promotion',
    },
    mobileIsReadyText: {
      ru: 'Ура! Мобильное приложение готово! Скачайте на телефон с Play Market и App Store.',
      am: 'Ուռա՜, Բջջային հավելվածը պատրաստ է: Ներբեռնեք ձեր հեռախոսում Play Market-ից և App Store-ից:',
      en: 'Hooray! The mobile application is ready! Download to your phone from Play Market and App Store.',
    },
    appNameText: {
      ru: ['Имя приложение', 'Araratchess.'],
      am: ['Հավելվածի անվանումը', 'Araratchess.'],
      en: ['Application name', 'Araratchess.'],
    },
    loginLichesText: {
      ru: [
        'После того как скачали, нужно сделать вход так же через lichess.org , как вы уже сделали',
        'в компьютерной версии',
        'и вести логин пароль личеса ученика.',
      ],
      am: [
        'Ներբեռնումից հետո դուք պետք է մուտք գործեք lichess.org -ի միջոցով, ինչպես արդեն արել եք',
        'համակարգչային տարբերակում',
        'և մուտքագրեք ուսանողի լիչեսի մուտքանունը և  գաղտնաբառը:',
      ],
      en: [
        'After downloading, you need to log in through lichess.org , as you already did',
        'in the computer version',
        'and enter the student’s lichess login and password.',
      ],
    },

    mobilePlatform1Text: {
      ru: 'В мобильном приложении не будет раздел УРОКИ, к урокам подключиться с телефона через приложение НЕ получиться. Так настроена специально - решение руководства. Причина - нужно чтобы у детей был большой экран во время урока.',
      am: 'Բջջային հավելվածը չի ունենա «ԴԱՍԵՐ» բաժինը, դուք չեք կարողանա հավելվածի միջոցով միանալ դասերին ձեր հեռախոսից: Դա միտումնավոր է ստեղծվել այսպես՝ տնօրինության որոշման համաձայն: Պատճառն այն է, որ դասի ժամանակ երեխաները պետք է ունենան մեծ էկրան։',
      en: 'The mobile application will not have a LESSONS section; you will NOT be able to connect to lessons from your phone through the application. It was set up this way on purpose - a management decision. The reason is that children need to have a large screen during the lesson.',
    },
    mobilePlatform2Text: {
      ru: [
        'При острой необходимости технически возможно подключиться с телефона с гугл браузера и',
        'включить режим для ПК',
        ' , но во время урока все будет очень мелко и неудобно.',
      ],
      am: [
        'Եթե կա հրատապ անհրաժեշտություն, տեխնիկապես հնարավոր է հեռախոսից միանալ Google բրաուզերով և',
        'միացնելով PC ռեժիմը',
        ', բայց դասի ընթացքում ամեն ինչ շատ փոքր և անհարմար կլինի:',
      ],
      en: [
        'If there is an urgent need, it is technically possible to connect from a phone with a Google browser and',
        'turn on the Desktop site',
        ', but during the lesson everything will be very small and inconvenient.',
      ],
    },
    mobilePlatform3Text: {
      ru: 'В мобильном приложении будут все остальные раздели, дз, мессенджер, видеоуроки итд.',
      am: 'Բջջային հավելվածը կունենա մնացած բոլոր բաժինները՝ տնային աշխատանք, փոստարկղ, վիդեո դասեր և այլն։',
      en: 'The mobile application will have all the other sections: homework, messenger, video lessons, etc.',
    },
    mobilePlatform4Text: {
      ru: 'С планшета и других гаджетов с экраном больше, чем телефон - можно будет подключиться к урокам через приложение.',
      am: 'Պլանշետից և հեռախոսից մեծ էկրան ունեցող այլ գաջեթներից կարող եք դասերին միանալ հավելվածի միջոցով:',
      en: 'From a tablet and other gadgets with a screen larger than a phone, you can connect to lessons through the application.',
    },
    importantText: {
      ru: 'Важно знать! Подробнее!',
      am: 'Կարևոր է իմանալ! Ավելի մանրամասն!',
      en: 'It is important to know! More details!',
    },
  },
  messenger: {
    muteText: {
      ru: 'Без звука',
      am: 'Սաունդի առանց',
      en: 'Mute'
    },
    unMuteText: {
      ru: 'Вернуть звук',
      am: 'Աղմունել ձայնը',
      en: 'Unmute'
    },
    tranersComment: {
      ru: 'Дополнительные комментарии тренера',
      am: 'Մարզչի լրացուցիչ մեկնաբանություններ',
      en: 'Additional comments from the coach'
    },
    newMessagesText: {
      ru: 'Новые сообщения',
      en: 'New messages',
      am: 'Նոր գրառումներ'
    },
    usersSeeNames: {
      ru: 'Пользователи видят имена друг друга',
      en: "Users see each other's names",
      am: 'Օգտագործողները տեսնում են միմյանց անունները'
    },
    archivedText: {
      ru: 'Архивированные',
      am: 'Արխիվացված',
      en: 'Archived',
    },
    deletedText: {
      ru: 'Удаленные',
      am: 'Հեռավոր',
      en: 'Deleted',
    },
    viewFormerParticipantsText: {
      ru: 'Просмотреть бывших участников',
      am: 'Դիտեք նախկին անդամներին',
      en: 'View former participants',
    },
    programmersText: {
      ru: 'ПРОГРАММИСТЫ',
      am: 'ԾՐԱԳՐԱՎՈՐՈՂՆԵՐ',
      en: 'PROGRAMMERS',
    },
    chatsText: {
      ru: 'Чаты',
      am: 'Զրույցներ',
      en: 'Chats',
    },
    allText: {
      ru: 'Все',
      am: 'Բոլորը',
      en: 'All',
    },
    groupsText: {
      ru: 'Группы',
      am: 'Խմբեր',
      en: 'Groups',
    },
    myGroupsText: {
      ru: 'Мои группы',
      am: 'Իմ խմբերը',
      en: 'My groups',
    },
    basicsText: {
      ru: 'Основные',
      am: 'Հիմնական',
      en: 'Basic',
    },
    allGroupsText: {
      ru: 'Все группы',
      am: 'Բոլոր խմբերը',
      en: 'All groups',
    },
    schoolNameText: {
      ru: 'Международная Школа Арарат',
      am: 'Արարատ միջազգային դպրոց',
      en: 'Ararat international school',
    },
    lessonsInRussianText: {
      ru: 'Уроки на русском',
      am: 'Դասերը ռուսերենով',
      en: 'Lessons in Russian',
    },
    lessonsInEnglishText: {
      ru: 'Уроки на английском',
      am: 'Դասերը անգլերենով',
      en: 'Lessons in English',
    },
    lessonsInFrenchText: {
      ru: 'Уроки на французском',
      am: 'Դասերը ֆրանսերենով',
      en: 'Lessons in French',
    },
    lessonsInGermanText: {
      ru: 'Уроки на немецком',
      am: 'Դասերը գերմաներենով',
      en: 'Lessons in German',
    },
    urgentText: {
      ru: 'Срочное Админы Грачья',
      am: 'հրատապ',
      en: 'Urgent',
    },
    reportText: {
      ru: 'Отчет Админы',
      am: 'հաշվետվություն',
      en: 'Report',
    },
    allChatsText: {
      ru: 'Все',
      am: 'Բոլորը',
      en: 'All',
    },
    groupDescriptionTitleText: {
      ru: 'Описание группы',
      am: 'Խմբի նկարագրությունը',
      en: 'Group description',
    },
    descriptionTitleText: {
      ru: 'Описание',
      am: 'Նկարագրությունը',
      en: 'Description',
    },
    adminsText: {
      ru: 'Админы',
      am: 'Ադմիններ',
      en: 'Admins',
    },
    supportForTrainersText: {
      ru: 'Тех. поддержка для тренеров',
      am: 'Տեխնիկական աջակցություն մարզիչների համար',
      en: 'Technical support for trainers',
    },
    supportForParentsText: {
      ru: 'Тех. поддержка для родителей',
      am: 'Տեխնիկական աջակցություն ծնողների համար',
      en: 'Technical support for parents',
    },
    supportDescriptionText: {
      ru:
        'В этой группе всегда можете написать любые вопросы про все.' +
        'Про уроки, про оплаты, про тренеров, про платформу итд. ',
      am:
        'Այս խմբում միշտ կարող եք գրել ցանկացած հարցի մասին:' +
        'Դասերի, վճարումների, մարզիչների, հարթակի և այլնի մասին։',
      en:
        'In this group you can always write any questions about anything.' +
        'About lessons, about payments, about trainers, about the platform, etc.',
    },
    documentsLinkText: {
      ru: 'ВСЕ документы ВСЕГДА можно найти тут - ',
      am: 'ԲՈԼՈՐ փաստաթղթերը ՄԻՇՏ կարելի է գտնել այստեղ` ',
      en: 'ALL documents can ALWAYS be found here - ',
    },
    technicalLinkText: {
      ru: 'Разное важное-техническое',
      am: 'Տարբեր կարևոր տեխնիկական',
      en: 'Miscellaneous important technical',
    },
    lessonsLinkText: {
      ru: 'Как вести урок',
      am: 'Ինչպես անցկացնել դասը',
      en: 'How to teach a lesson',
    },
    levelsLinkText: {
      ru: 'Уровни',
      am: 'Մակարդակներ',
      en: 'Levels',
    },
    forNewTrainersText: {
      ru: 'Для новых тренеров',
      am: 'Նոր մարզիչների համար',
      en: 'For new trainers',
    },
    crmText: {
      ru: 'СРМ',
      am: 'CRM',
      en: 'CRM',
    },
    zoomLinkText: {
      ru: 'Ссылка зума Грачья Гришаевич',
      am: 'Զումի հղումը Հրաչյա Գրիգորյան',
      en: 'Zoom link Hrachya Grigoryan',
    },
    conferenceIdText: {
      ru: 'Идентификатор конференции:',
      am: 'Կոնֆերանսի ID՝',
      en: 'Conference ID:',
    },
    accessCodeText: {
      ru: 'Код доступа: ',
      am: 'Մուտքի կոդ՝ ',
      en: 'Access code: ',
    },
    importantNewsText: {
      ru: 'ВАЖНЫЕ НОВОСТИ',
      am: 'ԿԱՐԵՎՈՐ ՆՈՐՈՒԹՅՈՒՆՆԵՐ',
      en: 'IMPORTANT NEWS',
    },
    importantNewsDescriptionText: {
      ru: 'В этом канале будут посты про самое важное, новости, мероприятии, инструкции итд.',
      am: 'Այս ալիքը պարունակում է գրառումներ ամենակարևոր բաների, նորությունների, իրադարձությունների, հրահանգների և այլնի մասին:',
      en: 'This channel contains posts about the most important things, news, events, instructions, etc.',
    },
    offlineTournamentsText: {
      ru: 'ОФЛАЙН ТУРНИРЫ',
      am: 'ՕՖԼԱՅՆ ՄՐՑԱՇԱՐԵՐ',
      en: 'OFFLINE TOURNAMENTS',
    },
    onlineSimultaneousSundayText: {
      ru: 'ОНЛАЙН ТУРНИРЫ каждое воскресенье 11:00 (время МСК)',
      am: 'ՕՆԼԱՅՆ ՄՐՑԱՇԱՐՆԵՐ ամեն կիրակի 11:00 (Մոսկվայի ժամանակով)',
      en: 'ONLINE TOURNAMENTS every Sunday 11:00 (Moscow time)',
    },
    traditionalTournamentsText: {
      ru: 'ТРАДИЦИОННЫЙ ТУРНИР КАЖДОЕ ВОСКРЕСЕНЬЕ',
      am: 'ԱՎԱՆԴԱԿԱՆ ՄՐՑԱՇԱՐ ԱՄԵՆ ԿԻՐԱԿԻ',
      en: 'TRADITIONAL TOURNAMENT EVERY SUNDAY',
    },
    onlineSimultaneousText: {
      ru: 'ОНЛАЙН СЕАНСЫ в каждую субботу 19:00 (время МСК)',
      am: 'ՕՆԼԱՅՆ ՍԵԱՆՍՆԵՐ ամեն շաբաթ օրը 19:00 (Մոսկվայի ժամանակով)',
      en: 'ONLINE SIMULS every Saturday 19:00 (Moscow time)',
    },
    aboutSimultaneousText: {
      ru: '*Что такое Сеанс?* - Сеанс одновременной игры — форма спортивного мероприятия, в котором один человек (сеансёр) одновременно играет в интеллектуальную игру (шахматы, шашки) с несколькими противниками. Подробнее - https://clck.ru/FV5uX',
      am: '*Ի՞նչ է սեանսը* - Միաժամանակյա խաղաշար, մարզական միջոցառման տեսակ, որտեղ մեկ մարդ (խաղաշար անցկացնողը) միաժամանակ խաղում է ինտելեկտուալ խաղ (շախմատ, շաշկի) բազմաթիվ հակառակորդների դեմ։ Մանրամասները՝ https://cutt.ly/9w3bio2o',
      en: '*What is a Simuls?* - A simuls exhibition or simuls display is a board game exhibition (commonly chess or Go) in which one player (typically of high rank, such as a grandmaster or dan-level player) plays multiple games at a time with a number of other players. Such an exhibition is often referred to simply as a "simul". Read more: - https://cutt.ly/9w3buLwL',
    },
    aboutTrialLessonText: {
      ru: 'Все про пробные уроки пишем в этом чате. Не приходит на урок, нужно переназначить итд итд.',
      am: 'Փորձնական դասերի մասին ամեն ինչ գրում ենք այս չաթում։ Չի գալիս դասի, պետք է վերանշանակվի և այլն:',
      en: "We write everything about trial lessons in this chat. Doesn't come to lesson, needs to be reassigned, etc.",
    },
    psychoWebinarsText: {
      ru: 'ВЕБИНАРЫ ПСИХОЛОГА',
      am: 'ՎԵԲԻՆԱՐՆԵՐ ՀՈԳԵԲԱՆԻ ԿՈՂՄԻՑ',
      en: 'WEBINARS BY PSYCHOLOGIST',
    },
    trainerPlatformProblemsText: {
      ru: 'Проблемы с платформой ТРЕНЕРА',
      am: `Հարթակի հետ կապված խնդիրներ "ՄԱՐԶԻՉՆԵՐ"`,
      en: 'Problems with the platform TRAINERS',
    },
    technicalProblemsDescriptionText: {
      ru: 'Все технические вопросы, проблемы, что не работает, пишите в это чате, чтобы мы исправили. Спасибо.',
      am: 'Բոլոր տեխնիկական հարցերը, խնդիրները, ինչ չի ստացվում, գրեք այս չաթում, որպեսզի շտկենք։ Շնորհակալություն.',
      en: 'All technical questions, problems, what does not work, write in this chat so that we can fix it. Thank you.',
    },
    armenianTrainersText: {
      ru: 'Армянские тренеры',
      am: 'Հայ մարզիչներ',
      en: 'Armenian Trainers',
    },
    lessonsInArmenianText: {
      ru: 'Уроки на армянском',
      am: 'Դասերը հայերենով',
      en: 'Lessons in Armenian',
    },
    adminText: {
      ru: 'АДМИН',
      am: 'ԱԴՄԻՆ',
      en: 'ADMIN',
    },
    trialLessonQuestionsText: {
      ru: 'ПРОБНЫЙ УРОК - ВОПРОСЫ',
      am: 'ՓՈՐՁՆԱԿԱՆ ԴԱՍ - ՀԱՐՑԵՐ',
      en: 'TRIAL LESSON - QUESTIONS',
    },
    adminPlatformProblemsText: {
      ru: 'Проблемы с платформой АДМИНЫ',
      am: `Հարթակի հետ կապված խնդիրներ "ԱԴՄԻՆՆԵՐ"`,
      en: 'Problems with the platform ADMINS',
    },
    groupDescriptionText: {
      ru: 'Описание группы',
      am: 'Խմբի նկարագրությունը',
      en: 'Group description',
    },
    descriptionText: {
      ru: 'Описание',
      am: 'Նկարագրություն',
      en: 'Description',
    },
    mediaFilesText: {
      ru: 'Медиа, файлы, ссылки',
      am: 'Մեդիա, ֆայլեր, հղումներ',
      en: 'Media, Files, Links',
    },
    usersText: {
      ru: 'Пользователи',
      am: 'Օգտատերեր',
      en: 'Users',
    },
    userText: {
      ru: 'Пользователь',
      am: 'Օգտատեր',
      en: 'User',
    },
    addUserText: {
      ru: 'Добавить пользователя',
      am: 'Ավելացնել օգտվող',
      en: 'Add user',
    },
    addUserInGroupText: {
      ru: 'Добавить пользователя в группу',
      am: 'Ավելացնել օգտվողին խումբ',
      en: 'Add User To Group',
    },
    emailText: {
      ru: 'Эл. почта',
      am: 'Էլ. փոստ',
      en: 'Email',
    },
    enterMessageText: {
      ru: 'Введите сообщение...',
      am: 'Մուտքագրեք ձեր հաղորդագրությունը...',
      en: 'Enter your message...',
    },
    replyDescriptionText: {
      ru: 'Для того чтобы написать ответ, выберите пользователя для ответа',
      am: 'Պատասխան գրելու համար ընտրեք օգտվողին, ում կպատասխանեք',
      en: 'To write a response, select a user to respond to',
    },
    createAnonimGroupText: {
      ru: 'Создать анонимную группу',
      am: 'Ստեղծել անանուն խումբ',
      en: 'Create an anonymous group',
    },
    createSimpleGroupText: {
      ru: 'Создать простую группу',
      am: 'Ստեղծեք պարզ խումբ',
      en: 'Сreate a simple group',
    },
    nameText: {
      ru: 'Имя',
      am: 'Անուն',
      en: 'Name',
    },
    createGroupText: {
      ru: 'Создать группу',
      am: 'Ստեղծել խումբ',
      en: 'Create group',
    },
    searchText: {
      ru: 'Поиск...',
      am: 'Որոնել...',
      en: 'Search...',
    },
    writeDisabledText: {
      ru: 'Вы не можете писать в этом чате',
      am: 'Դուք չեք կարող գրել այս չաթում',
      en: 'You cannot write in this chat',
    },
    emptyDialogText: {
      ru: 'Диалог пуст',
      am: 'Երկխոսությունը դատարկ է',
      en: 'Dialogue is empty',
    },
    mediaText: {
      ru: 'Медиа',
      am: 'Մեդիա',
      en: 'Media',
    },
    filesText: {
      ru: 'Файлы',
      am: 'Ֆայլեր',
      en: 'Files',
    },
    linksText: {
      ru: 'Ссылки',
      am: 'Հղումներ',
      en: 'Links',
    },
    groupMediaText: {
      ru: 'Группа Медиа',
      am: 'Խմբի մեդիա',
      en: 'Group Media',
    },
    eduProgramText: {
      ru: 'Программа обучения',
      am: 'Ուսումնական ծրագիր',
      en: 'Educational program',
    },
    trialLessonForAdminText: {
      ru: 'А ПРОБНЫЙ УРОК ДЛЯ АДМИНОВ ПО ТЕХ ПРОБЛЕМАМ',
      am: 'ՏԵԽՆԻԿԱԿԱՆ ԽՆԴԻՐՆԵՐԻ ՎԵՐԱԲԵՐՅԱԼ ՓՈՐՁՆԱԿԱՆ ԴԱՍ ԱԴՄԻՆԻ ՀԱՄԱՐ',
      en: 'A TRIAL LESSON ON TECHNICAL PROBLEMS FOR ADMIN',
    },
    selectChatText: {
      ru: 'Выберите чат, чтобы начать общение',
      am: 'Ընտրեք զրույց՝ հաղորդագրություններ ուղարկելու համար',
      en: 'Select chat to start messaging',
    },
    addToGroupsText: {
      ru: 'Добавить в группы',
      am: 'Ավելացնել Խմբերին',
      en: 'Add to Groups',
    },
    addToTagText: {
      ru: 'Добавить в',
      am: 'Ավելացնել',
      en: 'Add to',
    },
    createNewCategoryText: {
      ru: 'Создать новую категорию',
      am: 'Ստեղծել նոր կատեգորիա',
      en: 'Create new category',
    },
    removeFromCategoryText: {
      ru: 'Удалить из категории',
      am: 'Հեռացնել կատեգորիայից',
      en: 'Remove from category',
    },
    archiveText: {
      ru: 'Архивировать',
      am: 'Արխիվ',
      en: 'Archive',
    },
    unArchiveText: {
      ru: 'Разархивировать',
      am: 'Ապաարխիվացնել',
      en: 'Unarchive',
    },
    createNewTagText: {
      ru: 'Создать новый тег',
      am: 'Ստեղծել նոր պիտակ',
      en: 'Create New Tag',
    },
    tagNameText: {
      ru: 'Название тега',
      am: 'Պիտակի անունը',
      en: 'Tag Name',
    },
    createTagText: {
      ru: 'Создать тег',
      am: 'Ստեղծել պիտակ',
      en: 'Create Tag',
    },
    removeFromGroupText: {
      ru: 'Удалить из группы',
      am: 'Հեռացնել խմբից',
      en: 'Remove from group',
    },
    removeUserFromGroupText: {
      ru: 'Удалить пользователя из группы',
      am: 'Հեռացնել օգտվողին խմբից',
      en: 'Remove User From Group',
    },
    sureAboutDeleteText: {
      ru: ['Вы уверены, что хотите удалить пользователя', 'из этой группы?'],
      am: ['Վստա՞հ եք, որ ցանկանում եք ջնջել', 'օգտվողին այս խմբից:'],
      en: ['Are you sure you want to delete the user', 'from this group?'],
    },
    moveToAnotherGroupText: {
      ru: 'Переместить в другую группу',
      am: 'Տեղափոխվել մեկ այլ խումբ',
      en: 'Move to another group',
    },
    moveUserToAnotherGroupText: {
      ru: 'Переместить пользователя в другую группу',
      am: 'Օգտատիրոջը տեղափոխել մեկ այլ խումբ',
      en: 'Move User to Another Group',
    },
    enterTheIdOfGroupText: {
      ru: [
        'Введите имя группы, в которую вы хотите переместить пользователя',
        '',
      ],
      am: [
        'Մուտքագրեք այն խմբի ID-ն կամ անունը, որը ցանկանում եք տեղափոխել',
        'օգտատիրոջը',
      ],
      en: ['Enter the id or name of the group you want to move the user', 'to'],
    },
    groupIdText: {
      ru: 'Идентификатор группы',
      am: 'Խմբի id',
      en: 'Group id',
    },
    moveUserText: {
      ru: 'Переместить пользователя',
      am: 'Տեղափոխել օգտվողին',
      en: 'Move User',
    },
    alreadyInGroupText: {
      ru: 'Уже в групе',
      am: 'Արդեն խմբում է',
      en: 'Already in group',
    },
    yesText: {
      ru: 'Да',
      am: 'Այո',
      en: 'Yes',
    },
    noText: {
      ru: 'Нет',
      am: 'Ոչ',
      en: 'No',
    },
    deleteText: {
      ru: 'Удалить',
      am: 'Ջնջել',
      en: 'Delete',
    },
    unansweredText: {
      ru: 'Неотвеченные',
      am: 'Անպատասխան',
      en: 'Unanswered',
    },
    answerText: {
      ru: 'Ответить',
      am: 'Պատասխանել',
      en: 'Reply',
    },
    closeDialogText: {
      ru: 'Закрыть Диалог',
      am: 'Փակել Դիալոգը',
      en: 'Close Dialogue',
    },
    closedDialogText: {
      ru: 'Администратор школы закрыл диалог. Если ваш вопрос все еще не решен, напишите, пожалуйста, повторно.',
      am: 'Դպրոցի տնօրինությունը փակել է երկխոսությունը։ Եթե ձեր խնդիրը դեռ չի լուծվել, խնդրում ենք նորից գրել։',
      en: 'The school administrator closed the dialogue. If your issue is still not resolved, please write again.',
    },
    editText: {
      ru: 'Изменить',
      am: 'Խմբագրել',
      en: 'Edit',
    },
    copyText: {
      ru: 'Копировать текст',
      am: 'Պատճենել տեքստը',
      en: 'Copy text',
    },
  },
  groups: {
    groupNameText: {
      ru: "Название группы",
      am: "Խմբի անվանումը",
      en: "Group name"
    },
    levelText: {
      ru: "Уровень",
      am: "Հարկ",
      en: "Level"
    },
    numOfStudentsText: {
      ru: "Кол. учеников",
      am: "Ուսանողների քանակը",
      en: "Number of students"
    },
    startText: {
      ru: "Начало",
      am: "Սկիզբ",
      en: "Start"
    },
    creationDateText: {
      ru: "Дата создания",
      am: "Ստեղծման ամսաթիվ",
      en: "Creation date"
    },
    statusText: {
      ru: "Статус",
      am: "Կարգավիճակ",
      en: "Status"
    },
    recruitmentText: {
      ru: "Идет набор",
      am: "Ընթացքում է հավաքագրումը",
      en: "Enrollment is open"
    },
    studyingText: {
      ru: "Обучается",
      am: "Սովորում է",
      en: "Studying"
    },
    groupText: {
      ru: "Групповой",
      am: "Խմբային",
      en: "Group"
    },
    editText: {
      ru: "Править",
      am: "Խմբագրել",
      en: "Edit"
    },
    individualText: {
      ru: "Индивидуальный",
      am: "Անհատական",
      en: "Individual"
    },
    trainingFormatText: {
      ru: "Формат обучения",
      am: "Ուսուցման ձևաչափ",
      en: "Training format"
    },
    trainingStatusText: {
      ru: "Статус обучения",
      am: "Ուսուցման կարգավիճակ",
      en: "Training status"
    },
    nameText: {
      ru: 'Название',
      am: 'Անուն',
      en: 'Name',
    },
    autoNameText: {
      ru: 'Название  (Имя будет записано автоматически согласно примечаниям в разделе «График», «Длительность» и «Педагог».)',
      am: 'Անունը (Անունը կգրանցվի ավտոմատ կերպով՝ համաձայն «Ժամանակացույց», «Տևողություն» և «Ուսուցիչ» բաժինների նշումների):',
      en: 'Name (The name will be recorded automatically according to the notes in the “Schedule”, “Duration” and “Teacher” sections.)',
    },
    trainersText: {
      ru: 'Тренеры',
      am: 'մարզիչներ',
      en: 'Trainers',
    },
    mondayText: {
      ru: 'Понедельник',
      en: 'Monday',
      am: 'Երկուշաբթի'
    },
    tuesdayText: {
      ru: 'Вторник',
      en: 'Tuesday',
      am: 'Երեքշաբթի'
    },
    wednesdayText: {
      ru: 'Среда',
      en: 'Wednesday',
      am: 'չորեքշաբթի'
    },
    thursdayText: {
      ru: 'Четверг',
      en: 'Thursday',
      am: 'հինգշաբթի'
    },
    fridayText: {
      ru: 'Пятница',
      en: 'Friday',
      am: 'Ուրբաթ'
    },
    saturdayText: {
      ru: 'Суббота',
      en: 'Saturday',
      am: 'Շաբաթ'
    },
    sundayText: {
      ru: 'Воскресенье',
      en: 'Sunday',
      am: 'Կիրակի'
    },
    mondaySlugText: {
      ru: 'Пн',
      en: 'Mon',
      am: 'Երկ'
    },
    tuesdaySlugText: {
      ru: 'Вт',
      en: 'Tue',
      am: 'Երեք'
    },
    wednesdaySlugText: {
      ru: 'Ср',
      en: 'Wed',
      am: 'Չոր'
    },
    thursdaySlugText: {
      ru: 'Чт',
      en: 'Thu',
      am: 'Հին'
    },
    fridaySlugText: {
      ru: 'Пт',
      en: 'Fri',
      am: 'Ուր'
    },
    saturdaySlugText: {
      ru: 'Сб',
      en: 'Sat',
      am: 'Շաբ'
    },
    sundaySlugText: {
      ru: 'Вс',
      en: 'Sun',
      am: 'Կիր'
    },
    knowledgeLevelText: {
      ru: 'Уровень знаний',
      am: 'Գիտելիքի մակարդակ',
      en: 'Knowledge level',
    },
    studentNumberText: {
      ru: 'Количество учеников',
      am: 'Աշակերտների թիվը',
      en: 'Number of students',
    },
    startDateText: {
      ru: 'Начало обучения',
      am: 'Մեկնարկի ամսաթիվը',
      en: 'Start date',
    },
    addGroupText: {
      ru: 'Добавить группу',
      am: 'Ավելացնել խումբ',
      en: 'Add a group',
    },
    dayOfThwWeekText: {
      ru: 'День недели',
      am: 'Շաբաթվա օր',
      en: 'Day of the week',
    },
    beginningTimeText: {
      ru: 'Нач. время',
      am: 'Մեկնարկի ժամանակը',
      en: 'Beginning time',
    },
    minuteText: {
      ru: 'минут',
      am: 'րոպե',
      en: 'minutes',
    },
    addText: {
      ru: 'Добавить',
      am: 'Ավելացնել',
      en: 'Add',
    },
    deleteText: {
      ru: 'Удалить',
      am: 'Ջնջել',
      en: 'Delete',
    },
    numberOfStudentsText: {
      ru: 'Кол-во учеников',
      am: 'աշակերտների թիվը',
      en: 'Number of students',
    },
    closeText: {
      ru: 'Закрыть',
      am: 'Փակել',
      en: 'Close',
    },
    saveText: {
      ru: 'Сохранить',
      am: 'Պահպանել',
      en: 'Save',
    },
    substituteTranerComment: {
      ru: 'Комментарий заменяющего тренера',
      am: 'Փոխարինող մարզչի մեկնաբանությունը',
      en: 'Substitute traner comment',
    },
    currentText: {
      ru: 'Текущие',
      am: 'Ընթացիկ',
      en: 'Current',
    },
    archivedText: {
      ru: 'Архивированные',
      am: 'Արխիվացված',
      en: 'Archived',
    },
    activeText: {
      ru: 'Активные',
      am: 'Ակտիվ',
      en: 'Active',
    },
    noStudentsText: {
      ru: 'Без учеников',
      am: 'Առանց աշակերտների',
      en: 'No students',
    },
    participantsText: {
      ru: 'Ученики',
      am: 'Աշակերտները',
      en: 'Students',
    },
    programText: {
      ru: 'Программа',
      am: 'Ծրագիր',
      en: 'Program',
    },
    forOpenCloseLessonText: {
      ru: 'Для того чтобы перейти в другие разделы закончите урок.',
      am: 'Այլ բաժիններին անցնելու համար ավարտեք դասը:',
      en: 'To move on to other sections, complete the lesson.',
    },
    goTօOnlineLessonText: {
      ru: 'Перейти к онлайн уроку',
      am: 'Միանալ օնլայն դասին',
      en: 'Go to online lesson',
    },
    homeworkText: {
      ru: 'Домашнее задание',
      am: 'Տնային աշխատանք',
      en: 'Homework',
    },
    viewStudentAnswersText: {
      ru: 'Посмотреть ответы учеников',
      am: 'Դիտել աշակերտների պատասխանները',
      en: 'View student answers',
    },
    viewHomeworkText: {
      ru: 'Посмотреть дз',
      am: 'Դիտել տնային աշխատանքը',
      en: 'View homework',
    },
    transferToOnlineLessonText: {
      ru: 'Перенести все в онлайн урок',
      am: 'Բոլորը տեղափոխել օնլայն դաս',
      en: 'Transfer everything to an online lesson',
    },
    onlineLessonText: {
      ru: 'Онлайн урок',
      am: 'Օնլայն դաս',
      en: 'Online lesson',
    },
    unknownText: {
      ru: 'Неизвестно',
      am: 'Անհայտ',
      en: 'Unknown',
    },
    groupDescriptionText: {
      ru: 'Описание группы',
      am: 'Խմբի նկարագրությունը',
      en: 'Group description',
    },
    editDescriptionText: {
      ru: 'Изменить описание',
      am: 'Խմբագրել նկարագրությունը',
      en: 'Edit Description',
    },
    editGroupText: {
      ru: 'Изменить группa',
      am: 'Խմբագրել Խումբը',
      en: 'Edit Group',
    },
    historyText: {
      ru: 'История',
      am: 'պատմություն',
      en: 'Story',
    },
    addStudentText: {
      ru: 'Добавить ученика',
      am: 'Ավելացնել աշակերտ',
      en: 'Add a student',
    },
    addUserToGroupText: {
      ru: 'Добавить пользователя в группу',
      am: 'Ավելացնել օգտվողին խումբ',
      en: 'Add User To Group',
    },
    emailText: {
      ru: 'Эл. почта',
      am: 'Էլ. փոստ',
      en: 'Email',
    },
    addUserText: {
      ru: 'Добавить пользователя',
      am: 'Ավելացնել օգտվողին',
      en: 'Add user',
    },
    openGroupChatText: {
      ru: 'Открыть чат группы',
      am: 'Բացել խմբի զրուցարանը',
      en: 'Open group chat',
    },
    yourGroupChatText: {
      ru: 'Чат вашей группы',
      am: 'Ձեր խմբի զրուցարանը',
      en: 'Your group chat',
    },
    searchText: {
      ru: 'Поиск...',
      am: 'Որոնել...',
      en: 'Search...',
    },
    lessonDateText: {
      ru: 'Дата урока:',
      am: 'Դասի ամսաթիվը`',
      en: 'Lesson date:',
    },
    deadlineText: {
      ru: 'Срок до:',
      am: 'Վերջնաժամկետը մինչև`',
      en: 'Deadline until:',
    },
    sendHomeworkText: {
      ru: 'Отправить дз',
      am: 'Ուղարկել տնային աշխատանքը',
      en: 'Send homework',
    },
    descriptionText: {
      ru: 'Описание',
      am: 'Նկարագրություն',
      en: 'Description',
    },
  },
  lessons: {
    playFromCurrentPosition: {
      ru: 'Сыграть с данной позиции',
      am: 'Խաղալ տվյալ դիրքից',
      en: 'Play from this position'
    },
    participantsText: {
      ru: 'Участники',
      am: 'Մասնակիցներ',
      en: 'Participants',
    },
    goToLessonText: {
      ru: 'Перейти к уроку',
      am: 'Միանալ դասին',
      en: 'Go to lesson',
    },
    waitForCoachText: {
      ru: 'Дождитесь пока тренер начнет конференцию',
      am: 'Սպասեք մինչև մարզիչը սկսի դասը',
      en: 'Wait for the coach to start the conference',
    },
    afterFweMinutesText: {
      ru: '1. Если вы ждете более 2-3 минут и нет подключение, жмите Ctrl+Shift+R или просто обновите страницу.',
      am: '1. 1. Եթե սպասում եք 2-3 րոպեից ավելի ու կապ չկա, սեղմեք Ctrl+Shift+R կամ թարմացրեք էջը։',
      en: '1. If you wait more than 2-3 minutes and there is no connection, press Ctrl+Shift+R or simply refresh the page.',
    },
    editText: {
      ru: 'Редактировать',
      am: 'Խմբագրել',
      en: 'Edit',
    },
    useChromeText: {
      ru: '2. Для избежания разных проблем при подключении к конференции рекомендуем всегда использовать именно GOOGLE CHROME.',
      am: '2. Դասին միանալու ժամանակ տարբեր խնդիրներից խուսափելու համար խորհուրդ ենք տալիս միշտ օգտագործել GOOGLE CHROME-ը:',
      en: '2. To avoid various problems when connecting to a conference, we recommend that you always use GOOGLE CHROME.',
    },
    whiteWhatsUpText: {
      ru: [
        '3. Если снова не получилось подключиться, пишите сообщения в',
        'WhatsApp',
        'администратору школы или в группе на портале где тренер и администратор.',
      ],
      am: [
        '3. Եթե նորից չեք կարողանում միանալ, գրեք հաղորդագրություն դպրոցի ադմինիստրատորին',
        '  WhatsApp',
        '-ով կամ պլատֆորմայի խմբում, որտեղ մարզիչն ու ադմինիստրատորն են:',
      ],
      en: [
        '3. If you are unable to connect again, write',
        'WhatsApp',
        'messages to the school administrator or in a group on the portal where the coach and administrator are.',
      ],
    },
    technicalSupportChatText: {
      ru: 'Чат техподдержки',
      am: 'Տեխնիկական օգնության զրուցարան',
      en: 'Technical support chat',
    },
    orientationText: {
      ru: 'Ориентация',
      am: 'կողմնորոշում',
      en: 'Orientation',
    },
    yourGroupChatText: {
      ru: 'Чат вашей группы',
      am: 'Ձեր խմբի զրուցարանը',
      en: 'Your group chat',
    },
    forStartConferenceText: {
      ru: (
        <>
          Чтобы начать конференцию,
          <br /> нажмите на "Начать урок"
        </>
      ),
      am: (
        <>
          Դասը սկսելու համար <br /> սեղմեք «Սկսել դասը»
        </>
      ),
      en: (
        <>
          To start the conference,
          <br /> click on "Start lesson"
        </>
      ),
    },
    allowViewText: {
      ru: 'Разрешить LINK просматривать эту вкладку?',
      am: 'Թույլատրե՞լ LINK -ին դիտել այս ներդիրը:',
      en: 'Allow LINK to view this tab?',
    },
    ableToViewText: {
      ru: 'Сайт сможет просматривать содержимое этой вкладки.',
      am: 'Կայքը կկարողանա դիտել այս ներդիրի բովանդակությունը:',
      en: 'The site will be able to view the contents of this tab',
    },
    allowText: {
      ru: 'Разрешить',
      am: 'Թույլատրել',
      en: 'Allow',
    },
    cancelText: {
      ru: 'Отмена',
      am: 'Չեղարկել',
      en: 'Cancel',
    },
    accessibleTabText: {
      ru: 'К этой вкладке предоставляется доступ для LINK',
      am: 'Այս ներդիրը հասանելի է LINK-ին',
      en: 'This tab is accessible to LINK',
    },
    stopSharingText: {
      ru: 'Прекратить общый доступ',
      am: 'Դադարեցնել համօգտագործումը',
      en: 'Stop sharing',
    },
    successText: {
      ru: 'Успех!',
      am: 'Հաջողված!',
      en: 'Success!',
    },
    lessonStartedText: {
      ru: 'Онлайн урок успешно начат!',
      am: 'Օնլայն դասը հաջողությամբ մեկնարկել է։',
      en: 'The online lesson has started successfully!',
    },
    programText: {
      ru: 'Программа',
      am: 'Ծրագիր',
      en: 'Program',
    },
    studentsText: {
      ru: 'Ученики',
      am: 'Աշակերտները',
      en: 'Students',
    },
    historyText: {
      ru: 'История',
      am: 'պատմություն',
      en: 'Story',
    },
    attendedStudentsText: {
      ru: 'Посещаемые ученики',
      am: 'Մասնակցող աշակերտները',
      en: 'Students Attended',
    },
    leaderboardText: {
      ru: 'Таблица лидеров',
      am: 'Առաջատարների աղյուսակ',
      en: 'Leaderboard',
    },
    lessonMaterialText: {
      ru: 'Классные материалы ',
      am: 'Դասի նյութ',
      en: 'Lesson material',
    },
    notesText: {
      ru: 'Примечания',
      am: 'Նշումներ',
      en: 'Notes',
    },
    goBackToLessonText: {
      ru: 'Перейти обратно к уроку',
      am: 'Վերադառնալ դասին',
      en: 'Go back to lesson',
    },
    homeworkText: {
      ru: 'Домашнее задание',
      am: 'Տնային աշխատանք',
      en: 'Homework',
    },
    groupDescriptionText: {
      ru: 'Описание группы',
      am: 'Խմբի նկարագրությունը',
      en: 'Group description',
    },
    startLessonText: {
      ru: 'Начать урок',
      am: 'Սկսել դասը',
      en: 'Start lesson',
    },
    chapterText: {
      ru: 'Глава',
      am: 'Գլուխ',
      en: 'Chapter',
    },
    clearChaptersText: {
      ru: 'Очистить главы',
      am: 'Հեռացնել',
      en: 'Clear chapters',
    },
    boardEditorText: {
      ru: 'Редактор доски',
      am: 'Խաղատախտակի խմբագրում',
      en: 'Board editor',
    },
    editChessboardText: {
      ru: 'Редактировать шахматную доску',
      am: 'Խմբագրել շախմատի տախտակը',
      en: 'Edit Chessboard',
    },
    movePositionToOnlineLessonText: {
      ru: 'Перенести позицию в онлайн урок',
      am: 'Տեղափոխեք դիրքը առցանց դաս',
      en: 'Transfer a position to an online lesson',
    },
    moveText: {
      ru: 'Ход',
      am: 'Քայլ',
      en: 'Move',
    },
    whiteText: {
      ru: 'Белые',
      am: 'Սպիտակ',
      en: 'White',
    },
    randomColor: {
      ru: 'Случайный цвет',
      am: 'Պատահական գույն',
      en: 'Random color',
    },
    stopGame: {
      ru: 'Остановить игру',
      en: 'Stop the game',
      am: 'դադարեցնել խաղը'
    },
    evenPlayersText: {
      ru: 'Можно добавить или удалить тренера как игрока, чтобы количество учеников было нечетным и цвет фигур участников менялся во время каждого своего хода.',
      am: 'Հնարավոր է ավելացնել կամ հեռացնել մարզչին որպես խաղացող, որպեսզի աշակերտների թիվը տարօրինակ լինի, և մասնակիցների խաղաքարերի գույնը փոխվի իրենց յուրաքանչյուր քայլի ընթացքում:',
      en: "You can add or remove a coach as a player so that the number of students is odd and the color of the participants' pieces changes during each turn."
    },
    oddPlayersText: {
      ru: 'Выбрано нечетное количество участников, цвет фигур во время каждого своего хода будет меняться. Можно добавить или удалить тренера как игрока, чтобы количество участников было четным и цвет фигур участников во время каждого своего хода не менялся.',
      am: 'Ընտրված է մասնակիցների կենտ թիվը, յուրաքանչյուր քայլի ընթացքում ֆիգուրների գույնը կփոխվի։ Հնարավոր է ավելացնել կամ հեռացնել մարզչին որպես խաղացող, որպեսզի մասնակիցների թիվը հավասար լինի, և մասնակիցների խաղաքարերի գույնը չփոխվի իր յուրաքանչյուր քայլի ընթացքում:',
      en: "An odd number of participants have been selected, and the color of the pieces will change during each turn. You can add or remove a coach as a player so that the number of participants is even and the color of the participants' pieces does not change during each turn."
    },
    playAgainstEveryoneText: {
      ru: 'Играть против всех',
      am: 'Խաղալ բոլորի դեմ',
      en: 'Play against everyone'
    },
    recomendationsForTrainerText: {
      ru: 'Рекомендации для тренера',
      en: 'Recommendations for the trainer',
      am: 'Առաջարկություններ մարզչի համար'
    },
    startGameText: {
      ru: 'Начать игру',
      en: 'Start the game',
      am: 'Սկսել խաղը'
    },
    blackText: {
      ru: 'Черные',
      am: 'Սև',
      en: 'Black',
    },
    castlingText: {
      ru: 'Рокировка',
      am: 'Տեղափոխություն',
      en: 'Castling',
    },
    elementsText: {
      ru: 'Элементы',
      am: 'Տարրեր',
      en: 'Elements',
    },
    startingPositionText: {
      ru: 'Начальная позиция',
      am: 'Սկզբնական դիրք',
      en: 'Starting position',
    },
    clearBoardText: {
      ru: 'Очистить доску',
      am: 'Մաքրել տախտակը',
      en: 'Clear board',
    },
    flipBoardText: {
      ru: 'Перевернуть доску',
      am: 'Շրջել տախտակը',
      en: 'Flip board',
    },
    chatText: {
      ru: 'Чат',
      am: 'Զրուցարան',
      en: 'Chat',
    },
    turnOffMoveModeText: {
      ru: 'Выключить режим ходов',
      am: 'Անջատել քայլերի ռեժիմը',
      en: 'Turn off moves mode',
    },
    turnOnMoveModeText: {
      ru: 'Включить режим ходов',
      am: 'Միացնել քայլերի ռեժիմը',
      en: 'Turn on moves mode',
    },
    movesText: {
      ru: 'Ходы',
      am: 'Քայլեր',
      en: 'Moves',
    },
    finishLessonText: {
      ru: 'Закончить урок',
      am: 'Ավարտել դասը',
      en: 'Finish lesson',
    },
    lessonSuccessfullyFinishedText: {
      ru: 'Онлайн урок успешно окончен!',
      am: 'Օնլայն դասը հաջողությամբ ավարտվեց:',
      en: 'Online lesson successfully completed!',
    },
    sendHomeworkText: {
      ru: 'Отправить дз',
      am: 'Ուղարկել տնային աշխատանքը',
      en: 'Send homework',
    },
    lessonPositionsText: {
      ru: 'Позиции урока:',
      am: 'Դասի դիրքեր',
      en: 'Lesson positions:',
    },
    endTestLessonText: {
      ru: 'Домашние задания, которые вы планируете выполнить, во время первого урока проверит назначенный вам тренер.',
      en: 'The homework you plan to complete will be checked by the coach assigned to you during the first lesson.',
      am: 'Այս տնային աշխատանքները, որոնք դուք նախատեսում եք կատարել, կստուգի ձեզ նշանակված մարզիչը առաջին դասի ժամանակ:',
    },
    homeworkDeadlineText: {
      ru: 'Срок дз: (домашнее задание)',
      am: 'Տնային աշխատանքների վերջնաժամկետ.',
      en: 'Deadline of homework:',
    },
    autocheckText: {
      ru: 'Автопроверка',
      am: 'Ավտոմատ ստուգում',
      en: 'Autocheck',
    },
    addHomeworkFromProgramText: {
      ru: 'Добавить дз из программы',
      am: 'Ավելացնել տնային առաջադրանք ծրագրից',
      en: 'Add homework from the program',
    },
    endgameText: {
      ru: 'Эндшпиль',
      am: 'Վերջնախաղ',
      en: 'Endgame',
    },
    middleGameText: {
      ru: 'Миттельшпиль',
      am: 'Միջնախաղ',
      en: 'Middlegame',
    },
    strategyText: {
      ru: 'Стратегия',
      am: 'Ստրատեգիա',
      en: 'Strategy',
    },
    oppeningText: {
      ru: 'Дебют',
      am: 'Սկզբնախաղ',
      en: 'Opening',
    },
    tacticsText: {
      ru: 'Тактика',
      am: 'Մարտավարություն',
      en: 'Tactics',
    },
    resetFiltersText: {
      ru: 'Сбросить фильтр',
      am: 'Վերականգնել զտիչը',
      en: 'Reset filter',
    },
    selectAllTasksOnClossingText: {
      ru: 'Выделять все задачи при выборе темы',
      am: 'Ընտրել բոլոր առաջադրանքները թեմա ընտրելիս',
      en: 'Select all tasks when choosing a topic',
    },
    selectAllTasksText: {
      ru: 'Выделить все задачи',
      am: 'Ընտրել բոլոր առաջադրանքները',
      en: 'Select all tasks',
    },
    removeSelectionText: {
      ru: 'Снять выделение',
      am: 'Հեռացնել ընտրությունը',
      en: 'Remove selection',
    },
    goBackToHomeworksText: {
      ru: 'Перейти обратно в раздел дз',
      am: 'Վերադառնալ տնային աշխատանքների բաժին ',
      en: 'Go back to section homework',
    },
    homeworkSentText: {
      ru: 'Дз отправлено',
      am: 'Տնային առաջադրանքն ուղարկված է',
      en: 'Homework sent',
    },
    returnToGroupText: {
      ru: 'Вернутся в группу',
      am: 'Վերադառնալ դեպի խումբ',
      en: 'Return to the group',
    },
    clearStudentOptionsText: {
      ru: 'Очистить варианты учеников ',
      am: 'Մաքրել ուսանողների ընտրանքները',
      en: 'Clear student options',
    },
    closeLessonText: {
      ru: 'Закрыть онлайн-урок',
      am: 'Փակել օնլայն դասը',
      en: 'Close online lesson',
    },
    sureCloseLessonText: {
      ru: 'Вы уверены, что хотите закрыть онлайн-урок?',
      am: 'Վստա՞հ եք, որ ցանկանում եք փակել օնլայն դասը',
      en: 'Are you sure you want to close online lesson?',
    },

    goToHomeText: {
      ru: 'Перейти на главную страницу',
      am: 'Վերադառնալ գլխավոր էջ',
      en: 'Go to home page',
    },
    firstPermission: {
      ru: [
        'Нет разрешения на запись экрана!',
        'Зайти снова в урок и включить запись',
        'Отменить урок и перейти на главную страницу',
      ],
      am: [
        'Էկրանի ձայնագրման թույլտվություն չկա:',
        'Կրկին անցեք դասին և միացրեք ձայնագրությունը',
        'Չեղարկել դասը և անցնել Գլխավոր էջ',
      ],
      en: [
        'No screen recording permission! ',
        'Go back into the lesson and turn on the recording',
        'Cancel lesson and go to home page',
      ],
    },
    permissionGetBack: {
      ru: [
        'Запись урока был приостановлена из за того, что вы нажали на закрыть доступ',
        'Зайти снова в урок и продолжить',
        'Закончить урок и перейти на главную страницу',
      ],
      am: [
        'Դասի ձայնագրությունը դադարեցվել է, քանի որ Սեղմել եք փակել մուտքը',
        'Կրկին մտեք դասի մեջ և շարունակեք',
        'Ավարտեք դասը և անցեք Գլխավոր էջ',
      ],
      en: [
        'The recording of the lesson was suspended because you clicked on close access',
        'Get back into the lesson and continue',
        'Finish the lesson and go to the home page',
      ],
    },
  },
  homework: {
    lessonDateText: {
      ru: 'Дата урока:',
      am: 'Դասի ամսաթիվը`',
      en: 'Lesson date:',
    },
    deadlineText: {
      ru: 'Срок до:',
      am: 'Վերջնաժամկետը մինչև`',
      en: 'Deadline until:',
    },
    performTaskText: {
      ru: 'Выполнить задание',
      am: 'Կատարել առաջադրանքը',
      en: 'Perform a task',
    },
    chapterText: {
      ru: 'Глава',
      am: 'Գլուխ',
      en: 'Chapter',
    },
    taskText: {
      ru: 'Задача',
      am: 'Առաջադրանք',
      en: 'Task',
    },
    sendHomeworkForCheckingText: {
      ru: 'Отправить дз на проверку',
      am: 'Ուղարկել տնային աշխատանքը ստուգման',
      en: 'Send homework for checking',
    },
    sendHomeworkForCheckingShortText: {
      ru: 'Отправить дз на проверку',
      am: 'Ուղարկել ՏԱ֊ն ստուգման',
      en: 'Send homework for checking',
    },
    movesText: {
      ru: 'Ходы',
      am: 'Քայլեր',
      en: 'Moves',
    },
    haveYouSolvedText: {
      ru: 'Ты решил все задачи? \n' + 'Проверил и перепроверил свои ответы?',
      am:
        'Դուք լուծե՞լ եք բոլոր խնդիրները։\n' +
        'Ստուգե՞լ և կրկնակի ստուգե՞լ եք ձեր պատասխանները:',
      en:
        'Have you solved all the tasks?\n' +
        'Have you checked and double-checked your answers?',
    },
    returnToTasksText: {
      ru: 'Отмена, вернуться к заданиям',
      am: 'Չեղարկել, վերադառնալ առաջադրանքներին',
      en: 'Cancel, return to tasks',
    },
    sendAnswersToCheckingText: {
      ru: 'Да, отправить ответы на проверку',
      am: 'Այո, ուղարկել պատասխանները ստուգման',
      en: 'Yes, send answers for checking',
    },
    successText: {
      ru: 'Успех!',
      am: 'Հաջողված!',
      en: 'Success!',
    },
    homeworkSuccessfullySentText: {
      ru: 'Дз успешно отправленно на проверку',
      am: 'Տնային առաջադրանքը հաջողությամբ ուղարկվել է ստուգման',
      en: 'Homework successfully sent for checking',
    },
    returnMainPageText: {
      ru: 'Вернуться на главную',
      am: 'Վերադառնալ գլխավոր էջ',
      en: 'Go back to the main page',
    },
    goToChatText: {
      ru: 'Перейти в чат',
      am: 'Գնալ Զրուցարան',
      en: 'Go to the chat',
    },
    studentComplatedHomeworkText: {
      ru: 'Ученик выполнил домашнее задание',
      am: 'Աշակերտը կատարել է իր տնային աշխատանքը',
      en: 'The student completed his/her homework',
    },
    whoseMoveText: {
      ru: 'Чей ход?',
      am: 'Ո՞ւմ քայլն է:',
      en: 'Whose move is it?',
    },
    aboutBlackMoveText: {
      ru: 'Это значит ход черных',
      am: 'Սա նշանակում է սևերի քայլ',
      en: "This means Black's move",
    },
    aboutWhiteMoveText: {
      ru: 'Это значит ход белых',
      am: 'Սա նշանակում է սպիտակների քայլ',
      en: "This means White's move",
    },
  },
  videoLessons: {
    didYouMissLessonText: {
      ru: 'Вы пропустили урок и тут не нашли запись урока?',
      am: 'Դուք բաց եք թողե՞լ դասը և չեք կարողանում գտնել դասի ձայնագրությունը այստեղ:',
      en: "Did you miss a lesson and can't find the lesson recording here?",
    },
    forCancellLessonText: {
      ru: ['Чтобы аннулировать списание за урок, напишите', 'администратору'],
      am: ['Դասի վճարը չեղարկելու համար գրեք', 'ադմինիստրատորին'],
      en: ['To cancel a lesson charge, write to the', 'administrator'],
    },
    weMissedLessonText: {
      ru:
        'Здравствуйте, мы пропустили урок и с нас списали денежные средства, но видеозаписи урока нет в разделе видеоуроки.\n' +
        'Добавьте, пожалуйста, видеозапись или аннулируйте списание.',
      am:
        'Բարև Ձեզ, մենք բաց ենք թողել դասը և մեզանից գումար են գանձել, բայց դասի տեսանյութը տեսադասերի բաժնում չկա։\n' +
        'Խնդրում ենք ավելացնել տեսագրություն կամ չեղարկել դուրսգրումը:',
      en:
        'Hello, we missed the lesson and were charged money, but the video of the lesson is not in the video lessons section.\n' +
        'Please add a video recording or cancel the write-off.',
    },
    copyText: {
      ru: 'Копировать текст',
      am: 'Պատճենել տեքստը',
      en: 'Copy text',
    },
    copiedText: {
      ru: 'Скопировано',
      am: 'Պատճենված է',
      en: 'Copied',
    },
    eduMaterialText: {
      ru: 'Обучающий материал',
      am: 'Ուսումնական նյութ',
      en: 'Educational material',
    },
    classText: {
      ru: 'Занятие',
      am: 'Դաս',
      en: 'Class',
    },
    addVideoText: {
      ru: 'Добавить видеозапись',
      am: 'Ավելացնել տեսանյութ',
      en: 'Add video',
    },
  },
  requisites: {
    checkYourAccountText: {
      ru: 'Проверить счет и все списания в личном кабинете СРМ системы',
      am: 'Ստուգեք ձեր հաշիվը և ձեր անձնական հաշվի բոլոր դուրսգրումները CRM համակարգում',
      en: 'Check your account and all debits in your personal account in the CRM system',
    },

    sureDeleteGroupText: {
      ru: 'Вы уверены, что хотите Удалить Реквизит?',
      am: 'Վստա՞հ եք, որ ցանկանում եք Ջնջել Րեկոիզիտը:',
      en: 'Are you sure you want to Delete the Requisite?',
    },
    requisiteDeletedSuccessfullyText: {
      ru: 'Реквизит успешно удален',
      am: 'Րեկվիզիիտը հաջողությոամբ ջնջվել է',
      en: 'Requisite deleted successfully',
    },
    openChatText: {
      ru: 'Открыть чат',
      am: 'Բացել զրուցարանը',
      en: 'Open chat',
    },
    text: {
      ru: 'Текст',
      am: 'Տեքստ',
      en: 'Text'
    },
    subtext: {
      ru: 'Подтекст',
      am: 'Ենթատեքստ',
      en: 'Subtext'
    },
    disclosureElementsText: {
      ru: 'Разворачиваемые элементы:',
      am: 'Ընդլայնվող տարրեր.',
      en: 'Disclosure elements:'
    },
    addDisclosureElementText: {
      ru: 'Добавить разворачиваемый элемент',
      am: 'Ավելացնել ընդարձակվող տարր',
      en: 'Add disclosure element'
    },
    copyBtnText: {
      ru: (
        <>
          Копировать готовый текст рекомендации <br />
          для рассылки друзьям
        </>
      ),
      am: (
        <>
          Copy անել առաջարկության պատրաստի տեքստը <br />
          ընկերներին ուղարկելու համար
        </>
      ),
      en: (
        <>
          Copy the recommendation text <br />
          to send to friends
        </>
      ),
    },
    paymentDiscountsText: {
      ru: 'Постоянные скидки',
      am: 'Մշտական զեղչեր',
      en: 'Permanent discounts',
    },
    paymentDiscount1Text: {
      ru: '1. Оплата за 6 месяцев - скидка 10%',
      am: '1. 6 ամսվա վճարում – 10% զեղչ',
      en: '1. Payment for 6 months - 10% discount',
    },
    paymentDiscount2Text: {
      ru: '2. Оплата за 12 месяцев - скидка 15%',
      am: '2. 12 ամսվա վճարում – 15% զեղչ',
      en: '2. Payment for 12 months - 15% discount',
    },
    editRequisiteText: {
      ru: 'Редактировать реквизит',
      am: 'Խմբագրել րեկվիզիտը',
      en: 'Edit requisite',
    },
    allLangsMustFilledText: {
      ru: 'Все языки должны быть заполнены',
      am: 'Բոլոր լեզուները պետք է լրացվեն',
      en: 'All languages ​​must be filled in'
    },
    allDisclosuresMustFilledText: {
      ru: 'Все поля и языки разворачиваемых элементов должны быть заполнены',
      am: 'Ընդլայնված տարրերի բոլոր դաշտերը և լեզուները պետք է լրացվեն',
      en: 'All fields and languages ​​of disclosure elements must be filled in',
    },
    linkMustFilledText: {
      ru: 'Поле "Ссылка" должно быть заполнено',
      am: '«Հղում» դաշտը պետք է լրացվի',
      en: 'The "Link" field must be filled in'
    },
    addRequisiteText: {
      ru: 'Добавить реквизит',
      am: 'Ավելացնել րեկվիզիտ',
      en: 'Add requisite',
    },
    cardOwnerEnText: {
      ru: 'Имя владельца карты на английском языке',
      am: 'Քարտատիրոջ անունը անգլերեն',
      en: 'Cardholder name in English',
    },
    cardOwnerRuText: {
      ru: 'Имя владельца карты на русском',
      am: 'Քարտատիրոջ անունը ռուսերեն',
      en: "Cardholder's name in Russian",
    },
    cardNumberText: {
      ru: 'Номер карты',
      am: 'Քարտի համարը',
      en: 'Card number',
    },
    linkTitleText: {
      ru: 'Заголовок ссылки',
      am: 'Հղման վերնագիր',
      en: 'Link title',
    },
    linkText: {
      ru: 'Cсылка',
      am: 'Հղում',
      en: 'Link',
    },
    confirmText: {
      ru: 'Да, Подтвердить',
      am: 'Այո, Հաստատել',
      en: 'Yes, Confirm',
    },
    cancelText: {
      ru: 'Отмена',
      am: 'Չեղարկել',
      en: 'Cancel',
    },
    requestUpdateRejectText: {
      ru: 'Здравствуйте, мы отправили запрос, чтобы обновить реквизиты, но нам отказали. Скажите, пожалуйста, в чем проблема.',
      am: 'Բարև Ձեզ, մենք հարցում ենք ուղարկել՝ թարմացնելու մեր ռեկվիզիտները, սակայն մերժվել է։ Խնդրում եմ, ասեք, թե որն է խնդիրը:',
      en: 'Hello, we sent a request to update our requisites, but we were refused. Please tell me what the problem is.',
    },
    requisitesNotUpdatedText: {
      ru: 'Реквизиты НЕ обновлены. Напишите, пожалуйста, администратору школы, чтобы уточнить детали.\n',
      am: 'Ռեկվիզիտները ՉԵՆ թարմացվել: Մանրամասների համար խնդրում ենք գրել դպրոցի ադմինիստրատորին։',
      en: 'Requisites have NOT been updated. Please write to the school administrator for more details.',
    },
    requisitesUpdatedText: {
      ru: 'Реквизиты обновлены',
      am: 'Ռեկվիզիտները թարմացվել են',
      en: 'Requisites updated',
    },
    yourRequestSentText: {
      ru: 'Ваш запрос отправлен, максимум в течение 2 дней в разделе реквизиты появятся новые реквизиты и вы получите уведомление в чате на платформе.',
      am: 'Ձեր հարցումն ուղարկվել է, առավելագույնը 2 օրվա ընթացքում ռեկվիզիտների բաժնում նոր ռեկվիզիտներ կհայտնվեն, և դուք ծանուցում կստանաք հարթակի չաթում։',
      en: 'Your request has been sent, within a maximum of 2 days new requisites will appear in the requisites section and you will receive a notification in the chat on the platform.',
    },
    ifDontAppearText: {
      ru: [
        'Если не появятся или вам нужны реквизиты прямо сейчас, напишите на',
        'WhatsApp',
        ' администратору',
      ],
      am: [
        'Եթե դրանք չհայտնվեն կամ ձեզ պետք են ռեկվիզիտները հենց հիմա, գրեք ադմինիստրատորին',
        'WhatsApp',
        '-ում',
      ],
      en: [
        'If they don’t appear or you need requisites right now, write to the administrator on',
        'WhatsApp',
        '',
      ],
    },
    paymentDiscount3Text: {
      ru: '3. За приведенного друга - скидка 50%',
      am: '3. Յուրաքանչյուր 1 ընկեր հրավիրելու համար – 50% զեղչ',
      en: '3. For inviting a friend - 50% discount',
    },
    writeToAdminIfText: {
      ru: 'Отправьте запрос администратору, если вам нужны другие реквизиты:',
      am: 'Ուղարկեք խնդրանք ադմինիստրատորին, եթե ձեզ պետք են ուրիշ ռեկվիզիտներ։',
      en: 'Send a request to the administrator if you need other requisites:',
    },
    weNeedText: {
      ru: 'Нам нужны',
      am: 'Մեզ անհրաժեշտ են',
      en: 'We need',
    },
    youSendRequestFor: {
      ru: 'Вы отправляете запрос, чтобы вам прикрепили',
      am: 'Դուք հարցում եք ուղարկում, որպիսի ձեզ կցեն',
      en: 'You send a request to have it attached to you',
    },
    armenianRequisitesText: {
      ru: 'армянские реквизиты в валюте Евро.',
      am: 'հայկական ռրեկվիսիտներ եվրո արժույթով։',
      en: 'Armenian requisites in Euro currency.',
    },
    tinkoffRequestsText: {
      ru: 'реквизиты в Рублях с платежной системой Тинькофф',
      am: 'ռեկվիզիտներ ռուբլով Tinkoff վճարային համակարգով',
      en: 'requisites in Rubles with the Tinkoff payment system',
    },
    sberRequestsText: {
      ru: 'реквизиты в Рублях с платежной системой Сбербанк',
      am: 'ռեկվիզիտներ ռուբլով Sberbank վճարային համակարգով',
      en: 'requisites in Rubles with the Sberbank payment system',
    },
    sendRequestText: {
      ru: 'Отправить запрос',
      am: 'Ուղարկել հարցում',
      en: 'Send request',
    },
    basicSubscribtionsText: {
      ru: ['После оплаты отправьте, пожалуйста чек', 'администратору', '.'],
      am: [
        'Վճարումից հետո խնդրում ենք կտրոնը ուղարկել',
        'ադմինիստրատորին',
        ':',
      ],
      en: ['After payment please send a check to the', 'administrator', '.'],
    },
    allSubscribtionsText: {
      ru: 'Все абонементы на официальном сайте',
      am: 'Բոլոր բաժանորդագրությունները պաշտոնական կայքում',
      en: 'All subscriptions on the official website',
    },
    advicesForParentsText: {
      ru: 'Советы родителям',
      am: 'Խորհուրդներ ծնողներին',
      en: 'Adviсes for parents',
    },
    advicesForTrainersText: {
      ru: 'Советы тренерам',
      am: 'Խորհուրդներ մարզիչներին',
      en: 'Adviсes for trainers',
    },
    requisitesText: {
      ru: 'Реквизиты',
      am: 'Ռեկվիզիտներ',
      en: 'Requisites',
    },
    copyText: {
      ru: 'Копировать',
      am: 'Պատճենել',
      en: 'Copy',
    },
    copiedText: {
      ru: 'Скопировано',
      am: 'Պատճենված է',
      en: 'Copied',
    },
    transferSberBankText: {
      ru: 'Перевод в рублях Сбербанк Россия',
      am: 'Փոխանցել ռուբլով Սբերբանկ Ռուսաստան',
      en: 'Transfer in rubles Sberbank Russia',
    },
    transferTinkoffText: {
      ru: 'Перевод в рублях Тинькофф банк Россия',
      am: 'Փոխանցել ռուբլով Տինկոֆֆ բանկ Ռուսաստան',
      en: 'Transfer in rubles Tinkoff Bank Russia',
    },
    transferIdBankEuroText: {
      ru: 'Перевод в евро ID bank Armenia (Виза карта)',
      am: 'Փոխանցել եվրոյով ID բանկ Հայաստան (Վիզա քարտ)',
      en: 'Transfer in euro ID bank Armenia (Visa card)',
    },
    transferIdBankDollarsText: {
      ru: 'Перевод в долларах ID банк Армения (Виза карта)',
      am: 'Փոխանցել դոլարով ID բանկ Հայաստան (Վիզա քարտ)',
      en: 'Transfer in dollars ID bank Armenia (Visa card)',
    },
    cardTypeText: {
      ru: 'Тип карты:',
      am: 'Քարտի տեսակը:',
      en: 'Card type:',
    },
    validThruText: {
      ru: 'Срок карты:',
      am: 'Վավեր է մինչև։',
      en: 'Valid thru:',
    },
    accountNumberText: {
      ru: 'Номер счета:',
      am: 'Հաշվեհամար:',
      en: 'Account number:',
    },
    bicText: {
      ru: 'Бик:',
      am: 'Բիկ։',
      en: 'Bic:',
    },
    transferByLinkText: {
      ru: 'Можно сделать перевод по ссылке:',
      am: 'Փոխանցում կարող եք կատարել՝ օգտագործելով հղումը.',
      en: 'You can make a transfer using the link:',
    },
    transferByCardText: {
      ru: 'Перевод по номеру карты',
      am: 'Փոխանցում քարտի համարով',
      en: 'Transfer by card number',
    },
    importantText: {
      ru: 'ВАЖНО! Ваши переводы не проходят конвертации. Подробнее...',
      am: 'ԿԱՐԵՎՈՐ! Ձեր փոխանցումները չեն փոխակերպվում: Կարդալ ավելին...',
      en: 'IMPORTANT! Your transfers are not being converted. Read more...',
    },
    transferInRublesText: {
      ru: 'Если вы делаете перевод в рублях по реквизитам рубли, в CRM-системе в личном кабинете вы увидите счет в рублях.',
      am: 'Եթե փոխանցում եք կատարում ռուբլով՝ օգտագործելով ռուբլու ռեկվիզիտները, ապա CRM համակարգում ձեր անձնական հաշվում հաշիվը կտեսնեք ռուբլով:',
      en: 'If you make a transfer in rubles using ruble requisites, you will see an invoice in rubles in the CRM system in your personal account.',
    },
    transferInEuroText: {
      ru: 'Если вы делаете перевод в евро по реквизитам евро, в CRM в личном кабинете вы увидите счет в рублях, НО ВАША ОПЛАТА НИКАКИЕ КОНВЕРТАЦИИ НЕ ПРОХОДИТ.',
      am: 'Եթե  փոխանցում եք կատարում եվրոյով՝ օգտագործելով եվրոյի ռեկվիզիտները, ապա CRM համակարգում ձեր անձնական հաշվում հաշիվը կտեսնեք ռուբլով, ԲԱՅՑ ՁԵՐ ՎՃԱՐՈՒՄԸ ՓՈԽԱԿԵՐՊՄԱՆ ՉԻ ԵՆԹԱՐԿՎԻ',
      en: 'If you make a transfer in euros using euro requisites, in the CRM in your personal account you will see an invoice in rubles, BUT YOUR PAYMENT WILL NOT MAKE ANY CONVERSION.',
    },

    transferExampleText: {
      ru: 'Например, если вы оплатили 45 евро за 8 занятий, то на ваш счёт в личном кабинете будут зачислены 8 занятий, но 4500 рублей, независимо от курса евро. В CRM-системе оплата ведётся только в рублях.',
      am: 'Օրինակ, եթե 8 դասի համար վճարել եք 45 եվրո, ապա ձեր անձնական հաշվի վրա կգրանցվի 8 դաս, բայց 4500 ռուբլի՝ անկախ եվրոյի փոխարժեքից։ CRM համակարգում վճարումները կատարվում են միայն ռուբլով:',
      en: 'For example, if you paid 45 euros for 8 lessons, then 8 lessons will be credited to your account in your personal account, but 4500 rubles, regardless of the euro exchange rate. In the CRM system, payments are made only in rubles.',
    },
  },
  schoolProgram: {
    addThemeText: {
      ru: 'Добавить Тему',
      am: 'Ավելացնել Թեմա',
      en: 'Add topic',
    },
    addMaterialText: {
      ru: 'Добавить материал',
      am: 'Ավելացնել նյութ',
      en: 'Add material',
    },
  },
  testLesson: {
    copyLinkText: {
      ru: 'Скопировать ссылку',
      am: 'Պատճենել հղումը',
      en: 'Copy link',
    },
    addCommentText: {
      ru: 'Добавить комментарий',
      am: 'Ավելացնել մեկնաբանություն',
      en: 'Add comment',
    },
    inputCommentText: {
      ru: 'Введите ваш комментарий...',
      am: 'Մուտքագրեք ձեր մեկնաբանությունը...',
      en: 'Enter your comment...',
    },
    commentAddedText: {
      ru: 'Комментарий успешно добавлен!',
      am: 'Մեկնաբանությունը հաջողությամբ ավելացվել է!',
      en: 'Comment successfully added!',
    },
    saveText: {
      ru: 'Сохранить',
      am: 'Պահպանել',
      en: 'Save',
    },
    cancelText: {
      ru: 'Отмена',
      am: 'Չեղարկել',
      en: 'Cancel',
    },
    selectStudentsText: {
      ru: 'Выберите учеников',
      am: 'Ընտրեք աշակերտներին',
      en: 'Select students',
    },
    mergeStudentText: {
      ru: 'Объединение ученика',
      am: 'Ավելացնել ուսումականացություն',
      en: 'Merge student',
    },
    mergeWithText: {
      ru: 'Объединить с',
      am: 'Ավելացնել հղումը',
      en: 'Merge with'
    },
    mergeText: {
      ru: 'Объединить',
      am: 'Միացնել',
      en: 'Merge'
    },
    searchUserText: {
      ru: 'Поиск ученика...',
      am: 'Ուսանողի որոնում...',
      en: 'Search for a student...',
    },
    commentsText: {
      ru: 'Комментарии',
      am: 'մեկնաբանություններ',
      en: 'Comments',
    },
    unMergeText: {
      ru: 'Разъединить',
      am: 'Միացնել',
      en: 'Unmerge',
    },
    testStudentText: {
      ru: 'ТЕСТОВЫЙ УЧЕНИК',
      am: 'ՏԵՍՏԱՅԻՆ ԱՇԱԿԵՐՏ',
      en: 'TEST STUDENT',
    },
    sureUnMergeText: {
      ru: 'Вы уверены, что хотите разъединить ученика?',
      am: 'Դուք համոզված եք, որ ցանկանում եք աշակերտին միացնել?',
      en: 'Are you sure you want to unmerge the student?'
    },
    editUserNameText: {
      ru: 'Изменить имя пользователя',
      am: 'Խմբագրել օգտատերի անունը',
      en: 'Edit user name',
    },
    userNameAlreadyExistsText: {
      ru: 'Пользователь с таким именем уже существует',
      am: 'Այս անունով օգտատերը արդեն գոյություն ունի',
      en: 'A user with this name already exists',
    }
  },
  waitGroup: {
    listText: {
      ru: 'Список',
      am: 'Ցուցակ',
      en: 'List',
    },
    archiveText: {
      ru: 'Архив',
      am: 'Արխիվ',
      en: 'Archive',
    },
    assignGroupText: {
      ru: 'Назначить группу',
      am: 'Նշանակել խումբ',
      en: 'Assign a group',
    },

    enterGroupNameText: {
      ru: 'Введите имя группы',
      am: 'Մուտքագրեք խմբի անունը',
      en: 'Enter the name of the group',
    },
    suggestText: {
      ru: 'Предложенные:',
      am: 'Առաջարկվում են',
      en: 'Suggested:',
    },
    groupNameText: {
      ru: 'Имя группы',
      am: 'Խմբի անվանումը',
      en: 'Group name',
    },
    addUserText: {
      ru: 'Добавить пользователя',
      am: 'Ավելացնել օգտատեր',
      en: 'Add user',
    },
    actionText: {
      ru: 'Действие',
      am: 'Գործողություն',
      en: 'Action',
    },
    executorText: {
      ru: 'Исполнитель',
      am: 'Կատարող',
      en: 'Executor',
    },
    targetText: {
      ru: 'Цель',
      am: 'Թիրախ',
      en: 'Target',
    },
    dateText: {
      ru: 'Дата',
      am: 'Ամսաթիվը',
      en: 'Date',
    },
    addingUserText: {
      ru: 'Добавление пользователя',
      am: 'Ավելացնել օգտատեր',
      en: 'Add user',
    },
  },
  profile: {
    languageText: {
      am: 'Լեզու',
      ru: 'Язык',
      en: 'Language',
    },
    actualMailText: {
      ru: 'Актуальный mail или gmail',
      am: 'Ակտուալ mail կամ gmail',
      en: 'Actual mail or gmail',
    },
    beforeUsePlatformText: {
      am: 'Նախքան հարթակն օգտագործելը, լրացրեք ձեր պրոֆիլը:',
      ru: 'Перед использование платформы заполните свой профиль!',
      en: 'Before using the platform, fill out your profile!',
    },
    fieldMustUpdateText: {
      am: 'Դաշտը պետք է թարմացվի',
      ru: 'Поле должно быть обновлено',
      en: 'The field must be updated',
    },
    fieldMustFilledText: {
      am: 'Դաշտը պետք է լրացվի',
      ru: 'Поле должно быть заполнено',
      en: 'The field must be filled',
    },
    invalidMailText: {
      am: 'Սխալ Էլ. փոստ',
      ru: 'Неверный Эл. почта',
      en: 'Invalid email',
    },
    iTrainerText: {
      am: 'Ես մարզիչ եմ',
      ru: 'Я тренер',
      en: 'I am a trainer',
    },
    iStudentText: {
      am: 'Ես աշակերտ եմ',
      ru: 'Я ученик',
      en: 'I am a student',
    },
    emailText: {
      ru: 'Электронная почта',
      am: 'Էլ. փոստ',
      en: 'Email',
    },
    armenianText: {
      am: 'Հայերեն',
      ru: 'Армянский',
      en: 'Armenian',
    },
    notFilledText: {
      am: 'Լրացված չէ',
      ru: 'Не заполнено',
      en: 'Not filled',
    },
    russianText: {
      am: 'Ռուսերեն',
      ru: 'Русский',
      en: 'Russian',
    },
    englishText: {
      am: 'Անգլերեն',
      ru: 'Английский',
      en: 'English',
    },
    frenchText: {
      am: 'Ֆրանսերեն',
      ru: 'Французский',
      en: 'French',
    },
    germanText: {
      am: 'Գերմաներեն',
      ru: 'Немецкий',
      en: 'German',
    },
    hindiText: {
      am: 'Հինդի',
      ru: 'Хинди',
      en: 'Hindi',
    },
    spanishText: {
      am: 'Իսպաներեն',
      ru: 'Испанский',
      en: 'Spanish',
    },
    itaianText: {
      am: 'Իտալերեն',
      ru: 'Итальянский',
      en: 'Italian',
    },
    otherLanguagesText: {
      am: 'ԱՅԼ',
      ru: 'ДРУГОЕ',
      en: 'OTHER',
    },
    monDayText: {
      am: 'Երկ',
      ru: 'Пн',
      en: 'Mon',
    },
    tueDayText: {
      am: 'Երք',
      ru: 'Вт',
      en: 'Tue',
    },
    wedDayText: {
      am: 'Չրք',
      ru: 'Ср',
      en: 'Wed',
    },
    thuDayText: {
      am: 'Հնգ',
      ru: 'Чт',
      en: 'Thu',
    },
    friDayText: {
      am: 'Ուր',
      ru: 'Пт',
      en: 'Fri',
    },
    satDayText: {
      am: 'Շբթ',
      ru: 'Сб',
      en: 'Sat',
    },
    sunDayText: {
      am: 'Կիր',
      ru: 'Вс',
      en: 'Sun',
    },
    adminInfoText: {
      ru: 'Данную информацию редактирует администрация школы, если что-то не правильно пишите администратору.',
      am: 'Այս տեղեկատվությունը խմբագրվում է դպրոցի տնօրինության կողմից, եթե ինչ-որ բան սխալ է, գրեք ադմինիստրատորին:',
      en: 'This information is edited by the school administration; if something is incorrect, write to the administrator.',
    },
    readyForSimulationsText: {
      ru: 'Готов к сеансу',
      am: 'Պատրաստ է սեանսին',
      en: 'Ready for the simuls',
    },
    yesText: {
      ru: 'Да',
      am: 'Այո',
      en: 'Yes',
    },
    noText: {
      ru: 'Нет',
      am: 'Ոչ',
      en: 'No',
    },
    detailsText: {
      ru: 'Подробнее',
      am: 'Մանրամասն',
      en: 'More details',
    },
    onlineTournamentsText: {
      ru: 'Онлайн турниры',
      am: 'Օնլայն մրցաշարեր',
      en: 'Online tournaments',
    },
    offlineTournamentsText: {
      ru: 'Офлайн турниры',
      am: 'Օֆլայն մրցաշարեր',
      en: 'Offline tournaments',
    },
    teacherText: {
      ru: 'Педагог',
      am: 'Ուսուցիչ',
      en: 'Teacher',
    },
    itemText: {
      ru: 'Предмет',
      am: 'Առարկա',
      en: 'Item',
    },
    groupsText: {
      ru: 'Группы',
      am: 'Խմբեր',
      en: 'Groups',
    },
    countryText: {
      ru: 'Страна',
      am: 'Երկիր',
      en: 'Country',
    },
    russiaText: {
      ru: 'Россия',
      am: 'Ռուսաստան',
      en: 'Russia',
    },
    europeText: {
      ru: 'Европа',
      am: 'Եվրոպա',
      en: 'Europe',
    },
    americaText: {
      ru: 'Америка',
      am: 'Ամերիկա',
      en: 'America',
    },
    canadaText: {
      ru: 'Канада',
      am: 'Կանադա',
      en: 'Canada',
    },
    armeniaText: {
      ru: 'Армения',
      am: 'Հայաստան',
      en: 'Armenia',
    },
    changePassText: {
      ru: 'Сменить пароль',
      am: 'Փոխել գաղտնաբառը',
      en: 'Change password',
    },
    changeText: {
      ru: 'Сменить',
      am: 'Փոխել',
      en: 'Change',
    },
    formatText: {
      ru: 'Формат',
      am: 'Ձևաչափ',
      en: 'Format',
    },
    groupText: {
      ru: 'Группа',
      am: 'Խումբ',
      en: 'Group',
    },
    individualText: {
      ru: 'Индивидуально',
      am: 'Անհատական',
      en: 'Individual',
    },
    groupPlusIndividualText: {
      ru: 'Группа+Индивидуально',
      am: 'Խումբ+Անհատական',
      en: 'Group+Individual',
    },
    lessonDurationText: {
      ru: 'Длительность урока',
      am: 'Դասի տևողությունը',
      en: 'Lesson duration',
    },
    logoutText: {
      ru: 'Выйти из аккаунта',
      am: 'Դուրս գալ պլատֆորմայից',
      en: 'Log out of your account',
    },
    saveText: {
      ru: 'Сохранить',
      am: 'Պահպանել',
      en: 'Save',
    },
    nameText: {
      ru: 'Имя',
      am: 'Անուն',
      en: 'Name',
    },
    sеcondNameText: {
      ru: 'Фамилия',
      am: 'Ազգանուն',
      en: 'Second Name',
    },
    surNameText: {
      ru: 'Отчество',
      am: 'Հայրանուն',
      en: 'Surname',
    },
    editText: {
      ru: 'Редактировать',
      am: 'Խմբագրել',
      en: 'Edit',
    },
    levelText: {
      ru: 'уровень',
      am: 'մակարդակ',
      en: 'level',
    },
    passwordText: {
      ru: 'Пароль',
      am: 'Գաղտնաբառը',
      en: 'Password',
    },
    autoText: {
      ru: 'Авто',
      am: 'ավտոմատ',
      en: 'auto',
    },
    deleteAccountText: {
      ru: 'Удалить аккаунт',
      am: 'Ջնջել հաշիվը',
      en: 'Delete account',
    },
    readyForSimulationsModalTitle: {
      ru: 'Готов к сеансам.',
      am: 'Պատրաստ է սեանսներին։',
      en: 'Ready for the simul.',
    },
    onlineTournamentsModalTitle: {
      ru: 'Готов к ОНЛАЙН турнирам.',
      am: 'Պատրաստ է ՕՆԼԱՅՆ մրցաշարերին:',
      en: 'Ready for ONLINE tournaments.',
    },
    offlineTournamentsModalTitle: {
      ru: 'Готов к ОФЛАЙН турнирам.',
      am: 'Պատրաստ է ՕՖԼԱՅՆ մրցաշարերին:',
      en: 'Ready for OFFLINE tournaments.',
    },
    levelsModalTitle: {
      ru: 'Уровень.',
      am: 'Մակարդակ:',
      en: 'Level.',
    },
    readyForSimulationsDescriptionText: {
      ru: (
        <>
          <span>
            * Сеанс одновременной игры — это массовое шахматное мероприятие, где
            сильный шахматист (гроссмейстер, международный мастер, фиде мастер и
            т. д.) играет одновременно против большого числа шахматистов.
          </span>
          <br />
          <span>
            * В нашей школе существует система оценки, которая определяет
            готовность ученика к участию в сеансе. Готовность к сеансу всегда
            определяется тренером. Срок подготовки ученика тренером составляет
            примерно 12 месяцев, однако готовность каждого ученика
            рассматривается индивидуально.
          </span>
          <br />
          <span>
            * С самого начала обучения ученику предоставляется определенное
            количество и формат игр, которые он должен сыграть. После этого
            тренер отправляет запрос о готовности ученика к участию в сеансах, а
            руководство школы подтверждает данный запрос и добавляет ученика в
            определенный чат, где он начинает получать ссылки на сеансы.
          </span>
        </>
      ),
      am: (
        <>
          <span>
            * Միաժամանակյա խաղաշարը (սեանսը) խոշոր շախմատային իրադարձություն է,
            որտեղ ուժեղ շախմատիստը (գրոսմայստեր, միջազգային վարպետ, ֆիդեի վարպետ
            և այլն) միաժամանակ խաղում է մեծ թվով շախմատիստների դեմ:
          </span>
          <br />
          <span>
            * Մեր դպրոցում գոյություն ունի գնահատման համակարգ, որը որոշում է
            աշակերտի՝ սեանսներին մասնակցելու պատրաստվածության աստիճանը: Սեանսին
            պարաստվածության աստիճանը միշտ որոշում է մարզիչը: Մարզիչի կողմից
            աշակերտի նախապատրաստման ժամկետը մոտավորապես 12 ամիս է, սակայն
            յուրաքանչյուր աշակերտի պատրաստվածության աստիճանը դիտարկվում է
            առանձին:
          </span>
          <br />
          <span>
            * Ուսուցման ընթացքի սկզբից աշակերտին տրվում է որոշակի քանակությամբ և
            ձևաչափի խաղեր, որոնք նա պետք է խաղա։ Երբ մարզիչը հասկանում է, որ
            աշակերտը պատրաստ է, հարցում է ուղարկում դպրոցի ղեկավարությանը՝
            աշակերտի սեանսներին մասնակցելու պատրաստ լինելու մասին։ Եթե դպրոցի
            ղեկավարությունը հաստատում է հարցումը, ապա աշակերտին ավելացնում է
            հատուկ զրուցարան, որտեղ նա սկսում է սեանսներին մասնակցելու հղումներ
            ստանալ։
          </span>
        </>
      ),
      en: (
        <>
          <span>
            * A simultaneous game is a massive chess event where a strong chess
            player (grandmaster, international master, fide master, etc.) plays
            simultaneously against a large number of chess players.
          </span>
          <br />
          <span>
            *Our school has an assessment system that determines student's
            readiness to participate in the simul. Readiness for a simul is
            always determined by the trainer. The training period for a student
            by a trainer is approximately 12 months, but the readiness of each
            student is considered individually.
          </span>
          <br />
          <span>
            * From the very beginning of training, the student is given a
            certain number and format of games that he must play. After this,
            the coach sends a request about the student’s readiness to
            participate in the simuls, and the school management confirms this
            request and adds the student to a specific chat, where he begins to
            receive links to the simuls.
          </span>
        </>
      ),
    },
    onlineTournamentsDescriptionText: {
      ru: (
        <>
          <span>
            {' '}
            * Шахматный турнир — это серия шахматных игр, в которых шахматисты
            соревнуются, чтобы определить победителя — игрока или команду.
          </span>
          <br />
          <span>
            * В нашей школе существует система оценки, которая определяет
            готовность ученика к участию в турнире. Готовность к турниру всегда
            определяет тренер. Срок подготовки ученика тренером составляет
            примерно 1-2 года, однако готовность каждого ученика рассматривается
            индивидуально.
          </span>
          <br />
          <span>
            * С самого начала обучения ученику предоставляется определенное
            количество и формат игр, которые он должен сыграть. После этого
            тренер отправляет запрос о готовности ученика к участию в турнирах,
            а руководство школы подтверждает данный запрос и добавляет ученика в
            определенный чат, где он начинает получать ссылки на турниры.
          </span>
        </>
      ),
      am: (
        <>
          <span>
            * Շախմատի մրցաշարը շախմատային խաղերի շարք է, որտեղ շախմատիստները
            մրցում են, որպեսզի որոշեն հաղթող խաղացողին կամ թիմին:
          </span>
          <br />
          <span>
            * Մեր դպրոցում գործում է գնահատման համակարգ, որը որոշում է աշակերտի՝
            օնլայն մրցաշարերին մասնակցելու պատրաստվածության աստիճանը։ Մրցաշարին
            պատրաստվածության աստիճանը միշտ որոշում է մարզիչը։ Մարզչի կողմից
            աշակերտի նախապատրաստման ժամկետը մոտավորապես 1-2 տարի է, սակայն
            յուրաքանչյուր աշակերտի պատրաստվածության աստիճանը դիտարկվում է
            առանձին:
          </span>
          <br />
          <span>
            * Ուսուցման ընթացքի սկզբից աշակերտին տրվում է որոշակի քանակությամբ և
            ձևաչափի խաղեր, որոնք նա պետք է խաղա։ Երբ մարզիչը հասկանում է, որ
            աշակերտը պատրաստ է, հարցում է ուղարկում դպրոցի ղեկավարությանը՝
            աշակերտի մրցաշարերին մասնակցելու պատրաստ լինելու մասին։ Եթե դպրոցի
            ղեկավարությունը հաստատում է հարցումը, ապա աշակերտին ավելացնում է
            հատուկ զրուցարան, որտեղ նա սկսում է մրցաշարերին մասնակցելու հղումներ
            ստանալ։
          </span>
        </>
      ),
      en: (
        <>
          <span>
            *A chess tournament is a series of chess games in which chess
            players compete to determine the winning player or team.
          </span>
          <br />
          <span>
            * Our school has an assessment system that determines a student’s
            readiness to participate in the tournament. The coach always
            determines the readiness for the tournament. The training period for
            a student by a coach is approximately 1-2 years, but the readiness
            of each student is considered individually.
          </span>
          <br />
          <span>
            * From the very beginning of training, the student is given a
            certain number and format of games that he must play. After this,
            the coach sends a request about the student’s readiness to
            participate in tournaments, and the school management confirms this
            request and adds the student to a specific chat, where he begins to
            receive links to tournaments.
          </span>
        </>
      ),
    },
    offlineTournamentsDescriptionText: {
      ru: (
        <>
          <span>
            *Руководство нашей школы рекомендует принять участие в офлайн
            турнире только после того, как наhjmnd вопросf "Готов к онлайн
            турнирам" увидите ответ "ДА" . Рекомендуется предварительно посетить
            несколько онлайн турниров, прежде чем поехать на ОФЛАЙН турнир. Пока
            тренер не подтвердит готовность ученика к онлайн турнирам, всегда
            можно поехать и просто посмотреть на офлайн турниры, чтобы понять,
            как они проходят.
          </span>
          <br />
          <span>
            *Если вы уверены, что ученика психологически готов к офлайн турнирам
            и сможет справиться с поражением на первом турнире, то можете
            обратиться к администратору школы. Тренер проведет специальный урок
            на тему офлайн турниров, и ученика сможет попробовать себя. Впрочем,
            тренер также может посоветовать подождать, считая, что ученик ТОЧНО
            еще не готов.
          </span>
          <br />
        </>
      ),
      am: (
        <>
          <span>
            * Մեր դպրոցի ղեկավարությունը խորհուրդ է տալիս մասնակցել օֆլայն
            մրցաշարին միայն այն բանից հետո, երբ «Պատրաստ է օֆլայն մրցաշարերի»
            դիմաց կտեսնեք «ԱՅՈ» պատասխանը: Խորհուրդ է տրվում սկզբի համար
            մասնակցել մի քանի օնլայն մրցաշարերի՝ նախքան օֆլայն մրցաշար գնալը:
            Քանի դեռ մարզիչը չի հաստատել, որ աշակերտը պատրաստ է օֆլայն
            մրցաշարերին, միշտ կարելի է գնալ և պարզապես դիտել օֆլայն մրցաշարերը՝
            հասկանալու համար, թե ինչպես են դրանք անցնում:
          </span>
          <br />
          <span>
            * Եթե համոզված եք, որ աշակերտը հոգեբանորեն պատրաստ է օֆլայն
            մրցաշարերին և կարող է հաղթահարել պարտութան զգացումը առաջին
            մրցաշարում, ապա կարող եք դիմել դպրոցի ադմինիստրատորին: Մարզիչը
            հատուկ դաս կանցկացնի օֆլայն մրցաշարերի թեմայով, և աշակերտը կկարողանա
            փորձել իրեն։ Սակայն մարզիչը կարող է նաև ձեզ խորհուրդ տալ սպասել, եթե
            կարծի, որ աշակերտը ՀԱՍՏԱՏ դեռ պատրաստ չէ։
          </span>
          <br />
        </>
      ),
      en: (
        <>
          <span>
            *The management of our school recommends taking part in an offline
            tournament only after you see the answer “YES” to the question
            “Ready for online tournaments.” It is recommended to first attend
            several online tournaments before going to an OFFLINE tournament.
            Until the coach confirms the student’s readiness for online
            tournaments, you can always go and just watch offline tournaments to
            understand how they work.
          </span>
          <br />
          <span>
            *If you are sure that the student is psychologically ready for
            offline tournaments and can cope with defeat in the first
            tournament, then you can contact the school administrator. The coach
            will conduct a special lesson on the topic of offline tournaments,
            and the student will be able to try himself. However, the coach may
            also advise you to wait, believing that the student is DEFINITELY
            not ready yet.
          </span>
          <br />
        </>
      ),
    },
    levelsDescriptionText: {
      ru: (
        <>
          <span>
            * Это уровень, который был определен на пробном занятии
            тренером-методистом по нашей 10-балльной шкале. При обучении уровень
            ученика меняется, и мы присваиваем ему новый уровень. С каждым
            пройденным уровнем ученик получает сертификат, который нужно
            распечатать и торжественно вручить ему.
          </span>
          <br />
          <span>
            * Важно знать, что ни одна онлайн-школа не может выдать ученику
            разряд или официальный рейтинг. Разряд по шахматам ученик получает
            только участвуя в офлайн-турнирах на разряд. Официальный рейтинг
            ученик получает только участвуя в офлайн-турнирах с обсчетом
            рейтинга.
          </span>
          <br />
        </>
      ),
      am: (
        <>
          <span>
            * Այն մակարդակն է, որը որոշվել է մեր 10 բալանոց սանդղակով, փորձնական
            դասի ժամանակ մարզիչ-մեթոդոլոգի կողմից: Դասերի ընթացքում աշակերտի
            մակարդակը փոխվում է, և մենք նրան նոր մակարդակ ենք տեղափոխում։
            Յուրաքանչյուր նոր մակարդակի անցնելուց հետո աշակերտը ստանում է
            վկայական, որն անհրաժեշտ է տպագրել և հանդիսավոր կերպով հանձնել նրան։
          </span>
          <br />
          <span>
            * Կարևոր է իմանալ, որ ոչ մի օնլայն դպրոց չի կարող աշակերտին կարգ կամ
            պաշտոնական վարկանիշ տալ: Աշակերտը շախմատային կարգ է ստանում միայն
            կարգի համար օֆլայն մրցաշարերի մասնակցելով։ Աշակերտը պաշտոնական
            վարկանիշ է ստանում միայն վարկանիշային հաշվարկներով օֆլայն մրցաշարերի
            մասնակցելով։
          </span>
          <br />
        </>
      ),
      en: (
        <>
          <span>
            * This is the level that was determined during a trial lesson by a
            trainer-methodologist on our 10-point scale. During training, the
            student's level changes, and we assign him a new level. With each
            level passed, the student receives a certificate, which must be
            printed and ceremonially presented to him.
          </span>
          <br />
          <span>
            * It is important to know that no online school can issue a rank or
            official rating to a student. A student receives a rank in chess
            only by participating in offline tournaments for the rank. A student
            receives an official rating only by participating in offline
            tournaments with rating calculations.
          </span>
          <br />
        </>
      ),
    },
    parentNameText: {
      am: 'Մայրիկի (կամ հայրիկի) անունը',
      ru: 'ФИО мамы (или папы)',
      en: 'Full name of mother (or father)',
    },
    nationalityText: {
      am: 'Ազգությունը',
      ru: 'Национальность',
      en: 'Nationality',
    },
    languagesText: {
      am: 'Ի՞նչ լեզուներ գիտեք:',
      ru: 'Какие языки знаете?',
      en: 'What languages do you speak?',
    },
    studentLanguagesText: {
      am: 'Ի՞նչ լեզուներով է խոսում աշակերտը:',
      ru: 'На каких языках говорит ученик?',
      en: 'What languages does the student speak?',
    },
    cityText: {
      am: 'Բնակության քաղաքը',
      ru: 'Город проживания',
      en: 'City of residence',
    },
    whatsAppNumberText: {
      am: 'Հավելյալ հեռախոսահամար (WhatsApp)',
      ru: 'Добавочный номер телефона (WhatsApp)',
      en: 'Extension phone number (WhatsApp)',
    },
    graphicCommentsText: {
      am: 'Մեկնաբանություններ.',
      ru: 'Комментарии:',
      en: 'Comments:',
    },
    sexText: {
      am: 'Սեռ',
      ru: 'Пол',
      en: 'Sex',
    },
    maleText: {
      am: 'Արական',
      ru: 'Мужской',
      en: 'Male',
    },
    femaleText: {
      am: 'իգական',
      ru: 'Женский',
      en: 'Female',
    },
    birthDateText: {
      am: 'Ծննդյան ամսաթիվ',
      ru: 'Дата рождения',
      en: 'Date of Birth',
    },
    graphicText: {
      am: 'Գրաֆիկ',
      ru: 'График:',
      en: 'Schedule:',
    },
    moscowTimeText: {
      am: 'Մոսկվայի ժամանակով',
      ru: 'Московское время',
      en: 'Moscow time',
    },
    registerSuccessText: {
      am: 'Ուռա՜, Դուք գրանցված եք որպես',
      ru: 'Ура!!! Вы прошли регистрацию как',
      en: 'Hooray!!! You are registered as',
    },
    waitingForSuccessText: {
      am: 'ՁԵՐ ՓՈՓՈԽՈՒԹՅՈՒՆՆԵՐՆ ՈՒՂԱՐԿՎԵԼ ԵՆ ՂԵԿԱՎԱՐՈՒԹՅՈՒՆ ՀԱՍՏԱՏՄԱՆ ՀԱՄԱՐ',
      ru: 'ВАШИ ИЗМЕНЕНИИ ОТПРАВЛЕНЫ РУКОВОДСТВУ НА ПОДТВЕРЖДЕНИЕ',
      en: 'YOUR CHANGES HAVE BEEN SENT TO MANAGEMENT FOR CONFIRMATION',
    },
    dataSavedText: {
      am: 'Տվյալները հաջողությամբ պահպանվել են:',
      ru: 'Данные успешно сохранены!',
      en: 'Data saved successfully!',
    },
    forGetAccessText: {
      ru: 'Чтобы вам открыли соответствующий доступ к платформе:',
      am: 'Որպեսզի Ձեզ համար բացենք համապատասխան մուտք դեպի հարթակ.\n',
      en: 'To give you appropriate access to the platform:',
    },
    getAccessStep1: {
      ru: 'Скопируйте текст ниже',
      am: 'Պատճենեք ստորև բերված տեքստը',
      en: 'Copy the text below',
    },
    getAccessStep2: {
      ru: 'Пишите ваше ФИО',
      am: 'Գրեք ձեր լրիվ անունը (ԱԱՀ)',
      en: 'Write your full name',
    },
    getAccessStep3: {
      ru: ['Отправьте смс', 'администратору', ' школы'],
      am: ['Ուղարկեք SMS դպրոցի', 'ադմինիստրատորին', ''],
      en: ['Send an SMS to the school', 'administrator', ''],
    },
    adminMsgText: {
      ru: `"Уважаемый администратор школы, откройте, пожалуйста, доступ к платформе Арарат.
Мы прошли регистрацию с именем - Иванов Иван Иванович."`,
      am: `«Հարգելի դպրոցի ադմինիստրատոր, խնդրում եմ բացեք մուտքը դեպի Արարատ հարթակ:
Մենք գրանցվել ենք Աբգարյան Աբգար Աբգարի անունով»։`,
      en: `“Dear school administrator, please open access to the Ararat platform.
We were registered with the name John Smith."`,
    },
    getAccessForAdmin: {
      ru: 'Напишите вашему руководителю, чтобы открыли вам соответствующий доступ.',
      am: 'Գրեք ձեր ղեկավարին, որպեսզի Ձեզ համար բացենք համապատասխան մուտք դեպի հարթակ:',
      en: 'Write to your supervisor to give you the appropriate access.',
    },
    copyText: {
      ru: 'Копировать',
      am: 'Պատճենել',
      en: 'Copy',
    },
    copiedText: {
      ru: 'Скопировано',
      am: 'Պատճենված է',
      en: 'Copied',
    },
    thankYouText: {
      ru: 'Спасибо, что выбрали нас!',
      am: 'Շնորհակալ ենք մեզ ընտրելու համար:',
      en: 'Thank you for choosing us!',
    },
    fillAllFieldsText: {
      ru: 'Заполните все разделы!',
      am: 'Լրացրեք բոլոր բաժինները:',
      en: 'Fill all the sections!',
    },
    cooperationText: {
      ru: 'Мы уверены, что наше сотрудничество будет на длительный срок!',
      am: 'Վստահ ենք, որ մեր համագործակցությունը կլինի երկարաժամկետ։',
      en: 'We are confident that our cooperation will be long-term!',
    },
    ourGoalText: {
      ru: 'Наша цель с помощью шахмат научить учеников мыслить латерально, развивать у них целеустремленность, выдержку, умение достойно держать удары.',
      am: 'Մեր նպատակն է շախմատի միջոցով աշակերտներին սովորեցնել մտածել մարտավարական, նրանց մեջ զարգացնել վճռականություն, տոկունություն, հարվածներին արժանապատվորեն դիմակայելու կարողություն։',
      en: 'Our goal, with the help of chess, is to teach students to think laterally, to develop in them determination, endurance, and the ability to withstand blows with dignity.',
    },
    aboutGraphicTitleText: {
      ru: 'Напишите, пожалуйста, график, по которому вы можете заниматься. Укажите время по московскому часовому поясу.',
      am: 'Խնդրում ենք գրել գրաֆիկ, ըստ որի կարող եք սովորել։ Ժամերը նշեք Մոսկվայի ժամանակով:',
      en: 'Please write a schedule according to which you can study. Enter the time in the Moscow time zone.',
    },
    pleaseWriteScheduleText: {
      ru: [
        'Старайтесь, пожалуйста написать нам как можно',
        'больше',
        'дней и времени.',
      ],
      am: [
        'Խնդրում ենք փորձել մեզ գրել որքան հնարավոր է',
        'շատ',
        'օրեր և ժամեր:',
      ],
      en: [
        'Please try to write to us as',
        'many',
        'days and times as possible.',
      ],
    },
    aboutGroupLessonsText: {
      ru: [
        'Если вам нужны групповые уроки',
        '- информация. В основном группы в нашей школе бывают пн-ср, пн-пт, ср-пт, вт-чт, сб-вс в разное время дня. Например, если вам нужны групповые уроки, и вы отметили в графике только пн и вт, то мы не можем подобрать вам группу.',
      ],
      am: [
        'Եթե Ձեզ անհրաժեշտ են խմբակային պարապմունքներ՝',
        'տեղեկատվություն։ Մեր դպրոցում հիմնականում խմբերը լինում են՝ երկ-չրք, երկ-ուրբ, չրք-ուրբ, երք-հնգ, շբթ-կիր օրվա տարբեր ժամերի: Օրինակ, եթե ձեզ խմբակային պարապմունքներ են անհրաժեշտ, և դուք ձեր գրաֆիկում նշել եք միայն երկուշաբթի և երեքշաբթի, ապա մենք չենք կարող ձեզ համար խումբ գտնել:',
      ],
      en: [
        'If you need group lessons',
        '- information. Basically, groups at our school are Mon-Wed, Mon-Fri, Wed-Fri, Tue-Thu, Sat-Sun at different times of the day. For example, if you need group lessons, and you only marked Mon and Tue in your schedule, then we cannot find a group for you.',
      ],
    },
    groupScheduleTimeText: {
      ru: 'На основе вашего графика, мы назначаем группу в течении 5-20 дней.',
      am: 'Ձեր գրաֆիկի համաձայն, մենք նշանակում ենք խումբ մոտավորապես 50-20 օրվա ընթացքում ',
      en: 'Based on your schedule, we schedule a group within 5-20 days.',
    },
    aboutIndLessonsText: {
      ru: [
        'Если вам нужны индивидуальные уроки',
        '- можете написать любой график, любые дни - любое время, мы назначим тренера.',
        'Старайтесь, пожалуйста, написать нам как можно больше дней и часов',
      ],
      am: [
        'Եթե Ձեզ անհրաժեշտ են անհատական պարապմունքներ,',
        'կարող եք գրել ցանկացած գրաֆիկ, ցանկացած օր՝ ցանկացած ժամ, մենք կնշանակենք մարզիչ։',
        'Խնդրում ենք փորձել գրել մեզ որքան հնարավոր է շատ օրեր և ժամեր'
      ],
      en: [
        'If you need individual lessons,',
        'you can write any schedule, any days - any time, we will assign a trainer.',
        'Please try to write to us as many days and hours as possible'
      ],
    },
  },
  access: {
    armeniaText: {
      ru: 'Armenia',
      am: 'Հայաստան',
      en: 'Armenia',
    },
    sortText: {
      ru: 'Сортировка',
      en: 'Sort',
      am: 'Սեղմել',
    },
    allText: {
      ru: 'Все',
      am: 'Բոլորը',
      en: 'All',
    },
    newUsersText: {
      ru: 'Новые пользователи',
      am: 'Նոր օգտվողներ',
      en: 'New users',
    },
    dataChangedText: {
      ru: 'Данные пользователя успешно изменены',
      am: 'Օգտատիրոջ տվյալները հաջողությամբ փոխվեցին',
      en: 'User data changed successfully',
    },
    newUsersShortText: {
      ru: 'Новые',
      am: 'Նոր',
      en: 'New',
    },
    studentsText: {
      ru: 'Студенты',
      am: 'Աշակերտներ',
      en: 'Students',
    },
    testUsersText: {
      ru: 'Тестовые ученики',
      am: 'Փորձառու աշակերտներ',
      en: 'Test students',
    },
    archivedTestUsersText: {
      ru: 'Архив тестовые',
      am: 'Արխիվ Փորձառու',
      en: 'Archived test',
    },
    trainersText: {
      ru: 'Тренеры',
      am: 'Մարզիչներ',
      en: 'Trainers',
    },
    studentText: {
      ru: 'СТУДЕНТ',
      am: 'ԱՇԱԿԵՐՏ',
      en: 'STUDENT',
    },
    adminsText: {
      ru: 'Админы',
      am: 'Ադմիններ',
      en: 'Admins',
    },
    programmersText: {
      ru: 'Программисты',
      am: 'Ծրագրավորողներ',
      en: 'Programmers',
    },
    archiveText: {
      ru: 'Архив',
      am: 'Արխիվ',
      en: 'Archive',
    },
    debtorsText: {
      ru: 'Должники',
      am: 'պարտապաններ',
      en: 'Debtors',
    },
    debtorWarningText: {
      ru: 'Использование платформы закрыто в связи с тем, что вы не внесли оплату за обучение и не ответили администратору школы. Просим вас внести оплату и связаться с администратором школы.',
      am: 'Պլատֆորմայի օգտագործումը արգելափակված է։ Դուք չեք վճարել ուսման վարձը և չեք պատասխանել դպրոցի ադմինիստրատորին: Խնդրում ենք կատարել վճարումը և կապ հաստատել դպրոցի ադմինիստրատորի հետ:',
      en: 'The use of the platform is closed due to the fact that you have not paid for tuition and have not responded to the school administrator. Please make the payment and contact the school administrator.',
    },
    debtorNotificationText: {
      ru: 'Напоминаем, вам всегда на почту приходит информация про то, что у вас нет оплаченных уроков.',
      am: 'Հիշեցնում ենք, որ դուք միշտ էլ․ փոստով ստանում եք տեղեկատվություն այն մասին, որ ձեր հաշիվը 0 է և պետք է վճարում կատարել:',
      en: 'We remind you that you always receive information by email that you do not have paid lessons.',
    },
    goToRequizitesText: {
      ru: 'Перейти в раздел реквизиты, чтобы внести оплату',
      am: 'Գնալ Ռեկվիզիտներ բաժին վճարում կատարելու',
      en: 'Go to the banking details section to make a payment',
    },
    writeToAdminPlatformText: {
      ru: 'Написать администратору на платформе',
      am: 'Գրել Ադմինիստրատորին պլատֆորմայում',
      en: 'Write to the administrator on the platform',
    },
    writeToAdminWhatsUpText: {
      ru: 'Написать администратору в WhatsApp',
      am: 'Գրել Ադմինիստրատորին WhatsApp-ում',
      en: 'Write to the administrator on WhatsApp',
    },
    takeTrustLessonText: {
      ru: 'Взять в долг еще один урок, чтобы платформа сработала и чтобы не терять урок',
      am: 'Վերցնել 1 պարտքով դաս, որպեսզի մասնակցել դասին, հետո վճարում կատարել',
      en: 'To borrow another lesson so that the platform works and so as not to lose the lesson',
    },
    trustLessonTakenText: {
      ru: 'Должно быть, что вы уже взяли один доверительный урок',
      am: 'Պետք է լինի, որ դուք արդեն վերցրել եք մեկ վստահության դաս',
      en: 'It must be that you have already taken one confidential lesson',
    },
    trustLessonOpenedText: {
      ru: 'Доступ на платформу открыт для еще 1 урока. Просим вас внести оплату, чтобы продолжить обучение и больше не задерживать оплату на будущее. Но если у вас какие-то проблемы с оплатой или вы хотите оплатить не в срок и т.д., тогда детально опишите администратору ситуацию, чтобы мы не блокировали ваш аккаунт.',
      am: 'Պլատֆորմայի մուտքը բաց է ևս 1 դասի համար: Խնդրում ենք կատարել վճարումը։ Խնդրում ենք հետագայում չհետաձգել վճարումը. որպեսզի մենք ստիպված չլինենք արգելափակել պլատֆորմայի մուտքը։ Բայց եթե վճարման հետ կապված խնդիրներ ունեք կամ ցանկանում եք վճարել ոչ ժամանակին և այլն, ապա մանրամասն նկարագրեք իրավիճակը ադմինիստրատորին, որպեսզի մենք չարգելափակենք պլատֆորմայի մուտքը:',
      en: 'Access to the platform is open for 1 more lesson. We ask you to make a payment in order to continue your studies and no longer delay payment for the future. But if you have any problems with payment or you want to pay late, etc., then describe the situation in detail to the administrator so that we do not block your account.',
    },
    trustLessonWarningText: {
      ru: 'Вы взяли доверительный урок, после урока доступ к платформе будет заблокирован, внесите, пожалуйста оплату.',
      am: 'Դուք վերցրել եք 1 պարտքով դաս, դասից հետո պլատֆորման նորից կարգելափակվի, խնդրում ենք կատարել վճարում:',
      en: 'You have taken a confidential lesson, after the lesson access to the platform will be blocked, please make a payment.'
    },
    payNowText: {
      ru: 'Оплатить сейчас',
      am: 'Վճարել հիմա',
      en: 'Pay now'
    },
    commentsText: {
      ru: 'Комментарии',
      am: 'մեկնաբանություններ',
      en: 'Comments',
    },
    commentsFromAdminText: {
      ru: 'Комментарии от администрации',
      am: 'Տնօրինության կողմից մեկնաբանություններ',
      en: 'Comments from the administration.',
    },
    closeAccessText: {
      ru: 'Закрыть доступ c возможностью доверительного урока',
      am: 'Փակել մուտքը վստահության դասի հնարավորությամբ',
      en: 'Close access with the possibility of a trust lesson',
    },
    closeAccessNoTrustText: {
      ru: 'Закрыть доступ без возможности доверительного урока',
      am: 'Փակել մուտքը առանց վստահության դասի հնարավորության',
      en: 'Close access without the possibility of a trust lesson',
    },
    searchText: {
      ru: 'Поиск...',
      am: 'Որոնել...',
      en: 'Search...',
    },
    userText: {
      ru: 'Пользователь',
      am: 'Օգտատեր',
      en: 'User',
    },
    editText: {
      ru: 'Редактировать',
      am: 'Խմբագրել',
      en: 'Edit',
    },
    editDataText: {
      ru: 'Редактировать данные',
      am: 'Խմբագրել տվյալները',
      en: 'Edit data',
    },
    nameText: {
      ru: 'Имя',
      am: 'Անուն',
      en: 'Name',
    },
    surnameText: {
      ru: 'Фамилия',
      am: 'Ազգանուն',
      en: 'Surname',
    },
    fatherNameText: {
      ru: 'Отчество',
      am: 'Հայրանուն',
      en: 'Father name',
    },
    roleText: {
      ru: 'Роль',
      am: 'Դերը',
      en: 'Role',
    },
    levelsText: {
      ru: 'Уровни:',
      am: 'Մակարդակները:',
      en: 'Levels:',
    },

    directorText: {
      ru: 'ДИРЕКТОР',
      am: 'ՏՆՕՐԵՆ',
      en: 'DIRECTOR',
    },
    zDirectorText: {
      ru: 'ЗАМ ДИРЕКТОР',
      am: 'ՓՈԽՏՆՕՐԵՆ',
      en: 'DEPUTY DIRECTOR',
    },
    adminText: {
      ru: 'АДМИН',
      am: 'ԱԴՄԻՆ',
      en: 'ADMIN',
    },
    administratorText: {
      ru: 'Администратор',
      am: 'Ադմինիստրատոր',
      en: 'Administrator',
    },
    trainerText: {
      ru: 'ТРЕНЕР',
      am: 'ՄԱՐԶԻՉ',
      en: 'TRAINER',
    },
    trainerMedhodistText: {
      ru: 'ТРЕНЕР МЕТОДИСТ',
      am: 'ՄԱՐԶԻՉ ՄԵԹՈԴԻՍՏ',
      en: 'TRAINER METHODIST',
    },
    programmerText: {
      ru: 'ПРОГРАММИСТ',
      am: 'ԾՐԱԳՐԱՎՈՐՈՂ',
      en: 'PROGRAMMER',
    },

    newUserText: {
      ru: 'НОВЫЙ ПОЛЬЗОВАТЕЛЬ',
      am: 'ՆՈՐ ՕԳՏԱՏԵՐ',
      en: 'NEW USER',
    },
    saveText: {
      ru: "Сохранить",
      am: "Պահպանել",
      en: "Save"
    },
    fieldsSettingsText: {
      ru: "Настройка полей",
      am: "Դաշտերի կարգավորում",
      en: "Field settings"
    },
    newTrainerText: {
      ru: 'НОВЫЙ ТРЕНЕР',
      am: 'ՆՈՐ ՄԱՐԶԻՉ',
      en: 'NEW TRAINER',
    },
    newStudentText: {
      ru: 'НОВЫЙ СТУДЕНТ',
      am: 'ՆՈՐ ԱՇԱԿԵՐՏ',
      en: 'NEW STUDENT',
    },
    readyForSimulationsText: {
      ru: 'Онлайн сеансы',
      am: 'Օնլայն սեանսներ',
      en: 'Online simulations',
    },
    onlineTournamentsChatsText: {
      ru: 'Онлайн турниры',
      am: 'Օնլայն մրցաշարեր',
      en: 'Online tournaments',
    },
    offlineTournamentsChatsText: {
      ru: 'Офлайн турниры',
      am: 'Օֆլայն մրցաշարեր',
      en: 'Offline tournaments',
    },
    submitText: {
      ru: 'Подтвердить',
      am: 'Հաստատել',
      en: 'Confirm',
    },
    profileText: {
      ru: 'Профиль',
      am: 'Պրոֆիլ',
      en: 'Profile',
    },
    toArchiveText: {
      ru: 'Архивировать',
      am: 'Արխիվ',
      en: 'Archive',
    },
    unArchiveText: {
      ru: 'Разархивировать',
      am: 'Ապաարխիվացնել',
      en: 'Unarchive',
    },
    toAnonymText: {
      ru: 'Сделать анонимной',
      am: 'Անանուն դարձնել',
      en: 'Make it anonymous',
    },
    unAnonymText: {
      ru: 'Сделать открытой',
      am: 'Դարձնել բաց',
      en: 'Make it open',
    },
    archiveUserText: {
      ru: 'Архив пользователя',
      am: 'Արխիվացնել օգտատիրոջը',
      en: 'Archive User',
    },
    closeAccess: {
      ru: 'Закрыть доступ',
      am: 'Փակել մուտքը',
      en: 'Close access',
    },
    sureCloseAccess: {
      ru: 'Вы уверены, что хотите закрыть доступ?',
      am: 'Վստա՞հ եք, որ ուզում եք փակել մուտքը հետևյալ աշակերտի համար',
      en: 'Are you sure you want to close access?',
    },
    openAccess: {
      ru: 'Открыть доступ',
      am: 'Բացել մուտքը',
      en: 'Open access',
    },
    sureOpenAccess: {
      ru: 'Вы уверены, что хотите открыть доступ?',
      am: 'Վստահ եք, որ Բացել մուտք?',
      en: 'Are you sure you want to open access?',
    },
    sureArchiveText: {
      ru: 'Вы уверены, что хотите архивировать пользователя?',
      am: 'Վստա՞հ եք, որ ցանկանում եք արխիվացնել օգտատիրոջը:',
      en: 'Are you sure you want to archive the user ?',
    },
    sureUnArchiveText: {
      ru: 'Вы уверены, что хотите разархивировать пользователя?',
      am: 'Վստա՞հ եք, որ ցանկանում եք ապաարխիվացնել օգտատիրոջը:',
      en: 'Are you sure you want to unarchive the user ?',
    },
    sureArchiveGroupText: {
      ru: 'Вы уверены, что хотите архивировать Группу?',
      am: 'Վստա՞հ եք, որ ցանկանում եք արխիվացնել Խումբը:',
      en: 'Are you sure you want to archive the Group?',
    },
    sureUnAnonymText: {
      ru: 'Вы уверены, что хотите сделать группу открытой?',
      am: 'Վստահ եք, որ ցանկանում եք խումբը բաց դարձնել:',
      en: 'Are you sure you want to make the group open?',
    },
    sureAnonymText: {
      ru: 'Вы уверены, что хотите сделать Группу анонимной?',
      am: 'Վստահ եք, որ ցանկանում եք խումբը անանուն դարձնել:',
      en: 'Are you sure you want to make the Group anonymous?',
    },
    sureUnArchiveGroupText: {
      ru: 'Вы уверены, что хотите разархивировать Группу?',
      am: 'Վստա՞հ եք, որ ցանկանում եք ապաարխիվացնել Խումբը:',
      en: 'Are you sure you want to unarchive the Group?',
    },
    sureDeleteGroupText: {
      ru: 'Вы уверены, что хотите Удалить Группу?',
      am: 'Վստա՞հ եք, որ ցանկանում եք Ջնջել Խումբը:',
      en: 'Are you sure you want to Delete the Group?',
    },
    unArchiveUserText: {
      ru: 'Разархивировать пользователя',
      am: 'Ապաարխիվացնել օգտատիրոջը',
      en: 'Unarchive User',
    },
    archiveGroupText: {
      ru: 'Архив Группу',
      am: 'Արխիվացնել Խումբը',
      en: 'Archive Group',
    },
    deleteGroupText: {
      ru: 'Удалить Группу',
      am: 'Ջնջել Խումբը',
      en: 'Delete Group',
    },
    unArchiveGroupText: {
      ru: 'Разархивировать Группу',
      am: 'Ապաարխիվացնել Խումբը',
      en: 'Unarchive Group',
    },

    yesText: {
      ru: 'Да',
      am: 'Այո',
      en: 'Yes',
    },
    noText: {
      ru: 'Нет',
      am: 'Ոչ',
      en: 'No',
    },
    editRequestsText: {
      ru: 'Запросы изменения',
      am: 'Խմբագրման հարցումնեը',
      en: 'Edit requests',
    },
    rejectedRequestsText: {
      ru: 'Отклоненные запросы',
      am: 'Մերժված հարցումները',
      en: 'Rejected requests',
    },
    requisiteRequestsText: {
      ru: 'Реквизиты',
      am: 'Ռեկվիզիտներ',
      en: 'Requisites',
    },
    parentAsksNewRequisitesText: {
      ru: 'Родитель просит другие реквизиты',
      am: 'Ծնողը այլ ռեկվիզիտներ է խնդրում',
      en: 'The parent asks for other requisites',
    },
    selectAllText: {
      ru: 'Выбрать все',
      am: 'Ընտրել բոլորը',
      en: 'Select all',
    },
    rejectText: {
      ru: 'Отклонять',
      am: 'Մերժել',
      en: 'Reject',
    },
    rejectAllText: {
      ru: 'Отклонять все',
      am: 'Մերժել բոլրորը',
      en: 'Reject all',
    },
    acceptText: {
      ru: 'Принимать',
      am: 'Ընդունել',
      en: 'Accept',
    },
  },
  recommendModal: {
    recommendationTitleText: {
      ru: 'РЕКОМЕНДАЦИЯ',
      am: 'ՐԵԿՈՄԵՆԴԱՑԻԱ',
      en: 'RECOMMENDATION',
    },
    shareText: {
      ru: 'Поделиться',
      am: 'Կիսվել',
      en: 'Share',
    },
    recommendationText: {
      ru: 'Рекомендую отличную онлайн школу ШАХМАТ!',
      am: 'Խորհուրդ եմ տալիս հիանալի ՇԱԽՄԱՏԻ օնլայն դպրոց:',
      en: 'I recommend an excellent online CHESS school.',
    },
    advantagesText: {
      ru: 'Преимущества международной школы Арарат:👇',
      am: 'Արարատ միջազգային դպրոցի առավելությունները. 👇',
      en: 'Advantages of Ararat International School: 👇',
    },
    advantageLinkText: {
      ru: 'https://drive.google.com/file/d/1fGiYD-2Olxga0ea2wZ8dShLEXKwJT2u2/view?usp=drive_link',
      am: 'https://drive.google.com/file/d/1UmSGgRU-IITvyrp-1oPUJsK2Ls5sSpxj/view?usp=drive_link',
      en: 'https://drive.google.com/file/d/1sq2Fyi-wWbpamea-O2gizcVsbkbiMGG-/view?usp=drive_link',
    },
    advantage1Text: {
      ru: [
        'Отправьте это сообщение близким и друзьям, у которых есть ',
        ' *дети от 4 лет.* ',
        'Делитесь текстом рекомендации в школьных родительских группах итд. 📩',
      ],
      am: [
        'Ուղարկեք այս նամակը մտերիմներին և ընկերներին, ովքեր ունեն ',
        '*4 տարեկանից մեծ երեխաներ։* ',
        'Կիսվեք րեկոմենդացիայի տեքստով դպրոցականների ծնողների խմբերում և այլն: 📩',
      ],
      en: [
        'Send this message to relatives and friends who have ',
        '*children over the age of 4.*',
        'Share the text of the recommendation in school parent groups, etc. 📩',
      ],
    },
    advantage2Text: {
      ru: 'АКЦИЯ до 01.07.2024‼️',
      am: 'ԱԿՑԻԱ մինչև 01.07.2024‼️',
      en: 'PROMOTION until 01.07.2024‼️',
    },
    advantage3Text: {
      ru: '*За каждого приведённого друга вы получаете бонус 50 ЕВРО / 5000 РУБЛЕЙ.*',
      am: '*Յուրաքանչյուր 1 ընկեր հրավիրելու համար դուք ստանում եք բոնուս 50 EUR / 5000 RUB։*',
      en: '*For each friend you refer you receive a bonus of 50 EUR / 5000 RUB.*',
    },
    advantage4Text: {
      ru: 'ПОДРОБНЕЕ про рекомендации 👉 ',
      am: 'ԻՄԱՆԱԼ ԱՎԵԼԻՆ 👉 ',
      en: 'READ MORE about recommendation 👉 ',
    },
    advantage4LinkText: {
      ru: 'https://drive.google.com/file/d/1fGiYD-2Olxga0ea2wZ8dShLEXKwJT2u2/view?usp=drive_link',
      am: 'https://drive.google.com/file/d/1UmSGgRU-IITvyrp-1oPUJsK2Ls5sSpxj/view?usp=drive_link',
      en: 'https://drive.google.com/file/d/1sq2Fyi-wWbpamea-O2gizcVsbkbiMGG-/view?usp=drive_link',
    },
    instagramText: {
      ru: '- *Смотреть страницу Instagram*',
      am: '- *Դիտել Instagram-ի էջը*',
      en: '- *View Instagram page*',
    },
    officialSiteText: {
      ru: 'Всё на официальной странице👇',
      am: 'Ամբողջը պաշտոնական կայքում👇',
      en: 'Everything is on the official page👇',
    },
    registerForFreeLessonText: {
      ru: '- *Записаться на бесплатный пробный урок*',
      am: '- *Գրանցվել անվճար փորձնական դասին*',
      en: '- *Sign up for a free trial lesson*',
    },
    priceSiteText: {
      ru: '- *Знакомиться с ценами*',
      am: '- *Իմանալ գները*',
      en: '- *Check out the prices*',
    },
    copiedText: {
      ru: 'Скопировано',
      am: 'Պատճենված է',
      en: 'Copied',
    },
  },
  aboutPromotionModal: {
    promotionTitleText: {
      ru: 'Дорогие родители, ',
      am: 'Հարգելի ծնողներ, ',
      en: 'Dear parents, ',
    },
    promotionTitleText2: {
      ru: 'Mеждународная школа Арарат дает вам шикарную возможность заработать деньги на обучения шахмат и чуток сэкономить.',
      am: 'Արարատ միջազգային դպրոցը տալիս է հիանալի հնարավորություն գումար վաստակել շախմատի դասընթացների համար և մի փոքր խնայել:',
      en: 'Ararat International School gives you a great opportunity to earn money for chess lessons and save a little.',
    },
    promotionText1: {
      ru: 'В WhatsApp, в Telegram, в Viber с текстом рекомендации сделайте рассылку близким и друзьям, делитесь текстом рекомендации в школьных родительских группах итд.',
      am: 'WhatsApp-ում, Telegram-ում, Viber-ում րեկոմենդացիայի տեքստը ուղարկեք ձեր մտերիմներին և ընկերներին, կիսվեք դպրոցականների ծնողների խմբերում և այլն:',
      en: 'In WhatsApp, in Telegram, in Viber with the text of the recommendation, send a newsletter to your family and friends, share the newsletter in school parent groups etc.',
    },
    promotionText2: {
      ru: 'Как мы узнаем что новый ученик пришел именно от вас?',
      am: 'Ինչպե՞ս ենք մենք իմանում, որ նոր աշակերտը եկել է ձեր կողմից:',
      en: 'How do we know that a new student came from you?',
    },
    promotionText4: {
      ru: '1. В тексте рекомендации мы поставили индивидуальную ссылку для каждого ученика школы. Соответственно если кто-то переходит ',
      am: '1. Րեկոմենդացիայի տեքստում մենք ներառել ենք ինդիվիդուալ հղում դպրոցի յուրաքանչյուր աշակերտի համար: Հետևաբար, եթե ինչ-որ մեկը անցնում է ',
      en: '1. In the text of the recommendation, we have included an individual link for each student at the school. Accordingly, if someone follows your link ',
    },
    promotionText5: {
      ru: 'ИМЕННО ',
      am: 'ՀԵՆՑ ',
      en: 'EXACTLY ',
    },
    promotionText6: {
      ru: 'по вашей ссылке и записывается на пробный урок, мы видим что это заявка именно от вас. ',
      am: 'ձեր հղումով և գրանցվում է փորձնական դասի, մենք տեսնում ենք, որ այդ հայտը հենց ձեր հղումից է: ',
      en: 'and signs up for a trial lesson, we see that this is an application from you.',
    },
    promotionText7: {
      ru: '(Реферальная программа)',
      am: '(Ուղղորդման ծրագիր. Реферальная программа. Referral program)',
      en: '(Referral program)',
    },
    promotionText8: {
      ru: '2. После каждого пробного урока тренер на всякий случей уточняет, родитель нашел нас по рекомендации или из других источников.',
      am: '2. Յուրաքանչյուր փորձնական դասից հետո ուսուցիչը ամեն դեպքում ճշտում է, ծնողը մեզ գտել է ինչ-որ մեկի րեկոմենդացիայով, թե այլ աղբյուրներից:',
      en: '2. After each trial lesson, the trainer clarifies, just in case, whether the parent found us through a recommendation or from other sources.',
    },
    promotionText9: {
      ru: 'Важно знать, что вы получаете ваш бонус именно после первой оплаты вашего друга.',
      am: 'Կարևոր է իմանալ, որ դուք ստանում եք ձեր բոնուսը ձեր ընկերոջ առաջին վճարումից հետո:',
      en: 'It is important to know that you receive your bonus after your friend’s first payment.',
    },
    promotionText10: {
      ru: 'Если вдруг от вас кто то пришел к нам, а мы не начислили вам бонус, нужно обязательно написать администратору школу.',
      am: 'Եթե ձեր րեկոմենդացիայով ինչ-որ մեկը գա մեզ մոտ սովորելու, բայց մենք ձեզ բոնուս չտրամադրենք, անպայման գրեք դպրոցի ադմինիստրատորին:',
      en: 'If suddenly someone came to us from you, but we did not credit you with a bonus, you must write to the administrator and clarify.',
    },
    promotionText11: {
      ru: 'Возможно ваши друзья пришли на пробный урок, но еще не внесли первую оплату или еще не выбрали группу, по этому и вам еще не начислен бонус.',
      am: 'Հնարավոր է, որ ձեր ընկերները անցել են փորձնական դասը, բայց դեռ չեն կատարել առաջին վճարումը կամ դեռ խումբ չեն ընտրել, այդ իսկ պատճառով դուք դեռ բոնուս չեք ստացել:',
      en: 'Perhaps your friends came to a trial lesson, but have not yet made the first payment or have not yet chosen a group, so you have not yet received a bonus.',
    },
    promotionText12: {
      ru: 'Сколько бонусов вы получите, если от вас придет не 1 ученик, а больше?',
      am: 'Ինչքա՞ն բոնուս կստանաք, եթե ձեր րեկոմենդացիայով գա մեկից ավելի աշակերտ:',
      en: 'How many bonuses will you receive if more than one student comes from you?',
    },
    promotionText13: {
      ru: 'Бонус вы получаете за ',
      am: 'Դուք ստանում եք բոնուս ',
      en: 'You receive a bonus for ',
    },
    promotionText14: {
      ru: 'КАЖДОГО ',
      am: 'ՅՈՒՐԱՔԱՆՉՅՈՒՐ ',
      en: 'EACH ',
    },
    promotionText15: {
      ru: 'ученика. Соответственно если к примеру от вас пришли 4 ученика, вы получаете бонус*4 , если от вас пришли 6 учеников, вы получаете бонус*6 итд.',
      am: 'աշակերտի համար: Հետևաբար, եթե, օրինակ, ձեր րեկոմենդացիայով եկել է 4 աշակերտ, դուք ստանում եք բոնուս*4, եթե ձեր րեկոմենդացիայով եկել է 6 աշակերտ, դուք ստանում եք բոնուս*6 և այդպես շարունակ։',
      en: 'student. Accordingly, if, for example, 4 students came from you, you receive bonus*4, if 6 students came from you, you receive bonus*6, etc.',
    },
    promotionText16: {
      ru: 'Можно ли получить данные бонусы на карту?',
      am: 'Հնարավո՞ր է այս բոնուսները ստանալ քարտի վրա:',
      en: 'Is it possible to receive these bonuses on the card?',
    },
    promotionText17: {
      ru: 'Нет. Данные бонусы будут добавлены к вам на счет в СРМ системе как простая оплата, их можно израсходовать только для обучения шахмат в нашей школе.',
      am: 'Ոչ։ Այս բոնուսները կավելացվեն ձեր հաշվին CRM համակարգում՝ որպես սովորական վճարում, բոնուսները կարող են օգտագործվել միայն մեր դպրոցում շախմատի դասեր պարապելու համար:',
      en: 'No. These bonuses will be added to your account in the CRM system as a simple payment; they can only be used for learning chess at our school.',
    },
    promotionText18: {
      ru: 'Можно ли получить бонусы, если вы еще не учитесь в нашей школе?',
      am: 'Հնարավո՞ր է բոնուսներ ստանալ, եթե դեռ մեր դպրոցի աշակերտ չեք:',
      en: 'Is it possible to get bonuses if you are not yet a student at our school?',
    },
    promotionText19: {
      ru: 'Нет. Если вы еще не учитесь в нашей школе, вам нужно записаться на пробный урок, стать учеником нашей школы, далее рекомендовать нас и за приведённого друга получить бонусы.',
      am: 'Ոչ: Եթե ​​դուք դեռ մեր դպրոցի աշակերտ չեք, պետք է գրանցվել փորձնական դասին, դառնալ մեր դպրոցի աշակերտ, ապա րեկոմենդացիա անել մեզ և հետո միայն ստանալ բոնուսներ ընկերոջը հրավիրելու համար:',
      en: 'No. If you are not yet a student at our school, you need to sign up for a trial lesson, become a student at our school, then recommend us and receive bonuses for inviting a friend.',
    },
    promotionText20: {
      ru: 'Если у вас есть Instagram-VK-Facebook страницы, где есть аудитория родителей и вы хотите сделать пост и заработать - напишите администратору школы и мы дадим вам макеты и уникальные ссылки для отслеживания конверсии.',
      am: 'Եթե ​​ունեք Instagram-VK-Facebook էջ, որտեղ կա ծնողների լսարան, և ցանկանում եք փոստ անել և գումար վաստակել, գրեք դպրոցի ադմինիստրատորին, և մենք ձեզ կտրամադրենք նյութ և ինդիվիդուալ հղում կոնվերսիային հետևելու համար:',
      en: 'If you have an Instagram-VK-Facebook page where there is an audience of parents and you want to make a post and earn money, write to the school administrator and we will give you layouts and unique links to track conversion.',
    },
  },
  appDownloadModal: {
    appDownloadText1: {
      ru: 'Скачайте Мобильное приложение на телефон',
      am: 'Ներբեռնեք Բջջային հավելվածը ձեր հեռախոսում ',
      en: 'Download The mobile application to your phone ',
    },
    appDownloadText1_1: {
      ru: 'с Play Market и App Store.',
      am: 'Play Market-ից և App Store-ից:',
      en: 'from Play Market and App Store.',
    },
    appDownloadText1_2: {
      ru: 'Имя приложения - ',
      am: 'Դիմումի անվանումը -',
      en: 'Application name - ',
    },
    appDownloadText2: {
      ru: 'Удобный мессенджер',
      am: 'փոստարկղ',
      en: 'Messenger',
    },
    appDownloadText3: {
      ru: 'Домашнее задание',
      am: 'տնային աշխատանք',
      en: 'Homework',
    },
    appDownloadText4: {
      ru: 'Видеоуроки',
      am: 'վիդեո դասեր',
      en: 'Video lessons',
    },
    appDownloadText5: {
      ru: 'Итд...',
      am: 'և այլն...',
      en: 'etc...',
    },
    appDownloadText6: {
      ru: [
        'После того как скачали, нужно сделать вход так же через lichess.org , как вы уже сделали',
        'в компьютерной версии',
        'и вести логин пароль личеса ученика.',
      ],
      am: [
        'Ներբեռնումից հետո դուք պետք է մուտք գործեք lichess.org -ի միջոցով, ինչպես արդեն արել եք',
        'համակարգչային տարբերակում',
        'և մուտքագրեք ուսանողի լիչեսի մուտքանունը և  գաղտնաբառը:',
      ],
      en: [
        'After downloading, you need to log in through lichess.org , as you already did',
        'in the computer version',
        'and enter the student’s lichess login and password.',
      ],
    },
  },
  policy: {
    titleText: {
      ru: 'Политика Конфиденциальности',
      am: 'Գաղտնիության քաղաքականություն',
      en: 'Privacy Policy',
    },
    infoCollectTitleText: {
      ru: 'Сбор информации',
      am: 'Տեղեկատվության հավաքագրում',
      en: 'Collection of information',
    },
    infoCollectText: {
      ru: 'Мы можем собирать информацию, которую вы предоставляете при использовании приложения, такую как ваше имя, адрес электронной почты и данные о платежах. Мы также можем собирать информацию, связанную с вашим устройством, включая уникальные идентификаторы устройства, тип устройства, операционную систему и информацию о сети.',
      am: 'Մենք կարող ենք հավաքել այն տեղեկությունները, որոնք դուք տրամադրում եք հավելվածն օգտագործելիս, օրինակ՝ ձեր անունը, էլ. հասցեն և վճարման տվյալները: Մենք կարող ենք նաև հավաքել ձեր սարքի հետ կապված տեղեկություններ, ներառյալ սարքի եզակի նույնացուցիչները, սարքի տեսակը, օպերացիոն համակարգի և ցանցի տվյալները:',
      en: 'We may collect information you provide when using the application, such as your name, email address and payment information. We may also collect information associated with your device, including unique device identifiers, device type, operating system and network information.',
    },
    infoUseTitleText: {
      ru: 'Использование информации',
      am: 'Տեղեկատվության օգտագործումը',
      en: 'Use of information',
    },
    infoUseText: {
      ru: 'Мы используем собранную информацию для предоставления наших услуг и для улучшения нашего приложения. Мы можем использовать вашу информацию для связи с вами относительно наших услуг и актуализации наших условий и политик. Мы можем использовать информацию о вашем устройстве для предоставления вам персонализированных рекомендаций и рекламы.',
      am: 'Մենք օգտագործում ենք հավաքագրված տեղեկատվությունը մեր ծառայությունները տրամադրելու և մեր հավելվածը բարելավելու համար: Մենք կարող ենք օգտագործել ձեր տվյալները՝ մեր ծառայությունների վերաբերյալ ձեզ հետ շփվելու և մեր պայմաններն ու քաղաքականությունը թարմացնելու համար: Մենք կարող ենք օգտագործել ձեր սարքի մասին տեղեկությունները` ձեզ անհատականացված առաջարկություններ և գովազդ տրամադրելու համար:',
      en: 'We use the information collected to provide our services and to improve our application. We may use your information to communicate with you regarding our services and to update our terms and policies. We may use information about your device to provide you with personalized recommendations and advertising.',
    },
    infoDisclosureTitleText: {
      ru: 'Раскрытие информации',
      am: 'Տեղեկատվության բացահայտում',
      en: 'Information disclosure',
    },
    infoDisclosureText: {
      ru: 'Мы можем раскрывать вашу информацию третьим сторонам только в случае, если это необходимо для предоставления наших услуг, если мы обязаны сделать это законом, либо если вы дали свое согласие на такое раскрытие.',
      am: 'Մենք կարող ենք բացահայտել ձեր տվյալները երրորդ կողմերին միայն այն դեպքում, եթե դա անհրաժեշտ է մեր ծառայությունները տրամադրելու համար, եթե դա մեզանից պահանջում է օրենքով, կամ եթե դուք տվել եք ձեր համաձայնությունը նման բացահայտմանը:',
      en: 'We may disclose your information to third parties only if it is necessary to provide our services, if we are required by law to do so, or if you have given your consent to such disclosure.',
    },
    infoSecurityTitleText: {
      ru: 'Безопасность информации',
      am: 'Տեղեկատվական անվտանգություն',
      en: 'Information security',
    },
    infoSecurityText: {
      ru: 'Мы принимаем меры для защиты вашей информации от несанкционированного доступа, использования, изменения или раскрытия. Мы ограничиваем доступ к вашей информации только тем сотрудникам, агентам и контрагентам, которым необходим доступ для предоставления наших услуг.',
      am: 'Մենք միջոցներ ենք ձեռնարկում ձեր տեղեկատվությունը չթույլատրված մուտքից, օգտագործումից, փոփոխումից կամ բացահայտումից պաշտպանելու համար: Մենք սահմանափակում ենք ձեր տեղեկատվության հասանելիությունը այն աշխատակիցների, գործակալների և կապալառուների համար, ովքեր մուտքի կարիք ունեն մեր ծառայությունները մատուցելու համար:',
      en: 'We take measures to protect your information from unauthorized access, use, modification or disclosure. We limit access to your information to those employees, agents and contractors who need access to provide our services.',
    },
    policyUpdatesTitleText: {
      ru: 'Обновления политики конфиденциальности',
      am: 'Գաղտնիության քաղաքականության թարմացումներ',
      en: 'Privacy Policy Updates',
    },
    policyUpdatesText: {
      ru: 'Мы можем время от времени обновлять нашу политику конфиденциальности. Мы уведомим вас о любых изменениях, публикуя новую версию политики конфиденциальности в нашем приложении.',
      am: 'Մենք կարող ենք ժամանակ առ ժամանակ թարմացնել մեր գաղտնիության քաղաքականությունը: Մենք ձեզ կտեղեկացնենք ցանկացած փոփոխության մասին՝ մեր հավելվածում տեղադրելով գաղտնիության քաղաքականության նոր տարբերակը:',
      en: 'We may update our privacy policy from time to time. We will notify you of any changes by posting a new version of the privacy policy on our application.',
    },
    yourRightsTitleText: {
      ru: 'Ваши права',
      am: 'Ձեր իրավունքները',
      en: 'Your rights',
    },
    yourRightsText: {
      ru: 'Вы имеете право запросить доступ к вашей информации, внести изменения в вашу информацию, удалить вашу информацию или ограничить ее использование. Вы также можете отозвать свое согласие на использование вашей информации в любое время. Если вы хотите воспользоваться любым из этих прав, свяжитесь с нами через адрес электронной почты, указанный в приложении.',
      am: 'Դուք իրավունք ունեք պահանջելու մուտք գործել ձեր տեղեկությունները, փոփոխություններ կատարել ձեր տեղեկատվության մեջ, ջնջել ձեր տվյալները կամ սահմանափակել ձեր տեղեկատվության օգտագործումը: Դուք կարող եք նաև ցանկացած պահի հետ վերցնել ձեր համաձայնությունը ձեր տեղեկատվության օգտագործման վերաբերյալ: Եթե ցանկանում եք օգտվել այս իրավունքներից որևէ մեկից, խնդրում ենք կապվել մեզ հետ հավելվածում նշված էլ. հասցեի միջոցով:',
      en: 'You have the right to request access to your information, make changes to your information, delete your information, or limit the use of your information. You may also withdraw your consent to the use of your information at any time. If you wish to exercise any of these rights, please contact us via the email address provided in the application.',
    },
    contactUsTitleText: {
      ru: 'Связь с нами',
      am: 'Կապվեք մեզ հետ',
      en: 'Contact us',
    },
    contactUsText: {
      ru: 'Если у вас есть вопросы или замечания относительно нашей политики конфиденциальности или обработки вашей информации, пожалуйста, свяжитесь с нами через электронную почту, указанную в нашем приложении.',
      am: 'Եթե հարցեր կամ մտահոգություններ ունեք մեր գաղտնիության քաղաքականության կամ ձեր տեղեկատվության հետ կապված, խնդրում ենք կապվել մեզ հետ մեր հավելվածում նշված էլ. հասցեի միջոցով:',
      en: 'If you have questions or concerns about our privacy policy or the handling of your information, please contact us via the email address listed in our application.',
    },
    agreementTitleText: {
      ru: 'Согласие',
      am: 'Համաձայնագիր',
      en: 'Agreement',
    },
    agreementText: {
      ru: 'Используя наше приложение, вы соглашаетесь с нашей политикой конфиденциальности и сбором, использованием и раскрытием вашей информации в соответствии с этой политикой.',
      am: 'Օգտագործելով մեր հավելվածը՝ դուք համաձայնում եք մեր գաղտնիության քաղաքականությանը և ձեր տեղեկատվության հավաքագրմանը, օգտագործմանը և բացահայտմանը համաձայն սույն քաղաքականության:',
      en: 'By using our application, you agree to our privacy policy and the collection, use and disclosure of your information in accordance with this policy.',
    },
  },
  terms: {
    titleText: {
      ru: 'Условия использования',
      am: 'Օգտվելու կանոններ',
      en: 'Terms of Use',
    },
    welcomeText: {
      ru: 'Добро пожаловать в наше мобильное приложение! Для использования нашего приложения, Вам необходимо ознакомиться и согласиться с такими условиями использования:',
      am: 'Բարի գալուստ մեր բջջային հավելված: Մեր հավելվածն օգտագործելու համար դուք պետք է կարդաք և համաձայնեք հետևյալ օգտագործման պայմաններին.',
      en: 'Welcome to our mobile application! To use our application, you must read and agree to the following terms of use:',
    },
    copyrightText: {
      ru: 'Авторские права: Все содержимое нашего приложения, такое как тексты, изображения, видео и аудио записи, принадлежит нашей компании и защищено законом об авторских правах. Этот контент можно использовать только для личных целей и не имеете права передавать, распространять или продавать его без нашего письменного согласия.',
      am: 'Հեղինակային իրավունք. Մեր հավելվածի ամբողջ բովանդակությունը, ինչպիսիք են՝ տեքստերը, պատկերները, տեսանյութերը և աուդիո ձայնագրությունները, պատկանում են մեր ընկերությանը և պաշտպանված են հեղինակային իրավունքի մասին օրենքով: Այս բովանդակությունը կարող է օգտագործվել միայն անձնական օգտագործման համար, և դուք չեք կարող այն փոխանցել, տարածել կամ վաճառել առանց մեր գրավոր համաձայնության:',
      en: 'Copyright: All contents of our application, such as texts, images, videos and audio recordings, belong to our company and are protected by copyright law. This content may only be used for personal use and you may not transmit, distribute or sell it without our written consent.',
    },
    usersText: {
      ru: 'Пользователи: Наше приложение предназначено для пользования только взрослыми лицами старше 18 лет. Мы не разрешаем детям использовать наше приложение без разрешения родителей или опекуна.',
      am: 'Օգտագործողներ. Մեր հավելվածը նախատեսված է միայն 18 տարեկանից բարձր մեծահասակների համար: Մենք թույլ չենք տալիս երեխաներին օգտագործել մեր հավելվածը առանց ծնողի կամ խնամակալի թույլտվության:',
      en: 'Users: Our application is intended for use only by adults over 18 years of age. We do not allow children to use our application without the permission of a parent or guardian.',
    },
    userContentText: {
      ru: 'Пользовательский контент: Мы не несем ответственности за контент, который создают пользователи нашего приложения. Мы имеем право удалять любой контент, считаемый неприемлемым, оскорбительным, порнографическим или незаконным.',
      am: 'Օգտագործողի բովանդակություն. Մենք պատասխանատվություն չենք կրում մեր հավելվածի օգտատերերի կողմից ստեղծված բովանդակության համար: Մենք իրավունք ունենք հեռացնելու ցանկացած բովանդակություն, որը մենք համարում ենք անպատշաճ, վիրավորական, պոռնոգրաֆիկ կամ անօրինական:',
      en: 'User Content: We are not responsible for the content created by users of our application. We have the right to remove any content that we deem inappropriate, offensive, pornographic or illegal.',
    },
    confidentalityText: {
      ru: 'Конфиденциальность: Мы заботимся о конфиденциальности Ваших персональных данных и не передаем их третьим лицам без Вашего согласия. Мы используем данные о Вас только для улучшения качества нашего приложения и предоставления Вам персональной услуги.',
      am: 'Գաղտնիություն. Մենք հոգում ենք ձեր անձնական տվյալների գաղտնիության մասին և չենք փոխանցում դրանք երրորդ անձանց առանց ձեր համաձայնության: Մենք օգտագործում ենք ձեր մասին տվյալները միայն մեր հավելվածի որակը բարելավելու և ձեզ անհատականացված ծառայություն մատուցելու համար:',
      en: 'Confidentiality: We care about the confidentiality of your personal data and do not transfer it to third parties without your consent. We use data about you only to improve the quality of our application and provide you with a personalized service.',
    },
    liabliltyText: {
      ru: 'Ответственность: Мы не несем ответственности за любые убытки, которые могут возникнуть в результате использования нашего приложения. Мы рекомендуем всегда быть внимательными и осторожными при использовании нашего приложения и не делать ничего, что может нанести вред вам или другим пользователям.',
      am: 'Պատասխանատվություն. Մենք պատասխանատվություն չենք կրում որևէ վնասի համար, որը կարող է առաջանալ մեր հավելվածն օգտագործելու արդյունքում: Մենք խորհուրդ ենք տալիս միշտ լինել ուշադիր և զգույշ մեր հավելվածն օգտագործելիս և չանել որևէ բան, որը կարող է վնասել ձեզ կամ այլ օգտատերերին:',
      en: 'Liability: We are not responsible for any damages that may arise as a result of using our application. We recommend that you always be careful and cautious when using our application and do not do anything that may harm you or other users.',
    },
    termsText: {
      ru: 'Изменения в условиях использования Мы можем изменять условия использования нашего приложения в любое время и без предварительного уведомления. Обновленные условия будут доступны на нашем приложении. Продолжая использовать наше приложение, Вы соглашаетесь с изменениями в наших условиях.',
      am: 'Օգտագործման պայմանների փոփոխություններ․ Մենք կարող ենք ցանկացած պահի և առանց նախնական ծանուցման փոխել մեր հավելվածի օգտագործման պայմանները: Թարմացված պայմանները հասանելի կլինեն մեր հավելվածում: Շարունակելով օգտվել մեր հավելվածից՝ դուք համաձայնում եք մեր պայմանների փոփոխություններին:',
      en: 'Changes to Terms of Use We may change the terms of use of our application at any time and without prior notice. Updated terms and conditions will be available on our application. By continuing to use our application, you agree to the changes to our terms and conditions.',
    },
    disclaimerText: {
      ru: 'Отказ от ответственности: Мы не гарантируем, что наше приложение будет доступно в любое время и на любом устройстве. Мы не несем ответственности за какие-либо технические ошибки, отключения или сбои нашего приложения.',
      am: 'Հրաժարում պատասխանատվությունից. մենք չենք երաշխավորում, որ մեր հավելվածը հասանելի կլինի միշտ կամ ցանկացած սարքի վրա: Մենք պատասխանատվություն չենք կրում մեր հավելվածի տեխնիկական սխալների, խափանումների կամ ձախողումների համար:',
      en: 'Disclaimer: We do not guarantee that our application will be available at all times or on any device. We are not responsible for any technical errors, outages or failures of our application.',
    },
    paidServicesText: {
      ru: 'Платные услуги: Мы можем предложить платные услуги в нашем приложении. Прежде чем воспользоваться этими услугами, Вы должны ознакомиться с условиями и ценами нашего сервиса.',
      am: 'Վճարովի ծառայություններ. մենք կարող ենք վճարովի ծառայություններ առաջարկել մեր հավելվածում: Նախքան այս ծառայություններից օգտվելը, դուք պետք է ծանոթանաք մեր ծառայության պայմաններին և գներին:',
      en: 'Paid Services: We may offer paid services in our application. Before using these services, you must familiarize yourself with the terms and prices of our service.',
    },
    cancelUsingText: {
      ru: 'Отмена пользования: Мы можем отменить доступ к нашему приложению в любое время и без предварительного уведомления, если вы нарушаете наши условия использования.',
      am: 'Օգտագործման չեղարկում. մենք կարող ենք ցանկացած պահի և առանց ծանուցման չեղարկել ձեր մուտքը մեր հավելված, եթե դուք խախտում եք մեր օգտագործման պայմանները:',
      en: 'Cancellation of Use: We may cancel your access to our application at any time and without notice if you violate our terms of use.',
    },
    thankYouText: {
      ru: 'Спасибо за внимание к нашим условиям использования. Если у Вас есть какие-либо вопросы, пожалуйста, свяжитесь с нашей поддержкой пользователей.',
      am: 'Շնորհակալություն մեր օգտագործման պայմաններին ձեր ուշադրության համար: Եթե ​​ունեք հարցեր, խնդրում ենք կապվել մեր օգտվողների աջակցության հետ:',
      en: 'Thank you for your attention to our terms of use. If you have any questions, please contact our user support.',
    },
  },
  useGoogleModal: {
    useGoogleBtnText: {
      ru: 'Всегда используйте браузер GOOGLE CHROME.',
      am: 'Միշտ օգտագործեք GOOGLE CHROME բրաուզերը:',
      en: 'Always use the GOOGLE CHROME browser.',
    },
    moreDetailsText: {
      ru: 'ПОДРОБНЕЕ!',
      am: 'ԱՎԵԼԻ ՄԱՆՐԱՄԱՍՆ․․',
      en: 'MORE DETAILS!',
    },
    main1Text: {
      ru: 'Мы используем очень дорогую и качественную видеосвязь. Их теххподдержка рекомендует всегда использовать браузер GOOGLE CHROME, чтобы избежать различных проблем с микрофоном и видеосвязью.',
      am: 'Մենք օգտագործում ենք շատ թանկարժեք և որակյալ վիդեոհաղորդակցություն։ Նրանց տեխնիկական աջակցությունը խորհուրդ է տալիս միշտ օգտագործել GOOGLE CHROME ՝ խոսափողի և վիդեոհաղորդակցության հետ կապված տարբեր խնդիրներից խուսափելու համար:',
      en: 'We use very expensive and high-quality video communication. Their technical support recommends always using the GOOGLE CHROME browser to avoid various problems with the microphone and video communication.',
    },
    main2Text: {
      ru: 'Пожалуйста, отнеситесь с пониманием, используйте браузер GOOGLE CHROME, это необходимо для качественной видеосвязи во время урока.',
      am: 'Խնդրում ենք ըմբռնումով մոտենալ և օգտվել GOOGLE CHROME բրաուզերից, սա անհրաժեշտ է դասի ընթացքում բարձրորակ վիդեոհաղորդակցության համար։',
      en: 'Please be understanding and use the GOOGLE CHROME browser, this is necessary for high-quality video communication during the lesson.',
    },
    thankYouText: {
      ru: 'Спасибо, что остаетесь с нами.',
      am: 'Շնորհակալ ենք, որ մնում եք մեզ հետ։',
      en: 'Thank you for staying with us.',
    },
  },
  login: {
    loginText: {
      ru: 'Войдите в свой аккаунт',
      am: 'Մուտք գործեք ձեր հաշիվ',
      en: 'Login To Your Account',
    },
    emailText: {
      ru: 'Электронная почта',
      am: 'Էլ. փոստ',
      en: 'Email',
    },
    passwordText: {
      ru: 'Пароль',
      am: 'Գաղտնաբառ',
      en: 'Password',
    },
    loginBtnText: {
      ru: 'Вход в аккаунт',
      am: 'Մուտք գործել',
      en: 'Login',
    },
    noAccountText: {
      ru: 'Нет аккаунта?',
      am: 'Չունե՞ք հաշիվ:',
      en: "Don't have an account?",
    },
    registerText: {
      ru: 'Зарегистрироваться здесь.',
      am: 'Գրանցվեք այստեղ:',
      en: 'Sign up here.',
    },
    loginWithLichesText: {
      ru: 'Войти через Lichess',
      am: 'Մուտք գործեք Lichess-ի միջոցով',
      en: 'Login With Lichess',
    },
  },
  register: {
    titleText: {
      ru: 'Зарегистрируйтесь, чтобы начать',
      am: 'Գրանցվեք սկսելու համար',
      en: 'Register To Get Started',
    },
    emailText: {
      ru: 'Электронная почта',
      am: 'Էլ. փոստ',
      en: 'Email',
    },
    nameText: {
      ru: 'Имя',
      am: 'Անուն',
      en: 'First Name',
    },
    lastNameText: {
      ru: 'Фамилия',
      am: 'Ազգանուն',
      en: 'Last Name',
    },
    passwordText: {
      ru: 'Пароль',
      am: 'Գաղտնաբառ',
      en: 'Password',
    },
    confirmPasswordText: {
      ru: 'Подтвердите пароль',
      am: 'Հաստատել գաղտնաբառը',
      en: 'Confirm Password',
    },
    acceptTermsText: {
      ru: [
        'Я прочитал, понял и принимаю',
        'Пользовательское соглашение',
        'и',
        'Политику конфиденциальности',
        '.',
      ],
      am: [
        'Ես կարդացել, հասկացել և ընդունել եմ',
        'Օգտագործողի համաձայնագիրը',
        'և',
        'Գաղտնիության քաղաքականությունը',
        '։',
      ],
      en: [
        'I have read, understand and accept the',
        'User Agreement',
        'and',
        'Privacy Policy',
        '․',
      ],
    },
    registerBtnText: {
      ru: 'Пройти регистрацию',
      am: 'Գրանցվել',
      en: 'Register',
    },
    alreadyHaveAccountText: {
      ru: ['У вас уже есть аккаунт?', 'Войдите здесь.'],
      am: ['Արդեն ունե՞ք հաշիվ։', 'Մուտք գործեք այստեղ:'],
      en: ['Already have an account?', 'Log In here.'],
    },
  },
  permission: {
    accessDenied: {
      ru: 'Доступ закрыт. Приостановили уроки.',
      am: 'Մուտքը փակ է: Դադարեցրեց դասերը:',
      en: 'Access denied  . Lessons were suspended.',
    },
  },
  advicesForTraners: {
    title: {
      ru: 'Советы для тренеров',
      am: 'Մարզիչների խորհուրդներ',
      en: 'Advices for Trainers',
    },
    redTextAbove: {
      ru: 'Красный текст сверху',
      am: 'Կարմիր տեքստ վերևում',
      en: 'Red text above',
    },
    addVideo: {
      ru: 'Добавить видео',
      en: 'Add Video',
      am: 'Ավելացնել տեսանյութ',
    },
    deleteBlock: {
      ru: 'Удалить блок',
      en: 'Delete Block',
      am: 'Ջնջել բլոկը',
    },
    addBlock: {
      ru: 'Добавить новый блок',
      en: 'Add New Block',
      am: 'Ավելացնել նոր բլոկ',
    },
    dataSaved: {
      ru: 'Данные сохранены',
      en: 'Data saved',
      am: 'Տվյալները պահպանվել են',
    },
    saveChanges: {
      ru: 'Сохранить все изменения',
      en: 'Save All Changes',
      am: 'Պահպանել բոլոր փոփոխությունները',
    },
    successMessage: {
      ru: 'Данные сохранены',
      en: 'Data saved',
      am: 'Տվյալները պահպանվել են',
    },
    close: {
      ru: 'Закрыть',
      en: 'Close',
      am: 'Փակել',
    },
    videos: {
      ru: 'Видео',
      en: 'Videos',
      am: 'Տեսանյութեր',
    },
    content: {
      ru: 'Содержимое',
      en: 'Content',
      am: 'Կառուցվածք',
    },
  },
  autoSMS: {
    addText: {
      ru: 'Добавить',
      am: 'Ավելացնել',
      en: 'Add',
    },
    addNotification: {
      ru: "Добавить уведомление",
      am: "Ավելացնել ծանուցում",
      en: "Add notification"
    },
    schoolNotifications: {
      ru: "Уведомления/напоминания школы",
      am: "Վարորդներ/հիշեցումներ դպրոցի համար",
      en: "School notifications/reminders"
    },
    addAdditionalNotifications: {
      ru: "Добавить дополнительные уведомления",
      am: "Ավելացնել լրացուցիչ ծանուցումներ",
      en: "Add additional notifications"
    },
    myNotifications: {
      ru: "Мои уведомления/напоминания",
      am: "Իմ ծանուցումները/հիշեցումները",
      en: "My notifications/reminders"
    },
    addNotificationsForYourself: {
      ru: "Добавить Уведомление/Напоминание для себя",
      am: "Ավելացնել ծանուցում/հիշեցում ինքներդ ձեզ համար",
      en: "Add Notification/Reminder for yourself"
    },
    moreDetails: {
      ru: "Подробнее",
      am: "Ավելի մանրամասն",
      en: "More details"
    },
    deleteNotification: {
      ru: "Удалить уведомление?",
      am: "Հեռացնել ծանուցումը:",
      en: "Delete notification?"
    },
    sendReminderTo: {
      ru: "Данное напоминание отправить и в этой группе, и в чате Уведомления/Напоминания",
      am: "Այս հիշեցումը ուղարկել ինչպես այս խմբում, այնպես էլ Ծանուցումներ/Հիշեցումներ չաթում",
      en: "Send this reminder both in this group and in the Notifications/Reminders chat"
    },
    activeNotifications: {
      ru: "Действующие уведомления",
      am: "Գործող ծանուցումներ",
      en: "Active notifications"
    },
    chatNotifications: {
      ru: "Чат Уведомления/Напоминания",
      am: "Ծ Chat Уведомления/Напоминания",
      en: "Chat Notifications/Reminders"
    },
    textT: {
      ru: "Текст",
      am: "Տեքստ",
      en: "Text"
    },
    nameT: {
      ru: "Название",
      am: "Վերնագիր",
      en: "Title"
    },
    save: {
      ru: "Сохранить",
      am: "Պահպանել",
      en: "Save"    
    },
    edit: {
      ru: "Редактировать",
      am: "Խմբագրել",
      en: "Edit"
    },
    closeText: {
      ru: "Закрыть",
      am: "Փակել",
      en: "Close"
    },
    cancelText: {
      ru: "Отмена",
      am: "Չեղարկել",
      en: "Cancel"
    },
    yesText: {
      ru: "Да",
      am: "Այո",
      en: "Yes"
    },
    willBeInLesson: {
      ru: "Будем на уроке",
      am: "Կլինենք դասին",
      en: "We will be in the lesson"
    },
    willNotBeInLesson: {
      ru: "Не будем на уроке",
      am: "Չենք լինելու դասին",
      en: "We will not be in the lesson"
    }
  },
  estimate: {
    rateCoachWorkText: {
      ru: "Оцените работу тренера:",
      am: "Արժեքեք մարզչի աշխատանքը:",
      en: "Rate the coach's work:"
    },
  saveText: {
      ru: "Сохранить",
      am: "Պահպանել",
      en: "Save"
    },
    groupText: {
      ru: 'Группа',
      am: 'Խումբ',
      en: 'Group',
    },
    dateText: {
      ru: 'Дата',
      am: 'Ամսաթիվը',
      en: 'Date',
    },
    anotherGradeText: {
      ru: 'Добавить еще одну оценку и комментарий',
      en: 'Add another grade and comment',
      am: 'Ավելացնել ևս մեկ գնահատական և մեկնաբանություն'
    },
    alreadyHaveGradeText: {
      ru: 'Вы уже поставили оценку и написали комментарий на этот урок',
      en: 'You have already given a grade and written a comment for this lesson',
      am: 'Դուք արդեն գնահատական եք տվել և մեկնաբանություն գրել այս դասի համար'
    },
    noCommentText: {
      ru: "Без комментариев",
      am: "Մեկնաբանություններ չկան",
      en: "No comments"
    },
    leaveReviewText: {
      ru: "Оставить отзыв",
      am: "Թողնել կարծիք",
      en: "Leave a review"
    },
    canSeeReviews: {
      ru: "Кто видит отзыв:",
      am: "Ով կարող է տեսնել կարծիքը:",
      en: "Who can see the review:"
    },
    administrationText: {
      ru: "Администрация",
      am: "Ադմինիստրացիա",
      en: "Administration"
    },
    leaveAdministrationComment: {
      ru: "Оставить комментарий администрации",
      am: "Թողնել մեկնաբանություն ադմինիստրացիայի համար",
      en: "Leave a comment for the administration"
    },
    coachText: {
      ru: "Тренер",
      am: "Մարզիչ",
      en: "Coach"
    },
    allParentsText: {
      ru: "Тренер и все родители чата, если они есть",
      am: "Մարզիչը և չատի բոլոր ծնողները, եթե նրանք կան",
      en: "Trainer and all chat parents, if any"
    },
    sendText: {
      ru: "Отправить",
      am: "Ուղարկել",
      en: "Send"
    },
    avgGradeText: {
      ru: "Средняя оценка за все уроки:",
      am: "Միջին գնահատականը բոլոր դասերի համար:",
      en: "Average grade for all lessons:"
    },
    ratingText: {
      ru: "Оценка:",
      am: "Գնահատական:",
      en: "Rating:"
    },
    toWhomText: {
      ru: "ФИО тренера, кто провёл урок:",
      am: "Դասը անցկացրած մարզչի անուն, ազգանունը:",
      en: "Full name of the trainer who conducted the lesson:"
    },
    fromWhomText: {
      ru: "От кого:",
      am: "Ովից:",
      en: "From whom:"
    },
    administrationComment: {
      ru: "Комментарий администрации:",
      am: "Ադմինիստրացիայի մեկնաբանությունը:",
      en: "Administration's comment:"
    },
    noRating: {
      ru: "Пока оценок нет",
      am: "Պահ Moment: չի եղել գնահատականներ",
      en: "No ratings yet"
    },
    commentText: {
      ru: "Комментарий:",
      am: "Մեկնաբանություն:",
      en: "Comment:"
    }
  },
  infoTexts: {
    categoryName: {
      ru: 'Название категории',
      en: 'Category name',
      am: 'Կամաղիությունի անվանումը',
    },
    saveText: {
      ru: "Сохранить",
      am: "Պահպանել",
      en: "Save"
    },
    closeText: {
      ru: "Закрыть",
      am: "Փակել",
      en: "Close"
    },
    successfullText: {
      ru: "Успешно!",
      am: "Հաջողությամբ!",
      en: "Successfully!"
    },
    dataSavedText: {
      ru: "Данные сохранены",
      am: "Տվյալները պահպանվել են",
      en: "Data saved"
    },
    searchText: {
      ru: "Поиск",
      am: "Որոնում",
      en: "Search"
    }
  }
};

export const repeatOptionsTranslations = {
  [RepeatOptions.None]: {
    ru: "Не повторять",
    am: "Չկրկնել",
    en: "Do not repeat"
  },
  [RepeatOptions.Daily]: {
    ru: "Ежедневно",
    am: "Ամեն օր",
    en: "Daily"
  },
  [RepeatOptions.Weekly]: {
    ru: "Еженедельно",
    am: "Ամեն շաբաթ",
    en: "Weekly"
  },
  [RepeatOptions.Monthly]: {
    ru: "Ежемесячно",
    am: "Ամեն ամիս",
    en: "Monthly"
  },
  [RepeatOptions.Yearly]: {
    ru: "Каждый год",
    am: "Ամեն տարի",
    en: "Yearly"
  }
};

export const unitsTranslations = {
  [Units.MINUTES]: {
    ru: 'мин.',
    am: 'րոպե',
    en: 'min.'
  },
  [Units.HOURS]: {
    ru: 'ч.',
    am: 'ժամ.',
    en: 'hr.'
  },
  [Units.DAYS]: {
    ru: 'дн.',
    am: 'օր.',
    en: 'days'
  },
  [Units.WEEKS]: {
    ru: 'нед.',
    am: 'շաբաթ',
    en: 'weeks'
  }
};