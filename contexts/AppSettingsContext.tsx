"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "EN" | "ES";
export type Currency = "USD" | "ARS";

const ARS_PER_USD = 1200;

const TRANSLATIONS = {
  buy: { EN: "Buy", ES: "Comprar" },
  rent: { EN: "Rent", ES: "Alquilar" },
  neighborhoods: { EN: "Neighborhoods", ES: "Barrios" },
  favorites: { EN: "Favorites", ES: "Favoritos" },
  compare: { EN: "Compare", ES: "Comparar" },

  heroHeadline: {
    EN: "Buenos Aires real estate, made clear for buyers anywhere.",
    ES: "Bienes raíces en Buenos Aires, claros para compradores de cualquier lugar.",
  },
  heroSubtext: {
    EN: "Browse apartments, PHs, and houses across the city's best neighborhoods — priced in USD, built for local and international buyers alike.",
    ES: "Explorá departamentos, PHs y casas en los mejores barrios de la ciudad — con precios en USD, pensado para compradores locales e internacionales.",
  },
  browseProperties: { EN: "Browse Properties", ES: "Ver Propiedades" },
  selectNeighborhood: { EN: "Select a neighborhood", ES: "Seleccionar un barrio" },
  search: { EN: "Search", ES: "Buscar" },
  featuredListings: { EN: "Featured Listings", ES: "Propiedades Destacadas" },
  propertiesTotal: { EN: "properties total", ES: "propiedades en total" },
  exploreByNeighborhood: { EN: "Explore by Neighborhood", ES: "Explorar por Barrio" },
  listing: { EN: "listing", ES: "propiedad" },
  listings: { EN: "listings", ES: "propiedades" },

  forSale: { EN: "For Sale", ES: "En Venta" },
  forRent: { EN: "For Rent", ES: "En Alquiler" },
  bed: { EN: "bed", ES: "hab" },
  bath: { EN: "bath", ES: "baño" },
  view: { EN: "View", ES: "Ver" },
  comparing: { EN: "Comparing", ES: "Comparando" },

  // Search page
  searchListings: { EN: "Search Listings", ES: "Buscar Propiedades" },
  buyOrRent: { EN: "Buy or Rent", ES: "Comprar o Alquilar" },
  all: { EN: "All", ES: "Todos" },
  price: { EN: "Price (USD)", ES: "Precio (USD)" },
  min: { EN: "Min", ES: "Mín" },
  max: { EN: "Max", ES: "Máx" },
  bedrooms: { EN: "Bedrooms", ES: "Dormitorios" },
  bathrooms: { EN: "Bathrooms", ES: "Baños" },
  any: { EN: "Any", ES: "Cualquiera" },
  propertyType: { EN: "Property Type", ES: "Tipo de Propiedad" },
  neighborhood: { EN: "Neighborhood", ES: "Barrio" },
  clearFilters: { EN: "Clear filters", ES: "Limpiar filtros" },
  propertyFound: { EN: "property found", ES: "propiedad encontrada" },
  propertiesFound: { EN: "properties found", ES: "propiedades encontradas" },
  sortPriceLowHigh: { EN: "Price: Low to High", ES: "Precio: Menor a Mayor" },
  sortPriceHighLow: { EN: "Price: High to Low", ES: "Precio: Mayor a Menor" },
  sortMostBedrooms: { EN: "Most Bedrooms", ES: "Más Dormitorios" },
  sortLargest: { EN: "Largest (m²)", ES: "Más Grande (m²)" },
  noPropertiesMatch: {
    EN: "No properties match these filters. Try widening your search.",
    ES: "Ninguna propiedad coincide con estos filtros. Probá ampliar tu búsqueda.",
  },
  interactiveMap: { EN: "Interactive map", ES: "Mapa interactivo" },
  comingSoon: { EN: "Coming soon", ES: "Próximamente" },
  filtersLabel: { EN: "Filters", ES: "Filtros" },
  showProperties: { EN: "Show", ES: "Mostrar" },

  apartamento: { EN: "Apartment", ES: "Apartamento" },
  ph: { EN: "PH", ES: "PH" },
  casa: { EN: "House", ES: "Casa" },
  loft: { EN: "Loft", ES: "Loft" },
} as const;

type TranslationKey = keyof typeof TRANSLATIONS;

type AppSettings = {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatAmount: (usdAmount: number, isRent: boolean) => string;
  t: (key: TranslationKey) => string;
};

const AppSettingsContext = createContext<AppSettings | undefined>(undefined);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");
  const [currency, setCurrency] = useState<Currency>("USD");

  function formatAmount(usdAmount: number, isRent: boolean) {
    const suffix = isRent ? (language === "ES" ? "/mes" : "/mo") : "";
    if (currency === "USD") {
      return `US$${usdAmount.toLocaleString("en-US")}${suffix}`;
    }
    const arsAmount = Math.round(usdAmount * ARS_PER_USD);
    return `AR$${arsAmount.toLocaleString("es-AR")}${suffix}`;
  }

  function t(key: TranslationKey) {
    return TRANSLATIONS[key][language];
  }

  return (
    <AppSettingsContext.Provider
      value={{ language, setLanguage, currency, setCurrency, formatAmount, t }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings must be used inside AppSettingsProvider");
  }
  return context;
}
