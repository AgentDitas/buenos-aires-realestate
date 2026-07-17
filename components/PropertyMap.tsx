"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Property } from "@/data/properties";
import { useAppSettings } from "@/contexts/AppSettingsContext";

// Leaflet's default marker icons don't load correctly with bundlers
// like Next.js unless manually reconfigured — this fixes that.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function PropertyMap({ properties }: { properties: Property[] }) {
  const { formatAmount, language } = useAppSettings();
  const [mounted, setMounted] = useState(false);

  // Leaflet needs direct access to the browser window, which isn't
  // available during Next.js's initial server render.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <MapContainer
      center={[-34.6, -58.42]}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((p) => (
        <Marker key={p.id} position={[p.lat, p.lng]} icon={markerIcon}>
          <Popup>
            <div style={{ minWidth: "160px" }}>
              <p style={{ fontWeight: 600, marginBottom: "4px" }}>
                {language === "ES" ? p.titleEs : p.title}
              </p>
              <p style={{ color: "#4A524C", marginBottom: "6px" }}>
                {formatAmount(p.priceUSD, p.operation === "rent")}
              </p>
              <Link href={`/property/${p.id}`} style={{ color: "#2F4A3D" }}>
                {language === "ES" ? "Ver propiedad" : "View property"}
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}