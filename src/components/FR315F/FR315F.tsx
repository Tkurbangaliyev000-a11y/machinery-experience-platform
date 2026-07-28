import { useEffect, useRef, useState, type ComponentType } from "react";
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
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const [gallerySwipeDirection, setGallerySwipeDirection] = useState<1 | -1>(1);
  const [galleryTouchStartX, setGalleryTouchStartX] = useState(0);
  const [galleryTouchStartY, setGalleryTouchStartY] = useState(0);
  const [fullscreenDragY, setFullscreenDragY] = useState(0);
  const [isFullscreenVerticalDragging, setIsFullscreenVerticalDragging] = useState(false);
  const [isFullscreenGallery, setIsFullscreenGallery] = useState(false);
  const [isFullscreenVideo, setIsFullscreenVideo] = useState(false);
  const fullscreenDialogRef = useRef<HTMLDivElement | null>(null);
  const fullscreenVideoDialogRef = useRef<HTMLDivElement | null>(null);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoPlaybackSnapshot = useRef({
    currentTime: 0,
    shouldResume: false,
  });
  const suppressFullscreenOpenUntil = useRef(0);
  const fullscreenScrollY = useRef(0);
  const previousBodyStyles = useRef({
    overflow: "",
    position: "",
    top: "",
    left: "",
    right: "",
    width: "",
    touchAction: "",
  });
  const previousHtmlStyles = useRef({
    overflow: "",
    overscrollBehavior: "",
  });
  const fullscreenGesture = useRef({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    lastY: 0,
    lastTs: 0,
    velocityY: 0,
    axis: "none" as "none" | "horizontal" | "vertical",
  });
  const language = useAppLanguage();
  const copy = FR315F_COPY[language] ?? FR315F_COPY.ru;
  const [activeFeatureId, setActiveFeatureId] = useState(copy.features[0].id);
  
  const openLeasingModal = () => {
    setLeasingModalKey((prev) => prev + 1);
    setIsLeasingModalOpen(true);
  };

  const goToGalleryNext = () => {
    setGallerySwipeDirection(1);
    setGalleryCurrentIndex((prev) => (prev + 1) % copy.galleryItems.length);
  };

  const goToGalleryPrev = () => {
    setGallerySwipeDirection(-1);
    setGalleryCurrentIndex((prev) => (prev - 1 + copy.galleryItems.length) % copy.galleryItems.length);
  };

  const handleGalleryTouchStart = (e: React.TouchEvent) => {
    setGalleryTouchStartX(e.touches[0].clientX);
    setGalleryTouchStartY(e.touches[0].clientY);
  };

  const handleGalleryTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - galleryTouchStartX;
    const deltaY = touchEndY - galleryTouchStartY;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) goToGalleryNext();
    if (deltaX > 0) goToGalleryPrev();
  };

  const handleOpenFullscreen = () => {
    if (Date.now() < suppressFullscreenOpenUntil.current) {
      return;
    }

    setFullscreenDragY(0);
    setIsFullscreenVerticalDragging(false);
    setIsFullscreenGallery(true);
  };

  const handleCloseFullscreen = () => {
    suppressFullscreenOpenUntil.current = Date.now() + 350;
    setFullscreenDragY(0);
    setIsFullscreenVerticalDragging(false);
    setIsFullscreenGallery(false);
  };

  const handleOpenVideoFullscreen = () => {
    if (Date.now() < suppressFullscreenOpenUntil.current) {
      return;
    }

    const inlineVideo = inlineVideoRef.current;
    if (inlineVideo) {
      videoPlaybackSnapshot.current = {
        currentTime: inlineVideo.currentTime || 0,
        shouldResume: !inlineVideo.paused && !inlineVideo.ended,
      };
      inlineVideo.pause();
    }

    setIsFullscreenVideo(true);
  };

  const handleCloseVideoFullscreen = () => {
    const fullscreenVideo = fullscreenVideoRef.current;
    const inlineVideo = inlineVideoRef.current;

    if (fullscreenVideo && inlineVideo) {
      const currentTime = fullscreenVideo.currentTime || 0;
      const shouldResume = !fullscreenVideo.paused && !fullscreenVideo.ended;

      videoPlaybackSnapshot.current = {
        currentTime,
        shouldResume,
      };

      const applySyncToInline = () => {
        inlineVideo.currentTime = currentTime;
        if (shouldResume) {
          void inlineVideo.play().catch(() => {
            // Ignore autoplay restrictions after closing fullscreen.
          });
        }
      };

      if (inlineVideo.readyState >= 1) {
        applySyncToInline();
      } else {
        inlineVideo.addEventListener("loadedmetadata", applySyncToInline, { once: true });
      }
    }

    suppressFullscreenOpenUntil.current = Date.now() + 350;
    setIsFullscreenVideo(false);
  };

  const isIosSafari = () => {
    const ua = navigator.userAgent;
    const isiOS = /iP(ad|hone|od)/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isWebKit = /WebKit/i.test(ua);
    const isNonSafariIOSBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
    return isiOS && isWebKit && !isNonSafariIOSBrowser;
  };

  const triggerFileDownload = (url: string, fileName: string) => {
    const hasDownloadSupport = "download" in HTMLAnchorElement.prototype;

    if (!hasDownloadSupport && isIosSafari()) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const fetchMediaFile = async (url: string, fileName: string, fallbackMimeType: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unable to fetch media: ${response.status}`);
    }

    const blob = await response.blob();
    return new File([blob], fileName, {
      type: blob.type || fallbackMimeType,
      lastModified: Date.now(),
    });
  };

  const shareFileIfSupported = async (file: File, title: string) => {
    if (!isIosSafari()) {
      return false;
    }

    if (typeof navigator.share !== "function" || typeof navigator.canShare !== "function") {
      return false;
    }

    if (!navigator.canShare({ files: [file] })) {
      return false;
    }

    await navigator.share({
      files: [file],
      title,
    });
    return true;
  };

  const handleDownloadCurrentPhoto = async () => {
    const currentPhoto = copy.galleryItems[galleryCurrentIndex];
    const fileName = `FR315F-${String(galleryCurrentIndex + 1).padStart(2, "0")}.jpg`;

    try {
      const mediaFile = await fetchMediaFile(currentPhoto.src, fileName, "image/jpeg");
      const shared = await shareFileIfSupported(mediaFile, fileName);
      if (shared) {
        return;
      }

      const blobUrl = URL.createObjectURL(mediaFile);
      triggerFileDownload(blobUrl, fileName);
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    } catch {
      triggerFileDownload(currentPhoto.src, fileName);
    }
  };

  const handleDownloadVideo = async () => {
    const fileName = "FR315F-video.mp4";

    try {
      const mediaFile = await fetchMediaFile(FR315F_VIDEO_SRC, fileName, "video/mp4");
      const shared = await shareFileIfSupported(mediaFile, fileName);
      if (shared) {
        return;
      }

      const blobUrl = URL.createObjectURL(mediaFile);
      triggerFileDownload(blobUrl, fileName);
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    } catch {
      triggerFileDownload(FR315F_VIDEO_SRC, fileName);
    }
  };

  const handleFullscreenTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    fullscreenGesture.current.startX = touch.clientX;
    fullscreenGesture.current.startY = touch.clientY;
    fullscreenGesture.current.lastY = touch.clientY;
    fullscreenGesture.current.lastTs = Date.now();
    fullscreenGesture.current.deltaX = 0;
    fullscreenGesture.current.deltaY = 0;
    fullscreenGesture.current.velocityY = 0;
    fullscreenGesture.current.axis = "none";
    setIsFullscreenVerticalDragging(false);
  };

  const handleFullscreenTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const gesture = fullscreenGesture.current;

    gesture.deltaX = touch.clientX - gesture.startX;
    gesture.deltaY = touch.clientY - gesture.startY;

    if (gesture.axis === "none" && (Math.abs(gesture.deltaX) > 8 || Math.abs(gesture.deltaY) > 8)) {
      gesture.axis = Math.abs(gesture.deltaY) > Math.abs(gesture.deltaX) ? "vertical" : "horizontal";
    }

    if (gesture.axis === "vertical") {
      const now = Date.now();
      const dt = Math.max(now - gesture.lastTs, 1);
      gesture.velocityY = (touch.clientY - gesture.lastY) / dt;
      gesture.lastY = touch.clientY;
      gesture.lastTs = now;
      setIsFullscreenVerticalDragging(true);
      setFullscreenDragY(gesture.deltaY);
    }

    if (gesture.axis === "horizontal") {
      return;
    }
  };

  const handleFullscreenTouchEnd = () => {
    const gesture = fullscreenGesture.current;

    if (gesture.axis === "horizontal") {
      if (gesture.deltaX < -50) goToGalleryNext();
      if (gesture.deltaX > 50) goToGalleryPrev();
      return;
    }

    if (gesture.axis === "vertical") {
      const shouldCloseByDistance = Math.abs(gesture.deltaY) > 100;
      const shouldCloseByVelocity = Math.abs(gesture.deltaY) > 48 && Math.abs(gesture.velocityY) > 0.8;

      if (shouldCloseByDistance || shouldCloseByVelocity) {
        handleCloseFullscreen();
        return;
      }
    }

    setIsFullscreenVerticalDragging(false);
    setFullscreenDragY(0);
  };

  const isAnyFullscreenOpen = isFullscreenGallery || isFullscreenVideo;

  useEffect(() => {
    if (!isFullscreenVideo) {
      return;
    }

    const fullscreenVideo = fullscreenVideoRef.current;
    if (!fullscreenVideo) {
      return;
    }

    const { currentTime, shouldResume } = videoPlaybackSnapshot.current;
    const applySyncToFullscreen = () => {
      fullscreenVideo.currentTime = currentTime;
      if (shouldResume) {
        void fullscreenVideo.play().catch(() => {
          // Ignore autoplay restrictions on some devices.
        });
      }
    };

    if (fullscreenVideo.readyState >= 1) {
      applySyncToFullscreen();
    } else {
      fullscreenVideo.addEventListener("loadedmetadata", applySyncToFullscreen, { once: true });
    }
  }, [isFullscreenVideo]);

  useEffect(() => {
    if (!isAnyFullscreenOpen) {
      return;
    }

    fullscreenScrollY.current = window.scrollY;
    previousBodyStyles.current = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      touchAction: document.body.style.touchAction,
    };
    previousHtmlStyles.current = {
      overflow: document.documentElement.style.overflow,
      overscrollBehavior: document.documentElement.style.overscrollBehavior,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${fullscreenScrollY.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    if (isFullscreenGallery) {
      fullscreenDialogRef.current?.focus();
    }

    if (isFullscreenVideo) {
      fullscreenVideoDialogRef.current?.focus();
    }

    return () => {
      const previousBody = previousBodyStyles.current;
      document.body.style.overflow = previousBody.overflow;
      document.body.style.position = previousBody.position;
      document.body.style.top = previousBody.top;
      document.body.style.left = previousBody.left;
      document.body.style.right = previousBody.right;
      document.body.style.width = previousBody.width;
      document.body.style.touchAction = previousBody.touchAction;

      const previousHtml = previousHtmlStyles.current;
      document.documentElement.style.overflow = previousHtml.overflow;
      document.documentElement.style.overscrollBehavior = previousHtml.overscrollBehavior;
      window.scrollTo(0, fullscreenScrollY.current);
    };
  }, [isAnyFullscreenOpen, isFullscreenGallery, isFullscreenVideo]);

  const fullscreenImageVariants: Variants = {
    enter: (direction: 1 | -1) => ({
      opacity: 0,
      x: direction > 0 ? 48 : -48,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: 1 | -1) => ({
      opacity: 0,
      x: direction > 0 ? -48 : 48,
    }),
  };

  const handleFullscreenKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (isFullscreenGallery) {
        handleCloseFullscreen();
      }

      if (isFullscreenVideo) {
        handleCloseVideoFullscreen();
      }
    } else if (e.key === "ArrowRight") {
      if (isFullscreenGallery) {
        goToGalleryNext();
      }
    } else if (e.key === "ArrowLeft") {
      if (isFullscreenGallery) {
        goToGalleryPrev();
      }
    }
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
                      onClick={handleOpenFullscreen}
                      style={{ cursor: "pointer" }}
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
                      <video
                        ref={inlineVideoRef}
                        className="fr315f-videoPlayer"
                        controls
                        preload="metadata"
                        poster={FR315F_VIDEO_POSTER}
                        playsInline
                        muted={false}
                        onError={() => setIsVideoAvailable(false)}
                        onDoubleClick={handleOpenVideoFullscreen}
                      >
                        <source src={FR315F_VIDEO_SRC} type="video/mp4" />
                        <source src={FR315F_VIDEO_FALLBACK_SRC} type="video/mp4" />
                      </video>
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

      <AnimatePresence>
        {isFullscreenGallery && (
          <motion.div
            className="fr315f-fullscreenGallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onKeyDown={handleFullscreenKeyDown}
            role="dialog"
            aria-modal="true"
            tabIndex={0}
            ref={fullscreenDialogRef}
          >
            <div className="fr315f-fullscreenTopControls">
              <button
                className="fr315f-fullscreenDownload"
                onClick={(e) => {
                  e.stopPropagation();
                  void handleDownloadCurrentPhoto();
                }}
                aria-label="Download current photo"
                title="Download"
              >
                <Download size={20} />
              </button>

              <button
                className="fr315f-fullscreenClose"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseFullscreen();
                }}
                aria-label="Close fullscreen"
                title="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              className="fr315f-fullscreenContainer"
              onTouchStart={handleFullscreenTouchStart}
              onTouchMove={handleFullscreenTouchMove}
              onTouchEnd={handleFullscreenTouchEnd}
            >
              <motion.div
                className="fr315f-fullscreenImageViewport"
                animate={{
                  y: fullscreenDragY,
                  scale: isFullscreenVerticalDragging ? Math.max(0.92, 1 - Math.abs(fullscreenDragY) / 1200) : 1,
                  opacity: isFullscreenVerticalDragging ? Math.max(0.75, 1 - Math.abs(fullscreenDragY) / 900) : 1,
                }}
                transition={isFullscreenVerticalDragging ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
              >
                <AnimatePresence initial={false} custom={gallerySwipeDirection} mode="wait">
                  <motion.img
                    key={`fullscreen-${galleryCurrentIndex}`}
                    src={copy.galleryItems[galleryCurrentIndex].src}
                    alt={copy.galleryItems[galleryCurrentIndex].alt}
                    className="fr315f-fullscreenImage"
                    custom={gallerySwipeDirection}
                    variants={fullscreenImageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </motion.div>

              <button
                className="fr315f-fullscreenNav fr315f-fullscreenNav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goToGalleryPrev();
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                className="fr315f-fullscreenNav fr315f-fullscreenNav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  goToGalleryNext();
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={32} />
              </button>

              <div className="fr315f-fullscreenCounter">
                {galleryCurrentIndex + 1}/{copy.galleryItems.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFullscreenVideo && (
          <motion.div
            className="fr315f-fullscreenGallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onKeyDown={handleFullscreenKeyDown}
            role="dialog"
            aria-modal="true"
            tabIndex={0}
            ref={fullscreenVideoDialogRef}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCloseVideoFullscreen();
              }
            }}
          >
            <div className="fr315f-fullscreenTopControls">
              <button
                className="fr315f-fullscreenDownload"
                onClick={(e) => {
                  e.stopPropagation();
                  void handleDownloadVideo();
                }}
                aria-label="Download video"
                title="Download"
              >
                <Download size={20} />
              </button>

              <button
                className="fr315f-fullscreenClose"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseVideoFullscreen();
                }}
                aria-label="Close fullscreen video"
                title="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="fr315f-fullscreenVideoViewport">
              <video
                ref={fullscreenVideoRef}
                className="fr315f-fullscreenVideoPlayer"
                controls
                preload="metadata"
                poster={FR315F_VIDEO_POSTER}
                playsInline
                muted={false}
                onError={() => setIsVideoAvailable(false)}
              >
                <source src={FR315F_VIDEO_SRC} type="video/mp4" />
                <source src={FR315F_VIDEO_FALLBACK_SRC} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
