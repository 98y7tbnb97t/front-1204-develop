import { SelectOptions } from "../constants";
export enum ETimezones {
  // Европа
  MOSCOW = 'Europe/Moscow',
  LONDON = 'Europe/London',
  PARIS = 'Europe/Paris',
  BERLIN = 'Europe/Berlin',
  ROME = 'Europe/Rome',
  MADRID = 'Europe/Madrid',
  ATHENS = 'Europe/Athens',
  WARSAW = 'Europe/Warsaw',
  KIEV = 'Europe/Kiev',
  BUCHAREST = 'Europe/Bucharest',
  VIENNA = 'Europe/Vienna',
  PRAGUE = 'Europe/Prague',
  STOCKHOLM = 'Europe/Stockholm',
  HELSINKI = 'Europe/Helsinki',
  ISTANBUL = 'Europe/Istanbul',
  COPENHAGEN = 'Europe/Copenhagen',
  OSLO = 'Europe/Oslo',
  ZURICH = 'Europe/Zurich',
  
  // Азия
  DUBAI = 'Asia/Dubai',
  RIYADH = 'Asia/Riyadh',
  KARACHI = 'Asia/Karachi',
  DELHI = 'Asia/Kolkata',
  DHAKA = 'Asia/Dhaka',
  JAKARTA = 'Asia/Jakarta',
  BANGKOK = 'Asia/Bangkok',
  SINGAPORE = 'Asia/Singapore',
  HONG_KONG = 'Asia/Hong_Kong',
  TOKYO = 'Asia/Tokyo',
  SEOUL = 'Asia/Seoul',
  BEIJING = 'Asia/Shanghai',
  KUALA_LUMPUR = 'Asia/Kuala_Lumpur',
  MANILA = 'Asia/Manila',
  HANOI = 'Asia/Hanoi',
  TAIPEI = 'Asia/Taipei',
  COLOMBO = 'Asia/Colombo',
  YANGON = 'Asia/Yangon',
  
  // Америка
  NEW_YORK = 'America/New_York',
  LOS_ANGELES = 'America/Los_Angeles',
  CHICAGO = 'America/Chicago',
  DENVER = 'America/Denver',
  MEXICO_CITY = 'America/Mexico_City',
  SAO_PAULO = 'America/Sao_Paulo',
  BUENOS_AIRES = 'America/Argentina/Buenos_Aires',
  LIMA = 'America/Lima',
  SANTIAGO = 'America/Santiago',
  TORONTO = 'America/Toronto',
  MONTREAL = 'America/Montreal',
  VANCOUVER = 'America/Vancouver',
  BOGOTA = 'America/Bogota',
  CARACAS = 'America/Caracas',
  SAN_JUAN = 'America/San_Juan',
  LA_PAZ = 'America/La_Paz',
  GUAYAQUIL = 'America/Guayaquil',
  SAN_SALVADOR = 'America/San_Salvador',
  KINGSTON = 'America/Kingston',
  PORT_AU_PRINCE = 'America/Port-au-Prince',
  PANAMA = 'America/Panama',

  // Африка
  CAIRO = 'Africa/Cairo',
  LAGOS = 'Africa/Lagos',
  JOHANNESBURG = 'Africa/Johannesburg',
  NAIROBI = 'Africa/Nairobi',
  ADDIS_ABABA = 'Africa/Addis_Ababa',
  CASABLANCA = 'Africa/Casablanca',
  ABUJA = 'Africa/Abuja',
  KIGALI = 'Africa/Kigali',
  ACCRA = 'Africa/Accra',
  TUNIS = 'Africa/Tunis',
  LUSAKA = 'Africa/Lusaka',
  ZANZIBAR = 'Africa/Zanzibar',
  BAMAKO = 'Africa/Bamako',
  CONAKRY = 'Africa/Conakry',

  // Океания
  SYDNEY = 'Australia/Sydney',
  MELBOURNE = 'Australia/Melbourne',
  BRISBANE = 'Australia/Brisbane',
  PERTH = 'Australia/Perth',
  AUCKLAND = 'Pacific/Auckland',
  APIA = 'Pacific/Apia',
  HAGATNA = 'Pacific/Hagåtña',
  HONOLULU = 'Pacific/Honolulu',
  PAGO_PAGO = 'Pacific/Pago_Pago',
  TARAWA = 'Pacific/Tarawa',
  NOUMEA = 'Pacific/Noumea',
  PALIKIR = 'Pacific/Palikir',
  KIRITIMATI = 'Pacific/Kiritimati',
  FIJI = 'Pacific/Fiji',
}

export type UserTimezonesSelectOptions = SelectOptions<ETimezones>;
export const userTimezones: UserTimezonesSelectOptions = {
  [ETimezones.MOSCOW]: {
    slug: ETimezones.MOSCOW,
    text: {
      am: 'Մոսկվայի ժամանակը GMT+3',
      ru: 'Москва GMT+3',
      en: 'Moscow Time GMT+3',
    },
  },
  [ETimezones.LONDON]: {
    slug: ETimezones.LONDON,
    text: {
      am: 'Լոնդոնի ժամանակը GMT+0',
      ru: 'Лондон GMT+0',
      en: 'London Time GMT+0',
    },
  },
  [ETimezones.PARIS]: {
    slug: ETimezones.PARIS,
    text: {
      am: 'Պարիզի ժամանակը GMT+1',
      ru: 'Париж GMT+1',
      en: 'Paris Time GMT+1',
    },
  },
  [ETimezones.BERLIN]: {
    slug: ETimezones.BERLIN,
    text: {
      am: 'Բեռլինի ժամանակը GMT+1',
      ru: 'Берлин GMT+1',
      en: 'Berlin Time GMT+1',
    },
  },
  [ETimezones.ROME]: {
    slug: ETimezones.ROME,
    text: {
      am: 'Ռոմի ժամանակը GMT+1',
      ru: 'Рим GMT+1',
      en: 'Rome Time GMT+1',
    },
  },
  [ETimezones.MADRID]: {
    slug: ETimezones.MADRID,
    text: {
      am: 'Մադրիդի ժամանակը GMT+1',
      ru: 'Мадрид GMT+1',
      en: 'Madrid Time GMT+1',
    },
  },
  [ETimezones.ATHENS]: {
    slug: ETimezones.ATHENS,
    text: {
      am: 'Աթենքի ժամանակը GMT+2',
      ru: 'Афины GMT+2',
      en: 'Athens Time GMT+2',
    },
  },
  [ETimezones.WARSAW]: {
    slug: ETimezones.WARSAW,
    text: {
      am: 'Վարշավայի ժամանակը GMT+1',
      ru: 'Варшава GMT+1',
      en: 'Warsaw Time GMT+1',
    },
  },
  [ETimezones.KIEV]: {
    slug: ETimezones.KIEV,
    text: {
      am: 'Կիևի ժամանակը GMT+2',
      ru: 'Киев GMT+2',
      en: 'Kiev Time GMT+2',
    },
  },
  [ETimezones.BUCHAREST]: {
    slug: ETimezones.BUCHAREST,
    text: {
      am: 'Բուխարեստի ժամանակը GMT+2',
      ru: 'Бухарест GMT+2',
      en: 'Bucharest Time GMT+2',
    },
  },
  [ETimezones.VIENNA]: {
    slug: ETimezones.VIENNA,
    text: {
      am: 'Վիեննայի ժամանակը GMT+1',
      ru: 'Вена GMT+1',
      en: 'Vienna Time GMT+1',
    },
  },
  [ETimezones.PRAGUE]: {
    slug: ETimezones.PRAGUE,
    text: {
      am: 'Պրահայի ժամանակը GMT+1',
      ru: 'Прага GMT+1',
      en: 'Prague Time GMT+1',
    },
  },
  [ETimezones.COPENHAGEN]: {
    slug: ETimezones.COPENHAGEN,
    text: {
      am: 'Կոպենհագենի ժամանակը GMT+1',
      ru: 'Копенгаген GMT+1',
      en: 'Copenhagen Time GMT+1',
    },
  },
  [ETimezones.OSLO]: {
    slug: ETimezones.OSLO,
    text: {
      am: 'Օսլոյի ժամանակը GMT+1',
      ru: 'Осло GMT+1',
      en: 'Oslo Time GMT+1',
    },
  },
  [ETimezones.ZURICH]: {
    slug: ETimezones.ZURICH,
    text: {
      am: 'Ձյուրիխի ժամանակը GMT+1',
      ru: 'Цюрих GMT+1',
      en: 'Zurich Time GMT+1',
    },
  },
  [ETimezones.STOCKHOLM]: {
    slug: ETimezones.STOCKHOLM,
    text: {
      am: 'Ստոկհոլմի ժամանակը GMT+1',
      ru: 'Стокгольм GMT+1',
      en: 'Stockholm Time GMT+1',
    },
  },
  [ETimezones.HELSINKI]: {
    slug: ETimezones.HELSINKI,
    text: {
      am: 'Հելսինկիի ժամանակը GMT+2',
      ru: 'Хельсинки GMT+2',
      en: 'Helsinki Time GMT+2',
    },
  },
  [ETimezones.ISTANBUL]: {
    slug: ETimezones.ISTANBUL,
    text: {
      am: 'Իզմիրի ժամանակը GMT+3',
      ru: 'Стамбул GMT+3',
      en: 'Istanbul Time GMT+3',
    },
  },
  [ETimezones.DUBAI]: {
    slug: ETimezones.DUBAI,
    text: {
      am: 'Դուբայի ժամանակը GMT+4',
      ru: 'Дубай GMT+4',
      en: 'Dubai Time GMT+4',
    },
  },
  [ETimezones.RIYADH]: {
    slug: ETimezones.RIYADH,
    text: {
      am: 'Ռիյադի ժամանակը GMT+3',
      ru: 'Эр-Рияд GMT+3',
      en: 'Riyadh Time GMT+3',
    },
  },
  [ETimezones.KARACHI]: {
    slug: ETimezones.KARACHI,
    text: {
      am: 'Կարաչիի ժամանակը GMT+5',
      ru: 'Карачи GMT+5',
      en: 'Karachi Time GMT+5',
    },
  },
  [ETimezones.KUALA_LUMPUR]: {
    slug: ETimezones.KUALA_LUMPUR,
    text: {
      am: 'Կուալա-Լումբուրի ժամանակը GMT+8',
      ru: 'Куала-Лумпур GMT+8',
      en: 'Kuala Lumpur Time GMT+8',
    },
  },
  [ETimezones.MANILA]: {
    slug: ETimezones.MANILA,
    text: {
      am: 'Մանիլայի ժամանակը GMT+8',
      ru: 'Манила GMT+8',
      en: 'Manila Time GMT+8',
    },
  },
  [ETimezones.HANOI]: {
    slug: ETimezones.HANOI,
    text: {
      am: 'Հանոյի ժամանակը GMT+7',
      ru: 'Ханой GMT+7',
      en: 'Hanoi Time GMT+7',
    },
  },
  [ETimezones.TAIPEI]: {
    slug: ETimezones.TAIPEI,
    text: {
      am: 'Թայպեյի ժամանակը GMT+8',
      ru: 'Тайбэй GMT+8',
      en: 'Taipei Time GMT+8',
    },
  },
  [ETimezones.COLOMBO]: {
    slug: ETimezones.COLOMBO,
    text: {
      am: 'Կոլոմբոյի ժամանակը GMT+5:30',
      ru: 'Коломбо GMT+5:30',
      en: 'Colombo Time GMT+5:30',
    },
  },
  [ETimezones.YANGON]: {
    slug: ETimezones.YANGON,
    text: {
      am: 'Յանգոնի ժամանակը GMT+6:30',
      ru: 'Янгон GMT+6:30',
      en: 'Yangon Time GMT+6:30',
    },
  },
  [ETimezones.DELHI]: {
    slug: ETimezones.DELHI,
    text: {
      am: 'Դելիի ժամանակը GMT+5:30',
      ru: 'Дели GMT+5:30',
      en: 'Delhi Time GMT+5:30',
    },
  },
  [ETimezones.DHAKA]: {
    slug: ETimezones.DHAKA,
    text: {
      am: 'Դհաքայի ժամանակը GMT+6',
      ru: 'Дакка GMT+6',
      en: 'Dhaka Time GMT+6',
    },
  },
  [ETimezones.JAKARTA]: {
    slug: ETimezones.JAKARTA,
    text: {
      am: 'Ջակարտայի ժամանակը GMT+7',
      ru: 'Джакарта GMT+7',
      en: 'Jakarta Time GMT+7',
    },
  },
  [ETimezones.BANGKOK]: {
    slug: ETimezones.BANGKOK,
    text: {
      am: 'Բանգկոկի ժամանակը GMT+7',
      ru: 'Бангкок GMT+7',
      en: 'Bangkok Time GMT+7',
    },
  },
  [ETimezones.SINGAPORE]: {
    slug: ETimezones.SINGAPORE,
    text: {
      am: 'Սինգապուրի ժամանակը GMT+8',
      ru: 'Сингапур GMT+8',
      en: 'Singapore Time GMT+8',
    },
  },
  [ETimezones.HONG_KONG]: {
    slug: ETimezones.HONG_KONG,
    text: {
      am: 'Հոնկոնգի ժամանակը GMT+8',
      ru: 'Гонконг GMT+8',
      en: 'Hong Kong Time GMT+8',
    },
  },
  [ETimezones.TOKYO]: {
    slug: ETimezones.TOKYO,
    text: {
      am: 'Տոկիոյի ժամանակը GMT+9',
      ru: 'Токио GMT+9',
      en: 'Tokyo Time GMT+9',
    },
  },
  [ETimezones.SEOUL]: {
    slug: ETimezones.SEOUL,
    text: {
      am: 'Սեուլի ժամանակը GMT+9',
      ru: 'Сеул GMT+9',
      en: 'Seoul Time GMT+9',
    },
  },
  [ETimezones.BEIJING]: {
    slug: ETimezones.BEIJING,
    text: {
      am: 'Պեկինի ժամանակը GMT+8',
      ru: 'Пекин GMT+8',
      en: 'Beijing Time GMT+8',
    },
  },
  [ETimezones.NEW_YORK]: {
    slug: ETimezones.NEW_YORK,
    text: {
      am: 'Նյու Յորքի ժամանակը GMT-5',
      ru: 'Нью-Йорк GMT-5',
      en: 'New York Time GMT-5',
    },
  },
  [ETimezones.LOS_ANGELES]: {
    slug: ETimezones.LOS_ANGELES,
    text: {
      am: 'Լոս Անջելեսի ժամանակը GMT-8',
      ru: 'Лос-Анджелес GMT-8',
      en: 'Los Angeles Time GMT-8',
    },
  },
  [ETimezones.CHICAGO]: {
    slug: ETimezones.CHICAGO,
    text: {
      am: 'Չիկագոյի ժամանակը GMT-6',
      ru: 'Чикаго GMT-6',
      en: 'Chicago Time GMT-6',
    },
  },
  [ETimezones.DENVER]: {
    slug: ETimezones.DENVER,
    text: {
      am: 'Դենվերի ժամանակը GMT-7',
      ru: 'Денвер GMT-7',
      en: 'Denver Time GMT-7',
    },
  },
  [ETimezones.MEXICO_CITY]: {
    slug: ETimezones.MEXICO_CITY,
    text: {
      am: 'Մեխիկոյի ժամանակը GMT-6',
      ru: 'Мехико GMT-6',
      en: 'Mexico City Time GMT-6',
    },
  },
  [ETimezones.SAO_PAULO]: {
    slug: ETimezones.SAO_PAULO,
    text: {
      am: 'Սաու-Պաոլուի ժամանակը GMT-3',
      ru: 'Сан-Паулу GMT-3',
      en: 'Sao Paulo Time GMT-3',
    },
  },
  [ETimezones.BUENOS_AIRES]: {
    slug: ETimezones.BUENOS_AIRES,
    text: {
      am: 'Բուենոս-Այրեսի ժամանակը GMT-3',
      ru: 'Буэнос-Айрес GMT-3',
      en: 'Buenos Aires Time GMT-3',
    },
  },
  [ETimezones.LIMA]: {
    slug: ETimezones.LIMA,
    text: {
      am: 'Լիմայի ժամանակը GMT-5',
      ru: 'Лима GMT-5',
      en: 'Lima Time GMT-5',
    },
  },
  [ETimezones.SANTIAGO]: {
    slug: ETimezones.SANTIAGO,
    text: {
      am: 'Սանտյագոյի ժամանակը GMT-4',
      ru: 'Сантъяго GMT-4',
      en: 'Santiago Time GMT-4',
    },
  },
  [ETimezones.TORONTO]: {
    slug: ETimezones.TORONTO,
    text: {
      am: 'Տորոնտոյի ժամանակը GMT-5',
      ru: 'Торонто GMT-5',
      en: 'Toronto Time GMT-5',
    },
  },
  [ETimezones.MONTREAL]: {
    slug: ETimezones.MONTREAL,
    text: {
      am: 'Մոնրեալի ժամանակը GMT-5',
      ru: 'Монреаль GMT-5',
      en: 'Montreal Time GMT-5',
    },
  },
  [ETimezones.VANCOUVER]: {
    slug: ETimezones.VANCOUVER,
    text: {
      am: 'Վանկուվերի ժամանակը GMT-8',
      ru: 'Ванкувер GMT-8',
      en: 'Vancouver Time GMT-8',
    },
  },
  [ETimezones.BOGOTA]: {
    slug: ETimezones.BOGOTA,
    text: {
      am: 'Բոգոտայի ժամանակը GMT-5',
      ru: 'Богота GMT-5',
      en: 'Bogota Time GMT-5',
    },
  },
  [ETimezones.CARACAS]: {
    slug: ETimezones.CARACAS,
    text: {
      am: 'Կարակասի ժամանակը GMT-4',
      ru: 'Каракас GMT-4',
      en: 'Caracas Time GMT-4',
    },
  },
  [ETimezones.SAN_JUAN]: {
    slug: ETimezones.SAN_JUAN,
    text: {
      am: 'Սան-Հուանի ժամանակը GMT-4',
      ru: 'Сан-Хуан GMT-4',
      en: 'San Juan Time GMT-4',
    },
  },
  [ETimezones.LA_PAZ]: {
    slug: ETimezones.LA_PAZ,
    text: {
      am: 'Լա Պազի ժամանակը GMT-4',
      ru: 'Ла-Пас GMT-4',
      en: 'La Paz Time GMT-4',
    },
  },
  [ETimezones.GUAYAQUIL]: {
    slug: ETimezones.GUAYAQUIL,
    text: {
      am: 'Գուայակիլի ժամանակը GMT-5',
      ru: 'Гуаякиль GMT-5',
      en: 'Guayaquil Time GMT-5',
    },
  },
  [ETimezones.SAN_SALVADOR]: {
    slug: ETimezones.SAN_SALVADOR,
    text: {
      am: 'Սան-Սալվադորի ժամանակը GMT-6',
      ru: 'Сан-Сальвадор GMT-6',
      en: 'San Salvador Time GMT-6',
    },
  },
  [ETimezones.KINGSTON]: {
    slug: ETimezones.KINGSTON,
    text: {
      am: 'Քինգսթոնի ժամանակը GMT-5',
      ru: 'Кингстон GMT-5',
      en: 'Kingston Time GMT-5',
    },
  },
  [ETimezones.PORT_AU_PRINCE]: {
    slug: ETimezones.PORT_AU_PRINCE,
    text: {
      am: 'Պորտ-Օ-Պրենսի ժամանակը GMT-5',
      ru: 'Порт-о-Пренс GMT-5',
      en: 'Port-au-Prince Time GMT-5',
    },
  },
  [ETimezones.PANAMA]: {
    slug: ETimezones.PANAMA,
    text: {
      am: 'Պանամայի ժամանակը GMT-5',
      ru: 'Панама GMT-5',
      en: 'Panama Time GMT-5',
    },
  },

  // Африка
  [ETimezones.CAIRO]: {
    slug: ETimezones.CAIRO,
    text: {
      am: 'Կահիրեի ժամանակը GMT+2',
      ru: 'Каир GMT+2',
      en: 'Cairo Time GMT+2',
    },
  },
  [ETimezones.LAGOS]: {
    slug: ETimezones.LAGOS,
    text: {
      am: 'Լագոսի ժամանակը GMT+1',
      ru: 'Лагос GMT+1',
      en: 'Lagos Time GMT+1',
    },
  },
  [ETimezones.JOHANNESBURG]: {
    slug: ETimezones.JOHANNESBURG,
    text: {
      am: 'Յոհանեսբուրգի ժամանակը GMT+2',
      ru: 'Йоханнесбург GMT+2',
      en: 'Johannesburg Time GMT+2',
    },
  },
  [ETimezones.NAIROBI]: {
    slug: ETimezones.NAIROBI,
    text: {
      am: 'Նայրոբիի ժամանակը GMT+3',
      ru: 'Найроби GMT+3',
      en: 'Nairobi Time GMT+3',
    },
  },
  [ETimezones.ADDIS_ABABA]: {
    slug: ETimezones.ADDIS_ABABA,
    text: {
      am: 'Ադիս-Աբեբայի ժամանակը GMT+3',
      ru: 'Аддис-Абеба GMT+3',
      en: 'Addis Ababa Time GMT+3',
    },
  },
  [ETimezones.CASABLANCA]: {
    slug: ETimezones.CASABLANCA,
    text: {
      am: 'Կասաբլանկայի ժամանակը GMT+1',
      ru: 'Касабланка GMT+1',
      en: 'Casablanca Time GMT+1',
    },
  },
  [ETimezones.ABUJA]: {
    slug: ETimezones.ABUJA,
    text: {
      am: 'Աբուջայի ժամանակը GMT+1',
      ru: 'Абуя GMT+1',
      en: 'Abuja Time GMT+1',
    },
  },
  [ETimezones.KIGALI]: {
    slug: ETimezones.KIGALI,
    text: {
      am: 'Կիգալիի ժամանակը GMT+2',
      ru: 'Кигали GMT+2',
      en: 'Kigali Time GMT+2',
    },
  },
  [ETimezones.ACCRA]: {
    slug: ETimezones.ACCRA,
    text: {
      am: 'Ակրայի ժամանակը GMT+0',
      ru: 'Аккра GMT+0',
      en: 'Accra Time GMT+0',
    },
  },
  [ETimezones.TUNIS]: {
    slug: ETimezones.TUNIS,
    text: {
      am: 'Թունիսի ժամանակը GMT+1',
      ru: 'Тунис GMT+1',
      en: 'Tunis Time GMT+1',
    },
  },
  [ETimezones.LUSAKA]: {
    slug: ETimezones.LUSAKA,
    text: {
      am: 'Լուսակայի ժամանակը GMT+2',
      ru: 'Лусака GMT+2',
      en: 'Lusaka Time GMT+2',
    },
  },
  [ETimezones.ZANZIBAR]: {
    slug: ETimezones.ZANZIBAR,
    text: {
      am: 'Զանզիբարի ժամանակը GMT+3',
      ru: 'Занзибар GMT+3',
      en: 'Zanzibar Time GMT+3',
    },
  },
  [ETimezones.BAMAKO]: {
    slug: ETimezones.BAMAKO,
    text: {
      am: 'Բամակոյի ժամանակը GMT+0',
      ru: 'Бамако GMT+0',
      en: 'Bamako Time GMT+0',
    },
  },
  [ETimezones.CONAKRY]: {
    slug: ETimezones.CONAKRY,
    text: {
      am: 'Կոնակրի ժամանակը GMT+0',
      ru: 'Конакри GMT+0',
      en: 'Conakry Time GMT+0',
    },
  },

  // Океания
  [ETimezones.SYDNEY]: {
    slug: ETimezones.SYDNEY,
    text: {
      am: 'Սիդնեյի ժամանակը GMT+11',
      ru: 'Сидней GMT+11',
      en: 'Sydney Time GMT+11',
    },
  },
  [ETimezones.MELBOURNE]: {
    slug: ETimezones.MELBOURNE,
    text: {
      am: 'Մելբուռնի ժամանակը GMT+11',
      ru: 'Мельбурн GMT+11',
      en: 'Melbourne Time GMT+11',
    },
  },
  [ETimezones.BRISBANE]: {
    slug: ETimezones.BRISBANE,
    text: {
      am: 'Բրիզբենի ժամանակը GMT+10',
      ru: 'Брисбен GMT+10',
      en: 'Brisbane Time GMT+10',
    },
  },
  [ETimezones.PERTH]: {
    slug: ETimezones.PERTH,
    text: {
      am: 'Պերթի ժամանակը GMT+8',
      ru: 'Перт GMT+8',
      en: 'Perth Time GMT+8',
    },
  },
  [ETimezones.AUCKLAND]: {
    slug: ETimezones.AUCKLAND,
    text: {
      am: 'Օքլանդի ժամանակը GMT+13',
      ru: 'Окленд GMT+13',
      en: 'Auckland Time GMT+13',
    },
  },
  [ETimezones.APIA]: {
    slug: ETimezones.APIA,
    text: {
      am: 'Ապիայի ժամանակը GMT+13',
      ru: 'Апаия GMT+13',
      en: 'Apia Time GMT+13',
    },
  },
  [ETimezones.HAGATNA]: {
    slug: ETimezones.HAGATNA,
    text: {
      am: 'Հագատնայի ժամանակը GMT+10',
      ru: 'Хагатна GMT+10',
      en: 'Hagåtña Time GMT+10',
    },
  },
  [ETimezones.HONOLULU]: {
    slug: ETimezones.HONOLULU,
    text: {
      am: 'Հոնոլուլուի ժամանակը GMT-10',
      ru: 'Гонолулу GMT-10',
      en: 'Honolulu Time GMT-10',
    },
  },
  [ETimezones.PAGO_PAGO]: {
    slug: ETimezones.PAGO_PAGO,
    text: {
      am: 'Պագո Պագոյի ժամանակը GMT-11',
      ru: 'Паго-Паго GMT-11',
      en: 'Pago Pago Time GMT-11',
    },
  },
  [ETimezones.TARAWA]: {
    slug: ETimezones.TARAWA,
    text: {
      am: 'Տարավայի ժամանակը GMT+12',
      ru: 'Тарава GMT+12',
      en: 'Tarawa Time GMT+12',
    },
  },
  [ETimezones.NOUMEA]: {
    slug: ETimezones.NOUMEA,
    text: {
      am: 'Նումեայի ժամանակը GMT+11',
      ru: 'Нумеа GMT+11',
      en: 'Noumea Time GMT+11',
    },
  },
  [ETimezones.PALIKIR]: {
    slug: ETimezones.PALIKIR,
    text: {
      am: 'Պալիկիրի ժամանակը GMT+11',
      ru: 'Паликир GMT+11',
      en: 'Palikir Time GMT+11',
    },
  },
  [ETimezones.KIRITIMATI]: {
    slug: ETimezones.KIRITIMATI,
    text: {
      am: 'Կիրիտիատի ժամանակը GMT+14',
      ru: 'Киритимати GMT+14',
      en: 'Kiritimati Time GMT+14',
    },
  },
  [ETimezones.FIJI]: {
    slug: ETimezones.FIJI,
    text: {
      am: 'Ֆիջիի ժամանակը GMT+12',
      ru: 'Фиджи GMT+12',
      en: 'Fiji Time GMT+12',
    },
  },
};