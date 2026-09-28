"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "RU" | "UZ";
type LocalizedText = Record<Language, string>;

type ArticleBlock = {
  title: LocalizedText;
  items: Record<Language, string[]>;
  images?: { src: string; alt: LocalizedText }[];
};

type Article = {
  title: LocalizedText;
  intro: LocalizedText;
  blocks: ArticleBlock[];
};

type KnowledgeSection = {
  id: string;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
  articles: string[];
};

const menuItems = [
  { id: "Главная", icon: "🏠", RU: "Главная", UZ: "Bosh sahifa" },
  { id: "База знаний", icon: "📚", RU: "База знаний", UZ: "Bilimlar bazasi" },
  { id: "Скрипты", icon: "🗣", RU: "Скрипты", UZ: "Skriptlar" },
  { id: "Навигатор решений", icon: "🧭", RU: "Навигатор решений", UZ: "Yechimlar navigatori" },
  { id: "Обучение", icon: "🎓", RU: "Обучение", UZ: "Ta'lim" },
  { id: "Аналитика", icon: "📊", RU: "Аналитика", UZ: "Tahlil" },
  { id: "Управление базой", icon: "⚙️", RU: "Управление базой", UZ: "Bazani boshqarish" },
];

const ui: Record<Language, Record<string, string>> = {
  RU: {
    mainMenu: "Главное меню",
    internalSystem: "Внутренняя система",
    knowledgeBaseContact: "База знаний контакт-центра",
    contactCenter: "Контакт-центр",
    workKnowledge: "Рабочая база знаний Hurma Lombard",
    operator: "Оператор",
    welcome: "Добро пожаловать 👋",
    welcomeText: "Найдите нужную информацию и быстро разберитесь с вопросом клиента.",
    homeSearchPlaceholder: "Поиск по базе знаний и филиалам...",
    quickAccess: "Быстрый доступ",
    quickAccessText: "Основные инструменты контакт-центра",
    calculator: "Калькулятор",
    calculatorText: "Быстрый расчёт суммы займа, процентов и общей суммы к погашению.",
    favorites: "Избранное",
    favoritesText: "Сохранённые статьи и информация, которую вы используете чаще всего.",
    company: "О компании",
    companyCardText: "Официальная информация о Hurma Lombard, миссии и развитии сети.",
    contract: "Договор займа",
    contractCardText: "Основные условия договора для быстрого просмотра оператором.",
    branches: "Филиалы",
    branchesCardText: "Поиск филиала по названию, номеру, региону или адресу.",
    open: "Открыть →",
    openArticle: "Открыть статью →",
    noResults: "Ничего не найдено",
    tryAnother: "Попробуйте изменить запрос.",
    knowledgeTitle: "База знаний",
    knowledgeSubtitle: "Выберите нужный раздел информации.",
    searchKnowledge: "Поиск по базе знаний...",
    backToSections: "← Назад к разделам",
    backToTopics: "← Назад к темам",
    topics: "тем",
    branchesTitle: "Филиалы",
    branchesSubtitle: "Найдите нужный филиал по названию, номеру, региону или адресу.",
    found: "Найдено",
    allRegions: "Все регионы",
    branchSearchPlaceholder: "Поиск филиала...",
    map: "Открыть карту",
    noBranches: "Филиалы не найдены",
    noBranchesText: "Попробуйте изменить поиск или регион.",
    companyTitle: "О компании",
    whoWeAre: "Кто мы",
    mission: "Наша миссия",
    contractNotLoaded: "Договор ещё не загружен",
    contractNotLoadedText: "Когда ты пришлёшь договор, мы разместим его здесь и отдельно вынесем ключевые условия для оператора.",
    loanCalculator: "Калькулятор займа",
    loanCalculatorText: "Введите сумму и количество дней, чтобы быстро рассчитать начисление процентов.",
    calculatorLoanTab: "Расчёт займа",
    calculatorPenaltyTab: "Расчёт пени",
    penaltyCalculatorTitle: "Расчёт пени за 1 день",
    penaltyCalculatorText: "После окончания основного срока 30 дней сначала учитываются причитающиеся проценты по продукту, затем пеня рассчитывается от основной суммы долга вместе с этими процентами.",
    principalDebt: "Сумма займа / основной долг",
    dueInterest: "Причитающиеся проценты за 30 дней",
    penaltyRate: "Ставка пени за 1 день",
    penaltyBase: "Основание для расчёта пени",
    penaltyAmount: "Пеня за 1 день",
    totalWithPenalty: "Общая сумма с пеней",
    penaltyStepOne: "1. Сумма, от которой рассчитывается пеня",
    penaltyStepTwo: "2. Расчёт пени за 1 день",
    penaltyFormulaBase: "Основной долг + причитающиеся проценты за 30 дней",
    penaltyFormulaRate: "× 0,8%",
    penaltyWarning: "Это примерная сумма. Для получения полной информации необходимо обратиться в филиал.",
    loanAmount: "Сумма займа",
    loanDays: "Количество дней",
    loanProduct: "Продукт",
    productRate: "Ставка продукта",
    productInterest: "Причитающиеся проценты за 30 дней",
    penaltyAfterTermNote: "Пеня начисляется после окончания основного срока займа — после 30 дней.",
    dailyRate: "Ставка в день",
    dailyAccrual: "Начисление за 1 день",
    monthlyAccrual: "Начисление за 30 дней",
    interest: "Начисленные проценты",
    total: "Итого к погашению",
    selectedPeriod: "За выбранный срок",
    calculatorHint: "Расчёт выполнен по действующим ставкам продуктов. Пеня и другие дополнительные начисления в расчёт не включены.",
    amountOut: "Сумма вне диапазона продуктов",
    favoriteAdded: "В избранном",
    addFavorite: "Добавить в избранное",
    emptyFavorites: "Избранное пока пусто",
    emptyFavoritesText: "Откройте статью в Базе знаний и добавьте её в избранное.",
    added: "Добавлено в избранное",
    contractMain: "Договор займа",
    otherLater: "Этот раздел будет добавлен позже.",
    noArticle: "Информация пока не добавлена.",
    navigatorTitle: "Навигатор решений",
    navigatorSubtitle: "Пошаговая помощь оператору в нестандартных ситуациях и при оформлении обращений клиентов.",
    navigatorBack: "← Назад к навигатору",
    navigatorBackFlows: "← Назад к ситуациям",
    navigatorStep: "Шаг",
    navigatorImportant: "Важно",
    navigatorOpenKnowledge: "Открыть в Базе знаний →",
    navigatorComplete: "Ситуация обработана",
    navigatorCompleteText: "После выполнения шагов обращение можно завершить или передать на дальнейшую проверку согласно внутреннему порядку.",
    trainingTitle: "Обучение",
    trainingSubtitle: "Материалы обучения и тестирование сотрудников.",
    trainingTestTitle: "Тест по Базе знаний",
    trainingTestText: "Пройдите тест по материалам Базы знаний. Результаты и отправка ответов выполняются в Google Forms.",
    searchArticle: "База знаний",
    searchNavigator: "Навигатор решений",
    searchScript: "Скрипты",
    searchBranch: "Филиалы",
    searchSection: "Раздел",
    searchOpen: "Открыть",
    searchNothing: "По вашему запросу ничего подходящего не найдено",
    searchDidYouMean: "Похоже, вы искали",
  },
  UZ: {
    mainMenu: "Asosiy menyu",
    internalSystem: "Ichki tizim",
    knowledgeBaseContact: "Kontakt-markaz bilimlar bazasi",
    contactCenter: "Kontakt-markaz",
    workKnowledge: "Hurma Lombard ishchi bilimlar bazasi",
    operator: "Operator",
    welcome: "Xush kelibsiz 👋",
    welcomeText: "Kerakli ma'lumotni toping va mijoz savolini tezda hal qiling.",
    homeSearchPlaceholder: "Bilimlar bazasi va filiallardan qidirish...",
    quickAccess: "Tezkor kirish",
    quickAccessText: "Kontakt-markazning asosiy vositalari",
    calculator: "Kalkulyator",
    calculatorText: "Kredit summasi, foizlar va to‘lanadigan umumiy summani tez hisoblang.",
    favorites: "Sevimlilar",
    favoritesText: "Eng ko‘p foydalanadigan saqlangan maqolalar va ma'lumotlar.",
    company: "Kompaniya haqida",
    companyCardText: "Hurma Lombard, missiyasi va tarmoq rivoji haqida rasmiy ma'lumot.",
    contract: "Kredit shartnomasi",
    contractCardText: "Operator uchun shartnomaning asosiy shartlarini tez ko‘rish.",
    branches: "Filiallar",
    branchesCardText: "Filialni nomi, raqami, hududi yoki manzili bo‘yicha qidiring.",
    open: "Ochish →",
    openArticle: "Maqolani ochish →",
    noResults: "Hech narsa topilmadi",
    tryAnother: "Qidiruv so‘rovini o‘zgartirib ko‘ring.",
    knowledgeTitle: "Bilimlar bazasi",
    knowledgeSubtitle: "Kerakli ma'lumot bo‘limini tanlang.",
    searchKnowledge: "Bilimlar bazasidan qidirish...",
    backToSections: "← Bo‘limlarga qaytish",
    backToTopics: "← Mavzularga qaytish",
    topics: "mavzu",
    branchesTitle: "Filiallar",
    branchesSubtitle: "Filialni nomi, raqami, hududi yoki manzili bo‘yicha toping.",
    found: "Topildi",
    allRegions: "Barcha hududlar",
    branchSearchPlaceholder: "Filial qidirish...",
    map: "Xaritani ochish",
    noBranches: "Filiallar topilmadi",
    noBranchesText: "Qidiruv yoki hududni o‘zgartirib ko‘ring.",
    companyTitle: "Kompaniya haqida",
    whoWeAre: "Biz kimmiz",
    mission: "Bizning missiyamiz",
    contractNotLoaded: "Shartnoma hali yuklanmagan",
    contractNotLoadedText: "Shartnomani yuborganingizdan so‘ng, uni shu yerga joylashtiramiz va operator uchun asosiy shartlarni alohida chiqaramiz.",
    loanCalculator: "Kredit kalkulyatori",
    loanCalculatorText: "Foizlarni tez hisoblash uchun summa va kunlar sonini kiriting.",
    calculatorLoanTab: "Kredit hisob-kitobi",
    calculatorPenaltyTab: "Penya hisob-kitobi",
    penaltyCalculatorTitle: "1 kunlik penya hisob-kitobi",
    penaltyCalculatorText: "Asosiy 30 kunlik muddat tugagach, avval mahsulot bo‘yicha tegishli foizlar hisobga olinadi, keyin penya asosiy qarz va shu foizlar yig‘indisidan hisoblanadi.",
    principalDebt: "Kredit summasi / asosiy qarz",
    dueInterest: "30 kunlik tegishli foizlar",
    penaltyRate: "1 kunlik penya stavkasi",
    penaltyBase: "Penya hisoblash uchun asos",
    penaltyAmount: "1 kunlik penya",
    totalWithPenalty: "Penya bilan umumiy summa",
    penaltyStepOne: "1. Penya hisoblanadigan summa",
    penaltyStepTwo: "2. 1 kunlik penya hisob-kitobi",
    penaltyFormulaBase: "Asosiy qarz + 30 kunlik tegishli foizlar",
    penaltyFormulaRate: "× 0,8%",
    penaltyWarning: "Bu taxminiy summa. To‘liq ma’lumot olish uchun filialga murojaat qilish kerak.",
    loanAmount: "Kredit summasi",
    loanDays: "Kunlar soni",
    loanProduct: "Mahsulot",
    productRate: "Mahsulot stavkasi",
    productInterest: "30 kunlik tegishli foizlar",
    penaltyAfterTermNote: "Penya kreditning asosiy muddati — 30 kun tugagandan so‘ng hisoblanadi.",
    dailyRate: "Kunlik stavka",
    dailyAccrual: "1 kun uchun hisoblanadigan summa",
    monthlyAccrual: "30 kun uchun hisoblanadigan summa",
    interest: "Hisoblangan foiz",
    total: "Jami to‘lov",
    selectedPeriod: "Tanlangan muddat uchun",
    calculatorHint: "Hisob-kitob amaldagi mahsulot stavkalari asosida bajarildi. Penya va boshqa qo‘shimcha hisob-kitoblar kiritilmagan.",
    amountOut: "Summa mahsulotlar diapazonidan tashqarida",
    favoriteAdded: "Sevimlilarda",
    addFavorite: "Sevimlilarga qo‘shish",
    emptyFavorites: "Sevimlilar hozircha bo‘sh",
    emptyFavoritesText: "Bilimlar bazasidagi maqolani ochib, uni sevimlilarga qo‘shing.",
    added: "Sevimlilarga qo‘shildi",
    contractMain: "Kredit shartnomasi",
    otherLater: "Bu bo‘lim keyinroq qo‘shiladi.",
    noArticle: "Ma'lumot hozircha qo‘shilmagan.",
    navigatorTitle: "Yechimlar navigatori",
    navigatorSubtitle: "Nostandart holatlarda va mijoz murojaatlarini rasmiylashtirishda operatorga bosqichma-bosqich yordam beradi.",
    navigatorBack: "← Navigatorga qaytish",
    navigatorBackFlows: "← Holatlarga qaytish",
    navigatorStep: "Qadam",
    navigatorImportant: "Muhim",
    navigatorOpenKnowledge: "Bilimlar bazasida ochish →",
    navigatorComplete: "Holat qayta ishlandi",
    navigatorCompleteText: "Qadamlarni bajargandan so'ng murojaatni yakunlash yoki ichki tartibga muvofiq keyingi tekshiruvga yuborish mumkin.",
    trainingTitle: "Ta'lim",
    trainingSubtitle: "Ta'lim materiallari va xodimlarni testdan o'tkazish.",
    trainingTestTitle: "Bilimlar bazasi bo'yicha test",
    trainingTestText: "Bilimlar bazasi materiallari bo'yicha testdan o'ting. Javoblarni yuborish va natijalar Google Forms orqali amalga oshiriladi.",
    searchArticle: "Bilimlar bazasi",
    searchNavigator: "Yechimlar navigatori",
    searchScript: "Skriptlar",
    searchBranch: "Filiallar",
    searchSection: "Bo‘lim",
    searchOpen: "Ochish",
    searchNothing: "So‘rovingiz bo‘yicha mos ma’lumot topilmadi",
    searchDidYouMean: "Siz shuni qidirgan bo‘lishingiz mumkin",
  },
};

const knowledgeSections: KnowledgeSection[] = [
  {
    id: "loans",
    icon: "💰",
    title: { RU: "Займы", UZ: "Kreditlar" },
    description: {
      RU: "Получение займа, суммы, тарифы, срок пользования и реализация.",
      UZ: "Kredit olish, summalar, tariflar, foydalanish muddati va realizatsiya.",
    },
    articles: ["loan-eligibility", "loan-products", "loan-term", "realization"],
  },
  {
    id: "operations",
    icon: "⚙️",
    title: { RU: "Операции по займу", UZ: "Kredit bo‘yicha operatsiyalar" },
    description: {
      RU: "Каждая операция по действующему займу вынесена в отдельную тему.",
      UZ: "Amaldagi kredit bo‘yicha har bir operatsiya alohida mavzu sifatida berilgan.",
    },
    articles: [
      "loan-extension",
      "partial-repayment",
      "loan-repayment",
      "loan-reissue",
      "loan-additional",
      "collateral-replacement",
      "partial-buyback",
    ],
  },
  {
    id: "collateral",
    icon: "💎",
    title: { RU: "Залог", UZ: "Garov" },
    description: {
      RU: "Что принимается в залог и как проводится оценка изделия.",
      UZ: "Garovga nimalar qabul qilinishi va buyum qanday baholanishi.",
    },
    articles: ["collateral-types", "collateral-valuation"],
  },
  {
    id: "payments",
    icon: "💳",
    title: { RU: "Оплата", UZ: "To‘lov" },
    description: {
      RU: "Общие правила доступных способов оплаты и онлайн-операций.",
      UZ: "Mavjud to‘lov usullari va onlayn operatsiyalarning umumiy qoidalari.",
    },
    articles: ["online-payment"],
  },
];

const loanProducts = [
  { name: "Yaqin", min: 300000, max: 4999999, dailyRate: 0.003, monthlyRate: 0.09 },
  { name: "Ishonch", min: 5000000, max: 9999999, dailyRate: 0.0027, monthlyRate: 0.081 },
  { name: "Hamkor", min: 10000000, max: 19999999, dailyRate: 0.0023, monthlyRate: 0.069 },
  { name: "Barqaror", min: 20000000, max: 100000000, dailyRate: 0.002, monthlyRate: 0.06 },
];

const branches = [
  {
    "id": 1,
    "name": "Кадышева 1",
    "branch": "филиал 1",
    "region": "г.Ташкент",
    "newName": "F - 01-01-01 KADISHEVA",
    "address": "Ташкент шахар Фазогир кучаси, Авиасозлар 3 массив, 45 уй, 74 хонадон"
  },
  {
    "id": 2,
    "name": "Кадышева2",
    "branch": "филиал 2",
    "region": "г.Ташкент",
    "newName": "F - 01-01-02 KADISHEVA-2",
    "address": "Ташкент шахар Авиасозлар 1-массив, 115 уй, 259 хонадон"
  },
  {
    "id": 3,
    "name": "Себзар",
    "branch": "филиал 3",
    "region": "г.Ташкент",
    "newName": "F - 01-01-03 SEBZOR (Себзар Мед)",
    "address": "Ташкент шахар Себзар массиви М-17/18, 4 уй, 100 хонадон"
  },
  {
    "id": 4,
    "name": "Чирчик",
    "branch": "филиал 4",
    "region": "Ташкентская область",
    "newName": "F - 10-01-04 CHIRCHIQ (Салон Лола)",
    "address": "Ташкент вилояти, Чирчик шахри, П.Юсупова кучаси 36 уй 25 хонадон"
  },
  {
    "id": 5,
    "name": "Самарканд Сияб базар",
    "branch": "филиал 5",
    "region": "Самаркандская область",
    "newName": "F - 30-01-05 SAMARKAND (Сиёб)",
    "address": "г. Самарканд, МФЙ «Дахбедий», улица Бибихоним, дом 8."
  },
  {
    "id": 6,
    "name": "Самарканд ГУМ",
    "branch": "филиал 6",
    "region": "Самаркандская область",
    "newName": "F - 30-01-06 SAMARKAND (ГУМ)",
    "address": "Самарканд шахар Мирзо Улугбек кучаси 22 уй"
  },
  {
    "id": 7,
    "name": "Чиназ",
    "branch": "филиал 7",
    "region": "Ташкентская область",
    "newName": "F - 10-01-07 CHINOZ (Центр)",
    "address": "Ташкентская вилояти, Чиназ тумани, Кози МФЙ, Самарканд кучаси 88 уй"
  },
  {
    "id": 8,
    "name": "Янгиюль",
    "branch": "филиал 8",
    "region": "Ташкентская область",
    "newName": "F - 10-01-08 YANGIYO'L (Хавас)",
    "address": "Ташкентская вилояти, Янгийул шахри Самарканд кучаси 126А уй"
  },
  {
    "id": 9,
    "name": "Фархадский",
    "branch": "филиал 9",
    "region": "г.Ташкент",
    "newName": "F - 01-01-09 FARXOD (Базар)",
    "address": "Ташкент шахар, Г9А квартал, 17 уй 66 хонадон"
  },
  {
    "id": 10,
    "name": "Сельский",
    "branch": "филиал 10",
    "region": "Самаркандская область",
    "newName": "F - 30-01-10 SAMARKAND (Сельский больница)",
    "address": "Самарканд вилояти, Кусахо МФЙ, А.Маруфов кучаси 1 уй"
  },
  {
    "id": 11,
    "name": "Джизак",
    "branch": "филиал 11",
    "region": "Жиззахская область",
    "newName": "F - 25-01-11 JIZZAX (Станция)",
    "address": "Джиззах шахар, Маданият МФЙ, Ташкент кучаси"
  },
  {
    "id": 12,
    "name": "Ангрен",
    "branch": "филиал 12",
    "region": "Ташкентская область",
    "newName": "F - 10-01-12 ANGREN (Базар)",
    "address": "Ташкент вилояти, Ангрен тумани, Навои кучаси"
  },
  {
    "id": 13,
    "name": "Денау",
    "branch": "филиал 13",
    "region": "Сурхандарьинская область",
    "newName": "F - 75-01-13 DENOV (Хамкор банк)",
    "address": "Сурхандарьинская область, Денауский район, МФЙ «Богинав», улица Бахтли, дом 113."
  },
  {
    "id": 14,
    "name": "Андижан",
    "branch": "филиал 14",
    "region": "Андижанская область",
    "newName": "F - 60-01-14 ANDIJON (гостиница ELIT)",
    "address": "Андижон вилояти Андижон шахри, Мустакиллик МФЙ, Бобур Шох кучаси 21-а уй"
  },
  {
    "id": 15,
    "name": "Галаарол",
    "branch": "филиал 15",
    "region": "Жиззахская область",
    "newName": "F - 25-01-15 GALLAOROL (Базар)",
    "address": "Джизакская область, Галляаральский район, МФЙ «Гафур Гулом», улица Гафура Гулома, дом 38."
  },
  {
    "id": 16,
    "name": "Алмалык",
    "branch": "филиал 16",
    "region": "Ташкентская область",
    "newName": "F - 10-01-16 OLMALIQ (Ойдин базар)",
    "address": "Toshkent viloyati, Olmaliq, Hamza MFY, Extirom ko’chasi, 197-uy"
  },
  {
    "id": 17,
    "name": "Каттакурган",
    "branch": "филиал 17",
    "region": "Самаркандская область",
    "newName": "F - 30-01-17 KATTAQORG'ON (Зебо дом быта)",
    "address": "Самарканд вилояти Каттакургон шахри, Кориравот МФЙ, Самарканд кучаси 48 уй"
  },
  {
    "id": 18,
    "name": "Гулистан",
    "branch": "филиал 18",
    "region": "Сырдарьинская облать",
    "newName": "F - 20-01-18 GULISTON (Офис Билайн)",
    "address": "Сирдарё вилояти Гулистон шахри, квартал охар 2, Тараккиет МФЙ, Сайхун кучаси 1 уй"
  },
  {
    "id": 19,
    "name": "Карши",
    "branch": "филиал 19",
    "region": "Кашкадарьинская облать",
    "newName": "F - 70-01-19 QARSHI (Аптека-45)",
    "address": "Кашкадарё вилояти,Карши шахри, МФЙ Табассум, Шарк кучаси"
  },
  {
    "id": 20,
    "name": "Шахрисабс",
    "branch": "филиал 20",
    "region": "Кашкадарьинская облать",
    "newName": "F - 70-01-20 SHAXRISABZ (Гостиница Улугбек)",
    "address": "Кашкадарё вилояти, Шахрисабз шахри, МФЙ Галаба, Ипак Йули кучаси 98 уй"
  },
  {
    "id": 21,
    "name": "Китаб",
    "branch": "филиал 21",
    "region": "Кашкадарьинская облать",
    "newName": "F - 70-01-21 KITOB (Ресторан Шох Сарой)",
    "address": "Кашкадарё вилояти, Китаб шахри, Буюк Ипак Йули кучаси"
  },
  {
    "id": 22,
    "name": "Янгибазар",
    "branch": "филиал 22",
    "region": "Ташкентская область",
    "newName": "F - 10-01-22 YANGIBAZAR (Хавас)",
    "address": "Ташкент вилояти, Юкори Чирчик тумани, Янгибазар тумани, Мустакиллик кучаси"
  },
  {
    "id": 23,
    "name": "Ургут",
    "branch": "филиал 23",
    "region": "Самаркандская область",
    "newName": "F - 30-01-23 URGUT (Самон базар)",
    "address": "Самаркандская область, Ургутский район, МФЙ «Дустлик», улица Почвон, дом 317."
  },
  {
    "id": 24,
    "name": "Ходжиабад",
    "branch": "филиал 24",
    "region": "Андижанская область",
    "newName": "F - 60-01-24 XO’JAOBOD (Хумо фарм)",
    "address": "Андижон вилояти, Ходжаабад тумани, А.Навои кучаси"
  },
  {
    "id": 25,
    "name": "Ходжейли",
    "branch": "филиал 25",
    "region": "Республика Каракалпстан",
    "newName": "F - 95-01-25 XO’JAYLI (Районная Больница)",
    "address": "Каракалпакстан Республикаси, Ходжайли тумани Джилпек жоли кучаси 36 уй"
  },
  {
    "id": 26,
    "name": "Джизак 2",
    "branch": "филиал 26",
    "region": "Жиззахская область",
    "newName": "F - 25-01-26 JIZZAX-2 (Ором базар)",
    "address": "Жиззах вилояти, Жиззах шахри Халкообод МФЙ, Мустакиллик кучаси 55 уй"
  },
  {
    "id": 27,
    "name": "Кургантепа",
    "branch": "филиал 27",
    "region": "Андижанская область",
    "newName": "F - 60-01-27 QO‘RG‘ONTEPA (Эко базар)",
    "address": "Андижон вилояти, Кургантепа тумани, Янги Хаёт МФЙ, Порлок келажак кучаси"
  },
  {
    "id": 28,
    "name": "Бухара 1",
    "branch": "филиал 28",
    "region": "Бухарская облать",
    "newName": "F - 80-01-28 BUXORO - 1 (Гор газ)",
    "address": "Бухаро шахар, Навруз МФЙ, Ислом Каримов кучаси 9 уй"
  },
  {
    "id": 29,
    "name": "Бухара 2",
    "branch": "филиал 29",
    "region": "Бухарская облать",
    "newName": "F - 80-01-29 BUXORO - 2 (Карбан базар)",
    "address": "г. Бухара, рынок «Карвон»"
  },
  {
    "id": 30,
    "name": "Кумкурган",
    "branch": "филиал 30",
    "region": "Сурхандарьинская область",
    "newName": "F - 75-01-30 QUMQO'RG'ON (Барака базар)",
    "address": "Сурхандарьинская область, Кумкурганский район, населенный пункт Бешкахрамон, улица Дилнаво, дом-2"
  },
  {
    "id": 31,
    "name": "Шахрихан",
    "branch": "филиал 31",
    "region": "Андижанская область",
    "newName": "F - 60-01-31 SHAНRIXON (Парк)",
    "address": "Андижанская область, Шахриханский район, населенный пункт Шахрихонлик, улица А.Темура, дом 45"
  },
  {
    "id": 32,
    "name": "Фергана",
    "branch": "филиал 32",
    "region": "Ферганская облать",
    "newName": "F - 40-01-32 FARG‘ONA (Центр Золота)",
    "address": "Ферганская область, город Фергана, населенный пункт Бахор, улица Бозорбоши, дом 31"
  },
  {
    "id": 33,
    "name": "Термез",
    "branch": "филиал 33",
    "region": "Сурхандарьинская область",
    "newName": "F - 75-01-33 TERMIZ (Узмобайл)",
    "address": "Сурхандарьинская область, город Термез, населенный пункт Тупроккургон, улица Алишер Навоий, 32 дом"
  },
  {
    "id": 34,
    "name": "Асака",
    "branch": "филиал 34",
    "region": "Андижанская область",
    "newName": "F - 60-01-34 АSAKA (Базар)",
    "address": "Андижанская область, Асакинский район, населенный пункт Барака, улица Асака, дом 509."
  },
  {
    "id": 35,
    "name": "Чиназ 2",
    "branch": "филиал 35",
    "region": "Ташкентская область",
    "newName": "F - 10-01-35 CHINOZ-2 (Единое окно)",
    "address": "Чиназский район, населенный пункт Бунедкор, улица Шарофа Рашидова, дом 43."
  },
  {
    "id": 36,
    "name": "Наманган",
    "branch": "филиал 36",
    "region": "Наманганская облать",
    "newName": "F - 50-01-36 NAMANGAN (Сардоба базар)",
    "address": "Наманганская область, город Наманган, улица Кукон, дом-83 V"
  },
  {
    "id": 37,
    "name": "Наваи",
    "branch": "филиал 37",
    "region": "Навоинская облать",
    "newName": "F - 85-01-37 NAVOIY (Центральный базар)",
    "address": "Навоийская область, город Навои, улица Т.Темура, дом-9"
  },
  {
    "id": 38,
    "name": "Замин",
    "branch": "филиал 38",
    "region": "Жиззахская область",
    "newName": "F - 25-01-38 ZAMIN (Торговый цент Планета)",
    "address": "Джизакская область, Заминский район, населенный пукнт Кайирма, улица Буюк Ипак Йули, дом 12"
  },
  {
    "id": 39,
    "name": "Каканд",
    "branch": "филиал 39",
    "region": "Ферганская облать",
    "newName": "F - 40-01-39 QO‘QON (Китайский магазин, золото базар)",
    "address": "Ферганская область, город Коканд, Мукими, населенный пункт Сабира Абдуллы, улица Усмана Насира, дом-67/8, 5"
  },
  {
    "id": 40,
    "name": "Маргилан",
    "branch": "филиал 40",
    "region": "Ферганская облать",
    "newName": "F - 40-01-40 MARG’ILON (Единое окно)",
    "address": "Ферганская область, город Маргилан, Ёркин населенный пункт, улица Мустакиллик, дом-380"
  },
  {
    "id": 41,
    "name": "Беруни",
    "branch": "филиал 41",
    "region": "Республика Каракалпстан",
    "newName": "F - 95-01-41 BERUNIY (Пицца Карокчи)",
    "address": "Республика Каракалпакстан, Берунийский район, населенный пункт Амира Темура, улица Дружбы народов, дом-3"
  },
  {
    "id": 42,
    "name": "Чапаната",
    "branch": "филиал 42",
    "region": "г.Ташкент",
    "newName": "F - 01-01-42 QATORTOL (Кафе Медуза)",
    "address": "г. Тошкент, Чилонзор тумани, 6-мавзе, 52-уй, 25 хона"
  },
  {
    "id": 43,
    "name": "Чуст",
    "branch": "филиал 43",
    "region": "Наманганская облать",
    "newName": "F - 50-01-43 CHUST (Парк)",
    "address": "Наманганская область, Чустский район, насленный пункт Камарсада, улица Чарагон, дом-403"
  },
  {
    "id": 44,
    "name": "Джума",
    "branch": "филиал 44",
    "region": "Самаркандская область",
    "newName": "F - 30-01-44 JUMA (РОВД Пастларгом)",
    "address": "Самаркандская область, Пастдаргомская область, населенный пункт Амир Темур, улица Хамида Олимжона, дом 28"
  },
  {
    "id": 45,
    "name": "Сергели",
    "branch": "филиал 45",
    "region": "г.Ташкент",
    "newName": "F - 01-01-45 SERGELI (Ресторан Мерос)",
    "address": "город Ташкент, Сергелийская область, квартал Сергели 8А, дом 18, квартира 56"
  },
  {
    "id": 46,
    "name": "Ургенч",
    "branch": "филиал 46",
    "region": "Хорезмская облать",
    "newName": "F - 90-01-46 URGANCH (ЦУМ)",
    "address": "Хорезмская область, город Ургенч, населенный пункт Истиклол, улица Узбекистан, дом-5."
  },
  {
    "id": 47,
    "name": "Гиждуван",
    "branch": "филиал 47",
    "region": "Бухарская облать",
    "newName": "F - 80-01-47 G’IJDUVON (Магазин-555)",
    "address": "Бухарская область, Гиждуванский район, населенный пункт Дегрезон, XXI Аср шох"
  },
  {
    "id": 48,
    "name": "Кизилтепа",
    "branch": "филиал 48",
    "region": "Навоинская облать",
    "newName": "F - 85-01-48 QIZILTEPA (Хамкор банк)",
    "address": "Навоинская область, Кизилтепинский район, населенный пункт А.Навоий, улица Узбекистон шох, дом 250"
  },
  {
    "id": 49,
    "name": "Рамитан",
    "branch": "филиал 49",
    "region": "Бухарская облать",
    "newName": "F - 80-01-49 ROMITAN (Кафе Джабар ога)",
    "address": "Бухаринский район, Ромитанскый район, населенный пункт Афросиёб , улица Шифокорлар 9 дом"
  },
  {
    "id": 50,
    "name": "Сариасия",
    "branch": "филиал 50",
    "region": "Сурхандарьинская область",
    "newName": "F - 75-01-50 SARIOSIYO (Торговый центр Крокс)",
    "address": "Сурхондаринский область , Сариасиянский район, населенный пункт Мирзо Улугбек , улица А.Каххор 226 дом"
  },
  {
    "id": 51,
    "name": "Даштабад",
    "branch": "филиал 51",
    "region": "Жиззахская область",
    "newName": "F - 25-01-51 DASHTAOBOD (Станция Замин)",
    "address": "Жиззах вилояти, Зомин тумани, Улугбек МФЙ, Алишер Навоий кучаси 7-уй"
  },
  {
    "id": 52,
    "name": "Бука",
    "branch": "филиал 52",
    "region": "Ташкентская область",
    "newName": "F - 10-01-52 BO'KA (Станция Куйлюк)",
    "address": "Тошкент вилояти, Бука тумани, Янгихаёт МФЙ, Марказий кучаси 84-уй"
  },
  {
    "id": 53,
    "name": "Мукумий",
    "branch": "филиал 53",
    "region": "г.Ташкент",
    "newName": "F - 01-01-53 MUQIMIY (Бывший Цирковой колледж)",
    "address": "Тошкент шахар, Яккасарой тумани, Мукимий кучаси 1-уй"
  },
  {
    "id": 54,
    "name": "Тахиаташ",
    "branch": "филиал 54",
    "region": "Республика Каракалпстан",
    "newName": "F - 95-01-54 TAXIATOSH (Магазин Ишонч)",
    "address": "Коракалпогистон Республикаси, Тахиатош тумани, Орайлик МФЙ, Камалот кучаси 25-уй"
  },
  {
    "id": 55,
    "name": "Ургенч 2",
    "branch": "филиал 55",
    "region": "Хорезмская облать",
    "newName": "F - 90-01-55 URGANCH (Гипермаркет Тумарис Нур)",
    "address": "Хоразм вилояти, Урганч шахар, Навбахор МФЙ, Ислом Каримов кучаси, 122-уй"
  },
  {
    "id": 56,
    "name": "Шеробод",
    "branch": "филиал 56",
    "region": "Сурхандарьинская область",
    "newName": "F - 75-01-56 SHEROBOD (Ресторан Мажнунтол)",
    "address": "Сурхандарё вилояти, Шеробод тумани, Катта Хайёт МФЙ, Мустакиллик кучаси 20 уй!"
  },
  {
    "id": 57,
    "name": "Чиланзар ТЦ",
    "branch": "филиал 57",
    "region": "г.Ташкент",
    "newName": "F - 01-01-57 CHILONZOR (Паспортный стол)",
    "address": "Тошкент шахар, Чилонзор мавзеси, 2- даха, 4-уй 26-хонадон"
  },
  {
    "id": 58,
    "name": "Андижан 2",
    "branch": "филиал 58",
    "region": "Андижанская область",
    "newName": "F - 60-01-58 ANDIJON (Гарден)",
    "address": "г. Андижан, Алтынкульский район, МФЙ Кумакой, ул. Хунармат, дом 70."
  },
  {
    "id": 59,
    "name": "Джалакудук",
    "branch": "филиал 59",
    "region": "Андижанская область",
    "newName": "F - 60-01-59 JALAQUDUQ (Парк)",
    "address": "Андижон вилояти, Жалакудук тумани, Охунбобоев МФЙ, Узбекистон кучаси 51 уй"
  },
  {
    "id": 60,
    "name": "Шахрихан 2 (Артель)",
    "branch": "филиал 60",
    "region": "Андижанская область",
    "newName": "F - 60-01-60 SHAHRIXON (Пожарная улица)",
    "address": "Андижон вилояти, Шахрихон тумани, Абдусамат МФЙ, хамза кучаси, 25-уй"
  },
  {
    "id": 61,
    "name": "Хива",
    "branch": "филиал 61",
    "region": "Хорезмская облать",
    "newName": "F - 90-01-61 XIVA (Магазин Хива)",
    "address": "Хоразм вилояти, Хива шахар , Амир Темур кучаси 32А уй"
  },
  {
    "id": 62,
    "name": "Маргилан",
    "branch": "филиал 62",
    "region": "Ферганская облать",
    "newName": "F - 40-01-62 MARGILON (Комбинат базар)",
    "address": "Фаргона вилояти, Маргилон шахар, Зухра МФЙ, Б.Маргилон кучаси , 25 -уй"
  },
  {
    "id": 63,
    "name": "Риштан",
    "branch": "филиал 63",
    "region": "Ферганская облать",
    "newName": "F - 40-01-63 RISHTON (Агро банк)",
    "address": "Фаргона вилояти, Риштон тумани, Минор МФЙ, Ар-Рашидоний кучаси , 185а -уй"
  },
  {
    "id": 64,
    "name": "Термез",
    "branch": "филиал 64",
    "region": "Сурхандарьинская область",
    "newName": "F - 75-01-64 TERMIZ (Кафе Сафия)",
    "address": "Сурхондарё вилояти, Термиз шахри, Жайхун МФЙ , Афросиёб кучаси 39г уй"
  },
  {
    "id": 65,
    "name": "Чирчик 2",
    "branch": "филиал 65",
    "region": "Ташкентская область",
    "newName": "F - 10-01-65 CHIRCHIQ-2 (Базар)",
    "address": "Ташкентская область, г. Чирчик, МФЙ «Ёшлик», ул. Ш. Рашидова, дом 25.13-14."
  },
  {
    "id": 66,
    "name": "Шахрисабз",
    "branch": "филиал 66",
    "region": "Кашкадарьинская облать",
    "newName": "F - 70-01-66 SHAXRISABZ-2 (кафе Оху)",
    "address": "Кашкадарьинская область, г. Шахрисабз, МФЙ «Хабарлик», ул. Ипак йули."
  },
  {
    "id": 67,
    "name": "Чирокчи",
    "branch": "филиал 67",
    "region": "Кашкадарьинская облать",
    "newName": "F - 70-01-67 CHIROQCHI (Базар)",
    "address": "Кашкадарьинская область, Чиракчинский район, МФЙ «Узбекистан», ул. Хонжон, дом 23."
  },
  {
    "id": 68,
    "name": "Касон",
    "branch": "филиал 68",
    "region": "Кашкадарьинская облать",
    "newName": "F - 70-01-68 KOSON (Базар)",
    "address": "Кашкадарьинская область, Косонский район, МФЙ «Янгиобод», Косонский дехканский рынок."
  },
  {
    "id": 69,
    "name": "Камаши",
    "branch": "филиал 69",
    "region": "Кашкадарьинская облать",
    "newName": "F - 70-01-69 QAMASHI (Базар)",
    "address": "Кашкадарьинская область, Камашинский район, МФЙ «Навои», ул. Ифтихор Шох, дом 421."
  },
  {
    "id": 70,
    "name": "Булок боши",
    "branch": "филиал 70",
    "region": "Андижанская область",
    "newName": "F - 60-01-70 BULOQ BOSHI (Садик Водик)",
    "address": "Андижон тумани, Булокбоши тумани, M.Ismoiliy MFY, Muataqillik kochasi"
  },
  {
    "id": 71,
    "name": "Кургантепа",
    "branch": "филиал 71",
    "region": "Андижанская область",
    "newName": "F - 60-01-71 KO'RG'ONTEPA- 2 (Старый Базар)",
    "address": "Андижон вилояти, Кургонтепа туман, Шахрихонсой МФЙ, Шифокорлар кучаси 71-уй"
  },
  {
    "id": 72,
    "name": "Касансай",
    "branch": "филиал 72",
    "region": "Наманганская облать",
    "newName": "F - 50-01-72 KOSONSOY (Парк)",
    "address": "Наманган вилояти, Косонсой тумани, Косонсой шахарчаси, Гулобод кучаси 1-уй"
  },
  {
    "id": 73,
    "name": "Шахрихан Центр",
    "branch": "филиал 73",
    "region": "Андижанская область",
    "newName": "F - 60-01-73 SHAHRIXON-3 (Макро)",
    "address": "Андижон вилояти, Шахрихон тумани, Янги Хаёт МФЙ, Чинобод кучаси 185/1 уй"
  },
  {
    "id": 74,
    "name": "Гагарин",
    "branch": "филиал 74",
    "region": "Жиззахская область",
    "newName": "F - 25-01-74 GAGARIN (Базар)",
    "address": "Жиззах вилояти, Мирзачул тумани, Мустакиллик МФЙ, Тинчлик кучаси 24 уй"
  },
  {
    "id": 75,
    "name": "Каракуль",
    "branch": "филиал 75",
    "region": "Бухарская облать",
    "newName": "F - 80-01-75 QORAKUL (Базар)",
    "address": "Бухоро вилояти, Коракул тумани, Эски Каьла МФЙ, Улугбек кучаси 157 уй"
  },
  {
    "id": 76,
    "name": "Учкудук",
    "branch": "филиал 76",
    "region": "Навоинская облать",
    "newName": "F - 85-01-76 UCHKUDUQ (Хакимят)",
    "address": "Навои вилояти, Учкудук тумани, Мустакиллик МФЙ, Амир Темур кучаси 49 уй"
  },
  {
    "id": 77,
    "name": "Зарафшан",
    "branch": "филиал 77",
    "region": "Навоинская облать",
    "newName": "F - 85-01-77 ZARAFSHON (Базар)",
    "address": "Навои вилояти, Зарафшон шахар, Алишер Навои МФЙ, Марказий кучаси 1 уй"
  },
  {
    "id": 78,
    "name": "Тайлок",
    "branch": "филиал 78",
    "region": "Самаркандская область",
    "newName": "F - 30-01-78 TAYLOQ (Ипотек Банк)",
    "address": "Самарканд вилояти, Тайлок тумани, Чарогбон МФИ, Янги Тайлок кишлоги 21-уй"
  },
  {
    "id": 79,
    "name": "Кошкупир",
    "branch": "Кошкупир",
    "region": "Кошкупир",
    "newName": "Кошкупир",
    "address": "Кошкупир"
  },
  {
    "id": 80,
    "name": "Хазарасп",
    "branch": "филиал 80",
    "region": "Хорезмская облать",
    "newName": "F - 90-01-80 XAZORASP (Парк)",
    "address": "Хоразм вилояти, Хазарасп тумани. Ишчилар МФЙ, Узбекистон кучаси 30-уй."
  },
  {
    "id": 81,
    "name": "Нукус ГФ",
    "branch": "филиал 81",
    "region": "Республика Каракалпстан",
    "newName": "G - 95-01-81 NUKUS (БРБ Банк)",
    "address": "Қорақалпоғистон Республикаси, Нукус шаҳри, Турон МФЙ, Коракалпогистон кучаси 31/3-уй"
  },
  {
    "id": 82,
    "name": "Шават",
    "branch": "филиал 82",
    "region": "Хорезмская облать",
    "newName": "F - 90-01-82 SHAVOT (Ишонч Магазин)",
    "address": "Хоразм вилояти, Шавот тумани, Шавот МФЙ, Комилжон Отаниязов кучаси 84-уй"
  },
  {
    "id": 83,
    "name": "Ташкент, 40 лет",
    "branch": "филиал 83",
    "region": "г.Ташкент",
    "newName": "F - 01-01-83 TASHKENT 40 LET (метро Тузел)",
    "address": "Тошкент шахар, Яшнабод тумани, Тузель-2 мавзеси, 12 б уй"
  },
  {
    "id": 84,
    "name": "Аккурган",
    "branch": "филиал 84",
    "region": "г.Ташкент",
    "newName": "F - 10-01-84 AKKURG‘ON (Оккургон Автошохбекат)",
    "address": "Ташкентская область, Аккурганский район, МФЙ «Бирлик», улица Алишера Навои, дом 331."
  },
  {
    "id": 85,
    "name": "Андижан ГФ",
    "branch": "филиал 85",
    "region": "Андижанская область",
    "newName": "G - 60-01-85 ANDIJON G/O (улица Ленинский KFC)",
    "address": "Андижан вилояти, Андижон шахар, Мустакиллик МФЙ, Истиклол кучаси 14-уй"
  },
  {
    "id": 86,
    "name": "Бувайда",
    "branch": "филиал 86",
    "region": "Ферганская облать",
    "newName": "F - 40-01-86 BUVAYDA (Центр города)",
    "address": "Фаргона вилояти, Бувайда тумани, Янгикурган МФЙ, Алишер Навои кучаси 10-уй"
  },
  {
    "id": 87,
    "name": "Самарканд Гагарина 57",
    "branch": "филиал 87",
    "region": "Самаркандская область",
    "newName": "F - 30-01-87 SAMARQAND (Азиз базар)",
    "address": "Самарканд вилояти, Самарканд шахри, Гагарин кучаси 57 уй"
  },
  {
    "id": 88,
    "name": "Самарканд Пятак Улугбека",
    "branch": "филиал 88",
    "region": "Самаркандская область",
    "newName": "F - 30-01-88 SAMARQAND (Станция Ташкент)",
    "address": "Самарканд вилояти, Самарканд шахри, Катта Узбек тракт кучаси 14 уй"
  },
  {
    "id": 89,
    "name": "Самарканд Горбольница",
    "branch": "филиал 89",
    "region": "Самаркандская область",
    "newName": "F - 30-01-89 SAMARQAND (Гор больница)",
    "address": "Самарканд вилояти, Самарканд шахар Майсазор МФЙ, Огахий кучаси 1-А уй"
  },
  {
    "id": 90,
    "name": "Пахтакор 1 Базар",
    "branch": "филиал 90",
    "region": "Жиззахская область",
    "newName": "F - 25-01-90 PAXTAKOR (Базар)",
    "address": "Жиззах вилояти, Пахтакор тумани, Дустлик МФЙ, Декхон бозор худудида 165-савдо дукони"
  },
  {
    "id": 91,
    "name": "Пахтакор 2 Больница (архив)",
    "branch": "филиал 91",
    "region": "Жиззахская область",
    "newName": "F - 25-01-91 PAXTAKOR (Больница)",
    "address": "Жиззах вилояти, Пахтакор тумани, Тошкент МФЙ, Шароф Рашидов кучаси 3-уй, 4-хонадон"
  },
  {
    "id": 92,
    "name": "Зарбдор Жиззах",
    "branch": "филиал 92",
    "region": "Жиззахская область",
    "newName": "F - 25-01-92 ZARBDOR (Старый Базар)",
    "address": "Жизах вилояти, Зарбдор тумани Навоий МФЙ А-376 Автомагистрал йули"
  },
  {
    "id": 93,
    "name": "Чимбай",
    "branch": "филиал 93",
    "region": "Республика Каракалпстан",
    "newName": "F - 95-01-93 CHIMBOY (Магазин Idea)",
    "address": "Қорақалпоғистон Республикаси, Чимбой тумани Ипак Йули МФЙ, И.Юсупов гузари 103-уй"
  },
  {
    "id": 94,
    "name": "Наманган ГФ",
    "branch": "филиал 94",
    "region": "Наманганская облать",
    "newName": "G - 50-01-94 NAMANGAN (Афсоналар водийси)",
    "address": "Наманган вилояти, Наманган шахар, Давлатобод тумани, Юкори Гирвон МФЙ, Гирвонбулок кучаси 24 уй"
  },
  {
    "id": 95,
    "name": "Турокорган",
    "branch": "филиал 95",
    "region": "Наманганская облать",
    "newName": "F - 50-01-95 TURAQURGAN (№12 Школа)",
    "address": "Наманган вилояти, Туракургон тумани, Исвахон МСГ, С.Рахимов кучаси 50 уй"
  },
  {
    "id": 96,
    "name": "Кунград",
    "branch": "филиал 96",
    "region": "Республика Каракалпстан",
    "newName": "F - 95-01-96 QORAQALPOG'ISTON QO'NG'IROT (Авто вокзал)",
    "address": "Коракалпогистон Республикаси, Кунгирот тумани, Конират МФЙ, Тулеган Айбергенов кучаси 15-уй"
  },
  {
    "id": 97,
    "name": "Корасув Базар",
    "branch": "филиал 97",
    "region": "Андижанская область",
    "newName": "F - 60-01-97 QORASUV (Корасу Базар)",
    "address": "Андижон вилояти, Кургонтепа тумани, Корасув, Бирлик МФЙ, Бобуршох кучаси 54 уй"
  },
  {
    "id": 98,
    "name": "Кува Базар",
    "branch": "филиал 98",
    "region": "Ферганская облать",
    "newName": "F - 40-01-98 QUVA (Базар)",
    "address": "Фаргона вилояти, Кува тумани, Тошкент МФЙ, Бустон кучаси 98 уй"
  },
  {
    "id": 99,
    "name": "Асака",
    "branch": "филиал 99",
    "region": "Андижанская область",
    "newName": "F - 60-01-99 ASAKA (Макро)",
    "address": "Андижон вилояти Асака тумани, Барака МФЙ, Умид кучаси 89 уй"
  },
  {
    "id": 100,
    "name": "Бухара Карван Базар",
    "branch": "филиал 100",
    "region": "Бухарская облать",
    "newName": "F - 80-01-100 BUXORO - 2 (Карван базар)",
    "address": "Бухоро вилояти, Бухоро шахри, Гиждувон кучаси Карвон бозор"
  },
  {
    "id": 101,
    "name": "Учкурган",
    "branch": "филиал 101",
    "region": "Наманганская облать",
    "newName": "F - 50-01-101 UCHKURQON (Учкурганский рынок)",
    "address": "Наманган вилояти, Учкургон тумани, Куприкбоши МФЙ, Куприкбоши кучаси 103-уй"
  },
  {
    "id": 102,
    "name": "Фергана Базар",
    "branch": "филиал 102",
    "region": "Ферганская облать",
    "newName": "F - 40-01-102 FARG'ONA (Фергана базар )",
    "address": "Фарона вилояти, Фаргона шахри Ойбек МФЙ Бозорбоши кучаси 11 В уй"
  },
  {
    "id": 103,
    "name": "Коканд Базар",
    "branch": "филиал 103",
    "region": "Ферганская облать",
    "newName": "F - 40-01-103 QO‘QON BOZORI ( Коканд базар)",
    "address": "Фаргона вилояти Кукон шахри Урганжибог МФЙ Фаробий кучаси 68 уй"
  },
  {
    "id": 104,
    "name": "Янгиер",
    "branch": "филиал 104",
    "region": "Сырдарьинская область",
    "newName": "F - 20-01-104 YANGIYER ( Центральный пайнет Янгиера, автостоянка)",
    "address": "Сирдарё вилояти, Янгиер шаҳри, «Фазилат» МФЙ, Гулшан кўчаси, 77-уй."
  },
  {
    "id": 105,
    "name": "Коканд Шашлычная",
    "branch": "филиал 105",
    "region": "Ферганская область",
    "newName": "F - 40-01-105 QO‘QON SHASHLIKXONA(Коканд шашлычная )",
    "address": "Фарғона вилояти, Қўқон шаҳри, Навбаҳор МФЙ, Навбаҳор кўчаси, 80Т/1-уй."
  },
  {
    "id": 106,
    "name": "Шурчи",
    "branch": "филиал 106",
    "region": "Сурхандарьинская область",
    "newName": "F - 75-01-106 SHO'RCHI ( Ювелирный магазин ZEBUZAR)",
    "address": "Сурхондарё вилояти, Шўрчи тумани, Боботоғ МСГ, Мустақиллик кўчаси, 178-уй."
  },
  {
    "id": 107,
    "name": "Ташкент ТТЗ базар",
    "branch": "филиал 107",
    "region": "г.Ташкент",
    "newName": "F - 01-01-107 TOSHKENT TTZ BOZORI ( Ширин базар новый)",
    "address": "г. Ташкент, Мирзо-Улугбекский район, МФЙ «Ахиллик», массив ТТЗ-2, дом 1."
  },
  {
    "id": 108,
    "name": "Шерабад 2",
    "branch": "филиал 108",
    "region": "Сурхандарьинская область",
    "newName": "F - 75-01-108 SHEROBOD (Ucell )",
    "address": "Сурхандарьинская область, Шерабадский район, КАТТАХАЁТ МФЙ, ул. Мустакиллик, дом 31г."
  },
  {
    "id": 109,
    "name": "Булунгур",
    "branch": "филиал 109",
    "region": "Самаркандская область",
    "newName": "F - 30-01-109 BULUNG'UR (Shokhan Tagaev (electrician)",
    "address": "Самаркандская область, Булунгурский район, махалля Мехржон, ул. Амира Тимура 111, 1-й этаж"
  },
  {
    "id": 110,
    "name": "Бухара базар",
    "branch": "филиал 110",
    "region": "Бухарская облать",
    "newName": "F - 80-01-110 BUXORO BOZORI KOLXOZ (Moxi Malika)",
    "address": "Бухарская область, город Бухара, МСГ Мухтор Ашрафий, улица Абу Али Ибн Сино, дом 1."
  },
  {
    "id": 111,
    "name": "Карши 2",
    "branch": "филиал 111",
    "region": "Кашкадарьинская облать",
    "newName": "F - 70-01-111 QARSHI 2",
    "address": "Кашкадарьинская область, город Карши, махалля Карликхона, улица Ислама Каримова, дом 21."
  },
  {
    "id": 112,
    "name": "Пахтаабад",
    "branch": "филиал 112",
    "region": "Андижанская область",
    "newName": "F - 60-01-112 PAХTAABAD (Pahtaobod dexqon bozori)",
    "address": "Андижанская область, Пахтаабадский район, МФЙ Зокир Хабибий, ул. Хунармандлар, дом4"
  },
  {
    "id": 113,
    "name": "Пайтуг",
    "branch": "филиал 113",
    "region": "Андижанская область",
    "newName": "F - 60-01-113 PAYTUG",
    "address": "Андижон вилояти, Избоскан тумани, Пойтуг шахарчаси, Мирзо Улугбек МФЙ, Шифокорлар кучаси, 4-уй"
  },
  {
    "id": 114,
    "name": "Ташкент Абу Сахий",
    "branch": "филиал 114",
    "region": "г.Ташкент",
    "newName": "F - 01-01-107 TOSHKENT ABU SAHIY",
    "address": "г. Ташкент,"
  }
]

const articleContent: Record<string, Article> = {
  "loan-eligibility": {
    title: { RU: "Получение займа", UZ: "Kredit olish" },
    intro: {
      RU: "Информация о том, кому выдается займ, как оформляется займ и какие документы необходимы для оформления.",
      UZ: "Kredit kimga berilishi, kreditni rasmiylashtirish va rasmiylashtirish uchun qanday hujjatlar kerakligi haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Условия получения займа", UZ: "Kredit olish shartlari" },
        items: {
          RU: [
            "Условия выдачи займа одинаковые для всей филиальной сети Ломбарда.",
            "Займ выдается наличными в суммах.",
            "Ломбард выдает микрокредиты физическим лицам, отвечающим следующим требованиям:",
            "Гражданин Республики Узбекистан.",
            "Возраст от 18 (Восемнадцати) лет.",
            "Отсутствие просроченной задолженности перед банками, микрофинансовыми организациями, ломбардами.",
            "Полностью дееспособный.",
          ],
          UZ: [
            "Lombard filiallarining barcha tarmogida qarz berish shartlari bir xil.",
            "Qarz naqd pul shaklida beriladi.",
            "Lombard quyidagi talablarga javob beradigan jismoniy shaxslarga mikrokredit beradi:",
            "O‘zbekiston Respublikasi fuqarosi bo‘lishi.",
            "Yoshi 18 (o‘n sakkiz) yoshdan katta bo‘lishi.",
            "Banklar, mikromoliya tashkilotlari va lombardlar oldida muddati o‘tgan qarzdorligi bo‘lmasligi.",
            "To‘liq muomala layoqatiga ega bo‘lishi.",
          ],
        },
      },
      {
        title: { RU: "Оформление займа", UZ: "Kreditni rasmiylashtirish" },
        items: {
          RU: [
            "Для оформления займа необходимо подойти в наш филииал и иметь при себе необходжимые документы, изделие под залог. Если у вас есть задолженности перед банками, вам могут отказать в оформлении займа. Для получения дополнительной точной инеформации просим вас обратиться в филиал.",
          ],
          UZ: [
            "Qarz rasmiylashtirish uchun filialimizning birortasiga kelib, o‘zingiz bilan zarur hujjatlar va garovga qo‘yiladigan buyumni olib kelishingiz kerak. Agar banklar oldida qarzdorligingiz mavjud bo‘lsa, qarz rasmiylashtirish rad etilishi mumkin. Qo‘shimcha va aniq ma’lumot olish uchun filialga murojaat qilishingizni so‘raymiz.",
          ],
        },
      },
      {
        title: { RU: "Необходимые документы для оформления", UZ: "Rasmiylashtirish uchun zarur hujjatlar" },
        items: {
          RU: [
            "Оригинал паспорта гражданина Республики Узбекистан.",
            "ID-карты.",
            "Водительские права.",
            "Предоставляемые документы должны быть без повреждений, затирок, помарок, исправлений, в опрятном виде, с неистекшим сроком действия.",
            "В случае наличия таких недостатков сотрудник должен сообщить об этом клиенту и сообщить о причине отказа в принятии документов и предоставлении микрозайма.",
          ],
          UZ: [
            "O‘zbekiston Respublikasi fuqarosi pasportining asl nusxasi.",
            "ID-karta.",
            "Haydovchilik guvohnomasi.",
            "Taqdim etiladigan hujjatlar shikastlanmagan, o‘chirilmagan, tuzatishlarsiz, ozoda holatda va amal qilish muddati tugamagan bo‘lishi kerak.",
            "Agar bunday kamchiliklar aniqlansa, xodim bu haqda mijozga ma’lum qilishi va mikrozaym berishni rad etish sababini tushuntirishi lozim.",
          ],
        },
      },
    ],
  },

  "loan-products": {
    title: { RU: "Сумма займа и процентные ставки", UZ: "Kredit summasi va foiz stavkalari" },
    intro: {
      RU: "Информация о сумме займа, минимальной и максимальной сумме и действующих продуктах с процентными ставками.",
      UZ: "Kredit summasi, minimal va maksimal summa hamda amaldagi mahsulotlar va foiz stavkalari haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Сумма займа", UZ: "Kredit summasi" },
        items: {
          RU: [
            "Сумма займа зависит от:\n- пробы и веса чистого золота в залоговом изделии\n- текущей стоимости золота\n- наличия бриллиантов в залоговом изделии.",
          ],
          UZ: [
            "Qarz summasi quyidagilarga bogliq\n- garovdagi buyumning probasi va sof oltin vazniga\n- oltinning hozirgi narxiga\n-garov buyumida brilliant borligiga bog‘liq.",
          ],
        },
      },
      {
        title: { RU: "Минимальная и максимальная сумма", UZ: "Minimal va maksimal summa" },
        items: {
          RU: [
            "Минимальная сумма займа 300 000 сум.\nМаксимальная сумма займа составляет 100 000 000 сум.",
          ],
          UZ: [
            "Kreditning minimal summasi — 300 000 so‘m.\nKreditning maksimal summasi — 100 000 000 so‘m.",
          ],
        },
      },
      {
        title: { RU: "Процентная ставка", UZ: "Foiz stavkasi" },
        items: {
          RU: [
            "Продукты и процентные ставки\n\n1. Yaqin — сумма займа от 300 000 до 4 999 999 сум.\n   Процентная ставка — 0,3% в день, 9% в месяц.\n\n2. Ishonch — сумма займа от 5 000 000 до 9 999 999 сум.\n   Процентная ставка — 0,27% в день, 8,1% в месяц.\n\n3. Hamkor — сумма займа от 10 000 000 до 19 999 999 сум.\n   Процентная ставка — 0,23% в день, 6,9% в месяц.\n\n4. Barqaror — сумма займа от 20 000 000 до 100 000 000 сум.\n   Процентная ставка — 0,20% в день, 6% в месяц.",
          ],
          UZ: [
            "Mahsulotlar va foiz stavkalari\n\n1. Yaqin — kredit summasi 300 000 so‘mdan 4 999 999 so‘mgacha.\n   Foiz stavkasi — kuniga 0,3%, oyiga 9%.\n\n2. Ishonch — kredit summasi 5 000 000 so‘mdan 9 999 999 so‘mgacha.\n   Foiz stavkasi — kuniga 0,27%, oyiga 8,1%.\n\n3. Hamkor — kredit summasi 10 000 000 so‘mdan 19 999 999 so‘mgacha.\n   Foiz stavkasi — kuniga 0,23%, oyiga 6,9%.\n\n4. Barqaror — kredit summasi 20 000 000 so‘mdan 100 000 000 so‘mgacha.\n   Foiz stavkasi — kuniga 0,20%, oyiga 6%.",
          ],
        },
      },
    ],
  },

  "loan-term": {
    title: { RU: "Срок займа, льготный период и пеня", UZ: "Kredit muddati, imtiyozli davr va penya" },
    intro: {
      RU: "Информация о 30-дневном сроке займа, льготном периоде с 31-го дня и пене.",
      UZ: "30 kunlik kredit muddati, 31-kundan boshlanadigan imtiyozli davr va penya haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Срок займа", UZ: "Kredit muddati" },
        items: {
          RU: [
            "Мы оформляем займ на срок 30 дней. \nС 31-го дня начинается льготный период.",
          ],
          UZ: [
            "Biz kreditni 30 kun muddatga rasmiylashtiramiz. \n31-kundan boshlab imtiyozli davr boshlanadi.",
          ],
        },
      },
      {
        title: { RU: "Льготный период", UZ: "Imtiyozli davr" },
        items: {
          RU: [
            "Льготный период — это дополнительный период после окончания срока займа. Он начинается с 31-го дня. В этот период изделие не выставляется на реализацию, поэтому у клиента есть возможность погасить задолженность или продлить займ. Обратите внимание, что в льготный период начисляется пеня, а в кредитной истории данный период отражается как просрочка.",
          ],
          UZ: [
            "Imtiyozli davr — bu kredit muddati tugaganidan keyingi qo‘shimcha davr. U 31-kundan boshlanadi. Ushbu davrda buyum realizatsiyaga chiqarilmaydi, shuning uchun mijoz qarzdorligini to‘lashi yoki kredit muddatini uzaytirishi mumkin. E’tibor bering, imtiyozli davr davomida penya hisoblanadi va kredit tarixida ushbu davr kechikish sifatida aks etadi.",
          ],
        },
      },
      {
        title: { RU: "Выкуп изделий в льготный период", UZ: "Imtiyozli davrda buyumlarni qaytarib olish" },
        items: {
          RU: [
            "В течении льготного месяца «Заёмщик» имеет право вернуть изделия из залога только при условии исполнения своих обязательств в следующем порядке:\n\n-оплата пени\n-оплата процентов по микрозайму;\n-оплата основного долга.",
          ],
          UZ: [
            "Imtiyozli oy davomida «Qarz oluvchi» o‘z majburiyatlarini quyidagi tartibda bajargan taqdirdagina garovdagi buyumlarini qaytarib olish huquqiga ega:\n\npenya to‘lovi;\nmikrokredit bo‘yicha foizlarni to‘lash;\nasosiy qarzni to‘lash.",
          ],
        },
      },
      {
        title: { RU: "Пеня", UZ: "Penya" },
        items: {
          RU: [
            "Пеня начисляется в течение льготного периода.\nС 31-го дня начинается просрочка. В течение льготного периода действует пеня в размере 0,8% в день.",
          ],
          UZ: [
            "Imtiyozli davr davomida penya hisoblanadi.\n31-kundan boshlab kechikish boshlanadi. Imtiyozli davr davomida kuniga 0,8% miqdorida penya hisoblanadi.",
          ],
        },
      },
    ],
  },

  "loan-extension": {
    title: { RU: "Продление займа", UZ: "Kredit muddatini uzaytirish" },
    intro: {
      RU: "Полная информация о продлении займа из текущей Базы знаний.",
      UZ: "Amaldagi Bilimlar bazasidagi kredit muddatini uzaytirish bo‘yicha to‘liq ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Продление это", UZ: "Muddatni uzaytirish nima" },
        items: {
          RU: [
            "Продление займа — это когда клиент продлевает срок займа, при этом оплачивает Hurma Lombard причитающиеся проценты.",
          ],
          UZ: [
            "Qarz muddatini uzaytirish — bu mijozning “Hurma Lombard”ga tegishli foizlarni to‘lagan holda qarz muddatini uzaytirishidir.",
          ],
        },
      },
      {
        title: { RU: "Кто может сделать продления займа", UZ: "Muddatni kim uzaytirishi mumkin" },
        items: {
          RU: [
            "Продление может сделать:\n- заемщик, указанный в залоговом билете\n- представитель заёмщика при наличии Ф.И.О. заёмщика и номера договора.",
          ],
          UZ: [
            "Uzaytirishni quyidagilar amalga oshirishi mumkin:\n- garov biletida ko‘rsatilgan qarz oluvchi\n- qarz oluvchining vakili (qarz oluvchining F.I.O., shartnoma raqami)",
          ],
        },
      },
      {
        title: { RU: "Способы продления займа", UZ: "Muddatni uzaytirish usullari" },
        items: {
          RU: [
            "Продление можно сделать в любом филиале Hurma Lombard, а также онлайн через Payme/Click.",
          ],
          UZ: [
            "Kredit muddatini Hurma Lombardning istalgan filialida, shuningdek, Payme/Click orqali onlayn uzaytirish mumkin.",
          ],
        },
      },
      {
        title: { RU: "Условия продления", UZ: "Muddatni uzaytirish shartlari" },
        items: {
          RU: [
            "Количество дней продления не должно превышать фактический срок пользования займом, то есть 90 дней.\nКоличество дней в одной операции продления не должно превышать 30 дней.\nПри этом необходимо оплатить причитающиеся проценты за фактический срок пользования займом.",
          ],
          UZ: [
            "Kredit muddatini uzaytirish kunlari kreditdan foydalanishning amaldagi muddatidan, ya’ni 90 kundan oshmasligi kerak.\nBir marta uzaytirish operatsiyasidagi kunlar soni 30 kundan oshmasligi kerak.\nBunda kreditdan amalda foydalanilgan muddat uchun hisoblangan foizlarni to‘lash kerak.",
          ],
        },
      },
    ],
  },

  "partial-repayment": {
    title: { RU: "Частичное погашение займа", UZ: "Kreditni qisman so‘ndirish" },
    intro: {
      RU: "Информация о частичном погашении займа из текущей Базы знаний.",
      UZ: "Amaldagi Bilimlar bazasidagi kreditni qisman so‘ndirish haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Частичное погашение займа это", UZ: "Qisman to‘lash nima" },
        items: {
          RU: [
            "Уменьшение задолженности (основного долга) по договору займа без полного закрытия займа и без выкупа залога.",
          ],
          UZ: [
            "Kredit shartnomasi bo‘yicha qarzdorlikni (asosiy qarzni) kreditni to‘liq yopmasdan va garovni qaytarib olmasdan kamaytirish.",
          ],
        },
      },
      {
        title: { RU: "Кто может сделать частичное погашение", UZ: "Qisman to‘lovni kim amalga oshirishi mumkin" },
        items: {
          RU: [
            "Частичное погашение может сделать:\n\n- заёмщик, указанный в залоговом билете;\n- представитель заёмщика при наличии Ф.И.О. заёмщика и номера договора.",
          ],
          UZ: [
            "Qisman to‘lovni quyidagilar amalga oshirishi mumkin:\n\n- garov biletida ko‘rsatilgan qarz oluvchi;\n- qarz oluvchining vakili (qarz oluvchining F.I.O., shartnoma raqami)",
          ],
        },
      },
      {
        title: { RU: "Способы частичного погашения", UZ: "Qisman to‘lov usullari" },
        items: {
          RU: [
            "Частичное погашение можно сделать в любом филиале Hurma Lombard, а также онлайн через Payme/Click.",
          ],
          UZ: [
            "Qisman to‘lovni Hurma Lombard’ning istalgan filialida, shuningdek, Payme/Click orqali onlayn amalga oshirish mumkin.",
          ],
        },
      },
      {
        title: { RU: "Условия частичного погашения", UZ: "Qisman to‘lov shartlari" },
        items: {
          RU: [
            "Частичное погашение можно делать в любой день на любую сумму (до минимального остатка 300 000 сум).\nДля частичного погашения необходимо полностью оплатить вознаграждение до даты частичного погашения.",
          ],
          UZ: [
            "Qisman to‘lovni istalgan kunda istalgan miqdorda (minimal qoldiq 300 000 so‘mgacha) amalga oshirish mumkin.\nQisman to‘lovni amalga oshirish uchun qisman to‘lov sanasigacha hisoblangan barcha mukofotlarni to‘liq to‘lash kerak.",
          ],
        },
      },
    ],
  },

  "loan-repayment": {
    title: { RU: "Полное погашение займа", UZ: "Kreditni to‘liq so‘ndirish" },
    intro: {
      RU: "Информация о полном погашении займа из текущей Базы знаний.",
      UZ: "Amaldagi Bilimlar bazasidagi kreditni to‘liq so‘ndirish haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Полное погашение это", UZ: "To‘liq so‘ndirish nima" },
        items: {
          RU: [
            "Полное погашение займа- это когда клиент возвращает Hurma Lombard всю сумму полученного займа и причитающиеся проценты.",
          ],
          UZ: [
            "Kreditni to‘liq so‘ndirish — bu mijoz Hurma Lombardga olingan kreditning to‘liq summasini va hisoblangan foizlarni qaytarishi.",
          ],
        },
      },
      {
        title: { RU: "Кто может сделать полное погашение с выкупом изделий", UZ: "To‘liq so‘ndirishni kim amalga oshirishi mumkin" },
        items: {
          RU: [
            "Полное погашение:\nзаёмщик, указанный в залоговом билете;\nпредставитель заёмщика на основании нотариально заверенной доверенности.",
          ],
          UZ: [
            "To‘liq so‘ndirishni:\n\ngarov biletida ko‘rsatilgan qarz oluvchi;\nnotarial tasdiqlangan ishonchnoma asosida qarz oluvchining vakili amalga oshirishi mumkin.",
          ],
        },
      },
      {
        title: { RU: "Условия полного погашения", UZ: "To‘liq so‘ndirish shartlari" },
        items: {
          RU: [
            "Заемщик погашает:\n\n-- Всю сумму полученного займа\n-- Причитающиеся проценты",
          ],
          UZ: [
            "Qarz oluvchi quyidagilarni to‘laydi:\n\nOlingan kreditning to‘liq summasini;\nHisoblangan foizlarni.",
          ],
        },
      },
      {
        title: { RU: "Где можно делать полное погашение с выкупом изделий", UZ: "To‘liq so‘ndirish va buyumlarni qaytarib olish qayerda amalga oshiriladi" },
        items: {
          RU: [
            "Полностью погасить займ и выкупить изделия можно только в том филиале, где был оформлен займ.",
          ],
          UZ: [
            "Kreditni to‘liq so‘ndirish va buyumlarni qaytarib olish faqat kredit rasmiylashtirilgan Hurma Lombard filialida amalga oshirilishi mumkin.",
          ],
        },
      },
      {
        title: { RU: "Если клиент не может прийти в филиал для выкупа", UZ: "Agar mijoz buyumlarni qaytarib olish uchun filialga kela olmasa" },
        items: {
          RU: [
            "Если клиент не может прийти в филиал и выкупить изделия по разным причинам, он может полностью закрыть займ онлайн через Payme/Click, а затем прийти в филиал в удобное для него время и забрать изделия.\n\nПосле полного погашения займа онлайн изделия будут храниться в том филиале, где был оформлен займ, некоторое время, пока клиент не придёт и не заберёт их.",
          ],
          UZ: [
            "Agar mijoz turli sabablarga ko‘ra filialga kelib, buyumlarni qaytarib ololmasa, kreditni Payme/Click orqali onlayn tarzda to‘liq yopishi mumkin. Shundan so‘ng o‘ziga qulay vaqtda filialga kelib, buyumlarini olib ketishi mumkin.\n\nKredit onlayn tarzda to‘liq so‘ndirilgandan so‘ng, buyumlar kredit rasmiylashtirilgan filialda mijoz kelib, buyumlarini olib ketguniga qadar ma’lum vaqt saqlanadi.",
          ],
        },
      },
    ],
  },

  "partial-buyback": {
    title: { RU: "Частичный выкуп", UZ: "Garovni qisman qaytarib olish" },
    intro: {
      RU: "Информация о частичном выкупе залога из текущей Базы знаний.",
      UZ: "Amaldagi Bilimlar bazasidagi garovni qisman qaytarib olish haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Частичный выкуп это", UZ: "Qisman qaytarib olish nima" },
        items: {
          RU: [
            "Частичный выкуп залога — это когда клиент хочет выкупить часть залоговых изделий, указанных в залоговом билете.",
          ],
          UZ: [
            "Garovni qisman qaytarib olish — bu mijoz garov biletida ko‘rsatilgan garov buyumlarining bir qismini qaytarib olmoqchi bo‘lgan holat.",
          ],
        },
      },
      {
        title: { RU: "Кто может сделать частичный выкуп", UZ: "Qisman qaytarib olishni kim amalga oshirishi mumkin" },
        items: {
          RU: [
            "Частичный выкуп может сделать:\n\n- заёмщик, указанный в залоговом билете;\n- представитель заёмщика на основании нотариально заверенной доверенности.",
          ],
          UZ: [
            "Garovni qisman qaytarib olishni quyidagilar amalga oshirishi mumkin:\n\n- garov biletida ko‘rsatilgan qarz oluvchi;\n- notarial tasdiqlangan ishonchnoma asosida qarz oluvchining vakili.",
          ],
        },
      },
      {
        title: { RU: "Способ частичного выкупа", UZ: "Qisman qaytarib olish usuli" },
        items: {
          RU: [
            "Только в том филиале Hurma Lombard, где клиент оформлял займ.",
          ],
          UZ: [
            "Faqat mijoz kreditni rasmiylashtirgan Hurma Lombard filialida.",
          ],
        },
      },
      {
        title: { RU: "Условия частичного выкупа", UZ: "Qisman qaytarib olish shartlari" },
        items: {
          RU: [
            "Частичный выкуп разрешается, если клиент предоставил в залог 2 и более залоговых изделия в одном залоговом билете.\nПри этом заёмщик погашает:\n\nсумму займа за изделие, которое выкупает;\nпричитающиеся проценты.",
          ],
          UZ: [
            "Qisman qaytarib olishga, agar mijoz bitta garov biletida 2 yoki undan ortiq garov buyumlarini garovga qo‘ygan bo‘lsa, ruxsat etiladi.\n\nBunda qarz oluvchi:\n\nqaytarib olayotgan buyum uchun kredit summasini;\nhisoblangan foizlarni to‘laydi.",
          ],
        },
      },
    ],
  },

  "loan-reissue": {
    title: { RU: "Переоформление займа", UZ: "Kreditni qayta rasmiylashtirish" },
    intro: {
      RU: "Информация о переоформлении займа из текущей Базы знаний.",
      UZ: "Amaldagi Bilimlar bazasidagi kreditni qayta rasmiylashtirish haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Переоформление займа это", UZ: "Kreditni qayta rasmiylashtirish nima" },
        items: {
          RU: [
            "Переоформление производится при достижении максимального срока займа, то есть 90 дней.",
          ],
          UZ: [
            "Kreditni qayta rasmiylashtirish kreditning maksimal muddati, ya’ni 90 kunga yetganda amalga oshiriladi.",
          ],
        },
      },
      {
        title: { RU: "Кто может сделать переоформление", UZ: "Qayta rasmiylashtirishni kim amalga oshirishi mumkin" },
        items: {
          RU: [
            "Переоформление может сделать:\n\n- сам заёмщик, указанный в залоговом билете;\n - представитель заёмщика на основании нотариально заверенной доверенности.",
          ],
          UZ: [
            "Kreditni qayta rasmiylashtirishni quyidagilar amalga oshirishi mumkin:\n\n- garov biletida ko‘rsatilgan qarz oluvchining o‘zi;\n- notarial tasdiqlangan ishonchnoma asosida qarz oluvchining vakili.",
          ],
        },
      },
      {
        title: { RU: "Где можно сделать переоформление", UZ: "Qayerda qayta rasmiylashtirish mumkin" },
        items: {
          RU: [
            "Для переоформления необходимо обратиться в филиал, где был оформлен займ.",
          ],
          UZ: [
            "Kreditni qayta rasmiylashtirish uchun kredit rasmiylashtirilgan filialga murojaat qilish kerak.",
          ],
        },
      },
      {
        title: { RU: "Условия переоформления", UZ: "Qayta rasmiylashtirish shartlari" },
        items: {
          RU: [
            "Чтобы переоформить займ, клиенту необходимо оплатить причитающиеся проценты за фактический срок пользования займом.",
          ],
          UZ: [
            "Kreditni qayta rasmiylashtirish uchun mijoz kreditdan amalda foydalangan muddat uchun hisoblangan foizlarni to‘lashi kerak.",
          ],
        },
      },
    ],
  },

  "loan-additional": {
    title: { RU: "Добор суммы", UZ: "Qo‘shimcha summa olish" },
    intro: {
      RU: "Информация о доборе суммы из текущей Базы знаний.",
      UZ: "Amaldagi Bilimlar bazasidagi qo‘shimcha summa olish haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Добор суммы это", UZ: "Qo‘shimcha summa olish nima" },
        items: {
          RU: [
            "Увеличение суммы действующего займа путём дополнительной выдачи денежных средств заёмщику под уже находящееся в залоге имущество.",
          ],
          UZ: [
            "Amaldagi kredit summasini garovda turgan mol-mulk evaziga qarz oluvchiga qo‘shimcha mablag‘ berish orqali oshirish.",
          ],
        },
      },
      {
        title: { RU: "Кто может сделать добор суммы", UZ: "Qo‘shimcha summani kim olishi mumkin" },
        items: {
          RU: [
            "Добор суммы может сделать только сам заёмщик, указанный в залоговом билете.",
          ],
          UZ: [
            "Qo‘shimcha summa olishni faqat garov biletida ko‘rsatilgan qarz oluvchining o‘zi amalga oshirishi mumkin.",
          ],
        },
      },
      {
        title: { RU: "Где можно сделать добор суммы", UZ: "Qo‘shimcha summani qayerda olish mumkin" },
        items: {
          RU: [
            "Для добора суммы необходимо обратиться в тот филиал, где был оформлен займ.",
          ],
          UZ: [
            "Qo‘shimcha summa olish uchun kredit rasmiylashtirilgan filialga murojaat qilish kerak.",
          ],
        },
      },
      {
        title: { RU: "Условия добора суммы", UZ: "Qo‘shimcha summa olish shartlari" },
        items: {
          RU: [
            "- Сумма нового договора не должна превышать оценочную стоимость имущества, находящегося в залоге.\n- Заёмщик погашает причитающиеся проценты по действующему договору или они учитываются при оформлении нового договора.",
          ],
          UZ: [
            "- Yangi shartnoma summasi garovda turgan mol-mulkning baholangan qiymatidan oshmasligi kerak.\n- Qarz oluvchi amaldagi shartnoma bo‘yicha hisoblangan foizlarni to‘laydi yoki ular yangi shartnomani rasmiylashtirishda hisobga olinadi.",
          ],
        },
      },
    ],
  },

  "collateral-replacement": {
    title: { RU: "Замена залогового имущества", UZ: "Garovdagi mol-mulkni almashtirish" },
    intro: {
      RU: "Информация о замене залогового имущества из текущей Базы знаний.",
      UZ: "Amaldagi Bilimlar bazasidagi garovdagi mol-mulkni almashtirish haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Замена залогового имущества это", UZ: "Garovdagi mol-mulkni almashtirish nima" },
        items: {
          RU: [
            "Замена предмета или части предметов, переданных в залог, на другое имущество с согласия заёмщика и ломбарда.",
          ],
          UZ: [
            "Garovga qo‘yilgan buyum yoki buyumlarning bir qismini qarz oluvchi va lombardning roziligi bilan boshqa mol-mulkka almashtirish.",
          ],
        },
      },
      {
        title: { RU: "Кто может сделать замена залогового имущества", UZ: "Garovdagi mol-mulkni kim almashtirishi mumkin" },
        items: {
          RU: [
            "Замену залогового имущества может сделать только сам заёмщик, указанный в залоговом билете.",
          ],
          UZ: [
            "Garovdagi mol-mulkni faqat garov biletida ko‘rsatilgan qarz oluvchining o‘zi almashtirishi mumkin.",
          ],
        },
      },
      {
        title: { RU: "Где можно сделать замена залогового имущества", UZ: "Qayerda almashtirish mumkin" },
        items: {
          RU: [
            "Для замены залогового изделия необходимо обратиться в тот филиал, где был оформлен займ.",
          ],
          UZ: [
            "Garovdagi buyumni almashtirish uchun kredit rasmiylashtirilgan filialga murojaat qilish kerak.",
          ],
        },
      },
      {
        title: { RU: "Условия замены залога", UZ: "Almashtirish shartlari" },
        items: {
          RU: [
            "Оцениваемое новое золотое изделие не должно быть ниже по стоимости, чем заменяемое изделие.\nЗаёмщику необходимо оплатить причитающиеся проценты за фактический срок пользования займом.",
          ],
          UZ: [
            "Baholanayotgan yangi oltin buyum almashtirilayotgan buyum qiymatidan past bo‘lmasligi kerak.\nQarz oluvchi kreditdan amalda foydalangan muddat uchun hisoblangan foizlarni to‘lashi kerak.",
          ],
        },
      },
    ],
  },

  "collateral-types": {
    title: { RU: "Залог", UZ: "Garov" },
    intro: {
      RU: "Информация о том, какие изделия принимаются в залог.",
      UZ: "Garovga qanday buyumlar qabul qilinishi haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Залог", UZ: "Garov" },
        items: {
          RU: [
            "В качестве залога принимаются только изделия из золота и их части (лом) с пробой от 375 до 916. Если в изделии имеются бриллианты, они оцениваются так же, как и золото. Также принимаются небрендовые золотые часы и зубные коронки в очищенном виде.",
          ],
          UZ: [
            "Garov sifatida faqat 375 dan 916 gacha bo‘lgan probadagi oltin buyumlar va ularning qismlari (lom) qabul qilinadi. Agar buyumda brilliantlar mavjud bo‘lsa, ular ham oltin kabi baholanadi. Shuningdek, brendsiz oltin soatlar va tozalangan tish koronkalari ham qabul qilinadi.",
          ],
        },
      },
    ],
  },

  "collateral-valuation": {
    title: { RU: "Оценка изделия", UZ: "Buyumni baholash" },
    intro: {
      RU: "Информация о порядке оценки золотого изделия.",
      UZ: "Oltin buyumni baholash tartibi haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Оценка изделия", UZ: "Buyumni baholash" },
        items: {
          RU: [
            "Сначала определяют пробу золота с помощью пробирного камня (чёрного гладкого камня). Изделием проводят по камню, оставляя металлический след.\nНа след наносят кислоту соответствующей пробы.\nЗатем наблюдают за реакцией.\nДанный метод оценки не повреждает  изделие.",
          ],
          UZ: [
            "Baholashdan oldin avvalo oltinning probasi probir toshi (qora, silliq tosh) yordamida aniqlanadi. Buyum toshga ishqalanib, uning yuzasida metall izi qoldiriladi. Iz ustiga tegishli probadagi kislota tomiziladi. So‘ngra kislota ta’siridagi reaksiya kuzatiladi.\nUshbu baholash usuli buyumga zarar yetkazmaydi.",
          ],
        },
      },
    ],
  },

  "katm": {
    title: { RU: "КАТМ", UZ: "KATM" },
    intro: {
      RU: "Информация из текущей Базы знаний о системе КАТМ и кредитной истории.",
      UZ: "Amaldagi Bilimlar bazasidagi KATM tizimi va kredit tarixi haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Проверка системой KATM", UZ: "KATM tizimi orqali tekshirish" },
        items: {
          RU: [
            "При оформлении займа проверяется информация в системе КАТМ, включая кредитную историю и наличие задолженностей. Если при проверке клиента через систему КАТМ отображается активная просрочка или задолженность, мы не сможем оформить займ.",
          ],
          UZ: [
            "Kredit rasmiylashtirilayotganda KATM tizimidagi ma’lumotlar, jumladan, kredit tarixi va mavjud qarzdorliklar tekshiriladi. Agar mijozni KATM tizimi orqali tekshirish vaqtida faol kechikish yoki qarzdorlik mavjudligi aniqlansa, kreditni rasmiylashtira olmaymiz.",
          ],
        },
      },
      {
        title: { RU: "Плохая история (отказ в банках)", UZ: "Yomon kredit tarixi (banklarda rad etish)" },
        items: {
          RU: [
            "Если клиент ранее оформлял займ в нашем ломбарде, но не закрыл его и его изделия перешли в реализацию, задолженность перед ломбардом аннулируется. Однако информация об этом автоматически сохраняется в кредитной истории клиента в системе КАТМ.\n\nПри этом некоторые банки в рамках своей внутренней кредитной политики могут учитывать факт наличия ранее закрытого договора, взыскание по которому осуществлялось через исполнительную надпись нотариуса (судебное или принудительное взыскание). На основании своих внутренних правил банк может принять решение об отказе в предоставлении кредита. Данное решение принимается банком самостоятельно и не означает наличие у клиента действующей просроченной задолженности.",
          ],
          UZ: [
            "Agar mijoz avval lombardimizda kredit rasmiylashtirgan bo‘lsa, lekin uni to‘liq yopmagan va uning garovdagi buyumlari realizatsiyaga chiqarilgan bo‘lsa, lombard oldidagi qarzdorlik bekor qilinadi. Biroq bu haqdagi ma’lumot mijozning KATM tizimidagi kredit tarixida avtomatik ravishda saqlanadi.\n\nShuni ham inobatga olish kerakki, ayrim banklar o‘zlarining ichki kredit siyosati doirasida ilgari yopilgan shartnomani, ya’ni qarzdorlik bo‘yicha undirish notariusning ijro xati orqali amalga oshirilgan holatni (sud yoki majburiy undirish) hisobga olishlari mumkin. Bank o‘zining ichki qoidalariga asosan kredit berishni rad etish to‘g‘risida qaror qabul qilishi mumkin. Ushbu qaror bank tomonidan mustaqil ravishda qabul qilinadi va mijozda amaldagi muddati o‘tgan qarzdorlik mavjudligini anglatmaydi.",
          ],
        },
      },
      {
        title: { RU: "Остаются ли просрочки в системе КАТМ?", UZ: "KATM tizimida kechikishlar qoladimi" },
        items: {
          RU: [
            "Да, информация о задолженностях сохраняется в кредитной истории клиента, а просрочки могут негативно повлиять на возможность оформления кредитов и займов в будущем.",
          ],
          UZ: [
            "Ha, qarzlar haqidagi ma’lumotlar mijozning kredit tarixida saqlanadi va kechikishlar kelajakda kredit va qarz olish imkoniyatiga salbiy ta’sir ko‘rsatishi mumkin.",
          ],
        },
      },
      {
        title: { RU: "Если у клиента плохая кредитная история", UZ: "Agar mijozning kredit tarixi yomon bo‘lsa" },
        items: {
          RU: [
            "Если у клиента плохая кредитная история, но на момент проверки отсутствуют активные просрочки или клиент своевременно вносит платежи по текущим обязательствам, оформление займа возможно. При этом, если у клиента имеются действующие кредиты или займы в других банках либо микрофинансовых организациях, максимальная сумма займа определяется по результатам проверки.",
          ],
          UZ: [
            "Agar mijozning kredit tarixi yomon bo‘lsa-yu, biroq tekshiruv paytida aktiv kechikishlar kuzatilmasa yoki mijoz joriy majburiyatlar bo‘yicha to‘lovlarni o‘z vaqtida amalga oshirsa, qarz olish imkoniyati mavjud.",
          ],
        },
      },
    ],
  },

  "online-payment": {
    title: { RU: "Онлайн-оплата", UZ: "Onlayn to‘lov" },
    intro: {
      RU: "Инструкция по оплате займа онлайн через Click и Payme, а также важные правила, чтобы платёж был отражён своевременно.",
      UZ: "Click va Payme orqali kreditni onlayn to‘lash bo‘yicha yo‘riqnoma va to‘lov o‘z vaqtida aks etishi uchun muhim qoidalar.",
    },
    blocks: [
      {
        title: { RU: "Важные правила онлайн-оплаты", UZ: "Onlayn to‘lovning muhim qoidalari" },
        items: {
          RU: [
            "При оплате онлайн клиенту необходимо оплатить не позднее 17:00. Если клиент оплачивает после 17:00, оплата не пройдет за текущий день и пройдет на следующий день, из-за чего клиенту может начислиться пеня.",
            "Клиенту желательно оплатить на 1 000 сум больше необходимой суммы, чтобы после оплаты не осталось даже небольшой задолженности. Например, если после оплаты останется задолженность даже в размере 10 тийин, оплата не пройдет полностью и за оставшуюся задолженность может начисляться пеня. Поэтому рекомендуется оплатить на 1 000 сум больше расчетной суммы.",
            "После оплаты необходимо уточнить у филиала, прошла ли оплата и была ли она отражена по займу.",
          ],
          UZ: [
            "Onlayn to‘lovni amalga oshirishda mijoz to‘lovni soat 17:00 gacha amalga oshirishi kerak. Agar mijoz soat 17:00 dan keyin to‘lov qilsa, to‘lov joriy kun uchun o‘tmaydi va keyingi kunga o‘tadi, shu sababli mijozga penya hisoblanishi mumkin.",
            "Mijozga kerakli summadan 1 000 so‘m ko‘proq to‘lash tavsiya etiladi, shunda to‘lovdan so‘ng kichik miqdorda ham qarzdorlik qolmaydi. Masalan, to‘lovdan keyin hatto 10 tiyin qarzdorlik qolsa ham, to‘lov to‘liq o‘tmaydi va qolgan qarzdorlik uchun penya hisoblanishi mumkin. Shu sababli hisoblangan summadan 1 000 so‘m ko‘proq to‘lash tavsiya etiladi.",
            "To‘lov amalga oshirilgandan so‘ng filialdan to‘lov o‘tgan-o‘tmaganini va kredit bo‘yicha aks etganini aniqlash kerak.",
          ],
        },
      },
      {
        title: { RU: "Оплата через Click", UZ: "Click orqali to‘lov" },
        items: {
          RU: [
            "В приложении Click откройте раздел «Оплата услуг», выберите Hurma Lombard в списке МФО, введите номер договора и сумму платежа, затем проверьте введённые данные и подтвердите оплату.",
          ],
          UZ: [
            "Click ilovasida «To‘lov xizmatlari» bo‘limini oching, MFO ro‘yxatidan Hurma Lombardni tanlang, shartnoma raqami va to‘lov summasini kiriting, so‘ng ma’lumotlarni tekshirib, to‘lovni tasdiqlang.",
          ],
        },
        images: [
          { src: "/online-payment/click-1.png", alt: { RU: "Click orqali to‘lov: ilovada xizmatlar bo‘limi", UZ: "Click orqali to‘lov: ilovadagi xizmatlar bo‘limi" } },
          { src: "/online-payment/click-2.png", alt: { RU: "Click orqali to‘lov: Hurma Lombardni tanlash va to‘lov ma’lumotlarini kiritish", UZ: "Click orqali to‘lov: Hurma Lombardni tanlash va to‘lov ma’lumotlarini kiritish" } },
        ],
      },
      {
        title: { RU: "Оплата через Payme", UZ: "Payme orqali to‘lov" },
        items: {
          RU: [
            "В приложении Payme откройте раздел «Оплата услуг», найдите Hurma Lombard в списке организаций, введите код кредита и сумму платежа, затем проверьте данные и подтвердите оплату.",
          ],
          UZ: [
            "Payme ilovasida «To‘lov» bo‘limini oching, tashkilotlar ro‘yxatidan Hurma Lombardni toping, kredit kodi va to‘lov summasini kiriting, so‘ng ma’lumotlarni tekshirib, to‘lovni tasdiqlang.",
          ],
        },
        images: [
          { src: "/online-payment/payme-1.png", alt: { RU: "Payme orqali to‘lov: ilovada xizmatlar bo‘limi", UZ: "Payme orqali to‘lov: ilovadagi xizmatlar bo‘limi" } },
          { src: "/online-payment/payme-2.png", alt: { RU: "Payme orqali to‘lov: Hurma Lombardni tanlash va to‘lov ma’lumotlarini kiritish", UZ: "Payme orqali to‘lov: Hurma Lombardni tanlash va to‘lov ma’lumotlarini kiritish" } },
        ],
      },
      {
        title: { RU: "После оплаты", UZ: "To‘lovdan so‘ng" },
        items: {
          RU: [
            "После завершения онлайн-оплаты необходимо уточнить у филиала, прошла ли оплата и была ли она отражена по конкретному займу клиента.",
          ],
          UZ: [
            "Onlayn to‘lov tugagandan so‘ng filialdan to‘lov o‘tgan-o‘tmaganini va mijozning aniq krediti bo‘yicha aks etganini aniqlash kerak.",
          ],
        },
      },
    ],
  },

  "realization": {
    title: { RU: "Реализация", UZ: "Realizatsiya" },
    intro: {
      RU: "Информация о реализации из текущей Базы знаний.",
      UZ: "Amaldagi Bilimlar bazasidagi realizatsiya haqidagi ma’lumot.",
    },
    blocks: [
      {
        title: { RU: "Реализация это", UZ: "Realizatsiya nima" },
        items: {
          RU: [
            "Реализация — это когда изделие переходит в собственность ломбарда, и у ломбарда больше нет претензий к клиенту по данному займу.",
          ],
          UZ: [
            "Realizatsiya — bu buyum lombard mulkiga o‘tishi va lombardning ushbu kredit bo‘yicha mijozga boshqa da’volari qolmasligini anglatadi.",
          ],
        },
      },
      {
        title: { RU: "Когда это происходит", UZ: "Qachon sodir bo‘ladi" },
        items: {
          RU: [
            "Если клиент не может погасить займ либо не погашает его в течение основного срока займа и в льготный период также не предпринимает никаких действий, то после окончания льготного периода изделие переходит в реализацию.",
          ],
          UZ: [
            "Agar mijoz kreditni to‘lay olmasa yoki asosiy kredit muddati va imtiyozli davr davomida ham kreditni to‘lash bo‘yicha hech qanday harakat qilmasa, imtiyozli davr tugagandan so‘ng buyum realizatsiyaga o‘tadi.",
          ],
        },
      },
    ],
  },

  "penalty-recalculation": {
    title: { RU: "Отказ в перерасчёте", UZ: "Penyani qayta hisoblamaslik" },
    intro: {
      RU: "Текст из текущей Базы знаний для ситуации с просьбой пересчитать пеню.",
      UZ: "Amaldagi Bilimlar bazasidagi penyani qayta hisoblash so‘ralgan vaziyat uchun matn.",
    },
    blocks: [
      {
        title: { RU: "Скрипт для отказа", UZ: "Rad etish skripti" },
        items: {
          RU: [
            "Компания в рамках дополнительного информирования и из соображений лояльности осуществляет уведомление клиентов о начислении пени. В отдельных случаях, в том числе по техническим причинам, уведомление могло не поступить.\n\nПри этом условия займа, сроки его погашения и порядок начисления пени изначально указаны в договоре, предоставленном Вам при оформлении займа.\n\nПеня начисляется в соответствии с условиями договора, поэтому отсутствие дополнительного уведомления не является основанием для перерасчёта или списания начисленной пени.\n\nЗадолженность необходимо погасить в соответствии с условиями договора.",
          ],
          UZ: [
            "Kompaniya qo‘shimcha xabardor qilish va mijozlarga qulaylik yaratish maqsadida penya hisoblanishi haqida mijozlarni xabardor qiladi. Ayrim hollarda, jumladan, texnik sabablarga ko‘ra, xabarnoma yetib bormagan bo‘lishi mumkin.\n\nShu bilan birga, qarz shartlari, uni to‘lash muddati va penya hisoblash tartibi qarz rasmiylashtirilganda Sizga taqdim etilgan shartnomada ko‘rsatilgan.\n\nPenya shartnoma shartlariga muvofiq hisoblanadi. Shu sababli, qo‘shimcha xabarnomaning yetib bormaganligi hisoblangan penyani qayta hisoblash yoki bekor qilish uchun asos bo‘lmaydi.\n\nQarzdorlik shartnoma shartlariga muvofiq to‘lanishi lozim.",
          ],
        },
      },
    ],
  },

  "contract-basics": {
    title: { RU: "Договор и залоговый билет", UZ: "Shartnoma va garov bileti" },
    intro: {
      RU: "Ниже информация дана по тексту предоставленного договора микрозайма и залогового билета. Нумерация и ссылки на пункты сохранены, чтобы оператор мог быстро открыть нужное место в документе. Это не сокращённая памятка: ключевые положения приведены по формулировкам документа.",
      UZ: "Quyidagi ma’lumotlar taqdim etilgan mikrokredit shartnomasi va garov bileti matni asosida berilgan. Operator kerakli joyni tez topishi uchun band raqamlari va havolalar saqlangan. Bu faqat qisqa eslatma emas: asosiy qoidalar hujjatdagi mazmunga mos holda keltirilgan.",
    },
    blocks: [
      {
        title: { RU: "1. Предмет договора", UZ: "1. Shartnoma predmeti" },
        items: {
          RU: [
            "п. 1.1. «Ломбард» предоставляет на условиях настоящего Договора «Заёмщику» сумму микрозайма под залог в виде заклада (залог). Сумма микрозайма определена из оценки сторонами предмета залога на момент их принятия в залог.",
            "п. 1.2. «Заёмщик» обязуется возвратить «Ломбарду» сумму кредита, в размере указанном в п.1.1 настоящего договора, а также причитающиеся проценты, размер которых указывается в залоговом билете.",
            "п. 1.3. Проценты за пользование Микрозаймом начисляются ежедневно со дня фактического предоставления денежных средств Заёмщику включительно до дня возврата основного долга включительно на фактический остаток основного долга.",
          ],
          UZ: [
            "1.1-band. «Lombard» ushbu Shartnoma shartlari asosida «Qarz oluvchi»ga buyum garovi ostida mikrokredit beradi. Mikrokredit summasi garov buyumi qabul qilingan paytdagi baholash asosida tomonlar tomonidan belgilanadi.",
            "1.2-band. «Qarz oluvchi» ushbu shartnomaning 1.1-bandida ko‘rsatilgan kredit summasini, shuningdek garov biletida ko‘rsatilgan tegishli foizlarni «Lombard»ga qaytarishi shart.",
            "1.3-band. Mikrokreditdan foydalanganlik uchun foizlar pul mablag‘lari amalda berilgan kundan boshlab asosiy qarz qaytarilgan kungacha, shu kunlarni ham qo‘shgan holda, asosiy qarzning amaldagi qoldig‘iga har kuni hisoblanadi.",
          ],
        },
      },
      {
        title: { RU: "2. Процентная ставка и её изменение", UZ: "2. Foiz stavkasi va uning o‘zgarishi" },
        items: {
          RU: [
            "п. 1.3. Размер применяемой процентной ставки определяется исходя из фактического остатка Основного долга в следующем порядке: при остатке Основного долга менее 5 000 000 сум — 0,30% за каждый день пользования Микрозаймом, что соответствует 109,50% годовых исходя из 365 календарных дней; при остатке Основного долга от 5 000 000 сум включительно, но менее 10 000 000 сум — 0,27% за каждый день пользования Микрозаймом, что соответствует 98,55% годовых исходя из 365 календарных дней; при остатке Основного долга от 10 000 000 сум включительно, но менее 20 000 000 сум — 0,23% за каждый день пользования Микрозаймом, что соответствует 83,95% годовых исходя из 365 календарных дней; при остатке Основного долга от 20 000 000 сум включительно до 100 000 000 сум включительно — 0,20% за каждый день пользования Микрозаймом, что соответствует 73,00% годовых исходя из 365 календарных дней.",
            "п. 1.3. Годовая процентная ставка рассчитывается как дневная процентная ставка, умноженная на 365 календарных дней, без капитализации процентов.",
            "п. 1.4. Заёмщик вправе полностью или частично досрочно погасить Микрозайм без взимания комиссии, штрафа или иной платы за досрочное погашение.",
            "п. 1.4. При частичном досрочном погашении поступивший платёж распределяется в счёт исполнения обязательств Заёмщика в очередности, установленной законодательством Республики Узбекистан.",
            "п. 1.4. Если в результате частичного досрочного погашения фактический остаток Основного долга переходит в другой диапазон, установленный пунктом 1.3 настоящего Договора, процентная ставка изменяется автоматически с даты отражения частичного погашения в учёте Ломбарда. Новая процентная ставка применяется к фактическому остатку Основного долга, образовавшемуся после частичного погашения. Для определения применимого тарифного диапазона учитывается сумма, фактически направленная на погашение Основного долга, а не общая сумма внесённого Заёмщиком платежа. Изменение процентной ставки в соответствии с настоящим пунктом осуществляется автоматически и не требует заключения дополнительного соглашения к Договору.",
          ],
          UZ: [
            "1.3-band. Qo‘llaniladigan foiz stavkasi asosiy qarzning amaldagi qoldig‘iga qarab belgilanadi: 5 000 000 so‘mdan kam qoldiqda — kuniga 0,30%; 5 000 000 so‘mdan 10 000 000 so‘mgacha, 10 000 000 so‘mdan kam bo‘lsa — kuniga 0,27%; 10 000 000 so‘mdan 20 000 000 so‘mgacha, 20 000 000 so‘mdan kam bo‘lsa — kuniga 0,23%; 20 000 000 so‘mdan 100 000 000 so‘mgacha — kuniga 0,20%.",
            "1.3-band. Yillik foiz stavkasi kapitalizatsiyasiz kunlik foiz stavkasini 365 kalendar kunga ko‘paytirish orqali hisoblanadi.",
            "1.4-band. Qarz oluvchi mikrokreditni komissiya, jarima yoki muddatidan oldin to‘lash uchun boshqa haq undirilmasdan to‘liq yoki qisman muddatidan oldin to‘lashi mumkin.",
            "1.4-band. Qisman muddatidan oldin to‘lashda kelib tushgan to‘lov Qarz oluvchining majburiyatlarini O‘zbekiston Respublikasi qonunchiligida belgilangan navbat bo‘yicha bajarishga yo‘naltiriladi.",
            "1.4-band. Agar qisman muddatidan oldin to‘lash natijasida asosiy qarzning amaldagi qoldig‘i 1.3-bandda ko‘rsatilgan boshqa diapazonga o‘tsa, foiz stavkasi qisman to‘lov Lombard hisobida aks ettirilgan sanadan avtomatik ravishda o‘zgaradi. Yangi foiz stavkasi qisman to‘lashdan keyin shakllangan amaldagi asosiy qarz qoldig‘iga qo‘llanadi. Tarif diapazonini aniqlashda Qarz oluvchi tomonidan kiritilgan jami to‘lov emas, balki asosiy qarzni so‘ndirishga haqiqatda yo‘naltirilgan summa hisobga olinadi. Ushbu o‘zgarish uchun alohida qo‘shimcha kelishuv talab qilinmaydi.",
          ],
        },
      },
      {
        title: { RU: "3. Срок займа и залога", UZ: "3. Kredit va garov muddati" },
        items: {
          RU: [
            "п. 1.5. Указанная в п. 1.1. сумма микрозайма предоставляются Заёмщику на срок 30 дней.",
            "Залоговый билет, пункт 10. Срок залога 30 дней (может быть продлен 2 раза на срок не более 90 дней при условии своевременной оплаты).",
            "п. 2.2. Датой предоставления микрозайма считается дата подписания настоящего Договора микрозайма.",
          ],
          UZ: [
            "1.5-band. 1.1-bandda ko‘rsatilgan mikrokredit summasi Qarz oluvchiga 30 kun muddatga beriladi.",
            "Garov bileti, 10-band. Garov muddati 30 kun (o‘z vaqtida to‘lov sharti bilan 2 marta, umumiy 90 kundan oshmagan muddatga uzaytirilishi mumkin).",
            "2.2-band. Mikrokredit berilgan sana ushbu mikrokredit shartnomasi imzolangan sana hisoblanadi.",
          ],
        },
      },
      {
        title: { RU: "4. Возврат займа и дата исполнения обязательства", UZ: "4. Kreditni qaytarish va majburiyat bajarilgan sana" },
        items: {
          RU: [
            "п. 2.3. По истечении срока, установленного п. 1.5, «Заёмщик» обязуется вернуть полученную от «Ломбарда» по настоящему Договору сумму микрозайма в порядке и на условиях, установленных п. 2.4. настоящего Договора, а также уплатить «Ломбарду» причитающиеся ему проценты.",
            "п. 2.4. Возврат полученной суммы микрозайма осуществляется «Заёмщиком» в следующем порядке: не позднее следующего дня после истечения срока микрозайма, указанного в п. 1.5. настоящего Договора, «Заёмщик» должен произвести оплату денежными средствами или посредством банковской карты, «Ломбарду», расположенного по адресу, указанному в договоре, 100% суммы микрозайма, указанной в п. 1.1. договора. Одновременно с внесением суммы микрозайма, «Заёмщик» должен внести и сумму процентов из расчёта 8,10 % с суммы микрозайма за весь срок использования денежных средств.",
            "п. 2.5. Датой исполнения «Заёмщиком» своего обязательства по возврату суммы кредита «Ломбарда» считается дата поступления наличных денежных средств в кассу или на расчетный счет «Ломбарда».",
          ],
          UZ: [
            "2.3-band. 1.5-bandda belgilangan muddat tugagach, Qarz oluvchi ushbu Shartnoma bo‘yicha Lombarddan olgan mikrokredit summasini 2.4-bandda belgilangan tartibda qaytarishi va tegishli foizlarni to‘lashi shart.",
            "2.4-band. Olingan mikrokredit summasi 1.5-bandda ko‘rsatilgan muddat tugaganidan keyingi kundan kechiktirmay, shartnomada ko‘rsatilgan tartibda, mikrokredit summasining 100 foizi va foydalanish davri uchun 8,10 foiz hisobida foizlar bilan to‘lanadi.",
            "2.5-band. Kredit summasini qaytarish bo‘yicha majburiyat bajarilgan sana naqd pul Lombard kassasiga yoki mablag‘ Lombardning hisob raqamiga kelib tushgan sana hisoblanadi.",
          ],
        },
      },
      {
        title: { RU: "5. Продление займа", UZ: "5. Kredit muddatini uzaytirish" },
        items: {
          RU: [
            "п. 2.6. По заявлению «Заёмщика» и взаимному согласию сторон срок пользования микрозаймом может быть продлен, при условии своевременной оплаты суммы причитающихся процентов согласно пункту 1.3. настоящего Договора и подписания пунктов 4.2.1. и 4.3.1. настоящего Договора. Общий срок пользования по продленному микрозайму не должен превышать 90 дней.",
            "п. 2.7. Срок пользования микрозаймом может быть продлен без оформления подписи Заемщика, как это предусмотрено п.п. 4.2.1 и 4.3.1 договора, при условии своевременной оплаты «Заёмщиком» в безналичном порядке и (или) третьим лицом причитающихся процентов и (или) штрафов по настоящему договору.",
          ],
          UZ: [
            "2.6-band. Qarz oluvchining arizasi va tomonlarning o‘zaro roziligi bilan mikrokreditdan foydalanish muddati 1.3-bandga muvofiq tegishli foizlar o‘z vaqtida to‘langan va shartnomaning 4.2.1 hamda 4.3.1-bandlari imzolangan taqdirda uzaytirilishi mumkin. Uzaytirilgan mikrokreditdan foydalanishning umumiy muddati 90 kundan oshmasligi kerak.",
            "2.7-band. Shartnomaning 4.2.1 va 4.3.1-bandlarida nazarda tutilganidek, Qarz oluvchining imzosisiz ham mikrokredit muddati uzaytirilishi mumkin, bunda Qarz oluvchi va/yoki uchinchi shaxs tomonidan tegishli foizlar va/yoki jarimalar o‘z vaqtida naqdsiz to‘langan bo‘lishi kerak.",
          ],
        },
      },
      {
        title: { RU: "6. Просрочка, льготный месяц и обращение взыскания", UZ: "6. Kechikish, imtiyozli oy va undiruv" },
        items: {
          RU: [
            "п. 2.8. В случае несвоевременного исполнения «Заёмщиком» или отказа от исполнения обязательств указанных в п. 2.4. настоящего договора, «Ломбард» имеет право на основании исполнительной надписи нотариуса по истечении льготного месячного срока продать имущество, указанного в п.1.6. настоящего договора в порядке, установленном законодательством. При этом «Заёмщик» подписывает акт сверки взаимных расчетов, прилагаемый к настоящему договору, в котором указывается сумма долга по настоящему договору, которая образуется в случае несвоевременного или ненадлежащего исполнения своих обязательств «Заемщиком».",
            "п. 2.9. В течении льготного месяца «Заёмщик» имеет право вернуть имущество из залога только при условии исполнения своих обязательств в следующем порядке: возмещение расходов по получению исполнительного документа об обращении взыскания на залог; оплата пени (штрафа); оплата процентов по микрозайму; оплата основного долга. В противном случае «Ломбард» имеет право продать заложенное имущество на основании исполнительного документа в порядке, указанном в пункте 2.7. настоящего договора.",
            "Залоговый билет, прочие условия. За каждый просроченный день берётся пеня в размере 0,80 % от общей суммы займа с учётом процентов.",
          ],
          UZ: [
            "2.8-band. Qarz oluvchi 2.4-bandda ko‘rsatilgan majburiyatlarni o‘z vaqtida bajarmasa yoki bajarishdan bosh tortsa, Lombard qonunchilikda belgilangan tartibda notariusning ijro yozuvi asosida bir oylik imtiyozli muddat tugaganidan keyin 1.6-bandda ko‘rsatilgan mol-mulkni sotishga haqli.",
            "2.9-band. Imtiyozli oy davomida Qarz oluvchi garovdagi mol-mulkni faqat quyidagi majburiyatlarni bajarish sharti bilan qaytarishi mumkin: garovga undiruv qaratish bo‘yicha ijro hujjatini olish xarajatlarini qoplash; penya (jarima)ni to‘lash; mikrokredit bo‘yicha foizlarni to‘lash; asosiy qarzni to‘lash. Aks holda Lombard ijro hujjati asosida garovdagi mol-mulkni shartnomaning 2.7-bandida ko‘rsatilgan tartibda sotishga haqli.",
            "Garov bileti, boshqa shartlar. Har bir kechiktirilgan kun uchun foizlarni hisobga olgan holda kreditning umumiy summasining 0,80 foizi miqdorida penya olinadi.",
          ],
        },
      },
      {
        title: { RU: "7. Возврат и обращение с залогом", UZ: "7. Garovni qaytarish va u bilan muomala" },
        items: {
          RU: [
            "п. 2.10. В случае своевременного и полного исполнения своих обязательств по погашению микрозайма, а также процентов по нему, «Ломбард» обязуется вернуть заложенное «Заёмщиком» имущество, указанное в п.1.6. настоящего договора.",
            "п. 2.15. Ломбард обязуется обеспечить сохранность имущества на весь срок его нахождения в Ломбарде. При повреждении имущества Ломбард по желанию Заемщика устраняет повреждение за свой счёт, либо выплачивает ему сумму, равную оценке имущества, указанной в залоговом билете. В этом случае, имущество переходит в собственность Ломбарда.",
            "п. 2.16. Ломбард обязуется застраховать имущество в размере оценки за собственный счет на весь срок нахождения в Ломбарде.",
            "п. 2.17. При утрате принятого от Заемщика имущества, Ломбард выплачивает Заемщику сумму, равную оценке, указанной в залоговом билете.",
            "Залоговый билет. Предмет залога передаётся во владение ломбарду. Ломбард не вправе использовать, отчуждать, передавать в аренду или безвозмездное пользование третьим лицам либо иным образом распоряжаться предметом залога. Последующий залог предмета залога запрещается.",
          ],
          UZ: [
            "2.10-band. Mikrokredit va unga tegishli foizlar bo‘yicha majburiyatlar o‘z vaqtida va to‘liq bajarilganda, Lombard 1.6-bandda ko‘rsatilgan garovdagi mol-mulkni Qarz oluvchiga qaytarishi shart.",
            "2.15-band. Lombard mol-mulk Lombardda bo‘lgan butun davr davomida uning saqlanishini ta’minlashi shart. Mol-mulk shikastlanganda, Qarz oluvchining xohishiga ko‘ra Lombard shikastni o‘z hisobidan bartaraf etadi yoki garov biletida ko‘rsatilgan baholangan summaga teng summani to‘laydi. Bunda mol-mulk Lombard mulkiga o‘tadi.",
            "2.16-band. Lombard mol-mulkni baholash summasi miqdorida o‘z hisobidan Lombardda bo‘lgan butun muddatga sug‘urtalashi shart.",
            "2.17-band. Qarz oluvchidan qabul qilingan mol-mulk yo‘qolgan taqdirda, Lombard Qarz oluvchiga garov biletida ko‘rsatilgan baholash summasiga teng summani to‘laydi.",
            "Garov bileti. Garov predmeti Lombard egaligiga topshiriladi. Lombard garov predmetidan foydalanishi, uni begonalashtirishi, uchinchi shaxslarga ijaraga yoki bepul foydalanishga berishi yoki boshqa tarzda tasarruf etishi mumkin emas. Garov predmetini keyinchalik qayta garovga qo‘yish taqiqlanadi.",
          ],
        },
      },
      {
        title: { RU: "8. Досрочное погашение", UZ: "8. Muddatidan oldin to‘lash" },
        items: {
          RU: [
            "п. 2.11. «Заёмщик» вправе вернуть «Ломбарду» сумму микрозайма до наступления срока возврата, установленного настоящим Договором. В этом случае «Заёмщик» одновременно с оплатой суммы займа, уплачивает «Ломбарду» проценты за фактически дни пользования микрозаймом, согласно установленным тарифам.",
          ],
          UZ: [
            "2.11-band. Qarz oluvchi ushbu Shartnomada belgilangan qaytarish muddati kelishidan oldin mikrokredit summasini Lombardga qaytarishga haqli. Bunda kredit summasi bilan bir vaqtda mikrokreditdan amalda foydalanilgan kunlar uchun belgilangan tariflarga muvofiq foizlar to‘lanadi.",
          ],
        },
      },
      {
        title: { RU: "9. Выписка из залогового реестра", UZ: "9. Garov reyestridan ko‘chirma" },
        items: {
          RU: [
            "п. 2.12. В случае внесения по требованию «Заёмщика» в залоговый реестр записи о выданном микрозайме (указывается в заявке на микрозайм), «Ломбард» имеет право взыскать с «Заёмщика» стоимость указанной услуги в размере 10 % базовой расчетной величины согласно пункту 5 ПКМ РУ № 155 от 12.06.2014г. за предоставление выписки из залогового реестра в размере 5 % от базовой расчетной величины.",
          ],
          UZ: [
            "2.12-band. Qarz oluvchining talabi bilan berilgan mikrokredit haqidagi yozuv Garov reyestriga kiritilgan taqdirda, Lombard ushbu xizmat qiymatini undirish huquqiga ega: 2014-yil 12-iyundagi 155-son PQMning 5-bandiga muvofiq bazaviy hisoblash miqdorining 10 foizi va garov reyestridan ko‘chirma berish uchun bazaviy hisoblash miqdorining 5 foizi.",
          ],
        },
      },
      {
        title: { RU: "10. Идентификация, SMS и персональные данные", UZ: "10. Identifikatsiya, SMS va shaxsiy ma’lumotlar" },
        items: {
          RU: [
            "п. 2.13. Ломбард имеет право принимать надлежащие меры (замораживание, приостановление операций и т.д.) для идентификации физического лица в соответствии с Законом Республики Узбекистан «О противодействии легализации доходов, полученных от преступной деятельности, и финансированию терроризма» и других нормативно-правовых актов РУ.",
            "п. 2.14. Ломбард вправе направить уведомления в формате SMS - сообщений.",
            "п. 2.18. Все операции (залог, перезалог, выкуп, сдача на хранение) совершаются только с самим Заемщиком и при предъявлении им документа удостоверяющего личность.",
            "п. 2.19. Заемщик дает согласие Ломбарду на обработку своих персональных данных, включая: сбор, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных путем смешанной обработки персональных данных, в целях исполнения обязательство по настоящему договору.",
            "п. 2.20. Ломбард гарантирует Заемщику принятие всех необходимых мер по обеспечению конфиденциальности персональных данных Заемщика в соответствии с требованиями, установленными действующим законодательством Республики Узбекистан о персональных данных.",
          ],
          UZ: [
            "2.13-band. Lombard jismoniy shaxsni identifikatsiya qilish uchun O‘zbekiston Respublikasining jinoyatdan olingan daromadlarni legallashtirishga qarshi kurashish va terrorizmni moliyalashtirishga qarshi kurashish to‘g‘risidagi qonuni hamda boshqa normativ-huquqiy hujjatlarga muvofiq tegishli choralarni ko‘rishga haqli.",
            "2.14-band. Lombard SMS xabarlar formatida bildirishnomalar yuborish huquqiga ega.",
            "2.18-band. Barcha operatsiyalar (garovga qo‘yish, qayta garovga qo‘yish, qaytarib olish, saqlashga topshirish) faqat Qarz oluvchining o‘zi bilan va uning shaxsini tasdiqlovchi hujjati taqdim etilganda amalga oshiriladi.",
            "2.19-band. Qarz oluvchi ushbu shartnoma majburiyatlarini bajarish maqsadida Lombardga o‘z shaxsiy ma’lumotlarini yig‘ish, tizimlashtirish, to‘plash, saqlash, aniqlashtirish, chiqarib olish, foydalanish, berish, anonimlashtirish, bloklash, o‘chirish va yo‘q qilish kabi aralash usulda qayta ishlashga rozilik beradi.",
            "2.20-band. Lombard O‘zbekiston Respublikasining shaxsiy ma’lumotlar to‘g‘risidagi amaldagi qonunchiligiga muvofiq Qarz oluvchining shaxsiy ma’lumotlari maxfiyligini ta’minlash uchun barcha zarur choralarni ko‘rishini kafolatlaydi.",
          ],
        },
      },
      {
        title: { RU: "11. Изменения договора, ответственность и споры", UZ: "11. Shartnomaga o‘zgartirishlar, javobgarlik va nizolar" },
        items: {
          RU: [
            "п. 3.1. Настоящий Договор составлен в трёх экземплярах по одному для каждой Стороны и один экземпляр для нотариальной конторы.",
            "п. 3.2. Договор может быть изменён и дополнен по соглашению Сторон. Все изменения и дополнения к настоящему Договору должны быть составлены в письменной форме и подписаны Сторонами. Несоблюдение письменной формы влечёт недействительность любых изменений и дополнений.",
            "п. 3.3. Ответственность Сторон определяется в соответствии с действующим законодательством Республики Узбекистан, однако «Заёмщик» несёт персональную ответственность за достоверность информации о предмете залога, являющимся обеспечением обязательств по настоящему договору.",
            "п. 3.4. Общая сумма начисленных процентов, комиссий и неустойки по настоящему договору не должна превышать сумму более половины размера основного долга.",
            "п. 3.5. Все споры, которые могут возникнуть между Сторонами по исполнению Договора микрозайма, либо связанные с этими договорами другие вопросы, а также споры, вытекающие из ранее заключенных договоров, решаются путем переговоров. В случае если стороны не достигли компромисса путем переговоров, дело передается в суд для разбирательства согласно действующему законодательству РУ.",
            "п. 3.6. Срок действия договора — до полного исполнения сторонами своих обязательств по договору.",
          ],
          UZ: [
            "3.1-band. Ushbu Shartnoma uch nusxada tuzilgan: har bir Tomon uchun bittadan va notarial idora uchun bitta nusxa.",
            "3.2-band. Shartnoma Tomonlarning kelishuviga ko‘ra o‘zgartirilishi va to‘ldirilishi mumkin. Barcha o‘zgartirish va qo‘shimchalar yozma shaklda tuzilib, Tomonlar tomonidan imzolanishi kerak. Yozma shaklga rioya qilinmasa, bunday o‘zgartirish va qo‘shimchalar haqiqiy emas.",
            "3.3-band. Tomonlarning javobgarligi O‘zbekiston Respublikasining amaldagi qonunchiligiga muvofiq belgilanadi, biroq Qarz oluvchi ushbu shartnoma majburiyatlarini ta’minlovchi garov predmeti haqidagi ma’lumotlarning to‘g‘riligi uchun shaxsan javob beradi.",
            "3.4-band. Ushbu shartnoma bo‘yicha hisoblangan foizlar, komissiyalar va neustoykaning umumiy summasi asosiy qarz miqdorining yarmidan ortiq bo‘lmasligi kerak.",
            "3.5-band. Mikrokredit shartnomasini bajarish yuzasidan Tomonlar o‘rtasida yuzaga kelishi mumkin bo‘lgan nizolar hamda ushbu shartnomalar va avval tuzilgan shartnomalardan kelib chiqadigan boshqa masalalar avvalo muzokaralar yo‘li bilan hal qilinadi. Kelishuvga erishilmasa, ish O‘zbekiston Respublikasining amaldagi qonunchiligiga muvofiq sudga yuboriladi.",
            "3.6-band. Shartnomaning amal qilish muddati — Tomonlar o‘z majburiyatlarini to‘liq bajarguniga qadar.",
          ],
        },
      },
      {
        title: { RU: "12. Особые условия и дополнительные соглашения", UZ: "12. Maxsus shartlar va qo‘shimcha kelishuvlar" },
        items: {
          RU: [
            "п. 4.1. По согласованию сторон процент уменьшен до ___%.",
            "п. 4.2. Дополнительное соглашение к договору микрозайма. п. 4.2.1. По согласованию сторон срок микрозайма продлевается с " + '"___"' + " ________20___г до " + '"___"' + " _________20___г. Руководитель: ______________________ (подпись). Бухгалтер-контроллер: ______________________ (подпись). Заёмщик: ______________________ (подпись).",
            "п. 4.3. Дополнительное соглашение к договору микрозайма. п. 4.3.1. По согласованию сторон срок микрозайма продлевается с " + '"___"' + " ________20___г до " + '"___"' + " _________20___г. Руководитель: ______________________ (подпись). Бухгалтер-контроллер: ______________________ (подпись). Заёмщик: ______________________ (подпись).",
          ],
          UZ: [
            "4.1-band. Tomonlarning kelishuviga ko‘ra foiz ___% gacha kamaytiriladi.",
            "4.2-band. Mikrokredit shartnomasiga qo‘shimcha kelishuv. 4.2.1-band. Tomonlarning kelishuviga ko‘ra mikrokredit muddati tegishli sanalardan boshlab tegishli sanagacha uzaytiriladi. Rahbar, buxgalter-nazoratchi va Qarz oluvchining imzolari ko‘zda tutilgan.",
            "4.3-band. Mikrokredit shartnomasiga qo‘shimcha kelishuv. 4.3.1-band. Tomonlarning kelishuviga ko‘ra mikrokredit muddati tegishli sanalardan boshlab tegishli sanagacha uzaytiriladi. Rahbar, buxgalter-nazoratchi va Qarz oluvchining imzolari ko‘zda tutilgan.",
          ],
        },
      },
      {
        title: { RU: "13. Залоговый билет: какие сведения в нём фиксируются", UZ: "13. Garov biletida qayd etiladigan ma’lumotlar" },
        items: {
          RU: [
            "Залоговый билет № [номер]. 1. Ф.И.О. залогодателя. 2. Данные документа, удостоверяющего личность. 3. Место жительства. 4. Дата выдачи ломбардом кредита. 5. Сумма кредита. 6. Дата погашения кредита. 7. Сумма оценки. 8. Сумма возврата кредита и сумма процентов. 9. Наименование залога и его описание. 10. Срок залога 30 дней (может быть продлен 2 раза на срок не более 90 дней при условии своевременной оплаты).",
            "Залоговый билет. Предмет залога передаётся во владение ломбарду. Ломбард не вправе использовать, отчуждать, передавать в аренду или безвозмездное пользование третьим лицам либо иным образом распоряжаться предметом залога. Последующий залог предмета залога запрещается. Предмет залога не является имуществом, необходимым для нормальной жизнеобеспеченности залогодателя и или членов его семьи. В случае непогашения в установленный срок суммы кредита, обеспеченного залогом имущества в ломбарде, ломбард вправе самостоятельно обратить взыскание на это имущество на основании исполнительной надписи нотариуса.",
            "Залоговый билет. Прочие условия: за каждый просроченный день берётся пеня в размере 0,80 % от общей суммы займа с учётом процентов.",
            "Залоговый билет. Настоящий залоговый билет составлен в 2-х экземплярах, является неотъемлемой частью Договора о залоге, а также документом строгой отчетности.",
          ],
          UZ: [
            "Garov bileti № [raqam]. 1. Garovga qo‘yuvchining F.I.Sh. 2. Shaxsni tasdiqlovchi hujjat ma’lumotlari. 3. Yashash joyi. 4. Lombard tomonidan kredit berilgan sana. 5. Kredit summasi. 6. Kreditni qaytarish sanasi. 7. Baholash summasi. 8. Kreditni qaytarish summasi va foizlar summasi. 9. Garov nomi va tavsifi. 10. Garov muddati 30 kun (o‘z vaqtida to‘lov sharti bilan 2 marta uzaytirilishi mumkin, umumiy muddat 90 kundan oshmasligi kerak).",
            "Garov bileti. Garov predmeti Lombard egaligiga topshiriladi. Lombard garov predmetidan foydalanishi, uni begonalashtirishi, uchinchi shaxslarga ijaraga yoki bepul foydalanishga berishi yoki boshqa tarzda tasarruf etishi mumkin emas. Garov predmetini keyinchalik qayta garovga qo‘yish taqiqlanadi.",
            "Garov bileti. Boshqa shartlar: har bir kechiktirilgan kun uchun foizlarni hisobga olgan holda kreditning umumiy summasining 0,80 foizi miqdorida penya olinadi.",
            "Garov bileti. Ushbu garov bileti 2 nusxada tuzilgan, garov shartnomasining ajralmas qismi va qat’iy hisobot hujjati hisoblanadi.",
          ],
        },
      },
      {
        title: { RU: "14. Что важно оператору", UZ: "14. Operator uchun muhim" },
        items: {
          RU: [
            "Данные о конкретном клиенте, его договоре, задолженности, платеже или статусе нельзя определять только по этому материалу. Для индивидуальной проверки используется рабочая система.",
            "Формулировки договора следует отличать от внутреннего рабочего порядка. Если действующая инструкция компании содержит отдельный порядок действий, оператор использует утверждённый порядок и при необходимости передаёт вопрос ответственному подразделению.",
          ],
          UZ: [
            "Muayyan mijoz, uning shartnomasi, qarzdorligi, to‘lovi yoki holatini faqat ushbu material asosida aniqlab bo‘lmaydi. Individual tekshiruv ishchi tizimda amalga oshiriladi.",
            "Shartnoma matnini ichki ish tartibidan farqlash kerak. Agar kompaniyaning amaldagi yo‘riqnomasida alohida tartib mavjud bo‘lsa, operator tasdiqlangan tartibga amal qiladi va zarur bo‘lsa masalani mas’ul bo‘limga yuboradi.",
          ],
        },
      },
    ],
  },
};

type NavigatorStep = {
  title: LocalizedText;
  text: LocalizedText;
  important?: LocalizedText;
};

type NavigatorFlow = {
  id: string;
  categoryId: string;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
  steps: NavigatorStep[];
  knowledgeArticle?: string;
  clientText?: LocalizedText;
  scriptIndex?: number;
  scriptLabel?: LocalizedText;
};

type NavigatorCategory = {
  id: string;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
  flows: string[];
};

type NavigatorRequestGuide = {
  required: LocalizedText[];
  optional: LocalizedText[];
  documents: LocalizedText[];
  doNotAsk: LocalizedText[];
};

type ScriptSection = {
  title: LocalizedText;
  lines: Record<Language, string[]>;
};

type ContractKeyPoint = {
  id: string;
  title: LocalizedText;
  text: LocalizedText;
  source: LocalizedText;
  keywords: string;
};

const contractKeyPoints: ContractKeyPoint[] = [
  {
    id: "subject",
    title: { RU: "Предмет договора", UZ: "Shartnoma predmeti" },
    text: {
      RU: "1.1. «Ломбард» предоставляет на условиях настоящего Договора «Заёмщику» сумму микрозайма в размере [СУММА] сум под залог в виде заклада (залог). Сумма микрозайма определена из оценки сторонами предмета залога на момент их принятия в залог.\n\n1.2. «Заёмщик» обязуется возвратить «Ломбарду» сумму кредита, в размере указанном в п.1.1 настоящего договора, а также причитающиеся проценты, размер которых указывается в залоговом билете № [НОМЕР] от [ДАТА].",
      UZ: "1.1. «Lombard» ushbu Shartnoma shartlarida «Qarz oluvchi»ga [SUMMA] so‘m miqdorida mikrokreditni garov (garovga qo‘yilgan mol-mulk) evaziga taqdim etadi. Mikrokredit summasi garov predmeti garovga qabul qilingan paytda tomonlar tomonidan baholangan summadan kelib chiqib belgilanadi.\n\n1.2. «Qarz oluvchi» ushbu shartnomaning 1.1-bandida ko‘rsatilgan kredit summasini, shuningdek garov biletida ko‘rsatilgan tegishli foizlarni «Lombard»ga qaytarish majburiyatini oladi.",
    },
    source: { RU: "Договор микрозайма, п. 1.1–1.2", UZ: "Mikrokredit shartnomasi, 1.1–1.2-bandlar" },
    keywords: "сумма займа предмет договора залог оценка возвратить проценты",
  },
  {
    id: "interest",
    title: { RU: "Начисление и размер процентов", UZ: "Foizlarni hisoblash va stavkalar" },
    text: {
      RU: "1.3. Проценты за пользование Микрозаймом начисляются ежедневно со дня фактического предоставления денежных средств Заёмщику включительно до дня возврата основного долга включительно на фактический остаток основного долга.\n\nРазмер применяемой процентной ставки определяется исходя из фактического остатка Основного долга в следующем порядке:\nпри остатке Основного долга менее 5 000 000 сум — 0,30% за каждый день пользования Микрозаймом, что соответствует 109,50% годовых исходя из 365 календарных дней;\nпри остатке Основного долга от 5 000 000 сум включительно, но менее 10 000 000 сум — 0,27% за каждый день пользования Микрозаймом, что соответствует 98,55% годовых;\nпри остатке Основного долга от 10 000 000 сум включительно, но менее 20 000 000 сум — 0,23% за каждый день пользования Микрозаймом, что соответствует 83,95% годовых;\nпри остатке Основного долга от 20 000 000 сум включительно до 100 000 000 сум включительно — 0,20% за каждый день пользования Микрозаймом, что соответствует 73,00% годовых.\n\nГодовая процентная ставка рассчитывается как дневная процентная ставка, умноженная на 365 календарных дней, без капитализации процентов.",
      UZ: "1.3. Mikrokreditdan foydalanganlik uchun foizlar pul mablag‘lari Qarz oluvchiga amalda berilgan kundan boshlab asosiy qarz qaytarilgan kungacha, shu kunlarni ham qo‘shgan holda, asosiy qarzning amaldagi qoldig‘iga har kuni hisoblanadi.\n\nQo‘llaniladigan foiz stavkasi asosiy qarzning amaldagi qoldig‘idan kelib chiqib belgilanadi: 5 000 000 so‘mdan kam qoldiqda — kuniga 0,30%; 5 000 000 so‘mdan 10 000 000 so‘mgacha bo‘lgan qoldiqda — kuniga 0,27%; 10 000 000 so‘mdan 20 000 000 so‘mgacha bo‘lgan qoldiqda — kuniga 0,23%; 20 000 000 so‘mdan 100 000 000 so‘mgacha bo‘lgan qoldiqda — kuniga 0,20%.\n\nYillik foiz stavkasi kapitalizatsiyasiz kunlik stavkani 365 kalendar kuniga ko‘paytirish yo‘li bilan hisoblanadi.",
    },
    source: { RU: "Договор микрозайма, п. 1.3", UZ: "Mikrokredit shartnomasi, 1.3-band" },
    keywords: "проценты ставка 0.30 0,30 0.27 0,27 0.23 0,23 0.20 0,20 остаток основной долг с какого дня",
  },
  {
    id: "early-payment",
    title: { RU: "Полное и частичное досрочное погашение", UZ: "To‘liq va qisman muddatidan oldin to‘lash" },
    text: {
      RU: "1.4. Заёмщик вправе полностью или частично досрочно погасить Микрозайм без взимания комиссии, штрафа или иной платы за досрочное погашение.\n\nПри частичном досрочном погашении поступивший платёж распределяется в счёт исполнения обязательств Заёмщика в очередности, установленной законодательством Республики Узбекистан.\n\nЕсли в результате частичного досрочного погашения фактический остаток Основного долга переходит в другой диапазон, установленный пунктом 1.3 настоящего Договора, процентная ставка изменяется автоматически с даты отражения частичного погашения в учёте Ломбарда. Новая процентная ставка применяется к фактическому остатку Основного долга, образовавшемуся после частичного погашения. Для определения применимого тарифного диапазона учитывается сумма, фактически направленная на погашение Основного долга, а не общая сумма внесённого Заёмщиком платежа. Изменение процентной ставки в соответствии с настоящим пунктом осуществляется автоматически и не требует заключения дополнительного соглашения к Договору.",
      UZ: "1.4. Qarz oluvchi mikrokreditni komissiya, jarima yoki muddatidan oldin to‘lash uchun boshqa haq undirilmasdan to‘liq yoki qisman muddatidan oldin to‘lashi mumkin.\n\nQisman muddatidan oldin to‘lashda tushgan to‘lov Qarz oluvchining majburiyatlarini O‘zbekiston Respublikasi qonunchiligida belgilangan ketma-ketlikda bajarish uchun taqsimlanadi.\n\nAgar qisman muddatidan oldin to‘lash natijasida asosiy qarzning amaldagi qoldig‘i ushbu Shartnomaning 1.3-bandida belgilangan boshqa diapazonga o‘tsa, foiz stavkasi qisman to‘lov Lombard hisobida aks ettirilgan sanadan avtomatik ravishda o‘zgaradi. Yangi foiz stavkasi qisman to‘lashdan keyin shakllangan asosiy qarzning amaldagi qoldig‘iga qo‘llanadi. Tarif diapazonini aniqlashda Qarz oluvchi tomonidan kiritilgan to‘lovning umumiy summasi emas, balki asosiy qarzni to‘lashga amalda yo‘naltirilgan summa hisobga olinadi. Foiz stavkasining o‘zgarishi avtomatik amalga oshiriladi va qo‘shimcha kelishuv tuzishni talab qilmaydi.",
    },
    source: { RU: "Договор микрозайма, п. 1.4 (со ссылкой на п. 1.3)", UZ: "Mikrokredit shartnomasi, 1.4-band (1.3-bandga havola bilan)" },
    keywords: "досрочно частично погасить комиссия штраф ставка изменилась тариф диапазон автоматически",
  },
  {
    id: "term",
    title: { RU: "Срок микрозайма", UZ: "Mikrokredit muddati" },
    text: {
      RU: "1.5. Указанная в п. 1.1. сумма микрозайма предоставляется Заёмщику на срок 30 дней до даты, указанной в договоре.",
      UZ: "1.5. 1.1-bandda ko‘rsatilgan mikrokredit summasi Qarz oluvchiga shartnomada ko‘rsatilgan sanagacha 30 kun muddatga beriladi.",
    },
    source: { RU: "Договор микрозайма, п. 1.5", UZ: "Mikrokredit shartnomasi, 1.5-band" },
    keywords: "срок займа 30 дней дата погашения срок договора",
  },
  {
    id: "collateral",
    title: { RU: "Залог и залоговый билет", UZ: "Garov va garov bileti" },
    text: {
      RU: "1.6. В качестве обеспечения обязательства «Заёмщик» предоставляет в виде Залога принадлежащее ему на праве собственности имущество.\n\n1.7. В соответствии со ст. 289 Гражданского кодекса РУ, договор о залоге вещей в ломбарде оформляется выдачей «Ломбардом» залогового билета.",
      UZ: "1.6. Majburiyatni ta’minlash sifatida «Qarz oluvchi» o‘ziga mulk huquqi asosida tegishli bo‘lgan mol-mulkni Garov sifatida taqdim etadi.\n\n1.7. O‘zbekiston Respublikasi Fuqarolik kodeksining 289-moddasiga muvofiq, Lombardda buyumlarni garovga qo‘yish shartnomasi «Lombard» tomonidan garov biletini berish yo‘li bilan rasmiylashtiriladi.",
    },
    source: { RU: "Договор микрозайма, п. 1.6–1.7", UZ: "Mikrokredit shartnomasi, 1.6–1.7-bandlar" },
    keywords: "залог имущество залоговый билет договор о залоге",
  },
  {
    id: "return-payment",
    title: { RU: "Возврат займа и дата исполнения", UZ: "Kreditni qaytarish va bajarilgan sana" },
    text: {
      RU: "2.3. По истечении срока, установленного п. 1.5, «Заёмщик» обязуется вернуть полученную от «Ломбарда» сумму микрозайма в порядке и на условиях, установленных п. 2.4. настоящего Договора, а также уплатить «Ломбарду» причитающиеся ему проценты.\n\n2.4. Возврат полученной суммы микрозайма осуществляется «Заёмщиком» не позднее следующего дня после истечения срока микрозайма, указанного в п. 1.5.\n\n2.5. Датой исполнения «Заёмщиком» своего обязательства по возврату суммы кредита «Ломбарда» считается дата поступления наличных денежных средств в кассу или на расчетный счет «Ломбарда».",
      UZ: "2.3. 1.5-bandda belgilangan muddat tugagach, «Qarz oluvchi» 2.4-bandda belgilangan tartib va shartlarda «Lombard»dan olingan mikrokredit summasini qaytarishi hamda «Lombard»ga tegishli foizlarni to‘lashi shart.\n\n2.4. Olingan mikrokredit summasi 1.5-bandda ko‘rsatilgan mikrokredit muddati tugaganidan keyingi kundan kechiktirmay qaytarilishi kerak.\n\n2.5. Kredit summasini qaytarish bo‘yicha majburiyat bajarilgan sana naqd pul «Lombard» kassasiga yoki «Lombard»ning hisob raqamiga kelib tushgan sana hisoblanadi.",
    },
    source: { RU: "Договор микрозайма, п. 2.3–2.5", UZ: "Mikrokredit shartnomasi, 2.3–2.5-bandlar" },
    keywords: "возврат оплатить дата исполнения поступление касса расчетный счет платеж",
  },
  {
    id: "extension",
    title: { RU: "Продление микрозайма", UZ: "Mikrokredit muddatini uzaytirish" },
    text: {
      RU: "2.6. По заявлению «Заёмщика» и взаимному согласию сторон срок пользования микрозаймом может быть продлен, при условии своевременной оплаты суммы причитающихся процентов согласно пункту 1.3. настоящего Договора и подписания пунктов 4.2.1. и 4.3.1. настоящего Договора. Общий срок пользования по продленному микрозайму не должен превышать 90 дней.\n\n2.7. Срок пользования микрозаймом может быть продлен без оформления подписи Заемщика, как это предусмотрено п.п. 4.2.1 и 4.3.1 договора, при условии своевременной оплаты «Заёмщиком» в безналичном порядке и (или) третьим лицом причитающихся процентов и (или) штрафов по настоящему договору.",
      UZ: "2.6. «Qarz oluvchi»ning arizasi va tomonlarning o‘zaro roziligi bilan mikrokreditdan foydalanish muddati ushbu Shartnomaning 1.3-bandiga muvofiq tegishli foizlar o‘z vaqtida to‘langanda va ushbu Shartnomaning 4.2.1 va 4.3.1-bandlari imzolanganda uzaytirilishi mumkin. Uzaytirilgan mikrokreditdan foydalanishning umumiy muddati 90 kundan oshmasligi kerak.\n\n2.7. Mikrokreditdan foydalanish muddati shartnomaning 4.2.1 va 4.3.1-bandlarida nazarda tutilganidek, shartnomada belgilangan shartlarda naqdsiz to‘lov Qarz oluvchi va/yoki uchinchi shaxs tomonidan o‘z vaqtida amalga oshirilganda Qarz oluvchining imzosini rasmiylashtirmasdan ham uzaytirilishi mumkin.",
    },
    source: { RU: "Договор микрозайма, п. 2.6–2.7; залоговый билет, п. 10", UZ: "Mikrokredit shartnomasi, 2.6–2.7-bandlar; garov bileti, 10-band" },
    keywords: "продление продлить 90 дней два раза подпись без подписи проценты штраф онлайн",
  },
  {
    id: "realization",
    title: { RU: "Непогашение, льготный месяц и обращение взыскания", UZ: "To‘lanmaslik, imtiyozli oy va undiruv" },
    text: {
      RU: "2.8. В случае несвоевременного исполнения «Заёмщиком» или отказа от исполнения обязательств, указанных в п. 2.4. настоящего договора, «Ломбард» имеет право на основании исполнительной надписи нотариуса по истечении льготного месячного срока продать имущество, указанное в п.1.6. настоящего договора, в порядке, установленном законодательством.\n\n2.9. В течение льготного месяца «Заёмщик» имеет право вернуть имущество из залога только при условии исполнения своих обязательств в следующем порядке: возмещение расходов по получению исполнительного документа об обращении взыскания на залог; оплата пени (штрафа); оплата процентов по микрозайму; оплата основного долга. В противном случае «Ломбард» имеет право продать заложенное имущество на основании исполнительного документа в порядке, указанном в пункте 2.7. настоящего договора.",
      UZ: "2.8. «Qarz oluvchi» 2.4-bandda ko‘rsatilgan majburiyatlarni o‘z vaqtida bajarmagan yoki ularni bajarishdan bosh tortgan taqdirda, «Lombard» notariusning ijro xati asosida imtiyozli bir oylik muddat o‘tgach, ushbu shartnomaning 1.6-bandida ko‘rsatilgan mol-mulkni qonunchilikda belgilangan tartibda sotish huquqiga ega.\n\n2.9. Imtiyozli oy davomida «Qarz oluvchi» garovni faqat quyidagi ketma-ketlikda o‘z majburiyatlarini bajargan taqdirdagina qaytarib olishi mumkin: garovga undiruv qaratish bo‘yicha ijro hujjatini olish xarajatlarini qoplash; penya (jarima)ni to‘lash; mikrokredit bo‘yicha foizlarni to‘lash; asosiy qarzni to‘lash. Aks holda «Lombard» ijro hujjati asosida garovdagi mol-mulkni shartnomaning 2.7-bandida ko‘rsatilgan tartibda sotish huquqiga ega.",
    },
    source: { RU: "Договор микрозайма, п. 2.8–2.9", UZ: "Mikrokredit shartnomasi, 2.8–2.9-bandlar" },
    keywords: "не оплатил просрочка льготный месяц реализация взыскание продать залог пеня штраф проценты основной долг",
  },
  {
    id: "pledge-return",
    title: { RU: "Возврат залога при исполнении обязательств", UZ: "Majburiyat bajarilganda garovni qaytarish" },
    text: {
      RU: "2.10. В случае своевременного и полного исполнения своих обязательств по погашению микрозайма, а также процентов по нему, «Ломбард» обязуется вернуть заложенное «Заёмщиком» имущество, указанное в п.1.6. настоящего договора.\n\n2.11. «Заёмщик» вправе вернуть «Ломбарду» сумму микрозайма до наступления срока возврата, установленного настоящим Договором. В этом случае «Заёмщик» одновременно с оплатой суммы займа уплачивает «Ломбарду» проценты за фактически дни пользования микрозаймом, согласно установленным тарифам.",
      UZ: "2.10. Mikrokreditni va unga tegishli foizlarni o‘z vaqtida va to‘liq to‘lash bo‘yicha majburiyatlar bajarilganda, «Lombard» Qarz oluvchi tomonidan garovga qo‘yilgan va 1.6-bandda ko‘rsatilgan mol-mulkni qaytarishi shart.\n\n2.11. «Qarz oluvchi» ushbu Shartnomada belgilangan qaytarish muddati kelishidan oldin mikrokredit summasini «Lombard»ga qaytarishga haqli. Bunda Qarz oluvchi kredit summasi bilan bir vaqtda mikrokreditdan amalda foydalanilgan kunlar uchun belgilangan tariflarga muvofiq foizlarni to‘laydi.",
    },
    source: { RU: "Договор микрозайма, п. 2.10–2.11", UZ: "Mikrokredit shartnomasi, 2.10–2.11-bandlar" },
    keywords: "вернуть залог погашение полностью проценты досрочно фактические дни",
  },
  {
    id: "registry-fee",
    title: { RU: "Залоговый реестр и стоимость услуги", UZ: "Garov reyestri va xizmat qiymati" },
    text: {
      RU: "2.12. В случае внесения по требованию «Заёмщика» в залоговый реестр записи о выданном микрозайме (указывается в заявке на микрозайм), «Ломбард» имеет право взыскать с «Заёмщика» стоимость указанной услуги в размере 10 % базовой расчетной величины согласно пункту 5 ПКМ РУ № 155 от 12.06.2014г. за предоставление выписки из залогового реестра в размере 5 % от базовой расчетной величины.",
      UZ: "2.12. Qarz oluvchining talabiga binoan berilgan mikrokredit to‘g‘risidagi yozuv garov reyestriga kiritilgan taqdirda (mikrokredit arizasida ko‘rsatiladi), «Lombard» ushbu xizmat qiymatini undirish huquqiga ega. Garov reyestridan ko‘chirma taqdim etilganligi uchun bazaviy hisoblash miqdorining 5 foizi miqdorida haq olinishi ko‘rsatilgan.",
    },
    source: { RU: "Договор микрозайма, п. 2.12", UZ: "Mikrokredit shartnomasi, 2.12-band" },
    keywords: "залоговый реестр выписка услуга 10 5 базовая расчетная величина",
  },
  {
    id: "identification-sms",
    title: { RU: "Идентификация и SMS-уведомления", UZ: "Identifikatsiya va SMS-bildirishnomalar" },
    text: {
      RU: "2.13. Ломбард имеет право принимать надлежащие меры (замораживание, приостановление операций и т.д.) для идентификации физического лица в соответствии с Законом Республики Узбекистан «О противодействии легализации доходов, полученных от преступной деятельности, и финансированию терроризма» и других нормативно-правовых актов РУ.\n\n2.14. Ломбард вправе направить уведомления в формате SMS - сообщений.",
      UZ: "2.13. Lombard O‘zbekiston Respublikasining tegishli qonunchiligiga muvofiq jismoniy shaxsni identifikatsiya qilish uchun zarur choralarni ko‘rish huquqiga ega.\n\n2.14. Lombard SMS-xabarlar formatida bildirishnomalar yuborish huquqiga ega.",
    },
    source: { RU: "Договор микрозайма, п. 2.13–2.14", UZ: "Mikrokredit shartnomasi, 2.13–2.14-bandlar" },
    keywords: "идентификация заморозка приостановление SMS смс уведомление звонок напоминание",
  },
  {
    id: "preservation-insurance-loss",
    title: { RU: "Сохранность, страхование, повреждение и утрата имущества", UZ: "Saqlash, sug‘urta, shikastlanish va yo‘qotish" },
    text: {
      RU: "2.15. Ломбард обязуется обеспечить сохранность имущества на весь срок его нахождения в Ломбарде. При повреждении имущества Ломбард по желанию Заемщика устраняет повреждение за свой счёт, либо выплачивает ему сумму, равную оценке имущества, указанной в залоговом билете. В этом случае имущество переходит в собственность Ломбарда.\n\n2.16. Ломбард обязуется застраховать имущество в размере оценки за собственный счет на весь срок нахождения в Ломбарде.\n\n2.17. При утрате принятого от Заемщика имущества, Ломбард выплачивает Заемщику сумму, равную оценке, указанной в залоговом билете.",
      UZ: "2.15. Lombard mol-mulk Lombardda saqlanadigan butun muddat davomida uning saqlanishini ta’minlashi shart. Mol-mulk shikastlanganda Lombard Qarz oluvchining xohishiga ko‘ra shikastlanishni o‘z hisobidan bartaraf etadi yoki garov biletida ko‘rsatilgan baholash summasiga teng summani to‘laydi. Bunda mol-mulk Lombard mulkiga o‘tadi.\n\n2.16. Lombard mol-mulkni Lombardda saqlashning butun davrida baholash summasi miqdorida o‘z hisobidan sug‘urtalashi shart.\n\n2.17. Qarz oluvchidan qabul qilingan mol-mulk yo‘qolgan taqdirda, Lombard garov biletida ko‘rsatilgan baholash summasiga teng summani to‘laydi.",
    },
    source: { RU: "Договор микрозайма, п. 2.15–2.17", UZ: "Mikrokredit shartnomasi, 2.15–2.17-bandlar" },
    keywords: "повреждение утрата потеряли страховка страхование сохранность оценка выплата",
  },
  {
    id: "operations",
    title: { RU: "Операции с залогом и документ удостоверяющий личность", UZ: "Garov bo‘yicha operatsiyalar va shaxsni tasdiqlovchi hujjat" },
    text: {
      RU: "2.18. Все операции (залог, перезалог, выкуп, сдача на хранение) совершаются только с самим Заемщиком и при предъявлении им документа удостоверяющего личность.",
      UZ: "2.18. Barcha operatsiyalar (garovga qo‘yish, qayta garovga qo‘yish, qaytarib olish, saqlashga topshirish) faqat Qarz oluvchining o‘zi bilan va uning shaxsini tasdiqlovchi hujjati taqdim etilganda amalga oshiriladi.",
    },
    source: { RU: "Договор микрозайма, п. 2.18", UZ: "Mikrokredit shartnomasi, 2.18-band" },
    keywords: "залог перезалог выкуп хранение паспорт документ удостоверяющий личность другой человек",
  },
  {
    id: "personal-data",
    title: { RU: "Персональные данные и конфиденциальность", UZ: "Shaxsiy ma’lumotlar va maxfiylik" },
    text: {
      RU: "2.19. Заемщик дает согласие Ломбарду на обработку своих персональных данных, включая: сбор, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных путем смешанной обработки персональных данных, в целях исполнения обязательство по настоящему договору.\n\n2.20. Ломбард гарантирует Заемщику принятие всех необходимых мер по обеспечению конфиденциальности персональных данных Заемщика в соответствии с требованиями, установленными действующим законодательством Республики Узбекистан о персональных данных.",
      UZ: "2.19. Qarz oluvchi ushbu shartnoma bo‘yicha majburiyatlarni bajarish maqsadida o‘z shaxsiy ma’lumotlarini aralash usulda qayta ishlashga, jumladan ularni yig‘ish, tizimlashtirish, to‘plash, saqlash, aniqlashtirish (yangilash, o‘zgartirish), olish, foydalanish, uzatish (taqdim etish, kirish), shaxssizlantirish, bloklash, o‘chirish va yo‘q qilishga «Lombard»ga rozilik beradi.\n\n2.20. Lombard O‘zbekiston Respublikasining shaxsiy ma’lumotlar to‘g‘risidagi amaldagi qonunchiligi talablariga muvofiq Qarz oluvchining shaxsiy ma’lumotlari maxfiyligini ta’minlash uchun barcha zarur choralarni ko‘rishni kafolatlaydi.",
    },
    source: { RU: "Договор микрозайма, п. 2.19–2.20", UZ: "Mikrokredit shartnomasi, 2.19–2.20-bandlar" },
    keywords: "персональные данные конфиденциальность обработка данные клиента",
  },
  {
    id: "changes-disputes",
    title: { RU: "Изменение договора, ответственность и споры", UZ: "Shartnomani o‘zgartirish, javobgarlik va nizolar" },
    text: {
      RU: "3.1. Настоящий Договор составлен в трёх экземплярах по одному для каждой Стороны и один экземпляр для нотариальной конторы.\n\n3.2. Договор может быть изменён и дополнен по соглашению Сторон. Все изменения и дополнения к настоящему Договору должны быть составлены в письменной форме и подписаны Сторонами. Несоблюдение письменной формы влечёт недействительность любых изменений и дополнений.\n\n3.3. Ответственность Сторон определяется в соответствии с действующим законодательством Республики Узбекистан, однако «Заёмщик» несёт персональную ответственность за достоверность информации о предмете залога, являющимся обеспечением обязательств по настоящему договору.\n\n3.5. Все споры, которые могут возникнуть между Сторонами по исполнению Договора микрозайма, либо связанные с этими договорами другие вопросы, а также споры, вытекающие из ранее заключенных договоров, решаются путем переговоров. В случае если стороны не достигли компромисса путем переговоров, дело передается в суд для разбирательства согласно действующему законодательству РУ.\n\n3.6. Срок действия договора — до полного исполнения сторонами своих обязательств по договору.",
      UZ: "3.1. Ushbu Shartnoma uch nusxada tuzilgan bo‘lib, bittadan har bir Tomonga va bitta nusxa notarial idora uchun beriladi.\n\n3.2. Shartnoma Tomonlarning kelishuviga ko‘ra o‘zgartirilishi va to‘ldirilishi mumkin. Barcha o‘zgartirish va qo‘shimchalar yozma shaklda tuzilib, Tomonlar tomonidan imzolanishi kerak. Yozma shaklga rioya qilinmasligi har qanday o‘zgartirish va qo‘shimchalarning haqiqiy emasligiga olib keladi.\n\n3.3. Tomonlarning javobgarligi O‘zbekiston Respublikasining amaldagi qonunchiligiga muvofiq belgilanadi, biroq «Qarz oluvchi» ushbu shartnoma bo‘yicha majburiyatlarni ta’minlovchi garov predmeti haqidagi ma’lumotlarning to‘g‘riligi uchun shaxsan javobgar bo‘ladi.\n\n3.5. Mikrokredit shartnomasini bajarish bo‘yicha Tomonlar o‘rtasida yuzaga kelishi mumkin bo‘lgan barcha nizolar muzokaralar yo‘li bilan hal qilinadi. Tomonlar kelishuvga erisha olmagan taqdirda, ish amaldagi O‘zbekiston qonunchiligiga muvofiq sudda ko‘rib chiqish uchun topshiriladi.\n\n3.6. Shartnomaning amal qilish muddati — Tomonlar o‘z majburiyatlarini to‘liq bajargunga qadar.",
    },
    source: { RU: "Договор микрозайма, п. 3.1–3.3, 3.5–3.6", UZ: "Mikrokredit shartnomasi, 3.1–3.3, 3.5–3.6-bandlar" },
    keywords: "изменение дополнение письменная форма подпись ответственность спор суд срок договора",
  },
  {
    id: "accrual-cap",
    title: { RU: "Ограничение общей суммы начислений", UZ: "Hisoblangan umumiy summaga cheklov" },
    text: {
      RU: "3.4. Общая сумма начисленных процентов, комиссий и неустойки по настоящему договору не должна превышать сумму более половины размера основного долга.",
      UZ: "3.4. Ushbu shartnoma bo‘yicha hisoblangan foizlar, komissiyalar va neustoykaning umumiy summasi asosiy qarz miqdorining yarmidan ortiq bo‘lmasligi kerak.",
    },
    source: { RU: "Договор микрозайма, п. 3.4", UZ: "Mikrokredit shartnomasi, 3.4-band" },
    keywords: "половина основной долг проценты комиссии неустойка ограничение максимум",
  },
  {
    id: "special-terms",
    title: { RU: "Особые условия и дополнительные соглашения", UZ: "Maxsus shartlar va qo‘shimcha kelishuvlar" },
    text: {
      RU: "4.1. По согласованию сторон процент уменьшен до ___%.\n\n4.2. Дополнительное соглашение к договору микрозайма № [НОМЕР] от \"___\" _________ 20__ г.\n4.2.1. По согласованию сторон срок микрозайма продлевается с \"___\" ________20___ г. до \"___\" _________20___ г.\n\n4.3. Дополнительное соглашение к договору микрозайма № [НОМЕР] от \"___\" _________ 20__ г.\n4.3.1. По согласованию сторон срок микрозайма продлевается с \"___\" ________20___ г. до \"___\" _________20___ г.",
      UZ: "4.1. Tomonlarning kelishuviga ko‘ra foiz ___% gacha kamaytirilgan.\n\n4.2. [RAQAM] sonli mikrokredit shartnomasiga qo‘shimcha kelishuv.\n4.2.1. Tomonlarning kelishuviga ko‘ra mikrokredit muddati \"___\" ________20___ yildan \"___\" _________20___ yilgacha uzaytiriladi.\n\n4.3. Mikrokredit shartnomasiga qo‘shimcha kelishuv.\n4.3.1. Tomonlarning kelishuviga ko‘ra mikrokredit muddati \"___\" ________20___ yildan \"___\" _________20___ yilgacha uzaytiriladi.",
    },
    source: { RU: "Договор микрозайма, п. 4.1–4.3.1", UZ: "Mikrokredit shartnomasi, 4.1–4.3.1-bandlar" },
    keywords: "особые условия дополнительное соглашение процент уменьшен продление подпись",
  },
  {
    id: "pledge-ticket",
    title: { RU: "Залоговый билет: срок и пеня", UZ: "Garov bileti: muddat va penya" },
    text: {
      RU: "п. 10. Срок залога 30 дней (может быть продлен 2 раза на срок не более 90 дней при условии своевременной оплаты).\n\nПрочие условия: За каждый просроченный день берётся пеня в размере 0,80 % от общей суммы займа с учётом процентов.\n\nНастоящий залоговый билет составлен в 2-х экземплярах, является неотъемлемой частью Договора о залоге, а также документом строгой отчетности.",
      UZ: "10-band. Garov muddati 30 kun (o‘z vaqtida to‘lov amalga oshirilgan taqdirda 2 marta, umumiy muddati 90 kundan oshmagan holda uzaytirilishi mumkin).\n\nBoshqa shartlar: har bir kechiktirilgan kun uchun foizlarni hisobga olgan holda kreditning umumiy summasining 0,80 foizi miqdorida penya olinadi.\n\nUshbu garov bileti 2 nusxada tuzilgan, garov shartnomasining ajralmas qismi hisoblanadi hamda qat’iy hisobdagi hujjatdir.",
    },
    source: { RU: "Залоговый билет, п. 10 и «Прочие условия»", UZ: "Garov bileti, 10-band va «Boshqa shartlar»" },
    keywords: "залоговый билет 30 дней два раза 90 пеня 0.80 0,80 просрочка",
  },
  {
    id: "pledge-conditions",
    title: { RU: "Залоговый билет: владение и взыскание", UZ: "Garov bileti: egalik va undiruv" },
    text: {
      RU: "Предмет залога передаётся во владение ломбарду. Ломбард не вправе использовать, отчуждать, передавать в аренду или безвозмездное пользование третьим лицам либо иным образом распоряжаться предметом залога. Последующий залог предмета залога запрещается. Предмет залога не является имуществом, необходимым для нормальной жизнеобеспеченности залогодателя и или членов его семьи. В случае непогашения в установленный срок суммы кредита, обеспеченного залогом имущества в ломбарде, ломбард вправе самостоятельно обратить взыскание на это имущество на основании исполнительной надписи нотариуса.",
      UZ: "Garov predmeti Lombard tasarrufiga o‘tadi. Lombard garov predmetidan foydalanishga, uni begonalashtirishga, uchinchi shaxslarga ijaraga yoki bepul foydalanishga berishga yoki boshqa tarzda tasarruf etishga haqli emas. Garov predmetini keyinchalik qayta garovga qo‘yish taqiqlanadi. Garov predmeti garovga qo‘yuvchining va/yoki uning oila a’zolarining normal hayotiy ta’minoti uchun zarur mol-mulk hisoblanmaydi. Agar Lombarddagi garov bilan ta’minlangan kredit belgilangan muddatda qaytarilmasa, Lombard notariusning ijro xati asosida ushbu mol-mulkka mustaqil ravishda undiruv qaratishi mumkin.",
    },
    source: { RU: "Залоговый билет, п. 10 / раздел «Прочие условия»", UZ: "Garov bileti, 10-band / «Boshqa shartlar»" },
    keywords: "владение ломбарду использовать отчуждать аренда последующий залог взыскание нотариус",
  },
];

const originalContractText = `ДОГОВОР МИКРОЗАЙМА № [НОМЕР ДОГОВОРА]
г.Ташкент
[ДАТА]

"HURMA LOMBARD" MAS'ULIYATI CHEKLANGAN JAMIYAT XORIJIY KORXONA именуемый в дальнейшем «ЛОМБАРД», в лице Руководитель филиала [РУКОВОДИТЕЛЬ ФИЛИАЛА], действующего на основании приказа № [НОМЕР ПРИКАЗА] от [ДАТА ПРИКАЗА] года, с одной стороны, и гражданин Республики Узбекистан [Ф.И.О. ЗАЁМЩИКА] паспортные (информация указанная в документе удостоверяющего личность гражданина) данные серия [СЕРИЯ И НОМЕР] выдан [ДАТА ВЫДАЧИ] г. проживающий по адресу [АДРЕС] именуемый в дальнейшем «Заёмщик», с другой стороны, совместно именуемые «Стороны», заключили настоящий Договор о нижеследующем.

1. Предмет Договора

1.1. «Ломбард» предоставляет на условиях настоящего Договора «Заёмщику» сумму микрозайма в размере [СУММА] сум под залог в виде заклада (залог). Сумма микрозайма определена из оценки сторонами предмета залога на момент их принятия в залог.

1.2. «Заёмщик» обязуется возвратить «Ломбарду» сумму кредита, в размере указанном в п.1.1 настоящего договора, а также причитающиеся проценты, размер которых указывается в залоговом билете № [НОМЕР] от [ДАТА].

1.3. Проценты за пользование Микрозаймом начисляются ежедневно со дня фактического предоставления денежных средств Заёмщику включительно до дня возврата основного долга включительно на фактический остаток основного долга.
Размер применяемой процентной ставки определяется исходя из фактического остатка Основного долга в следующем порядке:
· при остатке Основного долга менее 5 000 000 (пяти миллионов) сум — 0,30% за каждый день пользования Микрозаймом, что соответствует 109,50% годовых исходя из 365 календарных дней;
· при остатке Основного долга от 5 000 000 (пяти миллионов) сум включительно, но менее 10 000 000 (десяти миллионов) сум — 0,27% за каждый день пользования Микрозаймом, что соответствует 98,55% годовых исходя из 365 календарных дней;
· при остатке Основного долга от 10 000 000 (десяти миллионов) сум включительно, но менее 20 000 000 (двадцати миллионов) сум — 0,23% за каждый день пользования Микрозаймом, что соответствует 83,95% годовых исходя из 365 календарных дней;
· при остатке Основного долга от 20 000 000 (двадцати миллионов) сум включительно до 100 000 000 (ста миллионов) сум включительно — 0,20% за каждый день пользования Микрозаймом, что соответствует 73,00% годовых исходя из 365 календарных дней.
Годовая процентная ставка рассчитывается как дневная процентная ставка, умноженная на 365 календарных дней, без капитализации процентов.

1.4. Заёмщик вправе полностью или частично досрочно погасить Микрозайм без взимания комиссии, штрафа или иной платы за досрочное погашение.
При частичном досрочном погашении поступивший платёж распределяется в счёт исполнения обязательств Заёмщика в очередности, установленной законодательством Республики Узбекистан.
Если в результате частичного досрочного погашения фактический остаток Основного долга переходит в другой диапазон, установленный пунктом 1.3 настоящего Договора, процентная ставка изменяется автоматически с даты отражения частичного погашения в учёте Ломбарда.
Новая процентная ставка применяется к фактическому остатку Основного долга, образовавшемуся после частичного погашения. Для определения применимого тарифного диапазона учитывается сумма, фактически направленная на погашение Основного долга, а не общая сумма внесённого Заёмщиком платежа.
Изменение процентной ставки в соответствии с настоящим пунктом осуществляется автоматически и не требует заключения дополнительного соглашения к Договору.

1.5. Указанная в п. 1.1. сумма микрозайма предоставляются Заёмщику на срок 30 дней.

1.6. В качестве обеспечения обязательства «Заёмщик» предоставляет в виде Залога принадлежащее ему на праве собственности имущества, (далее - имущество) а именно: [ОПИСАНИЕ ЗАЛОГА].

1.7. В соответствии со ст. 289 Гражданского кодекса РУ, договор о залоге вещей в ломбарде оформляется выдачей «Ломбардом» залогового билета.

2. Права и обязанности Сторон

2.1. «Ломбард» обязуется предоставить указанные в п. 1.1. настоящего Договора денежные средства в течении 1 (одного) дня с момента подписания данного Договора.

2.2. Датой предоставления микрозайма считается дата подписания настоящего Договора микрозайма.

2.3. По истечении срока, установленного п. 1.5, «Заёмщик» обязуется вернуть полученную от «Ломбарда» по настоящему Договору сумму микрозайма в порядке и на условиях, установленных п. 2.4. настоящего Договора, а также уплатить «Ломбарду» причитающиеся ему проценты.

2.4. Возврат полученной суммы микрозайма осуществляется «Заёмщиком» в следующем порядке: не позднее следующего дня после истечения срока микрозайма, указанного в п. 1.5. настоящего Договора, «Заёмщик» должен произвести оплату денежными средствами или посредством банковской карты, «Ломбарду», расположенного по адресу: [АДРЕС ФИЛИАЛА], 100% суммы микрозайма, указанной в п. 1.1. договора. Одновременно с внесением суммы микрозайма, «Заёмщик» должен внести и сумму процентов из расчёта 8,10 % с суммы микрозайма за весь срок использования денежных средств.

2.5. Датой исполнения «Заёмщиком» своего обязательства по возврату суммы кредита «Ломбарда» считается дата поступления наличных денежных средств в кассу или на расчетный счет «Ломбарда».

2.6. По заявлению «Заёмщика» и взаимному согласию сторон срок пользования микрозаймом может быть продлен, при условии своевременной оплаты суммы причитающихся процентов согласно пункту 1.3. настоящего Договора и подписания пунктов 4.2.1. и 4.3.1. настоящего Договора. Общий срок пользования по продленному микрозайму не должен превышать 90 дней.

2.7. Срок пользования микрозаймом может быть продлен без оформления подписи Заемщика, как это предусмотрено п.п. 4.2.1 и 4.3.1 договора, при условии своевременной оплаты «Заёмщиком» в безналичном порядке и (или) третьим лицом причитающихся процентов и (или) штрафов по настоящему договору.

2.8. В случае несвоевременного исполнения «Заёмщиком» или отказа от исполнения обязательств указанных в п. 2.4. настоящего договора, «Ломбард» имеет право на основании исполнительной надписи нотариуса по истечении льготного месячного срока продать имущество, указанного в п.1.6. настоящего договора в порядке, установленном законодательством. При этом «Заёмщик» подписывает акт сверки взаимных расчетов, прилагаемый к настоящему договору, в котором указывается сумма долга по настоящему договору, которая образуется в случае несвоевременного или ненадлежащего исполнения своих обязательств «Заемщиком».

2.9. В течении льготного месяца «Заёмщик» имеет право вернуть имущество из залога только при условии исполнения своих обязательств в следующем порядке:
-возмещение расходов по получению исполнительного документа об обращении взыскания на залог;
-оплата пени (штрафа);
-оплата процентов по микрозайму;
-оплата основного долга.
В противном случае «Ломбард» имеет право продать заложенное имущество на основании исполнительного документа в порядке, указанном в пункте 2.7. настоящего договора.

2.10. В случае своевременного и полного исполнения своих обязательств по погашению микрозайма, а также процентов по нему, «Ломбард» обязуется вернуть заложенное «Заёмщиком» имущество, указанное в п.1.6. настоящего договора.

2.11. «Заёмщик» вправе вернуть «Ломбарду» сумму микрозайма до наступления срока возврата, установленного настоящим Договором. В этом случае «Заёмщик» одновременно с оплатой суммы займа, уплачивает «Ломбарду» проценты за фактически дни пользования микрозаймом, согласно установленным тарифам.

2.12. В случае внесения по требованию «Заёмщика» в залоговый реестр записи о выданном микрозайме (указывается в заявке на микрозайм), «Ломбард» имеет право взыскать с «Заёмщика» стоимость указанной услуги в размере 10 % базовой расчетной величины согласно пункту 5 ПКМ РУ № 155 от 12.06.2014г. за предоставление выписки из залогового реестра в размере 5 % от базовой расчетной величины.

2.13. Ломбард имеет право принимать надлежащие меры (замораживание, приостановление операций и т.д.) для идентификации физического лица в соответствии с Законом Республики Узбекистан "О противодействии легализации доходов, полученных от преступной деятельности, и финансированию терроризма" и других нормативно-правовых актов РУ.

2.14. Ломбард вправе направить уведомления в формате SMS - сообщений.

2.15. Ломбард обязуется обеспечить сохранность имущества на весь срок его нахождения в Ломбарде. При повреждении имущества Ломбард по желанию Заемщика устраняет повреждение за свой счёт, либо выплачивает ему сумму, равную оценке имущества, указанной в залоговом билете. В этом случае, имущество переходит в собственность Ломбарда.

2.16. Ломбард обязуется застраховать имущество в размере оценки за собственный счет на весь срок нахождения в Ломбарде.

2.17. При утрате принятого от Заемщика имущества, Ломбард выплачивает Заемщику сумму, равную оценке, указанной в залоговом билете.

2.18. Все операции (залог, перезалог, выкуп, сдача на хранение) совершаются только с самим Заемщиком и при предъявлении им документа удостоверяющего личность.

2.19. Заемщик дает согласие Ломбарду на обработку своих персональных данных, включая: сбор, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных путем смешанной обработки персональных данных, в целях исполнения обязательство по настоящему договору.

2.20. Ломбард гарантирует Заемщику принятие всех необходимых мер по обеспечению конфиденциальности персональных данных Заемщика в соответствии с требованиями, установленными действующим законодательством Республики Узбекистан о персональных данных.

3. Прочие условия

3.1. Настоящий Договор составлен в трёх экземплярах по одному для каждой Стороны и один экземпляр для нотариальной конторы.

3.2. Договор может быть изменён и дополнен по соглашению Сторон. Все изменения и дополнения к настоящему Договору должны быть составлены в письменной форме и подписаны Сторонами. Несоблюдение письменной формы влечёт недействительность любых изменений и дополнений.

3.3. Ответственность Сторон определяется в соответствии с действующим законодательством Республики Узбекистан, однако «Заёмщик» несёт персональную ответственность за достоверность информации о предмете залога, являющимся обеспечением обязательств по настоящему договору.

3.4. Общая сумма начисленных процентов, комиссий и неустойки по настоящему договору не должна превышать сумму более половины размера основного долга.

3.5. Все споры, которые могут возникнуть между Сторонами по исполнению Договора микрозайма, либо связанные с этими договорами другие вопросы, а также споры, вытекающие из ранее заключенных договоров, решаются путем переговоров. В случае если стороны не достигли компромисса путем переговоров, дело передается в суд для разбирательства согласно действующему законодательству РУ.

3.6. Срок действия договора- до полного исполнения сторонами своих обязательств по договору.

4. Особые условия

4.1. По согласованию сторон процент уменьшен до ___%.

4.2. Дополнительное соглашение к договору микрозайма.
4.2.1. По согласованию сторон срок микрозайма продлевается с "___" ________20___г до "___" _________20___г.
Руководитель: ______________________
(подпись)
Бухгалтер-контроллер: ______________________
(подпись)
Заёмщик: ______________________
(подпись)

4.3. Дополнительное соглашение к договору микрозайма.
4.3.1. По согласованию сторон срок микрозайма продлевается с "___" ________20___г до "___" _________20___г.
Руководитель: ______________________
(подпись)
Бухгалтер-контроллер: ______________________
(подпись)
Заёмщик: ______________________
(подпись)

5. Адреса и реквизиты сторон

ЛОМБАРД
Наименование: "HURMA LOMBARD" MAS'ULIYATI CHEKLANGAN JAMIYAT XORIJIY KORXONA
Адрес: [АДРЕС ЛОМБАРДА]
Реквизиты: [БАНКОВСКИЕ РЕКВИЗИТЫ]
Тел: [ТЕЛЕФОН ЛОМБАРДА]

ЗАЁМЩИК
ФИО: [Ф.И.О. ЗАЁМЩИКА]
Паспортные данные: [ПАСПОРТНЫЕ ДАННЫЕ]
Адрес: [АДРЕС ЗАЁМЩИКА]
ИНН: [ИНН]
Телефон: [ТЕЛЕФОН]
Руководитель: ______________________
(подпись)
Заёмщик: ______________________
(подпись)`;

const originalPledgeTicketText = `ПРИЛОЖЕНИЕ № 1 К ПРАВИЛАМ ОСУЩЕСТВЛЕНИЯ ЛОМБАРДАМИ ДЕЯТЕЛЬНОСТИ И ОПЕРАЦИЙ

Код для онлайн погашения: [КОД]

ООО "HURMA LOMBARD" MCHJ XK
(наименование ломбарда)
[АДРЕС ЛОМБАРДА]
тел.: [ТЕЛЕФОН ЛОМБАРДА]
(местонахождение ломбарда)

ЗАЛОГОВЫЙ БИЛЕТ № [НОМЕР]

1. Ф.И.О. залогодателя [Ф.И.О. ЗАЛОГОДАТЕЛЯ]
2. Данные документа удостоверяющего личность [ПАСПОРТНЫЕ ДАННЫЕ]
3. Место жительства [АДРЕС]
4. Дата выдачи ломбардом кредита [ДАТА]
5. Сумма кредита [СУММА]
6. Дата погашения кредита [ДАТА ПОГАШЕНИЯ]
7. Сумма оценки [СУММА ОЦЕНКИ]
8. Сумма возврата кредита [СУММА ВОЗВРАТА]
% [СУММА ПРОЦЕНТОВ]
9. Наименование залога и его описание: [ОПИСАНИЕ ЗАЛОГА]

10. Срок залога 30 дней
(может быть продлен 2 раза на срок не более 90 дней при условии своевременной оплаты)

Предмет залога передаётся во владение ломбарду. Ломбард не вправе использовать, отчуждать, передавать в аренду или безвозмездное пользование третьим лицам либо иным образом распоряжаться предметом залога. Последующий залог предмета залога запрещается. Предмет залога не является имуществом, необходимым для нормальной жизнеобеспеченности залогодателя и или членов его семьи. В случае непогашения в установленный срок суммы кредита, обеспеченного залогом имущества в ломбарде, ломбард вправе самостоятельно обратить взыскание на это имущество на основании исполнительной надписи нотариуса.

Прочие условия:
За каждый просроченный день берётся пеня в размере 0,80 % от общей суммы займа с учётом процентов

Настоящий залоговый билет составлен в 2-х экземплярах, является неотъемлемой частью Договора о залоге, а также документом строгой отчетности.

С условиями залогового билета ознакомлен. Подтверждаю залог не находиться под арестом и не принадлежит третьим лицам. Один экземпляр получил.

Бухгалтер-контроллер
Залогодатель
(подписи)

Упаковочный талон № [НОМЕР]
Ф.И.О. [Ф.И.О. ЗАЛОГОДАТЕЛЯ]
тел. [ТЕЛЕФОН]
[ОПИСАНИЕ ЗАЛОГА]
Сумма залога больше суммы кредита
Степень обеспеченности: [ПРОЦЕНТ]
Сумма оценки [СУММА ОЦЕНКИ] сум.
Общий вес [ВЕС]
Кол-во залогов [КОЛИЧЕСТВО]
С [ДАТА]
ДО [ДАТА]
Подпись залогодателя
____________
Подпись бухгалтера-контролёра
______________________`;

const complaintClientText: LocalizedText = {
  RU: "Приносим искренние извинения за доставленные неудобства. Ваше обращение зафиксировано и передано в ответственное подразделение для проведения внутренней проверки. Срок рассмотрения обращения — до 3 рабочих дней. По результатам проверки мы обязательно свяжемся с вами и предоставим необходимую информацию. Благодарим вас за обращение и за предоставленную информацию. Желаем вам хорошего дня!",
  UZ: "Yetkazilgan noqulayliklar uchun chin dildan uzr so‘raymiz. Sizning murojaatingiz qayd etildi va ichki tekshiruv o‘tkazish uchun mas’ul bo‘limga yuborildi. Murojaatni ko‘rib chiqish muddati — 3 ish kunigacha. Tekshiruv natijasiga ko‘ra siz bilan albatta bog‘lanamiz va kerakli ma’lumotni taqdim etamiz. Murojaatingiz va taqdim etgan ma’lumotlaringiz uchun rahmat. Sizga yaxshi kun tilaymiz!",
};

const requestClientText: LocalizedText = {
  RU: "Ваше обращение зафиксировано и передано в ответственное подразделение для проведения внутренней проверки. Срок рассмотрения обращения — до 3 рабочих дней. По результатам проверки мы обязательно свяжемся с вами и предоставим необходимую информацию. Благодарим вас за обращение и за предоставленную информацию. Желаем вам хорошего дня!",
  UZ: "Sizning murojaatingiz qayd etildi va ichki tekshiruv o‘tkazish uchun mas’ul bo‘limga yuborildi. Murojaatni ko‘rib chiqish muddati — 3 ish kunigacha. Tekshiruv natijasiga ko‘ra siz bilan albatta bog‘lanamiz va kerakli ma’lumotni taqdim etamiz. Murojaatingiz va taqdim etgan ma’lumotlaringiz uchun rahmat. Sizga yaxshi kun tilaymiz!",
};

const branchComplaintClientText: LocalizedText = {
  RU: "Приносим извинения за произошедшее. Мы проверим информацию и свяжемся с вами.",
  UZ: "Yuz bergan holat uchun uzr so‘raymiz. Ma’lumotni tekshiramiz va Siz bilan bog‘lanamiz.",
};

const navigatorCategories: NavigatorCategory[] = [
  {
    id: "classification",
    icon: "🧩",
    title: { RU: "Консультация, запрос или жалоба", UZ: "Maslahat, so‘rov yoki shikoyat" },
    description: {
      RU: "Сначала определите тип обращения — от этого зависит, нужно ли его регистрировать и какие данные собирать.",
      UZ: "Avval murojaat turini aniqlang — ro‘yxatdan o‘tkazish va qaysi ma’lumotlarni yig‘ish kerakligi shunga bog‘liq."
    },
    flows: ["consultation-request-complaint"],
  },
  {
    id: "situations",
    icon: "⚠️",
    title: { RU: "Нестандартные ситуации", UZ: "Nostandart holatlar" },
    description: {
      RU: "Помощь оператору, когда обычного ответа недостаточно.",
      UZ: "Oddiy javob yetarli bo‘lmagan holatlarda operatorga yordam.",
    },
    flows: [
      "payment-not-reflected",
      "penalty-disagreement",
      "extension-problem",
      "branch-problem",
      "client-another-city",
    ],
  },
  {
    id: "complaints",
    icon: "📢",
    title: { RU: "Жалобы", UZ: "Shikoyatlar" },
    description: {
      RU: "Пошаговое оформление жалоб на сотрудников, обслуживание и работу филиала.",
      UZ: "Xodimlar, xizmat ko‘rsatish va filial faoliyati bo‘yicha shikoyatlarni bosqichma-bosqich rasmiylashtirish.",
    },
    flows: [
      "employee-complaint",
      "service-refusal",
      "branch-work-complaint",
      "branch-tech-complaint",
    ],
  },
  {
    id: "requests",
    icon: "📝",
    title: { RU: "Запросы и проверки", UZ: "So‘rovlar va tekshiruvlar" },
    description: {
      RU: "Оформление обращений по KATM, залогу, оплатам, операциям третьих лиц и другим случаям.",
      UZ: "KATM, garov, to‘lovlar, uchinchi shaxslar operatsiyalari va boshqa holatlar bo‘yicha murojaatlarni rasmiylashtirish.",
    },
    flows: [
      "katm-appeal",
      "collateral-return",
      "suspension-realization",
      "health-return",
      "third-party-operation",
      "fraud-suspicion",
      "online-payment-error",
      "debt-recalculation",
      "loan-procedure-error",
    ],
  },
];

const navigatorFlows: Record<string, NavigatorFlow> = {
  "consultation-request-complaint": {
    id: "consultation-request-complaint", categoryId: "classification", icon: "🧩",
    title: { RU: "Как определить тип обращения", UZ: "Murojaat turini qanday aniqlash kerak" },
    description: {
      RU: "Перед регистрацией определите, клиенту нужна консультация, запрос на проверку/действие или жалоба на проблему и качество обслуживания.",
      UZ: "Ro‘yxatdan o‘tkazishdan oldin mijozga maslahat, tekshiruv/harakat bo‘yicha so‘rov yoki muammo va xizmat sifati bo‘yicha shikoyat kerakligini aniqlang."
    },
    steps: [
      {
        title: { RU: "Консультация", UZ: "Maslahat" },
        text: {
          RU: "Клиент просто хочет получить информацию или разъяснение. Проверка не требуется, ответ можно дать сразу. Примеры: стоимость золота, документы для займа, график работы филиала, как продлить договор, как оплатить, где находится филиал.",
          UZ: "Mijoz faqat ma’lumot yoki tushuntirish olmoqchi. Tekshiruv talab qilinmaydi, javobni darhol berish mumkin. Misollar: oltin narxi, kredit uchun hujjatlar, filial ish vaqti, shartnomani uzaytirish, to‘lov usuli, filial manzili."
        }
      },
      {
        title: { RU: "Запрос", UZ: "So‘rov" },
        text: {
          RU: "Клиент просит проверить информацию, выполнить действие или предоставить сведения, которых нет у оператора. Такой случай регистрируется и передаётся ответственному подразделению. Примеры: проверить поступление платежа, предоставить выписку, пересчитать задолженность, изменить номер телефона, исправить данные, предоставить копию договора.",
          UZ: "Mijoz ma’lumotni tekshirishni, muayyan harakatni bajarishni yoki operatorda mavjud bo‘lmagan ma’lumotni olishni so‘raydi. Bunday holat ro‘yxatdan o‘tkazilib, mas’ul bo‘limga yuboriladi. Misollar: to‘lovni tekshirish, ko‘chirma berish, qarzdorlikni qayta hisoblash, telefon raqamini o‘zgartirish, ma’lumotlarni tuzatish, shartnoma nusxasini berish."
        }
      },
      {
        title: { RU: "Жалоба", UZ: "Shikoyat" },
        text: {
          RU: "Клиент сообщает о проблеме, нарушении, ошибке или неудовлетворительном обслуживании и ожидает рассмотрения ситуации. Жалобу необходимо зарегистрировать, а клиенту — принести извинения и объяснить дальнейший порядок.",
          UZ: "Mijoz muammo, qoidabuzarlik, xato yoki xizmat ko‘rsatishdan noroziligini bildiradi va vaziyat ko‘rib chiqilishini kutadi. Shikoyat ro‘yxatdan o‘tkaziladi, mijozdan uzr so‘raladi va keyingi tartib tushuntiriladi."
        }
      },
      {
        title: { RU: "Три контрольных вопроса", UZ: "Uchta nazorat savoli" },
        text: {
          RU: "1) Клиент только хочет получить информацию? → Консультация. 2) Клиент просит проверить или выполнить действие? → Запрос. 3) Клиент сообщает о проблеме или выражает недовольство? → Жалоба. Если ситуация содержит несколько признаков, ориентируйтесь на суть обращения и ожидаемый результат клиента.",
          UZ: "1) Mijoz faqat ma’lumot olishni xohlayaptimi? → Maslahat. 2) Mijoz tekshirish yoki muayyan harakatni bajarishni so‘rayaptimi? → So‘rov. 3) Mijoz muammo yoki norozilik haqida xabar beryaptimi? → Shikoyat. Bir nechta belgi mavjud bo‘lsa, murojaatning mazmuni va mijoz kutayotgan natijaga e’tibor bering."
        }
      },
    ],
  },

  "payment-not-reflected": {
    id: "payment-not-reflected", categoryId: "situations", icon: "💳",
    title: { RU: "Платёж не отразился", UZ: "To‘lov aks etmadi" },
    description: { RU: "Клиент сообщает, что оплатил, но информация о платеже ещё не изменилась.", UZ: "Mijoz to‘lov qilganini, lekin to‘lov haqidagi ma’lumot hali o‘zgarmaganini aytadi." },
    steps: [
      { title: { RU: "Уточните способ оплаты", UZ: "To‘lov usulini aniqlang" }, text: { RU: "Уточните, где клиент проводил оплату: в филиале, через Click, Payme или другим доступным способом.", UZ: "Mijoz to‘lovni qayerda amalga oshirganini aniqlang: filialda, Click, Payme yoki boshqa mavjud usul orqali." } },
      { title: { RU: "Запросите подтверждение", UZ: "Tasdiqni so‘rang" }, text: { RU: "Попросите клиента предоставить чек или иное подтверждение операции, если оно у него есть.", UZ: "Mijozdan, agar mavjud bo‘lsa, chek yoki operatsiyani tasdiqlovchi boshqa ma’lumotni yuborishini so‘rang." } },
      { title: { RU: "Проверку выполняйте вне Базы знаний", UZ: "Tekshiruvni Bilimlar bazasidan tashqarida bajaring" }, text: { RU: "База знаний не содержит сведения о конкретных платежах клиентов. Для проверки конкретной оплаты используйте доступный рабочий инструмент согласно внутреннему порядку.", UZ: "Bilimlar bazasida aniq mijozlarning to‘lovlari haqidagi ma’lumot mavjud emas. Aniq to‘lovni tekshirish uchun ichki tartibga muvofiq mavjud ishchi vositadan foydalaning." }, important: { RU: "Не подтверждайте факт оплаты без проверки в предусмотренном рабочем инструменте.", UZ: "Tegishli ishchi vositada tekshirmasdan to‘lov amalga oshirilganini tasdiqlamang." } },
      { title: { RU: "Если нужна проверка или обращение", UZ: "Tekshiruv yoki murojaat kerak bo‘lsa" }, text: { RU: "Зафиксируйте обращение и передайте его по внутреннему порядку. Приложите чек или подтверждение, если оно есть.", UZ: "Murojaatni qayd eting va ichki tartib bo‘yicha yuboring. Agar mavjud bo‘lsa, chek yoki tasdiqni ilova qiling." } },
    ],
  },

  "penalty-disagreement": {
    id: "penalty-disagreement", categoryId: "situations", icon: "⚠️",
    title: { RU: "Клиент не согласен с пеней", UZ: "Mijoz penyaga rozi emas" },
    description: { RU: "Клиент считает начисленную пеню неправильной или просит её пересчитать/списать.", UZ: "Mijoz hisoblangan penyani noto‘g‘ri deb hisoblaydi yoki uni qayta hisoblash/bekor qilishni so‘raydi." },
    steps: [
      { title: { RU: "Уточните причину обращения", UZ: "Murojaat sababini aniqlang" }, text: { RU: "Уточните, что именно оспаривает клиент: сумму пени, период начисления или отсутствие дополнительного уведомления.", UZ: "Mijoz aynan nimani bahslashayotganini aniqlang: penya summasi, hisoblangan davr yoki qo‘shimcha xabarnoma kelmaganligi." } },
      { title: { RU: "Сверьте факты", UZ: "Faktlarni solishtiring" }, text: { RU: "Сверьте дату окончания основного срока, период просрочки и сумму начисления с доступной информацией по обращению.", UZ: "Asosiy muddat tugagan sana, kechikish davri va hisoblangan summani murojaatdagi mavjud ma’lumotlar bilan solishtiring." } },
      { title: { RU: "Объясните общее правило", UZ: "Umumiy qoidani tushuntiring" }, text: { RU: "Для правила о сроке и пене используйте материал Базы знаний и условия договора.", UZ: "Muddat va penya qoidalari uchun Bilimlar bazasidagi material va shartnoma shartlaridan foydalaning." } },
      { title: { RU: "Если клиент требует отдельную проверку", UZ: "Agar mijoz alohida tekshiruvni talab qilsa" }, text: { RU: "Зафиксируйте суть требования и оформите обращение на проверку. Не обещайте заранее результат.", UZ: "Talab mazmunini qayd eting va tekshiruv uchun murojaatni rasmiylashtiring. Natijani oldindan va’da qilmang." } },
    ],
    knowledgeArticle: "loan-term",
    scriptIndex: 10,
    scriptLabel: { RU: "Скрипт: телефонное уведомление и пеня", UZ: "Skript: telefon xabarnomasi va penya" },
  },

  "extension-problem": {
    id: "extension-problem", categoryId: "situations", icon: "🔄",
    title: { RU: "Проблема с продлением или переоформлением", UZ: "Muddatni uzaytirish yoki qayta rasmiylashtirish muammosi" },
    description: { RU: "Клиент хочет продлить или переоформить займ, но не понимает порядок или сталкивается с ограничением.", UZ: "Mijoz kreditni uzaytirish yoki qayta rasmiylashtirishni xohlaydi, lekin tartibni tushunmaydi yoki cheklovga duch keladi." },
    steps: [
      { title: { RU: "Определите операцию", UZ: "Operatsiyani aniqlang" }, text: { RU: "Уточните, нужна клиенту обычная пролонгация или уже требуется переоформление.", UZ: "Mijozga oddiy uzaytirish kerakmi yoki qayta rasmiylashtirish zarurmi — aniqlang." } },
      { title: { RU: "Проверьте срок и условия", UZ: "Muddat va shartlarni tekshiring" }, text: { RU: "Сверьте фактический срок пользования и действующие ограничения. Одна операция продления — не более 30 дней, общий срок фактического пользования — не более 90 дней.", UZ: "Amaldagi foydalanish muddati va cheklovlarni solishtiring. Bitta uzaytirish operatsiyasi — 30 kundan oshmasligi, umumiy amaldagi foydalanish muddati esa 90 kundan oshmasligi kerak." } },
      { title: { RU: "Проверьте способ операции", UZ: "Operatsiya usulini tekshiring" }, text: { RU: "Уточните, доступно ли продление онлайн либо требуется обращение в филиал, где оформлен займ.", UZ: "Kreditni onlayn uzaytirish mumkinmi yoki kredit rasmiylashtirilgan filialga murojaat qilish kerakmi — aniqlang." } },
      { title: { RU: "Если операция недоступна", UZ: "Agar operatsiya mavjud bo‘lmasa" }, text: { RU: "Объясните причину по доступной информации и при необходимости оформите обращение на проверку.", UZ: "Mavjud ma’lumot asosida sababni tushuntiring va zarur bo‘lsa tekshiruv uchun murojaatni rasmiylashtiring." } },
    ],
    knowledgeArticle: "loan-extension",
  },

  "branch-problem": {
    id: "branch-problem", categoryId: "situations", icon: "🏢",
    title: { RU: "Проблема в филиале", UZ: "Filialdagi muammo" },
    description: { RU: "Филиал закрыт, сотрудник отсутствует или клиент сообщает об отказе в обслуживании.", UZ: "Filial yopiq, xodim yo‘q yoki mijoz xizmat ko‘rsatish rad etilganini bildiradi." },
    steps: [
      { title: { RU: "Уточните, что произошло", UZ: "Nima bo‘lganini aniqlang" }, text: { RU: "Определите, что именно произошло: закрытый филиал, отсутствие сотрудника, отказ в обслуживании или другая ситуация.", UZ: "Nima sodir bo‘lganini aniqlang: filial yopiq, xodim yo‘q, xizmat ko‘rsatish rad etilgan yoki boshqa holat." } },
      { title: { RU: "Соберите факты", UZ: "Faktlarni yig‘ing" }, text: { RU: "Зафиксируйте филиал, дату, время и описание ситуации со слов клиента.", UZ: "Mijoz so‘zlariga ko‘ra filial, sana, vaqt va vaziyat tavsifini qayd eting." } },
      { title: { RU: "Определите дальнейший путь", UZ: "Keyingi yo‘nalishni aniqlang" }, text: { RU: "Для справочного вопроса дайте информацию. Если клиент сообщает о нарушении или конфликте — используйте соответствующий сценарий оформления жалобы.", UZ: "Ma’lumot so‘ralgan bo‘lsa, ma’lumot bering. Agar mijoz qoidabuzarlik yoki nizoni bildirsa — shikoyatni rasmiylashtirish uchun tegishli ssenariydan foydalaning." } },
    ],
    clientText: branchComplaintClientText,
  },

  "client-another-city": {
    id: "client-another-city", categoryId: "situations", icon: "📍",
    title: { RU: "Клиент находится в другом городе", UZ: "Mijoz boshqa shaharda" },
    description: { RU: "Клиент не может лично обратиться в филиал, где оформлен займ.", UZ: "Mijoz kredit rasmiylashtirilgan filialga shaxsan bora olmaydi." },
    steps: [
      { title: { RU: "Уточните операцию", UZ: "Operatsiyani aniqlang" }, text: { RU: "Уточните: погашение, продление, переоформление, получение залога или другая операция.", UZ: "Qaysi operatsiya kerakligini aniqlang: so‘ndirish, uzaytirish, qayta rasmiylashtirish, garovni olish yoki boshqa operatsiya." } },
      { title: { RU: "Проверьте возможность представителя", UZ: "Vakil orqali amalga oshirish imkoniyatini tekshiring" }, text: { RU: "Если операция допускает представителя, уточните требования к нотариально оформленной доверенности.", UZ: "Agar operatsiya vakil orqali bajarilishi mumkin bo‘lsa, notarial tasdiqlangan ishonchnomaga qo‘yiladigan talablarni aniqlang." } },
      { title: { RU: "Не обещайте операцию без проверки правила", UZ: "Qoidani tekshirmasdan operatsiyani va’da qilmang" }, text: { RU: "Сверьте соответствующую тему Базы знаний и действующие правила конкретной операции.", UZ: "Bilimlar bazasidagi tegishli mavzu va aniq operatsiyaning amaldagi qoidalarini solishtiring." } },
    ],
    knowledgeArticle: "loan-reissue",
  },

  "employee-complaint": {
    id: "employee-complaint", categoryId: "complaints", icon: "👤",
    title: { RU: "Жалоба на сотрудника", UZ: "Xodim ustidan shikoyat" },
    description: { RU: "Включает грубое обращение, некорректное поведение, повышенный тон, игнорирование, неуважительное отношение и конфликтную ситуацию.", UZ: "Qo‘pol muomala, noto‘g‘ri xatti-harakat, baland ovozda gapirish, mijozni e’tiborsiz qoldirish, hurmatsiz munosabat va nizoli holatlarni qamrab oladi." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Выслушайте клиента спокойно и не спорьте с ним.", UZ: "Mijozni xotirjam tinglang va u bilan bahslashmang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; контактный телефон; адрес филиала; дата и время посещения; описание ситуации; ФИО сотрудника, если известно.", UZ: "Mijozning F.I.O.; aloqa telefoni; filial manzili; tashrif sana va vaqti; vaziyat tavsifi; agar ma’lum bo‘lsa, xodimning F.I.O." } },
      { title: { RU: "Зарегистрируйте обращение", UZ: "Murojaatni qayd eting" }, text: { RU: "В течение 10 минут создайте задачу в Битрикс и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "10 daqiqa ichida Bitrixda vazifa yarating va amaldagi marshrutga muvofiq mas’ul bo‘limga yuboring." } },
    ],
    clientText: complaintClientText,
  },

  "service-refusal": {
    id: "service-refusal", categoryId: "complaints", icon: "⛔",
    title: { RU: "Отказ в обслуживании", UZ: "Xizmat ko‘rsatishni rad etish" },
    description: { RU: "Отказ в приёме платежа, выдаче залога, оформлении или продлении займа, возврате имущества или обслуживании без объяснения причины.", UZ: "To‘lovni qabul qilish, garovni berish, kredit rasmiylashtirish yoki uzaytirish, garovni qaytarish yoki sababsiz xizmat ko‘rsatishni rad etish holatlari." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Выслушайте ситуацию и уточните, в какой операции клиенту отказали.", UZ: "Vaziyatni tinglang va mijozga qaysi operatsiyada rad javobi berilganini aniqlang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; контактный телефон; адрес филиала; дата и время обращения; описание ситуации; дата и сумма оплаты при наличии; подтверждение оплаты при наличии.", UZ: "Mijozning F.I.O.; aloqa telefoni; filial manzili; murojaat sana va vaqti; vaziyat tavsifi; mavjud bo‘lsa to‘lov sanasi va summasi; mavjud bo‘lsa to‘lov tasdig‘i." } },
      { title: { RU: "Зарегистрируйте обращение", UZ: "Murojaatni qayd eting" }, text: { RU: "В течение 10 минут создайте задачу в Битрикс и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "10 daqiqa ichida Bitrixda vazifa yarating va amaldagi marshrutga muvofiq mas’ul bo‘limga yuboring." } },
    ],
    clientText: complaintClientText,
  },

  "branch-work-complaint": {
    id: "branch-work-complaint", categoryId: "complaints", icon: "🏢",
    title: { RU: "Работа филиала", UZ: "Filial faoliyati" },
    description: { RU: "Жалоба на закрытый филиал в рабочее время, позднее или раннее открытие, либо отсутствие сотрудника.", UZ: "Ish vaqtida filialning yopiq bo‘lishi, kech ochilishi, erta yopilishi yoki xodim yo‘qligi bo‘yicha shikoyatlar." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Уточните, какая ситуация произошла при посещении филиала.", UZ: "Filialga tashrif vaqtida qanday holat yuz berganini aniqlang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; контактный телефон; адрес или номер филиала; дата и точное время посещения; причина обращения в филиал; описание ситуации.", UZ: "Mijozning F.I.O.; aloqa telefoni; filial manzili yoki raqami; tashrif sana va aniq vaqti; filialga murojaat qilish sababi; vaziyat tavsifi." } },
      { title: { RU: "Зарегистрируйте обращение", UZ: "Murojaatni qayd eting" }, text: { RU: "В течение 10 минут создайте задачу в Битрикс и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "10 daqiqa ichida Bitrixda vazifa yarating va amaldagi marshrutga muvofiq mas’ul bo‘limga yuboring." } },
    ],
    clientText: branchComplaintClientText,
  },

  "branch-tech-complaint": {
    id: "branch-tech-complaint", categoryId: "complaints", icon: "🛠️",
    title: { RU: "Технический сбой оборудования филиала", UZ: "Filial uskunalaridagi texnik nosozlik" },
    description: { RU: "Неработающий терминал, компьютер, программа, интернет, принтер, сканер, кассовое оборудование и другие неисправности.", UZ: "Ishlamaydigan to‘lov terminali, kompyuter, dastur, internet, printer, skaner, kassa uskunasi va boshqa texnik nosozliklar." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Уточните, какое оборудование или сервис не работает и как это повлияло на клиента.", UZ: "Qaysi uskuna yoki xizmat ishlamayotganini va bu mijozga qanday ta’sir qilganini aniqlang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; номер договора при необходимости; контактный телефон; адрес филиала; дата и время обращения; описание неисправности; дата и время возникновения; вид оборудования; чек или подтверждение оплаты, если проблема связана с оплатой.", UZ: "Mijozning F.I.O.; zarur bo‘lsa shartnoma raqami; aloqa telefoni; filial manzili; murojaat sana va vaqti; nosozlik tavsifi; muammo boshlangan sana va vaqti; uskuna turi; agar muammo to‘lov bilan bog‘liq bo‘lsa, chek yoki to‘lov tasdig‘i." } },
      { title: { RU: "Зарегистрируйте обращение", UZ: "Murojaatni qayd eting" }, text: { RU: "В течение 10 минут создайте задачу в Битрикс и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "10 daqiqa ichida Bitrixda vazifa yarating va amaldagi marshrutga muvofiq mas’ul bo‘limga yuboring." } },
    ],
    clientText: complaintClientText,
  },

  "katm-appeal": {
    id: "katm-appeal", categoryId: "requests", icon: "📊",
    title: { RU: "Обращение по KATM", UZ: "KATM bo‘yicha murojaat" },
    description: { RU: "Задолженность в KATM или отображение просрочки после закрытия договора.", UZ: "KATMda qarzdorlik yoki shartnoma yopilgandan keyin kechikish aks etishi." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Уточните, что именно отображается в KATM и с чем клиент не согласен.", UZ: "KATMda aynan nima aks etayotganini va mijoz nimaga rozi emasligini aniqlang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; номер договора при наличии; ПИНФЛ; контактный телефон; адрес филиала, если клиент обращался; дата и время обращения; описание проблемы; скриншот KATM при наличии; подтверждение оплаты при наличии.", UZ: "Mijozning F.I.O.; mavjud bo‘lsa shartnoma raqami; JSHSHIR; aloqa telefoni; agar filialga murojaat qilgan bo‘lsa filial manzili; murojaat sana va vaqti; muammo tavsifi; mavjud bo‘lsa KATM skrinshoti; mavjud bo‘lsa to‘lov tasdig‘i." } },
      { title: { RU: "Прикрепите файлы и передайте обращение", UZ: "Fayllarni biriktiring va murojaatni yuboring" }, text: { RU: "Прикрепите подтверждающие файлы, создайте задачу в Битрикс в течение 10 минут и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "Tasdiqlovchi fayllarni biriktiring, 10 daqiqa ichida Bitrixda vazifa yarating va ОСga (amaldagi marshrutga muvofiq mas’ul bo‘lim) yuboring." } },
    ],
    clientText: requestClientText,
    scriptIndex: 9,
    scriptLabel: { RU: "Скрипт: не регистрировать обращение по неактивной задолженности в KATM", UZ: "Skript: KATMdagi faol bo‘lmagan qarzdorlik bo‘yicha murojaat qayd etilmaydi" },
  },

  "collateral-return": {
    id: "collateral-return", categoryId: "requests", icon: "💎",
    title: { RU: "Возврат залогового имущества", UZ: "Garovdagi mol-mulkni qaytarish" },
    description: { RU: "Просьба приостановить реализацию или обращение по реализации имущества из-за ошибки при оформлении или обработке договора.", UZ: "Realizatsiyani to‘xtatish yoki shartnomani rasmiylashtirish/ko‘rib chiqishdagi xato sababli mol-mulkni qaytarish bo‘yicha murojaat." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Уточните обстоятельства и предмет просьбы клиента.", UZ: "Vaziyatni va mijozning asosiy talabini aniqlang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; номер договора; ПИНФЛ; контактный телефон; адрес филиала; дата и время последнего посещения; описание ситуации; дата предполагаемой реализации при наличии; подтверждающие документы при наличии.", UZ: "Mijozning F.I.O.; shartnoma raqami; JSHSHIR; aloqa telefoni; filial manzili; oxirgi tashrif sana va vaqti; vaziyat tavsifi; mavjud bo‘lsa taxminiy realizatsiya sanasi; mavjud bo‘lsa tasdiqlovchi hujjatlar." } },
      { title: { RU: "Прикрепите документы и передайте обращение", UZ: "Hujjatlarni biriktiring va murojaatni yuboring" }, text: { RU: "Прикрепите документы, создайте задачу в Битрикс в течение 10 минут и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "Hujjatlarni biriktiring, 10 daqiqa ichida Bitrixda vazifa yarating va ОСga (amaldagi marshrutga muvofiq mas’ul bo‘lim) yuboring." } },
    ],
    clientText: requestClientText,
  },

  "suspension-realization": {
    id: "suspension-realization", categoryId: "requests", icon: "⏸️",
    title: { RU: "Приостановление реализации", UZ: "Realizatsiyani to‘xtatish" },
    description: {
      RU: "Просьба о приостановлении реализации залогового имущества.",
      UZ: "Garovdagi mol-mulk realizatsiyasini to‘xtatish bo‘yicha murojaat."
    },
    steps: [
      { title: { RU: "Уточните обращение", UZ: "Murojaatni aniqlang" }, text: { RU: "Зафиксируйте просьбу клиента о приостановлении реализации и обстоятельства обращения.", UZ: "Mijozning realizatsiyani to‘xtatish haqidagi iltimosini va murojaat holatlarini qayd eting." } },
      { title: { RU: "Соберите данные по чек-листу", UZ: "Chek-list bo‘yicha ma’lumotlarni yig‘ing" }, text: { RU: "Используйте обязательные данные из блока ниже.", UZ: "Quyidagi blokdagi majburiy ma’lumotlardan foydalaning." } },
      { title: { RU: "Зарегистрируйте обращение", UZ: "Murojaatni qayd eting" }, text: { RU: "Создайте задачу в Битрикс в течение 10 минут и передайте ответственному подразделению согласно действующему маршруту.", UZ: "10 daqiqa ichida Bitrixda vazifa yarating va amaldagi marshrutga muvofiq mas’ul bo‘limga yuboring." } },
    ],
    clientText: requestClientText,
  },

  "health-return": {
    id: "health-return", categoryId: "requests", icon: "❤️",
    title: { RU: "Возврат изделия по состоянию здоровья", UZ: "Sog‘liq holati sababli buyumni qaytarish" },
    description: { RU: "Невозможность своевременно оплатить займ по состоянию здоровья.", UZ: "Sog‘liq holati sababli kreditni o‘z vaqtida to‘lay olmaslik." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Спокойно уточните причину обращения и обстоятельства, связанные со здоровьем.", UZ: "Murojaat sababini va sog‘liq holati bilan bog‘liq vaziyatni xotirjam aniqlang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; номер договора; ПИНФЛ; контактный телефон; адрес филиала; дата последнего посещения; причина обращения; медицинские документы при наличии; иные подтверждающие документы при наличии.", UZ: "Mijozning F.I.O.; shartnoma raqami; JSHSHIR; aloqa telefoni; filial manzili; oxirgi tashrif sanasi; murojaat sababi; mavjud bo‘lsa tibbiy hujjatlar; mavjud bo‘lsa boshqa tasdiqlovchi hujjatlar." } },
      { title: { RU: "Прикрепите документы и передайте обращение", UZ: "Hujjatlarni biriktiring va murojaatni yuboring" }, text: { RU: "Прикрепите документы, создайте задачу в Битрикс в течение 10 минут и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "Hujjatlarni biriktiring, 10 daqiqa ichida Bitrixda vazifa yarating va ОСga (amaldagi marshrutga muvofiq mas’ul bo‘lim) yuboring." } },
    ],
    clientText: requestClientText,
  },

  "third-party-operation": {
    id: "third-party-operation", categoryId: "requests", icon: "👥",
    title: { RU: "Операции третьих лиц", UZ: "Uchinchi shaxslar operatsiyalari" },
    description: { RU: "Любые операции, которые совершает третье лицо, а также жалобы на разглашение персональных данных клиента.", UZ: "Uchinchi shaxs tomonidan amalga oshiriladigan operatsiyalar, shuningdek mijozning shaxsiy ma’lumotlarini uchinchi shaxslarga oshkor qilish bo‘yicha murojaatlar." },
    steps: [
      { title: { RU: "Уточните операцию", UZ: "Operatsiyani aniqlang" }, text: { RU: "Определите, какую операцию совершает третье лицо и на каком основании.", UZ: "Uchinchi shaxs qaysi operatsiyani va qanday asosda amalga oshirayotganini aniqlang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО заявителя; ФИО заёмщика; номер договора; ПИНФЛ заёмщика; контактный телефон; адрес филиала; дата и время обращения; вид операции; нотариальная доверенность при наличии; паспорт представителя.", UZ: "Arizachining F.I.O.; qarz oluvchining F.I.O.; shartnoma raqami; qarz oluvchining JSHSHIRi; aloqa telefoni; filial manzili; murojaat sana va vaqti; operatsiya turi; mavjud bo‘lsa notarial ishonchnoma; vakilning pasporti." } },
      { title: { RU: "Прикрепите документы и передайте обращение", UZ: "Hujjatlarni biriktiring va murojaatni yuboring" }, text: { RU: "Прикрепите документы, создайте задачу в Битрикс в течение 10 минут и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "Hujjatlarni biriktiring, 10 daqiqa ichida Bitrixda vazifa yarating va ОСga (amaldagi marshrutga muvofiq mas’ul bo‘lim) yuboring." } },
    ],
    clientText: complaintClientText,
  },

  "fraud-suspicion": {
    id: "fraud-suspicion", categoryId: "requests", icon: "🔐",
    title: { RU: "Подозрение на мошенничество", UZ: "Firibgarlikdan shubhalanish" },
    description: { RU: "Оформление займа без участия владельца, по чужим или поддельным документам.", UZ: "Mulk egasining ishtirokisiz, boshqa shaxs hujjatlari yoki qalbaki hujjatlar bilan kredit rasmiylashtirilishi." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Не делайте собственных выводов о факте мошенничества. Зафиксируйте обстоятельства со слов клиента.", UZ: "Firibgarlik fakti bo‘yicha o‘z xulosangizni qilmang. Mijoz so‘zlariga ko‘ra holatni qayd eting." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО заявителя; номер договора при необходимости; ПИНФЛ при необходимости; контактный телефон; адрес филиала; дата и время оформления займа; описание обстоятельств.", UZ: "Arizachining F.I.O.; zarur bo‘lsa shartnoma raqami; zarur bo‘lsa JSHSHIR; aloqa telefoni; filial manzili; kredit rasmiylashtirilgan sana va vaqt; holat tavsifi." } },
      { title: { RU: "Передайте на внутреннюю проверку", UZ: "Ichki tekshiruvga yuboring" }, text: { RU: "В течение 10 минут создайте задачу в Битрикс и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "10 daqiqa ichida Bitrixda vazifa yarating va amaldagi marshrutga muvofiq mas’ul bo‘limga yuboring." } },
    ],
    clientText: complaintClientText,
  },

  "online-payment-error": {
    id: "online-payment-error", categoryId: "requests", icon: "💳",
    title: { RU: "Ошибка при онлайн-оплате", UZ: "Onlayn to‘lovdagi xato" },
    description: { RU: "Payme/Click не отразили оплату, деньги списались, платёж долго в обработке или произошло двойное списание.", UZ: "Payme/Click orqali to‘lov aks etmadi, pul yechildi, to‘lov uzoq vaqt qayta ishlanmoqda yoki ikki marta yechildi." },
    steps: [
      { title: { RU: "Выслушайте клиента", UZ: "Mijozni tinglang" }, text: { RU: "Уточните, что именно произошло с онлайн-платежом.", UZ: "Onlayn to‘lov bilan aynan nima sodir bo‘lganini aniqlang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; номер договора; ПИНФЛ; контактный телефон; дата и время оплаты; сумма платежа; способ оплаты Payme/Click; номер чека (ID платежа); скриншот или чек при наличии; адрес филиала, если клиент предварительно обращался туда.", UZ: "Mijozning F.I.O.; shartnoma raqami; JSHSHIR; aloqa telefoni; to‘lov sana va vaqti; to‘lov summasi; Payme/Click to‘lov usuli; chek raqami (to‘lov IDsi); mavjud bo‘lsa skrinshot yoki chek; mijoz avval filialga murojaat qilgan bo‘lsa filial manzili." } },
      { title: { RU: "Прикрепите чек и передайте обращение", UZ: "Chekni biriktiring va murojaatni yuboring" }, text: { RU: "Прикрепите чек, создайте задачу в Битрикс в течение 10 минут и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "Chekni biriktiring, 10 daqiqa ichida Bitrixda vazifa yarating va ОСga (amaldagi marshrutga muvofiq mas’ul bo‘lim) yuboring." } },
    ],
    clientText: complaintClientText,
  },

  "debt-recalculation": {
    id: "debt-recalculation", categoryId: "requests", icon: "🧮",
    title: { RU: "Перерасчёт задолженности", UZ: "Qarzdorlikni qayta hisoblash" },
    description: { RU: "Некорректное начисление процентов или пени.", UZ: "Foizlar yoki penyani noto‘g‘ri hisoblash bo‘yicha murojaat." },
    steps: [
      { title: { RU: "Уточните предмет обращения", UZ: "Murojaat mazmunini aniqlang" }, text: { RU: "Уточните, что именно клиент считает рассчитанным неправильно: проценты, пеню или сумму задолженности.", UZ: "Mijoz aynan nimani noto‘g‘ri hisoblangan deb hisoblashini aniqlang: foizlar, penya yoki qarzdorlik summasi." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; номер договора; ПИНФЛ; контактный телефон; адрес филиала; дата и время обращения; описание ситуации; дата и сумма оплаты при наличии; подтверждение оплаты при наличии.", UZ: "Mijozning F.I.O.; shartnoma raqami; JSHSHIR; aloqa telefoni; filial manzili; murojaat sana va vaqti; vaziyat tavsifi; mavjud bo‘lsa to‘lov sanasi va summasi; mavjud bo‘lsa to‘lov tasdig‘i." } },
      { title: { RU: "Прикрепите чеки и передайте обращение", UZ: "Cheklarni biriktiring va murojaatni yuboring" }, text: { RU: "Прикрепите подтверждающие чеки, создайте задачу в Битрикс в течение 10 минут и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "Tasdiqlovchi cheklarni biriktiring, 10 daqiqa ichida Bitrixda vazifa yarating va ОСga (amaldagi marshrutga muvofiq mas’ul bo‘lim) yuboring." } },
    ],
    clientText: requestClientText,
    scriptIndex: 8,
    scriptLabel: { RU: "Скрипт: «Перерасчёта не будет»", UZ: "Skript: «Qayta hisob-kitob bo‘lmaydi»" },
  },

  "loan-procedure-error": {
    id: "loan-procedure-error", categoryId: "requests", icon: "📄",
    title: { RU: "Нарушение процедуры оформления займа", UZ: "Kreditni rasmiylashtirish tartibining buzilishi" },
    description: { RU: "Ошибки в договоре, непроверка документов, пропуск обязательных этапов или неправильное внесение данных.", UZ: "Shartnomadagi xatolar, hujjatlarni tekshirmaslik, majburiy bosqichlarni bajarmaslik yoki ma’lumotlarni noto‘g‘ri kiritish." },
    steps: [
      { title: { RU: "Уточните, что произошло", UZ: "Nima bo‘lganini aniqlang" }, text: { RU: "Зафиксируйте суть возможного нарушения со слов клиента, не делая собственных выводов о виновности сотрудника.", UZ: "Mijoz so‘zlariga ko‘ra ehtimoliy qoidabuzarlik mazmunini qayd eting va xodimning aybi bo‘yicha o‘z xulosangizni qilmang." } },
      { title: { RU: "Соберите данные", UZ: "Ma’lumotlarni yig‘ing" }, text: { RU: "ФИО клиента; номер договора при необходимости; ПИНФЛ при необходимости; контактный телефон; адрес филиала; дата и время оформления займа; описание нарушения; подтверждающие документы при наличии.", UZ: "Mijozning F.I.O.; zarur bo‘lsa shartnoma raqami; zarur bo‘lsa JSHSHIR; aloqa telefoni; filial manzili; kredit rasmiylashtirilgan sana va vaqti; qoidabuzarlik tavsifi; mavjud bo‘lsa tasdiqlovchi hujjatlar." } },
      { title: { RU: "Зарегистрируйте и передайте", UZ: "Qayd eting va yuboring" }, text: { RU: "В течение 10 минут создайте задачу в Битрикс и передайте в ответственное подразделение согласно действующему маршруту.", UZ: "10 daqiqa ichida Bitrixda vazifa yarating va amaldagi marshrutga muvofiq mas’ul bo‘limga yuboring." } },
    ],
    clientText: complaintClientText,
  },
};

const navigatorRequestGuides: Record<string, NavigatorRequestGuide> = {  "payment-not-reflected": {
    "required": [
      {
        "RU": "ФИО клиента.",
        "UZ": "Mijozning F.I.O."
      },
      {
        "RU": "Дата и примерное время оплаты.",
        "UZ": "To‘lov sanasi va taxminiy vaqti."
      },
      {
        "RU": "Способ оплаты (например, Click или Payme).",
        "UZ": "To‘lov usuli (masalan, Click yoki Payme)."
      }
    ],
    "optional": [
      {
        "RU": "Номер договора — если нужен для идентификации обращения.",
        "UZ": "Shartnoma raqami — murojaatni aniqlash uchun kerak bo‘lsa."
      },
      {
        "RU": "Сумма и другие сведения о платеже — если нужны для проверки.",
        "UZ": "To‘lov summasi va boshqa ma’lumotlar — tekshiruv uchun kerak bo‘lsa."
      }
    ],
    "documents": [
      {
        "RU": "Чек, скриншот или другое подтверждение платежа — при наличии.",
        "UZ": "Chek, skrinshot yoki boshqa to‘lov tasdig‘i — mavjud bo‘lsa."
      }
    ],
    "doNotAsk": [
      {
        "RU": "Не запрашивайте документы и сведения, не связанные с конкретным платежом.",
        "UZ": "Aniq to‘lovga aloqasi bo‘lmagan hujjat va ma’lumotlarni so‘ramang."
      }
    ]
  },
  "penalty-disagreement": {
    "required": [
      {
        "RU": "ФИО клиента.",
        "UZ": "Mijozning F.I.O."
      },
      {
        "RU": "Номер договора.",
        "UZ": "Shartnoma raqami."
      },
      {
        "RU": "Что именно оспаривает клиент: пеню, период начисления или сумму.",
        "UZ": "Mijoz aynan nimani bahslashayotganini aniqlang: penya, hisoblash davri yoki summa."
      }
    ],
    "optional": [
      {
        "RU": "Дата оплаты и сумма оплаты — если спор связан с платежом.",
        "UZ": "To‘lov sanasi va summasi — agar nizo to‘lov bilan bog‘liq bo‘lsa."
      },
      {
        "RU": "Контактный номер для обратной связи — если он нужен для обращения.",
        "UZ": "Qayta aloqa uchun telefon raqami — murojaat uchun kerak bo‘lsa."
      }
    ],
    "documents": [
      {
        "RU": "Чек или подтверждение оплаты — при наличии.",
        "UZ": "Chek yoki to‘lov tasdig‘i — mavjud bo‘lsa."
      }
    ],
    "doNotAsk": [
      {
        "RU": "Не запрашивайте подтверждения и документы, которые не относятся к спорному начислению.",
        "UZ": "Bahs qilinayotgan hisob-kitobga aloqasi bo‘lmagan tasdiq va hujjatlarni so‘ramang."
      }
    ]
  },
  "extension-problem": {
    "required": [
      {
        "RU": "ФИО клиента.",
        "UZ": "Mijozning F.I.O."
      },
      {
        "RU": "Номер договора.",
        "UZ": "Shartnoma raqami."
      },
      {
        "RU": "Какую операцию клиент хочет выполнить: продление или переоформление.",
        "UZ": "Mijoz qaysi operatsiyani bajarishni xohlayotganini aniqlang: uzaytirish yoki qayta rasmiylashtirish."
      }
    ],
    "optional": [
      {
        "RU": "Дата окончания текущего срока — если клиент её сообщает.",
        "UZ": "Amaldagi muddat tugash sanasi — mijoz aytgan bo‘lsa."
      },
      {
        "RU": "Скриншот ошибки или сообщение системы — при наличии.",
        "UZ": "Xatolik skrinshoti yoki tizim xabari — mavjud bo‘lsa."
      }
    ],
    "documents": [
      {
        "RU": "Скриншот ошибки/уведомления — при наличии.",
        "UZ": "Xatolik/bildirishnoma skrinshoti — mavjud bo‘lsa."
      }
    ],
    "doNotAsk": [
      {
        "RU": "Не собирайте дополнительные документы, если вопрос решается по общим условиям и проверка файла не требуется.",
        "UZ": "Savol umumiy shartlar bilan hal qilinsa va fayl tekshiruvi kerak bo‘lmasa, qo‘shimcha hujjatlarni yig‘mang."
      }
    ]
  },
  "branch-problem": {
    "required": [
      {
        "RU": "ФИО клиента.",
        "UZ": "Mijozning F.I.O."
      },
      {
        "RU": "Название или адрес филиала.",
        "UZ": "Filial nomi yoki manzili."
      },
      {
        "RU": "Дата посещения филиала.",
        "UZ": "Filialga tashrif sanasi."
      },
      {
        "RU": "Точное время посещения.",
        "UZ": "Tashrifning aniq vaqti."
      }
    ],
    "optional": [
      {
        "RU": "Номер договора — только если он относится к сути обращения.",
        "UZ": "Shartnoma raqami — faqat murojaat mazmuniga tegishli bo‘lsa."
      },
      {
        "RU": "Имя сотрудника — если клиент его знает.",
        "UZ": "Xodimning ismi — mijoz bilsa."
      },
      {
        "RU": "Дополнительные обстоятельства, которые помогут проверить ситуацию.",
        "UZ": "Vaziyatni tekshirishga yordam beradigan qo‘shimcha tafsilotlar."
      }
    ],
    "documents": [
      {
        "RU": "Фото/видео, чек или другие подтверждения — при наличии и необходимости.",
        "UZ": "Foto/video, chek yoki boshqa tasdiqlar — mavjud bo‘lsa va zarur bo‘lsa."
      }
    ],
    "doNotAsk": [
      {
        "RU": "ПИНФЛ, номер договора и телефон не запрашивайте автоматически: для жалобы на работу филиала они не являются обязательными, если не нужны для конкретной проверки.",
        "UZ": "Filial faoliyati bo‘yicha shikoyatda JSHSHIR, shartnoma raqami va telefonni avtomatik so‘ramang: aniq tekshiruv uchun kerak bo‘lmasa, ular majburiy emas."
      }
    ]
  },
  "client-another-city": {
    "required": [
      {
        "RU": "ФИО клиента.",
        "UZ": "Mijozning F.I.O."
      },
      {
        "RU": "Номер договора — если вопрос относится к конкретному займу.",
        "UZ": "Shartnoma raqami — savol aniq kreditga tegishli bo‘lsa."
      },
      {
        "RU": "Какая операция нужна клиенту.",
        "UZ": "Mijozga qaysi operatsiya kerakligini aniqlang."
      }
    ],
    "optional": [
      {
        "RU": "Данные представителя — если операцию будет выполнять другое лицо.",
        "UZ": "Vakil ma’lumotlari — operatsiyani boshqa shaxs amalga oshirsa."
      }
    ],
    "documents": [
      {
        "RU": "Нотариальная доверенность — если конкретная операция допускает представителя.",
        "UZ": "Notarial ishonchnoma — agar aniq operatsiyada vakilga ruxsat berilsa."
      }
    ],
    "doNotAsk": [
      {
        "RU": "Не запрашивайте доверенность, если клиент выполняет операцию лично и представитель не нужен.",
        "UZ": "Mijoz operatsiyani o‘zi bajarayotgan bo‘lsa va vakil kerak bo‘lmasa, ishonchnoma so‘ramang."
      }
    ]
  },
  "employee-complaint": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "Номер для связи.", UZ: "Aloqa uchun telefon raqami." },
      { RU: "Дата и время посещения.", UZ: "Tashrif sanasi va vaqti." },
      { RU: "Подробное описание ситуации.", UZ: "Vaziyatning batafsil tavsifi." },
      { RU: "Филиал, в котором произошла ситуация.", UZ: "Vaziyat sodir bo‘lgan filial." },
    ],
    optional: [
      { RU: "Номер договора — при наличии.", UZ: "Shartnoma raqami — mavjud bo‘lsa." },
      { RU: "ПИНФЛ — при необходимости.", UZ: "JSHSHIR — zarur bo‘lsa." },
      { RU: "Имя сотрудника — если клиент знает.", UZ: "Xodimning ismi — mijoz bilsa." },
    ],
    documents: [],
    doNotAsk: [],
  },
  "service-refusal": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "Филиал, в котором произошла ситуация.", UZ: "Vaziyat sodir bo‘lgan filial." },
      { RU: "Дата и время посещения филиала.", UZ: "Filialga tashrif sanasi va vaqti." },
      { RU: "Полная информация по ситуации.", UZ: "Vaziyat bo‘yicha to‘liq ma’lumot." },
      { RU: "Причина отказа со слов клиента.", UZ: "Mijoz so‘zlariga ko‘ra rad etish sababi." },
    ],
    optional: [
      { RU: "ПИНФЛ — при необходимости.", UZ: "JSHSHIR — zarur bo‘lsa." },
      { RU: "Номер договора — при наличии.", UZ: "Shartnoma raqami — mavjud bo‘lsa." },
      { RU: "ФИО сотрудника — если известно.", UZ: "Xodimning F.I.O. — ma’lum bo‘lsa." },
    ],
    documents: [],
    doNotAsk: [],
  },
  "branch-work-complaint": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "Адрес или название филиала.", UZ: "Filial manzili yoki nomi." },
      { RU: "Дата посещения филиала.", UZ: "Filialga tashrif sanasi." },
      { RU: "Точное время посещения филиала.", UZ: "Filialga tashrifning aniq vaqti." },
    ],
    optional: [],
    documents: [],
    doNotAsk: [
      { RU: "ПИНФЛ клиента.", UZ: "Mijozning JSHSHIRi." },
      { RU: "Номер договора.", UZ: "Shartnoma raqami." },
      { RU: "Другие личные данные, которые не нужны для проверки факта работы филиала.", UZ: "Filial faoliyati faktini tekshirish uchun kerak bo‘lmagan boshqa shaxsiy ma’lumotlar." },
    ],
  },
  "branch-tech-complaint": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "Контактный телефон.", UZ: "Aloqa telefoni." },
      { RU: "Адрес филиала.", UZ: "Filial manzili." },
      { RU: "Дата и время посещения.", UZ: "Tashrif sanasi va vaqti." },
      { RU: "Описание неисправности: что именно не работает (принтер, интернет, компьютер, система и т. д.).", UZ: "Nosozlik tavsifi: aynan nima ishlamayapti (printer, internet, kompyuter, tizim va h.k.)." },
    ],
    optional: [
      { RU: "ПИНФЛ — при необходимости.", UZ: "JSHSHIR — zarur bo‘lsa." },
      { RU: "Номер договора — при наличии.", UZ: "Shartnoma raqami — mavjud bo‘lsa." },
    ],
    documents: [],
    doNotAsk: [],
  },
  "katm-appeal": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "Номер договора.", UZ: "Shartnoma raqami." },
      { RU: "ПИНФЛ.", UZ: "JSHSHIR." },
      { RU: "Контактный телефон.", UZ: "Aloqa telefoni." },
      { RU: "Адрес филиала.", UZ: "Filial manzili." },
      { RU: "Описание ситуации.", UZ: "Vaziyat tavsifi." },
    ],
    optional: [],
    documents: [],
    doNotAsk: [
      { RU: "Если у клиента неактивная просрочка, а проблема только в плохой кредитной истории, из-за которой отказывают в банках, обращение не регистрируем — отвечаем по скрипту.", UZ: "Agar mijozda faol bo‘lmagan kechikish bo‘lsa va muammo faqat banklar rad javobi berayotgan yomon kredit tarixida bo‘lsa, murojaatni qayd etmaymiz — skript bo‘yicha javob beramiz." },
    ],
  },
  "collateral-return": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "ПИНФЛ.", UZ: "JSHSHIR." },
      { RU: "Адрес филиала, в котором был оформлен займ.", UZ: "Kredit rasmiylashtirilgan filial manzili." },
      { RU: "Причина невыкупа со слов клиента.", UZ: "Mijoz so‘zlariga ko‘ra olinmaganlik sababi." },
    ],
    optional: [
      { RU: "Номер договора — при наличии.", UZ: "Shartnoma raqami — mavjud bo‘lsa." },
      { RU: "Номер телефона для связи.", UZ: "Aloqa uchun telefon raqami." },
    ],
    documents: [],
    doNotAsk: [],
  },
  "suspension-realization": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "Номер договора.", UZ: "Shartnoma raqami." },
      { RU: "ПИНФЛ.", UZ: "JSHSHIR." },
      { RU: "Контактный телефон.", UZ: "Aloqa telefoni." },
      { RU: "Адрес филиала.", UZ: "Filial manzili." },
      { RU: "Дата обращения.", UZ: "Murojaat sanasi." },
      { RU: "Описание ситуации.", UZ: "Vaziyat tavsifi." },
    ],
    optional: [],
    documents: [],
    doNotAsk: [],
  },
  "health-return": {
    "required": [
      {
        "RU": "ФИО клиента.",
        "UZ": "Mijozning F.I.O."
      },
      {
        "RU": "Номер договора.",
        "UZ": "Shartnoma raqami."
      },
      {
        "RU": "Причина обращения и обстоятельства со слов клиента.",
        "UZ": "Murojaat sababi va mijoz aytgan holat."
      }
    ],
    "optional": [
      {
        "RU": "ПИНФЛ и контактный телефон — если нужны для идентификации и связи.",
        "UZ": "JSHSHIR va aloqa telefoni — identifikatsiya va aloqa uchun kerak bo‘lsa."
      },
      {
        "RU": "Дата последнего обращения в филиал — если относится к ситуации.",
        "UZ": "Filialga oxirgi murojaat sanasi — holatga tegishli bo‘lsa."
      }
    ],
    "documents": [
      {
        "RU": "Медицинские или другие подтверждающие документы — только при наличии и необходимости.",
        "UZ": "Tibbiy yoki boshqa tasdiqlovchi hujjatlar — faqat mavjud bo‘lsa va zarur bo‘lsa."
      }
    ],
    "doNotAsk": [
      {
        "RU": "Не запрашивайте медицинские документы, если они не нужны для рассмотрения конкретного обращения.",
        "UZ": "Aniq murojaatni ko‘rib chiqish uchun kerak bo‘lmasa, tibbiy hujjatlarni so‘ramang."
      }
    ]
  },
  "third-party-operation": {
    "required": [
      {
        "RU": "ФИО заявителя и заёмщика.",
        "UZ": "Arizachi va qarz oluvchining F.I.O."
      },
      {
        "RU": "Вид операции, которую совершает третье лицо.",
        "UZ": "Uchinchi shaxs bajaradigan operatsiya turi."
      },
      {
        "RU": "Номер договора — если операция относится к конкретному договору.",
        "UZ": "Shartnoma raqami — operatsiya aniq shartnomaga tegishli bo‘lsa."
      }
    ],
    "optional": [
      {
        "RU": "ПИНФЛ и телефон — если нужны для идентификации/обратной связи.",
        "UZ": "JSHSHIR va telefon — identifikatsiya/qayta aloqa uchun kerak bo‘lsa."
      }
    ],
    "documents": [
      {
        "RU": "Нотариальная доверенность и документ представителя — если операция выполняется представителем.",
        "UZ": "Notarial ishonchnoma va vakil hujjati — operatsiyani vakil bajarsa."
      }
    ],
    "doNotAsk": [
      {
        "RU": "Не запрашивайте доверенность или документы представителя, если третье лицо не совершает операцию от имени заёмщика.",
        "UZ": "Uchinchi shaxs qarz oluvchi nomidan operatsiya bajarmayotgan bo‘lsa, ishonchnoma yoki vakil hujjatlarini so‘ramang."
      }
    ]
  },
  "fraud-suspicion": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "Номер телефона для связи.", UZ: "Aloqa uchun telefon raqami." },
      { RU: "Адрес филиала.", UZ: "Filial manzili." },
      { RU: "Дата и время последнего посещения филиала.", UZ: "Filialga oxirgi tashrif sanasi va vaqti." },
      { RU: "Подробное описание ситуации: что произошло.", UZ: "Vaziyatning batafsil tavsifi: nima sodir bo‘ldi." },
    ],
    optional: [
      { RU: "ПИНФЛ — при необходимости.", UZ: "JSHSHIR — zarur bo‘lsa." },
      { RU: "Номер договора — при необходимости.", UZ: "Shartnoma raqami — zarur bo‘lsa." },
    ],
    documents: [],
    doNotAsk: [],
  },
  "online-payment-error": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "ПИНФЛ.", UZ: "JSHSHIR." },
      { RU: "Номер договора — при наличии.", UZ: "Shartnoma raqami — mavjud bo‘lsa." },
      { RU: "Способ оплаты.", UZ: "To‘lov usuli." },
      { RU: "Дата и время платежа.", UZ: "To‘lov sanasi va vaqti." },
      { RU: "Сумма платежа.", UZ: "To‘lov summasi." },
      { RU: "Откуда клиент получил информацию о сумме к оплате.", UZ: "Mijoz to‘lov summasi haqidagi ma’lumotni qayerdan olgani." },
      { RU: "Адрес филиала.", UZ: "Filial manzili." },
    ],
    optional: [],
    documents: [
      { RU: "Чек об оплате.", UZ: "To‘lov cheki." },
    ],
    doNotAsk: [],
  },
  "debt-recalculation": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "ПИНФЛ.", UZ: "JSHSHIR." },
      { RU: "Номер телефона для связи.", UZ: "Aloqa uchun telefon raqami." },
      { RU: "Адрес филиала.", UZ: "Filial manzili." },
      { RU: "Подробное описание ситуации.", UZ: "Vaziyatning batafsil tavsifi." },
    ],
    optional: [
      { RU: "Номер договора — при наличии.", UZ: "Shartnoma raqami — mavjud bo‘lsa." },
    ],
    documents: [],
    doNotAsk: [
      { RU: "Если клиент жалуется только на отсутствие телефонного уведомления, из-за чего ему начислили пеню, обращение не регистрируем — отвечаем клиенту по скрипту.", UZ: "Agar mijoz faqat telefon orqali xabarnoma berilmagani sababli penya hisoblanganidan shikoyat qilsa, murojaatni qayd etmaymiz — mijozga skript bo‘yicha javob beramiz." },
    ],
  },
  "loan-procedure-error": {
    required: [
      { RU: "ФИО клиента.", UZ: "Mijozning F.I.O." },
      { RU: "ПИНФЛ.", UZ: "JSHSHIR." },
      { RU: "Контактный номер.", UZ: "Aloqa raqami." },
      { RU: "Филиал.", UZ: "Filial." },
      { RU: "Дата и время оформления займа.", UZ: "Kredit rasmiylashtirilgan sana va vaqti." },
      { RU: "Описание нарушения.", UZ: "Qoidabuzarlik tavsifi." },
    ],
    optional: [
      { RU: "Номер договора — если известен.", UZ: "Shartnoma raqami — ma’lum bo‘lsa." },
    ],
    documents: [],
    doNotAsk: [],
  },
};

const scriptSections: ScriptSection[] = [
  {
    title: { RU: "Начало звонка", UZ: "Qo‘ng‘iroqni boshlash" },
    lines: {
      RU: [
        "Здравствуйте! Меня зовут …, чем могу помочь?",
        "Подскажите, пожалуйста, как я могу к вам обращаться?",
      ],
      UZ: [
        "Assalomu alaykum! Mening ismim …, Sizga qanday yordam bera olaman?",
        "Iltimos, Sizga qanday murojaat qilishim mumkin?",
      ],
    },
  },
  {
    title: { RU: "Определение сути обращения", UZ: "Murojaat mazmunini aniqlash" },
    lines: {
      RU: [
        "Внимательно выслушайте клиента и определите, к какому типу относится обращение.",
        "Консультация — клиенту нужна информация, проверка не требуется.",
        "Запрос — необходимо проверить информацию, выполнить действие или получить сведения.",
        "Жалоба — клиент сообщает о проблеме, ошибке или выражает недовольство.",
      ],
      UZ: [
        "Mijozni diqqat bilan tinglang va murojaat turini aniqlang.",
        "Maslahat — mijozga ma’lumot kerak, tekshiruv talab qilinmaydi.",
        "So‘rov — ma’lumotni tekshirish, amal bajarish yoki qo‘shimcha ma’lumot olish kerak.",
        "Shikoyat — mijoz muammo, xato yoki norozilik haqida xabar beradi.",
      ],
    },
  },
  {
    title: { RU: "Ветка: консультация", UZ: "Yo‘nalish: maslahat" },
    lines: {
      RU: [
        "Конечно, сейчас расскажу порядок действий.",
        "Если вопрос относится к общим правилам, используйте актуальную информацию из Базы знаний.",
      ],
      UZ: [
        "Albatta, hozir tartibini tushuntirib beraman.",
        "Agar savol umumiy qoidalarga tegishli bo‘lsa, Bilimlar bazasidagi amaldagi ma’lumotdan foydalaning.",
      ],
    },
  },
  {
    title: { RU: "Ветка: запрос", UZ: "Yo‘nalish: so‘rov" },
    lines: {
      RU: [
        "Понимаю. Давайте уточню необходимые данные, чтобы зарегистрировать ваше обращение.",
        "Соберите данные, которые обязательны именно для выбранного типа обращения.",
        "Дополнительные сведения и документы запрашивайте только при наличии необходимости.",
        "После сбора данных зарегистрируйте обращение и передайте его ответственному подразделению согласно действующему маршруту.",
        "После регистрации сообщите клиенту номер его обращения: «Ваше обращение зарегистрировано под номером … . Пожалуйста, сохраните этот номер. При повторном обращении назовите его, чтобы мы могли быстрее найти информацию по вашему обращению».",
      ],
      UZ: [
        "Tushundim. Murojaatingizni ro‘yxatdan o‘tkazish uchun zarur ma’lumotlarni aniqlashtiraman.",
        "Tanlangan murojaat turi uchun aynan majburiy bo‘lgan ma’lumotlarni to‘plang.",
        "Qo‘shimcha ma’lumot va hujjatlarni faqat zarur bo‘lsa so‘rang.",
        "Ma’lumotlar to‘plangach, murojaatni ro‘yxatdan o‘tkazing va amaldagi yo‘nalishga muvofiq mas’ul bo‘limga yuboring.",
        "Ro‘yxatdan o‘tkazilgandan so‘ng mijozga murojaat raqamini ayting: «Murojaatingiz … raqam bilan ro‘yxatdan o‘tkazildi. Iltimos, ushbu raqamni saqlab qo‘ying. Qayta murojaat qilganingizda raqamni aytsangiz, murojaatingizni tezroq topa olamiz».",
      ],
    },
  },
  {
    title: { RU: "Ветка: жалоба", UZ: "Yo‘nalish: shikoyat" },
    lines: {
      RU: [
        "Понимаю вас. Приносим извинения за доставленные неудобства.",
        "Я помогу зарегистрировать ваше обращение.",
        "Уточню несколько необходимых данных по ситуации.",
        "После регистрации обращение передаётся ответственному подразделению для рассмотрения.",
        "После регистрации сообщите клиенту номер его обращения: «Ваше обращение зарегистрировано под номером … . Пожалуйста, сохраните этот номер. При повторном обращении назовите его, чтобы мы могли быстрее найти информацию по вашему обращению».",
      ],
      UZ: [
        "Sizni tushundim. Yetkazilgan noqulayliklar uchun uzr so‘raymiz.",
        "Murojaatingizni ro‘yxatdan o‘tkazishga yordam beraman.",
        "Vaziyat bo‘yicha zarur ma’lumotlarni aniqlashtiraman.",
        "Ro‘yxatdan o‘tkazilgandan so‘ng murojaat ko‘rib chiqish uchun mas’ul bo‘limga yuboriladi.",
        "Ro‘yxatdan o‘tkazilgandan so‘ng mijozga murojaat raqamini ayting: «Murojaatingiz … raqam bilan ro‘yxatdan o‘tkazildi. Iltimos, ushbu raqamni saqlab qo‘ying. Qayta murojaat qilganingizda raqamni aytsangiz, murojaatingizni tezroq topa olamiz».",
      ],
    },
  },
  {
    title: { RU: "Уточняющие вопросы и сбор данных", UZ: "Aniqlashtiruvchi savollar va ma’lumotlarni yig‘ish" },
    lines: {
      RU: [
        "Подскажите, пожалуйста, …",
        "Уточните, пожалуйста, …",
        "Правильно ли я вас понял(а), что …?",
        "Не запрашивайте данные, которые не требуются для выбранного сценария.",
        "При необходимости уточните наличие дополнительных документов или подтверждений.",
      ],
      UZ: [
        "Iltimos, … ni ayting.",
        "Iltimos, … ni aniqlashtirib bering.",
        "Sizni to‘g‘ri tushundimmi, ya’ni …?",
        "Tanlangan holat uchun talab qilinmaydigan ma’lumotlarni so‘ramang.",
        "Zarur bo‘lsa, qo‘shimcha hujjatlar yoki tasdiqlar mavjudligini aniqlang.",
      ],
    },
  },
  {
    title: { RU: "Постановка на ожидание и возвращение", UZ: "Kutishga qo‘yish va qaytish" },
    lines: {
      RU: [
        "Пожалуйста, оставайтесь на линии, я уточню ваш вопрос!",
        "Спасибо за ожидание…",
      ],
      UZ: [
        "Iltimos, liniyada qoling, savolingizni aniqlashtirib olaman!",
        "Kutganingiz uchun rahmat…",
      ],
    },
  },
  {
    title: { RU: "Завершение разговора", UZ: "Suhbatni yakunlash" },
    lines: {
      RU: [
        "У вас остались дополнительные вопросы?",
        "Спасибо за обращение. Хорошего дня!",
      ],
      UZ: [
        "Qo‘shimcha savollaringiz qoldimi?",
        "Murojaatingiz uchun rahmat. Kuningiz xayrli o‘tsin!",
      ],
    },
  },
  {
    title: { RU: "Перерасчёта не будет", UZ: "Qayta hisob-kitob bo‘lmaydi" },
    lines: {
      RU: [
        "Если клиент просит пересчитать или списать начисленную пеню/задолженность, не обещайте перерасчёт.",
        "Разъясните условия по договору и используйте утверждённый скрипт: «Перерасчёта не будет». При необходимости оформляйте обращение только по предусмотренному сценарию проверки.",
      ],
      UZ: [
        "Agar mijoz hisoblangan penya yoki qarzdorlikni qayta hisoblashni yoki bekor qilishni so‘rasa, qayta hisob-kitobni va’da qilmang.",
        "Shartnoma shartlarini tushuntiring va tasdiqlangan «Qayta hisob-kitob bo‘lmaydi» skriptidan foydalaning. Zarur bo‘lsa, murojaatni faqat nazarda tutilgan tekshiruv ssenariysi bo‘yicha rasmiylashtiring.",
      ],
    },
  },
  {
    title: { RU: "Неактивная задолженность в KATM", UZ: "KATMdagi faol bo‘lmagan qarzdorlik" },
    lines: {
      RU: [
        "Если у клиента нет активной просрочки, а проблема заключается только в плохой кредитной истории, обращение не регистрируется.",
        "Используйте действующий скрипт по вопросу кредитной истории и отказа банков.",
      ],
      UZ: [
        "Agar mijozda faol kechikish bo‘lmasa va muammo faqat yomon kredit tarixida bo‘lsa, murojaat ro‘yxatdan o‘tkazilmaydi.",
        "Kredit tarixi va banklarning rad javobi bo‘yicha amaldagi skriptdan foydalaning.",
      ],
    },
  },
  {
    title: { RU: "Телефонное уведомление и пеня", UZ: "Telefon xabarnomasi va penya" },
    lines: {
      RU: [
        "Если клиент жалуется только на отсутствие дополнительного телефонного уведомления, из-за чего ему начислили пеню, обращение не регистрируем.",
        "Используйте утверждённый скрипт по вопросу телефонного уведомления и начисления пени.",
      ],
      UZ: [
        "Agar mijoz faqat qo‘shimcha telefon xabarnomasi kelmagani sababli penya hisoblanganidan shikoyat qilsa, murojaatni qayd etmaymiz.",
        "Telefon xabarnomasi va penya bo‘yicha tasdiqlangan skriptdan foydalaning.",
      ],
    },
  },
];

const companyInfo: Record<Language, { title: string; subtitle: string; about: string; mission: string }> = {
  RU: {
    title: "Hurma Lombard",
    subtitle: "О компании",
    about: `ИП ООО «OLTIN LOMBARD» (торговая марка Hurma Lombard) осуществляет свою деятельность на основе разрешительного письма на право осуществления деятельности ломбарда №116 от 30.11.2022 года, выданного Центральным банком Республики Узбекистан.

Hurma Lombard занимает одну из ключевых позиций на рынке и является действительным членом Национальной Ассоциации Участников Финансового рынка на территории Республики Узбекистан. С каждым годом количество филиалов увеличивается: на конец 2024 года — 24 филиала, на конец 2025 года — 52 филиала.

Hurma Lombard — №2 по доле рынка (10,3%) и абсолютный лидер среди крупных игроков по темпу роста и открытию новых филиалов.`,
    mission: `Помочь людям достойно пройти через временные финансовые трудности, предоставляя честные займы под залог в шаговой доступности и создавая место, где ценят не только золото, но и человека — с уважением, прозрачными условиями и бережным отношением к тому, что нам доверяют.`,
  },
  UZ: {
    title: "Hurma Lombard",
    subtitle: "Kompaniya haqida",
    about: `IP MChJ «OLTIN LOMBARD» (Hurma Lombard savdo belgisi) O‘zbekiston Respublikasi Markaziy banki tomonidan berilgan 2022-yil 30-noyabrdagi №116-sonli lombard faoliyatini amalga oshirish huquqini beruvchi ruxsat xati asosida faoliyat yuritadi.

Hurma Lombard O‘zbekiston Respublikasi moliya bozori ishtirokchilari Milliy Assotsiatsiyasining amaldagi a'zosi bo‘lib, bozordagi muhim o‘rinlardan birini egallaydi. Filiallar soni yil sayin ortib bormoqda: 2024-yil oxirida — 24 ta filial, 2025-yil oxirida — 52 ta filial.

Hurma Lombard bozor ulushi bo‘yicha №2 (10,3%) va yirik ishtirokchilar orasida o‘sish sur'ati hamda yangi filiallar ochilishi bo‘yicha yetakchi hisoblanadi.`,
    mission: `Odamlarga vaqtinchalik moliyaviy qiyinchiliklarni munosib tarzda yengib o‘tishda yordam berish, halol garovli kreditlarni qulay masofada taqdim etish va nafaqat oltinni, balki insonni ham qadrlaydigan — hurmat, shaffof shartlar va bizga ishonib topshirilgan narsalarga ehtiyotkor munosabat mavjud bo‘lgan joyni yaratish.`,
  },
};


const formatMoney = (value: number, language: Language) =>
  new Intl.NumberFormat(language === "RU" ? "ru-RU" : "uz-UZ").format(Math.round(value));

const formatRate = (value: number, language: Language) =>
  `${value.toFixed(2).replace(".", ",")}%`;

const getMapUrl = (name: string, address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/ў/g, "у")
    .replace(/ғ/g, "г")
    .replace(/қ/g, "к")
    .replace(/ҳ/g, "х")
    .replace(/ʼ/g, "'")
    .replace(/’/g, "'")
    .trim();

type SearchResultType = "article" | "navigator" | "script" | "branch" | "section";

type GlobalSearchResult = {
  type: SearchResultType;
  id: string;
  title: string;
  category: string;
  preview: string;
  score: number;
  matchedTerms: string[];
  articleId?: string;
  sectionId?: string;
  flowId?: string;
  scriptIndex?: number;
  branch?: (typeof branches)[number];
};

const searchAliases: Record<string, string[]> = {
  "продлить": ["продление", "продлить", "пролонгация", "продлевать", "срок"],
  "продлид": ["продление", "продлить", "пролонгация"],
  "продлени": ["продление", "продлить", "пролонгация"],
  "погасить": ["погашение", "оплатить", "закрыть", "выкуп"],
  "погашение": ["погасить", "оплатить", "закрыть"],
  "оплатить": ["оплата", "платеж", "платёж", "payme", "click", "чек"],
  "оплата": ["платеж", "платёж", "оплатить", "payme", "click"],
  "платеж": ["оплата", "платёж", "оплатить", "чек", "payme", "click"],
  "платёж": ["оплата", "платеж", "оплатить", "чек", "payme", "click"],
  "непоступил": ["не поступил", "платеж", "оплата"],
  "долг": ["задолженность", "кредит", "сумма", "погашение"],
  "задолженность": ["долг", "погашение", "проценты", "пеня"],
  "пеня": ["просрочка", "штраф", "начисление", "31-й день"],
  "просрочка": ["пеня", "31-й день", "льготный период", "задолженность"],
  "залог": ["залоговое имущество", "изделие", "золото", "выкуп"],
  "золото": ["залог", "изделие", "проба", "вес"],
  "изделие": ["залог", "золото", "оценка"],
  "выкуп": ["погашение", "частичный выкуп", "залог"],
  "частичный": ["частичный выкуп", "частичное погашение"],
  "добор": ["дополнительная сумма", "увеличение суммы", "действующий займ"],
  "сумма": ["размер займа", "добор", "оценка"],
  "договор": ["залоговый билет", "оформление", "документы"],
  "катм": ["кредитная история", "просрочка", "задолженность"],
  "кредитная": ["катм", "история", "просрочка"],
  "филиал": ["отделение", "адрес", "город", "филиал"],
  "адрес": ["филиал", "местонахождение", "город"],
  "жалоба": ["недовольство", "проблема", "отказ", "нарушение"],
  "запрос": ["проверить", "обращение", "действие", "проверка"],
  "консультация": ["информация", "разъяснение", "вопрос"],
  "сотрудник": ["работник", "оператор", "персонал"],
  "телефон": ["номер", "обратная связь", "контакт"],
  "номер": ["телефон", "договор", "филиал"],
  "чек": ["квитанция", "подтверждение", "платеж", "оплата"],
  "фото": ["изображение", "подтверждение", "документ"],
  "документ": ["паспорт", "id-карта", "договор", "подтверждение"],
  "uzaytirish": ["muddat", "uzaytirish", "kredit"],
  "prolongatsiya": ["uzaytirish", "muddat"],
  "tolov": ["to‘lov", "to'lov", "payme", "click", "chek"],
  "to‘lov": ["tolov", "to'lov", "payme", "click", "chek"],
  "qarz": ["qarzdorlik", "kredit", "to‘lov", "tolov"],
  "qarzdorlik": ["qarz", "penya", "to‘lov", "tolov"],
  "penya": ["kechikish", "qarzdorlik", "31-kun"],
  "garov": ["oltin", "buyum", "mol-mulk", "qaytarish"],
  "oltin": ["garov", "buyum", "proba", "og‘irlik", "og'irlik"],
  "buyum": ["garov", "oltin", "baholash"],
  "shartnoma": ["garov bileti", "hujjat", "rasmiylashtirish"],
  "jshshir": ["pinfl", "mijoz", "identifikatsiya"],
  "filial": ["manzil", "hudud", "filial"],
  "manzil": ["filial", "hudud"],
  "shikoyat": ["norozilik", "muammo", "qoidabuzarlik"],
  "so‘rov": ["tekshirish", "murojaat", "harakat"],
  "so'rov": ["tekshirish", "murojaat", "harakat"],
};

const tokenizeSearch = (value: string) =>
  normalize(value)
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2);

const levenshtein = (a: string, b: string) => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const cur = [i];
    for (let j = 1; j <= b.length; j += 1) {
      cur[j] = Math.min(
        cur[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    for (let j = 0; j <= b.length; j += 1) prev[j] = cur[j];
  }
  return prev[b.length];
};

const tokenSimilarity = (queryToken: string, candidateToken: string) => {
  if (!queryToken || !candidateToken) return 0;
  if (queryToken === candidateToken) return 1;
  if (candidateToken.startsWith(queryToken) || queryToken.startsWith(candidateToken)) return 0.92;
  if (candidateToken.includes(queryToken) || queryToken.includes(candidateToken)) return 0.82;

  const maxDistance = queryToken.length <= 4 ? 1 : queryToken.length <= 7 ? 2 : 3;
  const distance = levenshtein(queryToken, candidateToken);
  if (distance > maxDistance) return 0;
  return Math.max(0.55, 1 - distance / Math.max(queryToken.length, candidateToken.length));
};

const unique = (items: string[]) => Array.from(new Set(items.filter(Boolean)));
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getExpandedQueryTokens = (query: string) => {
  const base = tokenizeSearch(query);
  const expanded = [...base];
  for (const token of base) expanded.push(...(searchAliases[token] ?? []));
  return unique(expanded.flatMap(tokenizeSearch));
};

const scoreField = (queryTokens: string[], field: string) => {
  const candidateTokens = tokenizeSearch(field);
  if (!candidateTokens.length || !queryTokens.length) return { score: 0, matches: [] as string[] };

  let score = 0;
  const matches: string[] = [];
  let covered = 0;

  for (const queryToken of queryTokens) {
    let best = 0;
    let bestToken = "";
    for (const candidateToken of candidateTokens) {
      const similarity = tokenSimilarity(queryToken, candidateToken);
      if (similarity > best) {
        best = similarity;
        bestToken = candidateToken;
      }
    }
    if (best >= 0.55) {
      covered += 1;
      matches.push(bestToken);
      score += best * 10;
    }
  }

  return {
    score: score + (covered / Math.max(queryTokens.length, 1)) * 10,
    matches: unique(matches),
  };
};

const scoreSearchItem = (
  query: string,
  fields: { title: string; subtitle?: string; content?: string; keywords?: string }
) => {
  const cleanQuery = normalize(query);
  const baseTokens = tokenizeSearch(query);
  const expandedTokens = getExpandedQueryTokens(query);
  if (!baseTokens.length) return { score: 0, matchedTerms: [] as string[] };

  const title = fields.title ?? "";
  const subtitle = fields.subtitle ?? "";
  const content = fields.content ?? "";
  const keywords = fields.keywords ?? "";

  const titleResult = scoreField(expandedTokens, title);
  const subtitleResult = scoreField(expandedTokens, subtitle);
  const contentResult = scoreField(expandedTokens, content);
  const keywordResult = scoreField(expandedTokens, keywords);

  let score = titleResult.score * 4 + subtitleResult.score * 2 + contentResult.score + keywordResult.score * 1.5;
  const searchable = normalize([title, subtitle, content, keywords].join(" "));

  if (cleanQuery.length >= 3 && searchable.includes(cleanQuery)) score += 55;
  score += baseTokens.filter((token) => searchable.includes(token)).length * 12;

  const coverage = new Set([
    ...titleResult.matches,
    ...subtitleResult.matches,
    ...contentResult.matches,
    ...keywordResult.matches,
  ]).size;
  score += Math.min(25, coverage * 2.5);

  return {
    score,
    matchedTerms: unique([
      ...titleResult.matches,
      ...subtitleResult.matches,
      ...contentResult.matches,
      ...keywordResult.matches,
    ]),
  };
};

const buildSearchPreview = (query: string, parts: string[], matchedTerms: string[], maxLength = 220) => {
  const safeParts = parts.map((part) => part.replace(/\s+/g, " ").trim()).filter(Boolean);
  if (!safeParts.length) return "";

  const queryNeedle = normalize(query);
  let bestPart = safeParts[0];
  let bestIndex = Number.MAX_SAFE_INTEGER;

  for (const part of safeParts) {
    const normalizedPart = normalize(part);
    const exactIndex = queryNeedle.length >= 3 ? normalizedPart.indexOf(queryNeedle) : -1;
    if (exactIndex >= 0 && exactIndex < bestIndex) {
      bestPart = part;
      bestIndex = exactIndex;
    }
  }

  if (bestIndex === Number.MAX_SAFE_INTEGER) {
    for (const part of safeParts) {
      const normalizedPart = normalize(part);
      const index = matchedTerms
        .map((term) => normalizedPart.indexOf(normalize(term)))
        .filter((value) => value >= 0)
        .sort((a, b) => a - b)[0];
      if (index !== undefined && index < bestIndex) {
        bestPart = part;
        bestIndex = index;
      }
    }
  }

  if (bestPart.length <= maxLength) return bestPart;
  const center = bestIndex === Number.MAX_SAFE_INTEGER ? 0 : bestIndex;
  const start = Math.max(0, center - Math.floor(maxLength / 2));
  const end = Math.min(bestPart.length, start + maxLength);
  return `${start > 0 ? "…" : ""}${bestPart.slice(start, end).trim()}${end < bestPart.length ? "…" : ""}`;
};

type UsageEvent = {
  type: "search" | "article" | "section" | "navigator" | "script" | "branch" | "contract" | "module";
  id: string;
  query?: string;
  timestamp: number;
};

const getSearchTypeLabel = (type: SearchResultType, text: Record<string, string>) => {
  if (type === "article") return text.searchArticle;
  if (type === "navigator") return text.searchNavigator;
  if (type === "script") return text.searchScript;
  if (type === "branch") return text.searchBranch;
  return text.searchSection;
};

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("Главная");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("RU");

  const [homeSearch, setHomeSearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");
  const [branchRegion, setBranchRegion] = useState("__ALL__");
  const [homeView, setHomeView] = useState("home");

  const [knowledgeLevel, setKnowledgeLevel] = useState(1);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [knowledgeSearch, setKnowledgeSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [navigatorLevel, setNavigatorLevel] = useState(1);
  const [selectedNavigatorCategory, setSelectedNavigatorCategory] = useState<string | null>(null);
  const [selectedNavigatorFlow, setSelectedNavigatorFlow] = useState<string | null>(null);
  const [scriptFocus, setScriptFocus] = useState<number | null>(null);
  const [selectedCallType, setSelectedCallType] = useState<"consultation" | "request" | "complaint" | null>(null);
  const [contractSearch, setContractSearch] = useState("");
  const [analyticsEvents, setAnalyticsEvents] = useState<UsageEvent[]>([]);
  const [analyticsPeriod, setAnalyticsPeriod] = useState<"7d" | "30d" | "all">("30d");

  const [calculatorMode, setCalculatorMode] = useState<"loan" | "penalty">("loan");
  const [loanAmount, setLoanAmount] = useState("5000000");
  const [loanDays, setLoanDays] = useState("30");
  const [penaltyPrincipal, setPenaltyPrincipal] = useState("");

  const text = ui[language];

  useEffect(() => {
    const savedTheme = localStorage.getItem("hurma-theme");
    const savedLanguage = localStorage.getItem("hurma-language");
    const savedFavorites = localStorage.getItem("hurma-favorites");
    const savedAnalytics = localStorage.getItem("hurma-analytics-events");

    if (savedTheme === "dark") setDarkMode(true);
    if (savedLanguage === "RU" || savedLanguage === "UZ") {
      setLanguage(savedLanguage as Language);
    }
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) setFavorites(parsed);
      } catch {
        // Ignore invalid saved favorites.
      }
    }
    if (savedAnalytics) {
      try {
        const parsed = JSON.parse(savedAnalytics);
        if (Array.isArray(parsed)) setAnalyticsEvents(parsed);
      } catch {
        // Ignore invalid analytics history.
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hurma-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("hurma-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("hurma-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("hurma-analytics-events", JSON.stringify(analyticsEvents.slice(-3000)));
  }, [analyticsEvents]);

  useEffect(() => {
    if (activeMenu !== "Скрипты" || scriptFocus === null) return;
    const timer = window.setTimeout(() => {
      document.getElementById(`script-section-${scriptFocus}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 40);
    return () => window.clearTimeout(timer);
  }, [activeMenu, scriptFocus]);

  const resetKnowledge = () => {
    setKnowledgeLevel(1);
    setSelectedSection(null);
    setSelectedArticle(null);
    setKnowledgeSearch("");
  };

  const resetNavigator = () => {
    setNavigatorLevel(1);
    setSelectedNavigatorCategory(null);
    setSelectedNavigatorFlow(null);
  };

  const handleNavigatorCategoryClick = (categoryId: string) => {
    trackUsage({ type: "navigator", id: `category:${categoryId}` });
    setSelectedNavigatorCategory(categoryId);
    setSelectedNavigatorFlow(null);
    setNavigatorLevel(2);
  };

  const handleNavigatorFlowClick = (flowId: string) => {
    trackUsage({ type: "navigator", id: flowId });
    setSelectedNavigatorFlow(flowId);
    setNavigatorLevel(3);
  };

  const navigateHomeView = (view: string) => {
    scrollToTop();
    setActiveMenu("Главная");
    setHomeView(view);
    setHomeSearch("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCallTypeForScriptIndex = (index: number) => {
    if (index === 2) return "consultation" as const;
    if (index === 3 || index === 8 || index === 9) return "request" as const;
    if (index === 4 || index === 10) return "complaint" as const;
    return null;
  };

  const trackUsage = (event: Omit<UsageEvent, "timestamp">) => {
    setAnalyticsEvents((current) => [
      ...current,
      { ...event, timestamp: Date.now() },
    ].slice(-3000));
  };

  const handleMenuClick = (menuId: string) => {
    scrollToTop();
    setActiveMenu(menuId);

    if (menuId === "Главная") {
      setHomeView("home");
      return;
    }

    if (menuId === "База знаний") {
      resetKnowledge();
      resetNavigator();
      setScriptFocus(null);
      setHomeView("home");
      return;
    }

    if (menuId === "Навигатор решений") {
      resetNavigator();
      resetKnowledge();
      setScriptFocus(null);
      setSelectedCallType(null);
      setHomeView("home");
      return;
    }

    resetKnowledge();
    resetNavigator();
    setScriptFocus(null);
    setSelectedCallType(null);
    setHomeView("home");
  };

  const handleSectionClick = (sectionId: string) => {
    trackUsage({ type: "section", id: sectionId });
    setSelectedSection(sectionId);
    setKnowledgeLevel(2);
  };

  const handleArticleClick = (articleId: string) => {
    trackUsage({ type: "article", id: articleId });
    const parentSection = knowledgeSections.find((section) =>
      section.articles.includes(articleId)
    );

    if (parentSection) setSelectedSection(parentSection.id);
    setSelectedArticle(articleId);
    setKnowledgeLevel(3);
  };

  const toggleFavorite = (articleId: string) => {
    setFavorites((current) =>
      current.includes(articleId)
        ? current.filter((item) => item !== articleId)
        : [...current, articleId]
    );
  };

  const selectedSectionData = knowledgeSections.find(
    (section) => section.id === selectedSection
  );

  const selectedArticleData = selectedArticle
    ? articleContent[selectedArticle]
    : null;

  const selectedNavigatorCategoryData = navigatorCategories.find(
    (category) => category.id === selectedNavigatorCategory
  );

  const selectedNavigatorFlowData = selectedNavigatorFlow
    ? navigatorFlows[selectedNavigatorFlow]
    : null;

  const getArticleTitle = (articleId: string) =>
    articleContent[articleId]?.title[language] ?? articleId;

  const getSectionTitle = (sectionId: string) =>
    knowledgeSections.find((section) => section.id === sectionId)?.title[language] ?? sectionId;

  const trackSearchResult = (result: GlobalSearchResult, query: string) => {
    const clean = query.trim();
    if (!clean) return;
    trackUsage({
      type: result.type === "article" ? "article" : result.type === "navigator" ? "navigator" : result.type === "script" ? "script" : result.type === "branch" ? "branch" : "section",
      id: result.id,
      query: clean,
    });
    trackUsage({ type: "search", id: result.type, query: clean });
  };

  const trackNoResultSearch = (query: string, area: string) => {
    const clean = query.trim();
    if (!clean) return;
    trackUsage({ type: "search", id: `${area}:no-result`, query: clean });
  };

  const searchIndex = useMemo(() => {
    const items: Array<{ type: SearchResultType; id: string; title: string; subtitle: string; content: string; keywords: string; articleId?: string; sectionId?: string; flowId?: string; scriptIndex?: number; branch?: (typeof branches)[number]; }> = [];

    for (const section of knowledgeSections) {
      items.push({
        type: "section",
        id: section.id,
        title: section.title[language],
        subtitle: text.knowledgeTitle,
        content: section.description[language],
        keywords: section.articles.map((articleId) => articleContent[articleId]?.title[language] ?? "").join(" "),
        sectionId: section.id,
      });

      for (const articleId of section.articles) {
        const article = articleContent[articleId];
        if (!article) continue;
        const blockTitles = article.blocks.map((block) => block.title[language]);
        const blockItems = article.blocks.flatMap((block) => block.items[language]);
        items.push({
          type: "article",
          id: articleId,
          title: article.title[language],
          subtitle: section.title[language],
          content: [article.intro[language], ...blockTitles, ...blockItems].join(" "),
          keywords: [article.title[language], ...blockTitles].join(" "),
          articleId,
          sectionId: section.id,
        });
      }
    }

    for (const category of navigatorCategories) {
      for (const flowId of category.flows) {
        const flow = navigatorFlows[flowId];
        if (!flow) continue;
        const guide = navigatorRequestGuides[flow.id];
        const guideText = guide
          ? [
              ...guide.required.map((item) => item[language]),
              ...guide.optional.map((item) => item[language]),
              ...guide.documents.map((item) => item[language]),
              ...guide.doNotAsk.map((item) => item[language]),
            ].join(" ")
          : "";
        items.push({
          type: "navigator",
          id: flow.id,
          title: flow.title[language],
          subtitle: category.title[language],
          content: [
            flow.description[language],
            ...flow.steps.flatMap((step) => [
              step.title[language],
              step.text[language],
              step.important?.[language] ?? "",
            ]),
            flow.clientText?.[language] ?? "",
            guideText,
          ].join(" "),
          keywords: [flow.title[language], category.title[language], guideText].join(" "),
          flowId: flow.id,
        });
      }
    }

    scriptSections.forEach((section, index) => {
      items.push({
        type: "script",
        id: `script-${index}`,
        title: section.title[language],
        subtitle: text.searchScript,
        content: section.lines[language].join(" "),
        keywords: section.lines[language].join(" "),
        scriptIndex: index,
      });
    });

    for (const branch of branches) {
      items.push({
        type: "branch",
        id: `branch-${branch.id}`,
        title: branch.name,
        subtitle: `${language === "RU" ? branch.branch : branch.branch.replace(/^филиал/i, "filial")} · ${branch.region}`,
        content: branch.address,
        keywords: [branch.name, branch.branch, branch.region, branch.newName, branch.address, String(branch.id)].join(" "),
        branch,
      });
    }

    return items;
  }, [language, text.knowledgeTitle, text.searchScript]);

  const runGlobalSearch = (query: string, allowedTypes?: SearchResultType[]) => {
    const clean = query.trim();
    if (!clean) return [] as GlobalSearchResult[];

    return searchIndex
      .filter((item) => !allowedTypes || allowedTypes.includes(item.type))
      .map((item) => {
        const scoring = scoreSearchItem(clean, item);
        const previewParts = item.type === "article"
          ? item.content.split(/(?<=[.!?])\\s+/)
          : item.type === "script"
          ? item.content.split(/(?<=[.!?])\\s+/)
          : [item.content];
        const preview = buildSearchPreview(clean, previewParts, scoring.matchedTerms);
        return {
          type: item.type,
          id: item.id,
          title: item.title,
          category: item.subtitle,
          preview,
          score: scoring.score,
          matchedTerms: scoring.matchedTerms,
          articleId: item.articleId,
          sectionId: item.sectionId,
          flowId: item.flowId,
          scriptIndex: item.scriptIndex,
          branch: item.branch,
        };
      })
      .filter((result) => result.score >= 8)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  };

  const homeSearchResults = useMemo(
    () => runGlobalSearch(homeSearch),
    [homeSearch, searchIndex]
  );

  const knowledgeSearchResults = useMemo(
    () => runGlobalSearch(knowledgeSearch, ["article", "section"]),
    [knowledgeSearch, searchIndex]
  );

  const filteredKnowledgeSections = useMemo(() => {
    if (!knowledgeSearch.trim()) return knowledgeSections;
    const matchedSectionIds = new Set(knowledgeSearchResults.map((result) => result.sectionId).filter(Boolean));
    return knowledgeSections.filter((section) => matchedSectionIds.has(section.id));
  }, [knowledgeSearch, knowledgeSearchResults]);

  const searchSuggestion = useMemo(() => {
    const results = homeSearchResults;
    if (!homeSearch.trim() || !results.length) return null;
    const normalizedQuery = normalize(homeSearch);
    const top = results[0];
    if (normalize(top.title).includes(normalizedQuery)) return null;
    return top.title;
  }, [homeSearch, homeSearchResults]);

  const contractSearchResults = useMemo(() => {
    const query = contractSearch.trim();
    if (!query) return [];

    return contractKeyPoints
      .map((item) => {
        const result = scoreSearchItem(query, {
          title: item.title[language],
          content: item.text[language],
          subtitle: item.source[language],
          keywords: item.keywords,
        });
        return { ...item, ...result };
      })
      .filter((item) => item.score >= 12)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [contractSearch, language]);

  const analyticsSince = analyticsPeriod === "7d"
    ? Date.now() - 7 * 24 * 60 * 60 * 1000
    : analyticsPeriod === "30d"
    ? Date.now() - 30 * 24 * 60 * 60 * 1000
    : 0;

  const analyticsVisibleEvents = analyticsEvents.filter((event) => event.timestamp >= analyticsSince);

  const aggregateAnalytics = (events: UsageEvent[], key: "id" | "query") => {
    const counts = new Map<string, number>();
    events.forEach((event) => {
      const value = event[key];
      if (!value) return;
      counts.set(value, (counts.get(value) ?? 0) + 1);
    });
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  };

  const analyticsSearchEvents = analyticsVisibleEvents.filter((event) => event.type === "search" && event.query && !event.id.endsWith(":no-result"));
  const analyticsArticleEvents = analyticsVisibleEvents.filter((event) => event.type === "article");
  const analyticsNavigatorEvents = analyticsVisibleEvents.filter((event) => event.type === "navigator" && !event.id.startsWith("category:"));
  const analyticsScriptEvents = analyticsVisibleEvents.filter((event) => event.type === "script");
  const analyticsContractEvents = analyticsVisibleEvents.filter((event) => event.type === "contract");
  const analyticsZeroSearches = analyticsVisibleEvents.filter((event) => event.type === "search" && event.id.endsWith(":no-result") && event.query);

  const analyticsTopSearches = aggregateAnalytics(analyticsSearchEvents, "query").slice(0, 6);
  const analyticsTopArticles = aggregateAnalytics(analyticsArticleEvents, "id").slice(0, 6);
  const analyticsTopNavigator = aggregateAnalytics(analyticsNavigatorEvents, "id").slice(0, 6);
  const analyticsTopScripts = aggregateAnalytics(analyticsScriptEvents, "id").slice(0, 6);
  const analyticsTopContracts = aggregateAnalytics(analyticsContractEvents, "id").slice(0, 6);
  const analyticsNoResultQueries = aggregateAnalytics(analyticsZeroSearches, "query").slice(0, 6);


  const openManagementChangeTarget = (target: string) => {
    scrollToTop();

    if (target === "analytics") {
      setActiveMenu("Аналитика");
      setHomeView("home");
      return;
    }

    if (target === "navigator") {
      const flowId = "branch-problem";
      setActiveMenu("Навигатор решений");
      setSelectedNavigatorCategory(navigatorFlows[flowId]?.categoryId ?? null);
      setSelectedNavigatorFlow(flowId);
      setNavigatorLevel(3);
      return;
    }

    if (target === "online-payment") {
      setActiveMenu("База знаний");
      setSelectedSection(null);
      setSelectedArticle("online-payment");
      setKnowledgeLevel(3);
      return;
    }

    if (target === "calculator") {
      setActiveMenu("Главная");
      setHomeView("calculator");
      return;
    }

    if (target === "bz") {
      setActiveMenu("База знаний");
      setSelectedSection(null);
      setSelectedArticle("loan-eligibility");
      setKnowledgeLevel(3);
      return;
    }

    if (target === "management") {
      setActiveMenu("Управление базой");
      setHomeView("home");
    }
  };

  const regions = useMemo(() => {
    const values = Array.from(
      new Set(branches.map((branch) => branch.region).filter(Boolean))
    );
    return ["__ALL__", ...values];
  }, []);

  const filteredBranches = useMemo(() => {
    const query = normalize(branchSearch);

    return branches.filter((branch) => {
      const matchesRegion =
        branchRegion === "__ALL__" || branch.region === branchRegion;

      const matchesSearch =
        !query ||
        normalize(branch.name).includes(query) ||
        normalize(branch.branch).includes(query) ||
        normalize(branch.region).includes(query) ||
        normalize(branch.address).includes(query) ||
        normalize(branch.newName).includes(query) ||
        String(branch.id).includes(query);

      return matchesRegion && matchesSearch;
    });
  }, [branchSearch, branchRegion]);

  const amountNumber = Number(loanAmount.replace(/\D/g, "")) || 0;
  const amountDisplay = amountNumber ? formatMoney(amountNumber, language) : "";
  const daysNumber = Math.min(
    30,
    Math.max(1, Number(loanDays.replace(/\D/g, "")) || 1)
  );

  const selectedProduct =
    loanProducts.find(
      (product) =>
        amountNumber >= product.min && amountNumber <= product.max
    ) || null;

  const dailyInterest = selectedProduct
    ? amountNumber * selectedProduct.dailyRate
    : 0;

  const monthlyInterest = selectedProduct
    ? amountNumber * selectedProduct.monthlyRate
    : 0;

  const totalInterest = dailyInterest * daysNumber;
  const totalDue = amountNumber + totalInterest;

  const penaltyPrincipalNumber = Number(penaltyPrincipal.replace(/\D/g, "")) || 0;
  const selectedPenaltyProduct =
    loanProducts.find(
      (product) =>
        penaltyPrincipalNumber >= product.min && penaltyPrincipalNumber <= product.max
    ) || null;
  const penaltyInterestNumber = selectedPenaltyProduct
    ? penaltyPrincipalNumber * selectedPenaltyProduct.monthlyRate
    : 0;
  const penaltyBaseAmount = penaltyPrincipalNumber + penaltyInterestNumber;
  const penaltyReady = penaltyPrincipalNumber > 0 && Boolean(selectedPenaltyProduct);
  const penaltyRateNumber = 0.008;
  const penaltyOneDay = penaltyBaseAmount * penaltyRateNumber;
  const penaltyPrincipalDisplay = penaltyPrincipalNumber ? formatMoney(penaltyPrincipalNumber, language) : "";

  const cardClass = "rounded-2xl border transition-all duration-200 hover:-translate-y-0.5";

  const inputClass = `w-full h-12 rounded-xl border px-4 outline-none text-sm ${
    darkMode
      ? "bg-[#18181b] border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
      : "bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-300"
  }`;

  const highlightSearchText = (value: string, terms: string[], isDark: boolean) => {
    const cleanTerms = unique(terms)
      .filter((term) => term.length >= 2)
      .sort((a, b) => b.length - a.length)
      .slice(0, 8);
    if (!cleanTerms.length) return value;
    const pattern = new RegExp(`(${cleanTerms.map(escapeRegExp).join("|")})`, "giu");
    return value.split(pattern).map((part, index) =>
      cleanTerms.some((term) => normalize(part) === normalize(term))
        ? <mark key={index} className={`rounded px-0.5 ${isDark ? "bg-orange-900/50 text-orange-200" : "bg-orange-100 text-orange-900"}`}>{part}</mark>
        : <span key={index}>{part}</span>
    );
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        darkMode
          ? "bg-[#111113] text-zinc-100"
          : "bg-[#f7f7f8] text-zinc-900"
      }`}
    >
      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-40 w-[270px] h-screen flex flex-col border-r ${
          darkMode
            ? "bg-[#18181b] border-zinc-800"
            : "bg-white border-zinc-200"
        }`}
      >
        <div
          className={`h-[82px] px-7 flex flex-col justify-center border-b ${
            darkMode ? "border-zinc-800" : "border-zinc-200"
          }`}
        >
          <div className="text-[22px] font-black tracking-tight">HURMA</div>
          <div
            className={`text-[10px] uppercase tracking-[0.18em] mt-1 ${
              darkMode ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            Lombard
          </div>
        </div>

        <nav className="p-4 flex-1">
          <div
            className={`px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] ${
              darkMode ? "text-zinc-600" : "text-zinc-400"
            }`}
          >
            {text.mainMenu}
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const active = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition ${
                    active
                      ? darkMode
                        ? "bg-orange-900/35 text-orange-200 ring-1 ring-orange-800/60"
                        : "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                      : darkMode
                      ? "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <span className="w-5 text-center">{item.icon}</span>
                  <span className={active ? "font-semibold" : "font-medium"}>
                    {item[language]}
                  </span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div
          className={`p-4 border-t ${
            darkMode ? "border-zinc-800" : "border-zinc-200"
          }`}
        >
          <div
            className={`rounded-xl p-4 ${
              darkMode ? "bg-zinc-900" : "bg-zinc-50"
            }`}
          >
            <div className="text-xs font-semibold">{text.contactCenter}</div>
            <div
              className={`text-[11px] mt-1 leading-5 ${
                darkMode ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              {text.workKnowledge}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 min-w-0 ml-[270px]">
        <header
          className={`sticky top-0 z-30 h-[82px] border-b ${
            darkMode
              ? "bg-[#18181b] border-zinc-800"
              : "bg-white border-zinc-200"
          }`}
        >
          <div className="h-full w-full max-w-[1250px] mx-auto px-8 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{text.internalSystem}</div>
              <div
                className={`text-[11px] mt-1 ${
                  darkMode ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                {text.knowledgeBaseContact}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`flex items-center p-1 rounded-lg border ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700"
                    : "bg-zinc-50 border-zinc-200"
                }`}
              >
                <button
                  onClick={() => setLanguage("RU")}
                  className={`px-3 py-1.5 rounded-md text-xs ${
                    language === "RU"
                      ? darkMode
                        ? "bg-zinc-700 text-white"
                        : "bg-white text-zinc-900 shadow-sm"
                      : darkMode
                      ? "text-zinc-500"
                      : "text-zinc-400"
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage("UZ")}
                  className={`px-3 py-1.5 rounded-md text-xs ${
                    language === "UZ"
                      ? darkMode
                        ? "bg-zinc-700 text-white"
                        : "bg-white text-zinc-900 shadow-sm"
                      : darkMode
                      ? "text-zinc-500"
                      : "text-zinc-400"
                  }`}
                >
                  UZ
                </button>
              </div>

              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                  darkMode
                    ? "bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
                    : "bg-white border-zinc-200 hover:bg-zinc-50"
                }`}
                aria-label="theme"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              <div
                className={`ml-2 pl-4 border-l flex items-center gap-3 ${
                  darkMode ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm">
                  О
                </div>
                <div className="hidden lg:block">
                  <div className="text-xs font-semibold">{text.operator}</div>
                  <div
                    className={`text-[11px] mt-0.5 ${
                      darkMode ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    {text.contactCenter}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full max-w-[1250px] mx-auto px-8 py-10">
          {/* HOME */}
          {activeMenu === "Главная" && homeView === "home" && (
            <div>
              <section className="mb-8">
                <h1 className="text-[32px] leading-tight font-bold tracking-tight">
                  {text.welcome}
                </h1>
                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {text.welcomeText}
                </p>
              </section>

              <section className="mb-10 relative">
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">
                    🔎
                  </span>
                  <input
                    value={homeSearch}
                    onChange={(e) => setHomeSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (!homeSearchResults.length) trackNoResultSearch(homeSearch, "global");
                        else trackUsage({ type: "search", id: "global", query: homeSearch.trim() });
                      }
                    }}
                    type="text"
                    placeholder={text.homeSearchPlaceholder}
                    className={`${inputClass} h-[60px] pl-14 pr-5 rounded-2xl`}
                  />
                </div>

                {homeSearch.trim() && (
                  <div
                    className={`absolute z-30 left-0 right-0 mt-2 rounded-2xl border overflow-hidden shadow-xl ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800"
                        : "bg-white border-zinc-200"
                    }`}
                  >
                    {searchSuggestion && (
                      <button
                        type="button"
                        onClick={() => setHomeSearch(searchSuggestion)}
                        className={`w-full px-5 py-3 text-left text-xs border-b ${
                          darkMode ? "border-zinc-800 hover:bg-zinc-900" : "border-zinc-100 hover:bg-zinc-50"
                        }`}
                      >
                        <span className="text-zinc-400">{text.searchDidYouMean}:</span> {searchSuggestion}
                      </button>
                    )}

                    {homeSearchResults.length > 0 ? (
                      <div>
                        <div className={`px-5 py-3 border-b ${
                          darkMode ? "border-zinc-800 bg-zinc-950/40" : "border-zinc-100 bg-zinc-50"
                        }`}>
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange-500">
                                {language === "RU" ? "Результаты поиска" : "Qidiruv natijalari"}
                              </div>
                              <div className={`text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                                {language === "RU"
                                  ? "Сначала показываем наиболее подходящие материалы."
                                  : "Avval eng mos materiallar ko‘rsatiladi."}
                              </div>
                            </div>
                            <span className={`text-[11px] rounded-full px-2.5 py-1 ${
                              darkMode ? "bg-zinc-900 text-zinc-400" : "bg-white text-zinc-500 border border-zinc-200"
                            }`}>
                              {homeSearchResults.length}
                            </span>
                          </div>
                        </div>

                        <div className="max-h-[68vh] overflow-y-auto">
                          {homeSearchResults.map((result, resultIndex) => (
                            <button
                              key={`${result.type}-${result.id}`}
                              type="button"
                              onClick={() => {
                                trackSearchResult(result, homeSearch);
                                if (result.type === "article" && result.articleId) {
                                  setActiveMenu("База знаний");
                                  handleArticleClick(result.articleId);
                                  scrollToTop();
                                } else if (result.type === "section" && result.sectionId) {
                                  setActiveMenu("База знаний");
                                  handleSectionClick(result.sectionId);
                                  scrollToTop();
                                } else if (result.type === "navigator" && result.flowId) {
                                  setHomeSearch("");
                                  setActiveMenu("Навигатор решений");
                                  setSelectedNavigatorFlow(result.flowId);
                                  setSelectedNavigatorCategory(navigatorFlows[result.flowId]?.categoryId ?? null);
                                  setNavigatorLevel(3);
                                  scrollToTop();
                                } else if (result.type === "script" && result.scriptIndex !== undefined) {
                                  setHomeSearch("");
                                  setScriptFocus(result.scriptIndex);
                                  setSelectedCallType(getCallTypeForScriptIndex(result.scriptIndex));
                                  setActiveMenu("Скрипты");
                                  scrollToTop();
                                } else if (result.type === "branch" && result.branch) {
                                  setHomeSearch("");
                                  setBranchSearch(result.branch.name);
                                  setActiveMenu("Главная");
                                  setHomeView("branches");
                                  scrollToTop();
                                }
                                setHomeSearch("");
                              }}
                              className={`w-full text-left px-5 py-4 border-b border-l-4 transition ${
                                resultIndex === 0
                                  ? darkMode
                                    ? "border-l-orange-600 bg-orange-950/15 border-b-zinc-800 hover:bg-orange-950/25"
                                    : "border-l-orange-500 bg-orange-50/70 border-b-zinc-100 hover:bg-orange-50"
                                  : darkMode
                                  ? "border-l-transparent border-b-zinc-800 hover:bg-zinc-900"
                                  : "border-l-transparent border-b-zinc-100 hover:bg-zinc-50"
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm ${
                                  resultIndex === 0
                                    ? darkMode ? "bg-orange-900/50 text-orange-200" : "bg-orange-100 text-orange-700"
                                    : darkMode ? "bg-zinc-900" : "bg-zinc-100"
                                }`}>
                                  {result.type === "branch" ? "📍" : result.type === "navigator" ? "🧭" : result.type === "script" ? "🗣" : result.type === "section" ? "📚" : "📄"}
                                </span>

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <div className="text-sm font-bold">
                                      {result.title}
                                    </div>
                                    {resultIndex === 0 && (
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white">
                                        {language === "RU" ? "Лучшее совпадение" : "Eng mos"}
                                      </span>
                                    )}
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                      darkMode ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500"
                                    }`}>
                                      {getSearchTypeLabel(result.type, text)}
                                    </span>
                                  </div>

                                  <div className={`mt-1 text-xs font-medium ${
                                    darkMode ? "text-zinc-500" : "text-zinc-400"
                                  }`}>
                                    {result.category}
                                  </div>

                                  <div className={`mt-3 rounded-xl border px-3.5 py-3 ${
                                    darkMode
                                      ? "bg-zinc-950/60 border-zinc-800 text-zinc-300"
                                      : "bg-white border-zinc-200 text-zinc-600"
                                  }`}>
                                    <div className="text-[10px] uppercase tracking-wide font-semibold text-orange-500 mb-1.5">
                                      {language === "RU" ? "Найденный фрагмент" : "Topilgan parcha"}
                                    </div>
                                    <div className="text-xs leading-5 line-clamp-3">
                                      {result.preview
                                        ? highlightSearchText(result.preview, result.matchedTerms, darkMode)
                                        : (language === "RU" ? "Откройте материал для просмотра." : "Ma’lumotni ko‘rish uchun materialni oching.")}
                                    </div>
                                  </div>
                                </div>

                                <span className={`text-sm shrink-0 mt-1 ${resultIndex === 0 ? "text-orange-500" : darkMode ? "text-zinc-600" : "text-zinc-400"}`}>→</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="px-5 py-8 text-center">
                        <div className="text-3xl mb-2">🔎</div>
                        <div className="text-sm font-medium">{text.searchNothing}</div>
                        <div className={`text-xs mt-2 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                          {text.tryAnother}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>

              <section>
                <div className="mb-5">
                  <h2 className="text-lg font-semibold">{text.quickAccess}</h2>
                  <p
                    className={`text-xs mt-1 ${
                      darkMode ? "text-zinc-500" : "text-zinc-400"
                    }`}
                  >
                    {text.quickAccessText}
                  </p>
                </div>

                {/* 2 x 2 + centered 5th card */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <button
                    onClick={() => navigateHomeView("calculator")}
                    className={`${cardClass} md:col-span-2 h-[220px] p-7 text-left ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl">🧮</div>
                      <span className="text-zinc-300 text-lg">→</span>
                    </div>
                    <h3 className="mt-7 text-lg font-semibold">{text.calculator}</h3>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                      {text.calculatorText}
                    </p>
                  </button>

                  <button
                    onClick={() => navigateHomeView("favorites")}
                    className={`${cardClass} md:col-span-2 h-[220px] p-7 text-left ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl">⭐</div>
                      <span className="text-zinc-300 text-lg">→</span>
                    </div>
                    <h3 className="mt-7 text-lg font-semibold">{text.favorites}</h3>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                      {text.favoritesText}
                    </p>
                  </button>

                  <button
                    onClick={() => navigateHomeView("company")}
                    className={`${cardClass} md:col-span-2 h-[220px] p-7 text-left ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl">🏢</div>
                      <span className="text-zinc-300 text-lg">→</span>
                    </div>
                    <h3 className="mt-7 text-lg font-semibold">{text.company}</h3>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                      {text.companyCardText}
                    </p>
                  </button>

                  <button
                    onClick={() => navigateHomeView("contract")}
                    className={`${cardClass} md:col-span-2 h-[220px] p-7 text-left ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl">📄</div>
                      <span className="text-zinc-300 text-lg">→</span>
                    </div>
                    <h3 className="mt-7 text-lg font-semibold">{text.contract}</h3>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                      {text.contractCardText}
                    </p>
                  </button>

                  <button
                    onClick={() => navigateHomeView("branches")}
                    className={`${cardClass} md:col-span-2 md:col-start-2 h-[220px] p-7 text-left ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl">📍</div>
                      <span className="text-zinc-300 text-lg">→</span>
                    </div>
                    <h3 className="mt-7 text-lg font-semibold">{text.branches}</h3>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                      {text.branchesCardText}
                    </p>
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* CALCULATOR */}
          {activeMenu === "Главная" && homeView === "calculator" && (
            <div>
              <button
                onClick={() => setHomeView("home")}
                className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}
              >
                ← {text.welcome.replace(" 👋", "")}
              </button>

              <section className="mb-8">
                <h1 className="text-[32px] font-bold tracking-tight">
                  {calculatorMode === "loan" ? text.loanCalculator : text.penaltyCalculatorTitle}
                </h1>
                <p className={`mt-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  {calculatorMode === "loan" ? text.loanCalculatorText : text.penaltyCalculatorText}
                </p>
              </section>

              <div className={`mb-6 flex flex-wrap gap-2 p-1 rounded-xl border w-fit ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                <button
                  onClick={() => setCalculatorMode("loan")}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    calculatorMode === "loan"
                      ? darkMode
                        ? "bg-white text-zinc-900"
                        : "bg-white text-zinc-900 shadow-sm"
                      : darkMode
                        ? "text-zinc-400 hover:text-white"
                        : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {text.calculatorLoanTab}
                </button>
                <button
                  onClick={() => setCalculatorMode("penalty")}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    calculatorMode === "penalty"
                      ? darkMode
                        ? "bg-white text-zinc-900"
                        : "bg-white text-zinc-900 shadow-sm"
                      : darkMode
                        ? "text-zinc-400 hover:text-white"
                        : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  {text.calculatorPenaltyTab}
                </button>
              </div>

              {calculatorMode === "loan" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <section
                  className={`lg:col-span-2 p-7 rounded-2xl border ${
                    darkMode
                      ? "bg-[#18181b] border-zinc-800"
                      : "bg-white border-zinc-200"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label>
                      <span className="text-sm font-medium">{text.loanAmount}</span>
                      <input
                        value={amountDisplay}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        inputMode="numeric"
                        className={`${inputClass} mt-2`}
                        placeholder="5 000 000"
                      />
                    </label>

                    <label>
                      <span className="text-sm font-medium">{text.loanDays}</span>
                      <input
                        value={daysNumber}
                        onChange={(e) => setLoanDays(e.target.value)}
                        inputMode="numeric"
                        className={`${inputClass} mt-2`}
                        min={1}
                        max={30}
                      />
                    </label>
                  </div>

                  <div
                    className={`mt-6 p-5 rounded-xl ${
                      darkMode ? "bg-zinc-900" : "bg-zinc-50"
                    }`}
                  >
                    {selectedProduct ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <div className="text-xs text-zinc-400">{text.loanProduct}</div>
                          <div className="mt-1 text-lg font-semibold">{selectedProduct.name}</div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-400">{text.dailyRate}</div>
                          <div className="mt-1 text-lg font-semibold">
                            {formatRate(selectedProduct.dailyRate * 100, language)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-zinc-400">{text.amountOut}</div>
                    )}
                  </div>
                </section>

                <section
                  className={`p-7 rounded-2xl border ${
                    darkMode
                      ? "bg-[#18181b] border-zinc-800"
                      : "bg-white border-zinc-200"
                  }`}
                >
                  {selectedProduct ? (
                    <>
                      <div className="space-y-5">
                        <div>
                          <div className="text-xs text-zinc-400">{text.dailyAccrual}</div>
                          <div className="mt-1 text-xl font-semibold">
                            {formatMoney(dailyInterest, language)} {language === "RU" ? "сум" : "so‘m"}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-zinc-400">{text.monthlyAccrual}</div>
                          <div className="mt-1 text-xl font-semibold">
                            {formatMoney(monthlyInterest, language)} {language === "RU" ? "сум" : "so‘m"}
                          </div>
                        </div>

                        <div className={`pt-5 border-t ${darkMode ? "border-zinc-800" : "border-zinc-200"}`}>
                          <div className="text-xs text-zinc-400">{text.interest}</div>
                          <div className="mt-1 text-xl font-semibold">
                            {formatMoney(totalInterest, language)} {language === "RU" ? "сум" : "so‘m"}
                          </div>
                          <div className="mt-1 text-xs text-zinc-400">
                            {daysNumber} {language === "RU" ? "дн." : "kun"}
                          </div>
                        </div>
                      </div>

                      <div className={`mt-6 rounded-2xl border p-5 ${darkMode ? "bg-red-950/20 border-red-900/40" : "bg-red-50 border-red-100"}`}>
                        <div className={`text-xs font-medium ${darkMode ? "text-red-300" : "text-red-600"}`}>
                          {text.total}
                        </div>
                        <div className={`mt-2 text-3xl font-bold ${darkMode ? "text-red-300" : "text-red-700"}`}>
                          {formatMoney(totalDue, language)} {language === "RU" ? "сум" : "so‘m"}
                        </div>
                        <div className={`mt-1 text-xs ${darkMode ? "text-red-300/70" : "text-red-600/80"}`}>
                          {text.selectedPeriod}: {daysNumber} {language === "RU" ? "дн." : "kun"}
                        </div>
                      </div>

                      <p className={`mt-6 text-xs leading-5 ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                        {text.calculatorHint}
                      </p>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        <div className="text-3xl mb-3">🧮</div>
                        <div className="text-sm font-semibold">{text.amountOut}</div>
                        <p className="text-xs text-zinc-400 mt-2">
                          {language === "RU"
                            ? "Введите сумму в диапазоне от 300 000 до 100 000 000 сум."
                            : "300 000 dan 100 000 000 so‘m oralig‘idagi summani kiriting."}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <section
                    className={`lg:col-span-2 p-7 rounded-2xl border ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800"
                        : "bg-white border-zinc-200"
                    }`}
                  >
                    <label>
                      <span className="text-sm font-medium">{text.principalDebt}</span>
                      <input
                        value={penaltyPrincipalDisplay}
                        onChange={(e) => setPenaltyPrincipal(e.target.value)}
                        inputMode="numeric"
                        className={`${inputClass} mt-2`}
                        placeholder="8 000 000"
                      />
                    </label>

                    <div className={`mt-5 rounded-2xl border p-5 ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <div className="text-xs text-zinc-400">{text.loanProduct}</div>
                          <div className="mt-1 text-lg font-semibold">
                            {selectedPenaltyProduct ? selectedPenaltyProduct.name : "—"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-400">{text.productRate}</div>
                          <div className="mt-1 text-lg font-semibold">
                            {selectedPenaltyProduct
                              ? `${(selectedPenaltyProduct.monthlyRate * 100).toLocaleString(language === "RU" ? "ru-RU" : "uz-UZ", { maximumFractionDigits: 2 })}% / 30 ${language === "RU" ? "дн." : "kun"}`
                              : "—"}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-400">{text.productInterest}</div>
                          <div className="mt-1 text-lg font-semibold">
                            {penaltyReady
                              ? `${formatMoney(penaltyInterestNumber, language)} ${language === "RU" ? "сум" : "so‘m"}`
                              : "—"}
                          </div>
                        </div>
                      </div>

                      <div className={`mt-5 pt-5 border-t ${darkMode ? "border-zinc-800" : "border-zinc-200"}`}>
                        <div className="text-xs text-zinc-400">{text.penaltyFormulaBase}</div>
                        <div className="mt-2 text-sm font-medium break-words">
                          {penaltyReady
                            ? `${formatMoney(penaltyPrincipalNumber, language)} + ${formatMoney(penaltyInterestNumber, language)} = ${formatMoney(penaltyBaseAmount, language)} ${language === "RU" ? "сум" : "so‘m"}`
                            : (language === "RU"
                                ? "Введите сумму займа в диапазоне от 300 000 до 100 000 000 сум"
                                : "300 000 dan 100 000 000 so‘mgacha kredit summasini kiriting")}
                        </div>
                      </div>
                    </div>

                    <p className={`mt-4 text-xs leading-5 font-medium ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      {text.penaltyAfterTermNote}
                    </p>
                  </section>

                  <section
                    className={`p-7 rounded-2xl border ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800"
                        : "bg-white border-zinc-200"
                    }`}
                  >
                    <div className="space-y-5">
                      <div>
                        <div className="text-xs text-zinc-400">{text.penaltyStepOne}</div>
                        <div className="mt-2 text-sm font-medium">
                          {penaltyReady
                            ? `${formatMoney(penaltyPrincipalNumber, language)} + ${formatMoney(penaltyInterestNumber, language)} = ${formatMoney(penaltyBaseAmount, language)} ${language === "RU" ? "сум" : "so‘m"}`
                            : "—"}
                        </div>
                        {selectedPenaltyProduct && (
                          <div className="mt-2 text-xs text-zinc-400">
                            {text.loanProduct}: <span className="font-medium text-zinc-700 dark:text-zinc-200">{selectedPenaltyProduct.name}</span>
                          </div>
                        )}
                      </div>

                      <div className={`pt-5 border-t ${darkMode ? "border-zinc-800" : "border-zinc-200"}`}>
                        <div className="text-xs text-zinc-400">{text.penaltyStepTwo}</div>
                        <div className="mt-2 text-sm font-medium">
                          {penaltyReady ? `${formatMoney(penaltyBaseAmount, language)} ${language === "RU" ? "сум" : "so‘m"} ${text.penaltyFormulaRate} =` : "—"}
                        </div>
                        <div className="mt-2 text-2xl font-bold">
                          {penaltyReady ? `${formatMoney(penaltyOneDay, language)} ${language === "RU" ? "сум" : "so‘m"}` : "—"}
                        </div>
                      </div>
                    </div>

                    <div className={`mt-6 rounded-2xl border p-5 ${darkMode ? "bg-red-950/20 border-red-900/40" : "bg-red-50 border-red-100"}`}>
                      <div className={`text-sm font-semibold leading-6 ${darkMode ? "text-red-300" : "text-red-700"}`}>
                        {text.penaltyWarning}
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}

          {/* FAVORITES */}
          {activeMenu === "Главная" && homeView === "favorites" && (
            <div>
              <button onClick={() => setHomeView("home")} className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                ← {language === "RU" ? "На главную" : "Bosh sahifaga"}
              </button>
              <section className="mb-8">
                <h1 className="text-[32px] font-bold tracking-tight">{text.favorites}</h1>
                <p className={`mt-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                  {text.favoritesText}
                </p>
              </section>

              {favorites.length === 0 ? (
                <section className={`rounded-2xl border min-h-[350px] flex items-center justify-center text-center p-8 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <div>
                    <div className="text-4xl mb-4">⭐</div>
                    <div className="font-semibold">{text.emptyFavorites}</div>
                    <div className="text-xs text-zinc-400 mt-2">{text.emptyFavoritesText}</div>
                  </div>
                </section>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {favorites.map((articleId) => (
                    <button
                      key={articleId}
                      onClick={() => {
                        setActiveMenu("База знаний");
                        setHomeView("home");
                        handleArticleClick(articleId);
                      }}
                      className={`p-6 rounded-2xl border text-left transition ${darkMode ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700" : "bg-white border-zinc-200 hover:border-zinc-300"}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold">{getArticleTitle(articleId)}</div>
                          <div className="text-xs text-zinc-400 mt-2">{text.openArticle}</div>
                        </div>
                        <span className="text-lg">★</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* COMPANY */}
          {activeMenu === "Главная" && homeView === "company" && (
            <div>
              <button onClick={() => setHomeView("home")} className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                ← {language === "RU" ? "На главную" : "Bosh sahifaga"}
              </button>

              <section className="mb-8">
                <h1 className="text-[32px] font-bold tracking-tight">{companyInfo[language].subtitle}</h1>
                <p className={`mt-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>Hurma Lombard</p>
              </section>

              <div className="space-y-5">
                <section className={`p-7 rounded-2xl border ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <h2 className="text-xl font-semibold mb-5">{text.whoWeAre}</h2>
                  <div className="space-y-4 text-sm leading-7 whitespace-pre-line">
                    {companyInfo[language].about}
                  </div>
                </section>

                <section className={`p-7 rounded-2xl border ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <h2 className="text-xl font-semibold mb-5">{text.mission}</h2>
                  <p className="text-sm leading-7">{companyInfo[language].mission}</p>
                </section>
              </div>
            </div>
          )}

          {/* CONTRACT */}
          {activeMenu === "Главная" && homeView === "contract" && (
            <div>
              <button onClick={() => setHomeView("home")} className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                ← {language === "RU" ? "На главную" : "Bosh sahifaga"}
              </button>

              <section className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div>
                    <div className="text-4xl mb-3">📄</div>
                    <h1 className="text-[32px] font-bold tracking-tight">{language === "RU" ? "Договор и залоговый билет" : "Shartnoma va garov bileti"}</h1>
                    <p className={`mt-2 max-w-4xl text-sm leading-7 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{articleContent["contract-basics"].intro[language]}</p>
                  </div>
                  <div className={`text-xs px-3 py-2 rounded-xl border shrink-0 ${darkMode ? "border-zinc-800 bg-zinc-900 text-zinc-400" : "border-zinc-200 bg-zinc-50 text-zinc-500"}`}>
                    {language === "RU" ? "Источник: договор микрозайма и залоговый билет" : "Manba: mikrokredit shartnomasi va garov bileti"}
                  </div>
                </div>
              </section>

              <div className="space-y-6">
                <section className={`rounded-2xl border p-6 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🔎</div>
                    <div>
                      <h2 className="text-xl font-semibold">{language === "RU" ? "Поиск по договору" : "Shartnoma bo‘yicha qidiruv"}</h2>
                      <p className={`mt-1 text-sm ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>{language === "RU" ? "Введите слово или фразу из нужного положения. Поиск учитывает близкие формулировки и опечатки и показывает соответствующий пункт договора." : "Kerakli bandga oid so‘z yoki iborani kiriting. Qidiruv yaqin formulirovkalar va xatolarni hisobga olib, mos shartnoma bandini ko‘rsatadi."}</p>
                    </div>
                  </div>
                  <div className="mt-5 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">🔎</span>
                    <input
                      value={contractSearch}
                      onChange={(e) => setContractSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (!contractSearchResults.length) trackNoResultSearch(contractSearch, "contract");
                          else trackUsage({ type: "search", id: "contract", query: contractSearch.trim() });
                        }
                      }}
                      placeholder={language === "RU" ? "Например: пеня, срок займа, продление, ставка..." : "Masalan: penya, kredit muddati, uzaytirish, stavka..."}
                      className={`${inputClass} pl-11 h-12`}
                    />
                  </div>

                  {contractSearch.trim() && (
                    <div className="mt-5 space-y-3">
                      {contractSearchResults.length > 0 ? contractSearchResults.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            trackUsage({ type: "contract", id: item.id, query: contractSearch.trim() });
                            const el = document.getElementById(`contract-point-${item.id}`);
                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          className={`w-full text-left rounded-xl border p-5 transition ${darkMode ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700" : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"}`}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                            <div>
                              <div className="text-base font-semibold">{item.title[language]}</div>
                            </div>
                            <div className={`text-xs shrink-0 px-3 py-1.5 rounded-lg border ${darkMode ? "border-zinc-700 text-zinc-400" : "border-zinc-200 text-zinc-500"}`}>{item.source[language]}</div>
                          </div>
                          <p className={`mt-3 text-sm leading-7 whitespace-pre-wrap ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>{highlightSearchText(item.text[language], item.matchedTerms, darkMode)}</p>
                          <div className={`mt-3 text-xs font-medium ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>{language === "RU" ? "Перейти к этому пункту ↓" : "Ushbu bandga o‘tish ↓"}</div>
                        </button>
                      )) : (
                        <div className={`rounded-xl border p-5 text-sm ${darkMode ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-zinc-50 border-zinc-200 text-zinc-500"}`}>
                          {language === "RU" ? "Ничего не найдено. Попробуйте: «пеня», «срок займа», «продление», «ставка», «частичное погашение», «залог»." : "Mos ma’lumot topilmadi. Quyidagi so‘zlardan foydalanib ko‘ring: «penya», «kredit muddati», «uzaytirish», «stavka», «qisman to‘lash», «garov»."}
                        </div>
                      )}
                    </div>
                  )}
                </section>

                <section className={`rounded-2xl border p-7 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <div className="mb-5">
                    <h2 className="text-xl font-semibold">{language === "RU" ? "Ключевые положения для оператора" : "Operator uchun muhim bandlar"}</h2>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>{language === "RU" ? "Здесь собраны важные положения из договора и залогового билета в исходной формулировке. У каждого положения указан точный пункт документа." : "Bu yerda shartnoma va garov biletidagi muhim bandlar asl formulirovkada jamlangan. Har bir bandning aniq manbasi ko‘rsatilgan."}</p>
                  </div>

                  <div className="space-y-4">
                    {contractKeyPoints.map((item, index) => (
                      <section id={`contract-point-${item.id}`} key={item.id} className={`rounded-xl border p-5 ${darkMode ? "bg-zinc-900/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"}`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-sm font-bold ${darkMode ? "bg-zinc-800 text-white" : "bg-white text-zinc-700 border border-zinc-200"}`}>{index + 1}</div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                              <h3 className="text-base font-semibold">{item.title[language]}</h3>
                              <span className={`text-xs px-2.5 py-1 rounded-lg border shrink-0 ${darkMode ? "border-zinc-700 text-zinc-400" : "border-zinc-200 text-zinc-500 bg-white"}`}>{item.source[language]}</span>
                            </div>
                            <p className={`mt-3 text-[15px] leading-7 whitespace-pre-wrap ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>{contractSearch.trim() ? highlightSearchText(item.text[language], contractSearchResults.find((result) => result.id === item.id)?.matchedTerms ?? [], darkMode) : item.text[language]}</p>
                          </div>
                        </div>
                      </section>
                    ))}
                  </div>
                </section>

                <section className={`rounded-2xl border p-7 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-lg ${darkMode ? "bg-zinc-900" : "bg-zinc-100"}`}>📜</div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-semibold">{language === "RU" ? "Полный текст договора — оригинальная формулировка" : "Shartnomaning to‘liq matni — asl formulirovka"}</h2>
                      <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                        {language === "RU" ? "Ниже можно раскрыть полный текст документа. Формулировки пунктов сохранены по предоставленному договору; персональные данные конкретного клиента заменены на поля-шаблоны." : "Quyida hujjatning to‘liq matnini ochish mumkin. Bandlar formulirovkasi taqdim etilgan shartnomaga muvofiq saqlangan; aniq mijozning shaxsiy ma’lumotlari shablon maydonlari bilan almashtirilgan."}
                      </p>

                      <details className="mt-5 group">
                        <summary className={`cursor-pointer list-none rounded-xl border px-4 py-3 text-sm font-semibold ${darkMode ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-950" : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100"}`}>
                          {language === "RU" ? "Открыть полный текст договора" : "Shartnomaning to‘liq matnini ochish"}
                        </summary>
                        <pre className={`mt-4 overflow-x-auto rounded-xl border p-6 text-[13px] leading-6 whitespace-pre-wrap font-sans ${darkMode ? "bg-black/30 border-zinc-800 text-zinc-300" : "bg-zinc-50 border-zinc-200 text-zinc-700"}`}>
                          {originalContractText}
                        </pre>
                      </details>

                      <details className="mt-4 group">
                        <summary className={`cursor-pointer list-none rounded-xl border px-4 py-3 text-sm font-semibold ${darkMode ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-950" : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100"}`}>
                          {language === "RU" ? "Открыть полный текст залогового билета" : "Garov biletining to‘liq matnini ochish"}
                        </summary>
                        <pre className={`mt-4 overflow-x-auto rounded-xl border p-6 text-[13px] leading-6 whitespace-pre-wrap font-sans ${darkMode ? "bg-black/30 border-zinc-800 text-zinc-300" : "bg-zinc-50 border-zinc-200 text-zinc-700"}`}>
                          {originalPledgeTicketText}
                        </pre>
                      </details>
                    </div>
                  </div>
                </section>

                <section className={`rounded-2xl border p-6 ${darkMode ? "bg-amber-950/20 border-amber-900/40" : "bg-amber-50 border-amber-200"}`}>
                  <div className="text-sm font-semibold">{language === "RU" ? "Внимание" : "Diqqat"}</div>
                  <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-amber-100/80" : "text-amber-900/80"}`}>
                    {language === "RU" ? "Для публикации в общей базе персональные данные из образца договора заменены шаблонными полями. Оригинальные формулировки и номера пунктов сохранены. Индивидуальные сведения конкретного клиента проверяются только в рабочей системе." : "Umumiy bazada joylashtirish uchun namunaviy shartnomadagi shaxsiy ma’lumotlar shablon maydonlari bilan almashtirildi. Asl formulirovkalar va band raqamlari saqlandi. Muayyan mijozning individual ma’lumotlari faqat ishchi tizimda tekshiriladi."}
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* BRANCHES */}
          {activeMenu === "Главная" && homeView === "branches" && (
            <div>
              <button onClick={() => setHomeView("home")} className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                ← {language === "RU" ? "На главную" : "Bosh sahifaga"}
              </button>

              <section className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div>
                    <h1 className="text-[32px] font-bold tracking-tight">{text.branchesTitle}</h1>
                    <p className={`mt-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{text.branchesSubtitle}</p>
                  </div>
                  <div className="text-xs text-zinc-400">
                    {text.found}: <span className="font-semibold">{filteredBranches.length}</span>
                  </div>
                </div>
              </section>

              <section className="mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <div className="lg:col-span-2 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">🔎</span>
                    <input value={branchSearch} onChange={(e) => setBranchSearch(e.target.value)} placeholder={text.branchSearchPlaceholder} className={`${inputClass} pl-11`} />
                  </div>
                  <select value={branchRegion} onChange={(e) => setBranchRegion(e.target.value)} className={inputClass}>
                    {regions.map((region) => (
                      <option key={region} value={region}>{region === "__ALL__" ? text.allRegions : region}</option>
                    ))}
                  </select>
                </div>
              </section>

              {filteredBranches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredBranches.map((branch) => (
                    <section key={branch.id} className={`p-6 rounded-2xl border ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs text-zinc-400">{language === "RU" ? branch.branch : branch.branch.replace(/^филиал/i, "filial")}</div>
                          <h2 className="mt-1 text-lg font-semibold">{branch.name}</h2>
                        </div>
                        <div className="px-2.5 py-1 rounded-lg bg-zinc-100 text-xs text-zinc-500">№ {branch.id}</div>
                      </div>

                      <div className={`mt-5 text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                        {branch.address}
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div className={`text-xs ${darkMode ? "text-zinc-600" : "text-zinc-400"}`}>{branch.region}</div>
                        <a href={getMapUrl(branch.name, branch.address)} target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline">
                          {text.map} →
                        </a>
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <section className={`rounded-2xl border min-h-[300px] flex items-center justify-center text-center p-8 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <div>
                    <div className="text-4xl mb-4">📍</div>
                    <div className="font-semibold">{text.noBranches}</div>
                    <div className="text-xs mt-2 text-zinc-400">{text.noBranchesText}</div>
                  </div>
                </section>
              )}
            </div>
          )}

          {/* KNOWLEDGE BASE */}
          {activeMenu === "База знаний" && (
            <div>
              {knowledgeLevel === 1 && (
                <>
                  <section className="mb-8">
                    <h1 className="text-[32px] font-bold tracking-tight">{text.knowledgeTitle}</h1>
                    <p className={`mt-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{text.knowledgeSubtitle}</p>
                  </section>

                  <section className="mb-8">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2">🔎</span>
                      <input
                        value={knowledgeSearch}
                        onChange={(e) => setKnowledgeSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (!knowledgeSearchResults.length) trackNoResultSearch(knowledgeSearch, "knowledge");
                            else trackUsage({ type: "search", id: "knowledge", query: knowledgeSearch.trim() });
                          }
                        }}
                        placeholder={text.searchKnowledge}
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </section>

                  {knowledgeSearch.trim() && knowledgeSearchResults.length > 0 && (
                    <section className="mb-8 space-y-3">
                      {knowledgeSearchResults.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          type="button"
                          onClick={() => {
                            trackSearchResult(result, knowledgeSearch);
                            if (result.articleId) {
                              handleArticleClick(result.articleId);
                              scrollToTop();
                            } else if (result.sectionId) {
                              handleSectionClick(result.sectionId);
                              scrollToTop();
                            }
                          }}
                          className={`w-full text-left rounded-2xl border p-5 transition ${darkMode ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700" : "bg-white border-zinc-200 hover:border-zinc-300"}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">📄</div>
                            <div className="min-w-0">
                              <div className="text-xs text-zinc-400">{result.category}</div>
                              <div className="mt-1 font-semibold">{result.title}</div>
                              <div className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
                                {highlightSearchText(result.preview, result.matchedTerms, darkMode)}
                              </div>
                              <div className="mt-3 text-xs font-medium">{text.searchOpen} →</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </section>
                  )}

                  {knowledgeSearch.trim() && knowledgeSearchResults.length === 0 && (
                    <section className={`mb-8 rounded-2xl border p-8 text-center ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                      <div className="text-3xl">🔎</div>
                      <div className="mt-3 font-semibold">{text.searchNothing}</div>
                      <div className={`mt-1 text-sm ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>{text.tryAnother}</div>
                    </section>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredKnowledgeSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`${cardClass} min-h-[220px] p-6 text-left ${darkMode ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700" : "bg-white border-zinc-200 hover:border-zinc-300"}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl">
                            {section.icon}
                          </div>
                          <span className="text-zinc-300 text-lg">→</span>
                        </div>
                        <h2 className="mt-6 text-lg font-semibold">{section.title[language]}</h2>
                        <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                          {section.description[language]}
                        </p>
                        <div className={`mt-5 text-xs ${darkMode ? "text-zinc-600" : "text-zinc-400"}`}>
                          {section.articles.length} {text.topics}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {knowledgeLevel === 2 && selectedSectionData && (
                <>
                  <button onClick={resetKnowledge} className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                    {text.backToSections}
                  </button>

                  <div className="mb-8">
                    <div className="text-3xl mb-4">{selectedSectionData.icon}</div>
                    <h1 className="text-[32px] font-bold">{selectedSectionData.title[language]}</h1>
                    <p className={`mt-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{selectedSectionData.description[language]}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {selectedSectionData.articles.map((articleId) => (
                      <button key={articleId} onClick={() => handleArticleClick(articleId)} className={`min-h-[120px] p-5 rounded-2xl border text-left transition ${darkMode ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700" : "bg-white border-zinc-200 hover:border-zinc-300"}`}>
                        <div className="font-medium">{getArticleTitle(articleId)}</div>
                        <div className={`text-xs mt-3 ${darkMode ? "text-zinc-600" : "text-zinc-400"}`}>{text.openArticle}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {knowledgeLevel === 3 && selectedArticleData && (
                <>
                  <button onClick={() => { setKnowledgeLevel(2); setSelectedArticle(null); }} className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                    {text.backToTopics}
                  </button>

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8">
                    <div>
                      <h1 className="text-[32px] font-bold">{selectedArticleData.title[language]}</h1>
                      <p className={`mt-3 max-w-4xl text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                        {selectedArticleData.intro[language]}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleFavorite(selectedArticle!)}
                      className={`shrink-0 px-4 py-2.5 rounded-xl border text-sm transition ${
                        favorites.includes(selectedArticle!)
                          ? darkMode
                            ? "bg-zinc-800 border-zinc-700 text-white"
                            : "bg-zinc-100 border-zinc-300 text-zinc-900"
                          : darkMode
                          ? "border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                          : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {favorites.includes(selectedArticle!) ? "★ " : "☆ "}
                      {favorites.includes(selectedArticle!) ? text.favoriteAdded : text.addFavorite}
                    </button>
                  </div>

                  <div className="max-w-5xl space-y-5">
                    {selectedArticleData.blocks.map((block, index) => (
                      <section key={index} className={`rounded-2xl border overflow-hidden ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                        <div className={`px-6 py-4 border-b ${darkMode ? "border-zinc-800" : "border-zinc-200"}`}>
                          <h2 className="text-lg font-semibold">{block.title[language]}</h2>
                        </div>
                        <div className={`px-6 ${darkMode ? "divide-zinc-800" : "divide-zinc-100"}`}>

                          {block.items[language].map((item, itemIndex) => (

                            <div

                              key={itemIndex}

                              className={`flex items-start gap-3 py-4 text-sm leading-7 whitespace-pre-line ${

                                itemIndex < block.items[language].length - 1

                                  ? `border-b ${darkMode ? "border-zinc-800" : "border-zinc-100"}`

                                  : ""

                              } ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}

                            >

                              <span className="mt-1 shrink-0 font-medium text-zinc-500 dark:text-zinc-400">-</span>

                              <span className="min-w-0 flex-1">{item}</span>

                            </div>

                          ))}

                        </div>

                        {block.images?.length ? (

                          <div className={`grid gap-5 p-6 ${block.images.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`}>

                            {block.images.map((image) => (

                              <figure key={image.src} className={`overflow-hidden rounded-2xl border ${darkMode ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-zinc-50"}`}>

                                <img

                                  src={image.src}

                                  alt={image.alt[language]}

                                  className="w-full h-auto block"

                                />

                              </figure>

                            ))}

                          </div>

                        ) : null}

                        </section>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* NAVIGATOR */}
          {activeMenu === "Навигатор решений" && (
            <div>
              {navigatorLevel === 1 && (
                <>
                  <section className="mb-8">
                    <h1 className="text-[32px] font-bold tracking-tight">{text.navigatorTitle}</h1>
                    <p className={`mt-2 max-w-3xl text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      {text.navigatorSubtitle}
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {navigatorCategories.map((category) => (
                      <button key={category.id} onClick={() => handleNavigatorCategoryClick(category.id)} className={`min-h-[230px] p-7 rounded-2xl border text-left transition hover:-translate-y-0.5 ${darkMode ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700" : "bg-white border-zinc-200 hover:border-zinc-300"}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl">{category.icon}</div>
                          <span className="text-zinc-300 text-lg">→</span>
                        </div>
                        <h2 className="mt-7 text-lg font-semibold">{category.title[language]}</h2>
                        <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>{category.description[language]}</p>
                        <div className={`mt-5 text-xs ${darkMode ? "text-zinc-600" : "text-zinc-400"}`}>
                          {category.flows.length} {language === "RU" ? "сценариев" : "ssenariy"}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {navigatorLevel === 2 && selectedNavigatorCategoryData && (
                <>
                  <button onClick={resetNavigator} className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                    {text.navigatorBack}
                  </button>
                  <div className="mb-8">
                    <div className="text-3xl mb-4">{selectedNavigatorCategoryData.icon}</div>
                    <h1 className="text-[32px] font-bold">{selectedNavigatorCategoryData.title[language]}</h1>
                    <p className={`mt-2 max-w-3xl text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{selectedNavigatorCategoryData.description[language]}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {selectedNavigatorCategoryData.flows.map((flowId) => {
                      const flow = navigatorFlows[flowId];
                      return (
                        <button key={flowId} onClick={() => handleNavigatorFlowClick(flowId)} className={`min-h-[150px] p-6 rounded-2xl border text-left transition ${darkMode ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700" : "bg-white border-zinc-200 hover:border-zinc-300"}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="w-11 h-11 rounded-xl bg-zinc-100 flex items-center justify-center text-xl">{flow.icon}</div>
                            <span className="text-zinc-300">→</span>
                          </div>
                          <h2 className="mt-5 font-semibold">{flow.title[language]}</h2>
                          <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>{flow.description[language]}</p>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {navigatorLevel === 3 && selectedNavigatorFlowData && (
                <>
                  <button onClick={() => { setNavigatorLevel(2); setSelectedNavigatorFlow(null); }} className={`mb-6 text-sm ${darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                    {text.navigatorBackFlows}
                  </button>
                  <section className="mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl shrink-0">{selectedNavigatorFlowData.icon}</div>
                      <div>
                        <h1 className="text-[32px] font-bold tracking-tight">{selectedNavigatorFlowData.title[language]}</h1>
                        <p className={`mt-2 max-w-4xl text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{selectedNavigatorFlowData.description[language]}</p>
                      </div>
                    </div>
                  </section>
                  <div className="max-w-4xl space-y-4">
                    {selectedNavigatorFlowData.steps.map((step, index) => (
                      <section key={index} className={`rounded-2xl border p-6 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"}`}>{index + 1}</div>
                          <div className="min-w-0">
                            <div className={`text-xs uppercase tracking-[0.12em] ${darkMode ? "text-zinc-600" : "text-zinc-400"}`}>{text.navigatorStep} {index + 1}</div>
                            <h2 className="mt-1 text-lg font-semibold">{step.title[language]}</h2>
                            <p className={`mt-3 text-sm leading-7 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>{step.text[language]}</p>
                            {step.important && <div className={`mt-4 rounded-xl p-4 text-sm leading-6 ${darkMode ? "bg-zinc-900 text-zinc-300" : "bg-zinc-50 text-zinc-600"}`}><div className="font-semibold mb-1">{text.navigatorImportant}</div>{step.important[language]}</div>}
                          </div>
                        </div>
                      </section>
                    ))}

                    {navigatorRequestGuides[selectedNavigatorFlowData.id] && (
                      <section className={`rounded-2xl border p-6 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-xl">📋</div>
                          <div>
                            <div className="text-xs uppercase tracking-[0.12em] text-zinc-400">{language === "RU" ? "Для регистрации обращения" : "Murojaatni ro‘yxatdan o‘tkazish uchun"}</div>
                            <h2 className="mt-1 text-lg font-semibold">{language === "RU" ? "Что запросить у клиента" : "Mijozdan nimalarni so‘rash kerak"}</h2>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className={`rounded-xl border p-4 ${darkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-50"}`}>
                            <div className="text-sm font-semibold">✅ {language === "RU" ? "Обязательно" : "Majburiy"}</div>
                            <div className="mt-3 space-y-2">
                              {navigatorRequestGuides[selectedNavigatorFlowData.id].required.map((item, index) => (
                                <div key={`required-${index}`} className="text-sm leading-6">• {item[language]}</div>
                              ))}
                            </div>
                          </div>

                          <div className={`rounded-xl border p-4 ${darkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-50"}`}>
                            <div className="text-sm font-semibold">🟡 {language === "RU" ? "При необходимости / при наличии" : "Zarurat bo‘lsa / mavjud bo‘lsa"}</div>
                            <div className="mt-3 space-y-2">
                              {navigatorRequestGuides[selectedNavigatorFlowData.id].optional.map((item, index) => (
                                <div key={`optional-${index}`} className="text-sm leading-6">• {item[language]}</div>
                              ))}
                            </div>
                          </div>

                          <div className={`rounded-xl border p-4 ${darkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-50"}`}>
                            <div className="text-sm font-semibold">📎 {language === "RU" ? "Документы / подтверждения" : "Hujjatlar / tasdiqlar"}</div>
                            <div className="mt-3 space-y-2">
                              {navigatorRequestGuides[selectedNavigatorFlowData.id].documents.map((item, index) => (
                                <div key={`documents-${index}`} className="text-sm leading-6">• {item[language]}</div>
                              ))}
                            </div>
                          </div>

                          <div className={`rounded-xl border p-4 ${darkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-50"}`}>
                            <div className="text-sm font-semibold">🚫 {language === "RU" ? "Не запрашивать автоматически" : "Avtomatik tarzda so‘ramang"}</div>
                            <div className="mt-3 space-y-2">
                              {navigatorRequestGuides[selectedNavigatorFlowData.id].doNotAsk.map((item, index) => (
                                <div key={`do-not-ask-${index}`} className="text-sm leading-6">• {item[language]}</div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {selectedNavigatorFlowData.scriptIndex !== undefined && (
                          <button
                            type="button"
                            onClick={() => {
                              const targetIndex = selectedNavigatorFlowData.scriptIndex!;
                              setActiveMenu("Скрипты");
                              setSelectedCallType(getCallTypeForScriptIndex(targetIndex));
                              setScriptFocus(targetIndex);
                              scrollToTop();
                            }}
                            className={`mt-5 w-full rounded-xl border px-4 py-3 text-left transition ${
                              darkMode
                                ? "border-amber-700/50 bg-amber-950/20 text-amber-200 hover:bg-amber-950/40"
                                : "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                            }`}
                          >
                            <div className="text-sm font-semibold">↗ {selectedNavigatorFlowData.scriptLabel?.[language] ?? (language === "RU" ? "Открыть скрипт" : "Skriptni ochish")}</div>
                            <div className={`mt-1 text-xs ${darkMode ? "text-amber-300/70" : "text-amber-700/70"}`}>
                              {language === "RU" ? "Перейти прямо к нужному скрипту" : "Kerakli skriptga to‘g‘ridan-to‘g‘ri o‘tish"}
                            </div>
                          </button>
                        )}
                      </section>
                    )}

                    {selectedNavigatorFlowData.clientText && (
                      <section className={`rounded-2xl border p-6 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                        <div className="text-xs uppercase tracking-[0.12em] text-zinc-400">{language === "RU" ? "Что сказать клиенту" : "Mijozga nima deyish kerak"}</div>
                        <p className={`mt-3 text-sm leading-7 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>{selectedNavigatorFlowData.clientText[language]}</p>
                      </section>
                    )}

                    {selectedNavigatorFlowData.knowledgeArticle && (
                      <button onClick={() => { setActiveMenu("База знаний"); handleArticleClick(selectedNavigatorFlowData.knowledgeArticle!); }} className={`w-full p-5 rounded-2xl border text-left transition ${darkMode ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-950" : "bg-zinc-100 border-zinc-200 hover:bg-zinc-200"}`}>
                        <div className="text-sm font-semibold">{text.navigatorOpenKnowledge}</div>
                        <div className={`text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>{getArticleTitle(selectedNavigatorFlowData.knowledgeArticle)}</div>
                      </button>
                    )}
                    <section className={`rounded-2xl border p-6 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                      <div className="text-2xl">✅</div>
                      <h2 className="mt-3 text-lg font-semibold">{text.navigatorComplete}</h2>
                      <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>{text.navigatorCompleteText}</p>
                    </section>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TRAINING */}
          {activeMenu === "Обучение" && (
            <div>
              <section className="mb-8">
                <h1 className="text-[32px] font-bold tracking-tight">{text.trainingTitle}</h1>
                <p className={`mt-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>{text.trainingSubtitle}</p>
              </section>

              <section className="mb-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {language === "RU" ? "Обучение и тестирование" : "Ta’lim va testlar"}
                    </h2>
                    <p className={`mt-1 text-sm ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                      {language === "RU"
                        ? "Все материалы открываются отдельными карточками, без отображения интерфейса внешних сервисов внутри сайта."
                        : "Barcha materiallar alohida kartochkalar orqali ochiladi, tashqi servis interfeyslari sayt ichida ko‘rsatilmaydi."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  <a
                    href="https://padlet.com/itop12343/padlet-s023s4mbeesfp1hymv5h"
                    target="_blank"
                    rel="noreferrer"
                    className={`group rounded-2xl border p-6 transition ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl">📚</div>
                      <span className={`text-sm ${darkMode ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-700"}`}>↗</span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">
                      {language === "RU" ? "Дополнительное обучение" : "Qo‘shimcha ta’lim"}
                    </h3>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      {language === "RU"
                        ? "Материалы и задания в Padlet. Открываются в новой вкладке."
                        : "Padlet’dagi materiallar va topshiriqlar. Yangi oynada ochiladi."}
                    </p>
                    <span className={`inline-flex mt-5 text-sm font-medium ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                      {language === "RU" ? "Открыть материалы →" : "Materiallarni ochish →"}
                    </span>
                  </a>

                  <a
                    href="https://docs.google.com/forms/d/1CyeY3k9Y_oIibnBoxCkkY49fIlT6X3NQS8iHjj9YEds/viewform"
                    target="_blank"
                    rel="noreferrer"
                    className={`group rounded-2xl border p-6 transition ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">📝</div>
                      <span className={`text-sm ${darkMode ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-700"}`}>↗</span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">
                      {language === "RU" ? "Дополнительный тест" : "Qo‘shimcha test"}
                    </h3>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      {language === "RU"
                        ? "Тест открывается в новой вкладке. Интерфейс Google Forms внутри сайта не показывается."
                        : "Test yangi oynada ochiladi. Google Forms interfeysi sayt ichida ko‘rsatilmaydi."}
                    </p>
                    <span className={`inline-flex mt-5 text-sm font-medium ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                      {language === "RU" ? "Пройти тест →" : "Testni boshlash →"}
                    </span>
                  </a>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdj50o3Qc_uQqK6FIaNP0sOfrSDVaXs1nY9ej7qSkwHcYiYFg/viewform"
                    target="_blank"
                    rel="noreferrer"
                    className={`group rounded-2xl border p-6 transition ${
                      darkMode
                        ? "bg-[#18181b] border-zinc-800 hover:border-zinc-700"
                        : "bg-white border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-2xl">🎓</div>
                      <span className={`text-sm ${darkMode ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-700"}`}>↗</span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">
                      {text.trainingTestTitle}
                    </h3>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      {language === "RU"
                        ? "Тест по материалам Базы знаний. Открывается в новой вкладке без отображения Google Forms внутри сайта."
                        : "Bilimlar bazasi materiallari bo‘yicha test. Google Forms sayt ichida ko‘rsatilmasdan yangi oynada ochiladi."}
                    </p>
                    <span className={`inline-flex mt-5 text-sm font-medium ${darkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                      {language === "RU" ? "Пройти тест →" : "Testni boshlash →"}
                    </span>
                  </a>
                </div>
              </section>

            </div>
          )}

          {/* SCRIPTS */}
          {activeMenu === "Скрипты" && (
            <div>
              <section className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-xl">🗣</div>
                      <div>
                        <h1 className="text-[32px] leading-tight font-bold tracking-tight">
                          {language === "RU" ? "Основной скрипт контакт-центра" : "Kontakt-markazning asosiy skripti"}
                        </h1>
                        <p className={`mt-1 text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                          {language === "RU"
                            ? "Пошаговый сценарий разговора. Сначала определите тип обращения, затем используйте подходящую ветку."
                            : "Suhbatning bosqichma-bosqich ssenariysi. Avval murojaat turini aniqlang, so‘ng mos yo‘nalishdan foydalaning."}
                        </p>
                      </div>
                    </div>
                    <div className={`mt-3 text-xs ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                      {language === "RU" ? "Рабочая версия · используйте актуальные данные из Базы знаний и Навигатора." : "Ishchi versiya · Bilimlar bazasi va Navigatorning amaldagi ma’lumotlaridan foydalaning."}
                    </div>
                  </div>
                  <div className={`shrink-0 rounded-2xl border px-4 py-3 ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}>
                    <div className="text-xs font-semibold">{language === "RU" ? "Логика звонка" : "Qo‘ng‘iroq mantiqi"}</div>
                    <div className={`mt-1 text-xs ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                      {language === "RU" ? "Слушаем → определяем → отвечаем / регистрируем → завершаем" : "Tinglaymiz → aniqlaymiz → javob beramiz / ro‘yxatdan o‘tkazamiz → yakunlaymiz"}
                    </div>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_330px] gap-6 items-start">
                <div className="space-y-5">
                  <section className={`rounded-2xl border p-6 ${
                    darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                        darkMode ? "bg-orange-950/50 text-orange-300" : "bg-orange-50 text-orange-700"
                      }`}>
                        1
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${
                          darkMode ? "text-zinc-500" : "text-zinc-400"
                        }`}>
                          {language === "RU" ? "ОБЩЕЕ ДЛЯ ВСЕХ ЗВОНКОВ" : "BARCHA QO‘NG‘IROQLAR UCHUN UMUMIY"}
                        </div>
                        <h2 className="mt-1 text-xl font-semibold">
                          {language === "RU" ? "Начало звонка" : "Qo‘ng‘iroqni boshlash"}
                        </h2>
                        <div className="mt-5 space-y-3">
                          {scriptSections[0].lines[language].map((line, lineIndex) => (
                            <div key={lineIndex} className={`rounded-xl px-4 py-3 text-sm leading-6 ${
                              darkMode ? "bg-zinc-900 text-zinc-300" : "bg-zinc-50 text-zinc-700"
                            }`}>
                              {line}
                            </div>
                          ))}
                        </div>
                        <p className={`mt-3 text-xs leading-5 ${
                          darkMode ? "text-zinc-500" : "text-zinc-500"
                        }`}>
                          {language === "RU"
                            ? "После приветствия и уточнения имени определите, что именно нужно клиенту."
                            : "Salomlashish va ismni aniqlagandan so‘ng mijozga aynan nima kerakligini belgilang."}
                        </p>
                      </div>
                    </div>
                  </section>

                  {!selectedCallType ? (
                    <>
                      <section className={`rounded-2xl border p-6 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-500">
                              {language === "RU" ? "Выберите тип обращения" : "Murojaat turini tanlang"}
                            </div>
                            <h2 className="mt-1 text-2xl font-semibold">
                              {language === "RU" ? "Как проходит разговор" : "Suhbat qanday olib boriladi"}
                            </h2>
                            <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                              {language === "RU"
                                ? "Во время разговора выберите тип клиента. После выбора на экране останется только нужная последовательность — без лишней информации."
                                : "Suhbat davomida murojaat turini tanlang. Tanlaganingizdan so‘ng ekranda faqat kerakli ketma-ketlik qoladi — ortiqcha ma’lumotsiz."}
                            </p>
                          </div>
                          <div className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold ${darkMode ? "bg-orange-950/30 text-orange-300" : "bg-orange-50 text-orange-700"}`}>
                            {language === "RU" ? "Выбор → готовый маршрут" : "Tanlash → tayyor yo‘nalish"}
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            {
                              type: "consultation" as const,
                              icon: "💬",
                              title: language === "RU" ? "Консультация" : "Maslahat",
                              text: language === "RU"
                                ? "Клиенту нужна информация. Проверка или регистрация обращения не требуется."
                                : "Mijozga ma’lumot kerak. Tekshiruv yoki murojaatni ro‘yxatdan o‘tkazish talab qilinmaydi.",
                              cls: darkMode
                                ? "border-emerald-900/60 bg-emerald-950/20 hover:bg-emerald-950/35"
                                : "border-emerald-200 bg-emerald-50 hover:bg-emerald-100/70",
                            },
                            {
                              type: "request" as const,
                              icon: "📄",
                              title: language === "RU" ? "Запрос" : "So‘rov",
                              text: language === "RU"
                                ? "Нужно проверить информацию, выполнить действие или зарегистрировать обращение."
                                : "Ma’lumotni tekshirish, amal bajarish yoki murojaatni ro‘yxatdan o‘tkazish kerak.",
                              cls: darkMode
                                ? "border-blue-900/60 bg-blue-950/20 hover:bg-blue-950/35"
                                : "border-blue-200 bg-blue-50 hover:bg-blue-100/70",
                            },
                            {
                              type: "complaint" as const,
                              icon: "⚠️",
                              title: language === "RU" ? "Жалоба" : "Shikoyat",
                              text: language === "RU"
                                ? "Есть проблема, ошибка, нарушение или недовольство клиента."
                                : "Muammo, xato, qoidabuzarlik yoki mijoz noroziligi mavjud.",
                              cls: darkMode
                                ? "border-red-900/60 bg-red-950/20 hover:bg-red-950/35"
                                : "border-red-200 bg-red-50 hover:bg-red-100/70",
                            },
                          ].map((card) => (
                            <button
                              key={card.type}
                              type="button"
                              onClick={() => {
                                trackUsage({ type: "script", id: `call-type-${card.type}` });
                                setSelectedCallType(card.type);
                                setScriptFocus(null);
                                scrollToTop();
                              }}
                              className={`text-left rounded-2xl border p-5 transition ${card.cls}`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 text-base font-semibold">
                                  <span>{card.icon}</span>
                                  {card.title}
                                </div>
                                <span className="text-orange-500 font-semibold">→</span>
                              </div>
                              <p className={`mt-3 text-sm leading-6 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                                {card.text}
                              </p>
                              <div className={`mt-4 text-xs font-semibold ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                                {language === "RU" ? "Показать только этот сценарий" : "Faqat shu ssenariyni ko‘rsatish"}
                              </div>
                            </button>
                          ))}
                        </div>
                      </section>

                      <section className={`rounded-2xl border p-5 ${darkMode ? "bg-orange-950/10 border-orange-900/40" : "bg-orange-50/70 border-orange-100"}`}>
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <span>💡</span>
                          {language === "RU" ? "Как пользоваться во время звонка" : "Qo‘ng‘iroq paytida foydalanish"}
                        </div>
                        <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                          {language === "RU"
                            ? "Сначала выберите, что именно нужно клиенту. После этого оператор видит только нужную ветку и проходит её сверху вниз."
                            : "Avval mijozga nima kerakligini tanlang. Shundan so‘ng operator faqat kerakli yo‘nalishni ko‘radi va uni yuqoridan pastga bajaradi."}
                        </p>
                      </section>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCallType(null);
                            setScriptFocus(null);
                            scrollToTop();
                          }}
                          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                            darkMode
                              ? "border-zinc-700 text-zinc-300 hover:bg-zinc-900"
                              : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                          }`}
                        >
                          ← {language === "RU" ? "Выбрать другой тип" : "Boshqa turni tanlash"}
                        </button>

                        <div className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                          selectedCallType === "consultation"
                            ? darkMode ? "bg-emerald-950/30 text-emerald-300" : "bg-emerald-50 text-emerald-700"
                            : selectedCallType === "request"
                            ? darkMode ? "bg-blue-950/30 text-blue-300" : "bg-blue-50 text-blue-700"
                            : darkMode ? "bg-red-950/30 text-red-300" : "bg-red-50 text-red-700"
                        }`}>
                          {selectedCallType === "consultation"
                            ? (language === "RU" ? "Консультация" : "Maslahat")
                            : selectedCallType === "request"
                            ? (language === "RU" ? "Запрос" : "So‘rov")
                            : (language === "RU" ? "Жалоба" : "Shikoyat")}
                        </div>
                      </div>

                      {[
                        ...(selectedCallType === "consultation"
                          ? [
                              { index: 2, label: language === "RU" ? "1. Консультация" : "1. Maslahat" },
                              { index: 7, label: language === "RU" ? "2. Завершение" : "2. Yakunlash" },
                            ]
                          : selectedCallType === "request"
                          ? [
                              { index: 3, label: language === "RU" ? "1. Запрос" : "1. So‘rov" },
                              { index: 5, label: language === "RU" ? "2. Уточнение данных" : "2. Ma’lumotlarni aniqlash" },
                              { index: 6, label: language === "RU" ? "3. Ожидание и возвращение" : "3. Kutish va qaytish" },
                              { index: 7, label: language === "RU" ? "4. Завершение" : "4. Yakunlash" },
                            ]
                          : [
                              { index: 4, label: language === "RU" ? "1. Жалоба" : "1. Shikoyat" },
                              { index: 5, label: language === "RU" ? "2. Уточнение данных" : "2. Ma’lumotlarni aniqlash" },
                              { index: 6, label: language === "RU" ? "3. Ожидание и возвращение" : "3. Kutish va qaytish" },
                              { index: 7, label: language === "RU" ? "4. Завершение" : "4. Yakunlash" },
                            ]
                        ),
                      ].map((item) => {
                        const section = scriptSections[item.index];
                        const isFocused = scriptFocus === item.index;
                        return (
                          <section
                            id={`script-section-${item.index}`}
                            key={item.index}
                            className={`rounded-2xl border p-6 transition ${
                              isFocused
                                ? darkMode
                                  ? "bg-zinc-900 border-orange-700/60 ring-1 ring-orange-700/30"
                                  : "bg-white border-orange-300 ring-1 ring-orange-100"
                                : darkMode
                                ? "bg-[#18181b] border-zinc-800"
                                : "bg-white border-zinc-200"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                                darkMode ? "bg-orange-950/50 text-orange-300" : "bg-orange-50 text-orange-700"
                              }`}>
                                {item.label.split(".")[0]}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                  <div>
                                    <div className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>
                                      {item.label}
                                    </div>
                                    <h2 className="mt-1 text-xl font-semibold">{section.title[language]}</h2>
                                  </div>
                                  <button
                                    onClick={() => {
                                      trackUsage({ type: "script", id: `script-${item.index}` });
                                      setScriptFocus(item.index);
                                    }}
                                    className={`text-xs px-3 py-2 rounded-lg border transition ${
                                      darkMode
                                        ? "border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                                        : "border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                                    }`}
                                  >
                                    {language === "RU" ? "Перейти сюда" : "Shu yerga o‘tish"}
                                  </button>
                                </div>

                                {item.index === 1 ? (
                                  <div className="mt-5 text-sm leading-6">{section.lines[language].join(" ")}</div>
                                ) : (
                                  <div className="mt-5 space-y-3">
                                    {section.lines[language].map((line, lineIndex) => {
                                      const isCaseNumberInstruction =
                                        line.includes("номер его обращения") ||
                                        line.includes("murojaat raqamini");

                                      if (isCaseNumberInstruction) {
                                        return (
                                          <div
                                            key={lineIndex}
                                            className={`rounded-2xl border-2 px-5 py-5 ${
                                              darkMode
                                                ? "border-orange-700 bg-orange-950/25"
                                                : "border-orange-200 bg-orange-50"
                                            }`}
                                          >
                                            <div className="flex items-center gap-3">
                                              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${
                                                darkMode
                                                  ? "bg-orange-900/60 text-orange-200"
                                                  : "bg-orange-100 text-orange-700"
                                              }`}>
                                                №
                                              </span>
                                              <div>
                                                <div className="text-xs font-bold uppercase tracking-[0.12em] text-orange-500">
                                                  {language === "RU" ? "Обязательно сообщить клиенту" : "Mijozga albatta aytiladi"}
                                                </div>
                                                <div className="mt-0.5 text-lg font-bold">
                                                  {language === "RU" ? "Номер обращения" : "Murojaat raqami"}
                                                </div>
                                              </div>
                                            </div>

                                            <div className={`mt-4 rounded-xl px-4 py-4 text-sm leading-7 font-medium ${
                                              darkMode
                                                ? "bg-zinc-900/70 text-zinc-200"
                                                : "bg-white text-zinc-800"
                                            }`}>
                                              {line}
                                            </div>

                                            <div className={`mt-3 text-xs leading-5 ${
                                              darkMode ? "text-orange-200/80" : "text-orange-800/80"
                                            }`}>
                                              {language === "RU"
                                                ? "Сообщите номер после регистрации и попросите клиента сохранить его."
                                                : "Ro‘yxatdan o‘tkazilgandan so‘ng raqamni ayting va mijozdan uni saqlab qo‘yishini so‘rang."}
                                            </div>
                                          </div>
                                        );
                                      }

                                      return (
                                        <div key={lineIndex} className={`rounded-xl px-4 py-3 text-sm leading-6 ${
                                          darkMode ? "bg-zinc-900 text-zinc-300" : "bg-zinc-50 text-zinc-700"
                                        }`}>
                                          {line}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {selectedCallType === "request" && item.index === 3 && (
                                  <div className={`mt-4 rounded-xl border px-4 py-3 ${
                                    darkMode ? "bg-blue-950/20 border-blue-900/50" : "bg-blue-50 border-blue-100"
                                  }`}>
                                    <div className="text-xs font-semibold">
                                      {language === "RU" ? "Дальше → Что запросить" : "Keyin → Nima so‘rash kerak"}
                                    </div>
                                    <div className={`mt-1 text-xs leading-5 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                                      {language === "RU"
                                        ? "После этой ветки откройте Навигатор решений и выберите конкретный запрос — там будут обязательные и дополнительные данные."
                                        : "Shundan so‘ng Yechimlar navigatorini oching va aniq so‘rovni tanlang — u yerda majburiy va qo‘shimcha ma’lumotlar ko‘rsatiladi."}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveMenu("Навигатор решений");
                                        resetNavigator();
                                        scrollToTop();
                                      }}
                                      className={`mt-3 rounded-lg border px-3 py-2 text-xs font-semibold ${
                                        darkMode ? "border-blue-800 text-blue-200 hover:bg-blue-950/40" : "border-blue-200 text-blue-700 hover:bg-blue-50"
                                      }`}
                                    >
                                      🧭 {language === "RU" ? "Открыть Навигатор" : "Navigatorni ochish"}
                                    </button>
                                  </div>
                                )}

                                {selectedCallType === "complaint" && item.index === 4 && (
                                  <div className={`mt-4 rounded-xl border px-4 py-3 ${
                                    darkMode ? "bg-red-950/20 border-red-900/50" : "bg-red-50 border-red-100"
                                  }`}>
                                    <div className="text-xs font-semibold">
                                      {language === "RU" ? "Дальше → Что запросить" : "Keyin → Nima so‘rash kerak"}
                                    </div>
                                    <div className={`mt-1 text-xs leading-5 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                                      {language === "RU"
                                        ? "После этой ветки откройте Навигатор решений и выберите конкретную жалобу — там будут обязательные и дополнительные данные."
                                        : "Shundan so‘ng Yechimlar navigatorini oching va aniq shikoyatni tanlang — u yerda majburiy va qo‘shimcha ma’lumotlar ko‘rsatiladi."}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveMenu("Навигатор решений");
                                        resetNavigator();
                                        scrollToTop();
                                      }}
                                      className={`mt-3 rounded-lg border px-3 py-2 text-xs font-semibold ${
                                        darkMode ? "border-red-800 text-red-200 hover:bg-red-950/40" : "border-red-200 text-red-700 hover:bg-red-50"
                                      }`}
                                    >
                                      🧭 {language === "RU" ? "Открыть Навигатор" : "Navigatorni ochish"}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </section>
                        );
                      })}
                    </>
                  )}
                </div>
                <aside className="space-y-4 xl:sticky xl:top-[106px]">
                  <section className={`rounded-2xl border p-5 ${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-blue-50/70 border-blue-100"}`}>
                    <div className="flex items-center gap-2 font-semibold"><span>💬</span>{language === "RU" ? "Быстрые фразы" : "Tezkor iboralar"}</div>
                    <div className="mt-4 space-y-2">
                      {[
                        language === "RU" ? "Подскажите, пожалуйста, …" : "Iltimos, … ni ayting.",
                        language === "RU" ? "Уточните, пожалуйста, …" : "Iltimos, … ni aniqlashtiring.",
                        language === "RU" ? "Правильно ли я вас понял(а), что …?" : "Sizni to‘g‘ri tushundimmi, ya’ni …?",
                        language === "RU" ? "Пожалуйста, оставайтесь на линии, я уточню ваш вопрос." : "Iltimos, liniyada qoling, savolingizni aniqlashtirib olaman.",
                        language === "RU" ? "Спасибо за ожидание." : "Kutganingiz uchun rahmat.",
                        language === "RU" ? "У вас остались дополнительные вопросы?" : "Qo‘shimcha savollaringiz qoldimi?",
                      ].map((phrase, index) => (
                        <button
                          key={index}
                          onClick={() => navigator.clipboard?.writeText(phrase)}
                          className={`w-full text-left rounded-xl px-3 py-3 text-sm border transition ${darkMode ? "bg-zinc-950 border-zinc-800 hover:bg-zinc-800" : "bg-white border-zinc-200 hover:bg-zinc-50"}`}
                          title={language === "RU" ? "Нажмите, чтобы скопировать" : "Nusxa olish uchun bosing"}
                        >
                          {phrase}
                        </button>
                      ))}
                    </div>
                    <div className={`mt-3 text-[11px] ${darkMode ? "text-zinc-600" : "text-zinc-400"}`}>
                      {language === "RU" ? "Нажмите на фразу, чтобы скопировать её." : "Iborani nusxalash uchun ustiga bosing."}
                    </div>
                  </section>

                  <section className={`rounded-2xl border p-5 ${darkMode ? "bg-amber-950/20 border-amber-900/40" : "bg-amber-50 border-amber-100"}`}>
                    <div className="flex items-center gap-2 font-semibold"><span>🚫</span>{language === "RU" ? "Не рекомендуется" : "Tavsiya etilmaydi"}</div>
                    <div className={`mt-3 space-y-2 text-sm leading-6 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      <div>• {language === "RU" ? "говорить «Ало» при принятии звонка" : "qo‘ng‘iroqni «Alo» deb boshlash"}</div>
                      <div>• {language === "RU" ? "использовать «Могу я уточнить?» или «Можете сказать?»" : "«Aniqlashtirsam maylimi?» kabi iboralardan foydalanish"}</div>
                      <div>• {language === "RU" ? "говорить «Вы должны» / «Вам нужно»" : "«Siz qilishingiz kerak» kabi buyruq ohangidagi iboralarni ishlatish"}</div>
                      <div>• {language === "RU" ? "утверждать информацию, которую необходимо проверить" : "tekshiruv talab qiladigan ma’lumotni tekshirmasdan tasdiqlash"}</div>
                      <div>• {language === "RU" ? "запрашивать лишние персональные данные" : "ortiqcha shaxsiy ma’lumotlarni so‘rash"}</div>
                    </div>
                  </section>

                  <section className={`rounded-2xl border p-5 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                    <div className="flex items-center gap-2 font-semibold"><span>🔗</span>{language === "RU" ? "Полезные переходы" : "Foydali o‘tishlar"}</div>
                    <div className="mt-3 space-y-2">
                      <button
                        onClick={() => { setActiveMenu("База знаний"); resetKnowledge(); scrollToTop(); }}
                        className={`w-full text-left rounded-xl px-3 py-3 text-sm border ${darkMode ? "border-zinc-800 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-50"}`}
                      >
                        📚 {language === "RU" ? "База знаний" : "Bilimlar bazasi"}
                      </button>
                      <button
                        onClick={() => { setActiveMenu("Навигатор решений"); resetNavigator(); scrollToTop(); }}
                        className={`w-full text-left rounded-xl px-3 py-3 text-sm border ${darkMode ? "border-zinc-800 hover:bg-zinc-900" : "border-zinc-200 hover:bg-zinc-50"}`}
                      >
                        🧭 {language === "RU" ? "Навигатор решений" : "Yechimlar navigatori"}
                      </button>
                    </div>
                  </section>

                  <section className={`rounded-2xl border p-5 ${darkMode ? "bg-emerald-950/20 border-emerald-900/40" : "bg-emerald-50 border-emerald-100"}`}>
                    <div className="flex items-center gap-2 font-semibold"><span>✅</span>{language === "RU" ? "Памятка" : "Eslatma"}</div>
                    <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                      {language === "RU"
                        ? "Скрипт — это рабочая опора. Не зачитывайте весь текст подряд: выберите нужную ветку и говорите естественно."
                        : "Skript — ishdagi yordamchi. Butun matnni ketma-ket o‘qimang: kerakli yo‘nalishni tanlang va tabiiy gapiring."}
                    </p>
                  </section>
                </aside>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {activeMenu === "Аналитика" && (
            <div>
              <section className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                  <div>
                    <div className="text-4xl mb-3">📊</div>
                    <h1 className="text-[32px] font-bold tracking-tight">
                      {language === "RU" ? "Аналитика для оператора" : "Operatorlar uchun tahlil"}
                    </h1>
                    <p className={`mt-2 max-w-3xl text-sm leading-6 ${darkMode ? "text-zinc-400" : "text-zinc-500"}`}>
                      {language === "RU"
                        ? "Показывает, какие материалы, ситуации и поисковые запросы чаще всего используются внутри системы."
                        : "Tizim ichida qaysi materiallar, holatlar va qidiruv so‘rovlari ko‘proq ishlatilishini ko‘rsatadi."}
                    </p>
                  </div>
                  <div className={`flex items-center rounded-xl border p-1 ${darkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-white"}`}>
                    {([["7d", language === "RU" ? "7 дней" : "7 kun"],["30d", language === "RU" ? "30 дней" : "30 kun"],["all", language === "RU" ? "Всё время" : "Barcha vaqt"]] as const).map(([value,label]) => (
                      <button key={value} type="button" onClick={() => setAnalyticsPeriod(value)} className={`px-3 py-2 rounded-lg text-xs font-medium transition ${analyticsPeriod === value ? (darkMode ? "bg-white text-zinc-900" : "bg-zinc-900 text-white") : (darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900")}`}>{label}</button>
                    ))}
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {[
                  { label: language === "RU" ? "Всего действий" : "Jami harakatlar", value: analyticsVisibleEvents.length, icon: "⚡" },
                  { label: language === "RU" ? "Поисковых запросов" : "Qidiruvlar", value: analyticsSearchEvents.length + analyticsZeroSearches.length, icon: "🔎" },
                  { label: language === "RU" ? "Открытий БЗ" : "BZ ochilishlari", value: analyticsArticleEvents.length, icon: "📚" },
                  { label: language === "RU" ? "Без результата" : "Natijasiz qidiruv", value: analyticsZeroSearches.length, icon: "⚠️" },
                ].map((card) => (
                  <section key={card.label} className={`rounded-2xl border p-5 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                    <div className="flex items-center justify-between"><span className="text-sm text-zinc-500">{card.label}</span><span className="text-lg">{card.icon}</span></div>
                    <div className="mt-3 text-3xl font-bold">{card.value}</div>
                  </section>
                ))}
              </div>

              {analyticsVisibleEvents.length === 0 ? (
                <section className={`rounded-2xl border p-10 text-center ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                  <div className="text-4xl">📈</div>
                  <h2 className="mt-4 text-xl font-semibold">{language === "RU" ? "Аналитика пока пустая" : "Tahlil hozircha bo‘sh"}</h2>
                  <p className={`mt-2 text-sm leading-6 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>{language === "RU" ? "Начните пользоваться Базой знаний, Навигатором и Скриптами — статистика будет собираться автоматически." : "Bilimlar bazasi, Navigator va Skriptlardan foydalaning — statistika avtomatik yig‘iladi."}</p>
                </section>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {[
                    { title: language === "RU" ? "Часто ищут" : "Ko‘p qidiriladi", icon: "🔎", rows: analyticsTopSearches, empty: language === "RU" ? "Пока мало поисковых данных." : "Qidiruv ma’lumotlari hali kam.", format: (id: string) => id },
                    { title: language === "RU" ? "Часто открываемые статьи БЗ" : "Ko‘p ochiladigan BZ maqolalari", icon: "📚", rows: analyticsTopArticles, empty: language === "RU" ? "Открытий статей пока нет." : "Maqolalar ochilmagan.", format: (id: string) => articleContent[id]?.title[language] ?? id },
                    { title: language === "RU" ? "Частые ситуации в Навигаторе" : "Navigatordagi ko‘p holatlar", icon: "🧭", rows: analyticsTopNavigator, empty: language === "RU" ? "Навигатор пока не использовался." : "Navigator hali ishlatilmagan.", format: (id: string) => navigatorFlows[id]?.title[language] ?? id },
                    { title: language === "RU" ? "Часто открываемые скрипты" : "Ko‘p ochiladigan skriptlar", icon: "🗣", rows: analyticsTopScripts, empty: language === "RU" ? "Скрипты пока не открывались." : "Skriptlar hali ochilmagan.", format: (id: string) => { const index = Number(id.replace("script-", "")); return scriptSections[index]?.title[language] ?? id; } },
                    { title: language === "RU" ? "Поиск без результата" : "Natijasiz qidiruv", icon: "⚠️", rows: analyticsNoResultQueries, empty: language === "RU" ? "Запросов без результата нет." : "Natijasiz so‘rovlar yo‘q.", format: (id: string) => id },
                    { title: language === "RU" ? "Часто ищут в договоре" : "Shartnomada ko‘p qidiriladi", icon: "📄", rows: analyticsTopContracts, empty: language === "RU" ? "Поиск по договору пока не использовался." : "Shartnoma qidiruvi hali ishlatilmagan.", format: (id: string) => contractKeyPoints.find((item) => item.id === id)?.title[language] ?? id },
                  ].map((panel) => (
                    <section key={panel.title} className={`rounded-2xl border p-6 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                      <div className="flex items-center gap-3"><span className="text-xl">{panel.icon}</span><h2 className="text-lg font-semibold">{panel.title}</h2></div>
                      <div className="mt-5 space-y-3">
                        {panel.rows.length ? panel.rows.map(([id,count]) => (
                          <div key={id} className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3 ${darkMode ? "bg-zinc-900" : "bg-zinc-50"}`}>
                            <div className="min-w-0 text-sm truncate">{panel.format(id)}</div>
                            <div className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${darkMode ? "bg-zinc-800 text-zinc-300" : "bg-white border border-zinc-200 text-zinc-600"}`}>{count}</div>
                          </div>
                        )) : <div className="text-sm text-zinc-500">{panel.empty}</div>}
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BASE MANAGEMENT — CHANGE LOG */}
          {activeMenu === "Управление базой" && (
            <div>
              <div className={`rounded-3xl border overflow-hidden ${
                darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"
              }`}>
                <div className={`px-6 py-5 border-b ${
                  darkMode ? "border-zinc-800" : "border-zinc-100"
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold">
                        {language === "RU" ? "Управление базой" : "Bazani boshqarish"}
                      </h1>
                      <p className={`mt-1 text-sm ${
                        darkMode ? "text-zinc-400" : "text-zinc-500"
                      }`}>
                        {language === "RU"
                          ? "История изменений и обновлений базы знаний."
                          : "Bilimlar bazasidagi o‘zgarishlar va yangilanishlar tarixi."}
                      </p>
                    </div>
                    <div className={`rounded-2xl px-3 py-2 text-xs font-medium ${
                      darkMode
                        ? "bg-zinc-900 text-zinc-400"
                        : "bg-zinc-100 text-zinc-500"
                    }`}>
                      {language === "RU" ? "Только просмотр" : "Faqat ko‘rish"}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className={`rounded-2xl border p-5 mb-6 ${
                    darkMode
                      ? "border-zinc-800 bg-zinc-950/40"
                      : "border-zinc-200 bg-zinc-50"
                  }`}>
                    <div className="text-xs uppercase tracking-wide font-semibold text-zinc-400">
                      {language === "RU" ? "Последнее обновление" : "So‘nggi yangilanish"}
                    </div>
                    <div className="mt-2 text-lg font-semibold">
                      28.09.2026
                    </div>
                    <div className={`mt-1 text-sm ${
                      darkMode ? "text-zinc-400" : "text-zinc-500"
                    }`}>
                      {language === "RU"
                        ? "Добавлен журнал изменений базы."
                        : "Baza o‘zgarishlari jurnali qo‘shildi."}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        date: "28.09.2026",
                        sectionRU: "Управление базой",
                        sectionUZ: "Bazani boshqarish",
                        changeRU: "Добавлен журнал изменений базы знаний.",
                        changeUZ: "Bilimlar bazasi o‘zgarishlari jurnali qo‘shildi.",
                        target: "management",
                      },
                      {
                        date: "28.09.2026",
                        sectionRU: "Аналитика",
                        sectionUZ: "Tahlil",
                        changeRU: "Добавлен раздел аналитики для операторов: поиск, статьи, навигатор, скрипты и запросы без результата.",
                        changeUZ: "Operatorlar uchun tahlil bo‘limi qo‘shildi: qidiruv, maqolalar, navigator, skriptlar и запросы без результата.",
                        target: "analytics",
                      },
                      {
                        date: "25.09.2026",
                        sectionRU: "Навигатор решений",
                        sectionUZ: "Yechimlar navigatori",
                        changeRU: "Обновлён порядок принятия обращений и добавлены переходы к нужным скриптам.",
                        changeUZ: "Murojaatlarni qabul qilish tartibi yangilandi va kerakli skriptlarga o‘tish tugmalari qo‘shildi.",
                        target: "navigator",
                      },
                      {
                        date: "25.09.2026",
                        sectionRU: "Оплата",
                        sectionUZ: "To‘lov",
                        changeRU: "Добавлена инструкция по онлайн-оплате Click и Payme, включая изображения и важные условия по времени оплаты.",
                        changeUZ: "Click va Payme orqali onlayn to‘lov bo‘yicha yo‘riqnoma, rasmlar va to‘lov vaqti bo‘yicha muhim shartlar qo‘shildi.",
                        target: "online-payment",
                      },
                      {
                        date: "25.09.2026",
                        sectionRU: "Калькулятор",
                        sectionUZ: "Kalkulyator",
                        changeRU: "Добавлен расчёт пени за 1 день с автоматическим определением продукта и процентной ставки.",
                        changeUZ: "Mahsulot va foiz stavkasini avtomatik aniqlagan holda 1 kunlik penya hisoblash qo‘shildi.",
                        target: "calculator",
                      },
                      {
                        date: "25.09.2026",
                        sectionRU: "База знаний",
                        sectionUZ: "Bilimlar bazasi",
                        changeRU: "Информация в статьях приведена к последовательному формату: каждый пункт отображается отдельной строкой.",
                        changeUZ: "Maqolalardagi ma’lumotlar ketma-ket formatga o‘tkazildi: har bir band alohida qatorda ko‘rsatiladi.",
                        target: "bz",
                      },
                    ].map((item: { date: string; sectionRU: string; sectionUZ: string; changeRU: string; changeUZ: string; target?: string }, index) => (
                      <div
                        key={`${item.date}-${item.sectionRU}-${index}`}
                        className={`rounded-2xl border p-5 ${
                          darkMode ? "border-zinc-800 bg-zinc-950/20" : "border-zinc-200 bg-white"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            darkMode
                              ? "bg-zinc-900 text-zinc-400"
                              : "bg-zinc-100 text-zinc-500"
                          }`}>
                            {item.date}
                          </span>
                          <span className={`text-sm font-semibold ${
                            darkMode ? "text-zinc-200" : "text-zinc-800"
                          }`}>
                            {language === "RU" ? item.sectionRU : item.sectionUZ}
                          </span>
                        </div>

                        <p className={`mt-3 text-sm leading-7 ${
                          darkMode ? "text-zinc-300" : "text-zinc-700"
                        }`}>
                          {language === "RU" ? item.changeRU : item.changeUZ}
                        </p>

                        {item.target ? (
                          <button
                            type="button"
                            onClick={() => openManagementChangeTarget(item.target!)}
                            className={`mt-4 inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                              darkMode
                                ? "border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                                : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                            }`}
                          >
                            ↗ {language === "RU" ? "Открыть изменённый раздел" : "O‘zgargan bo‘limni ochish"}
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* OTHER SECTIONS */}
          {activeMenu !== "Главная" && activeMenu !== "База знаний" && activeMenu !== "Навигатор решений" && activeMenu !== "Обучение" && activeMenu !== "Скрипты" && activeMenu !== "Аналитика" && activeMenu !== "Управление базой" && (
            <div>
              <div className={`min-h-[500px] rounded-2xl border flex flex-col items-center justify-center text-center p-8 ${darkMode ? "bg-[#18181b] border-zinc-800" : "bg-white border-zinc-200"}`}>
                <div className="text-5xl mb-5">
                  {menuItems.find((item) => item.id === activeMenu)?.icon}
                </div>
                <h1 className="text-2xl font-bold">{menuItems.find((item) => item.id === activeMenu)?.[language]}</h1>
                <p className={`mt-2 text-sm ${darkMode ? "text-zinc-500" : "text-zinc-400"}`}>{text.otherLater}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
