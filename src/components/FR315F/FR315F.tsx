import { useAppLanguage, type AppLanguage } from "../../i18n";
import ModelPage, { type ModelPageContent, type ModelPageSpec } from "../ModelPage/ModelPage";
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
import lovolLogoSrc from "../../assets/branding/lovol-logo.png";

type Props = { onBack: () => void };

type FR315FCopy = {
  subtitle: string;
  lead: string;
  actionOffer: string;
  actionChat: string;
  actionCall: string;
  actionLeasing: string;
  specCards: ModelPageSpec[];
  features: ModelPageContent["features"];
  sectionMediaTitle: string;
  sectionMediaLead: string;
  galleryItems: ModelPageContent["galleryItems"];
  videoHint: string;
  videoTitle: string;
  videoMissing: string;
  back: string;
};

const TURKUAZ_LOGO_SRC = `${import.meta.env.BASE_URL}TMlogo.png`;
const FR315F_VIDEO_SRC = `${import.meta.env.BASE_URL}videos/FR315F-mobile.mp4`;
const FR315F_VIDEO_FALLBACK_SRC = `${import.meta.env.BASE_URL}videos/FR315F.MP4`;
const FR315F_VIDEO_POSTER = `${import.meta.env.BASE_URL}videos/FR315F-poster.jpg`;
const FR315F_HERO_IMAGE_SRC = `${import.meta.env.BASE_URL}FR315F.png`;

const FR315F_COPY: Record<AppLanguage, FR315FCopy> = {
  en: {
    back: "Back",
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
    sectionMediaTitle: "Media",
    sectionMediaLead: "Photo and video overview of the FR315F in action.",
    galleryItems: [
      { id: "1", src: galleryImage1, alt: "FR315F operation view 1" },
      { id: "2", src: galleryImage2, alt: "FR315F operation view 2" },
      { id: "3", src: galleryImage3, alt: "FR315F operation view 3" },
      { id: "4", src: galleryImage4, alt: "FR315F operation view 4" },
      { id: "5", src: galleryImage5, alt: "FR315F operation view 5" },
      { id: "6", src: galleryImage6, alt: "FR315F operation view 6" },
      { id: "7", src: galleryImage7, alt: "FR315F operation view 7" },
    ],
    videoHint: "FR315F video overview",
    videoTitle: "FR315F video overview",
    videoMissing: "Add videos/FR315F-overview.mp4 in public to connect the preview automatically.",
  },
  ru: {
    back: "Назад",
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
    sectionMediaTitle: "Медиа",
    sectionMediaLead: "Фото и видеообзор FR315F в работе.",
    galleryItems: [
      { id: "1", src: galleryImage1, alt: "FR315F вид эксплуатации 1" },
      { id: "2", src: galleryImage2, alt: "FR315F вид эксплуатации 2" },
      { id: "3", src: galleryImage3, alt: "FR315F вид эксплуатации 3" },
      { id: "4", src: galleryImage4, alt: "FR315F вид эксплуатации 4" },
      { id: "5", src: galleryImage5, alt: "FR315F вид эксплуатации 5" },
      { id: "6", src: galleryImage6, alt: "FR315F вид эксплуатации 6" },
      { id: "7", src: galleryImage7, alt: "FR315F вид эксплуатации 7" },
    ],
    videoHint: "Видеообзор FR315F",
    videoTitle: "Видеообзор FR315F",
    videoMissing: "Добавьте файл videos/FR315F-overview.mp4 в папку public для автоматического подключения.",
  },
  kk: {
    back: "Артқа",
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
    sectionMediaTitle: "Медиа",
    sectionMediaLead: "FR315F жұмыста фото және видеошолуы.",
    galleryItems: [
      { id: "1", src: galleryImage1, alt: "FR315F пайдалану көрінісі 1" },
      { id: "2", src: galleryImage2, alt: "FR315F пайдалану көрінісі 2" },
      { id: "3", src: galleryImage3, alt: "FR315F пайдалану көрінісі 3" },
      { id: "4", src: galleryImage4, alt: "FR315F пайдалану көрінісі 4" },
      { id: "5", src: galleryImage5, alt: "FR315F пайдалану көрінісі 5" },
      { id: "6", src: galleryImage6, alt: "FR315F пайдалану көрінісі 6" },
      { id: "7", src: galleryImage7, alt: "FR315F пайдалану көрінісі 7" },
    ],
    videoHint: "FR315F видео шолуы",
    videoTitle: "FR315F видео шолуы",
    videoMissing: "Автоматты қосу үшін public қалтасына videos/FR315F-overview.mp4 файлын қосыңыз.",
  },
};

export default function FR315F({ onBack }: Props) {
  const language = useAppLanguage();
  const copy = FR315F_COPY[language] ?? FR315F_COPY.ru;

  return (
    <ModelPage
      onBack={onBack}
      model="FR315F"
      image={FR315F_HERO_IMAGE_SRC}
      subtitle={copy.subtitle}
      description={copy.lead}
      specifications={copy.specCards}
      brandLogoSrc={TURKUAZ_LOGO_SRC}
      lovolLogoSrc={lovolLogoSrc}
      videoSources={[FR315F_VIDEO_SRC, FR315F_VIDEO_FALLBACK_SRC]}
      videoPoster={FR315F_VIDEO_POSTER}
      content={{
        back: copy.back,
        actionOffer: copy.actionOffer,
        actionChat: copy.actionChat,
        actionCall: copy.actionCall,
        actionLeasing: copy.actionLeasing,
        sectionMediaTitle: copy.sectionMediaTitle,
        sectionMediaLead: copy.sectionMediaLead,
        videoHint: copy.videoHint,
        videoTitle: copy.videoTitle,
        videoMissing: copy.videoMissing,
        features: copy.features,
        galleryItems: copy.galleryItems,
      }}
    />
  );
}
