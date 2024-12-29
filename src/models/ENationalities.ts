import { SelectOptions } from "../constants";

export enum ENationalities {
  RUSSIAN = 'Russian',
  ARMENIAN = 'Armenian',
  AMERICAN = 'American',
  CANADIAN = 'Canadian',
  BRITISH = 'British',
  FRENCH = 'French',
  GERMAN = 'German',
  ITALIAN = 'Italian',
  SPANISH = 'Spanish',
  CHINESE = 'Chinese',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean',
  INDIAN = 'Indian',
  PAKISTANI = 'Pakistani',
  IRANIAN = 'Iranian',
  TURKISH = 'Turkish',
  ISRAELI = 'Israeli',
  EGYPTIAN = 'Egyptian',
  SOUTH_AFRICAN = 'South African',
  AUSTRALIAN = 'Australian',
  NEW_ZEALANDER = 'New Zealander',
  MEXICAN = 'Mexican',
  BRAZILIAN = 'Brazilian',
  ARGENTINIAN = 'Argentinian',
  PERUVIAN = 'Peruvian',
  CHILEAN = 'Chilean',
  NIGERIAN = 'Nigerian',
  KENYAN = 'Kenyan',
  ETHIOPIAN = 'Ethiopian',
  MOROCCAN = 'Moroccan',
  ALGERIAN = 'Algerian',
  TUNISIAN = 'Tunisian',
  GREEK = 'Greek',
  SWEDISH = 'Swedish',
  NORWEGIAN = 'Norwegian',
  FINNISH = 'Finnish',
  POLISH = 'Polish',
  CZECH = 'Czech',
  SLOVAK = 'Slovak',
  HUNGARIAN = 'Hungarian',
  ROMANIAN = 'Romanian',
  BULGARIAN = 'Bulgarian',
  CROATIAN = 'Croatian',
  SERBIAN = 'Serbian',
  AUSTRIAN = 'Austrian',
  SWISS = 'Swiss',
  DUTCH = 'Dutch',
  BELGIAN = 'Belgian',
  PORTUGUESE = 'Portuguese',
  IRISH = 'Irish',
  SCOTTISH = 'Scottish',
  WELSH = 'Welsh',
  ICELANDIC = 'Icelandic',
  LATVIAN = 'Latvian',
  LITHUANIAN = 'Lithuanian',
  ESTONIAN = 'Estonian',
  GEORGIAN = 'Georgian',
  AZERBAIJANI = 'Azerbaijani',
  KAZAKH = 'Kazakh',
  UZBEK = 'Uzbek',
  KYRGYZ = 'Kyrgyz',
  TAJIK = 'Tajik',
  TURKMEN = 'Turkmen',
  SINGAPOREAN = 'Singaporean',
  MALAYSIAN = 'Malaysian',
  INDONESIAN = 'Indonesian',
  THAI = 'Thai',
  VIETNAMESE = 'Vietnamese',
  FILIPINO = 'Filipino',
  MYANMAR = 'Burmese',
  CAMBODIAN = 'Cambodian',
  LAO = 'Lao',
  SOUTH_KOREAN = 'South Korean',
  NORTH_KOREAN = 'North Korean',
  SAUDI = 'Saudi',
  UAE = 'Emirati',
  QATARI = 'Qatari',
  KUWAITI = 'Kuwaiti',
  BAHRAINI = 'Bahraini',
  OMANI = 'Omani',
  SYRIAN = 'Syrian',
  LEBANESE = 'Lebanese',
  JORDANIAN = 'Jordanian',
  PALESTINIAN = 'Palestinian',
  IRAQI = 'Iraqi',
  SRI_LANKAN = 'Sri Lankan',
  BANGLADESHI = 'Bangladeshi',
  NEPALESE = 'Nepalese',
  BHUTANESE = 'Bhutanese',
  MALDIVIAN = 'Maldivian',
  AFGHAN = 'Afghan',
  ZIMBABWEAN = 'Zimbabwean',
  ZAMBIAN = 'Zambian',
  UGANDAN = 'Ugandan',
  TANZANIAN = 'Tanzanian',
  GHANAIAN = 'Ghanaian',
  IVORIAN = 'Ivorian',
  SOUTH_SUDANESE = 'South Sudanese',
  SENEGALESE = 'Senegalese',
  CONGOLESE = 'Congolese',
  ANGOLAN = 'Angolan',
  CAMEROONIAN = 'Cameroonian',
  MALIAN = 'Malian',
  BURKINABE = 'Burkinabé',
}

export type UserNationalitiesSelectOptions = SelectOptions<ENationalities>;
export const userNationalities: UserNationalitiesSelectOptions = {
  [ENationalities.RUSSIAN]: {
    slug: ENationalities.RUSSIAN,
    text: {
      am: 'Ռուս',
      ru: 'Русский',
      en: 'Russian',
    },
  },
  [ENationalities.ARMENIAN]: {
    slug: ENationalities.ARMENIAN,
    text: {
      am: 'Հայ',
      ru: 'Армянин',
      en: 'Armenian',
    },
  },
  [ENationalities.AMERICAN]: {
    slug: ENationalities.AMERICAN,
    text: {
      am: 'Ամերիկացի',
      ru: 'Американец',
      en: 'American',
    },
  },
  [ENationalities.CANADIAN]: {
    slug: ENationalities.CANADIAN,
    text: {
      am: 'Կանադացի',
      ru: 'Канадец',
      en: 'Canadian',
    },
  },
  [ENationalities.BRITISH]: {
    slug: ENationalities.BRITISH,
    text: {
      am: 'Բրիտանացի',
      ru: 'Британец',
      en: 'British',
    },
  },
  [ENationalities.FRENCH]: {
    slug: ENationalities.FRENCH,
    text: {
      am: 'Ֆրանսիացի',
      ru: 'Француз',
      en: 'French',
    },
  },
  [ENationalities.GERMAN]: {
    slug: ENationalities.GERMAN,
    text: {
      am: 'Գերմանացի',
      ru: 'Немец',
      en: 'German',
    },
  },
  [ENationalities.ITALIAN]: {
    slug: ENationalities.ITALIAN,
    text: {
      am: 'Իտալացի',
      ru: 'Итальянец',
      en: 'Italian',
    },
  },
  [ENationalities.SPANISH]: {
    slug: ENationalities.SPANISH,
    text: {
      am: 'Իսպանացի',
      ru: 'Испанец',
      en: 'Spanish',
    },
  },
  [ENationalities.CHINESE]: {
    slug: ENationalities.CHINESE,
    text: {
      am: 'Չինացի',
      ru: 'Китаец',
      en: 'Chinese',
    },
  },
  [ENationalities.JAPANESE]: {
    slug: ENationalities.JAPANESE,
    text: {
      am: 'Ճապոնացի',
      ru: 'Японец',
      en: 'Japanese',
    },
  },
  [ENationalities.KOREAN]: {
    slug: ENationalities.KOREAN,
    text: {
      am: 'Կորեացի',
      ru: 'Кореец',
      en: 'Korean',
    },
  },
  [ENationalities.INDIAN]: {
    slug: ENationalities.INDIAN,
    text: {
      am: 'Հնդիկ',
      ru: 'Индиец',
      en: 'Indian',
    },
  },
  [ENationalities.PAKISTANI]: {
    slug: ENationalities.PAKISTANI,
    text: {
      am: 'Պակիստանցի',
      ru: 'Пакистанец',
      en: 'Pakistani',
    },
  },
  [ENationalities.IRANIAN]: {
    slug: ENationalities.IRANIAN,
    text: {
      am: 'Իրանցի',
      ru: 'Иранец',
      en: 'Iranian',
    },
  },
  [ENationalities.TURKISH]: {
    slug: ENationalities.TURKISH,
    text: {
      am: 'Թուրք',
      ru: 'Турок',
      en: 'Turkish',
    },
  },
  [ENationalities.ISRAELI]: {
    slug: ENationalities.ISRAELI,
    text: {
      am: 'Իսրայելցի',
      ru: 'Израильтянин',
      en: 'Israeli',
    },
  },
  [ENationalities.EGYPTIAN]: {
    slug: ENationalities.EGYPTIAN,
    text: {
      am: 'Եգիպտացի',
      ru: 'Египтянин',
      en: 'Egyptian',
    },
  },
  [ENationalities.SOUTH_AFRICAN]: {
    slug: ENationalities.SOUTH_AFRICAN,
    text: {
      am: 'Հարավաֆրիկացի',
      ru: 'Южноафриканец',
      en: 'South African',
    },
  },
  [ENationalities.AUSTRALIAN]: {
    slug: ENationalities.AUSTRALIAN,
    text: {
      am: 'Ավստրալիացի',
      ru: 'Австралиец',
      en: 'Australian',
    },
  },
  [ENationalities.NEW_ZEALANDER]: {
    slug: ENationalities.NEW_ZEALANDER,
    text: {
      am: 'Նոր Զելանդացի',
      ru: 'Новозеландец',
      en: 'New Zealander',
    },
  },
  [ENationalities.MEXICAN]: {
    slug: ENationalities.MEXICAN,
    text: {
      am: 'Մեքսիկացի',
      ru: 'Мексиканец',
      en: 'Mexican',
    },
  },
  [ENationalities.BRAZILIAN]: {
    slug: ENationalities.BRAZILIAN,
    text: {
      am: 'Բրազիլացի',
      ru: 'Бразилец',
      en: 'Brazilian',
    },
  },
  [ENationalities.ARGENTINIAN]: {
    slug: ENationalities.ARGENTINIAN,
    text: {
      am: 'Արգենտինացի',
      ru: 'Аргентинец',
      en: 'Argentinian',
    },
  },
  [ENationalities.PERUVIAN]: {
    slug: ENationalities.PERUVIAN,
    text: {
      am: 'Պերուացի',
      ru: 'Перуанец',
      en: 'Peruvian',
    },
  },
  [ENationalities.CHILEAN]: {
    slug: ENationalities.CHILEAN,
    text: {
      am: 'Չիլիացի',
      ru: 'Чилиец',
      en: 'Chilean',
    },
  },
  [ENationalities.NIGERIAN]: {
    slug: ENationalities.NIGERIAN,
    text: {
      am: 'Նիգերիացի',
      ru: 'Нигериец',
      en: 'Nigerian',
    },
  },
  [ENationalities.KENYAN]: {
    slug: ENationalities.KENYAN,
    text: {
      am: 'Քենիացի',
      ru: 'Кениец',
      en: 'Kenyan',
    },
  },
  [ENationalities.ETHIOPIAN]: {
    slug: ENationalities.ETHIOPIAN,
    text: {
      am: 'Եթովպացի',
      ru: 'Эфиоп',
      en: 'Ethiopian',
    },
  },
  [ENationalities.MOROCCAN]: {
    slug: ENationalities.MOROCCAN,
    text: {
      am: 'Մարոկացի',
      ru: 'Марокканец',
      en: 'Moroccan',
    },
  },
  [ENationalities.ALGERIAN]: {
    slug: ENationalities.ALGERIAN,
    text: {
      am: 'Ալժիրցի',
      ru: 'Алжирец',
      en: 'Algerian',
    },
  },
  [ENationalities.TUNISIAN]: {
    slug: ENationalities.TUNISIAN,
    text: {
      am: 'Թունիսցի',
      ru: 'Тунисец',
      en: 'Tunisian',
    },
  },
  [ENationalities.GREEK]: {
    slug: ENationalities.GREEK,
    text: {
      am: 'Հունացի',
      ru: 'Грек',
      en: 'Greek',
    },
  },
  [ENationalities.SWEDISH]: {
    slug: ENationalities.SWEDISH,
    text: {
      am: 'Շվեդ',
      ru: 'Швед',
      en: 'Swedish',
    },
  },
  [ENationalities.NORWEGIAN]: {
    slug: ENationalities.NORWEGIAN,
    text: {
      am: 'Նորվեգացի',
      ru: 'Норвежец',
      en: 'Norwegian',
    },
  },
  [ENationalities.FINNISH]: {
    slug: ENationalities.FINNISH,
    text: {
      am: 'Ֆինն',
      ru: 'Финн',
      en: 'Finnish',
    },
  },
  [ENationalities.POLISH]: {
    slug: ENationalities.POLISH,
    text: {
      am: 'Լեհ',
      ru: 'Поляк',
      en: 'Polish',
    },
  },
  [ENationalities.CZECH]: {
    slug: ENationalities.CZECH,
    text: {
      am: 'Չեխ',
      ru: 'Чех',
      en: 'Czech',
    },
  },
  [ENationalities.SLOVAK]: {
    slug: ENationalities.SLOVAK,
    text: {
      am: 'Սլովակ',
      ru: 'Словак',
      en: 'Slovak',
    },
  },
  [ENationalities.HUNGARIAN]: {
    slug: ENationalities.HUNGARIAN,
    text: {
      am: 'Հունգարացի',
      ru: 'Венгр',
      en: 'Hungarian',
    },
  },
  [ENationalities.ROMANIAN]: {
    slug: ENationalities.ROMANIAN,
    text: {
      am: 'Ռումինացի',
      ru: 'Румын',
      en: 'Romanian',
    },
  },
  [ENationalities.BULGARIAN]: {
    slug: ENationalities.BULGARIAN,
    text: {
      am: 'Բուլղարացի',
      ru: 'Болгарин',
      en: 'Bulgarian',
    },
  },
  [ENationalities.CROATIAN]: {
    slug: ENationalities.CROATIAN,
    text: {
      am: 'Խորվաթ',
      ru: 'Хорват',
      en: 'Croatian',
    },
  },
  [ENationalities.SERBIAN]: {
    slug: ENationalities.SERBIAN,
    text: {
      am: 'Սերբ',
      ru: 'Серб',
      en: 'Serbian',
    },
  },
  [ENationalities.AUSTRIAN]: {
    slug: ENationalities.AUSTRIAN,
    text: {
      am: 'Ավստրիացի',
      ru: 'Австриец',
      en: 'Austrian',
    },
  },
  [ENationalities.SWISS]: {
    slug: ENationalities.SWISS,
    text: {
      am: 'Շվեյցարացի',
      ru: 'Швейцарец',
      en: 'Swiss',
    },
  },
  [ENationalities.DUTCH]: {
    slug: ENationalities.DUTCH,
    text: {
      am: 'Հոլանդացի',
      ru: 'Голландец',
      en: 'Dutch',
    },
  },
  [ENationalities.BELGIAN]: {
    slug: ENationalities.BELGIAN,
    text: {
      am: 'Բելգիացի',
      ru: 'Бельгиец',
      en: 'Belgian',
    },
  },
  [ENationalities.PORTUGUESE]: {
    slug: ENationalities.PORTUGUESE,
    text: {
      am: 'Պորտուգալացի',
      ru: 'Португалец',
      en: 'Portuguese',
    },
  },
  [ENationalities.IRISH]: {
    slug: ENationalities.IRISH,
    text: {
      am: 'Իռլանդացի',
      ru: 'Ирландец',
      en: 'Irish',
    },
  },
  [ENationalities.SCOTTISH]: {
    slug: ENationalities.SCOTTISH,
    text: {
      am: 'Շոտլանդացի',
      ru: 'Шотландец',
      en: 'Scottish',
    },
  },
  [ENationalities.WELSH]: {
    slug: ENationalities.WELSH,
    text: {
      am: 'Ուելսցի',
      ru: 'Валлиец',
      en: 'Welsh',
    },
  },
  [ENationalities.ICELANDIC]: {
    slug: ENationalities.ICELANDIC,
    text: {
      am: 'Իսլանդացի',
      ru: 'Исландец',
      en: 'Icelandic',
    },
  },
  [ENationalities.LATVIAN]: {
    slug: ENationalities.LATVIAN,
    text: {
      am: 'Լատվիացի',
      ru: 'Латыш',
      en: 'Latvian',
    },
  },
  [ENationalities.LITHUANIAN]: {
    slug: ENationalities.LITHUANIAN,
    text: {
      am: 'Լիտվացի',
      ru: 'Литовец',
      en: 'Lithuanian',
    },
  },
  [ENationalities.ESTONIAN]: {
    slug: ENationalities.ESTONIAN,
    text: {
      am: 'Էստոնացի',
      ru: 'Эстонец',
      en: 'Estonian',
    },
  },
  [ENationalities.GEORGIAN]: {
    slug: ENationalities.GEORGIAN,
    text: {
      am: 'Վրացի',
      ru: 'Грузин',
      en: 'Georgian',
    },
  },
  [ENationalities.AZERBAIJANI]: {
    slug: ENationalities.AZERBAIJANI,
    text: {
      am: 'Ադրբեջանցի',
      ru: 'Азербайджанец',
      en: 'Azerbaijani',
    },
  },
  [ENationalities.KAZAKH]: {
    slug: ENationalities.KAZAKH,
    text: {
      am: 'Ղազախ',
      ru: 'Казах',
      en: 'Kazakh',
    },
  },
  [ENationalities.UZBEK]: {
    slug: ENationalities.UZBEK,
    text: {
      am: 'Ուզբեկ',
      ru: 'Узбек',
      en: 'Uzbek',
    },
  },
  [ENationalities.KYRGYZ]: {
    slug: ENationalities.KYRGYZ,
    text: {
      am: 'Ղրղզ',
      ru: 'Киргиз',
      en: 'Kyrgyz',
    },
  },
  [ENationalities.TAJIK]: {
    slug: ENationalities.TAJIK,
    text: {
      am: 'Տաջիկ',
      ru: 'Таджик',
      en: 'Tajik',
    },
  },
  [ENationalities.TURKMEN]: {
    slug: ENationalities.TURKMEN,
    text: {
      am: 'Թուրքմեն',
      ru: 'Туркмен',
      en: 'Turkmen',
    },
  },
  [ENationalities.SINGAPOREAN]: {
    slug: ENationalities.SINGAPOREAN,
    text: {
      am: 'Սինգապուրցի',
      ru: 'Сингапурец',
      en: 'Singaporean',
    },
  },
  [ENationalities.MALAYSIAN]: {
    slug: ENationalities.MALAYSIAN,
    text: {
      am: 'Մալայզիացի',
      ru: 'Малайзиец',
      en: 'Malaysian',
    },
  },
  [ENationalities.INDONESIAN]: {
    slug: ENationalities.INDONESIAN,
    text: {
      am: 'Ինդոնեզիացի',
      ru: 'Индонезиец',
      en: 'Indonesian',
    },
  },
  [ENationalities.THAI]: {
    slug: ENationalities.THAI,
    text: {
      am: 'Թաիլանդացի',
      ru: 'Тайец',
      en: 'Thai',
    },
  },
  [ENationalities.VIETNAMESE]: {
    slug: ENationalities.VIETNAMESE,
    text: {
      am: 'Վիետնամցի',
      ru: 'Вьетнамец',
      en: 'Vietnamese',
    },
  },
  [ENationalities.FILIPINO]: {
    slug: ENationalities.FILIPINO,
    text: {
      am: 'Ֆիլիպինցի',
      ru: 'Филиппинец',
      en: 'Filipino',
    },
  },
  [ENationalities.MYANMAR]: {
    slug: ENationalities.MYANMAR,
    text: {
      am: 'Մյանմացի',
      ru: 'Мьянмарец',
      en: 'Burmese',
    },
  },
  [ENationalities.CAMBODIAN]: {
    slug: ENationalities.CAMBODIAN,
    text: {
      am: 'Կամբոջացի',
      ru: 'Камбоджиец',
      en: 'Cambodian',
    },
  },
  [ENationalities.LAO]: {
    slug: ENationalities.LAO,
    text: {
      am: 'Լաոսցի',
      ru: 'Лаосец',
      en: 'Lao',
    },
  },
  [ENationalities.SOUTH_KOREAN]: {
    slug: ENationalities.SOUTH_KOREAN,
    text: {
      am: 'Հարավկորեացի',
      ru: 'Южнокореец',
      en: 'South Korean',
    },
  },
  [ENationalities.NORTH_KOREAN]: {
    slug: ENationalities.NORTH_KOREAN,
    text: {
      am: 'Հյուսիսկորեացի',
      ru: 'Северокореец',
      en: 'North Korean',
    },
  },
  [ENationalities.SAUDI]: {
    slug: ENationalities.SAUDI,
    text: {
      am: 'Սաուդցի',
      ru: 'Саудовец',
      en: 'Saudi',
    },
  },
  [ENationalities.UAE]: {
    slug: ENationalities.UAE,
    text: {
      am: 'Էմիրատցի',
      ru: 'Эмиратец',
      en: 'Emirati',
    },
  },
  [ENationalities.QATARI]: {
    slug: ENationalities.QATARI,
    text: {
      am: 'Կատարցի',
      ru: 'Катарец',
      en: 'Qatari',
    },
  },
  [ENationalities.KUWAITI]: {
    slug: ENationalities.KUWAITI,
    text: {
      am: 'Քուվեյցի',
      ru: 'Кувейтец',
      en: 'Kuwaiti',
    },
  },
  [ENationalities.BAHRAINI]: {
    slug: ENationalities.BAHRAINI,
    text: {
      am: 'Բահրեյնցի',
      ru: 'Бахрейнец',
      en: 'Bahraini',
    },
  },
  [ENationalities.OMANI]: {
    slug: ENationalities.OMANI,
    text: {
      am: 'Օմանցի',
      ru: 'Оманец',
      en: 'Omani',
    },
  },
  [ENationalities.SYRIAN]: {
    slug: ENationalities.SYRIAN,
    text: {
      am: 'Սիրիացի',
      ru: 'Сириец',
      en: 'Syrian',
    },
  },
  [ENationalities.LEBANESE]: {
    slug: ENationalities.LEBANESE,
    text: {
      am: 'Լիբանանցի',
      ru: 'Ливанец',
      en: 'Lebanese',
    },
  },
  [ENationalities.JORDANIAN]: {
    slug: ENationalities.JORDANIAN,
    text: {
      am: 'Հորդանանցի',
      ru: 'Иорданец',
      en: 'Jordanian',
    },
  },
  [ENationalities.PALESTINIAN]: {
    slug: ENationalities.PALESTINIAN,
    text: {
      am: 'Պաղեստինցի',
      ru: 'Палестинец',
      en: 'Palestinian',
    },
  },
  [ENationalities.ZIMBABWEAN]: {
    slug: ENationalities.ZIMBABWEAN,
    text: {
      am: 'Զիմբաբվեցի',
      ru: 'Зимбабвиец',
      en: 'Zimbabwean',
    },
  },
  [ENationalities.ZAMBIAN]: {
    slug: ENationalities.ZAMBIAN,
    text: {
      am: 'Զամբիացի',
      ru: 'Замбиец',
      en: 'Zambian',
    },
  },
  [ENationalities.UGANDAN]: {
    slug: ENationalities.UGANDAN,
    text: {
      am: 'Ուգանդացի',
      ru: 'Угандец',
      en: 'Ugandan',
    },
  },
  [ENationalities.TANZANIAN]: {
    slug: ENationalities.TANZANIAN,
    text: {
      am: 'Տանզանիացի',
      ru: 'Танзаниец',
      en: 'Tanzanian',
    },
  },
  [ENationalities.GHANAIAN]: {
    slug: ENationalities.GHANAIAN,
    text: {
      am: 'Գանացի',
      ru: 'Ганец',
      en: 'Ghanaian',
    },
  },
  [ENationalities.IVORIAN]: {
    slug: ENationalities.IVORIAN,
    text: {
      am: 'Կոտ դ’Իվուարիացի',
      ru: 'Ивуариец',
      en: 'Ivorian',
    },
  },
  [ENationalities.SOUTH_SUDANESE]: {
    slug: ENationalities.SOUTH_SUDANESE,
    text: {
      am: 'Հարավսուդանցի',
      ru: 'Южносуданец',
      en: 'South Sudanese',
    },
  },
  [ENationalities.SENEGALESE]: {
    slug: ENationalities.SENEGALESE,
    text: {
      am: 'Սենեգալցի',
      ru: 'Сенегалец',
      en: 'Senegalese',
    },
  },
  [ENationalities.CONGOLESE]: {
    slug: ENationalities.CONGOLESE,
    text: {
      am: 'Կոնգոլեզցի',
      ru: 'Конголезец',
      en: 'Congolese',
    },
  },
  [ENationalities.ANGOLAN]: {
    slug: ENationalities.ANGOLAN,
    text: {
      am: 'Անգոլացի',
      ru: 'Анголец',
      en: 'Angolan',
    },
  },
  [ENationalities.CAMEROONIAN]: {
    slug: ENationalities.CAMEROONIAN,
    text: {
      am: 'Կամերունցի',
      ru: 'Камерунец',
      en: 'Cameroonian',
    },
  },
  [ENationalities.MALIAN]: {
    slug: ENationalities.MALIAN,
    text: {
      am: 'Մալիացի',
      ru: 'Малиец',
      en: 'Malian',
    },
  },
  [ENationalities.BURKINABE]: {
    slug: ENationalities.BURKINABE,
    text: {
      am: 'Բուրկինաբեցի',
      ru: 'Буркинец',
      en: 'Burkinabé',
    },
  },
};