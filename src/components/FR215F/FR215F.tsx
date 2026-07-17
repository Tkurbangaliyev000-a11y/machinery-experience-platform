import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  ChevronRight,
  Download,
  Fuel,
  Gauge,
  Image,
  MapPin,
  MessageCircle,
  Phone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Warehouse,
  Wrench,
  Zap,
} from "lucide-react";
import { useAppLanguage, type AppLanguage } from "../../i18n";
import "./FR215F.css";

type Props = { onBack: () => void };

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type StatCard = {
  value: string;
  label: string;
  icon: LucideIcon;
};

type SpecCard = {
  id: string;
  label: string;
  value: string;
  details: string;
  metrics: {
    power: number;
    efficiency: number;
    cycle: number;
  };
};

type UseCase = {
  id: string;
  title: string;
  short: string;
  details: string;
};

type ServiceCard = {
  title: string;
  description: string;
};

type Fr215fCopy = {
  loaderTitle: string;
  back: string;
  brandSeries: string;
  heroLead: string;
  actionDownloadOffer: string;
  actionCallManager: string;
  actionMessage: string;
  heroImageAlt: string;
  heroBadgeClass: string;
  heroBadgeFuel: string;
  sectionAdvantagesKicker: string;
  sectionAdvantagesTitle: string;
  sectionAdvantagesLead: string;
  sectionSpecsKicker: string;
  sectionSpecsTitle: string;
  sectionSpecsLead: string;
  specsAriaLabel: string;
  performanceTitle: string;
  performancePower: string;
  performanceEfficiency: string;
  performanceCycle: string;
  performanceFootnote: string;
  sectionMediaKicker: string;
  sectionMediaTitle: string;
  sectionMediaLead: string;
  videoHint: string;
  videoTitle: string;
  videoMissing: string;
  galleryExterior: string;
  galleryExteriorLead: string;
  galleryCabin: string;
  galleryCabinLead: string;
  sectionUseCasesKicker: string;
  sectionUseCasesTitle: string;
  sectionUseCasesLead: string;
  useCasesAriaLabel: string;
  useCasePointOne: string;
  useCasePointTwo: string;
  useCasePointThree: string;
  sectionServiceKicker: string;
  sectionServiceTitle: string;
  sectionServiceLead: string;
  serviceCitiesAriaLabel: string;
  serviceContact: string;
  finalTitle: string;
  finalLead: string;
  finalDownload: string;
  finalCall: string;
  finalMessage: string;
  featureCards: FeatureCard[];
  statCards: StatCard[];
  specRows: SpecCard[];
  useCases: UseCase[];
  serviceCards: ServiceCard[];
  serviceCities: string[];
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.64, ease: [0.22, 1, 0.36, 1] } },
};

const sectionStaggerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const FR215F_COPY: Record<AppLanguage, Fr215fCopy> = {
  en: {
    loaderTitle: "Preparing FR215F presentation",
    back: "Back",
    brandSeries: "Premium excavator series",
    heroLead:
      "Interactive showcase of a new-generation excavator: power, efficiency and service infrastructure that reduces downtime risks and speeds up project payback.",
    actionDownloadOffer: "Download commercial offer",
    actionCallManager: "Call manager",
    actionMessage: "Message",
    heroImageAlt: "LOVOL FR215F excavator",
    heroBadgeClass: "21-22 t class",
    heroBadgeFuel: "Fuel savings up to 25%",
    sectionAdvantagesKicker: "Advantages",
    sectionAdvantagesTitle: "Key advantages",
    sectionAdvantagesLead: "Practical technologies that directly improve safety, productivity and operating flexibility.",
    sectionSpecsKicker: "Specifications",
    sectionSpecsTitle: "Technical specifications",
    sectionSpecsLead: "Modern visual presentation of FR215F performance strengths.",
    specsAriaLabel: "Interactive FR215F technical specifications",
    performanceTitle: "Efficiency profile",
    performancePower: "Power",
    performanceEfficiency: "Fuel efficiency",
    performanceCycle: "Cycle productivity",
    performanceFootnote: "FR215F configuration is tuned to minimize hourly ownership costs while keeping high job execution speed.",
    sectionMediaKicker: "Media",
    sectionMediaTitle: "Photo and video showcase",
    sectionMediaLead: "Reserved zones for high-quality media. Content can be quickly replaced with real materials.",
    videoHint: "FR215F video overview",
    videoTitle: "FR215F video overview",
    videoMissing: "Add videos/FR215F-overview.mp4 in public to connect the preview automatically.",
    galleryExterior: "Exterior gallery",
    galleryExteriorLead: "Placeholder for high-resolution exterior photos.",
    galleryCabin: "Cabin and components gallery",
    galleryCabinLead: "Placeholder for detailed cabin and working-unit photography.",
    sectionUseCasesKicker: "Use cases",
    sectionUseCasesTitle: "Application scenarios",
    sectionUseCasesLead: "Select an industry and evaluate how FR215F addresses real business tasks.",
    useCasesAriaLabel: "FR215F application scenarios",
    useCasePointOne: "Fast adaptation to each task",
    useCasePointTwo: "Stable shift productivity",
    useCasePointThree: "Controlled fuel and service costs",
    sectionServiceKicker: "Service",
    sectionServiceTitle: "Warranty, service and support",
    sectionServiceLead: "Reliable after-sales ecosystem from Turkuaz Machinery CA to reduce operational risk.",
    serviceCitiesAriaLabel: "Service hubs",
    serviceContact: "Contact service team",
    finalTitle: "Ready to receive a tailored FR215F offer?",
    finalLead:
      "Leave a request and we will prepare your project calculation: price, delivery timing, attachment configuration and service support schedule.",
    finalDownload: "Download offer",
    finalCall: "Call",
    finalMessage: "Messenger",
    featureCards: [
      {
        title: "Auxiliary hydraulic system",
        description: "Ready for fast attachment integration with no performance loss in heavy duty cycles.",
        icon: Wrench,
      },
      {
        title: "Next-generation LED optics",
        description: "Uniform work-area illumination for safer and more precise evening and night operations.",
        icon: Zap,
      },
      {
        title: "Rear-view camera",
        description: "Confident rear visibility and blind-zone control in constrained maneuvering areas.",
        icon: Camera,
      },
    ],
    statCards: [
      { value: "129 kW", label: "Engine power", icon: Gauge },
      { value: "-25%", label: "Lower fuel consumption", icon: Fuel },
      { value: "High", label: "Productivity", icon: Sparkles },
    ],
    specRows: [
      {
        id: "class",
        label: "Machine class",
        value: "21-22 t hydraulic excavator",
        details: "Balanced mass and traction profile for urban and industrial operation.",
        metrics: { power: 86, efficiency: 84, cycle: 90 },
      },
      {
        id: "powertrain",
        label: "Powertrain",
        value: "129 kW engine with optimized torque",
        details: "High torque provides fast hydraulic response under load.",
        metrics: { power: 94, efficiency: 85, cycle: 91 },
      },
      {
        id: "efficiency",
        label: "Efficiency",
        value: "Fuel consumption reduction up to 25%",
        details: "Intelligent mode control lowers ownership cost per machine hour.",
        metrics: { power: 84, efficiency: 96, cycle: 89 },
      },
      {
        id: "duty",
        label: "Duty cycle",
        value: "Stable performance in 24/7 operation",
        details: "Core components are designed for sustained high-intensity shifts.",
        metrics: { power: 90, efficiency: 87, cycle: 95 },
      },
      {
        id: "attachments",
        label: "Attachments",
        value: "Hammer, grapple and quick-coupler support",
        details: "Extended hydraulic lines accelerate FR215F adaptation for different tasks.",
        metrics: { power: 91, efficiency: 83, cycle: 93 },
      },
      {
        id: "comfort",
        label: "Operator comfort",
        value: "Quiet cabin, improved visibility, ergonomic control",
        details: "Comfortable environment reduces fatigue and stabilizes work quality.",
        metrics: { power: 82, efficiency: 88, cycle: 92 },
      },
    ],
    useCases: [
      {
        id: "construction",
        title: "Construction",
        short: "Excavation, grading and site preparation.",
        details: "FR215F delivers precise work movements and stable hydraulics in dense urban schedules.",
      },
      {
        id: "quarry",
        title: "Quarry and aggregates",
        short: "Intensive loading and earthmoving operations.",
        details: "High throughput and durable assemblies support confident work in abrasive conditions.",
      },
      {
        id: "demolition",
        title: "Demolition",
        short: "Hydraulic hammer and special attachment operation.",
        details: "Auxiliary hydraulic lines unlock full attachment potential and speed up demolition tasks.",
      },
      {
        id: "municipal",
        title: "Municipal projects",
        short: "Utilities, public works and infrastructure repair.",
        details: "Maneuverability, visibility and LED optics improve safety and precision in constrained city spaces.",
      },
    ],
    serviceCards: [
      {
        title: "Extended warranty",
        description: "For engine and main pump: 10,000 machine hours or 3 years of operation.",
      },
      {
        title: "Field service",
        description: "Fast-response service dispatch to all regions of Kazakhstan.",
      },
      {
        title: "Parts warehouse",
        description: "Large central warehouse in Almaty and additional regional storage hubs.",
      },
    ],
    serviceCities: ["Almaty", "Astana", "Aktobe", "Karagandy", "Atyrau", "Shymkent"],
  },
  ru: {
    loaderTitle: "Подготовка презентации FR215F",
    back: "Назад",
    brandSeries: "Премиальная серия экскаваторов",
    heroLead:
      "Интерактивная презентация экскаватора нового поколения: мощность, экономичность и сервисная инфраструктура, которая снижает риски простоя и ускоряет окупаемость проекта.",
    actionDownloadOffer: "Скачать коммерческое предложение",
    actionCallManager: "Позвонить менеджеру",
    actionMessage: "Написать в мессенджер",
    heroImageAlt: "Экскаватор LOVOL FR215F",
    heroBadgeClass: "21-22 т класс",
    heroBadgeFuel: "Экономия топлива до 25%",
    sectionAdvantagesKicker: "Преимущества",
    sectionAdvantagesTitle: "Ключевые преимущества",
    sectionAdvantagesLead: "Практичные технологии, которые напрямую влияют на безопасность, производительность и гибкость эксплуатации.",
    sectionSpecsKicker: "Характеристики",
    sectionSpecsTitle: "Технические характеристики",
    sectionSpecsLead: "Современная инфографика для быстрого понимания сильных сторон модели FR215F.",
    specsAriaLabel: "Интерактивные технические характеристики FR215F",
    performanceTitle: "Профиль эффективности",
    performancePower: "Мощность",
    performanceEfficiency: "Топливная экономичность",
    performanceCycle: "Производительность цикла",
    performanceFootnote:
      "Конфигурация FR215F ориентирована на минимизацию стоимости моточаса при сохранении высокой скорости выполнения задач.",
    sectionMediaKicker: "Медиа",
    sectionMediaTitle: "Фото и видео презентация",
    sectionMediaLead: "Резервные зоны для медиа высокого качества. Контент можно быстро заменить на реальные материалы.",
    videoHint: "Видеообзор FR215F",
    videoTitle: "Видеообзор FR215F",
    videoMissing: "Добавьте файл videos/FR215F-overview.mp4 в папку public для автоматического подключения.",
    galleryExterior: "Галерея экстерьера",
    galleryExteriorLead: "Плейсхолдер для фото в высоком разрешении.",
    galleryCabin: "Галерея кабины и узлов",
    galleryCabinLead: "Плейсхолдер для детальных снимков кабины и рабочей части.",
    sectionUseCasesKicker: "Сценарии",
    sectionUseCasesTitle: "Сценарии применения",
    sectionUseCasesLead: "Выберите отрасль и оцените, как FR215F закрывает реальные задачи бизнеса.",
    useCasesAriaLabel: "Сценарии применения FR215F",
    useCasePointOne: "Быстрая адаптация под задачу",
    useCasePointTwo: "Стабильная производительность смены",
    useCasePointThree: "Контроль затрат на топливо и сервис",
    sectionServiceKicker: "Сервис",
    sectionServiceTitle: "Гарантия, сервис и поддержка",
    sectionServiceLead: "Надежная послепродажная экосистема Turkuaz Machinery CA для снижения операционных рисков.",
    serviceCitiesAriaLabel: "Сервисные центры",
    serviceContact: "Связаться с сервисной службой",
    finalTitle: "Готовы получить персональное предложение по FR215F?",
    finalLead:
      "Оставьте заявку, и мы подготовим расчет под ваш проект: стоимость, сроки поставки, конфигурацию навесного оборудования и график сервисной поддержки.",
    finalDownload: "Скачать КП",
    finalCall: "Позвонить",
    finalMessage: "Мессенджер",
    featureCards: [
      {
        title: "Дополнительная гидравлическая система",
        description: "Готовность к быстрому подключению навесного оборудования без потери производительности в тяжелых циклах.",
        icon: Wrench,
      },
      {
        title: "LED-оптика нового поколения",
        description: "Равномерное освещение рабочей зоны в вечерние и ночные смены для безопасной и точной работы.",
        icon: Zap,
      },
      {
        title: "Камера заднего вида",
        description: "Уверенный обзор задней полусферы и контроль слепых зон при маневрировании на ограниченной площадке.",
        icon: Camera,
      },
    ],
    statCards: [
      { value: "129 kW", label: "Мощность двигателя", icon: Gauge },
      { value: "-25%", label: "Расход топлива ниже конкурентов", icon: Fuel },
      { value: "Высокая", label: "Производительность", icon: Sparkles },
    ],
    specRows: [
      {
        id: "class",
        label: "Класс техники",
        value: "Гидравлический экскаватор 21-22 т",
        details: "Оптимальный баланс массы и тяги для городского и промышленного применения.",
        metrics: { power: 86, efficiency: 84, cycle: 90 },
      },
      {
        id: "powertrain",
        label: "Силовая установка",
        value: "Двигатель 129 kW с оптимизированной тягой",
        details: "Высокий крутящий момент обеспечивает быстрый отклик гидросистемы даже под нагрузкой.",
        metrics: { power: 94, efficiency: 85, cycle: 91 },
      },
      {
        id: "efficiency",
        label: "Экономичность",
        value: "Снижение расхода топлива до 25%",
        details: "Интеллектуальное управление рабочими режимами уменьшает стоимость моточаса.",
        metrics: { power: 84, efficiency: 96, cycle: 89 },
      },
      {
        id: "duty",
        label: "Рабочий режим",
        value: "Стабильная производительность в цикле 24/7",
        details: "Компоненты рассчитаны на длительную эксплуатацию в интенсивных сменах.",
        metrics: { power: 90, efficiency: 87, cycle: 95 },
      },
      {
        id: "attachments",
        label: "Навесное оборудование",
        value: "Поддержка гидромолота, грейфера, быстросъема",
        details: "Расширенная гидролиния ускоряет адаптацию FR215F под разные виды задач.",
        metrics: { power: 91, efficiency: 83, cycle: 93 },
      },
      {
        id: "comfort",
        label: "Комфорт оператора",
        value: "Тихая кабина, улучшенная обзорность, эргономичное управление",
        details: "Комфортная среда снижает утомляемость и повышает стабильность качества работ.",
        metrics: { power: 82, efficiency: 88, cycle: 92 },
      },
    ],
    useCases: [
      {
        id: "construction",
        title: "Строительство",
        short: "Котлованы, планировка, подготовка площадок.",
        details: "FR215F обеспечивает точные рабочие движения и стабильную гидравлику в плотном городском графике.",
      },
      {
        id: "quarry",
        title: "Карьеры и инертные материалы",
        short: "Интенсивная погрузка и перемещение грунта.",
        details: "Высокая производительность и ресурсные узлы позволяют уверенно работать в тяжелых абразивных условиях.",
      },
      {
        id: "demolition",
        title: "Демонтаж",
        short: "Работа с гидромолотом и спецнавеской.",
        details: "Дополнительная гидролиния раскрывает потенциал навесного оборудования и ускоряет выполнение демонтажных задач.",
      },
      {
        id: "municipal",
        title: "Коммунальные работы",
        short: "Сети, благоустройство, ремонт инфраструктуры.",
        details: "Маневренность, обзорность и LED-оптика повышают безопасность и точность в ограниченных городских пространствах.",
      },
    ],
    serviceCards: [
      {
        title: "Расширенная гарантия",
        description: "На ДВС и основной насос: 10 000 моточасов или 3 года эксплуатации.",
      },
      {
        title: "Выездной сервис",
        description: "Оперативные сервисные выезды во все регионы Казахстана.",
      },
      {
        title: "Склад запчастей",
        description: "Большой центральный склад в Алматы и дополнительные склады в регионах.",
      },
    ],
    serviceCities: ["Алматы", "Астана", "Актобе", "Караганда", "Атырау", "Шымкент"],
  },
  kk: {
    loaderTitle: "FR215F презентациясын дайындау",
    back: "Артқа",
    brandSeries: "Экскаваторлардың премиум сериясы",
    heroLead:
      "Жаңа буындағы экскаватордың интерактивті таныстырылымы: қуат, үнемділік және тоқтап қалу тәуекелін азайтып, жобаның өтелуін жылдамдататын сервистік инфрақұрылым.",
    actionDownloadOffer: "Коммерциялық ұсынысты жүктеу",
    actionCallManager: "Менеджерге қоңырау шалу",
    actionMessage: "Мессенджерге жазу",
    heroImageAlt: "LOVOL FR215F экскаваторы",
    heroBadgeClass: "21-22 т класс",
    heroBadgeFuel: "Жанармай үнемі 25%-ға дейін",
    sectionAdvantagesKicker: "Артықшылықтар",
    sectionAdvantagesTitle: "Негізгі артықшылықтар",
    sectionAdvantagesLead: "Қауіпсіздікке, өнімділікке және пайдалану икемділігіне тікелей әсер ететін практикалық технологиялар.",
    sectionSpecsKicker: "Сипаттамалар",
    sectionSpecsTitle: "Техникалық сипаттамалар",
    sectionSpecsLead: "FR215F моделінің басым тұстарын жылдам түсінуге арналған заманауи инфографика.",
    specsAriaLabel: "FR215F интерактивті техникалық сипаттамалары",
    performanceTitle: "Тиімділік профилі",
    performancePower: "Қуат",
    performanceEfficiency: "Жанармай үнемділігі",
    performanceCycle: "Цикл өнімділігі",
    performanceFootnote:
      "FR215F конфигурациясы міндеттерді орындау жылдамдығын сақтай отырып, мотосағат құнын төмендетуге бағытталған.",
    sectionMediaKicker: "Медиа",
    sectionMediaTitle: "Фото және видео таныстырылым",
    sectionMediaLead: "Жоғары сапалы медиаға арналған резервтік аймақтар. Контентті нақты материалдарға тез ауыстыруға болады.",
    videoHint: "FR215F видео шолуы",
    videoTitle: "FR215F видео шолуы",
    videoMissing: "Автоматты қосу үшін public қалтасына videos/FR215F-overview.mp4 файлын қосыңыз.",
    galleryExterior: "Сыртқы көрініс галереясы",
    galleryExteriorLead: "Жоғары ажыратымдылықтағы фотоға арналған орын.",
    galleryCabin: "Кабина және тораптар галереясы",
    galleryCabinLead: "Кабина мен жұмыс бөлігі түсірілімдеріне арналған орын.",
    sectionUseCasesKicker: "Сценарийлер",
    sectionUseCasesTitle: "Қолдану сценарийлері",
    sectionUseCasesLead: "Саланы таңдап, FR215F нақты бизнес міндеттерін қалай жабатынын бағалаңыз.",
    useCasesAriaLabel: "FR215F қолдану сценарийлері",
    useCasePointOne: "Міндетке жедел бейімделу",
    useCasePointTwo: "Ауысым бойы тұрақты өнімділік",
    useCasePointThree: "Жанармай мен сервис шығындарын бақылау",
    sectionServiceKicker: "Сервис",
    sectionServiceTitle: "Кепілдік, сервис және қолдау",
    sectionServiceLead: "Операциялық тәуекелдерді азайтуға арналған Turkuaz Machinery CA сенімді сатудан кейінгі экожүйесі.",
    serviceCitiesAriaLabel: "Сервис орталықтары",
    serviceContact: "Сервис қызметімен байланысу",
    finalTitle: "FR215F бойынша жеке ұсыныс алуға дайынсыз ба?",
    finalLead:
      "Өтінім қалдырыңыз, біз жобаңызға есеп дайындаймыз: баға, жеткізу мерзімі, аспалы жабдық конфигурациясы және сервис қолдауының кестесі.",
    finalDownload: "Коммерциялық ұсыныс",
    finalCall: "Қоңырау шалу",
    finalMessage: "Мессенджер",
    featureCards: [
      {
        title: "Қосымша гидравликалық жүйе",
        description: "Ауыр циклдерде өнімділікті жоғалтпай, аспалы жабдықты жылдам қосуға дайын.",
        icon: Wrench,
      },
      {
        title: "Жаңа буын LED-оптикасы",
        description: "Кешкі және түнгі ауысымда қауіпсіз әрі дәл жұмысқа арналған біркелкі жарық.",
        icon: Zap,
      },
      {
        title: "Артқы көрініс камерасы",
        description: "Шектеулі алаңда маневр жасағанда артқы аймақты сенімді бақылау және соқыр нүктелерді көру.",
        icon: Camera,
      },
    ],
    statCards: [
      { value: "129 kW", label: "Қозғалтқыш қуаты", icon: Gauge },
      { value: "-25%", label: "Жанармай шығыны төмен", icon: Fuel },
      { value: "Жоғары", label: "Өнімділік", icon: Sparkles },
    ],
    specRows: [
      {
        id: "class",
        label: "Техника класы",
        value: "21-22 т гидравликалық экскаватор",
        details: "Қалалық және өнеркәсіптік қолдануға арналған масса мен тарту күшінің оңтайлы балансы.",
        metrics: { power: 86, efficiency: 84, cycle: 90 },
      },
      {
        id: "powertrain",
        label: "Күштік қондырғы",
        value: "Оңтайландырылған тартуы бар 129 kW қозғалтқыш",
        details: "Жоғары айналу моменті жүктеме кезінде гидрожүйенің жылдам жауабын қамтамасыз етеді.",
        metrics: { power: 94, efficiency: 85, cycle: 91 },
      },
      {
        id: "efficiency",
        label: "Үнемділік",
        value: "Жанармай шығынын 25%-ға дейін азайту",
        details: "Жұмыс режимдерін интеллектуалды басқару мотосағат құнын төмендетеді.",
        metrics: { power: 84, efficiency: 96, cycle: 89 },
      },
      {
        id: "duty",
        label: "Жұмыс режимі",
        value: "24/7 циклінде тұрақты өнімділік",
        details: "Компоненттер жоғары жүктемелі ұзақ ауысымдарға есептелген.",
        metrics: { power: 90, efficiency: 87, cycle: 95 },
      },
      {
        id: "attachments",
        label: "Аспалы жабдық",
        value: "Гидробалға, грейфер, жылдам жалғағышты қолдау",
        details: "Кеңейтілген гидролиния FR215F-ті түрлі міндеттерге бейімдеуді жеделдетеді.",
        metrics: { power: 91, efficiency: 83, cycle: 93 },
      },
      {
        id: "comfort",
        label: "Оператор жайлылығы",
        value: "Тыныш кабина, жақсартылған шолу, эргономикалық басқару",
        details: "Жайлылық шаршауды азайтып, жұмыс сапасының тұрақтылығын арттырады.",
        metrics: { power: 82, efficiency: 88, cycle: 92 },
      },
    ],
    useCases: [
      {
        id: "construction",
        title: "Құрылыс",
        short: "Шұңқыр қазу, жоспарлау, алаң дайындау.",
        details: "FR215F тығыз қалалық кестеде нақты қимыл мен тұрақты гидравликаны қамтамасыз етеді.",
      },
      {
        id: "quarry",
        title: "Карьер және инертті материалдар",
        short: "Интенсивті тиеу және топырақ тасымалдау.",
        details: "Жоғары өнімділік пен ресурс тораптары абразивті жағдайда сенімді жұмыс істеуге мүмкіндік береді.",
      },
      {
        id: "demolition",
        title: "Демонтаж",
        short: "Гидробалға және арнайы аспамен жұмыс.",
        details: "Қосымша гидролиния аспалы жабдықтың мүмкіндігін толық ашып, демонтажды жылдамдатады.",
      },
      {
        id: "municipal",
        title: "Коммуналдық жұмыстар",
        short: "Желілер, абаттандыру, инфрақұрылымды жөндеу.",
        details: "Маневрлік, шолу және LED-оптика шектеулі қалалық кеңістікте қауіпсіздік пен дәлдікті арттырады.",
      },
    ],
    serviceCards: [
      {
        title: "Кеңейтілген кепілдік",
        description: "ІЖҚ және негізгі сорғы үшін: 10 000 мотосағат немесе 3 жыл пайдалану.",
      },
      {
        title: "Көшпелі сервис",
        description: "Қазақстанның барлық өңіріне жедел сервис шығуы.",
      },
      {
        title: "Қосалқы бөлшек қоймасы",
        description: "Алматыдағы ірі орталық қойма және өңірлердегі қосымша қоймалар.",
      },
    ],
    serviceCities: ["Алматы", "Астана", "Ақтөбе", "Қарағанды", "Атырау", "Шымкент"],
  },
};

const CONTACT_PHONE = "+77000000000";
const CONTACT_PHONE_LINK = `tel:${CONTACT_PHONE}`;
const CONTACT_WHATSAPP_LINK = "https://wa.me/77000000000";
const FR215F_VIDEO_SRC = `${import.meta.env.BASE_URL}videos/FR215F-overview.mp4`;
const FR215F_VIDEO_POSTER = `${import.meta.env.BASE_URL}videos/FR215F-poster.jpg`;
const FR215F_CP_URL = `${import.meta.env.BASE_URL}docs/FR215F-commercial-offer.pdf`;
const FR215F_HERO_IMAGE = `${import.meta.env.BASE_URL}FR215F.png`;

export default function FR215F({ onBack }: Props) {
  const language = useAppLanguage();
  const copy = FR215F_COPY[language] ?? FR215F_COPY.ru;

  const [activeUseCaseId, setActiveUseCaseId] = useState(copy.useCases[0].id);
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);
  const [activeSpecId, setActiveSpecId] = useState(copy.specRows[1].id);
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPageReady(true);
    }, 520);

    return () => window.clearTimeout(timer);
  }, []);

  const selectedUseCaseId = copy.useCases.some((item) => item.id === activeUseCaseId) ? activeUseCaseId : copy.useCases[0].id;
  const selectedSpecId = copy.specRows.some((item) => item.id === activeSpecId) ? activeSpecId : copy.specRows[1].id;

  const activeUseCase = copy.useCases.find((item) => item.id === selectedUseCaseId) ?? copy.useCases[0];
  const activeSpec = copy.specRows.find((item) => item.id === selectedSpecId) ?? copy.specRows[1];
  const activeTabId = `fr215f-tab-${activeUseCase.id}`;

  const metricRows = useMemo(
    () => [
      { label: copy.performancePower, value: activeSpec.metrics.power },
      { label: copy.performanceEfficiency, value: activeSpec.metrics.efficiency },
      { label: copy.performanceCycle, value: activeSpec.metrics.cycle },
    ],
    [activeSpec.metrics.cycle, activeSpec.metrics.efficiency, activeSpec.metrics.power, copy.performanceCycle, copy.performanceEfficiency, copy.performancePower]
  );

  return (
    <div className={`fr215f-page ${isPageReady ? "is-ready" : ""}`}>
      <motion.div
        className="fr215f-loader"
        aria-hidden={isPageReady}
        initial={{ opacity: 1 }}
        animate={{ opacity: isPageReady ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="fr215f-loaderCard"
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Turkuaz Machinery CA</span>
          <strong>{copy.loaderTitle}</strong>
          <motion.em
            className="fr215f-loaderBar"
            initial={{ scaleX: 0.2 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </motion.div>

      <button className="fr215f-back" type="button" onClick={onBack} aria-label={copy.back}>
        <ArrowLeft size={18} />
        <span>{copy.back}</span>
      </button>

      <main className="fr215f-layout">
        <motion.section className="fr215f-hero" variants={revealVariants} initial="hidden" animate="show">
          <div className="fr215f-heroGrid">
            <div className="fr215f-heroPrimary">
              <span className="fr215f-kicker">
                <span className="fr215f-brandLine">Turkuaz Machinery CA</span>
                <span className="fr215f-brandLine">{copy.brandSeries}</span>
              </span>
              <h1 className="fr215f-modelTitle">
                LOVOL <span>FR215F</span>
              </h1>
              <p className="fr215f-heroCopy">{copy.heroLead}</p>

              <motion.div className="fr215f-heroStats" variants={sectionStaggerVariants} initial="hidden" animate="show">
                {copy.statCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.article key={item.label} className="fr215f-stat" variants={cardVariants} whileHover={{ y: -4 }}>
                      <span className="fr215f-statIcon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </motion.article>
                  );
                })}
              </motion.div>

              <div className="fr215f-heroActions">
                <a className="fr215f-action fr215f-action--primary" href={FR215F_CP_URL} target="_blank" rel="noreferrer" data-feedback="primary">
                  <Download size={18} />
                  <span>{copy.actionDownloadOffer}</span>
                </a>
                <a className="fr215f-action" href={CONTACT_PHONE_LINK} data-feedback="primary">
                  <Phone size={18} />
                  <span>{copy.actionCallManager}</span>
                </a>
                <a className="fr215f-action" href={CONTACT_WHATSAPP_LINK} target="_blank" rel="noreferrer" data-feedback="primary">
                  <MessageCircle size={18} />
                  <span>{copy.actionMessage}</span>
                </a>
              </div>
            </div>

            <motion.aside
              className="fr215f-heroVisual"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.62, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="fr215f-heroMediaWrap">
                <img src={FR215F_HERO_IMAGE} alt={copy.heroImageAlt} loading="eager" decoding="async" />
              </div>
              <div className="fr215f-heroBadges" aria-hidden="true">
                <span>{copy.heroBadgeClass}</span>
                <span>129 kW</span>
                <span>{copy.heroBadgeFuel}</span>
              </div>
            </motion.aside>
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">{copy.sectionAdvantagesKicker}</span>
            <h2>{copy.sectionAdvantagesTitle}</h2>
            <p>{copy.sectionAdvantagesLead}</p>
          </header>

          <motion.div className="fr215f-featureGrid" variants={sectionStaggerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {copy.featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.article key={feature.title} className="fr215f-featureCard" variants={cardVariants} whileHover={{ y: -5 }}>
                  <span className="fr215f-featureIcon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">{copy.sectionSpecsKicker}</span>
            <h2>{copy.sectionSpecsTitle}</h2>
            <p>{copy.sectionSpecsLead}</p>
          </header>

          <div className="fr215f-specPanel">
            <div className="fr215f-specCardGrid" role="list" aria-label={copy.specsAriaLabel}>
              {copy.specRows.map((row) => (
                <motion.button
                  key={row.id}
                  type="button"
                  role="listitem"
                  className={`fr215f-specCard ${row.id === selectedSpecId ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveSpecId(row.id)}
                  onFocus={() => setActiveSpecId(row.id)}
                  onClick={() => setActiveSpecId(row.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </motion.button>
              ))}
            </div>
            <div className="fr215f-performanceCard">
              <h3>{copy.performanceTitle}</h3>
              <h4>{activeSpec.label}</h4>
              <p>{activeSpec.details}</p>
              <div className="fr215f-performanceBars">
                {metricRows.map((metric) => (
                  <div key={metric.label}>
                    <header>
                      <span>{metric.label}</span>
                      <strong>{metric.value}%</strong>
                    </header>
                    <span className="fr215f-performanceTrack" aria-hidden="true">
                      <motion.em
                        key={`${activeSpec.id}-${metric.label}`}
                        style={{ width: `${metric.value}%` }}
                        initial={{ scaleX: 0.2, opacity: 0.6 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                  </div>
                ))}
              </div>
              <p>{copy.performanceFootnote}</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">{copy.sectionMediaKicker}</span>
            <h2>{copy.sectionMediaTitle}</h2>
            <p>{copy.sectionMediaLead}</p>
          </header>

          <div className="fr215f-mediaGrid">
            <article className="fr215f-mediaCard fr215f-mediaCard--video">
              {isVideoAvailable ? (
                <div className="fr215f-videoWrap">
                  <video
                    className="fr215f-videoPlayer"
                    controls
                    preload="metadata"
                    playsInline
                    poster={FR215F_VIDEO_POSTER}
                    onError={() => setIsVideoAvailable(false)}
                  >
                    <source src={FR215F_VIDEO_SRC} type="video/mp4" />
                  </video>
                  <span className="fr215f-videoHint">{copy.videoHint}</span>
                </div>
              ) : (
                <>
                  <PlayCircle size={28} />
                  <h3>{copy.videoTitle}</h3>
                  <p>{copy.videoMissing}</p>
                </>
              )}
            </article>
            <article className="fr215f-mediaCard">
              <Image size={26} />
              <h3>{copy.galleryExterior}</h3>
              <p>{copy.galleryExteriorLead}</p>
            </article>
            <article className="fr215f-mediaCard">
              <Image size={26} />
              <h3>{copy.galleryCabin}</h3>
              <p>{copy.galleryCabinLead}</p>
            </article>
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">{copy.sectionUseCasesKicker}</span>
            <h2>{copy.sectionUseCasesTitle}</h2>
            <p>{copy.sectionUseCasesLead}</p>
          </header>

          <div className="fr215f-useCases">
            <div className="fr215f-useCaseTabs" role="tablist" aria-label={copy.useCasesAriaLabel}>
              {copy.useCases.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  id={`fr215f-tab-${item.id}`}
                  role="tab"
                  aria-selected={item.id === selectedUseCaseId}
                  aria-controls="fr215f-usecase-panel"
                  className={`fr215f-useCaseTab ${item.id === selectedUseCaseId ? "is-active" : ""}`}
                  onClick={() => setActiveUseCaseId(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>{item.title}</span>
                  <small>{item.short}</small>
                </motion.button>
              ))}
            </div>

            <article className="fr215f-useCaseDetail" id="fr215f-usecase-panel" role="tabpanel" aria-labelledby={activeTabId}>
              <h3>{activeUseCase.title}</h3>
              <p>{activeUseCase.details}</p>
              <div className="fr215f-useCasePoints">
                <span>
                  <CheckCircle2 size={16} />
                  {copy.useCasePointOne}
                </span>
                <span>
                  <CheckCircle2 size={16} />
                  {copy.useCasePointTwo}
                </span>
                <span>
                  <CheckCircle2 size={16} />
                  {copy.useCasePointThree}
                </span>
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section className="fr215f-section fr215f-section--service" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">{copy.sectionServiceKicker}</span>
            <h2>{copy.sectionServiceTitle}</h2>
            <p>{copy.sectionServiceLead}</p>
          </header>

          <div className="fr215f-serviceGrid">
            <article>
              <ShieldCheck size={20} />
              <h3>{copy.serviceCards[0].title}</h3>
              <p>{copy.serviceCards[0].description}</p>
            </article>

            <article>
              <Wrench size={20} />
              <h3>{copy.serviceCards[1].title}</h3>
              <p>{copy.serviceCards[1].description}</p>
            </article>

            <article>
              <Warehouse size={20} />
              <h3>{copy.serviceCards[2].title}</h3>
              <p>{copy.serviceCards[2].description}</p>
            </article>
          </div>

          <div className="fr215f-serviceFooter">
            <div className="fr215f-serviceCities" aria-label={copy.serviceCitiesAriaLabel}>
              <MapPin size={16} />
              {copy.serviceCities.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </div>
            <a href={CONTACT_PHONE_LINK} className="fr215f-inlineContact" data-feedback="primary">
              {copy.serviceContact}
              <ChevronRight size={16} />
            </a>
          </div>
        </motion.section>

        <motion.section className="fr215f-finalCta" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <h2>{copy.finalTitle}</h2>
          <p>{copy.finalLead}</p>
          <div className="fr215f-finalActions">
            <a href={FR215F_CP_URL} target="_blank" rel="noreferrer" className="fr215f-action fr215f-action--primary" data-feedback="primary">
              <Download size={18} />
              <span>{copy.finalDownload}</span>
            </a>
            <a href={CONTACT_PHONE_LINK} className="fr215f-action" data-feedback="primary">
              <Phone size={18} />
              <span>{copy.finalCall}</span>
            </a>
            <a href={CONTACT_WHATSAPP_LINK} target="_blank" rel="noreferrer" className="fr215f-action" data-feedback="primary">
              <MessageCircle size={18} />
              <span>{copy.finalMessage}</span>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
