import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Camera,
  Download,
  Fuel,
  Gauge,
  Image,
  MessageCircle,
  Phone,
  PlayCircle,
  ShieldCheck,
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

type TechSection = {
  id: string;
  title: string;
  lines: string[];
};

type WarrantyCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Fw215fCopy = {
  back: string;
  heroLead: string;
  actionDownloadOffer: string;
  actionCallManager: string;
  actionWhatsapp: string;
  specsTitle: string;
  specsLead: string;
  specPowerLabel: string;
  specPowerValue: string;
  specFuelLabel: string;
  specFuelValue: string;
  sectionAdvantagesTitle: string;
  sectionAdvantagesLead: string;
  sectionTechTitle: string;
  sectionTechLead: string;
  sectionTechAria: string;
  sectionMediaTitle: string;
  sectionMediaLead: string;
  photoTitle: string;
  photoLead: string;
  videoStartAria: string;
  videoStartTitle: string;
  videoStartLead: string;
  videoHint: string;
  videoTitle: string;
  videoMissing: string;
  sectionWarrantyTitle: string;
  sectionWarrantyLead: string;
  finalTitle: string;
  finalLead: string;
  finalDownload: string;
  finalCall: string;
  finalWhatsapp: string;
  featureCards: FeatureCard[];
  techSections: TechSection[];
  warrantyCards: WarrantyCard[];
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

const FW215F_COPY: Record<AppLanguage, Fw215fCopy> = {
  en: {
    back: "Back",
    heroLead: "A compact premium showcase focused on operating economics, attachment flexibility and service readiness for daily business work.",
    actionDownloadOffer: "Download commercial offer",
    actionCallManager: "Call manager",
    actionWhatsapp: "WhatsApp",
    specsTitle: "Specifications",
    specsLead: "Only the two metrics that decision-makers evaluate first.",
    specPowerLabel: "Engine power",
    specPowerValue: "124 kW",
    specFuelLabel: "Fuel consumption",
    specFuelValue: "Up to -25%",
    sectionAdvantagesTitle: "Key advantages",
    sectionAdvantagesLead: "Three practical features that influence speed, safety and operator confidence.",
    sectionTechTitle: "Technical advantages",
    sectionTechLead: "Core engineering blocks in a concise format for quick evaluation.",
    sectionTechAria: "FW215F technical advantages",
    sectionMediaTitle: "Media",
    sectionMediaLead: "Compact visual block for photo and real video overview.",
    photoTitle: "Photo",
    photoLead: "Exterior and working-zone image materials in high quality.",
    videoStartAria: "Start FW215F video overview",
    videoStartTitle: "Start video overview",
    videoStartLead: "The video loads only after click for a faster page opening.",
    videoHint: "FW215F video overview",
    videoTitle: "FW215F video overview",
    videoMissing: "Add videos/FW215F-overview.mp4 in public to connect the preview automatically.",
    sectionWarrantyTitle: "Warranty",
    sectionWarrantyLead: "Compact after-sales block focused on guarantee and support.",
    finalTitle: "Personal offer",
    finalLead: "Leave a request and receive a tailored package with pricing, availability and support conditions.",
    finalDownload: "Download offer",
    finalCall: "Call",
    finalWhatsapp: "WhatsApp",
    featureCards: [
      {
        title: "Auxiliary hydraulic line",
        description: "Quick connection of attachments with stable performance in heavy cycles.",
        icon: Wrench,
      },
      {
        title: "LED optics",
        description: "Clear uniform lighting for accurate and safe evening operations.",
        icon: Zap,
      },
      {
        title: "Rear-view camera",
        description: "Confident maneuvering with clear visibility in constrained zones.",
        icon: Camera,
      },
    ],
    techSections: [
      {
        id: "class",
        title: "Machine class",
        lines: [
          "Wheeled hydraulic excavator designed for urban operation.",
          "Balanced dimensions improve mobility on tight sites.",
        ],
      },
      {
        id: "powertrain",
        title: "Powertrain",
        lines: [
          "124 kW engine with optimized traction profile.",
          "Fast hydraulic response under real working loads.",
        ],
      },
      {
        id: "efficiency",
        title: "Efficiency",
        lines: [
          "Fuel savings up to 25% compared to baseline operation.",
          "Lower hourly ownership cost in continuous shifts.",
        ],
      },
      {
        id: "attachments",
        title: "Attachments",
        lines: [
          "Supports hammer, grapple and quick coupler systems.",
          "Rapid adaptation for construction, municipal and utility tasks.",
        ],
      },
      {
        id: "comfort",
        title: "Operator comfort",
        lines: [
          "Quiet cabin and improved sight lines reduce fatigue.",
          "Ergonomic controls help maintain stable work quality.",
        ],
      },
    ],
    warrantyCards: [
      {
        title: "Warranty",
        description: "Coverage for key power components on transparent operating terms.",
        icon: ShieldCheck,
      },
      {
        title: "Service and support",
        description: "Field service and parts support from Turkuaz Machinery CA.",
        icon: Wrench,
      },
    ],
  },
  ru: {
    back: "Назад",
    heroLead: "Компактная премиальная презентация, сфокусированная на экономике эксплуатации, гибкости навесного оборудования и сервисной готовности.",
    actionDownloadOffer: "Скачать коммерческое предложение",
    actionCallManager: "Позвонить менеджеру",
    actionWhatsapp: "WhatsApp",
    specsTitle: "Спецификации",
    specsLead: "Только два показателя, которые первыми оценивают при выборе техники.",
    specPowerLabel: "Мощность двигателя",
    specPowerValue: "124 кВт",
    specFuelLabel: "Расход топлива",
    specFuelValue: "До -25%",
    sectionAdvantagesTitle: "Ключевые преимущества",
    sectionAdvantagesLead: "Три практичных функции, которые влияют на скорость, безопасность и уверенность оператора.",
    sectionTechTitle: "Технические преимущества",
    sectionTechLead: "Ключевые инженерные блоки в сжатом формате для быстрой оценки.",
    sectionTechAria: "Технические преимущества FW215F",
    sectionMediaTitle: "Медиа",
    sectionMediaLead: "Компактный визуальный блок с фото и реальным видеообзором.",
    photoTitle: "Фото",
    photoLead: "Материалы по экстерьеру и рабочим сценариям в высоком качестве.",
    videoStartAria: "Запустить видеообзор FW215F",
    videoStartTitle: "Запустить видеообзор",
    videoStartLead: "Видео загружается только после нажатия для более быстрого открытия страницы.",
    videoHint: "Видеообзор FW215F",
    videoTitle: "Видеообзор FW215F",
    videoMissing: "Добавьте файл videos/FW215F-overview.mp4 в папку public для автоматического подключения.",
    sectionWarrantyTitle: "Гарантия",
    sectionWarrantyLead: "Компактный блок послепродажной поддержки: гарантия и сервис.",
    finalTitle: "Персональное предложение",
    finalLead: "Оставьте заявку и получите персональный пакет по цене, срокам поставки и условиям поддержки.",
    finalDownload: "Скачать КП",
    finalCall: "Позвонить",
    finalWhatsapp: "WhatsApp",
    featureCards: [
      {
        title: "Дополнительная гидролиния",
        description: "Быстрое подключение навесного оборудования без потери производительности.",
        icon: Wrench,
      },
      {
        title: "LED-оптика",
        description: "Ровный и яркий свет для точной и безопасной работы в темное время.",
        icon: Zap,
      },
      {
        title: "Камера заднего вида",
        description: "Уверенное маневрирование и контроль рабочих зон с ограниченным обзором.",
        icon: Camera,
      },
    ],
    techSections: [
      {
        id: "class",
        title: "Класс техники",
        lines: [
          "Колесный гидравлический экскаватор для городских и инфраструктурных задач.",
          "Сбалансированные габариты улучшают маневренность на ограниченных площадках.",
        ],
      },
      {
        id: "powertrain",
        title: "Силовая установка",
        lines: [
          "Двигатель 124 кВт с оптимизированной тягой.",
          "Быстрый отклик гидросистемы при рабочей нагрузке.",
        ],
      },
      {
        id: "efficiency",
        title: "Экономичность",
        lines: [
          "Снижение расхода топлива до 25%.",
          "Сокращение стоимости моточаса в интенсивных сменах.",
        ],
      },
      {
        id: "attachments",
        title: "Навесное оборудование",
        lines: [
          "Поддержка гидромолота, грейфера и быстросъема.",
          "Быстрая адаптация под разные строительные и коммунальные задачи.",
        ],
      },
      {
        id: "comfort",
        title: "Комфорт оператора",
        lines: [
          "Тихая кабина и улучшенная обзорность снижают утомляемость.",
          "Эргономичное управление стабилизирует качество работы в течение смены.",
        ],
      },
    ],
    warrantyCards: [
      {
        title: "Гарантия",
        description: "Покрытие ключевых силовых узлов на прозрачных условиях эксплуатации.",
        icon: ShieldCheck,
      },
      {
        title: "Сервис и поддержка",
        description: "Выездной сервис и поддержка запасных частей от Turkuaz Machinery CA.",
        icon: Wrench,
      },
    ],
  },
  kk: {
    back: "Артқа",
    heroLead: "Пайдалану үнемділігіне, аспалы жабдық икемділігіне және сервистік дайындыққа бағытталған ықшам премиум таныстырылым.",
    actionDownloadOffer: "Коммерциялық ұсынысты жүктеу",
    actionCallManager: "Менеджерге қоңырау шалу",
    actionWhatsapp: "WhatsApp",
    specsTitle: "Сипаттамалар",
    specsLead: "Таңдау кезінде ең алдымен бағаланатын екі негізгі көрсеткіш.",
    specPowerLabel: "Қозғалтқыш қуаты",
    specPowerValue: "124 кВт",
    specFuelLabel: "Жанармай шығыны",
    specFuelValue: "-25%-ға дейін",
    sectionAdvantagesTitle: "Негізгі артықшылықтар",
    sectionAdvantagesLead: "Жылдамдыққа, қауіпсіздікке және оператор сенімділігіне әсер ететін үш практикалық мүмкіндік.",
    sectionTechTitle: "Техникалық артықшылықтар",
    sectionTechLead: "Жылдам бағалауға арналған негізгі инженерлік блоктар.",
    sectionTechAria: "FW215F техникалық артықшылықтары",
    sectionMediaTitle: "Медиа",
    sectionMediaLead: "Фото және нақты видео шолуға арналған ықшам визуалды блок.",
    photoTitle: "Фото",
    photoLead: "Экстерьер мен жұмыс сценарийлері бойынша жоғары сапалы материалдар.",
    videoStartAria: "FW215F видео шолуын іске қосу",
    videoStartTitle: "Видео шолуды іске қосу",
    videoStartLead: "Бет тез ашылуы үшін видео тек басқаннан кейін жүктеледі.",
    videoHint: "FW215F видео шолуы",
    videoTitle: "FW215F видео шолуы",
    videoMissing: "Автоматты қосу үшін public қалтасына videos/FW215F-overview.mp4 файлын қосыңыз.",
    sectionWarrantyTitle: "Кепілдік",
    sectionWarrantyLead: "Кепілдік пен сервисті қамтитын ықшам сатудан кейінгі қолдау блогы.",
    finalTitle: "Жеке ұсыныс",
    finalLead: "Өтінім қалдырыңыз және баға, жеткізу мерзімі мен қолдау шарттары бойынша жеке ұсыныс алыңыз.",
    finalDownload: "Коммерциялық ұсыныс",
    finalCall: "Қоңырау шалу",
    finalWhatsapp: "WhatsApp",
    featureCards: [
      {
        title: "Қосымша гидролиния",
        description: "Өнімділікті жоғалтпай аспалы жабдықты жылдам қосуға мүмкіндік береді.",
        icon: Wrench,
      },
      {
        title: "LED-оптика",
        description: "Кешкі уақытта дәл әрі қауіпсіз жұмысқа арналған біркелкі жарық.",
        icon: Zap,
      },
      {
        title: "Артқы көрініс камерасы",
        description: "Шектеулі аймақта сенімді маневр және жұмыс аймағын жақсы бақылау.",
        icon: Camera,
      },
    ],
    techSections: [
      {
        id: "class",
        title: "Техника класы",
        lines: [
          "Қалалық және инфрақұрылымдық міндеттерге арналған дөңгелекті гидравликалық экскаватор.",
          "Теңгерімді габариттер тар алаңда маневрді жақсартады.",
        ],
      },
      {
        id: "powertrain",
        title: "Күштік қондырғы",
        lines: [
          "Оңтайланған тартуы бар 124 кВт қозғалтқыш.",
          "Жұмыс жүктемесінде гидрожүйенің жылдам жауабын қамтамасыз етеді.",
        ],
      },
      {
        id: "efficiency",
        title: "Үнемділік",
        lines: [
          "Жанармай шығынын 25%-ға дейін азайтады.",
          "Қарқынды ауысымда мотосағат құнын төмендетеді.",
        ],
      },
      {
        id: "attachments",
        title: "Аспалы жабдық",
        lines: [
          "Гидробалға, грейфер және жылдам жалғағышты қолдайды.",
          "Құрылыс және коммуналдық міндеттерге жедел бейімделеді.",
        ],
      },
      {
        id: "comfort",
        title: "Оператор жайлылығы",
        lines: [
          "Тыныш кабина мен жақсартылған шолу шаршауды азайтады.",
          "Эргономикалық басқару ауысым бойы тұрақты сапаны сақтайды.",
        ],
      },
    ],
    warrantyCards: [
      {
        title: "Кепілдік",
        description: "Негізгі күштік тораптарға пайдалану шарттары анық көрсетілген кепілдік.",
        icon: ShieldCheck,
      },
      {
        title: "Сервис және қолдау",
        description: "Turkuaz Machinery CA тарапынан көшпелі сервис пен қосалқы бөлшек қолдауы.",
        icon: Wrench,
      },
    ],
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

  const [activeTechId, setActiveTechId] = useState(copy.techSections[0].id);
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);
  const [isVideoActivated, setIsVideoActivated] = useState(false);

  const selectedTechId = copy.techSections.some((item) => item.id === activeTechId) ? activeTechId : copy.techSections[0].id;
  const activeTech = copy.techSections.find((item) => item.id === selectedTechId) ?? copy.techSections[0];
  const activeTabId = `fw215f-tech-${activeTech.id}`;

  return (
    <div className="fw215f-page">
      <button className="fw215f-back" type="button" onClick={onBack} aria-label={copy.back}>
        <ArrowLeft size={18} />
        <span>{copy.back}</span>
      </button>

      <main className="fw215f-layout">
        <motion.section className="fw215f-hero" variants={revealVariants} initial="hidden" animate="show">
          <span className="fw215f-brand">Turkuaz Machinery CA</span>
          <h1 className="fw215f-modelTitle">LOVOL FW215F</h1>
          <p className="fw215f-heroCopy">{copy.heroLead}</p>

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
              <span>{copy.actionWhatsapp}</span>
            </a>
          </div>
        </motion.section>

        <motion.section className="fw215f-section fw215f-section--specs" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fw215f-sectionHeader">
            <h2>{copy.specsTitle}</h2>
            <p>{copy.specsLead}</p>
          </header>
          <div className="fw215f-specsGrid">
            <motion.article className="fw215f-specCard" variants={cardVariants} whileHover={{ y: -4 }}>
              <span className="fw215f-specIcon" aria-hidden="true">
                <Gauge size={18} />
              </span>
              <small>{copy.specPowerLabel}</small>
              <strong>{copy.specPowerValue}</strong>
            </motion.article>
            <motion.article className="fw215f-specCard" variants={cardVariants} whileHover={{ y: -4 }}>
              <span className="fw215f-specIcon" aria-hidden="true">
                <Fuel size={18} />
              </span>
              <small>{copy.specFuelLabel}</small>
              <strong>{copy.specFuelValue}</strong>
            </motion.article>
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
            <h2>{copy.sectionTechTitle}</h2>
            <p>{copy.sectionTechLead}</p>
          </header>

          <div className="fw215f-techLayout">
            <div className="fw215f-techTabs" role="tablist" aria-label={copy.sectionTechAria}>
              {copy.techSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  id={`fw215f-tech-${item.id}`}
                  role="tab"
                  aria-selected={item.id === selectedTechId}
                  aria-controls="fw215f-tech-panel"
                  className={`fw215f-techTab ${item.id === selectedTechId ? "is-active" : ""}`}
                  onClick={() => setActiveTechId(item.id)}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <article className="fw215f-techDetail" id="fw215f-tech-panel" role="tabpanel" aria-labelledby={activeTabId}>
              <h3>{activeTech.title}</h3>
              {activeTech.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </article>
          </div>
        </motion.section>

        <motion.section className="fw215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fw215f-sectionHeader">
            <h2>{copy.sectionMediaTitle}</h2>
            <p>{copy.sectionMediaLead}</p>
          </header>

          <div className="fw215f-mediaGrid">
            <article className="fw215f-mediaCard">
              <Image size={22} />
              <h3>{copy.photoTitle}</h3>
              <p>{copy.photoLead}</p>
            </article>

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
                      <PlayCircle size={40} />
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
          </div>
        </motion.section>

        <motion.section className="fw215f-section fw215f-section--warranty" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fw215f-sectionHeader">
            <h2>{copy.sectionWarrantyTitle}</h2>
            <p>{copy.sectionWarrantyLead}</p>
          </header>

          <div className="fw215f-warrantyGrid">
            {copy.warrantyCards.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="fw215f-warrantyCard">
                  <span className="fw215f-warrantyIcon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
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
              <span>{copy.finalWhatsapp}</span>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
