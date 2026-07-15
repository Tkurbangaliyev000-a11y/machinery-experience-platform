import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import "./FR315F.css";

import introVideo from "../../assets/videos/FR315F.mp4";
import cameraImage from "../../assets/images/FR315F/camera.png";
import ledImage from "../../assets/images/FR315F/led.png";
import cabinImage from "../../assets/images/FR315F/cabin.png";
import roofImage from "../../assets/images/FR315F/roof.png";

type Props = { onBack: () => void };

type SpecCard = { label: string; value: string };
type FeatureItem = { id: string; title: string; description: string; image: string };
type ActionItem = { label: string; href: string; external?: boolean; primary?: boolean; icon?: string };

const SPEC_CARDS: SpecCard[] = [
  { label: "Эксплуатационная масса", value: "31 300 кг" },
  { label: "Двигатель", value: "WEICHAI 8.2L" },
  { label: "Мощность", value: "228 кВт / 310 HP" },
  { label: "Объём ковша", value: "1.7 м³" },
  { label: "Макс. глубина копания", value: "6806 мм" },
];

const FEATURE_CARDS: FeatureItem[] = [
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
];

const ACTIONS: ActionItem[] = [
  { label: "Коммерческое предложение", href: "#", primary: true, icon: "💼" },
  { label: "WhatsApp", href: "https://wa.me/77000000000", external: true, icon: "💬" },
  { label: "Позвонить", href: "tel:+77000000000", icon: "📞" },
];

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

export default function FR315F({ onBack }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
    const [showUI, setShowUI] = useState(false);
    const [activeFeatureId, setActiveFeatureId] = useState(FEATURE_CARDS[0].id);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      try {
        video.pause();
        video.currentTime = Math.max(0, (video.duration || 0) - 0.04);
      } catch {
        // ignore
      }
      setTimeout(() => setShowUI(true), 240);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  const activeFeature = FEATURE_CARDS.find((feature) => feature.id === activeFeatureId) ?? FEATURE_CARDS[0];

  return (
    <div className="fr315f-shell">
      <video
        ref={videoRef}
        className="fr315f-video"
        src={introVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <div className="fr315f-backdrop" />

      <button className="fr315f-back" onClick={onBack} aria-label="Назад">
        ← Назад
      </button>

      <AnimatePresence>
        {showUI && (
          <motion.div className="fr315f-ui" variants={overlayVariants} initial="hidden" animate="show" exit="hidden">
            <motion.header className="fr315f-header" variants={rowVariants}>
              <span className="fr315f-label">Turkuaz Machinery CA</span>
              <span className="fr315f-series">Premium Excavator Series</span>
              <h1 className="fr315f-title">
                LOVOL <span>FR315F</span>
              </h1>
              <p className="fr315f-subtitle">Премиальный гидравлический экскаватор</p>
              <p className="fr315f-copy">
                Подчеркнутая мощь, инженерная точность и премиальная эргономика для людей, которые работают с техникой на новом уровне.
              </p>
            </motion.header>

            <motion.section className="fr315f-specs" variants={rowVariants}>
              {SPEC_CARDS.map((spec) => (
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
                {FEATURE_CARDS.map((feature) => {
                  const active = feature.id === activeFeatureId;
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
              {ACTIONS.map((action) => (
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
                  <span className="fr315f-actionIcon">{action.icon}</span>
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
