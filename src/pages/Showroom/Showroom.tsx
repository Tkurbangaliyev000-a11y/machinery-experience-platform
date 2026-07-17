import "./Showroom.css";
import { useTranslations } from "../../i18n";

export default function Showroom() {
  const translations = useTranslations();

  return (
    <main className="showroom">
      <div className="showroom__panel premium-panel">
        <p className="showroom__kicker">{translations.showroomKicker}</p>
        <h1>{translations.showroomTitle}</h1>
        <p>{translations.showroomLead}</p>
      </div>
    </main>
  );
}