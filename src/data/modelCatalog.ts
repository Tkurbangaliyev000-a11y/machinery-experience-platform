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
      operatingWeight: "21 500 kg",
      engine: "Cummins QSB6.7",
      enginePower: "124 kW / 166 HP",
      bucketVolume: "1.0 m3",
      maxDiggingDepth: "6 600 mm",
    },
  },
  {
    id: "FR260F",
    route: "fr260f",
    category: "excavators",
    cardClassName: "catalog-card--fr260f",
    specs: {
      operatingWeight: "25 500 kg",
      engine: "Cummins QSL8.9",
      enginePower: "145 kW / 197 HP",
      bucketVolume: "1.3 m3",
      maxDiggingDepth: "6 980 mm",
    },
  },
  {
    id: "FR315F",
    route: "fr315f",
    category: "excavators",
    cardClassName: "catalog-card--fr315f",
    specs: {
      operatingWeight: "31 300 kg",
      engine: "WEICHAI 8.2L",
      enginePower: "228 kW / 310 HP",
      bucketVolume: "1.7 m3",
      maxDiggingDepth: "6 806 mm",
    },
  },
  {
    id: "FR335F",
    route: "fr335f",
    category: "excavators",
    cardClassName: "catalog-card--fr335f",
    specs: {
      operatingWeight: "33 800 kg",
      engine: "Cummins QSL9",
      enginePower: "232 kW / 311 HP",
      bucketVolume: "1.8 m3",
      maxDiggingDepth: "7 380 mm",
    },
  },
  {
    id: "FR375F",
    route: "fr375f",
    category: "excavators",
    cardClassName: "catalog-card--fr375f",
    specs: {
      operatingWeight: "37 500 kg",
      engine: "Cummins L9",
      enginePower: "298 kW / 400 HP",
      bucketVolume: "2.2 m3",
      maxDiggingDepth: "7 750 mm",
    },
  },
  {
    id: "FL955F",
    route: "fl955f",
    category: "loaders",
    cardClassName: "catalog-card--fl955f",
    specs: {
      operatingWeight: "17 100 kg",
      engine: "WEICHAI WD10G220E23",
      enginePower: "162 kW / 220 HP",
      bucketVolume: "3.0 m3",
      maxDiggingDepth: "N/A",
    },
  },
  {
    id: "FL955K",
    route: "fl955k",
    category: "loaders",
    cardClassName: "catalog-card--fl955k",
    specs: {
      operatingWeight: "17 100 kg",
      engine: "WEICHAI WD10G220E23",
      enginePower: "162 kW / 220 HP",
      bucketVolume: "3.0 m3",
      maxDiggingDepth: "N/A",
    },
  },
  {
    id: "FL980K-HST",
    route: "fl980k-hst",
    category: "loaders",
    cardClassName: "catalog-card--fl980k",
    specs: {
      operatingWeight: "24 500 kg",
      engine: "WEICHAI WP10H",
      enginePower: "199 kW / 267 HP",
      bucketVolume: "4.5 m3",
      maxDiggingDepth: "N/A",
    },
  },
  {
    id: "LT90",
    route: "lt90",
    category: "dumptrucks",
    cardClassName: "catalog-card--dumptruck-1",
    specs: {
      operatingWeight: "31 800 kg",
      engine: "WEICHAI WP10H",
      enginePower: "273 kW / 366 HP",
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
      operatingWeight: "34 500 kg",
      engine: "WEICHAI WP13",
      enginePower: "319 kW / 428 HP",
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
      operatingWeight: "39 000 kg",
      engine: "WEICHAI WP13",
      enginePower: "350 kW / 469 HP",
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
      operatingWeight: "6 050 kg",
      engine: "Yanmar 4TNV94L",
      enginePower: "36.2 kW / 49 HP",
      bucketVolume: "0.23 m3",
      maxDiggingDepth: "3 300 mm",
    },
  },
  {
    id: "FW160F",
    route: "fw160f",
    category: "wheeledExcavators",
    cardClassName: "catalog-card--fw160f",
    specs: {
      operatingWeight: "15 800 kg",
      engine: "Cummins QSB4.5",
      enginePower: "129 kW / 173 HP",
      bucketVolume: "0.6 m3",
      maxDiggingDepth: "5 800 mm",
    },
  },
  {
    id: "FW215F",
    route: "fw215f",
    category: "wheeledExcavators",
    cardClassName: "catalog-card--fw215f",
    specs: {
      operatingWeight: "21 500 kg",
      engine: "Cummins QSB6.7",
      enginePower: "135 kW / 181 HP",
      bucketVolume: "0.93 m3",
      maxDiggingDepth: "6 460 mm",
    },
  },
  {
    id: "FB878H",
    route: "fb878h",
    category: "backhoes",
    cardClassName: "catalog-card--fb878h",
    specs: {
      operatingWeight: "8 500 kg",
      engine: "YUCHAI YC4A105Z-T20",
      enginePower: "75 kW / 100 HP",
      bucketVolume: "1.0 m3",
      maxDiggingDepth: "4 300 mm",
    },
  },
  {
    id: "FR560F",
    route: "fr560f",
    category: "mining",
    cardClassName: "catalog-card--fr560f",
    specs: {
      operatingWeight: "54 000 kg",
      engine: "Cummins QSM11",
      enginePower: "280 kW / 375 HP",
      bucketVolume: "3.6 m3",
      maxDiggingDepth: "7 800 mm",
    },
  },
  {
    id: "FR700F",
    route: "fr700f",
    category: "mining",
    cardClassName: "catalog-card--fr700f",
    specs: {
      operatingWeight: "68 000 kg",
      engine: "Cummins QSM11",
      enginePower: "373 kW / 500 HP",
      bucketVolume: "4.5 m3",
      maxDiggingDepth: "8 080 mm",
    },
  },
  {
    id: "FR800F",
    route: "fr800f",
    category: "mining",
    cardClassName: "catalog-card--fr800f",
    specs: {
      operatingWeight: "77 000 kg",
      engine: "Cummins QSM15",
      enginePower: "403 kW / 540 HP",
      bucketVolume: "5.2 m3",
      maxDiggingDepth: "8 200 mm",
    },
  },
  {
    id: "FR1000F",
    route: "fr1000f",
    category: "mining",
    cardClassName: "catalog-card--fr1000f",
    specs: {
      operatingWeight: "99 000 kg",
      engine: "Cummins QST30",
      enginePower: "570 kW / 764 HP",
      bucketVolume: "6.5 m3",
      maxDiggingDepth: "8 400 mm",
    },
  },
  {
    id: "FR1350F",
    route: "fr1350f",
    category: "mining",
    cardClassName: "catalog-card--fr1350f",
    specs: {
      operatingWeight: "135 000 kg",
      engine: "Cummins QSK38",
      enginePower: "746 kW / 1 000 HP",
      bucketVolume: "8.5 m3",
      maxDiggingDepth: "9 000 mm",
    },
  },
  {
    id: "FR1500F",
    route: "fr1500f",
    category: "mining",
    cardClassName: "catalog-card--fr1500f",
    specs: {
      operatingWeight: "150 000 kg",
      engine: "Cummins QSK38",
      enginePower: "895 kW / 1 200 HP",
      bucketVolume: "10.0 m3",
      maxDiggingDepth: "9 200 mm",
    },
  },
  {
    id: "FR2000F",
    route: "fr2000f",
    category: "mining",
    cardClassName: "catalog-card--fr2000f",
    specs: {
      operatingWeight: "200 000 kg",
      engine: "Cummins QSK60",
      enginePower: "1 193 kW / 1 600 HP",
      bucketVolume: "12.0 m3",
      maxDiggingDepth: "9 800 mm",
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
