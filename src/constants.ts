import amFlag from './assets/flags/am.png';
import enFlag from './assets/flags/en.png';
import ruFlag from './assets/flags/ru.png';
import {
  ELessonFormatTypes,
} from './models/User.ts';
import { EUserLanguages } from './models/EUserLanguages.ts';
import { Elanguages } from './store/reducers/TranslateSlice.ts';
import { ITranslateItemString, translations } from './utils/translations.tsx';
import { ECountries } from './models/ECountries.ts';

const {
  armenianText,
  russianText,
  englishText,
  frenchText,
  germanText,
  hindiText,
  spanishText,
  itaianText,
  russiaText,
  europeText,
  americaText,
  canadaText,
  armeniaText,
  groupText,
  individualText,
  groupPlusIndividualText,
} = translations.profile;

export type SelectOptions<T> = {
    [key in T as string]: {
        text: ITranslateItemString,
        slug: T
    }
}
export type UserLanguagesSelectOptions = SelectOptions<EUserLanguages>;

export type UserCountiesSelectOptions = SelectOptions<ECountries>;

export type UserFormatOptions = SelectOptions<ELessonFormatTypes>;


export const languages: {
  [key in Elanguages]: {
    text: Elanguages;
    img: string;
    name: string;
    shortName: string;
  };
} = {
  ru: {
    text: Elanguages.RU,
    img: ruFlag,
    name: 'Русский',
    shortName: 'RUS',
  },
  am: {
    text: Elanguages.AM,
    img: amFlag,
    name: 'Հայերեն',
    shortName: 'ARM',
  },
  en: {
    text: Elanguages.EN,
    img: enFlag,
    name: 'English',
    shortName: 'ENG',
  },
};

export const lessonFormatTypes: UserFormatOptions = {
  [ELessonFormatTypes.GROUP]: {
    slug: ELessonFormatTypes.GROUP,
    text: groupText,
  },
  [ELessonFormatTypes.IND]: {
    slug: ELessonFormatTypes.IND,
    text: individualText,
  },
  [ELessonFormatTypes.GROUPIND]: {
    slug: ELessonFormatTypes.GROUPIND,
    text: groupPlusIndividualText,
  },
};

export const themesForLessonRestriction = 3;

export const userCountries: UserCountiesSelectOptions = {
  [ECountries.ARMENIA]: {
    slug: ECountries.ARMENIA,
    text: armeniaText,
  },
  [ECountries.RUSSIA]: {
    slug: ECountries.RUSSIA,
    text: russiaText,
  },
  [ECountries.EUROPA]: {
    slug: ECountries.EUROPA,
    text: europeText
  },
  [ECountries.AMERICA]: {
    slug: ECountries.AMERICA,
    text: americaText,
  },
  [ECountries.CANADA]: {
    slug: ECountries.CANADA,
    text: canadaText,
  },
  [ECountries.GERMANY]: {
    slug: ECountries.GERMANY,
    text: {
      am: 'Գերմանիա',
      ru: 'Германия',
      en: 'Germany',
    },
  },
  [ECountries.FRANCE]: {
    slug: ECountries.FRANCE,
    text: {
      am: 'Ֆրանսիա',
      ru: 'Франция',
      en: 'France',
    },
  },
  [ECountries.ITALY]: {
    slug: ECountries.ITALY,
    text: {
      am: 'Իտալիա',
      ru: 'Италия',
      en: 'Italy',
    },
  },
  [ECountries.SPAIN]: {
    slug: ECountries.SPAIN,
    text: {
      am: 'Իսպանիա',
      ru: 'Испания',
      en: 'Spain',
    },
  },
  [ECountries.UKRAINE]: {
    slug: ECountries.UKRAINE,
    text: {
      am: 'Ուկրաինա',
      ru: 'Украина',
      en: 'Ukraine',
    },
  },
  [ECountries.POLAND]: {
    slug: ECountries.POLAND,
    text: {
      am: 'Լեհաստան',
      ru: 'Польша',
      en: 'Poland',
    },
  },
  [ECountries.BRAZIL]: {
    slug: ECountries.BRAZIL,
    text: {
      am: 'Բրազիլիա',
      ru: 'Бразилия',
      en: 'Brazil',
    },
  },
  [ECountries.JAPAN]: {
    slug: ECountries.JAPAN,
    text: {
      am: 'Ճապոնիա',
      ru: 'Япония',
      en: 'Japan',
    },
  },
  [ECountries.AUSTRALIA]: {
    slug: ECountries.AUSTRALIA,
    text: {
      am: 'Ավստրալիա',
      ru: 'Австралия',
      en: 'Australia',
    },
  },
  [ECountries.CHINA]: {
    slug: ECountries.CHINA,
    text: {
      am: 'Չինաստան',
      ru: 'Китай',
      en: 'China',
    },
  },
  [ECountries.UNITED_STATES]: {
    slug: ECountries.UNITED_STATES,
    text: {
      am: 'Միացյալ Նահանգներ',
      ru: 'США',
      en: 'United States',
    },
  },
  [ECountries.UNITED_KINGDOM]: {
    slug: ECountries.UNITED_KINGDOM,
    text: {
      am: 'Միացյալ Թագավորություն',
      ru: 'Великобритания',
      en: 'United Kingdom',
    },
  },
  [ECountries.INDIA]: {
    slug: ECountries.INDIA,
    text: {
      am: 'Հնդկաստան',
      ru: 'Индия',
      en: 'India',
    },
  },
  [ECountries.SOUTH_AFRICA]: {
    slug: ECountries.SOUTH_AFRICA,
    text: {
      am: 'Հարավային Աֆրիկա',
      ru: 'Южная Африка',
      en: 'South Africa',
    },
  },
  [ECountries.MEXICO]: {
    slug: ECountries.MEXICO,
    text: {
      am: 'Մեքսիկա',
      ru: 'Мексика',
      en: 'Mexico',
    },
  },
  [ECountries.BELGIUM]: {
    slug: ECountries.BELGIUM,
    text: {
      am: 'Բելգիա',
      ru: 'Бельгия',
      en: 'Belgium',
    },
  },
  [ECountries.NETHERLANDS]: {
    slug: ECountries.NETHERLANDS,
    text: {
      am: 'Նիդեռլանդներ',
      ru: 'Нидерланды',
      en: 'Netherlands',
    },
  },
  [ECountries.SWITZERLAND]: {
    slug: ECountries.SWITZERLAND,
    text: {
      am: 'Շվեյցարիա',
      ru: 'Швейцария',
      en: 'Switzerland',
    },
  },
  [ECountries.SWEDEN]: {
    slug: ECountries.SWEDEN,
    text: {
      am: 'Շվեդիա',
      ru: 'Швеция',
      en: 'Sweden',
    },
  },
  [ECountries.NORWAY]: {
    slug: ECountries.NORWAY,
    text: {
      am: 'Նորվեգիա',
      ru: 'Норвегия',
      en: 'Norway',
    },
  },
  [ECountries.FINLAND]: {
    slug: ECountries.FINLAND,
    text: {
      am: 'Ֆինլանդիա',
      ru: 'Финляндия',
      en: 'Finland',
    },
  },
  [ECountries.DENMARK]: {
    slug: ECountries.DENMARK,
    text: {
      am: 'Դանիա',
      ru: 'Дания',
      en: 'Denmark',
    },
  },
  [ECountries.AUSTRIA]: {
    slug: ECountries.AUSTRIA,
    text: {
      am: 'Ավստրիա',
      ru: 'Австрия',
      en: 'Austria',
    },
  },
  [ECountries.GREECE]: {
    slug: ECountries.GREECE,
    text: {
      am: 'Հունաստան',
      ru: 'Греция',
      en: 'Greece',
    },
  },
  [ECountries.PORTUGAL]: {
    slug: ECountries.PORTUGAL,
    text: {
      am: 'Պորտուգալիա',
      ru: 'Португалия',
      en: 'Portugal',
    },
  },
  [ECountries.CZECH_REPUBLIC]: {
    slug: ECountries.CZECH_REPUBLIC,
    text: {
      am: 'Չեխիա',
      ru: 'Чехия',
      en: 'Czech Republic',
    },
  },
  [ECountries.HUNGARY]: {
    slug: ECountries.HUNGARY,
    text: {
      am: 'Հունգարիա',
      ru: 'Венгрия',
      en: 'Hungary',
    },
  },
  [ECountries.ROMANIA]: {
    slug: ECountries.ROMANIA,
    text: {
      am: 'Ռումինիա',
      ru: 'Румыния',
      en: 'Romania',
    },
  },
  [ECountries.BULGARIA]: {
    slug: ECountries.BULGARIA,
    text: {
      am: 'Բուլղարիա',
      ru: 'Болгария',
      en: 'Bulgaria',
    },
  },
  [ECountries.SLOVAKIA]: {
    slug: ECountries.SLOVAKIA,
    text: {
      am: 'Սլովակիա',
      ru: 'Словакия',
      en: 'Slovakia',
    },
  },
  [ECountries.SERBIA]: {
    slug: ECountries.SERBIA,
    text: {
      am: 'Սերբիա',
      ru: 'Сербия',
      en: 'Serbia',
    },
  },
  [ECountries.CROATIA]: {
    slug: ECountries.CROATIA,
    text: {
      am: 'Խորվաթիա',
      ru: 'Хорватия',
      en: 'Croatia',
    },
  },
  [ECountries.LITHUANIA]: {
    slug: ECountries.LITHUANIA,
    text: {
      am: 'Լիտվա',
      ru: 'Литва',
      en: 'Lithuania',
    },
  },
  [ECountries.LATVIA]: {
    slug: ECountries.LATVIA,
    text: {
      am: 'Լատվիա',
      ru: 'Латвия',
      en: 'Latvia',
    },
  },
  [ECountries.ESTONIA]: {
    slug: ECountries.ESTONIA,
    text: {
      am: 'Էստոնիա',
      ru: 'Эстония',
      en: 'Estonia',
    },
  },
  [ECountries.ICELAND]: {
    slug: ECountries.ICELAND,
    text: {
      am: 'Իսլանդիա',
      ru: 'Исландия',
      en: 'Iceland',
    },
  },
  [ECountries.AZERBAIJAN]: {
    slug: ECountries.AZERBAIJAN,
    text: {
      am: 'Ադրբեջան',
      ru: 'Азербайджан',
      en: 'Azerbaijan',
    },
  },
  [ECountries.KAZAKHSTAN]: {
    slug: ECountries.KAZAKHSTAN,
    text: {
      am: 'Ղազախստան',
      ru: 'Казахстан',
      en: 'Kazakhstan',
    },
  },
  [ECountries.SOUTH_KOREA]: {
    slug: ECountries.SOUTH_KOREA,
    text: {
      am: 'Հարավային Կորեա',
      ru: 'Южная Корея',
      en: 'South Korea',
    },
  },
  [ECountries.SAUDI_ARABIA]: {
    slug: ECountries.SAUDI_ARABIA,
    text: {
      am: 'Սաուդյան Արաբիա',
      ru: 'Саудовская Аравия',
      en: 'Saudi Arabia',
    },
  },
  [ECountries.UNITED_ARAB_EMIRATES]: {
    slug: ECountries.UNITED_ARAB_EMIRATES,
    text: {
      am: 'Միացյալ Արաբական Էմիրություններ',
      ru: 'Объединенные Арабские Эмираты',
      en: 'United Arab Emirates',
    },
  },
  [ECountries.IRAN]: {
    slug: ECountries.IRAN,
    text: {
      am: 'Իրան',
      ru: 'Иран',
      en: 'Iran',
    },
  },
  [ECountries.IRAQ]: {
    slug: ECountries.IRAQ,
    text: {
      am: 'Իրաք',
      ru: 'Ирак',
      en: 'Iraq',
    },
  },
  [ECountries.TURKEY]: {
    slug: ECountries.TURKEY,
    text: {
      am: 'Թուրքիա',
      ru: 'Турция',
      en: 'Turkey',
    },
  },
  [ECountries.ISRAEL]: {
    slug: ECountries.ISRAEL,
    text: {
      am: 'Իսրայել',
      ru: 'Израиль',
      en: 'Israel',
    },
  },
  [ECountries.JORDAN]: {
    slug: ECountries.JORDAN,
    text: {
      am: 'Հորդանան',
      ru: 'Иордания',
      en: 'Jordan',
    },
  },
  [ECountries.LEBANON]: {
    slug: ECountries.LEBANON,
    text: {
      am: 'Լիբանան',
      ru: 'Ливан',
      en: 'Lebanon',
    },
  },
  [ECountries.SYRIA]: {
    slug: ECountries.SYRIA,
    text: {
      am: 'Սիրիա',
      ru: 'Сирия',
      en: 'Syria',
    },
  },
  [ECountries.SRI_LANKA]: {
    slug: ECountries.SRI_LANKA,
    text: {
      am: 'Շրի Լանկա',
      ru: 'Шри-Ланка',
      en: 'Sri Lanka',
    },
  },
  [ECountries.UZBEKISTAN]: {
    slug: ECountries.UZBEKISTAN,
    text: {
      am: 'Ուզբեկստան',
      ru: 'Узбекистан',
      en: 'Uzbekistan',
    },
  },
  [ECountries.KYRGYZSTAN]: {
    slug: ECountries.KYRGYZSTAN,
    text: {
      am: 'Կիրգիզստան',
      ru: 'Киргизия',
      en: 'Kyrgyzstan',
    },
  },
  [ECountries.TAJIKISTAN]: {
    slug: ECountries.TAJIKISTAN,
    text: {
      am: 'Տաջիկստան',
      ru: 'Таджикистан',
      en: 'Tajikistan',
    },
  },
  [ECountries.TURKMENISTAN]: {
    slug: ECountries.TURKMENISTAN,
    text: {
      am: 'Թուրքմենստան',
      ru: 'Туркменистан',
      en: 'Turkmenistan',
    },
  },
  [ECountries.GEORGIA]: {
    slug: ECountries.GEORGIA,
    text: {
      am: 'Վրաստան',
      ru: 'Грузия',
      en: 'Georgia',
    },
  },
  [ECountries.EGYPT]: {
    slug: ECountries.EGYPT,
    text: {
      am: 'Եգիպտոս',
      ru: 'Египет',
      en: 'Egypt',
    },
  },
  [ECountries.NIGERIA]: {
    slug: ECountries.NIGERIA,
    text: {
      am: 'Նիգերիա',
      ru: 'Нигерия',
      en: 'Nigeria',
    },
  },
  [ECountries.KENYA]: {
    slug: ECountries.KENYA,
    text: {
      am: 'Քենիա',
      ru: 'Кения',
      en: 'Kenya',
    },
  },
  [ECountries.ETHIOPIA]: {
    slug: ECountries.ETHIOPIA,
    text: {
      am: 'Էթովպիա',
      ru: 'Эфиопия',
      en: 'Ethiopia',
    },
  },
  [ECountries.MOROCCO]: {
    slug: ECountries.MOROCCO,
    text: {
      am: 'Մարոկկո',
      ru: 'Марокко',
      en: 'Morocco',
    },
  },
  [ECountries.ALGERIA]: {
    slug: ECountries.ALGERIA,
    text: {
      am: 'Ալժիր',
      ru: 'Алжир',
      en: 'Algeria',
    },
  },
  [ECountries.TUNISIA]: {
    slug: ECountries.TUNISIA,
    text: {
      am: 'Թունիս',
      ru: 'Тунис',
      en: 'Tunisia',
    },
  },
  [ECountries.GHANA]: {
    slug: ECountries.GHANA,
    text: {
      am: 'Գանա',
      ru: 'Гана',
      en: 'Ghana',
    },
  },
  [ECountries.TANZANIA]: {
    slug: ECountries.TANZANIA,
    text: {
      am: 'Տանզանիա',
      ru: 'Танзания',
      en: 'Tanzania',
    },
  },
  [ECountries.UGANDA]: {
    slug: ECountries.UGANDA,
    text: {
      am: 'Ուգանդա',
      ru: 'Уганда',
      en: 'Uganda',
    },
  },
  [ECountries.ZAMBIA]: {
    slug: ECountries.ZAMBIA,
    text: {
      am: 'Զամբիա',
      ru: 'Замбия',
      en: 'Zambia',
    },
  },
  [ECountries.ZIMBABWE]: {
    slug: ECountries.ZIMBABWE,
    text: {
      am: 'Զիմբաբվե',
      ru: 'Зимбабве',
      en: 'Zimbabwe',
    },
  },
  [ECountries.NEW_ZEALAND]: {
    slug: ECountries.NEW_ZEALAND,
    text: {
      am: 'Նոր Զելանդիա',
      ru: 'Новая Зеландия',
      en: 'New Zealand',
    },
  },
  [ECountries.FIJI]: {
    slug: ECountries.FIJI,
    text: {
      am: 'Ֆիջի',
      ru: 'Фиджи',
      en: 'Fiji',
    },
  },
  [ECountries.PAPUA_NEW_GUINEA]: {
    slug: ECountries.PAPUA_NEW_GUINEA,
    text: {
      am: 'Պապուա Նոր Գվինեա',
      ru: 'Папуа-Новая Гвинея',
      en: 'Papua New Guinea',
    },
  },
  [ECountries.SAMOA]: {
    slug: ECountries.SAMOA,
    text: {
      am: 'Սամոա',
      ru: 'Самоа',
      en: 'Samoa',
    },
  },
};

export const userLanguages: UserLanguagesSelectOptions = {
  [EUserLanguages.RUS]: {
    text: russianText,
    slug: EUserLanguages.RUS,
  },
  [EUserLanguages.ARM]: {
    text: armenianText,
    slug: EUserLanguages.ARM,
  },
  [EUserLanguages.ENG]: {
    text: englishText,
    slug: EUserLanguages.ENG,
  },
  [EUserLanguages.FRA]: {
    text: frenchText,
    slug: EUserLanguages.FRA,
  },
  [EUserLanguages.GER]: {
    text: germanText,
    slug: EUserLanguages.GER,
  },
  [EUserLanguages.HINDI]: {
    text: hindiText,
    slug: EUserLanguages.HINDI,
  },
  [EUserLanguages.SPA]: {
    text: spanishText,
    slug: EUserLanguages.SPA,
  },
  [EUserLanguages.ITA]: {
    text: itaianText,
    slug: EUserLanguages.ITA,
  },
  [EUserLanguages.POR]: {
    text: {
      am: 'Պորտուգալերեն',
      ru: 'Португальский',
      en: 'Portuguese',
    },
    slug: EUserLanguages.POR,
  },
  [EUserLanguages.CHI]: {
    text: {
      am: 'Չինարեն',
      ru: 'Китайский',
      en: 'Chinese',
    },
    slug: EUserLanguages.CHI,
  },
  [EUserLanguages.JPN]: {
    text: {
      am: 'Ճապոներեն',
      ru: 'Японский',
      en: 'Japanese',
    },
    slug: EUserLanguages.JPN,
  },
  [EUserLanguages.KOR]: {
    text: {
      am: 'Կորեերեն',
      ru: 'Корейский',
      en: 'Korean',
    },
    slug: EUserLanguages.KOR,
  },
  [EUserLanguages.ARA]: {
    text: {
      am: 'Արաբերեն',
      ru: 'Арабский',
      en: 'Arabic',
    },
    slug: EUserLanguages.ARA,
  },
  [EUserLanguages.TUR]: {
    text: {
      am: 'Թուրքերեն',
      ru: 'Турецкий',
      en: 'Turkish',
    },
    slug: EUserLanguages.TUR,
  },
  [EUserLanguages.UKR]: {
    text: {
      am: 'Ուկրաիներեն',
      ru: 'Украинский',
      en: 'Ukrainian',
    },
    slug: EUserLanguages.UKR,
  },
  [EUserLanguages.POL]: {
    text: {
      am: 'Լեհերեն',
      ru: 'Польский',
      en: 'Polish',
    },
    slug: EUserLanguages.POL,
  },
  [EUserLanguages.DUT]: {
    text: {
      am: 'Հոլանդերեն',
      ru: 'Голландский',
      en: 'Dutch',
    },
    slug: EUserLanguages.DUT,
  },
  [EUserLanguages.SWE]: {
    text: {
      am: 'Շվեդերեն',
      ru: 'Шведский',
      en: 'Swedish',
    },
    slug: EUserLanguages.SWE,
  },
  [EUserLanguages.NOR]: {
    text: {
      am: 'Նորվեգերեն',
      ru: 'Норвежский',
      en: 'Norwegian',
    },
    slug: EUserLanguages.NOR,
  },
  [EUserLanguages.DAN]: {
    text: {
      am: 'Դանիերեն',
      ru: 'Датский',
      en: 'Danish',
    },
    slug: EUserLanguages.DAN,
  },
  [EUserLanguages.FIN]: {
    text: {
      am: 'Ֆիններեն',
      ru: 'Финский',
      en: 'Finnish',
    },
    slug: EUserLanguages.FIN,
  },
  [EUserLanguages.GRE]: {
    text: {
      am: 'Հունարեն',
      ru: 'Греческий',
      en: 'Greek',
    },
    slug: EUserLanguages.GRE,
  },
  [EUserLanguages.HEB]: {
    text: {
      am: 'Եբրայերեն',
      ru: 'Иврит',
      en: 'Hebrew',
    },
    slug: EUserLanguages.HEB,
  },
  [EUserLanguages.THA]: {
    text: {
      am: 'Թայերեն',
      ru: 'Тайский',
      en: 'Thai',
    },
    slug: EUserLanguages.THA,
  },
  [EUserLanguages.VIE]: {
    text: {
      am: 'Վիետնամերեն',
      ru: 'Вьетнамский',
      en: 'Vietnamese',
    },
    slug: EUserLanguages.VIE,
  },
  [EUserLanguages.IND]: {
    text: {
      am: 'Ինդոնեզերեն',
      ru: 'Индонезийский',
      en: 'Indonesian',
    },
    slug: EUserLanguages.IND,
  },
  [EUserLanguages.MAL]: {
    text: {
      am: 'Մալայերեն',
      ru: 'Малайский',
      en: 'Malay',
    },
    slug: EUserLanguages.MAL,
  },
  [EUserLanguages.BEN]: {
    text: {
      am: 'Բենգալերեն',
      ru: 'Бенгальский',
      en: 'Bengali',
    },
    slug: EUserLanguages.BEN,
  },
  [EUserLanguages.URD]: {
    text: {
      am: 'Ուրդու',
      ru: 'Урду',
      en: 'Urdu',
    },
    slug: EUserLanguages.URD,
  },
  [EUserLanguages.PER]: {
    text: {
      am: 'Պարսկերեն',
      ru: 'Персидский',
      en: 'Persian',
    },
    slug: EUserLanguages.PER,
  },
  [EUserLanguages.TGL]: {
    text: {
      am: 'Թագալերեն',
      ru: 'Тагальский',
      en: 'Tagalog',
    },
    slug: EUserLanguages.TGL,
  },
  [EUserLanguages.CZE]: {
    text: {
      am: 'Չեխերեն',
      ru: 'Чешский',
      en: 'Czech',
    },
    slug: EUserLanguages.CZE,
  },
  [EUserLanguages.HUN]: {
    text: {
      am: 'Հունգարերեն',
      ru: 'Венгерский',
      en: 'Hungarian',
    },
    slug: EUserLanguages.HUN,
  },
  [EUserLanguages.SLO]: {
    text: {
      am: 'Սլովակերեն',
      ru: 'Словацкий',
      en: 'Slovak',
    },
    slug: EUserLanguages.SLO,
  },
  [EUserLanguages.SRB]: {
    text: {
      am: 'Սերբերեն',
      ru: 'Сербский',
      en: 'Serbian',
    },
    slug: EUserLanguages.SRB,
  },
  [EUserLanguages.CRO]: {
    text: {
      am: 'Խորվաթերեն',
      ru: 'Хорватский',
      en: 'Croatian',
    },
    slug: EUserLanguages.CRO,
  },
  [EUserLanguages.BUL]: {
    text: {
      am: 'Բուլղարերեն',
      ru: 'Болгарский',
      en: 'Bulgarian',
    },
    slug: EUserLanguages.BUL,
  },
  [EUserLanguages.ROM]: {
    text: {
      am: 'Ռումիներեն',
      ru: 'Румынский',
      en: 'Romanian',
    },
    slug: EUserLanguages.ROM,
  },
  [EUserLanguages.LIT]: {
    text: {
      am: 'Լիտվերեն',
      ru: 'Литовский',
      en: 'Lithuanian',
    },
    slug: EUserLanguages.LIT,
  },
  [EUserLanguages.LAT]: {
    text: {
      am: 'Լատիշերեն',
      ru: 'Латышский',
      en: 'Latvian',
    },
    slug: EUserLanguages.LAT,
  },
  [EUserLanguages.EST]: {
    text: {
      am: 'Էստոներեն',
      ru: 'Эстонский',
      en: 'Estonian',
    },
    slug: EUserLanguages.EST,
  },
  [EUserLanguages.SLV]: {
    text: {
      am: 'Սլովեներեն',
      ru: 'Словенский',
      en: 'Slovenian',
    },
    slug: EUserLanguages.SLV,
  },
  [EUserLanguages.ISL]: {
    text: {
      am: 'Իսլանդերեն',
      ru: 'Исландский',
      en: 'Icelandic',
    },
    slug: EUserLanguages.ISL,
  },
  [EUserLanguages.AFR]: {
    text: {
      am: 'Աֆրիկաանս',
      ru: 'Африкаанс',
      en: 'Afrikaans',
    },
    slug: EUserLanguages.AFR,
  },
  [EUserLanguages.SWA]: {
    text: {
      am: 'Սուահիլի',
      ru: 'Суахили',
      en: 'Swahili',
    },
    slug: EUserLanguages.SWA,
  },
  [EUserLanguages.ZUL]: {
    text: {
      am: 'Զուլու',
      ru: 'Зулу',
      en: 'Zulu',
    },
    slug: EUserLanguages.ZUL,
  },
};