import { useState } from "react";
import "./MachineViewer.css";
import FR315F from "../FR315F/FR315F";
import FR215F from "../FR215F/FR215F.tsx";
import FW215F from "../FW215F/FW215F";
import Catalog from "./Catalog";
import { useTranslations } from "../../i18n";
export default function MachineViewer() {

  const [page, setPage] = useState("catalog");
  const translations = useTranslations();

  if (page === "fr315f") {
    return (
      <FR315F
        onBack={() => setPage("excavators")}
      />
    );
  }

  if (page === "fr215f") {
    return (
      <FR215F
        onBack={() => setPage("excavators")}
      />
    );
  }

  if (page === "fw215f") {
    return (
      <FW215F
        onBack={() => setPage("wheeledExcavators")}
      />
    );
  }

  if (page === "excavators") {
    return (
      <div className="catalog-page catalog-page--models catalog-page--excavators">

        <p className="catalog-subtitle">
          Turkuaz Machinery CA
        </p>

        <h1>{translations.excavatorsTitle}</h1>

        <p className="catalog-text">
          {translations.chooseModel}
        </p>

        <div className="catalog-grid">

          <button
            className="catalog-card catalog-card--model catalog-card--excavator-model catalog-card--fr215f"
            onClick={() => setPage("fr215f")}
          >
            <h2>FR215F</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--excavator-model catalog-card--fr260f">
            <h2>FR260F</h2>
          </button>

          <button
            className="catalog-card catalog-card--model catalog-card--excavator-model catalog-card--fr315f"
            onClick={() => setPage("fr315f")}
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

        <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
          <button
            className="back-btn"
            onClick={() => setPage("catalog")}
          >
            {translations.backToCatalog}
          </button>
        </div>

      </div>
    );
  }

  if (page === "loaders") {
    return (
      <div className="catalog-page catalog-page--models">

        <p className="catalog-subtitle">
          Turkuaz Machinery CA
        </p>

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

        <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
          <button
            className="back-btn"
            onClick={() => setPage("catalog")}
          >
            {translations.backToCatalog}
          </button>
        </div>

      </div>
    );
  }

  if (page === "backhoes") {
    return (
      <div className="catalog-page catalog-page--models">

        <p className="catalog-subtitle">
          Turkuaz Machinery CA
        </p>

        <h1>{translations.backhoesTitle}</h1>

        <div className="catalog-grid">

          <button className="catalog-card catalog-card--model catalog-card--fb878h">
            <h2>FB878H</h2>
          </button>

        </div>

        <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
          <button
            className="back-btn"
            onClick={() => setPage("catalog")}
          >
            {translations.backToCatalog}
          </button>
        </div>

      </div>
    );
  }

  if (page === "wheeledExcavators") {
    return (
      <div className="catalog-page catalog-page--models">

        <p className="catalog-subtitle">
          Turkuaz Machinery CA
        </p>

        <h1>{translations.wheeledExcavatorsTitle}</h1>

        <div className="catalog-grid">

          <button className="catalog-card catalog-card--model catalog-card--fw160f">
            <h2>FW160F</h2>
          </button>

          <button
            className="catalog-card catalog-card--model catalog-card--fw215f"
            onClick={() => setPage("fw215f")}
          >
            <h2>FW215F</h2>
          </button>

        </div>

        <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
          <button
            className="back-btn"
            onClick={() => setPage("catalog")}
          >
            {translations.backToCatalog}
          </button>
        </div>

      </div>
    );
  }

  if (page === "mining") {
    return (
      <div className="catalog-page catalog-page--models">

        <p className="catalog-subtitle">
          Turkuaz Machinery CA
        </p>

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

        <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
          <button
            className="back-btn"
            onClick={() => setPage("catalog")}
          >
            {translations.backToCatalog}
          </button>
        </div>

      </div>
    );
  }

  if (page === "dumptrucks") {
    return (
      <div className="catalog-page catalog-page--models">

        <p className="catalog-subtitle">
          Turkuaz Machinery CA
        </p>

        <h1>{translations.dumptrucksTitle}</h1>

        <div className="catalog-grid">

          <button className="catalog-card catalog-card--model catalog-card--dumptruck-1">
            <h2>FT 60</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--dumptruck-2">
            <h2>FT 90</h2>
          </button>

          <button className="catalog-card catalog-card--model catalog-card--dumptruck-3">
            <h2>FT 130</h2>
          </button>

        </div>

        <div style={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
          <button
            className="back-btn"
            onClick={() => setPage("catalog")}
          >
            {translations.backToCatalog}
          </button>
        </div>

      </div>
    );
  }
  
  return (
  <Catalog
    onExcavators={() => setPage("excavators")}
    onLoaders={() => setPage("loaders")}
    onDumptrucks={() => setPage("dumptrucks")}
    onMining={() => setPage("mining")}
    onBackhoes={() => setPage("backhoes")}
    onWheeledExcavators={() => setPage("wheeledExcavators")}
  />
);
}