import type { ModelId } from "./modelCatalog";
import { MODEL_BY_ID } from "./modelCatalog";

import cameraImage from "../assets/images/FR315F/camera.png";
import ledImage from "../assets/images/FR315F/led.png";
import cabinImage from "../assets/images/FR315F/cabin.png";
import roofImage from "../assets/images/FR315F/roof.png";

import galleryImage1 from "../assets/images/FR315F/gallery/1.jpg";
import galleryImage2 from "../assets/images/FR315F/gallery/2.jpg";
import galleryImage3 from "../assets/images/FR315F/gallery/3.jpg";
import galleryImage4 from "../assets/images/FR315F/gallery/4.jpg";
import galleryImage5 from "../assets/images/FR315F/gallery/5.jpg";
import galleryImage6 from "../assets/images/FR315F/gallery/6.jpg";
import galleryImage7 from "../assets/images/FR315F/gallery/7.jpg";
import fw215fMainImage from "../assets/Machines/Fw215f-main.jpg";

export type ModelProfile = {
  title: string;
  heroImage: string | null;
  subtitle: string;
  description: string;
  specifications: {
    operatingWeight: string;
    engine: string;
    enginePower: string;
    bucketVolume: string;
    maxDiggingDepth: string;
  };
  features: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
  gallery: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
  videos: Array<{
    src: string;
    poster?: string;
  }>;
  documents: Array<{
    title: string;
    url: string;
  }>;
  brochure: {
    title: string;
    url: string;
  } | null;
  advantages: Array<{
    title: string;
    description: string;
  }>;
};

const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 942">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0b131c"/>
        <stop offset="1" stop-color="#121b26"/>
      </linearGradient>
    </defs>
    <rect width="1280" height="942" fill="url(#g)"/>
    <g opacity="0.8" fill="none" stroke="#1EBBD2" stroke-width="2">
      <circle cx="640" cy="471" r="220" opacity="0.35"/>
      <circle cx="640" cy="471" r="140" opacity="0.55"/>
      <circle cx="640" cy="471" r="58" opacity="0.75"/>
    </g>
    <text x="640" y="505" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" fill="#c8d2dc" opacity="0.86">Контент скоро будет добавлен</text>
  </svg>`,
)}`;

const GALLERY_PLACEHOLDER_TEXT = "Фотографии скоро будут добавлены";
const VIDEO_PLACEHOLDER_TEXT = "Видеообзор скоро будет добавлен";
const DOCUMENTS_PLACEHOLDER_TEXT = "Документы скоро будут добавлены";

const createSpecBlock = (id: ModelId) => {
  const spec = MODEL_BY_ID[id].specs;
  return {
    operatingWeight: spec.operatingWeight,
    engine: spec.engine,
    enginePower: spec.enginePower,
    bucketVolume: spec.bucketVolume,
    maxDiggingDepth: spec.maxDiggingDepth,
  };
};

const createPlaceholderProfile = (id: ModelId, subtitle: string): ModelProfile => {
  const specs = createSpecBlock(id);
  const advantages = [
    {
      title: "Премиальная эргономика",
      description: `Описание преимуществ модели ${id} будет добавлено после получения официальных материалов.`,
    },
    {
      title: "Высокая производительность",
      description: `Детальные эксплуатационные преимущества ${id} будут добавлены в следующем обновлении.`,
    },
    {
      title: "Надежность узлов",
      description: `Подробности по надежности и ресурсу ${id} будут добавлены после верификации.`,
    },
    {
      title: "Сервисная готовность",
      description: `Информация о сервисных преимуществах ${id} готовится к публикации.`,
    },
  ];

  return {
    title: `LOVOL ${id}`,
    heroImage: HERO_IMAGE_BY_MODEL[id] ?? null,
    subtitle,
    description: `Официальное описание модели ${id} скоро будет добавлено.`,
    specifications: specs,
    features: advantages.map((advantage, index) => ({
      id: `feature-${index + 1}`,
      title: advantage.title,
      description: advantage.description,
      image: PLACEHOLDER_IMAGE,
    })),
    gallery: [],
    videos: [],
    documents: [],
    brochure: null,
    advantages,
  };
};

const createExcavatorPlaceholderProfile = (id: ModelId): ModelProfile => {
  const profile = createPlaceholderProfile(id, "Гидравлический экскаватор");
  profile.features = [
    {
      id: "camera",
      title: "Камера заднего вида",
      description: `Описание преимущества "Камера заднего вида" для ${id} скоро будет добавлено.`,
      image: cameraImage,
    },
    {
      id: "led",
      title: "LED-оптика",
      description: `Описание преимущества "LED-оптика" для ${id} скоро будет добавлено.`,
      image: ledImage,
    },
    {
      id: "ropsfops",
      title: "ROPS/FOPS",
      description: `Описание преимущества "ROPS/FOPS" для ${id} скоро будет добавлено.`,
      image: roofImage,
    },
    {
      id: "cabin",
      title: "Защита кабины",
      description: `Описание преимущества "Защита кабины" для ${id} скоро будет добавлено.`,
      image: cabinImage,
    },
  ];
  profile.advantages = profile.features.map((feature) => ({ title: feature.title, description: feature.description }));
  return profile;
};

const HERO_IMAGE_BY_MODEL: Record<ModelId, string | null> = {
  FR215F: `${import.meta.env.BASE_URL}FR215F.png`,
  FR260F: `${import.meta.env.BASE_URL}FR260F.png`,
  FR315F: `${import.meta.env.BASE_URL}FR315F.png`,
  FR335F: `${import.meta.env.BASE_URL}FR335F.png`,
  FR375F: `${import.meta.env.BASE_URL}FR375F.png`,
  FR560F: null,
  FR700F: `${import.meta.env.BASE_URL}FR700F.png`,
  FR800F: `${import.meta.env.BASE_URL}FR800F.png`,
  FR1000F: `${import.meta.env.BASE_URL}FR1000F.png`,
  FR1350F: `${import.meta.env.BASE_URL}FR1350F.png`,
  FR1500F: `${import.meta.env.BASE_URL}FR1500F.png`,
  FR2000F: null,
  FW60F: `${import.meta.env.BASE_URL}FW60F.png`,
  FW160F: null,
  FW215F: fw215fMainImage,
  FL955F: `${import.meta.env.BASE_URL}FL955F.png`,
  FL955K: `${import.meta.env.BASE_URL}FL955K.png`,
  "FL980K-HST": `${import.meta.env.BASE_URL}FL980K.png`,
  LT90: null,
  LT110: null,
  LT130: null,
  FB878H: null,
};

export const MODEL_PROFILES: Record<ModelId, ModelProfile> = {
  FR315F: {
    title: "LOVOL FR315F",
    heroImage: HERO_IMAGE_BY_MODEL.FR315F,
    subtitle: "Премиальный гидравлический экскаватор",
    description: "Подчеркнутая мощь, инженерная точность и премиальная эргономика для людей, которые работают с техникой на новом уровне.",
    specifications: createSpecBlock("FR315F"),
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
        title: "ROPS/FOPS",
        description: "Усиленная конструкция ROPS/FOPS повышает защиту оператора в тяжелых условиях.",
        image: roofImage,
      },
      {
        id: "cabin",
        title: "Защита кабины",
        description: "Компактная и прозрачная решетка сохраняет обзор и безопасность.",
        image: cabinImage,
      },
    ],
    gallery: [
      { id: "1", src: galleryImage1, alt: "FR315F вид эксплуатации 1" },
      { id: "2", src: galleryImage2, alt: "FR315F вид эксплуатации 2" },
      { id: "3", src: galleryImage3, alt: "FR315F вид эксплуатации 3" },
      { id: "4", src: galleryImage4, alt: "FR315F вид эксплуатации 4" },
      { id: "5", src: galleryImage5, alt: "FR315F вид эксплуатации 5" },
      { id: "6", src: galleryImage6, alt: "FR315F вид эксплуатации 6" },
      { id: "7", src: galleryImage7, alt: "FR315F вид эксплуатации 7" },
    ],
    videos: [
      { src: `${import.meta.env.BASE_URL}videos/FR315F-mobile.mp4`, poster: `${import.meta.env.BASE_URL}videos/FR315F-poster.jpg` },
      { src: `${import.meta.env.BASE_URL}videos/FR315F.MP4`, poster: `${import.meta.env.BASE_URL}videos/FR315F-poster.jpg` },
    ],
    documents: [],
    brochure: null,
    advantages: [
      { title: "Камера заднего вида", description: "Панорамный обзор с четким изображением для точного маневрирования." },
      { title: "LED-оптика", description: "Яркое световое решение для работы в рассветные и ночные смены." },
      { title: "ROPS/FOPS", description: "Усиленная конструкция ROPS/FOPS повышает защиту оператора в тяжелых условиях." },
      { title: "Защита кабины", description: "Компактная и прозрачная решетка сохраняет обзор и безопасность." },
    ],
  },
  FR215F: createExcavatorPlaceholderProfile("FR215F"),
  FR260F: createExcavatorPlaceholderProfile("FR260F"),
  FR335F: createExcavatorPlaceholderProfile("FR335F"),
  FR375F: createExcavatorPlaceholderProfile("FR375F"),
  FL955F: createPlaceholderProfile("FL955F", "Фронтальный погрузчик"),
  FL955K: createPlaceholderProfile("FL955K", "Фронтальный погрузчик"),
  "FL980K-HST": createPlaceholderProfile("FL980K-HST", "Фронтальный погрузчик"),
  LT90: createPlaceholderProfile("LT90", "Карьерный самосвал"),
  LT110: createPlaceholderProfile("LT110", "Карьерный самосвал"),
  LT130: createPlaceholderProfile("LT130", "Карьерный самосвал"),
  FW60F: createPlaceholderProfile("FW60F", "Колесный экскаватор"),
  FW160F: createPlaceholderProfile("FW160F", "Колесный экскаватор"),
  FW215F: createPlaceholderProfile("FW215F", "Колесный экскаватор"),
  FB878H: createPlaceholderProfile("FB878H", "Экскаватор-погрузчик"),
  FR560F: createPlaceholderProfile("FR560F", "Карьерный экскаватор"),
  FR700F: createPlaceholderProfile("FR700F", "Карьерный экскаватор"),
  FR800F: createPlaceholderProfile("FR800F", "Карьерный экскаватор"),
  FR1000F: createPlaceholderProfile("FR1000F", "Карьерный экскаватор"),
  FR1350F: createPlaceholderProfile("FR1350F", "Карьерный экскаватор"),
  FR1500F: createPlaceholderProfile("FR1500F", "Карьерный экскаватор"),
  FR2000F: createPlaceholderProfile("FR2000F", "Карьерный экскаватор"),
};

export const PLACEHOLDER_MESSAGES = {
  gallery: GALLERY_PLACEHOLDER_TEXT,
  video: VIDEO_PLACEHOLDER_TEXT,
  documents: DOCUMENTS_PLACEHOLDER_TEXT,
};
