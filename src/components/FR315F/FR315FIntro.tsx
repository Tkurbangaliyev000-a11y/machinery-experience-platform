import { motion } from "framer-motion";
import { useAppLanguage, type AppLanguage } from "../../i18n";
import "./FR315FIntro.css";
import cardImage from "../../assets/images/FR315F/card.png";

type Props = {
  onFinish: () => void;
};

const INTRO_COPY: Record<AppLanguage, { brand: string; lead: string }> = {
  en: {
    brand: "TURKUAZ MACHINERY CA",
    lead: "Premium excavator operation experience",
  },
  ru: {
    brand: "TURKUAZ MACHINERY CA",
    lead: "Премиальный опыт эксплуатации экскаватора",
  },
  kk: {
    brand: "TURKUAZ MACHINERY CA",
    lead: "Экскаваторды премиум деңгейде пайдалану тәжірибесі",
  },
};

export default function FR315FIntro({ onFinish }: Props) {
  const language = useAppLanguage();
  const copy = INTRO_COPY[language] ?? INTRO_COPY.ru;

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      onAnimationComplete={() => {
        setTimeout(onFinish, 5200);
      }}
    >
      {/* Световой луч */}
      <motion.div
        style={{
          position: "absolute",
          width: "1200px",
          height: "1200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,.18), transparent 70%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
        initial={{
          scale: 0.6,
          opacity: 0,
        }}
        animate={{
          scale: 1.4,
          opacity: 1,
        }}
        transition={{
          duration: 3,
        }}
      />

      {/* Логотип */}
      <motion.div
        className="intro-logo"
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 1,
        }}
      >
        {copy.brand}
      </motion.div>

      {/* Экскаватор */}
      <motion.img
        src={cardImage}
        className="intro-machine"
        initial={{
          opacity: 0,
          scale: 0.72,
          y: 120,
          rotateX: 15,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
        }}
        transition={{
          duration: 2.8,
          ease: "easeOut",
        }}
      />

      {/* Название */}
      <motion.div
        className="intro-title"
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          delay: 1.5,
          duration: 1,
        }}
      >
        FR315F
      </motion.div>

      {/* Подзаголовок */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "60px",
          color: "#9fdcff",
          letterSpacing: "8px",
          fontSize: "15px",
          textTransform: "uppercase",
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 2.3,
          duration: 1,
        }}
      >
        {copy.lead}
      </motion.div>
    </motion.div>
  );
}