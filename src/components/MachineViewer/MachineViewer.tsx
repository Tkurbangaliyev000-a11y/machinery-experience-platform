import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MachineViewer.css";
import BackArrowButton from "../BackArrowButton/BackArrowButton";
import FR315F from "../FR315F/FR315F";
import FR215F from "../FR215F/FR215F.tsx";
import FW215F from "../FW215F/FW215F";
import Catalog from "./Catalog";
import { useTranslations } from "../../i18n";

type ViewerPage =
  | "catalog"
  | "excavators"
  | "loaders"
  | "dumptrucks"
  | "mining"
  | "backhoes"
  | "wheeledExcavators"
  | "fr315f"
  | "fr215f"
  | "fw215f";

const routeToPage: Record<string, ViewerPage> = {
  catalog: "catalog",
  excavators: "excavators",
  loaders: "loaders",
  dumptrucks: "dumptrucks",
  mining: "mining",
  backhoes: "backhoes",
  "wheeled-excavators": "wheeledExcavators",
  fr315f: "fr315f",
  fr215f: "fr215f",
  fw215f: "fw215f",
};

const pageToRoute: Record<ViewerPage, string> = {
  catalog: "catalog",
  excavators: "excavators",
  loaders: "loaders",
  dumptrucks: "dumptrucks",
  mining: "mining",
  backhoes: "backhoes",
  wheeledExcavators: "wheeled-excavators",
  fr315f: "fr315f",
  fr215f: "fr215f",
  fw215f: "fw215f",
};

export default function MachineViewer() {
  const navigate = useNavigate();
  const { page: routePage } = useParams();
  const translations = useTranslations();
  const turkuazLogoSrc = `${import.meta.env.BASE_URL}TMlogo.png`;

  const page = useMemo<ViewerPage>(() => {
    if (!routePage) {
      return "catalog";
    }

    return routeToPage[routePage] ?? "catalog";
  }, [routePage]);

  const goToPage = (nextPage: ViewerPage) => {
    const routeSegment = pageToRoute[nextPage];
    if (routeSegment === "catalog") {
      navigate("/catalog");
      return;
    }

    navigate(`/catalog/${routeSegment}`);
  };

  if (page === "fr315f") {
    return (
      <FR315F
        onBack={() => goToPage("excavators")}
      />
    );
  }

  if (page === "fr215f") {
    return (
      <FR215F
        onBack={() => goToPage("excavators")}
      />
    );
  }

  if (page === "fw215f") {
    return (
      <FW215F
        onBack={() => goToPage("wheeledExcavators")}
      />
    );
  }

  if (page === "excavators") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--excavators">
        <BackArrowButton onClick={() => navigate("/catalog")} />

        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.excavatorsTitle}</h1>

        <p className="catalog-text">
          {translations.chooseModel}
        </p>

        <div className="catalog-grid">

          <button
            className="catalog-card catalog-card--model catalog-card--excavator-model catalog-card--fr215f"
            onClick={() => goToPage("fr215f")}
          >
            <h2>FR215F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--excavator-model catalog-card--fr260f">
            <h2>FR260F</h2>
          </button>

          <button
            className="catalog-card catalog-card--model catalog-card--excavator-model catalog-card--fr315f"
            onClick={() => goToPage("fr315f")}
          >
            <h2>FR315F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--excavator-model catalog-card--fr335f">
            <h2>FR335F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--excavator-model catalog-card--fr375f">
            <h2>FR375F</h2>
          </button>

        </div>

      </div>
    );
  }

  if (page === "loaders") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--loaders">

        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.loadersTitle}</h1>

        <div className="catalog-grid">

          <button className="catalog-card catalog-card--model catalog-card--fl955f">
            <h2>FL955F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fl955k">
            <h2>FL955K</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fl980k">
            <h2>FL980K-HST</h2>
          </button>

        </div>

        <BackArrowButton onClick={() => goToPage("catalog")} />

      </div>
    );
  }

  if (page === "backhoes") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--backhoes">

        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.backhoesTitle}</h1>

        <div className="catalog-grid">

          <button className="catalog-card catalog-card--model catalog-card--fb878h">
            <h2>FB878H</h2>
          </button>

        </div>

        <BackArrowButton onClick={() => goToPage("catalog")} />

      </div>
    );
  }

  if (page === "wheeledExcavators") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--wheeled-excavators">

        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.wheeledExcavatorsTitle}</h1>

        <div className="catalog-grid">

          <button className="catalog-card catalog-card--model catalog-card--fw60f">
            <h2>FW60F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fw160f">
            <h2>FW160F</h2>
          </button>

          <button
            className="catalog-card catalog-card--model catalog-card--fw215f"
            onClick={() => goToPage("fw215f")}
          >
            <h2>FW215F</h2>
          </button>

        </div>

        <BackArrowButton onClick={() => goToPage("catalog")} />

      </div>
    );
  }

  if (page === "mining") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--mining">

        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.miningTitle}</h1>

        <div className="catalog-grid">

          <button className="catalog-card catalog-card--model catalog-card--fr560f">
            <h2>FR560F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fr700f">
            <h2>FR700F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fr800f">
            <h2>FR800F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fr1000f">
            <h2>FR1000F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fr1350f">
            <h2>FR1350F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fr1500f">
            <h2>FR1500F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--fr2000f">
            <h2>FR2000F</h2>
          </button>

        </div>

        <BackArrowButton onClick={() => goToPage("catalog")} />

      </div>
    );
  }

  if (page === "dumptrucks") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--dumptrucks">

        <img className="catalog-subtitleLogo" src={turkuazLogoSrc} alt="Turkuaz Machinery CA" />

        <h1>{translations.dumptrucksTitle}</h1>

        <div className="catalog-grid">

          <button className="catalog-card catalog-card--model catalog-card--dumptruck-1">
            <h2>LT 90</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--dumptruck-2">
            <h2>LT 110</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--dumptruck-3">
            <h2>LT 130</h2>
          </button>

        </div>

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