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

  backToSearch: { EN: "Back to Search", ES: "Volver a la Búsqueda" },
  description: { EN: "Description", ES: "Descripción" },
  amenities: { EN: "Amenities", ES: "Amenities" },
  listingAgent: { EN: "Listing Agent", ES: "Agente Inmobiliario" },
  contactViaWhatsapp: { EN: "Contact via WhatsApp", ES: "Contactar por WhatsApp" },
  opensPrefilledMessage: {
    EN: "Opens a pre-filled message on WhatsApp",
    ES: "Abre un mensaje pre-escrito en WhatsApp",
  },
  saveToFavorites: { EN: "Save to Favorites", ES: "Guardar en Favoritos" },
  savedToFavorites: { EN: "Saved to Favorites", ES: "Guardado en Favoritos" },
  similarProperties: { EN: "Similar Properties", ES: "Propiedades Similares" },
  propertyNotFound: { EN: "Property not found", ES: "Propiedad no encontrada" },
  listingRemovedOrIncorrect: {
    EN: "This listing may have been removed or the link is incorrect.",
    ES: "Esta propiedad puede haber sido eliminada o el enlace es incorrecto.",
  },

  buyingAsForeigner: { EN: "🌎 Buying as a Foreigner", ES: "🌎 Comprando como Extranjero" },
  canForeignersBuy: { EN: "Can Foreigners Buy?", ES: "¿Pueden Comprar los Extranjeros?" },
  yesAnswer: { EN: "✅ Yes", ES: "✅ Sí" },
  estimatedTimeToClose: { EN: "Estimated Time to Close", ES: "Tiempo Estimado de Cierre" },
  days3060: { EN: "30–60 days", ES: "30–60 días" },
  purchaseMethod: { EN: "Purchase Method", ES: "Método de Compra" },
  remotePurchaseAvailable: { EN: "Remote purchase available", ES: "Compra remota disponible" },
  languageSupport: { EN: "Language Support", ES: "Soporte de Idioma" },
  englishSpeakingAgentAvailable: {
    EN: "English-speaking agent available",
    ES: "Agente de habla inglesa disponible",
  },
  legalAssistance: { EN: "Legal Assistance", ES: "Asistencia Legal" },
  availableTrustedPartners: {
    EN: "Available through trusted partners",
    ES: "Disponible a través de socios de confianza",
  },
  financing: { EN: "Financing", ES: "Financiamiento" },
  financingDetail: {
    EN: "Cash purchase recommended — mortgage availability varies",
    ES: "Se recomienda compra en efectivo — la disponibilidad de hipoteca varía",
  },
  estimatedTotalCost: { EN: "💰 Estimated Total Purchase Cost", ES: "💰 Costo Total Estimado de Compra" },
  propertyPrice: { EN: "Property Price", ES: "Precio de la Propiedad" },
  estimatedClosingCosts: { EN: "Estimated Closing Costs", ES: "Costos de Cierre Estimados" },
  estimatedCashRequired: { EN: "Estimated Cash Required", ES: "Efectivo Estimado Requerido" },
  monthlyHoa: { EN: "Monthly HOA (expensas)", ES: "Expensas Mensuales" },
  estimatedPropertyTaxes: { EN: "Estimated Property Taxes", ES: "Impuestos Estimados" },
  estimatesIllustrationOnly: {
    EN: "Estimates for illustration only — actual costs vary by transaction.",
    ES: "Estimaciones solo a modo ilustrativo — los costos reales varían según la transacción.",
  },
  buyingProcess: { EN: "📄 Buying Process", ES: "📄 Proceso de Compra" },
  stepInquiry: { EN: "Inquiry", ES: "Consulta" },
  stepVideoTour: { EN: "Property Video Tour", ES: "Video Tour de la Propiedad" },
  stepOffer: { EN: "Offer", ES: "Oferta" },
  stepAttorneyReview: { EN: "Attorney Review", ES: "Revisión Legal" },
  stepPurchaseAgreement: { EN: "Purchase Agreement", ES: "Boleto de Compraventa" },
  stepClosing: { EN: "Closing", ES: "Cierre" },
  stepKeys: { EN: "Receive Keys", ES: "Entrega de Llaves" },
  neighborhoodSnapshot: { EN: "📍 Neighborhood Snapshot", ES: "📍 Resumen del Barrio" },
  walkability: { EN: "Walkability", ES: "Caminabilidad" },
  nightlife: { EN: "Nightlife", ES: "Vida Nocturna" },
  families: { EN: "Families", ES: "Familias" },
  parks: { EN: "Parks", ES: "Parques" },
  luxury: { EN: "Luxury", ES: "Lujo" },
  digitalNomads: { EN: "Digital Nomads", ES: "Nómadas Digitales" },
  avgPricePerM2: { EN: "Average Price/m²", ES: "Precio Promedio/m²" },
  popularRestaurants: { EN: "Popular Restaurants", ES: "Restaurantes Populares" },
  subwayAccess: { EN: "Subway Access", ES: "Acceso al Subte" },
  illustrativeEstimatesOnly: {
    EN: "Illustrative estimates for prototype purposes only.",
    ES: "Estimaciones ilustrativas solo para fines del prototipo.",
  },
  needHelp: { EN: "📞 Need Help?", ES: "📞 ¿Necesitás Ayuda?" },
  bookConsultation: {
    EN: "Book a free consultation — we'll connect you with a realtor, attorney, accountant, and property manager.",
    ES: "Reservá una consulta gratuita — te conectamos con un agente inmobiliario, abogado, contador y administrador de propiedades.",
  },
  bookFreeConsultation: { EN: "Book a Free Consultation", ES: "Reservar Consulta Gratuita" },

  explore: { EN: "Explore", ES: "Explorar" },
  contact: { EN: "Contact", ES: "Contacto" },
  legal: { EN: "Legal", ES: "Legal" },
  privacyPolicy: { EN: "Privacy Policy", ES: "Política de Privacidad" },
  terms: { EN: "Terms", ES: "Términos" },
  footerTagline: {
    EN: "Buenos Aires real estate for local and international buyers.",
    ES: "Bienes raíces en Buenos Aires para compradores locales e internacionales.",
  },
  savedOnThisDevice: { EN: "Saved on this device only.", ES: "Guardado solo en este dispositivo." },
  noFavoritesYet: {
    EN: "You haven't saved any properties yet.",
    ES: "Todavía no guardaste ninguna propiedad.",
  },
  browseListings: { EN: "Browse Listings", ES: "Ver Propiedades" },

  compareProperties: { EN: "Compare Properties", ES: "Comparar Propiedades" },
  upToThree: { EN: "Up to 3 properties, side by side.", ES: "Hasta 3 propiedades, lado a lado." },
  clearAll: { EN: "Clear all", ES: "Limpiar todo" },
  noPropertiesSelected: {
    EN: 'No properties selected yet. Tap "+ Compare" on any listing to add it here.',
    ES: 'Todavía no seleccionaste propiedades. Tocá "+ Comparar" en cualquier propiedad para agregarla acá.',
  },
  remove: { EN: "Remove", ES: "Quitar" },
  size: { EN: "Size", ES: "Tamaño" },
  estCashNeeded: { EN: "Est. Cash Needed", ES: "Efectivo Estimado" },
  estClosingCosts: { EN: "Est. Closing Costs", ES: "Costos de Cierre Estimados" },
  monthlyHoaShort: { EN: "Monthly HOA", ES: "Expensas Mensuales" },
  investmentScore: { EN: "Investment Score", ES: "Puntaje de Inversión" },
  foreignBuyerFriendly: { EN: "Foreign Buyer Friendly", ES: "Apto Comprador Extranjero" },
  remoteClosing: { EN: "Remote Closing", ES: "Cierre Remoto" },
  yes: { EN: "Yes", ES: "Sí" },
  available: { EN: "Available", ES: "Disponible" },
  compareEstimatesNote: {
    EN: "Estimates for illustration only — actual costs and scores vary.",
    ES: "Estimaciones solo a modo ilustrativo — los costos y puntajes reales varían.",
  },

  pageNotFound: { EN: "Page not found", ES: "Página no encontrada" },
  pageNotFoundDetail: {
    EN: "The page you're looking for doesn't exist or may have moved.",
    ES: "La página que buscás no existe o puede haber cambiado de lugar.",
  },
  backToHome: { EN: "Back to Home", ES: "Volver al Inicio" },

  // Altura Score
  alturaScore: { EN: "Altura Score", ES: "Puntaje Altura" },
  alturaScoreIntro: {
    EN: "A trust and suitability score unique to Altura, combining four factors below.",
    ES: "Un puntaje de confianza y aptitud exclusivo de Altura, que combina los cuatro factores de abajo.",
  },
  investmentPotential: { EN: "Investment Potential", ES: "Potencial de Inversión" },
  foreignBuyerFriendliness: { EN: "Foreign Buyer Friendliness", ES: "Aptitud para Compradores Extranjeros" },
  valueForMoney: { EN: "Value for Money", ES: "Relación Precio-Calidad" },
  investmentExplanation: {
    EN: "Based on this property's price per m² compared to the average for its neighborhood.",
    ES: "Basado en el precio por m² de esta propiedad comparado con el promedio del barrio.",
  },
  foreignBuyerExplanation: {
    EN: "Reflects whether remote purchase, English-speaking support, and legal assistance are available for this listing.",
    ES: "Refleja si hay compra remota, soporte en inglés y asistencia legal disponibles para esta propiedad.",
  },
  walkabilityExplanation: {
    EN: "Based on the walkability rating of this property's neighborhood.",
    ES: "Basado en el puntaje de caminabilidad del barrio de esta propiedad.",
  },
  valueExplanation: {
    EN: "Based on this property's price per m² compared to similar listings citywide.",
    ES: "Basado en el precio por m² de esta propiedad comparado con propiedades similares en toda la ciudad.",
  },
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