import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type ReactNode, type TouchEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, HandCoins, MessageCircle, Phone, PlayCircle } from "lucide-react";
import LeasingApplicationModal from "../LeasingApplicationModal/LeasingApplicationModal";
import ModelBadge from "../ModelBadge/ModelBadge";

export type ModelPageSpec = { label: string; value: string };
export type ModelPageFeature = { id: string; title: string; description: string; image: string };
export type ModelPageGalleryItem = { id: string; src: string; alt: string };

export type ModelPageContent = {
  back: string;
  actionOffer: string;
  actionChat: string;
  actionCall: string;
  actionLeasing: string;
  sectionMediaTitle: string;
  sectionMediaLead: string;
  videoHint: string;
  videoTitle: string;
  videoMissing: string;
  features: ModelPageFeature[];
  galleryItems: ModelPageGalleryItem[];
};

type ModelPageProps = {
  onBack: () => void;
  model: string;
  image: string;
  subtitle: string;
  description: string;
  specifications: ModelPageSpec[];
  brandLogoSrc: string;
  lovolLogoSrc: string;
  videoSources: string[];
  videoPoster: string;
  content: ModelPageContent;
};

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

function getSpecIcon(index: number): ReactNode {
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 4h10l3 15H4L7 4z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
          <path d="M12 8v7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M9.5 11.5h5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="7" width="12" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <path d="M17 10h2l2 2v2h-2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 10v4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 15a6 6 0 1 0 12 0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M18.5 15.2c1.3-1.4 1.8-3.8.2-5.6-2.3.4-3.9 1.2-5 3.2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.9" />
          <path d="M12 12 16 9" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function ModelPage({
  onBack,
  model,
  image,
  subtitle,
  description,
  specifications,
  brandLogoSrc,
  lovolLogoSrc,
  videoSources,
  videoPoster,
  content,
}: ModelPageProps) {
  const [showUI] = useState(true);
  const [isLeasingModalOpen, setIsLeasingModalOpen] = useState(false);
  const [leasingModalKey, setLeasingModalKey] = useState(0);
  const [isVideoAvailable, setIsVideoAvailable] = useState(true);
  const [activeVideoSourceIndex, setActiveVideoSourceIndex] = useState(0);
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
  const [activeFeatureId, setActiveFeatureId] = useState(content.features[0].id);

  const openLeasingModal = () => {
    setLeasingModalKey((prev) => prev + 1);
    setIsLeasingModalOpen(true);
  };

  const goToGalleryNext = () => {
    setGallerySwipeDirection(1);
    setGalleryCurrentIndex((prev) => (prev + 1) % content.galleryItems.length);
  };

  const goToGalleryPrev = () => {
    setGallerySwipeDirection(-1);
    setGalleryCurrentIndex((prev) => (prev - 1 + content.galleryItems.length) % content.galleryItems.length);
  };

  const handleGalleryTouchStart = (e: TouchEvent) => {
    setGalleryTouchStartX(e.touches[0].clientX);
    setGalleryTouchStartY(e.touches[0].clientY);
  };

  const handleGalleryTouchEnd = (e: TouchEvent) => {
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
    const currentPhoto = content.galleryItems[galleryCurrentIndex];
    const fileName = `${model}-${String(galleryCurrentIndex + 1).padStart(2, "0")}.jpg`;

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
    const fileName = `${model}-video.mp4`;
    const downloadSource = videoSources[0];

    if (!downloadSource) {
      return;
    }

    try {
      const mediaFile = await fetchMediaFile(downloadSource, fileName, "video/mp4");
      const shared = await shareFileIfSupported(mediaFile, fileName);
      if (shared) {
        return;
      }

      const blobUrl = URL.createObjectURL(mediaFile);
      triggerFileDownload(blobUrl, fileName);
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    } catch {
      triggerFileDownload(downloadSource, fileName);
    }
  };

  const handleVideoError = () => {
    if (activeVideoSourceIndex < videoSources.length - 1) {
      setActiveVideoSourceIndex((prev) => prev + 1);
      return;
    }

    setIsVideoAvailable(false);
  };

  const handleFullscreenTouchStart = (e: TouchEvent<HTMLDivElement>) => {
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

  const handleFullscreenTouchMove = (e: TouchEvent<HTMLDivElement>) => {
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

  const handleFullscreenKeyDown = (e: KeyboardEvent) => {
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
    { label: content.actionOffer, href: "#", primary: true, icon: Download },
    { label: content.actionChat, href: "https://wa.me/77000000000", external: true, icon: MessageCircle },
    { label: content.actionCall, href: "tel:+77000000000", icon: Phone },
    { label: content.actionLeasing, stacked: true, icon: HandCoins, onClick: openLeasingModal },
  ];

  const selectedFeatureId = content.features.some((feature) => feature.id === activeFeatureId) ? activeFeatureId : content.features[0].id;
  const activeFeature = content.features.find((feature) => feature.id === selectedFeatureId) ?? content.features[0];
  const activeVideoSrc = videoSources[activeVideoSourceIndex];

  return (
    <div className="fr315f-shell">
      <div className="fr315f-backdrop" />

      <button className="fr315f-back" onClick={onBack} aria-label={content.back} data-feedback="none">
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {showUI && (
          <motion.div className="fr315f-ui" variants={overlayVariants} initial="hidden" animate="show" exit="hidden">
            <motion.header className="fr315f-header" variants={rowVariants}>
              <img className="fr315f-brandLogo" src={brandLogoSrc} alt="Turkuaz Machinery CA" />
              <h1 className="fr315f-title fr315f-title--logo" aria-label={`LOVOL ${model}`}>
                <span className="fr315f-titleLovol">
                  <img className="fr315f-titleLovolImage" src={lovolLogoSrc} alt="LOVOL" loading="eager" decoding="async" />
                </span>
                <ModelBadge model={model} />
              </h1>
              <div className="fr315f-heroMachine">
                <div className="fr315f-heroMachineHalo" aria-hidden="true" />
                <img className="fr315f-heroMachineImage" src={image} alt={`LOVOL ${model}`} loading="eager" decoding="async" />
              </div>
              <p className="fr315f-subtitle">{subtitle}</p>
              <p className="fr315f-copy">{description}</p>
            </motion.header>

            <motion.section className="fr315f-specs" variants={rowVariants}>
              {specifications.map((spec, index) => (
                <motion.article key={spec.label} className="fr315f-spec" whileHover={{ y: -3, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <div className="fr315f-specHead">
                    <span className="fr315f-specIcon">{getSpecIcon(index)}</span>
                    <span className="fr315f-specText">
                      <span className="fr315f-specValue">{spec.value}</span>
                      <span className="fr315f-specLabel">{spec.label}</span>
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.section>

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
                {content.features.map((feature) => {
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
                <h2>{content.sectionMediaTitle}</h2>
                <p>{content.sectionMediaLead}</p>
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
                        src={content.galleryItems[galleryCurrentIndex].src}
                        alt={content.galleryItems[galleryCurrentIndex].alt}
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
                      {galleryCurrentIndex + 1}/{content.galleryItems.length}
                    </div>
                  </div>
                </article>

                <article className="fr315f-mediaCard fr315f-mediaCard--video">
                  {isVideoAvailable && activeVideoSrc ? (
                    <div className="fr315f-videoWrap">
                      <video
                        ref={inlineVideoRef}
                        key={`inline-video-${activeVideoSourceIndex}`}
                        className="fr315f-videoPlayer"
                        src={activeVideoSrc}
                        controls
                        preload="metadata"
                        poster={videoPoster}
                        playsInline
                        muted={false}
                        onError={handleVideoError}
                        onDoubleClick={handleOpenVideoFullscreen}
                      />
                      <span className="fr315f-videoHint">{content.videoHint}</span>
                    </div>
                  ) : (
                    <>
                      <PlayCircle size={28} />
                      <h3>{content.videoTitle}</h3>
                      <p>{content.videoMissing}</p>
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

      <LeasingApplicationModal key={leasingModalKey} isOpen={isLeasingModalOpen} model={`LOVOL ${model}`} onClose={() => setIsLeasingModalOpen(false)} />

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
                    src={content.galleryItems[galleryCurrentIndex].src}
                    alt={content.galleryItems[galleryCurrentIndex].alt}
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
                {galleryCurrentIndex + 1}/{content.galleryItems.length}
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
                key={`fullscreen-video-${activeVideoSourceIndex}`}
                className="fr315f-fullscreenVideoPlayer"
                src={activeVideoSrc}
                controls
                preload="metadata"
                poster={videoPoster}
                playsInline
                muted={false}
                onError={handleVideoError}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
