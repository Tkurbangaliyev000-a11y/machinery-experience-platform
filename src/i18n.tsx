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
  chooseCategory: string;
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
};

const translations: Record<AppLanguage, AppTranslations> = {
  en: {
    settingsPanelLabel: "Feedback settings",
    openSettings: "Open feedback settings",
    closeSettings: "Close feedback settings",
    interfaceFeedback: "Interface feedback",
    systemBadge: "System",
    sound: "Sound",
    soundHint: "Click feedback",
    vibration: "Vibration",
    vibrationHint: "Haptic feedback on supported devices",
    on: "On",
    off: "Off",
    language: "Language",
    languageHint: "Interface language",
    english: "English",
    russian: "Russian",
    kazakh: "Kazakh",
    heroEnter: "OPEN THE UNIVERSE",
    chooseCategory: "Choose equipment category",
    excavators: "Excavators",
    loaders: "Wheel loaders",
    dumptrucks: "Dump trucks",
    wheeledExcavators: "Wheeled excavators",
    backhoes: "Backhoe loaders",
    mining: "Mining equipment",
    excavatorsTitle: "LOVOL EXCAVATORS",
    chooseModel: "Choose model",
    loadersTitle: "WHEEL LOADERS",
    backhoesTitle: "BACKHOE LOADERS",
    wheeledExcavatorsTitle: "WHEELED EXCAVATORS",
    miningTitle: "MINING EQUIPMENT",
    dumptrucksTitle: "DUMP TRUCKS",
    backToCatalog: "<- Back to catalog",
  },
  ru: {
    settingsPanelLabel: "Настройки отклика",
    openSettings: "Открыть настройки отклика",
    closeSettings: "Закрыть настройки отклика",
    interfaceFeedback: "Отклик интерфейса",
    systemBadge: "System",
    sound: "Звук",
    soundHint: "Щелчки при нажатии",
    vibration: "Вибрация",
    vibrationHint: "Тактильный отклик на поддерживаемых устройствах",
    on: "Вкл",
    off: "Выкл",
    language: "Язык",
    languageHint: "Язык интерфейса",
    english: "English",
    russian: "Русский",
    kazakh: "Казахский",
    heroEnter: "ОТКРЫТЬ ВСЕЛЕННУЮ",
    chooseCategory: "Выберите категорию техники",
    excavators: "Экскаваторы",
    loaders: "Фронтальные погрузчики",
    dumptrucks: "Самосвалы",
    wheeledExcavators: "Колесные экскаваторы",
    backhoes: "Экскаватор-погрузчики",
    mining: "Горная техника",
    excavatorsTitle: "ЭКСКАВАТОРЫ LOVOL",
    chooseModel: "Выберите модель",
    loadersTitle: "ФРОНТАЛЬНЫЕ ПОГРУЗЧИКИ",
    backhoesTitle: "ЭКСКАВАТОР-ПОГРУЗЧИКИ",
    wheeledExcavatorsTitle: "КОЛЕСНЫЕ ЭКСКАВАТОРЫ",
    miningTitle: "ГОРНАЯ ТЕХНИКА",
    dumptrucksTitle: "САМОСВАЛЫ",
    backToCatalog: "<- Назад в каталог",
  },
  kk: {
    settingsPanelLabel: "Кері байланыс баптаулары",
    openSettings: "Кері байланыс баптауларын ашу",
    closeSettings: "Кері байланыс баптауларын жабу",
    interfaceFeedback: "Интерфейс кері байланысы",
    systemBadge: "System",
    sound: "Дыбыс",
    soundHint: "Басқанда шерту дыбысы",
    vibration: "Діріл",
    vibrationHint: "Қолдайтын құрылғылардағы тактильді кері байланыс",
    on: "Қосулы",
    off: "Өшірулі",
    language: "Тіл",
    languageHint: "Интерфейс тілі",
    english: "English",
    russian: "Русский",
    kazakh: "Қазақша",
    heroEnter: "ҒАЛАМДЫ АШУ",
    chooseCategory: "Техника санатын таңдаңыз",
    excavators: "Экскаваторлар",
    loaders: "Фронталды тиегіштер",
    dumptrucks: "Самосвалдар",
    wheeledExcavators: "Доңғалақты экскаваторлар",
    backhoes: "Экскаватор-тиегіштер",
    mining: "Тау-кен техникасы",
    excavatorsTitle: "LOVOL ЭКСКАВАТОРЛАРЫ",
    chooseModel: "Модельді таңдаңыз",
    loadersTitle: "ФРОНТАЛДЫ ТИЕГІШТЕР",
    backhoesTitle: "ЭКСКАВАТОР-ТИЕГІШТЕР",
    wheeledExcavatorsTitle: "ДОҢҒАЛАҚТЫ ЭКСКАВАТОРЛАР",
    miningTitle: "ТАУ-КЕН ТЕХНИКАСЫ",
    dumptrucksTitle: "САМОСВАЛДАР",
    backToCatalog: "<- Каталогқа оралу",
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
