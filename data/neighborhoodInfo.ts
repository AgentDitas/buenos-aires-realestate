export type NeighborhoodInfo = {
    walkability: number;
    nightlife: number;
    families: number;
    parks: number;
    luxury: number;
    digitalNomads: number;
    avgPricePerM2: number;
    popularRestaurants: string;
    subwayAccess: string;
  };
  
  // Illustrative estimates for prototype purposes — not verified real data.
  // Replace with sourced figures before showing to real users.
  export const NEIGHBORHOOD_INFO: Record<string, NeighborhoodInfo> = {
    Palermo: {
      walkability: 5,
      nightlife: 5,
      families: 3,
      parks: 4,
      luxury: 4,
      digitalNomads: 5,
      avgPricePerM2: 3200,
      popularRestaurants: "Don Julio, La Carnicería, Proper",
      subwayAccess: "Line D — Plaza Italia / Palermo",
    },
    Recoleta: {
      walkability: 5,
      nightlife: 3,
      families: 4,
      parks: 4,
      luxury: 5,
      digitalNomads: 3,
      avgPricePerM2: 3400,
      popularRestaurants: "Rodi Bar, Munich Recoleta",
      subwayAccess: "Line H — Las Heras",
    },
    Belgrano: {
      walkability: 4,
      nightlife: 2,
      families: 5,
      parks: 4,
      luxury: 4,
      digitalNomads: 3,
      avgPricePerM2: 2800,
      popularRestaurants: "Sucre, Multitud",
      subwayAccess: "Line D — Juramento",
    },
    "Puerto Madero": {
      walkability: 4,
      nightlife: 3,
      families: 3,
      parks: 3,
      luxury: 5,
      digitalNomads: 3,
      avgPricePerM2: 4200,
      popularRestaurants: "Cabaña Las Lilas, i Latina",
      subwayAccess: "Nearest: Line B (short walk)",
    },
    "Villa Crespo": {
      walkability: 4,
      nightlife: 4,
      families: 3,
      parks: 3,
      luxury: 2,
      digitalNomads: 4,
      avgPricePerM2: 2400,
      popularRestaurants: "Mishiguene, Chuí",
      subwayAccess: "Line B — Malabia / Dorrego",
    },
    "San Telmo": {
      walkability: 5,
      nightlife: 4,
      families: 2,
      parks: 2,
      luxury: 2,
      digitalNomads: 4,
      avgPricePerM2: 2100,
      popularRestaurants: "El Desnivel, Bar El Federal",
      subwayAccess: "Line C — Independencia",
    },
    Caballito: {
      walkability: 4,
      nightlife: 2,
      families: 5,
      parks: 4,
      luxury: 2,
      digitalNomads: 3,
      avgPricePerM2: 2000,
      popularRestaurants: "Neighborhood parrillas along Av. Rivadavia",
      subwayAccess: "Line A — Primera Junta",
    },
    Núñez: {
      walkability: 3,
      nightlife: 2,
      families: 4,
      parks: 4,
      luxury: 3,
      digitalNomads: 3,
      avgPricePerM2: 2600,
      popularRestaurants: "Cafés near Estadio River Plate",
      subwayAccess: "Line D — Congreso de Tucumán (nearby)",
    },
  };