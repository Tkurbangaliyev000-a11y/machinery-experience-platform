/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";

export type AppLanguage = "en" | "ru" | "kk";

export type AppTranslations = {
  settingsPanelLabel: string;
  openSettings: string;
  closeSettings: string;
  interfaceFeedback: string;
  systemBadge: string;
  sound: string;
  soundHint: string;
  vibration: string;
  vibrationHint: string;
  on: string;
  off: string;
  language: string;
  languageHint: string;
  english: string;
  russian: string;
  kazakh: string;
  heroEnter: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroBadge: string;
  chooseCategory: string;
  chooseCategoryLead: string;
  excavators: string;
  loaders: string;
  dumptrucks: string;
  wheeledExcavators: string;
  backhoes: string;
  mining: string;
  excavatorsTitle: string;
  chooseModel: string;
  loadersTitle: string;
  backhoesTitle: string;
  wheeledExcavatorsTitle: string;
  miningTitle: string;
  dumptrucksTitle: string;
  backToCatalog: string;
  showroomKicker: string;
  showroomTitle: string;
  showroomLead: string;
};

type LocaleText = AppTranslations;

const translations: Record<AppLanguage, LocaleText> = {
  en: {
    settingsPanelLabel: "Interface Settings",
    openSettings: "Open interface settings",
    closeSettings: "Close interface settings",
    interfaceFeedback: "Response Panel",
    systemBadge: "Premium",
    sound: "Interface sound",
    soundHint: "Soft button audio feedback",
    vibration: "Haptic feedback",
    vibrationHint: "Smooth tactile response on supported devices",
    on: "On",
    off: "Off",
    language: "Language",
    languageHint: "Switch the interface language",
    english: "English",
    russian: "Русский",
    kazakh: "Қазақша",
    heroEnter: "OPEN PLATFORM",
    heroEyebrow: "Premium construction equipment presentation",
    heroTitle: "Precise sense of power",
    heroLead: "A catalog that feels like a high-end living product: clean composition, deep light and restrained motion.",
    heroBadge: "Turkuaz Machinery CA",
    chooseCategory: "Select equipment category",
    chooseCategoryLead: "A curated portfolio of premium machines designed to feel effortless and expensive.",
    excavators: "Excavators",
    loaders: "Wheel loaders",
    dumptrucks: "Dump trucks",
    wheeledExcavators: "Wheeled excavators",
    backhoes: "Backhoe loaders",
    mining: "Mining equipment",
    excavatorsTitle: "LOVOL EXCAVATORS",
    chooseModel: "Select a model",
    loadersTitle: "WHEEL LOADERS",
    backhoesTitle: "BACKHOE LOADERS",
    wheeledExcavatorsTitle: "WHEELED EXCAVATORS",
    miningTitle: "MINING EQUIPMENT",
    dumptrucksTitle: "DUMP TRUCKS",
    backToCatalog: "Back to catalog",
    showroomKicker: "Premium section",
    showroomTitle: "Digital showroom",
    showroomLead: "A future-ready premium space designed to keep the entire catalog visually coherent.",
  },
  ru: {
    settingsPanelLabel: "Настройки интерфейса",
    openSettings: "Открыть настройки интерфейса",
    closeSettings: "Закрыть настройки интерфейса",
    interfaceFeedback: "Панель отклика",
    systemBadge: "Премиум",
    sound: "Звук интерфейса",
    soundHint: "Мягкий аудиоотклик кнопок",
    vibration: "Тактильный отклик",
    vibrationHint: "Плавная отдача на поддерживаемых устройствах",
    on: "Вкл",
    off: "Выкл",
    language: "Язык",
    languageHint: "Переключение языка интерфейса",
    english: "English",
    russian: "Русский",
    kazakh: "Қазақша",
    heroEnter: "ОТКРЫТЬ ПЛАТФОРМУ",
    heroEyebrow: "Премиальная презентация строительной техники",
    heroTitle: "Точное ощущение мощности",
    heroLead: "Каталог, который воспринимается как живой продукт высокого класса: чистая композиция, глубокий свет и аккуратная анимация.",
    heroBadge: "Turkuaz Machinery CA",
    chooseCategory: "Выберите категорию техники",
    chooseCategoryLead: "Премиальная подборка машин, собранная в цельный и спокойный визуальный опыт.",
    excavators: "Экскаваторы",
    loaders: "Фронтальные погрузчики",
    dumptrucks: "Самосвалы",
    wheeledExcavators: "Колесные экскаваторы",
    backhoes: "Экскаваторы-погрузчики",
    mining: "Горная техника",
    excavatorsTitle: "ЭКСКАВАТОРЫ LOVOL",
    chooseModel: "Выберите модель",
    loadersTitle: "ФРОНТАЛЬНЫЕ ПОГРУЗЧИКИ",
    backhoesTitle: "ЭКСКАВАТОРЫ-ПОГРУЗЧИКИ",
    wheeledExcavatorsTitle: "КОЛЕСНЫЕ ЭКСКАВАТОРЫ",
    miningTitle: "ГОРНАЯ ТЕХНИКА",
    dumptrucksTitle: "САМОСВАЛЫ",
    backToCatalog: "Назад в каталог",
    showroomKicker: "Премиальный раздел",
    showroomTitle: "Цифровой шоурум",
    showroomLead: "Раздел находится в финальной подготовке и будет оформлен в едином стиле каталога.",
  },
  kk: {
    settingsPanelLabel: "Интерфейс баптаулары",
    openSettings: "Интерфейс баптауларын ашу",
    closeSettings: "Интерфейс баптауларын жабу",
    interfaceFeedback: "Қайтарым тақтасы",
    systemBadge: "Премиум",
    sound: "Интерфейс дыбысы",
    soundHint: "Батырмаларға жұмсақ дыбыстық жауап",
    vibration: "Тактильді жауап",
    vibrationHint: "Қолдау бар құрылғыларда жұмсақ діріл әсері",
    on: "Қосу",
    off: "Өшіру",
    language: "Тіл",
    languageHint: "Интерфейс тілін ауыстыру",
    english: "English",
    russian: "Русский",
    kazakh: "Қазақша",
    heroEnter: "ПЛАТФОРМАНЫ АШУ",
    heroEyebrow: "Құрылыс техникасының премиум таныстырылымы",
    heroTitle: "Қуатты дәл сезіну",
    heroLead: "Жоғары деңгейлі тірі өнім сияқты қабылданатын каталог: таза композиция, терең жарық және ұстамды motion.",
    heroBadge: "Turkuaz Machinery CA",
    chooseCategory: "Техника санатын таңдаңыз",
    chooseCategoryLead: "Бүкіл каталог бір тынысты, сәнді және сабырлы визуалды тәжірибе ретінде жиналған.",
    excavators: "Экскаваторлар",
    loaders: "Алдыңғы тиегіштер",
    dumptrucks: "Самосвалдар",
    wheeledExcavators: "Дөңгелекті экскаваторлар",
    backhoes: "Экскаватор-тиегіштер",
    mining: "Тау-кен техникасы",
    excavatorsTitle: "LOVOL ЭКСКАВАТОРЛАРЫ",
    chooseModel: "Модельді таңдаңыз",
    loadersTitle: "АЛДЫНҒЫ ТИЕГІШТЕР",
    backhoesTitle: "ЭКСКАВАТОР-ТИЕГІШТЕР",
    wheeledExcavatorsTitle: "ДӨҢГЕЛЕКТІ ЭКСКАВАТОРЛАР",
    miningTitle: "ТАУ-КЕН ТЕХНИКАСЫ",
    dumptrucksTitle: "САМОСВАЛДАР",
    backToCatalog: "Каталогқа оралу",
    showroomKicker: "Премиум бөлім",
    showroomTitle: "Цифрлық шоурум",
    showroomLead: "Бөлім соңғы дайындықта және каталогтың біртұтас стилінде рәсімделеді.",
  },
};

const LanguageContext = createContext<AppLanguage>("ru");

export function LanguageProvider({ language, children }: { language: AppLanguage; children: ReactNode }) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}

export function getTranslations(language: AppLanguage): AppTranslations {
  return translations[language] ?? translations.ru;
}

export function useAppLanguage() {
  return useContext(LanguageContext);
}

export function useTranslations() {
  return getTranslations(useAppLanguage());
}
