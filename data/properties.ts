export type Property = {
  id: string;
  title: string;
  titleEs: string;
  neighborhood:
    | "Palermo"
    | "Recoleta"
    | "Belgrano"
    | "Puerto Madero"
    | "Villa Crespo"
    | "San Telmo"
    | "Caballito"
    | "Núñez";
  type: "Apartamento" | "PH" | "Casa" | "Loft";
  operation: "buy" | "rent";
  priceUSD: number;
  bedrooms: number;
  bathrooms: number;
  areaM2: number;
  image: string;
  descriptionEs: string;
  descriptionEn: string;
  amenities: string[];
  address: string;
  agentName: string;
  agentWhatsapp: string;
};

export const properties: Property[] = [
  {
    id: "1",
    title: "Sunny 2-Room in Palermo Soho",
    titleEs: "Luminoso 2 Ambientes en Palermo Soho",
    neighborhood: "Palermo",
    type: "Apartamento",
    operation: "buy",
    priceUSD: 185000,
    bedrooms: 1,
    bathrooms: 1,
    areaM2: 52,
    image: "https://images.pexels.com/photos/19916702/pexels-photo-19916702.jpeg?auto=compress&cs=tinysrgb&w=1200",
    descriptionEs:
      "Luminoso departamento a metros de Plaza Serrano, piso alto, balcón al frente y cocina integrada.",
    descriptionEn:
      "Bright apartment steps from Plaza Serrano with a high floor, front balcony, and open kitchen.",
    amenities: ["Balcón", "Piso alto", "Cocina integrada", "Apto profesional"],
    address: "Gurruchaga 1800, Palermo",
    agentName: "Martina Ibarra",
    agentWhatsapp: "5491122334455",
  },
  {
    id: "2",
    title: "Classic Pre-War Apartment near Recoleta Cemetery",
    titleEs: "Departamento Clásico cerca del Cementerio de Recoleta",
    neighborhood: "Recoleta",
    type: "Apartamento",
    operation: "buy",
    priceUSD: 340000,
    bedrooms: 3,
    bathrooms: 2,
    areaM2: 140,
    image: "https://images.unsplash.com/photo-1757970326337-95d7cca56fa1",
    descriptionEs:
      "Semipiso de estilo francés, techos altos, detalles de época y dependencia de servicio.",
    descriptionEn:
      "French-style half-floor unit with high ceilings, period details, and a maid's room.",
    amenities: ["Techos altos", "Balcón corrido", "Baulera", "Cochera opcional"],
    address: "Vicente López 1900, Recoleta",
    agentName: "Julián Souza",
    agentWhatsapp: "5491133445566",
  },
  {
    id: "3",
    title: "River-View Loft in Puerto Madero",
    titleEs: "Loft con Vista al Río en Puerto Madero",
    neighborhood: "Puerto Madero",
    type: "Loft",
    operation: "rent",
    priceUSD: 2200,
    bedrooms: 2,
    bathrooms: 2,
    areaM2: 95,
    image: "https://images.pexels.com/photos/19399818/pexels-photo-19399818.jpeg?auto=compress&cs=tinysrgb&w=1200",
    descriptionEs:
      "Loft de diseño en torre con amenities, vista al río y cochera incluida en el alquiler.",
    descriptionEn:
      "Designer loft in a full-amenity tower with river views; parking included in the rent.",
    amenities: ["Piscina", "Gimnasio", "Seguridad 24hs", "Cochera"],
    address: "Juana Manso 800, Puerto Madero",
    agentName: "Camila Duarte",
    agentWhatsapp: "5491144556677",
  },
  {
    id: "4",
    title: "Family House with Garden in Belgrano R",
    titleEs: "Casa Familiar con Jardín en Belgrano R",
    neighborhood: "Belgrano",
    type: "Casa",
    operation: "buy",
    priceUSD: 520000,
    bedrooms: 4,
    bathrooms: 3,
    areaM2: 220,
    image: "https://images.unsplash.com/photo-1768093668245-a8d2c29110e2?auto=format&fit=crop&w=1200&q=85",
    descriptionEs:
      "Casa en dos plantas con jardín y parrilla, en una de las calles más tranquilas de Belgrano R.",
    descriptionEn:
      "Two-story house with a garden and grill area on one of Belgrano R's quietest streets.",
    amenities: ["Jardín", "Parrilla", "Garage doble", "Placard empotrado"],
    address: "Echeverría 2200, Belgrano",
    agentName: "Martina Ibarra",
    agentWhatsapp: "5491122334455",
  },
  {
    id: "5",
    title: "Renovated PH in Villa Crespo",
    titleEs: "PH Reciclado en Villa Crespo",
    neighborhood: "Villa Crespo",
    type: "PH",
    operation: "buy",
    priceUSD: 165000,
    bedrooms: 2,
    bathrooms: 1,
    areaM2: 68,
    image: "https://images.unsplash.com/photo-1764526624453-db32c24eca55",
    descriptionEs:
      "PH totalmente reciclado a nuevo, patio propio y muy buena luz natural todo el día.",
    descriptionEn:
      "Fully renovated PH with a private patio and excellent natural light all day.",
    amenities: ["Patio propio", "A reciclado", "Lavadero"],
    address: "Thames 700, Villa Crespo",
    agentName: "Nicolás Ferro",
    agentWhatsapp: "5491155667788",
  },
  {
    id: "6",
    title: "Restored PH near Plaza Dorrego",
    titleEs: "PH Restaurado cerca de Plaza Dorrego",
    neighborhood: "San Telmo",
    type: "PH",
    operation: "rent",
    priceUSD: 900,
    bedrooms: 1,
    bathrooms: 1,
    areaM2: 55,
    image: "https://images.pexels.com/photos/19808209/pexels-photo-19808209.jpeg?auto=compress&cs=tinysrgb&w=1200",
    descriptionEs:
      "PH de estilo clásico a pasos de Plaza Dorrego, ideal para quien busca vivir en el corazón histórico.",
    descriptionEn:
      "Classic-style PH steps from Plaza Dorrego, ideal for living in the historic heart of the city.",
    amenities: ["Patio interno", "Pisos originales", "Amoblado opcional"],
    address: "Defensa 1100, San Telmo",
    agentName: "Camila Duarte",
    agentWhatsapp: "5491144556677",
  },
  {
    id: "7",
    title: "Bright Apartment near Parque Rivadavia",
    titleEs: "Departamento Luminoso cerca del Parque Rivadavia",
    neighborhood: "Caballito",
    type: "Apartamento",
    operation: "buy",
    priceUSD: 128000,
    bedrooms: 2,
    bathrooms: 1,
    areaM2: 60,
    image: "https://loremflickr.com/640/480/bedroom,interior?lock=207",
    descriptionEs:
      "Departamento a dos cuadras del parque, muy luminoso, con expensas bajas y buen estado general.",
    descriptionEn:
      "Very bright apartment two blocks from the park, low building fees and in good condition.",
    amenities: ["Balcón", "Expensas bajas", "Baulera"],
    address: "Rosario 500, Caballito",
    agentName: "Nicolás Ferro",
    agentWhatsapp: "5491155667788",
  },
  {
    id: "8",
    title: "Modern Apartment with Amenities in Núñez",
    titleEs: "Departamento Moderno con Amenities en Núñez",
    neighborhood: "Núñez",
    type: "Apartamento",
    operation: "rent",
    priceUSD: 1400,
    bedrooms: 2,
    bathrooms: 2,
    areaM2: 75,
    image: "https://loremflickr.com/640/480/apartment-building,exterior?lock=208",
    descriptionEs:
      "Torre moderna con SUM, piscina y seguridad 24hs, a metros de Av. Libertador.",
    descriptionEn:
      "Modern tower with a shared lounge, pool, and 24-hour security, near Av. Libertador.",
    amenities: ["Piscina", "SUM", "Seguridad 24hs", "Cochera"],
    address: "Av. del Libertador 6200, Núñez",
    agentName: "Julián Souza",
    agentWhatsapp: "5491133445566",
  },
  {
    id: "9",
    title: "Premium 2-Bedroom in Palermo Hollywood",
    titleEs: "2 Dormitorios Premium en Palermo Hollywood",
    neighborhood: "Palermo",
    type: "Apartamento",
    operation: "buy",
    priceUSD: 265000,
    bedrooms: 2,
    bathrooms: 2,
    areaM2: 88,
    image: "https://loremflickr.com/640/480/living-room,modern-interior?lock=209",
    descriptionEs:
      "Departamento a estrenar en edificio boutique, terminaciones de primera y balcón terraza.",
    descriptionEn:
      "Brand-new apartment in a boutique building with high-end finishes and a terrace balcony.",
    amenities: ["A estrenar", "Terraza", "Amenities", "Cochera"],
    address: "Honduras 4700, Palermo",
    agentName: "Martina Ibarra",
    agentWhatsapp: "5491122334455",
  },
  {
    id: "10",
    title: "Studio Near Avenida Alvear",
    titleEs: "Monoambiente cerca de Avenida Alvear",
    neighborhood: "Recoleta",
    type: "Apartamento",
    operation: "rent",
    priceUSD: 650,
    bedrooms: 1,
    bathrooms: 1,
    areaM2: 35,
    image: "https://loremflickr.com/640/480/studio-apartment,interior?lock=210",
    descriptionEs:
      "Monoambiente prolijo, ideal para estudiante o profesional, a pasos de Av. Alvear.",
    descriptionEn:
      "Tidy studio apartment, ideal for a student or professional, steps from Av. Alvear.",
    amenities: ["Amoblado", "Apto profesional"],
    address: "Ayacucho 1700, Recoleta",
    agentName: "Nicolás Ferro",
    agentWhatsapp: "5491155667788",
  },
  {
    id: "11",
    title: "High-Floor Apartment with Tower Views",
    titleEs: "Departamento en Piso Alto con Vistas a la Torre",
    neighborhood: "Puerto Madero",
    type: "Apartamento",
    operation: "buy",
    priceUSD: 610000,
    bedrooms: 3,
    bathrooms: 3,
    areaM2: 150,
    image: "https://loremflickr.com/640/480/skyscraper,tower-exterior?lock=211",
    descriptionEs:
      "Piso alto con vistas panorámicas, tres suites y amenities de categoría en torre premium.",
    descriptionEn:
      "High floor with panoramic views, three en-suite bedrooms, and top-tier amenities.",
    amenities: ["Piscina climatizada", "Spa", "Cochera doble", "Seguridad 24hs"],
    address: "Olga Cossettini 700, Puerto Madero",
    agentName: "Camila Duarte",
    agentWhatsapp: "5491144556677",
  },
  {
    id: "12",
    title: "PH with Private Patio in Belgrano C",
    titleEs: "PH con Patio Privado en Belgrano C",
    neighborhood: "Belgrano",
    type: "PH",
    operation: "rent",
    priceUSD: 1100,
    bedrooms: 3,
    bathrooms: 2,
    areaM2: 120,
    image: "https://loremflickr.com/640/480/patio,house-exterior?lock=212",
    descriptionEs:
      "PH de dos plantas con patio y parrilla propia, a metros de la estación Belgrano C.",
    descriptionEn:
      "Two-story PH with a private patio and grill, steps from the Belgrano C train station.",
    amenities: ["Patio propio", "Parrilla", "Dos plantas"],
    address: "Zapiola 2300, Belgrano",
    agentName: "Julián Souza",
    agentWhatsapp: "5491133445566",
  },
];