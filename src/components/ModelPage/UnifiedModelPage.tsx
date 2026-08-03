import { useAppLanguage } from "../../i18n";
import type { ModelCatalogEntry } from "../../data/modelCatalog";
import { MODEL_PROFILES, PLACEHOLDER_MESSAGES } from "../../data/modelProfiles";
import ModelPage, { type ModelPageContent, type ModelPageSpec } from "./ModelPage";
import ParticleBackground from "../ParticleBackground/ParticleBackground";
import "../FR315F/FR315F.css";
import lovolLogoSrc from "../../assets/branding/lovol-logo.png";

type Props = {
  model: ModelCatalogEntry;
  onBack: () => void;
};

const TURKUAZ_LOGO_SRC = `${import.meta.env.BASE_URL}TMlogo.png`;

export default function UnifiedModelPage({ model, onBack }: Props) {
  const language = useAppLanguage();
  const profile = MODEL_PROFILES[model.id];
  const isPayloadCategory = model.category === "loaders" || model.category === "dumptrucks";

  const labels = {
    en: {
      operatingWeight: "Operating weight",
      engine: "Engine",
      enginePower: "Engine power",
      bucketVolume: "Bucket capacity",
      maxDiggingDepth: "Max digging depth",
      media: "Media",
      mediaLead: "Photo and video overview.",
      actionOffer: "Commercial offer",
      actionChat: "WhatsApp",
      actionCall: "Call",
      actionLeasing: "Leasing",
      back: "Back",
      videoHint: "Video overview",
      videoTitle: "Video overview",
    },
    ru: {
      operatingWeight: "Эксплуатационная масса",
      engine: "Двигатель",
      enginePower: "Мощность двигателя",
      bucketVolume: "Объем ковша",
      maxDiggingDepth: "Максимальная глубина копания",
      media: "Медиа",
      mediaLead: "Фото и видеообзор.",
      actionOffer: "Коммерческое предложение",
      actionChat: "WhatsApp",
      actionCall: "Позвонить",
      actionLeasing: "Лизинг",
      back: "Назад",
      videoHint: "Видеообзор",
      videoTitle: "Видеообзор",
    },
    kk: {
      operatingWeight: "Пайдалану салмағы",
      engine: "Қозғалтқыш",
      enginePower: "Қозғалтқыш қуаты",
      bucketVolume: "Шөміш көлемі",
      maxDiggingDepth: "Максималды қазу тереңдігі",
      media: "Медиа",
      mediaLead: "Фото және видео шолу.",
      actionOffer: "Коммерциялық ұсыныс",
      actionChat: "WhatsApp",
      actionCall: "Қоңырау шалу",
      actionLeasing: "Лизинг",
      back: "Артқа",
      videoHint: "Видео шолу",
      videoTitle: "Видео шолу",
    },
  }[language];

  const depthOrPayloadLabel = isPayloadCategory
    ? language === "ru"
      ? "Грузоподьемность"
      : language === "en"
        ? "Payload capacity"
        : "Жүк көтергіштігі"
    : labels.maxDiggingDepth;

  const bucketOrBodyLabel = model.category === "dumptrucks"
    ? language === "ru"
      ? "Объем кузова"
      : language === "en"
        ? "Body volume"
        : "Кузов көлемі"
    : labels.bucketVolume;

  const specs: ModelPageSpec[] = [
    { label: labels.operatingWeight, value: profile.specifications.operatingWeight },
    { label: labels.engine, value: profile.specifications.engine },
    { label: labels.enginePower, value: profile.specifications.enginePower },
    { label: bucketOrBodyLabel, value: profile.specifications.bucketVolume },
    { label: depthOrPayloadLabel, value: profile.specifications.maxDiggingDepth },
  ];

  const videoPoster = profile.videos[0]?.poster ?? "";
  const videoSources = profile.videos.map((video) => video.src);

  const content: ModelPageContent = {
    back: labels.back,
    actionOffer: labels.actionOffer,
    actionChat: labels.actionChat,
    actionCall: labels.actionCall,
    actionLeasing: labels.actionLeasing,
    sectionMediaTitle: labels.media,
    sectionMediaLead: labels.mediaLead,
    galleryMissing: PLACEHOLDER_MESSAGES.gallery,
    videoHint: labels.videoHint,
    videoTitle: labels.videoTitle,
    videoMissing: PLACEHOLDER_MESSAGES.video,
    documentsMissing: PLACEHOLDER_MESSAGES.documents,
    features: profile.features,
    galleryItems: profile.gallery,
  };

  return (
    <>
      <ParticleBackground />
      <ModelPage
        onBack={onBack}
        model={model.id}
        subtitle={profile.subtitle}
        description={profile.description}
        specifications={specs}
        brandLogoSrc={TURKUAZ_LOGO_SRC}
        lovolLogoSrc={lovolLogoSrc}
        videoSources={videoSources}
        videoPoster={videoPoster}
        offerHref={profile.brochure?.url ?? profile.documents[0]?.url}
        showFeatures={model.category === "excavators"}
        content={content}
      />
    </>
  );
}
