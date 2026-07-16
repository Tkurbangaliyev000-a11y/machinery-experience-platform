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
    settingsPanelLabel: "Настройки интерфейса",
    openSettings: "Открыть настройки интерфейса",
    closeSettings: "Закрыть настройки интерфейса",
    interfaceFeedback: "Параметры отклика",
    systemBadge: "Система",
    sound: "Звук",
    soundHint: "Звуковой отклик кнопок",
    vibration: "Вибрация",
    vibrationHint: "Тактильный отклик на поддерживаемых устройствах",
    on: "Вкл",
    off: "Выкл",
    language: "Язык",
    languageHint: "Язык интерфейса",
    english: "Английский",
    russian: "Русский",
    kazakh: "Казахский",
    heroEnter: "ОТКРЫТЬ ПЛАТФОРМУ",
    chooseCategory: "Выберите категорию техники",
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
  },
  ru: {
    settingsPanelLabel: "Настройки интерфейса",
    openSettings: "Открыть настройки интерфейса",
    closeSettings: "Закрыть настройки интерфейса",
    interfaceFeedback: "Параметры отклика",
    systemBadge: "Система",
    sound: "Звук",
    soundHint: "Звуковой отклик кнопок",
    vibration: "Вибрация",
    vibrationHint: "Тактильный отклик на поддерживаемых устройствах",
    on: "Вкл",
    off: "Выкл",
    language: "Язык",
    languageHint: "Язык интерфейса",
    english: "Английский",
    russian: "Русский",
    kazakh: "Казахский",
    heroEnter: "ОТКРЫТЬ ПЛАТФОРМУ",
    chooseCategory: "Выберите категорию техники",
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
  },
  kk: {
    settingsPanelLabel: "Настройки интерфейса",
    openSettings: "Открыть настройки интерфейса",
    closeSettings: "Закрыть настройки интерфейса",
    interfaceFeedback: "Параметры отклика",
    systemBadge: "Система",
    sound: "Звук",
    soundHint: "Звуковой отклик кнопок",
    vibration: "Вибрация",
    vibrationHint: "Тактильный отклик на поддерживаемых устройствах",
    on: "Вкл",
    off: "Выкл",
    language: "Язык",
    languageHint: "Язык интерфейса",
    english: "Английский",
    russian: "Русский",
    kazakh: "Казахский",
    heroEnter: "ОТКРЫТЬ ПЛАТФОРМУ",
    chooseCategory: "Выберите категорию техники",
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
