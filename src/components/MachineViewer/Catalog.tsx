import { useTranslations } from "../../i18n";

type Props = {
  onExcavators: () => void;
  onLoaders: () => void;
  onDumptrucks: () => void;
  onMining: () => void;
  onBackhoes: () => void;
  onWheeledExcavators: () => void;
};

export default function Catalog({
  onExcavators,
  onLoaders,
  onDumptrucks,
  onMining,
  onBackhoes,
  onWheeledExcavators,
}: Props) {
  const translations = useTranslations();
  const lovolLogoSrc = `${import.meta.env.BASE_URL}LOVOL.png`;

  return (
    <div className="catalog-page catalog-page--categories">
      <p className="catalog-subtitle">Туркуаз Машинери Казахстан</p>

      <h1 className="catalog-title-headline">
        <img className="catalog-title-logo" src={lovolLogoSrc} alt="Логотип LOVOL" />
        <span className="catalog-logo-text">{translations.chooseCategory}</span>
      </h1>

      <div className="catalog-grid">
        <button
          data-feedback="primary"
          className="catalog-card catalog-card--excavators large"
          onClick={onExcavators}
        >
          <div className="card-overlay" />
          <h2 className="catalog-category-title">{translations.excavators}</h2>
        </button>

        <button
          data-feedback="primary"
          className="catalog-card catalog-card--loader"
          onClick={onLoaders}
        >
          <div className="card-overlay" />
          <h2 className="catalog-category-title">{translations.loaders}</h2>
        </button>

        <button
          data-feedback="primary"
          className="catalog-card catalog-card--dumptrucks"
          onClick={onDumptrucks}
        >
          <div className="card-overlay" />
          <h2 className="catalog-category-title">{translations.dumptrucks}</h2>
        </button>

        <button
          data-feedback="primary"
          className="catalog-card catalog-card--wheeled-excavators"
          onClick={onWheeledExcavators}
        >
          <div className="card-overlay" />
          <h2 className="catalog-category-title">{translations.wheeledExcavators}</h2>
        </button>

        <button
          data-feedback="primary"
          className="catalog-card catalog-card--backhoes"
          onClick={onBackhoes}
        >
          <div className="card-overlay" />
          <h2 className="catalog-category-title">{translations.backhoes}</h2>
        </button>

        <button
          data-feedback="primary"
          className="catalog-card catalog-card--mining"
          onClick={onMining}
        >
          <div className="card-overlay" />
          <h2 className="catalog-category-title">{translations.mining}</h2>
        </button>
      </div>
    </div>
  );
}