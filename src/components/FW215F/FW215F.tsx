import { useState } from "react";
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
import "./FW215F.css";

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

type SpecRow = {
  label: string;
  value: string;
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

type PerformanceRow = {
  label: string;
  value: string;
};

type Fw215fCopy = {
  back: string;
  brandSeries: string;
  heroLead: string;
  actionDownloadOffer: string;
  actionCallManager: string;
  actionMessage: string;
  sectionAdvantagesTitle: string;
  sectionAdvantagesLead: string;
  sectionSpecsTitle: string;
  sectionSpecsLead: string;
  performanceTitle: string;
  performanceLead: string;
  sectionMediaTitle: string;
  sectionMediaLead: string;
  videoStartAria: string;
  videoStartTitle: string;
  videoStartLead: string;
  videoHint: string;
  videoTitle: string;
  videoMissing: string;
  galleryExterior: string;
  galleryExteriorLead: string;
  galleryCabin: string;
  galleryCabinLead: string;
  sectionUseCasesTitle: string;
  sectionUseCasesLead: string;
  useCasesAriaLabel: string;
  useCasePointOne: string;
  useCasePointTwo: string;
  useCasePointThree: string;
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
  specRows: SpecRow[];
  performanceRows: PerformanceRow[];
  useCases: UseCase[];
  serviceCards: ServiceCard[];
  serviceCities: string[];
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.64, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const FW215F_COPY: Record<AppLanguage, Fw215fCopy> = {
  en: {
    back: "Back",
    brandSeries: "Premium excavator series",
    heroLead:
      "Interactive showcase of a new-generation wheeled excavator: power, efficiency and service infrastructure that reduces downtime risks and speeds up project payback.",
    actionDownloadOffer: "Download commercial offer",
    actionCallManager: "Call manager",
    actionMessage: "Message",
    sectionAdvantagesTitle: "Key advantages",
    sectionAdvantagesLead: "Practical technologies that directly improve safety, productivity and operating flexibility.",
    sectionSpecsTitle: "Technical specifications",
    sectionSpecsLead: "Modern visual presentation of FW215F performance strengths.",
    performanceTitle: "Efficiency profile",
    performanceLead: "FW215F configuration is tuned to minimize hourly ownership costs while keeping high job execution speed.",
    sectionMediaTitle: "Photo and video showcase",
    sectionMediaLead: "Reserved zones for high-quality media. Content can be quickly replaced with real materials.",
    videoStartAria: "Start FW215F video overview",
    videoStartTitle: "Start video overview",
    videoStartLead: "Video starts loading after click for faster initial page rendering",
    videoHint: "FW215F video overview",
    videoTitle: "FW215F video overview",
    videoMissing: "Add videos/FW215F-overview.mp4 in public to connect the preview automatically.",
    galleryExterior: "Exterior gallery",
    galleryExteriorLead: "Placeholder for high-resolution exterior photos.",
    galleryCabin: "Cabin and components gallery",
    galleryCabinLead: "Placeholder for detailed cabin and working-unit photography.",
    sectionUseCasesTitle: "Application scenarios",
    sectionUseCasesLead: "Select an industry and evaluate how FW215F addresses real business tasks.",
    useCasesAriaLabel: "FW215F application scenarios",
    useCasePointOne: "Fast adaptation to each task",
    useCasePointTwo: "Stable shift productivity",
    useCasePointThree: "Controlled fuel and service costs",
    sectionServiceTitle: "Warranty, service and support",
    sectionServiceLead: "Reliable after-sales ecosystem from Turkuaz Machinery CA to reduce operational risk.",
    serviceCitiesAriaLabel: "Service hubs",
    serviceContact: "Contact service team",
    finalTitle: "Ready to receive a tailored FW215F offer?",
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
      { value: "124 kW", label: "Engine power", icon: Gauge },
      { value: "-25%", label: "Lower fuel consumption", icon: Fuel },
      { value: "High", label: "Productivity", icon: Sparkles },
    ],
    specRows: [
      { label: "Machine class", value: "Wheeled hydraulic excavator" },
      { label: "Powertrain", value: "124 kW engine with optimized torque" },
      { label: "Efficiency", value: "Fuel consumption reduction up to 25%" },
      { label: "Duty cycle", value: "Stable performance in 24/7 operation" },
      { label: "Attachments", value: "Hammer, grapple and quick-coupler support" },
      { label: "Operator comfort", value: "Quiet cabin, improved visibility, ergonomic control" },
    ],
    performanceRows: [
      { label: "Power", value: "90%" },
      { label: "Fuel efficiency", value: "88%" },
      { label: "Cycle productivity", value: "93%" },
    ],
    useCases: [
      {
        id: "construction",
        title: "Construction",
        short: "Excavation, grading and site preparation.",
        details: "FW215F delivers precise work movements and stable hydraulics in dense urban schedules.",
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
    back: "Назад",
    brandSeries: "Премиальная серия экскаваторов",
    heroLead:
      "Интерактивная презентация экскаватора нового поколения: мощность, экономичность и сервисная инфраструктура, которая снижает риски простоя и ускоряет окупаемость проекта.",
    actionDownloadOffer: "Скачать коммерческое предложение",
    actionCallManager: "Позвонить менеджеру",
    actionMessage: "Написать в мессенджер",
    sectionAdvantagesTitle: "Ключевые преимущества",
    sectionAdvantagesLead: "Практичные технологии, которые напрямую влияют на безопасность, производительность и гибкость эксплуатации.",
    sectionSpecsTitle: "Технические характеристики",
    sectionSpecsLead: "Современная инфографика для быстрого понимания сильных сторон модели FW215F.",
    performanceTitle: "Профиль эффективности",
    performanceLead: "Конфигурация FW215F ориентирована на минимизацию стоимости моточаса при сохранении высокой скорости выполнения задач.",
    sectionMediaTitle: "Фото и видео презентация",
    sectionMediaLead: "Резервные зоны для медиа высокого качества. Контент можно быстро заменить на реальные материалы.",
    videoStartAria: "Запустить видеообзор FW215F",
    videoStartTitle: "Запустить видеообзор",
    videoStartLead: "Видео загружается только после нажатия для более быстрого открытия страницы",
    videoHint: "Видеообзор FW215F",
    videoTitle: "Видеообзор FW215F",
    videoMissing: "Добавьте файл videos/FW215F-overview.mp4 в папку public для автоматического подключения.",
    galleryExterior: "Галерея экстерьера",
    galleryExteriorLead: "Плейсхолдер для фото в высоком разрешении.",
    galleryCabin: "Галерея кабины и узлов",
    galleryCabinLead: "Плейсхолдер для детальных снимков кабины и рабочей части.",
    sectionUseCasesTitle: "Сценарии применения",
    sectionUseCasesLead: "Выберите отрасль и оцените, как FW215F закрывает реальные задачи бизнеса.",
    useCasesAriaLabel: "Сценарии применения FW215F",
    useCasePointOne: "Быстрая адаптация под задачу",
    useCasePointTwo: "Стабильная производительность смены",
    useCasePointThree: "Контроль затрат на топливо и сервис",
    sectionServiceTitle: "Гарантия, сервис и поддержка",
    sectionServiceLead: "Надежная послепродажная экосистема Turkuaz Machinery CA для снижения операционных рисков.",
    serviceCitiesAriaLabel: "Сервисные центры",
    serviceContact: "Связаться с сервисной службой",
    finalTitle: "Готовы получить персональное предложение по FW215F?",
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
      { value: "124 kW", label: "Мощность двигателя", icon: Gauge },
      { value: "-25%", label: "Расход топлива ниже конкурентов", icon: Fuel },
      { value: "Высокая", label: "Производительность", icon: Sparkles },
    ],
    specRows: [
      { label: "Класс техники", value: "Колесный гидравлический экскаватор" },
      { label: "Силовая установка", value: "Двигатель 124 kW с оптимизированной тягой" },
      { label: "Экономичность", value: "Снижение расхода топлива до 25%" },
      { label: "Рабочий режим", value: "Стабильная производительность в цикле 24/7" },
      { label: "Навесное оборудование", value: "Поддержка гидромолота, грейфера, быстросъема" },
      { label: "Комфорт оператора", value: "Тихая кабина, улучшенная обзорность, эргономичное управление" },
    ],
    performanceRows: [
      { label: "Мощность", value: "90%" },
      { label: "Топливная экономичность", value: "88%" },
      { label: "Производительность цикла", value: "93%" },
    ],
    useCases: [
      {
        id: "construction",
        title: "Строительство",
        short: "Котлованы, планировка, подготовка площадок.",
        details: "FW215F обеспечивает точные рабочие движения и стабильную гидравлику в плотном городском графике.",
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
    back: "Артқа",
    brandSeries: "Экскаваторлардың премиум сериясы",
    heroLead:
      "Жаңа буындағы экскаватордың интерактивті таныстырылымы: қуат, үнемділік және тоқтап қалу тәуекелін азайтып, жобаның өтелуін жылдамдататын сервистік инфрақұрылым.",
    actionDownloadOffer: "Коммерциялық ұсынысты жүктеу",
    actionCallManager: "Менеджерге қоңырау шалу",
    actionMessage: "Мессенджерге жазу",
    sectionAdvantagesTitle: "Негізгі артықшылықтар",
    sectionAdvantagesLead: "Қауіпсіздікке, өнімділікке және пайдалану икемділігіне тікелей әсер ететін практикалық технологиялар.",
    sectionSpecsTitle: "Техникалық сипаттамалар",
    sectionSpecsLead: "FW215F моделінің басым тұстарын жылдам түсінуге арналған заманауи инфографика.",
    performanceTitle: "Тиімділік профилі",
    performanceLead: "FW215F конфигурациясы міндеттерді орындау жылдамдығын сақтай отырып, мотосағат құнын төмендетуге бағытталған.",
    sectionMediaTitle: "Фото және видео таныстырылым",
    sectionMediaLead: "Жоғары сапалы медиаға арналған резервтік аймақтар. Контентті нақты материалдарға тез ауыстыруға болады.",
    videoStartAria: "FW215F видео шолуын іске қосу",
    videoStartTitle: "Видео шолуды іске қосу",
    videoStartLead: "Бетті жылдам ашу үшін видео тек басқаннан кейін жүктеледі",
    videoHint: "FW215F видео шолуы",
    videoTitle: "FW215F видео шолуы",
    videoMissing: "Автоматты қосу үшін public қалтасына videos/FW215F-overview.mp4 файлын қосыңыз.",
    galleryExterior: "Сыртқы көрініс галереясы",
    galleryExteriorLead: "Жоғары ажыратымдылықтағы фотоға арналған орын.",
    galleryCabin: "Кабина және тораптар галереясы",
    galleryCabinLead: "Кабина мен жұмыс бөлігі түсірілімдеріне арналған орын.",
    sectionUseCasesTitle: "Қолдану сценарийлері",
    sectionUseCasesLead: "Саланы таңдап, FW215F нақты бизнес міндеттерін қалай жабатынын бағалаңыз.",
    useCasesAriaLabel: "FW215F қолдану сценарийлері",
    useCasePointOne: "Міндетке жедел бейімделу",
    useCasePointTwo: "Ауысым бойы тұрақты өнімділік",
    useCasePointThree: "Жанармай мен сервис шығындарын бақылау",
    sectionServiceTitle: "Кепілдік, сервис және қолдау",
    sectionServiceLead: "Операциялық тәуекелдерді азайтуға арналған Turkuaz Machinery CA сенімді сатудан кейінгі экожүйесі.",
    serviceCitiesAriaLabel: "Сервис орталықтары",
    serviceContact: "Сервис қызметімен байланысу",
    finalTitle: "FW215F бойынша жеке ұсыныс алуға дайынсыз ба?",
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
      { value: "124 kW", label: "Қозғалтқыш қуаты", icon: Gauge },
      { value: "-25%", label: "Жанармай шығыны төмен", icon: Fuel },
      { value: "Жоғары", label: "Өнімділік", icon: Sparkles },
    ],
    specRows: [
      { label: "Техника класы", value: "Дөңгелекті гидравликалық экскаватор" },
      { label: "Күштік қондырғы", value: "Оңтайландырылған тартуы бар 124 kW қозғалтқыш" },
      { label: "Үнемділік", value: "Жанармай шығынын 25%-ға дейін азайту" },
      { label: "Жұмыс режимі", value: "24/7 циклінде тұрақты өнімділік" },
      { label: "Аспалы жабдық", value: "Гидробалға, грейфер, жылдам жалғағышты қолдау" },
      { label: "Оператор жайлылығы", value: "Тыныш кабина, жақсартылған шолу, эргономикалық басқару" },
    ],
    performanceRows: [
      { label: "Қуат", value: "90%" },
      { label: "Жанармай үнемділігі", value: "88%" },
      { label: "Цикл өнімділігі", value: "93%" },
    ],
    useCases: [
      {
        id: "construction",
        title: "Құрылыс",
        short: "Шұңқыр қазу, жоспарлау, алаң дайындау.",
        details: "FW215F тығыз қалалық кестеде нақты қимыл мен тұрақты гидравликаны қамтамасыз етеді.",
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
const FW215F_VIDEO_SRC = `${import.meta.env.BASE_URL}videos/FW215F-mobile.mp4`;
const FW215F_VIDEO_FALLBACK_SRC = `${import.meta.env.BASE_URL}videos/FW215F.MP4`;
const FW215F_VIDEO_POSTER = `${import.meta.env.BASE_URL}videos/FW215F-poster.jpg`;
const FW215F_CP_URL = `${import.meta.env.BASE_URL}docs/FW215F-commercial-offer.pdf`;

export default function FW215F({ onBack }: Props) {
  const language = useAppLanguage();
  const copy = FW215F_COPY[language] ?? FW215F_COPY.ru;

  const [activeUseCaseId, setActiveUseCaseId] = useState(copy.useCases[0].id);
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);
  const [isVideoActivated, setIsVideoActivated] = useState(false);

  const selectedUseCaseId = copy.useCases.some((item) => item.id === activeUseCaseId) ? activeUseCaseId : copy.useCases[0].id;
  const activeUseCase = copy.useCases.find((item) => item.id === selectedUseCaseId) ?? copy.useCases[0];
  const activeTabId = `fw215f-tab-${activeUseCase.id}`;

  return (
    <div className="fw215f-page">
      <button className="fw215f-back" type="button" onClick={onBack} aria-label={copy.back}>
        <ArrowLeft size={18} />
        <span>{copy.back}</span>
      </button>

      <main className="fw215f-layout">
        <motion.section className="fw215f-hero" variants={revealVariants} initial="hidden" animate="show">
          <span className="fw215f-kicker">
            <span className="fw215f-brandLine">Turkuaz Machinery CA</span>
            <span className="fw215f-brandLine">{copy.brandSeries}</span>
          </span>
          <h1 className="fw215f-modelTitle">
            LOVOL <span>FW215F</span>
          </h1>
          <p className="fw215f-heroCopy">{copy.heroLead}</p>

          <div className="fw215f-heroStats">
            {copy.statCards.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article key={item.label} className="fw215f-stat" variants={cardVariants} whileHover={{ y: -4 }}>
                  <span className="fw215f-statIcon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </motion.article>
              );
            })}
          </div>

          <div className="fw215f-heroActions">
            <a className="fw215f-action fw215f-action--primary" href={FW215F_CP_URL} target="_blank" rel="noreferrer" data-feedback="primary">
              <Download size={18} />
              <span>{copy.actionDownloadOffer}</span>
            </a>
            <a className="fw215f-action" href={CONTACT_PHONE_LINK} data-feedback="primary">
              <Phone size={18} />
              <span>{copy.actionCallManager}</span>
            </a>
            <a className="fw215f-action" href={CONTACT_WHATSAPP_LINK} target="_blank" rel="noreferrer" data-feedback="primary">
              <MessageCircle size={18} />
              <span>{copy.actionMessage}</span>
            </a>
          </div>
        </motion.section>

        <motion.section className="fw215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fw215f-sectionHeader">
            <h2>{copy.sectionAdvantagesTitle}</h2>
            <p>{copy.sectionAdvantagesLead}</p>
          </header>

          <div className="fw215f-featureGrid">
            {copy.featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.article key={feature.title} className="fw215f-featureCard" variants={cardVariants} whileHover={{ y: -5 }}>
                  <span className="fw215f-featureIcon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section className="fw215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fw215f-sectionHeader">
            <h2>{copy.sectionSpecsTitle}</h2>
            <p>{copy.sectionSpecsLead}</p>
          </header>

          <div className="fw215f-specPanel">
            <div className="fw215f-specTable" role="list">
              {copy.specRows.map((row) => (
                <div key={row.label} className="fw215f-specRow" role="listitem">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              ))}
            </div>
            <div className="fw215f-performanceCard">
              <h3>{copy.performanceTitle}</h3>
              <div className="fw215f-performanceBars">
                {copy.performanceRows.map((row) => (
                  <div key={row.label}>
                    <span>{row.label}</span>
                    <em style={{ width: row.value }} />
                  </div>
                ))}
              </div>
              <p>{copy.performanceLead}</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="fw215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fw215f-sectionHeader">
            <h2>{copy.sectionMediaTitle}</h2>
            <p>{copy.sectionMediaLead}</p>
          </header>

          <div className="fw215f-mediaGrid">
            <article className="fw215f-mediaCard fw215f-mediaCard--video">
              {isVideoAvailable ? (
                <div className="fw215f-videoWrap">
                  {isVideoActivated ? (
                    <video
                      className="fw215f-videoPlayer"
                      controls
                      preload="none"
                      playsInline
                      muted={false}
                      poster={FW215F_VIDEO_POSTER}
                      onError={() => setIsVideoAvailable(false)}
                    >
                      <source src={FW215F_VIDEO_SRC} type="video/mp4" />
                      <source src={FW215F_VIDEO_FALLBACK_SRC} type="video/mp4" />
                    </video>
                  ) : (
                    <button type="button" className="fw215f-videoActivator" onClick={() => setIsVideoActivated(true)} aria-label={copy.videoStartAria}>
                      <PlayCircle size={42} />
                      <span>{copy.videoStartTitle}</span>
                      <small>{copy.videoStartLead}</small>
                    </button>
                  )}
                  <span className="fw215f-videoHint">{copy.videoHint}</span>
                </div>
              ) : (
                <>
                  <PlayCircle size={28} />
                  <h3>{copy.videoTitle}</h3>
                  <p>{copy.videoMissing}</p>
                </>
              )}
            </article>
            <article className="fw215f-mediaCard">
              <Image size={26} />
              <h3>{copy.galleryExterior}</h3>
              <p>{copy.galleryExteriorLead}</p>
            </article>
            <article className="fw215f-mediaCard">
              <Image size={26} />
              <h3>{copy.galleryCabin}</h3>
              <p>{copy.galleryCabinLead}</p>
            </article>
          </div>
        </motion.section>

        <motion.section className="fw215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fw215f-sectionHeader">
            <h2>{copy.sectionUseCasesTitle}</h2>
            <p>{copy.sectionUseCasesLead}</p>
          </header>

          <div className="fw215f-useCases">
            <div className="fw215f-useCaseTabs" role="tablist" aria-label={copy.useCasesAriaLabel}>
              {copy.useCases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  id={`fw215f-tab-${item.id}`}
                  role="tab"
                  aria-selected={item.id === selectedUseCaseId}
                  aria-controls="fw215f-usecase-panel"
                  className={`fw215f-useCaseTab ${item.id === selectedUseCaseId ? "is-active" : ""}`}
                  onClick={() => setActiveUseCaseId(item.id)}
                >
                  <span>{item.title}</span>
                  <small>{item.short}</small>
                </button>
              ))}
            </div>

            <article className="fw215f-useCaseDetail" id="fw215f-usecase-panel" role="tabpanel" aria-labelledby={activeTabId}>
              <h3>{activeUseCase.title}</h3>
              <p>{activeUseCase.details}</p>
              <div className="fw215f-useCasePoints">
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

        <motion.section className="fw215f-section fw215f-section--service" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fw215f-sectionHeader">
            <h2>{copy.sectionServiceTitle}</h2>
            <p>{copy.sectionServiceLead}</p>
          </header>

          <div className="fw215f-serviceGrid">
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

          <div className="fw215f-serviceFooter">
            <div className="fw215f-serviceCities" aria-label={copy.serviceCitiesAriaLabel}>
              <MapPin size={16} />
              {copy.serviceCities.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </div>
            <a href={CONTACT_PHONE_LINK} className="fw215f-inlineContact" data-feedback="primary">
              {copy.serviceContact}
              <ChevronRight size={16} />
            </a>
          </div>
        </motion.section>

        <motion.section className="fw215f-finalCta" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <h2>{copy.finalTitle}</h2>
          <p>{copy.finalLead}</p>
          <div className="fw215f-finalActions">
            <a href={FW215F_CP_URL} target="_blank" rel="noreferrer" className="fw215f-action fw215f-action--primary" data-feedback="primary">
              <Download size={18} />
              <span>{copy.finalDownload}</span>
            </a>
            <a href={CONTACT_PHONE_LINK} className="fw215f-action" data-feedback="primary">
              <Phone size={18} />
              <span>{copy.finalCall}</span>
            </a>
            <a href={CONTACT_WHATSAPP_LINK} target="_blank" rel="noreferrer" className="fw215f-action" data-feedback="primary">
              <MessageCircle size={18} />
              <span>{copy.finalMessage}</span>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
