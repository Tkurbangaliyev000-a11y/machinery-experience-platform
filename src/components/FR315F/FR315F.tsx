import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, HandCoins, MessageCircle, Phone, PlayCircle } from "lucide-react";
import { useAppLanguage, type AppLanguage } from "../../i18n";
import LeasingApplicationModal from "../LeasingApplicationModal/LeasingApplicationModal";
import "./FR315F.css";

import cameraImage from "../../assets/images/FR315F/camera.png";
import ledImage from "../../assets/images/FR315F/led.png";
import cabinImage from "../../assets/images/FR315F/cabin.png";
import roofImage from "../../assets/images/FR315F/roof.png";

import galleryImage1 from "../../assets/images/FR315F/gallery/1.jpg";
import galleryImage2 from "../../assets/images/FR315F/gallery/2.jpg";
import galleryImage3 from "../../assets/images/FR315F/gallery/3.jpg";
import galleryImage4 from "../../assets/images/FR315F/gallery/4.jpg";
import galleryImage5 from "../../assets/images/FR315F/gallery/5.jpg";
import galleryImage6 from "../../assets/images/FR315F/gallery/6.jpg";
import galleryImage7 from "../../assets/images/FR315F/gallery/7.jpg";

type Props = { onBack: () => void };

type SpecCard = { label: string; value: string };
type FeatureItem = { id: string; title: string; description: string; image: string };
type GalleryItem = { id: string; src: string; alt: string };
type ActionItem = {
  label: string;
  href?: string;
  external?: boolean;
  primary?: boolean;
  stacked?: boolean;
  icon: ComponentType<{ size?: number }>;
  onClick?: () => void;
};

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

const LOVOL_LOGO_SRC = `${import.meta.env.BASE_URL}LOVOL-original.png`;
const FR315F_VIDEO_SRC = `${import.meta.env.BASE_URL}videos/FR315F-mobile.mp4`;
const FR315F_VIDEO_FALLBACK_SRC = `${import.meta.env.BASE_URL}videos/FR315F.MP4`;
const FR315F_VIDEO_POSTER = `${import.meta.env.BASE_URL}videos/FR315F-poster.jpg`;

const FR315F_COPY: Record<AppLanguage, {
  back: string;
  brand: string;
  subtitle: string;
  lead: string;
  actionOffer: string;
  actionChat: string;
  actionCall: string;
  actionLeasing: string;
  specCards: SpecCard[];
  features: FeatureItem[];
  sectionGalleryTitle: string;
  sectionGalleryLead: string;
  galleryItems: GalleryItem[];
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
}> = {
  en: {
    back: "Back",
    brand: "Turkuaz Machinery CA",
    subtitle: "Premium hydraulic excavator",
    lead: "Emphasized power, engineering precision and premium ergonomics for operators who work at the next level.",
    actionOffer: "Commercial offer",
    actionChat: "WhatsApp",
    actionCall: "Call",
    actionLeasing: "Leasing",
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
    sectionGalleryTitle: "Photo Gallery",
    sectionGalleryLead: "Real-world operation and design details of the FR315F.",
    galleryItems: [
      { id: "1", src: galleryImage1, alt: "FR315F operation view 1" },
      { id: "2", src: galleryImage2, alt: "FR315F operation view 2" },
      { id: "3", src: galleryImage3, alt: "FR315F operation view 3" },
      { id: "4", src: galleryImage4, alt: "FR315F operation view 4" },
      { id: "5", src: galleryImage5, alt: "FR315F operation view 5" },
      { id: "6", src: galleryImage6, alt: "FR315F operation view 6" },
      { id: "7", src: galleryImage7, alt: "FR315F operation view 7" },
    ],
    sectionMediaTitle: "Media",
    sectionMediaLead: "Photo and video overview of the FR315F in action.",
    photoTitle: "Photo",
    photoLead: "High-quality exterior and working-zone images.",
    videoStartAria: "Start FR315F video overview",
    videoStartTitle: "Start video overview",
    videoStartLead: "The video loads only after click for faster page opening.",
    videoHint: "FR315F video overview",
    videoTitle: "FR315F video overview",
    videoMissing: "Add videos/FR315F-overview.mp4 in public to connect the preview automatically.",
  },
  ru: {
    back: "Назад",
    brand: "Turkuaz Machinery CA",
    subtitle: "Премиальный гидравлический экскаватор",
    lead: "Подчеркнутая мощь, инженерная точность и премиальная эргономика для людей, которые работают с техникой на новом уровне.",
    actionOffer: "Коммерческое предложение",
    actionChat: "WhatsApp",
    actionCall: "Позвонить",
    actionLeasing: "Лизинг",
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
    sectionGalleryTitle: "Фотогалерея",
    sectionGalleryLead: "Реальная работа и детали конструкции FR315F.",
    galleryItems: [
      { id: "1", src: galleryImage1, alt: "FR315F вид эксплуатации 1" },
      { id: "2", src: galleryImage2, alt: "FR315F вид эксплуатации 2" },
      { id: "3", src: galleryImage3, alt: "FR315F вид эксплуатации 3" },
      { id: "4", src: galleryImage4, alt: "FR315F вид эксплуатации 4" },
      { id: "5", src: galleryImage5, alt: "FR315F вид эксплуатации 5" },
      { id: "6", src: galleryImage6, alt: "FR315F вид эксплуатации 6" },
      { id: "7", src: galleryImage7, alt: "FR315F вид эксплуатации 7" },
    ],
    sectionMediaTitle: "Медиа",
    sectionMediaLead: "Фото и видеообзор FR315F в работе.",
    photoTitle: "Фото",
    photoLead: "Материалы по экстерьеру и рабочим сценариям в высоком качестве.",
    videoStartAria: "Запустить видеообзор FR315F",
    videoStartTitle: "Запустить видеообзор",
    videoStartLead: "Видео загружается только после нажатия для более быстрого открытия страницы.",
    videoHint: "Видеообзор FR315F",
    videoTitle: "Видеообзор FR315F",
    videoMissing: "Добавьте файл videos/FR315F-overview.mp4 в папку public для автоматического подключения.",
  },
  kk: {
    back: "Артқа",
    brand: "Turkuaz Machinery CA",
    subtitle: "Премиум гидравликалық экскаватор",
    lead: "Келесі деңгейде жұмыс істейтін мамандар үшін айқын қуат, инженерлік дәлдік және премиум эргономика.",
    actionOffer: "Коммерциялық ұсыныс",
    actionChat: "WhatsApp",
    actionCall: "Қоңырау шалу",
    actionLeasing: "Лизинг",
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
    sectionGalleryTitle: "Фото галереясы",
    sectionGalleryLead: "FR315F-ның нақты жұмысы және конструкция ерекшеліктері.",
    galleryItems: [
      { id: "1", src: galleryImage1, alt: "FR315F пайдалану көрінісі 1" },
      { id: "2", src: galleryImage2, alt: "FR315F пайдалану көрінісі 2" },
      { id: "3", src: galleryImage3, alt: "FR315F пайдалану көрінісі 3" },
      { id: "4", src: galleryImage4, alt: "FR315F пайдалану көрінісі 4" },
      { id: "5", src: galleryImage5, alt: "FR315F пайдалану көрінісі 5" },
      { id: "6", src: galleryImage6, alt: "FR315F пайдалану көрінісі 6" },
      { id: "7", src: galleryImage7, alt: "FR315F пайдалану көрінісі 7" },
    ],
    sectionMediaTitle: "Медиа",
    sectionMediaLead: "FR315F жұмыста фото және видеошолуы.",
    photoTitle: "Фото",
    photoLead: "Жоғары сапалы экстерьер және жұмыс сценарийлері.",
    videoStartAria: "FR315F видео шолуын іске қосу",
    videoStartTitle: "Видео шолуды іске қосу",
    videoStartLead: "Бет тез ашылуы үшін видео тек басқаннан кейін жүктеледі.",
    videoHint: "FR315F видео шолуы",
    videoTitle: "FR315F видео шолуы",
    videoMissing: "Автоматты қосу үшін public қалтасына videos/FR315F-overview.mp4 файлын қосыңыз.",
  },
};

export default function FR315F({ onBack }: Props) {
  const [showUI] = useState(true);
  const [isLeasingModalOpen, setIsLeasingModalOpen] = useState(false);
  const [leasingModalKey, setLeasingModalKey] = useState(0);
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);
  const [isVideoActivated, setIsVideoActivated] = useState(false);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const [galleryTouchStart, setGalleryTouchStart] = useState(0);
  const language = useAppLanguage();
  const copy = FR315F_COPY[language] ?? FR315F_COPY.ru;
  const [activeFeatureId, setActiveFeatureId] = useState(copy.features[0].id);
  const openLeasingModal = () => {
    setLeasingModalKey((prev) => prev + 1);
    setIsLeasingModalOpen(true);
  };

  const goToGalleryNext = () => {
    setGalleryCurrentIndex((prev) => (prev + 1) % copy.galleryItems.length);
  };

  const goToGalleryPrev = () => {
    setGalleryCurrentIndex((prev) => (prev - 1 + copy.galleryItems.length) % copy.galleryItems.length);
  };

  const handleGalleryTouchStart = (e: React.TouchEvent) => {
    setGalleryTouchStart(e.touches[0].clientX);
  };

  const handleGalleryTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (galleryTouchStart - touchEnd > 50) goToGalleryNext();
    if (touchEnd - galleryTouchStart > 50) goToGalleryPrev();
  };

  const actions: ActionItem[] = [
    { label: copy.actionOffer, href: "#", primary: true, icon: Download },
    { label: copy.actionChat, href: "https://wa.me/77000000000", external: true, icon: MessageCircle },
    { label: copy.actionCall, href: "tel:+77000000000", icon: Phone },
    { label: copy.actionLeasing, stacked: true, icon: HandCoins, onClick: openLeasingModal },
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
                <span className="fr315f-titleLovol">
                  <img className="fr315f-titleLovolImage" src={LOVOL_LOGO_SRC} alt="LOVOL" loading="eager" decoding="async" />
                </span>
                <span className="fr315f-titleBadge" aria-hidden="true">
                  <span className="fr315f-titleBadgeMain">FR315F</span>
                  <span className="fr315f-titleBadgeSub">
                    <span className="fr315f-titleBadgeSubAccent">W</span>
                    <span className="fr315f-titleBadgeSubText">Phi</span>
                  </span>
                </span>
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

            <motion.section className="fr315f-media" variants={rowVariants}>
              <header className="fr315f-mediaHeader">
                <h2>{copy.sectionMediaTitle}</h2>
                <p>{copy.sectionMediaLead}</p>
              </header>

              <div className="fr315f-mediaGrid">
                <article className="fr315f-mediaCard fr315f-mediaCard--gallery">
                  <div className="fr315f-galleryCarousel">
                    <div
                      className="fr315f-galleryCarouselTrack"
                      onTouchStart={handleGalleryTouchStart}
                      onTouchEnd={handleGalleryTouchEnd}
                    >
                      <motion.img
                        key={galleryCurrentIndex}
                        src={copy.galleryItems[galleryCurrentIndex].src}
                        alt={copy.galleryItems[galleryCurrentIndex].alt}
                        className="fr315f-galleryCarouselImage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>

                    <button
                      className="fr315f-galleryCarouselNav fr315f-galleryCarouselNav--prev"
                      onClick={goToGalleryPrev}
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      className="fr315f-galleryCarouselNav fr315f-galleryCarouselNav--next"
                      onClick={goToGalleryNext}
                      aria-label="Next photo"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="fr315f-galleryCarouselCounter">
                      {galleryCurrentIndex + 1}/{copy.galleryItems.length}
                    </div>
                  </div>
                </article>

                <article className="fr315f-mediaCard fr315f-mediaCard--video">
                  {isVideoAvailable ? (
                    <div className="fr315f-videoWrap">
                      {isVideoActivated ? (
                        <video
                          className="fr315f-videoPlayer"
                          controls
                          preload="none"
                          poster={FR315F_VIDEO_POSTER}
                          playsInline
                          muted={false}
                          onError={() => setIsVideoAvailable(false)}
                        >
                          <source src={FR315F_VIDEO_SRC} type="video/mp4" />
                          <source src={FR315F_VIDEO_FALLBACK_SRC} type="video/mp4" />
                        </video>
                      ) : (
                        <button type="button" className="fr315f-videoActivator" onClick={() => setIsVideoActivated(true)} aria-label={copy.videoStartAria}>
                          <PlayCircle size={40} />
                          <span>{copy.videoStartTitle}</span>
                          <small>{copy.videoStartLead}</small>
                        </button>
                      )}
                      <span className="fr315f-videoHint">{copy.videoHint}</span>
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

            <motion.section className="fr315f-actions" variants={buttonVariants}>
              {actions.map((action) => (
                action.href ? (
                  <motion.a
                    key={action.label}
                    className={`fr315f-action ${action.primary ? "primary" : "secondary"}${action.stacked ? " fr315f-action--stacked" : ""}`}
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
                ) : (
                  <motion.button
                    key={action.label}
                    type="button"
                    className={`fr315f-action ${action.primary ? "primary" : "secondary"}${action.stacked ? " fr315f-action--stacked" : ""}`}
                    data-feedback={action.primary ? "primary" : undefined}
                    onClick={action.onClick}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="fr315f-actionIcon" aria-hidden="true">
                      <action.icon size={18} />
                    </span>
                    <span className="fr315f-actionLabel">{action.label}</span>
                  </motion.button>
                )
              ))}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <LeasingApplicationModal key={leasingModalKey} isOpen={isLeasingModalOpen} model="LOVOL FR315F" onClose={() => setIsLeasingModalOpen(false)} />

      
    </div>
  );
}
