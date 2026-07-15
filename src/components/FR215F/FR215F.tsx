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
  { value: "High", label: "Высокая производительность", icon: Sparkles },
];

const SPEC_ROWS = [
  { label: "Класс техники", value: "Гидравлический экскаватор 21-22 т" },
  { label: "Силовая установка", value: "Двигатель 129 kW с оптимизированной тягой" },
  { label: "Экономичность", value: "Снижение расхода топлива до 25%" },
  { label: "Рабочий режим", value: "Стабильная производительность в цикле 24/7" },
  { label: "Навесное оборудование", value: "Поддержка гидромолота, грейфера, быстросъема" },
  { label: "Комфорт оператора", value: "Тихая кабина, улучшенная обзорность, эргономичное управление" },
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

const SERVICE_POINTS = ["г. Караганда", "г. Алматы", "г. Атырау", "г. Шымкент"];

export default function FR215F({ onBack }: Props) {
  const [activeUseCaseId, setActiveUseCaseId] = useState(USE_CASES[0].id);
  const activeUseCase = USE_CASES.find((item) => item.id === activeUseCaseId) ?? USE_CASES[0];

  return (
    <div className="fr215f-page">
      <div className="fr215f-noise" aria-hidden="true" />

      <button className="fr215f-back" type="button" onClick={onBack} aria-label="Назад к каталогу">
        <ArrowLeft size={18} />
        <span>Назад</span>
      </button>

      <main className="fr215f-layout">
        <motion.section className="fr215f-hero" variants={revealVariants} initial="hidden" animate="show">
          <span className="fr215f-kicker">Turkuaz Machinery CA | Premium Excavator Series</span>
          <h1>
            LOVOL <span>FR215F</span>
          </h1>
          <p className="fr215f-heroCopy">
            Интерактивная презентация экскаватора нового поколения: мощность, экономичность и сервисная инфраструктура,
            которая снижает риски простоя и ускоряет окупаемость проекта.
          </p>

          <div className="fr215f-heroStats">
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
          </div>

          <div className="fr215f-heroActions">
            <a className="fr215f-action fr215f-action--primary" href="#" data-feedback="primary">
              <Download size={18} />
              <span>Скачать коммерческое предложение</span>
            </a>
            <a className="fr215f-action" href="tel:+77000000000" data-feedback="primary">
              <Phone size={18} />
              <span>Позвонить менеджеру</span>
            </a>
            <a className="fr215f-action" href="https://wa.me/77000000000" target="_blank" rel="noreferrer" data-feedback="primary">
              <MessageCircle size={18} />
              <span>Написать в WhatsApp</span>
            </a>
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <h2>Ключевые преимущества</h2>
            <p>Практичные технологии, которые напрямую влияют на безопасность, производительность и гибкость эксплуатации.</p>
          </header>

          <div className="fr215f-featureGrid">
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
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <h2>Технические характеристики</h2>
            <p>Современная инфографика для быстрого понимания сильных сторон модели FR215F.</p>
          </header>

          <div className="fr215f-specPanel">
            <div className="fr215f-specTable" role="list">
              {SPEC_ROWS.map((row) => (
                <div key={row.label} className="fr215f-specRow" role="listitem">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              ))}
            </div>
            <div className="fr215f-performanceCard">
              <h3>Профиль эффективности</h3>
              <div className="fr215f-performanceBars">
                <div>
                  <span>Мощность</span>
                  <em style={{ width: "92%" }} />
                </div>
                <div>
                  <span>Топливная экономичность</span>
                  <em style={{ width: "88%" }} />
                </div>
                <div>
                  <span>Производительность цикла</span>
                  <em style={{ width: "95%" }} />
                </div>
              </div>
              <p>
                Конфигурация FR215F ориентирована на минимизацию стоимости моточаса при сохранении высокой скорости выполнения задач.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="fr215f-section" variants={revealVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <header className="fr215f-sectionHeader">
            <h2>Фото и видео презентация</h2>
            <p>Резервные зоны для медиа высокого качества. Контент можно быстро заменить на реальные материалы.</p>
          </header>

          <div className="fr215f-mediaGrid">
            <article className="fr215f-mediaCard fr215f-mediaCard--video">
              <PlayCircle size={28} />
              <h3>Видеообзор FR215F</h3>
              <p>Здесь будет размещен промо-ролик с демонстрацией рабочих сценариев.</p>
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
            <h2>Сценарии применения</h2>
            <p>Выберите отрасль и оцените, как FR215F закрывает реальные задачи бизнеса.</p>
          </header>

          <div className="fr215f-useCases">
            <div className="fr215f-useCaseTabs" role="tablist" aria-label="Сценарии применения FR215F">
              {USE_CASES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={item.id === activeUseCaseId}
                  className={`fr215f-useCaseTab ${item.id === activeUseCaseId ? "is-active" : ""}`}
                  onClick={() => setActiveUseCaseId(item.id)}
                >
                  <span>{item.title}</span>
                  <small>{item.short}</small>
                </button>
              ))}
            </div>

            <article className="fr215f-useCaseDetail" role="tabpanel">
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
            <h2>Гарантия, сервис и поддержка</h2>
            <p>Надежная послепродажная экосистема Turkuaz Machinery CA для снижения операционных рисков.</p>
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
              <p>Оперативные сервисные выезды в ключевые регионы Казахстана.</p>
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
            <a href="tel:+77000000000" className="fr215f-inlineContact" data-feedback="primary">
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
            <a href="#" className="fr215f-action fr215f-action--primary" data-feedback="primary">
              <Download size={18} />
              <span>Скачать КП</span>
            </a>
            <a href="tel:+77000000000" className="fr215f-action" data-feedback="primary">
              <Phone size={18} />
              <span>Позвонить</span>
            </a>
            <a href="https://wa.me/77000000000" target="_blank" rel="noreferrer" className="fr215f-action" data-feedback="primary">
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}