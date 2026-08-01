import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MachineViewer.css";
import BackArrowButton from "../BackArrowButton/BackArrowButton";
import Catalog from "./Catalog";
import { useTranslations } from "../../i18n";
import UnifiedModelPage from "../ModelPage/UnifiedModelPage";
import { CATEGORY_MODEL_ORDER, MODEL_BY_ID, MODEL_BY_ROUTE, type ModelCategoryPage, type ModelId } from "../../data/modelCatalog";

type ViewerPage = "catalog" | ModelCategoryPage | "model";

const categoryRouteToPage: Record<string, ModelCategoryPage> = {
  excavators: "excavators",
  loaders: "loaders",
  dumptrucks: "dumptrucks",
  mining: "mining",
  backhoes: "backhoes",
  "wheeled-excavators": "wheeledExcavators",
};

const pageToCategoryRoute: Record<ModelCategoryPage, string> = {
  excavators: "excavators",
  loaders: "loaders",
  dumptrucks: "dumptrucks",
  mining: "mining",
  backhoes: "backhoes",
  wheeledExcavators: "wheeled-excavators",
};

export default function MachineViewer() {
  const navigate = useNavigate();
  const { page: routePage } = useParams();
  const translations = useTranslations();
  const turkuazLogoSrc = `${import.meta.env.BASE_URL}TMlogo.png`;

  const selectedModel = routePage ? MODEL_BY_ROUTE[routePage] : undefined;

  const page = useMemo<ViewerPage>(() => {
    if (!routePage) {
      return "catalog";
    }

    if (selectedModel) {
      return "model";
    }

    return categoryRouteToPage[routePage] ?? "catalog";
  }, [routePage, selectedModel]);

  const goToPage = (nextPage: "catalog" | ModelCategoryPage) => {
    if (nextPage === "catalog") {
      navigate("/catalog");
      return;
    }

    navigate(`/catalog/${pageToCategoryRoute[nextPage]}`);
  };

  const goToModel = (id: ModelId) => {
    const model = MODEL_BY_ID[id];
    navigate(`/catalog/${model.route}`);
  };

  if (page === "model" && selectedModel) {
    return <UnifiedModelPage model={selectedModel} onBack={() => goToPage(selectedModel.category)} />;
  }

  const renderModelButtons = (category: ModelCategoryPage, baseClassName: string) => {
    return CATEGORY_MODEL_ORDER[category].map((modelId) => {
      const model = MODEL_BY_ID[modelId];
      return (
        <button
          key={model.id}
          className={`catalog-card catalog-card--model ${baseClassName} ${model.cardClassName}`}
          onClick={() => goToModel(model.id)}
        >
          <h2>{model.id}</h2>
        </button>
      );
    });
  };

  if (page === "excavators") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--excavators">
        <BackArrowButton onClick={() => navigate("/catalog")} />

        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.excavatorsTitle}</h1>

        <p className="catalog-text">{translations.chooseModel}</p>

        <div className="catalog-grid">{renderModelButtons("excavators", "catalog-card--excavator-model")}</div>
      </div>
    );
  }

  if (page === "loaders") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--loaders">
        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.loadersTitle}</h1>

        <div className="catalog-grid">{renderModelButtons("loaders", "")}</div>

        <BackArrowButton onClick={() => goToPage("catalog")} />
      </div>
    );
  }

  if (page === "backhoes") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--backhoes">
        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.backhoesTitle}</h1>

        <div className="catalog-grid">{renderModelButtons("backhoes", "")}</div>

        <BackArrowButton onClick={() => goToPage("catalog")} />
      </div>
    );
  }

  if (page === "wheeledExcavators") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--wheeled-excavators">
        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.wheeledExcavatorsTitle}</h1>

        <div className="catalog-grid">{renderModelButtons("wheeledExcavators", "")}</div>

        <BackArrowButton onClick={() => goToPage("catalog")} />
      </div>
    );
  }

  if (page === "mining") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--mining">
        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.miningTitle}</h1>

        <div className="catalog-grid">{renderModelButtons("mining", "")}</div>

        <BackArrowButton onClick={() => goToPage("catalog")} />
      </div>
    );
  }

  if (page === "dumptrucks") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--dumptrucks">
        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.dumptrucksTitle}</h1>

        <div className="catalog-grid">{renderModelButtons("dumptrucks", "")}</div>

        <BackArrowButton onClick={() => goToPage("catalog")} />
      </div>
    );
  }

  return (
    <Catalog
      onExcavators={() => goToPage("excavators")}
      onLoaders={() => goToPage("loaders")}
      onDumptrucks={() => goToPage("dumptrucks")}
      onMining={() => goToPage("mining")}
      onBackhoes={() => goToPage("backhoes")}
      onWheeledExcavators={() => goToPage("wheeledExcavators")}
    />
  );
}
