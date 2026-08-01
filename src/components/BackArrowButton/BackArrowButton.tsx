import { ArrowLeft } from "lucide-react";
import "./BackArrowButton.css";

interface Props {
  onClick: () => void;
  ariaLabel?: string;
}

export default function BackArrowButton({ onClick, ariaLabel = "Назад" }: Props) {
  return (
    <button
      className="back-arrow-btn"
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <ArrowLeft size={18} />
    </button>
  );
}
