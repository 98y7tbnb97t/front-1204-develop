import { SelectOptions } from "../constants";

export enum ECities {
  // Европа
  MOSCOW = 'Moscow',
  PARIS = 'Paris',
  BERLIN = 'Berlin',
  MADRID = 'Madrid',
  ROME = 'Rome',
  VIENNA = 'Vienna',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  OSLO = 'Oslo',
  STOCKHOLM = 'Stockholm',
  HELSINKI = 'Helsinki',
  COPENHAGEN = 'Copenhagen',
  WARSAW = 'Warsaw',
  PRAGUE = 'Prague',
  BUDAPEST = 'Budapest',
  BUCHAREST = 'Bucharest',
  BELGRADE = 'Belgrade',
  ZAGREB = 'Zagreb',
  LJUBLJANA = 'Ljubljana',
  SOFIA = 'Sofia',
  VILNIUS = 'Vilnius',
  RIGA = 'Riga',
  TALLINN = 'Tallinn',
  REYKJAVIK = 'Reykjavik',

  // Азия
  TOKYO = 'Tokyo',
  BEIJING = 'Beijing',
  SEOUL = 'Seoul',
  BANGKOK = 'Bangkok',
  JAKARTA = 'Jakarta',
  HANOI = 'Hanoi',
  NEW_DELHI = 'New Delhi',
  TEHRAN = 'Tehran',
  BAGHDAD = 'Baghdad',
  ANKARA = 'Ankara',
  RIYADH = 'Riyadh',
  TEL_AVIV = 'Tel Aviv',
  AMMAN = 'Amman',
  BEIRUT = 'Beirut',
  DAMASCUS = 'Damascus',
  TASHKENT = 'Tashkent',
  BISHKEK = 'Bishkek',
  DUSHANBE = 'Dushanbe',
  ASHGABAT = 'Ashgabat',
  TBILISI = 'Tbilisi',
  YEREVAN = 'Yerevan',
  BAKU = 'Baku',
  COLOMBO = 'Colombo',

  // Америка
  WASHINGTON = 'Washington D.C.',
  OTTAWA = 'Ottawa',
  MEXICO_CITY = 'Mexico City',
  BRASILIA = 'Brasilia',
  BUENOS_AIRES = 'Buenos Aires',
  LIMA = 'Lima',
  SANTIAGO = 'Santiago',

  // Африка
  PRETORIA = 'Pretoria',
  CAIRO = 'Cairo',
  ABUJA = 'Abuja',
  NAIROBI = 'Nairobi',
  ADDIS_ABABA = 'Addis Ababa',
  RABAT = 'Rabat',
  ALGIERS = 'Algiers',
  TUNIS = 'Tunis',
  ACCRA = 'Accra',
  DODOMA = 'Dodoma',
  KAMPALA = 'Kampala',
  LUSAKA = 'Lusaka',
  HARARE = 'Harare',

  // Океания
  CANBERRA = 'Canberra',
  WELLINGTON = 'Wellington',
  SUVA = 'Suva',
  PORT_MORESBY = 'Port Moresby',
  APIA = 'Apia',
}

export type UserCitiesSelectOptions = SelectOptions<ECities>;

export const userCities: UserCitiesSelectOptions = {
  [ECities.MOSCOW]: {
    slug: ECities.MOSCOW,
    text: {
      am: 'Մոսկվա',
      ru: 'Москва',
      en: 'Moscow',
    },
  },
  [ECities.PARIS]: {
    slug: ECities.PARIS,
    text: {
      am: 'Փարիզ',
      ru: 'Париж',
      en: 'Paris',
    },
  },
  [ECities.BERLIN]: {
    slug: ECities.BERLIN,
    text: {
      am: 'Բեռլին',
      ru: 'Берлин',
      en: 'Berlin',
    },
  },
  [ECities.MADRID]: {
    slug: ECities.MADRID,
    text: {
      am: 'Մադրիդ',
      ru: 'Мадрид',
      en: 'Madrid',
    },
  },
  [ECities.ROME]: {
    slug: ECities.ROME,
    text: {
      am: 'Հռոմ',
      ru: 'Рим',
      en: 'Rome',
    },
  },
  [ECities.VIENNA]: {
    slug: ECities.VIENNA,
    text: {
      am: 'Վիեննա',
      ru: 'Вена',
      en: 'Vienna',
    },
  },
  [ECities.BRUSSELS]: {
    slug: ECities.BRUSSELS,
    text: {
      am: 'Բրյուսել',
      ru: 'Брюссель',
      en: 'Brussels',
    },
  },
  [ECities.AMSTERDAM]: {
    slug: ECities.AMSTERDAM,
    text: {
      am: 'Ամստերդամ',
      ru: 'Амстердам',
      en: 'Amsterdam',
    },
  },
  [ECities.OSLO]: {
    slug: ECities.OSLO,
    text: {
      am: 'Օսլո',
      ru: 'Осло',
      en: 'Oslo',
    },
  },
  [ECities.STOCKHOLM]: {
    slug: ECities.STOCKHOLM,
    text: {
      am: 'Ստոկհոլմ',
      ru: 'Стокгольм',
      en: 'Stockholm',
    },
  },
  [ECities.HELSINKI]: {
    slug: ECities.HELSINKI,
    text: {
      am: 'Հելսինկի',
      ru: 'Хельсинки',
      en: 'Helsinki',
    },
  },
  [ECities.COPENHAGEN]: {
    slug: ECities.COPENHAGEN,
    text: {
      am: 'Կոպենհագեն',
      ru: 'Копенгаген',
      en: 'Copenhagen',
    },
  },
  [ECities.WARSAW]: {
    slug: ECities.WARSAW,
    text: {
      am: 'Վարշավա',
      ru: 'Варшава',
      en: 'Warsaw',
    },
  },
  [ECities.PRAGUE]: {
    slug: ECities.PRAGUE,
    text: {
      am: 'Պրահա',
      ru: 'Прага',
      en: 'Prague',
    },
  },
  [ECities.BUDAPEST]: {
    slug: ECities.BUDAPEST,
    text: {
      am: 'Բուդապեշտ',
      ru: 'Будапешт',
      en: 'Budapest',
    },
  },
  [ECities.BUCHAREST]: {
    slug: ECities.BUCHAREST,
    text: {
      am: 'Բուխարեստ',
      ru: 'Бухарест',
      en: 'Bucharest',
    },
  },
  [ECities.BELGRADE]: {
    slug: ECities.BELGRADE,
    text: {
      am: 'Բելգրադ',
      ru: 'Белград',
      en: 'Belgrade',
    },
  },
  [ECities.ZAGREB]: {
    slug: ECities.ZAGREB,
    text: {
      am: 'Զագրեբ',
      ru: 'Загреб',
      en: 'Zagreb',
    },
  },
  [ECities.LJUBLJANA]: {
    slug: ECities.LJUBLJANA,
    text: {
      am: 'Լյուբլյանա',
      ru: 'Любляна',
      en: 'Ljubljana',
    },
  },
  [ECities.SOFIA]: {
    slug: ECities.SOFIA,
    text: {
      am: 'Սոֆիա',
      ru: 'София',
      en: 'Sofia',
    },
  },
  [ECities.VILNIUS]: {
    slug: ECities.VILNIUS,
    text: {
      am: 'Վիլնյուս',
      ru: 'Вильнюс',
      en: 'Vilnius',
    },
  },
  [ECities.RIGA]: {
    slug: ECities.RIGA,
    text: {
      am: 'Ռիգա',
      ru: 'Рига',
      en: 'Riga',
    },
  },
  [ECities.TALLINN]: {
    slug: ECities.TALLINN,
    text: {
      am: 'Տալլին',
      ru: 'Таллин',
      en: 'Tallinn',
    },
  },
  [ECities.REYKJAVIK]: {
    slug: ECities.REYKJAVIK,
    text: {
      am: 'Ռեյկյավիկ',
      ru: 'Рейкьявик',
      en: 'Reykjavik',
    },
  },
  [ECities.TOKYO]: {
    slug: ECities.TOKYO,
    text: {
      am: 'Տոկիո',
      ru: 'Токио',
      en: 'Tokyo',
    },
  },
  [ECities.BEIJING]: {
    slug: ECities.BEIJING,
    text: {
      am: 'Պեկին',
      ru: 'Пекин',
      en: 'Beijing',
    },
  },
  [ECities.SEOUL]: {
    slug: ECities.SEOUL,
    text: {
      am: 'Սեուլ',
      ru: 'Сеул',
      en: 'Seoul',
    },
  },
  [ECities.BANGKOK]: {
    slug: ECities.BANGKOK,
    text: {
      am: 'Բանգկոկ',
      ru: 'Бангкок',
      en: 'Bangkok',
    },
  },
  [ECities.JAKARTA]: {
    slug: ECities.JAKARTA,
    text: {
      am: 'Ջակարտա',
      ru: 'Джакарта',
      en: 'Jakarta',
    },
  },
  [ECities.HANOI]: {
    slug: ECities.HANOI,
    text: {
      am: 'Հանոյ',
      ru: 'Ханой',
      en: 'Hanoi',
    },
  },
  [ECities.NEW_DELHI]: {
    slug: ECities.NEW_DELHI,
    text: {
      am: 'Նյու Դելի',
      ru: 'Нью-Дели',
      en: 'New Delhi',
    },
  },
  [ECities.TEHRAN]: {
    slug: ECities.TEHRAN,
    text: {
      am: 'Թեհրան',
      ru: 'Тегеран',
      en: 'Tehran',
    },
  },
  [ECities.BAGHDAD]: {
    slug: ECities.BAGHDAD,
    text: {
      am: 'Բաղդադ',
      ru: 'Багдад',
      en: 'Baghdad',
    },
  },
  [ECities.ANKARA]: {
    slug: ECities.ANKARA,
    text: {
      am: 'Անկարա',
      ru: 'Анкара',
      en: 'Ankara',
    },
  },
  [ECities.RIYADH]: {
    slug: ECities.RIYADH,
    text: {
      am: 'Էր-Ռիյադ',
      ru: 'Эр-Рияд',
      en: 'Riyadh',
    },
  },
  [ECities.TEL_AVIV]: {
    slug: ECities.TEL_AVIV,
    text: {
      am: 'Թել Ավիվ',
      ru: 'Тель-Авив',
      en: 'Tel Aviv',
    },
  },
  [ECities.AMMAN]: {
    slug: ECities.AMMAN,
    text: {
      am: 'Ամման',
      ru: 'Амман',
      en: 'Amman',
    },
  },
  [ECities.BEIRUT]: {
    slug: ECities.BEIRUT,
    text: {
      am: 'Բեյրութ',
      ru: 'Бейрут',
      en: 'Beirut',
    },
  },
  [ECities.DAMASCUS]: {
    slug: ECities.DAMASCUS,
    text: {
      am: 'Դամասկոս',
      ru: 'Дамаск',
      en: 'Damascus',
    },
  },
  [ECities.TASHKENT]: {
    slug: ECities.TASHKENT,
    text: {
      am: 'Տաշքենդ',
      ru: 'Ташкент',
      en: 'Tashkent',
    },
  },
  [ECities.BISHKEK]: {
    slug: ECities.BISHKEK,
    text: {
      am: 'Բիշքեկ',
      ru: 'Бишкек',
      en: 'Bishkek',
    },
  },
  [ECities.DUSHANBE]: {
    slug: ECities.DUSHANBE,
    text: {
      am: 'Դուշանբե',
      ru: 'Душанбе',
      en: 'Dushanbe',
    },
  },
  [ECities.ASHGABAT]: {
    slug: ECities.ASHGABAT,
    text: {
      am: 'Աշխաբադ',
      ru: 'Ашхабад',
      en: 'Ashgabat',
    },
  },
  [ECities.TBILISI]: {
    slug: ECities.TBILISI,
    text: {
      am: 'Թբիլիսի',
      ru: 'Тбилиси',
      en: 'Tbilisi',
    },
  },
  [ECities.YEREVAN]: {
    slug: ECities.YEREVAN,
    text: {
      am: 'Երևան',
      ru: 'Ереван',
      en: 'Yerevan',
    },
  },
  [ECities.BAKU]: {
    slug: ECities.BAKU,
    text: {
      am: 'Բաքու',
      ru: 'Баку',
      en: 'Baku',
    },
  },
  [ECities.COLOMBO]: {
    slug: ECities.COLOMBO,
    text: {
      am: 'Կոլոմբո',
      ru: 'Коломбо',
      en: 'Colombo',
    },
  },
  [ECities.WASHINGTON]: {
    slug: ECities.WASHINGTON,
    text: {
      am: 'Վաշինգտոն',
      ru: 'Вашингтон',
      en: 'Washington D.C.',
    },
  },
  [ECities.OTTAWA]: {
    slug: ECities.OTTAWA,
    text: {
      am: 'Օտտավա',
      ru: 'Оттава',
      en: 'Ottawa',
    },
  },
  [ECities.MEXICO_CITY]: {
    slug: ECities.MEXICO_CITY,
    text: {
      am: 'Մեխիկո',
      ru: 'Мехико',
      en: 'Mexico City',
    },
  },
  [ECities.BRASILIA]: {
    slug: ECities.BRASILIA,
    text: {
      am: 'Բրազիլիա',
      ru: 'Бразилиа',
      en: 'Brasilia',
    },
  },
  [ECities.BUENOS_AIRES]: {
    slug: ECities.BUENOS_AIRES,
    text: {
      am: 'Բուենոս Այրես',
      ru: 'Буэнос-Айрес',
      en: 'Buenos Aires',
    },
  },
  [ECities.LIMA]: {
    slug: ECities.LIMA,
    text: {
      am: 'Լիմա',
      ru: 'Лима',
      en: 'Lima',
    },
  },
  [ECities.SANTIAGO]: {
    slug: ECities.SANTIAGO,
    text: {
      am: 'Սանտյագո',
      ru: 'Сантьяго',
      en: 'Santiago',
    },
  },
  [ECities.PRETORIA]: {
    slug: ECities.PRETORIA,
    text: {
      am: 'Պրետորիա',
      ru: 'Претория',
      en: 'Pretoria',
    },
  },
  [ECities.CAIRO]: {
    slug: ECities.CAIRO,
    text: {
      am: 'Կահիրե',
      ru: 'Каир',
      en: 'Cairo',
    },
  },
  [ECities.ABUJA]: {
    slug: ECities.ABUJA,
    text: {
      am: 'Աբուջա',
      ru: 'Абуджа',
      en: 'Abuja',
    },
  },
  [ECities.NAIROBI]: {
    slug: ECities.NAIROBI,
    text: {
      am: 'Նայրոբի',
      ru: 'Найроби',
      en: 'Nairobi',
    },
  },
  [ECities.ADDIS_ABABA]: {
    slug: ECities.ADDIS_ABABA,
    text: {
      am: 'Ադիս Աբեբա',
      ru: 'Аддис-Абеба',
      en: 'Addis Ababa',
    },
  },
  [ECities.RABAT]: {
    slug: ECities.RABAT,
    text: {
      am: 'Ռաբաթ',
      ru: 'Рабат',
      en: 'Rabat',
    },
  },
  [ECities.ALGIERS]: {
    slug: ECities.ALGIERS,
    text: {
      am: 'Ալժիր',
      ru: 'Алжир',
      en: 'Algiers',
    },
  },
  [ECities.TUNIS]: {
    slug: ECities.TUNIS,
    text: {
      am: 'Թունիս',
      ru: 'Тунис',
      en: 'Tunis',
    },
  },
  [ECities.ACCRA]: {
    slug: ECities.ACCRA,
    text: {
      am: 'Ակրա',
      ru: 'Аккра',
      en: 'Accra',
    },
  },
  [ECities.DODOMA]: {
    slug: ECities.DODOMA,
    text: {
      am: 'Դոդոմա',
      ru: 'Додома',
      en: 'Dodoma',
    },
  },
  [ECities.KAMPALA]: {
    slug: ECities.KAMPALA,
    text: {
      am: 'Կամպալա',
      ru: 'Кампала',
      en: 'Kampala',
    },
  },
  [ECities.LUSAKA]: {
    slug: ECities.LUSAKA,
    text: {
      am: 'Լուսակա',
      ru: 'Лусака',
      en: 'Lusaka',
    },
  },
  [ECities.HARARE]: {
    slug: ECities.HARARE,
    text: {
      am: 'Հարարե',
      ru: 'Хараре',
      en: 'Harare',
    },
  },
  [ECities.CANBERRA]: {
    slug: ECities.CANBERRA,
    text: {
      am: 'Կանբերա',
      ru: 'Канберра',
      en: 'Canberra',
    },
  },
  [ECities.WELLINGTON]: {
    slug: ECities.WELLINGTON,
    text: {
      am: 'Վելինգտոն',
      ru: 'Веллингтон',
      en: 'Wellington',
    },
  },
  [ECities.SUVA]: {
    slug: ECities.SUVA,
    text: {
      am: 'Սուվա',
      ru: 'Сува',
      en: 'Suva',
    },
  },
  [ECities.PORT_MORESBY]: {
    slug: ECities.PORT_MORESBY,
    text: {
      am: 'Պորտ Մորսբի',
      ru: 'Порт-Морсби',
      en: 'Port Moresby',
    },
  },
  [ECities.APIA]: {
    slug: ECities.APIA,
    text: {
      am: 'Ապիա',
      ru: 'Апиа',
      en: 'Apia',
    },
  },
};