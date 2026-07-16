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

const FEATURE_CARDS: FeatureCard[] = [
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
];

const STAT_CARDS: StatCard[] = [
  { value: "129 kW", label: "Мощность двигателя", icon: Gauge },
  { value: "-25%", label: "Расход топлива ниже конкурентов", icon: Fuel },
  { value: "Высокая", label: "Производительность", icon: Sparkles },
];

const SPEC_ROWS: SpecCard[] = [
  {
    label: "Класс техники",
    value: "Гидравлический экскаватор 21-22 т",
    details: "Оптимальный баланс массы и тяги для городского и промышленного применения.",
    metrics: { power: 86, efficiency: 84, cycle: 90 },
  },
  {
    label: "Силовая установка",
    value: "Двигатель 129 kW с оптимизированной тягой",
    details: "Высокий крутящий момент обеспечивает быстрый отклик гидросистемы даже под нагрузкой.",
    metrics: { power: 94, efficiency: 85, cycle: 91 },
  },
  {
    label: "Экономичность",
    value: "Снижение расхода топлива до 25%",
    details: "Интеллектуальное управление рабочими режимами уменьшает стоимость моточаса.",
    metrics: { power: 84, efficiency: 96, cycle: 89 },
  },
  {
    label: "Рабочий режим",
    value: "Стабильная производительность в цикле 24/7",
    details: "Компоненты рассчитаны на длительную эксплуатацию в интенсивных сменах.",
    metrics: { power: 90, efficiency: 87, cycle: 95 },
  },
  {
    label: "Навесное оборудование",
    value: "Поддержка гидромолота, грейфера, быстросъема",
    details: "Расширенная гидролиния ускоряет адаптацию FR215F под разные виды задач.",
    metrics: { power: 91, efficiency: 83, cycle: 93 },
  },
  {
    label: "Комфорт оператора",
    value: "Тихая кабина, улучшенная обзорность, эргономичное управление",
    details: "Комфортная среда снижает утомляемость и повышает стабильность качества работ.",
    metrics: { power: 82, efficiency: 88, cycle: 92 },
  },
];

const USE_CASES: UseCase[] = [
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
];

const SERVICE_POINTS = ["г. Алматы", "г. Астана", "г. Актобе"];
const CONTACT_PHONE = "+77000000000";
const CONTACT_PHONE_LINK = `tel:${CONTACT_PHONE}`;
const CONTACT_WHATSAPP_LINK = "https://wa.me/77000000000";
const FR215F_VIDEO_SRC = `${import.meta.env.BASE_URL}videos/FR215F-overview.mp4`;
const FR215F_VIDEO_POSTER = `${import.meta.env.BASE_URL}videos/FR215F-poster.jpg`;
const FR215F_CP_URL = `${import.meta.env.BASE_URL}docs/FR215F-commercial-offer.pdf`;
const FR215F_HERO_IMAGE = `${import.meta.env.BASE_URL}FR215F.png`;

export default function FR215F({ onBack }: Props) {
  const [activeUseCaseId, setActiveUseCaseId] = useState(USE_CASES[0].id);
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);
  const [activeSpecLabel, setActiveSpecLabel] = useState(SPEC_ROWS[1].label);
  const [isPageReady, setIsPageReady] = useState(false);
  const activeUseCase = USE_CASES.find((item) => item.id === activeUseCaseId) ?? USE_CASES[0];
  const activeSpec = SPEC_ROWS.find((item) => item.label === activeSpecLabel) ?? SPEC_ROWS[1];
  const activeTabId = `fr215f-tab-${activeUseCase.id}`;
  const metricRows = useMemo(
    () => [
      { label: "Мощность", value: activeSpec.metrics.power },
      { label: "Топливная экономичность", value: activeSpec.metrics.efficiency },
      { label: "Производительность цикла", value: activeSpec.metrics.cycle },
    ],
    [activeSpec.metrics.cycle, activeSpec.metrics.efficiency, activeSpec.metrics.power]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPageReady(true);
    }, 520);

    return () => window.clearTimeout(timer);
  }, []);

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
          <span>Туркуаз Машинери Казахстан</span>
          <strong>Подготовка презентации FR215F</strong>
          <motion.em
            className="fr215f-loaderBar"
            initial={{ scaleX: 0.2 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </motion.div>

      <button className="fr215f-back" type="button" onClick={onBack} aria-label="Назад к каталогу">
        <ArrowLeft size={18} />
        <span>Назад</span>
      </button>

      <main className="fr215f-layout">
        <motion.section className="fr215f-hero" variants={revealVariants} initial="hidden" animate="show">
          <div className="fr215f-heroGrid">
            <div className="fr215f-heroPrimary">
              <span className="fr215f-kicker">
                <span className="fr215f-brandLine">Туркуаз Машинери Казахстан</span>
                <span className="fr215f-brandLine">Премиальная серия экскаваторов</span>
              </span>
              <h1 className="fr215f-modelTitle">
                LOVOL <span>FR215F</span>
              </h1>
              <p className="fr215f-heroCopy">
                Интерактивная презентация экскаватора нового поколения: мощность, экономичность и сервисная инфраструктура,
                которая снижает риски простоя и ускоряет окупаемость проекта.
              </p>

              <motion.div className="fr215f-heroStats" variants={sectionStaggerVariants} initial="hidden" animate="show">
                {STAT_CARDS.map((item) => {
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
                  <span>Скачать коммерческое предложение</span>
                </a>
                <a className="fr215f-action" href={CONTACT_PHONE_LINK} data-feedback="primary">
                  <Phone size={18} />
                  <span>Позвонить менеджеру</span>
                </a>
                <a className="fr215f-action" href={CONTACT_WHATSAPP_LINK} target="_blank" rel="noreferrer" data-feedback="primary">
                  <MessageCircle size={18} />
                  <span>Написать в мессенджер</span>
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
                <img src={FR215F_HERO_IMAGE} alt="Экскаватор LOVOL FR215F" loading="eager" decoding="async" />
              </div>
              <div className="fr215f-heroBadges" aria-hidden="true">
                <span>21-22 т класс</span>
                <span>129 kW</span>
                <span>Экономия топлива до 25%</span>
              </div>
            </motion.aside>
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">Преимущества</span>
            <h2>Ключевые преимущества</h2>
            <p>Практичные технологии, которые напрямую влияют на безопасность, производительность и гибкость эксплуатации.</p>
          </header>

          <motion.div className="fr215f-featureGrid" variants={sectionStaggerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {FEATURE_CARDS.map((feature) => {
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
            <span className="fr215f-sectionKicker">Характеристики</span>
            <h2>Технические характеристики</h2>
            <p>Современная инфографика для быстрого понимания сильных сторон модели FR215F.</p>
          </header>

          <div className="fr215f-specPanel">
            <div className="fr215f-specCardGrid" role="list" aria-label="Интерактивные технические характеристики FR215F">
              {SPEC_ROWS.map((row) => (
                <motion.button
                  key={row.label}
                  type="button"
                  role="listitem"
                  className={`fr215f-specCard ${row.label === activeSpec.label ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveSpecLabel(row.label)}
                  onFocus={() => setActiveSpecLabel(row.label)}
                  onClick={() => setActiveSpecLabel(row.label)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </motion.button>
              ))}
            </div>
            <div className="fr215f-performanceCard">
              <h3>Профиль эффективности</h3>
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
                        key={`${activeSpec.label}-${metric.label}`}
                        style={{ width: `${metric.value}%` }}
                        initial={{ scaleX: 0.2, opacity: 0.6 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                  </div>
                ))}
              </div>
              <p>Конфигурация FR215F ориентирована на минимизацию стоимости моточаса при сохранении высокой скорости выполнения задач.</p>
            </div>
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">Медиа</span>
            <h2>Фото и видео презентация</h2>
            <p>Резервные зоны для медиа высокого качества. Контент можно быстро заменить на реальные материалы.</p>
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
                  <span className="fr215f-videoHint">Видеообзор FR215F</span>
                </div>
              ) : (
                <>
                  <PlayCircle size={28} />
                  <h3>Видеообзор FR215F</h3>
                  <p>Добавьте файл videos/FR215F-overview.mp4 в папку public для автоматического подключения.</p>
                </>
              )}
            </article>
            <article className="fr215f-mediaCard">
              <Image size={26} />
              <h3>Галерея экстерьера</h3>
              <p>Плейсхолдер для фото в высоком разрешении.</p>
            </article>
            <article className="fr215f-mediaCard">
              <Image size={26} />
              <h3>Галерея кабины и узлов</h3>
              <p>Плейсхолдер для детальных снимков кабины и рабочей части.</p>
            </article>
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">Сценарии</span>
            <h2>Сценарии применения</h2>
            <p>Выберите отрасль и оцените, как FR215F закрывает реальные задачи бизнеса.</p>
          </header>

          <div className="fr215f-useCases">
            <div className="fr215f-useCaseTabs" role="tablist" aria-label="Сценарии применения FR215F">
              {USE_CASES.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  id={`fr215f-tab-${item.id}`}
                  role="tab"
                  aria-selected={item.id === activeUseCaseId}
                  aria-controls="fr215f-usecase-panel"
                  className={`fr215f-useCaseTab ${item.id === activeUseCaseId ? "is-active" : ""}`}
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
                  Быстрая адаптация под задачу
                </span>
                <span>
                  <CheckCircle2 size={16} />
                  Стабильная производительность смены
                </span>
                <span>
                  <CheckCircle2 size={16} />
                  Контроль затрат на топливо и сервис
                </span>
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section className="fr215f-section fr215f-section--service" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <span className="fr215f-sectionKicker">Сервис</span>
            <h2>Гарантия, сервис и поддержка</h2>
            <p>Надежная послепродажная экосистема Туркуаз Машинери Казахстан для снижения операционных рисков.</p>
          </header>

          <div className="fr215f-serviceGrid">
            <article>
              <ShieldCheck size={20} />
              <h3>Расширенная гарантия</h3>
              <p>На ДВС и основной насос: 10 000 моточасов или 3 года эксплуатации.</p>
            </article>

            <article>
              <Wrench size={20} />
              <h3>Выездной сервис</h3>
              <p>Оперативные сервисные выезды во все регионы Казахстана.</p>
            </article>

            <article>
              <Warehouse size={20} />
              <h3>Склад запчастей</h3>
              <p>Большой центральный склад в Алматы и дополнительные склады в регионах.</p>
            </article>
          </div>

          <div className="fr215f-serviceFooter">
            <span>
              <MapPin size={16} />
              {SERVICE_POINTS.join(" • ")}
            </span>
            <a href={CONTACT_PHONE_LINK} className="fr215f-inlineContact" data-feedback="primary">
              Связаться с сервисной службой
              <ChevronRight size={16} />
            </a>
          </div>
        </motion.section>

        <motion.section className="fr215f-finalCta" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
          <h2>Готовы получить персональное предложение по FR215F?</h2>
          <p>
            Оставьте заявку, и мы подготовим расчет под ваш проект: стоимость, сроки поставки, конфигурацию навесного оборудования
            и график сервисной поддержки.
          </p>
          <div className="fr215f-finalActions">
            <a href={FR215F_CP_URL} target="_blank" rel="noreferrer" className="fr215f-action fr215f-action--primary" data-feedback="primary">
              <Download size={18} />
              <span>Скачать КП</span>
            </a>
            <a href={CONTACT_PHONE_LINK} className="fr215f-action" data-feedback="primary">
              <Phone size={18} />
              <span>Позвонить</span>
            </a>
            <a href={CONTACT_WHATSAPP_LINK} target="_blank" rel="noreferrer" className="fr215f-action" data-feedback="primary">
              <MessageCircle size={18} />
              <span>Мессенджер</span>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}