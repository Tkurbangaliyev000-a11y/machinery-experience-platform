import "./ModelBadge.css";
import type { CSSProperties } from "react";

type Props = {
  model: string;
  className?: string;
};

export default function ModelBadge({ model, className = "" }: Props) {
  const rootClassName = className ? `model-badge ${className}` : "model-badge";
  const badgeStyle = {
    ["--model-char-count" as const]: model.length,
  } as CSSProperties;

  return (
    <div className={rootClassName} style={badgeStyle} role="img" aria-label={`Model badge ${model}`}>
      <span className="model-badge__model">{model}</span>
      <span className="model-badge__line" aria-hidden="true" />
      <span className="model-badge__wphi" aria-hidden="true">
        <span className="model-badge__wphiW">W</span>
        <span className="model-badge__wphiPH">PH</span>
        <span className="model-badge__wphiI">i</span>
      </span>
    </div>
  );
}
