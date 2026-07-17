import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowLeft, Download, MessageCircle, Phone } from "lucide-react";
import { useAppLanguage, type AppLanguage } from "../../i18n";
import "./FR315F.css";

import cameraImage from "../../assets/images/FR315F/camera.png";
import ledImage from "../../assets/images/FR315F/led.png";
import cabinImage from "../../assets/images/FR315F/cabin.png";
import roofImage from "../../assets/images/FR315F/roof.png";

type Props = { onBack: () => void };

type SpecCard = { label: string; value: string };
type FeatureItem = { id: string; title: string; description: string; image: string };
type ActionItem = { label: string; href: string; external?: boolean; primary?: boolean; icon: ComponentType<{ size?: number }> };

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.18 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const FR315F_COPY: Record<AppLanguage, {
  back: string;
  brand: string;
  subtitle: string;
  lead: string;
  actionOffer: string;
  actionChat: string;
  actionCall: string;
  specCards: SpecCard[];
  features: FeatureItem[];
}> = {
  en: {
    back: "Back",
    brand: "Turkuaz Machinery CA",
    subtitle: "Premium hydraulic excavator",
    lead: "Emphasized power, engineering precision and premium ergonomics for operators who work at the next level.",
    actionOffer: "Commercial offer",
    actionChat: "Message",
    actionCall: "Call",
    specCards: [
      { label: "Operating weight", value: "31,300 kg" },
      { label: "Engine", value: "WEICHAI 8.2L" },
      { label: "Power", value: "228 kW / 310 HP" },
      { label: "Bucket capacity", value: "1.7 m3" },
      { label: "Max digging depth", value: "6806 mm" },
    ],
    features: [
      {
        id: "camera",
        title: "Rear-view camera",
        description: "Panoramic visibility with a clear image for precise maneuvering.",
        image: cameraImage,
      },
      {
        id: "led",
        title: "LED optics",
        description: "High-output lighting for confident work in dawn and night shifts.",
        image: ledImage,
      },
      {
        id: "roof",
        title: "Roof protection",
        description: "Reinforced roof frame that improves operator safety in harsh conditions.",
        image: roofImage,
      },
      {
        id: "cabin",
        title: "Cabin protection",
        description: "Compact and transparent guard design that keeps visibility and safety balanced.",
        image: cabinImage,
      },
    ],
  },
  ru: {
    back: "Назад",
    brand: "Turkuaz Machinery CA",
    subtitle: "Премиальный гидравлический экскаватор",
    lead: "Подчеркнутая мощь, инженерная точность и премиальная эргономика для людей, которые работают с техникой на новом уровне.",
    actionOffer: "Коммерческое предложение",
    actionChat: "Написать в мессенджер",
    actionCall: "Позвонить",
    specCards: [
      { label: "Эксплуатационная масса", value: "31 300 кг" },
      { label: "Двигатель", value: "WEICHAI 8.2L" },
      { label: "Мощность", value: "228 кВт / 310 HP" },
      { label: "Объем ковша", value: "1.7 м3" },
      { label: "Макс. глубина копания", value: "6806 мм" },
    ],
    features: [
      {
        id: "camera",
        title: "Камера заднего вида",
        description: "Панорамный обзор с четким изображением для точного маневрирования.",
        image: cameraImage,
      },
      {
        id: "led",
        title: "LED-оптика",
        description: "Яркое световое решение для работы в рассветные и ночные смены.",
        image: ledImage,
      },
      {
        id: "roof",
        title: "Защита крыши",
        description: "Усиленный каркас крыши для максимальной безопасности оператора.",
        image: roofImage,
      },
      {
        id: "cabin",
        title: "Защита кабины",
        description: "Компактная и прозрачная решетка сохраняет обзор и безопасность.",
        image: cabinImage,
      },
    ],
  },
  kk: {
    back: "Артқа",
    brand: "Turkuaz Machinery CA",
    subtitle: "Премиум гидравликалық экскаватор",
    lead: "Келесі деңгейде жұмыс істейтін мамандар үшін айқын қуат, инженерлік дәлдік және премиум эргономика.",
    actionOffer: "Коммерциялық ұсыныс",
    actionChat: "Мессенджерге жазу",
    actionCall: "Қоңырау шалу",
    specCards: [
      { label: "Пайдалану салмағы", value: "31 300 кг" },
      { label: "Қозғалтқыш", value: "WEICHAI 8.2L" },
      { label: "Қуат", value: "228 кВт / 310 HP" },
      { label: "Шөміш көлемі", value: "1.7 м3" },
      { label: "Қазу тереңдігі (макс.)", value: "6806 мм" },
    ],
    features: [
      {
        id: "camera",
        title: "Артқы көрініс камерасы",
        description: "Дәл маневр жасауға арналған анық кескіні бар панорамалық шолу.",
        image: cameraImage,
      },
      {
        id: "led",
        title: "LED-оптика",
        description: "Таңғы және түнгі ауысымда сенімді жұмыс істеуге арналған қуатты жарық.",
        image: ledImage,
      },
      {
        id: "roof",
        title: "Төбе қорғанысы",
        description: "Қатаң жағдайда оператор қауіпсіздігін арттыратын күшейтілген төбе қаңқасы.",
        image: roofImage,
      },
      {
        id: "cabin",
        title: "Кабина қорғанысы",
        description: "Шолу мен қауіпсіздікті тең ұстайтын ықшам әрі ашық торлы қорғаныс.",
        image: cabinImage,
      },
    ],
  },
};

export default function FR315F({ onBack }: Props) {
  const [showUI] = useState(true);
  const language = useAppLanguage();
  const copy = FR315F_COPY[language] ?? FR315F_COPY.ru;
  const [activeFeatureId, setActiveFeatureId] = useState(copy.features[0].id);
  const actions: ActionItem[] = [
    { label: copy.actionOffer, href: "#", primary: true, icon: Download },
    { label: copy.actionChat, href: "https://wa.me/77000000000", external: true, icon: MessageCircle },
    { label: copy.actionCall, href: "tel:+77000000000", icon: Phone },
  ];

  const selectedFeatureId = copy.features.some((feature) => feature.id === activeFeatureId) ? activeFeatureId : copy.features[0].id;
  const activeFeature = copy.features.find((feature) => feature.id === selectedFeatureId) ?? copy.features[0];

  return (
    <div className="fr315f-shell">
      <div className="fr315f-backdrop" />

      <button className="fr315f-back" onClick={onBack} aria-label={copy.back}>
        <ArrowLeft size={16} />
        <span>{copy.back}</span>
      </button>

      <AnimatePresence>
        {showUI && (
          <motion.div className="fr315f-ui" variants={overlayVariants} initial="hidden" animate="show" exit="hidden">
            <motion.header className="fr315f-header" variants={rowVariants}>
              <span className="fr315f-label">{copy.brand}</span>
              <h1 className="fr315f-title fr315f-title--logo" aria-label="LOVOL FR315F">
                <span className="fr315f-titleLovol">LOVOL</span>
                <span className="fr315f-titleModel">FR315F</span>
              </h1>
              <p className="fr315f-subtitle">{copy.subtitle}</p>
              <p className="fr315f-copy">{copy.lead}</p>
            </motion.header>

            <motion.section className="fr315f-specs" variants={rowVariants}>
              {copy.specCards.map((spec) => (
                <motion.article key={spec.label} className="fr315f-spec" whileHover={{ y: -3, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <span className="fr315f-specValue">{spec.value}</span>
                  <span className="fr315f-specLabel">{spec.label}</span>
                </motion.article>
              ))}
            </motion.section>

            {/* Inline detail: shown immediately above the 4 feature buttons */}
            {activeFeature && (
              <motion.section className="fr315f-detail" variants={rowVariants} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
                <div className="fr315f-detailImage">
                  <img src={activeFeature.image} alt={activeFeature.title} />
                </div>
                <div className="fr315f-detailCopy">
                  <h2>{activeFeature.title}</h2>
                  <p>{activeFeature.description}</p>
                </div>
              </motion.section>
            )}

            <motion.section className="fr315f-features" variants={rowVariants}>
              <div className="fr315f-featuresGrid">
                {copy.features.map((feature) => {
                  const active = feature.id === selectedFeatureId;
                  return (
                    <motion.button
                      key={feature.id}
                      type="button"
                      className={`fr315f-featureCard ${active ? "active" : ""}`}
                      onClick={() => setActiveFeatureId(feature.id)}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      aria-pressed={active}
                    >
                      <img className="fr315f-featureImage" src={feature.image} alt={feature.title} />
                      <div className="fr315f-featureOverlay">
                        <span>{feature.title}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>

            <motion.section className="fr315f-actions" variants={buttonVariants}>
              {actions.map((action) => (
                <motion.a
                  key={action.label}
                  className={`fr315f-action ${action.primary ? "primary" : "secondary"}`}
                  data-feedback={action.primary ? "primary" : undefined}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noreferrer" : undefined}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="fr315f-actionIcon" aria-hidden="true">
                    <action.icon size={18} />
                  </span>
                  <span className="fr315f-actionLabel">{action.label}</span>
                </motion.a>
              ))}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
}
