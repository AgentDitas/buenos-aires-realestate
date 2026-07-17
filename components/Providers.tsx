"use client";

import { ReactNode } from "react";
import { AppSettingsProvider } from "@/contexts/AppSettingsContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CompareProvider } from "@/contexts/CompareContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppSettingsProvider>
      <FavoritesProvider>
        <CompareProvider>{children}</CompareProvider>
      </FavoritesProvider>
    </AppSettingsProvider>
  );
}