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
      enginePower: "160 кВт / 215 л.с.",
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
      operatingWeight: "32 000 кг",
      engine: "WEICHAI WP12G460E310",
      enginePower: "338 кВт / 460 л.с.",
      bucketVolume: "32 м³",
      maxDiggingDepth: "60 000 кг",
    },
  },
  {
    id: "LT110",
    route: "lt110",
    category: "dumptrucks",
    cardClassName: "catalog-card--dumptruck-2",
    specs: {
      operatingWeight: "36 500 кг",
      engine: "WEICHAI WP14TG765E304",
      enginePower: "563 кВт / 765 л.с.",
      bucketVolume: "38 м³",
      maxDiggingDepth: "75 000 кг",
    },
  },
  {
    id: "LT130",
    route: "lt130",
    category: "dumptrucks",
    cardClassName: "catalog-card--dumptruck-3",
    specs: {
      operatingWeight: "46 350 кг",
      engine: "WEICHAI WP15HG770E304",
      enginePower: "566 кВт / 770 л.с.",
      bucketVolume: "50 м³",
      maxDiggingDepth: "90 000 кг",
    },
  },
  {
    id: "FW60F",
    route: "fw60f",
    category: "wheeledExcavators",
    cardClassName: "catalog-card--fw60f",
    specs: {
      operatingWeight: "5 900 кг",
      engine: "Yanmar 4TNV94L",
      enginePower: "44,4 кВт / 60 л.с.",
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
      operatingWeight: "15 160 кг",
      engine: "Weichai WP4.6N",
      enginePower: "129 кВт / 173 л.с.",
      bucketVolume: "0,6 м³",
      maxDiggingDepth: "5 101 мм",
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
      bucketVolume: "1,1 м³",
      maxDiggingDepth: "6 630 мм",
    },
  },
  {
    id: "FB878H",
    route: "fb878h",
    category: "backhoes",
    cardClassName: "catalog-card--fb878h",
    specs: {
      operatingWeight: "9 530 кг",
      engine: "Weichai WP4G",
      enginePower: "74 кВт / 100 л.с.",
      bucketVolume: "0,2 м³",
      maxDiggingDepth: "5 600 мм",
    },
  },
  {
    id: "FR560F",
    route: "fr560f",
    category: "mining",
    cardClassName: "catalog-card--fr560f",
    specs: {
      operatingWeight: "53 400 кг",
      engine: "Weichai WP14T",
      enginePower: "316 кВт / 430 л.с.",
      bucketVolume: "3,2 м³",
      maxDiggingDepth: "7 240 мм",
    },
  },
  {
    id: "FR700F",
    route: "fr700f",
    category: "mining",
    cardClassName: "catalog-card--fr700f",
    specs: {
      operatingWeight: "68 500 кг",
      engine: "Weichai WP15H",
      enginePower: "566 кВт / 770 л.с.",
      bucketVolume: "4,4 м³",
      maxDiggingDepth: "7 170 мм",
    },
  },
  {
    id: "FR800F",
    route: "fr800f",
    category: "mining",
    cardClassName: "catalog-card--fr800f",
    specs: {
      operatingWeight: "80 200 кг",
      engine: "Weichai WP17T",
      enginePower: "273 кВт / 366 л.с.",
      bucketVolume: "4,7 м³",
      maxDiggingDepth: "7 410 мм",
    },
  },
  {
    id: "FR1000F",
    route: "fr1000f",
    category: "mining",
    cardClassName: "catalog-card--fr1000f",
    specs: {
      operatingWeight: "100 435 кг",
      engine: "Weichai 6M33",
      enginePower: "571 кВт / 776 л.с.",
      bucketVolume: "7 м³",
      maxDiggingDepth: "7 180 мм",
    },
  },
  {
    id: "FR1350F",
    route: "fr1350f",
    category: "mining",
    cardClassName: "catalog-card--fr1350f",
    specs: {
      operatingWeight: "125 000 кг",
      engine: "Weichai 8M33",
      enginePower: "680 кВт / 926 л.с.",
      bucketVolume: "7,5 м³",
      maxDiggingDepth: "7 838 мм",
    },
  },
  {
    id: "FR1500F",
    route: "fr1500f",
    category: "mining",
    cardClassName: "catalog-card--fr1500f",
    specs: {
      operatingWeight: "145 000 кг",
      engine: "Weichai 8M33",
      enginePower: "680 кВт / 925 л.с.",
      bucketVolume: "8,5 м³",
      maxDiggingDepth: "7 838 мм",
    },
  },
  {
    id: "FR2000F",
    route: "fr2000f",
    category: "mining",
    cardClassName: "catalog-card--fr2000f",
    specs: {
      operatingWeight: "198 000 кг",
      engine: "Weichai 12M33",
      enginePower: "900 кВт / 1 224 л.с.",
      bucketVolume: "12,0 м³",
      maxDiggingDepth: "8 120 мм",
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
