export type ModelCategoryPage =
  | "excavators"
  | "loaders"
  | "dumptrucks"
  | "mining"
  | "backhoes"
  | "wheeledExcavators";

export type ModelId =
  | "FR215F"
  | "FR260F"
  | "FR315F"
  | "FR335F"
  | "FR375F"
  | "FL955F"
  | "FL955K"
  | "FL980K-HST"
  | "LT90"
  | "LT110"
  | "LT130"
  | "FW60F"
  | "FW160F"
  | "FW215F"
  | "FB878H"
  | "FR560F"
  | "FR700F"
  | "FR800F"
  | "FR1000F"
  | "FR1350F"
  | "FR1500F"
  | "FR2000F";

export type ModelSpecs = {
  operatingWeight: string;
  engine: string;
  enginePower: string;
  bucketVolume: string;
  maxDiggingDepth: string;
};

export type ModelCatalogEntry = {
  id: ModelId;
  route: string;
  category: ModelCategoryPage;
  cardClassName: string;
  specs: ModelSpecs;
};

export const MODEL_CATALOG: ModelCatalogEntry[] = [
  {
    id: "FR215F",
    route: "fr215f",
    category: "excavators",
    cardClassName: "catalog-card--fr215f",
    specs: {
      operatingWeight: "21 500 кг",
      engine: "Weichai WP4.6N",
      enginePower: "129 кВт / 173 л.с.",
      bucketVolume: "1,1 м³",
      maxDiggingDepth: "6 630 мм",
    },
  },
  {
    id: "FR260F",
    route: "fr260f",
    category: "excavators",
    cardClassName: "catalog-card--fr260f",
    specs: {
      operatingWeight: "25 500 кг",
      engine: "Weichai WP7H",
      enginePower: "168 кВт / 225 л.с.",
      bucketVolume: "1,5 м³",
      maxDiggingDepth: "6 645 мм",
    },
  },
  {
    id: "FR315F",
    route: "fr315f",
    category: "excavators",
    cardClassName: "catalog-card--fr315f",
    specs: {
      operatingWeight: "31 300 кг",
      engine: "Weichai WP8H",
      enginePower: "228 кВт / 306 л.с.",
      bucketVolume: "1,7 м³",
      maxDiggingDepth: "6 806 мм",
    },
  },
  {
    id: "FR335F",
    route: "fr335f",
    category: "excavators",
    cardClassName: "catalog-card--fr335f",
    specs: {
      operatingWeight: "33 250 кг",
      engine: "Cummins AA-6HK1XQP",
      enginePower: "212 кВт / 284 л.с.",
      bucketVolume: "1,8 м³",
      maxDiggingDepth: "6 365 мм",
    },
  },
  {
    id: "FR375F",
    route: "fr375f",
    category: "excavators",
    cardClassName: "catalog-card--fr375f",
    specs: {
      operatingWeight: "37 000 кг",
      engine: "Weichai WP10.5H",
      enginePower: "273 кВт / 366 л.с.",
      bucketVolume: "2,0 м³",
      maxDiggingDepth: "6 960 мм",
    },
  },
  {
    id: "FL955F",
    route: "fl955f",
    category: "loaders",
    cardClassName: "catalog-card--fl955f",
    specs: {
      operatingWeight: "16 620 кг",
      engine: "Weichai WD10G",
      enginePower: "162 кВт / 220 л.с.",
      bucketVolume: "3,0 м³",
      maxDiggingDepth: "5 000 кг",
    },
  },
  {
    id: "FL955K",
    route: "fl955k",
    category: "loaders",
    cardClassName: "catalog-card--fl955k",
    specs: {
      operatingWeight: "17 350 кг",
      engine: "Weichai WD10G",
      enginePower: "162 кВт / 220 л.с.",
      bucketVolume: "3,0 м³",
      maxDiggingDepth: "5 200 кг",
    },
  },
  {
    id: "FL980K-HST",
    route: "fl980k-hst",
    category: "loaders",
    cardClassName: "catalog-card--fl980k",
    specs: {
      operatingWeight: "25 000 кг",
      engine: "Weichai WD10G",
      enginePower: "162 кВт / 220 л.с.",
      bucketVolume: "5,0 м³",
      maxDiggingDepth: "8 000 кг",
    },
  },
  {
    id: "LT90",
    route: "lt90",
    category: "dumptrucks",
    cardClassName: "catalog-card--dumptruck-1",
    specs: {
      operatingWeight: "31 800 кг",
      engine: "WEICHAI WP10H",
      enginePower: "273 кВт / 366 л.с.",
      bucketVolume: "N/A",
      maxDiggingDepth: "N/A",
    },
  },
  {
    id: "LT110",
    route: "lt110",
    category: "dumptrucks",
    cardClassName: "catalog-card--dumptruck-2",
    specs: {
      operatingWeight: "34 500 кг",
      engine: "WEICHAI WP13",
      enginePower: "319 кВт / 428 л.с.",
      bucketVolume: "N/A",
      maxDiggingDepth: "N/A",
    },
  },
  {
    id: "LT130",
    route: "lt130",
    category: "dumptrucks",
    cardClassName: "catalog-card--dumptruck-3",
    specs: {
      operatingWeight: "39 000 кг",
      engine: "WEICHAI WP13",
      enginePower: "350 кВт / 469 л.с.",
      bucketVolume: "N/A",
      maxDiggingDepth: "N/A",
    },
  },
  {
    id: "FW60F",
    route: "fw60f",
    category: "wheeledExcavators",
    cardClassName: "catalog-card--fw60f",
    specs: {
      operatingWeight: "6 050 кг",
      engine: "Yanmar 4TNV94L",
      enginePower: "36,2 кВт / 49 л.с.",
      bucketVolume: "0,23 м³",
      maxDiggingDepth: "3 300 мм",
    },
  },
  {
    id: "FW160F",
    route: "fw160f",
    category: "wheeledExcavators",
    cardClassName: "catalog-card--fw160f",
    specs: {
      operatingWeight: "15 800 кг",
      engine: "Weichai WP4.6N",
      enginePower: "129 кВт / 173 л.с.",
      bucketVolume: "0,6 м³",
      maxDiggingDepth: "5 800 мм",
    },
  },
  {
    id: "FW215F",
    route: "fw215f",
    category: "wheeledExcavators",
    cardClassName: "catalog-card--fw215f",
    specs: {
      operatingWeight: "21 500 кг",
      engine: "Weichai WP7HG",
      enginePower: "140 кВт / 188 л.с.",
      bucketVolume: "0,93 м³",
      maxDiggingDepth: "6 460 мм",
    },
  },
  {
    id: "FB878H",
    route: "fb878h",
    category: "backhoes",
    cardClassName: "catalog-card--fb878h",
    specs: {
      operatingWeight: "8 500 кг",
      engine: "Weichai WP4G",
      enginePower: "74 кВт / 100 л.с.",
      bucketVolume: "1,0 м³",
      maxDiggingDepth: "4 300 мм",
    },
  },
  {
    id: "FR560F",
    route: "fr560f",
    category: "mining",
    cardClassName: "catalog-card--fr560f",
    specs: {
      operatingWeight: "54 000 кг",
      engine: "Weichai WP14T",
      enginePower: "405 кВт / 543 л.с.",
      bucketVolume: "3,6 м³",
      maxDiggingDepth: "7 800 мм",
    },
  },
  {
    id: "FR700F",
    route: "fr700f",
    category: "mining",
    cardClassName: "catalog-card--fr700f",
    specs: {
      operatingWeight: "68 000 кг",
      engine: "Cummins QSM11",
      enginePower: "373 кВт / 500 л.с.",
      bucketVolume: "4,5 м³",
      maxDiggingDepth: "8 080 мм",
    },
  },
  {
    id: "FR800F",
    route: "fr800f",
    category: "mining",
    cardClassName: "catalog-card--fr800f",
    specs: {
      operatingWeight: "77 000 кг",
      engine: "Weichai WP17TG",
      enginePower: "566 кВт / 759 л.с.",
      bucketVolume: "5,2 м³",
      maxDiggingDepth: "8 200 мм",
    },
  },
  {
    id: "FR1000F",
    route: "fr1000f",
    category: "mining",
    cardClassName: "catalog-card--fr1000f",
    specs: {
      operatingWeight: "99 000 кг",
      engine: "Cummins QST30",
      enginePower: "570 кВт / 764 л.с.",
      bucketVolume: "6,5 м³",
      maxDiggingDepth: "8 400 мм",
    },
  },
  {
    id: "FR1350F",
    route: "fr1350f",
    category: "mining",
    cardClassName: "catalog-card--fr1350f",
    specs: {
      operatingWeight: "135 000 кг",
      engine: "Cummins QSK38",
      enginePower: "746 кВт / 1 000 л.с.",
      bucketVolume: "8,5 м³",
      maxDiggingDepth: "9 000 мм",
    },
  },
  {
    id: "FR1500F",
    route: "fr1500f",
    category: "mining",
    cardClassName: "catalog-card--fr1500f",
    specs: {
      operatingWeight: "150 000 кг",
      engine: "Cummins QSK38",
      enginePower: "895 кВт / 1 200 л.с.",
      bucketVolume: "10,0 м³",
      maxDiggingDepth: "9 200 мм",
    },
  },
  {
    id: "FR2000F",
    route: "fr2000f",
    category: "mining",
    cardClassName: "catalog-card--fr2000f",
    specs: {
      operatingWeight: "200 000 кг",
      engine: "Cummins QSK60",
      enginePower: "1 193 кВт / 1 600 л.с.",
      bucketVolume: "12,0 м³",
      maxDiggingDepth: "9 800 мм",
    },
  },
];

export const MODEL_BY_ROUTE = Object.fromEntries(MODEL_CATALOG.map((entry) => [entry.route, entry])) as Record<string, ModelCatalogEntry>;

export const CATEGORY_MODEL_ORDER: Record<ModelCategoryPage, ModelId[]> = {
  excavators: ["FR215F", "FR260F", "FR315F", "FR335F", "FR375F"],
  loaders: ["FL955F", "FL955K", "FL980K-HST"],
  dumptrucks: ["LT90", "LT110", "LT130"],
  wheeledExcavators: ["FW60F", "FW160F", "FW215F"],
  backhoes: ["FB878H"],
  mining: ["FR560F", "FR700F", "FR800F", "FR1000F", "FR1350F", "FR1500F", "FR2000F"],
};

export const MODEL_BY_ID = Object.fromEntries(MODEL_CATALOG.map((entry) => [entry.id, entry])) as Record<ModelId, ModelCatalogEntry>;
