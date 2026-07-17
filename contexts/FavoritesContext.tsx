"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

const STORAGE_KEY = "altura-favorites";

type FavoritesValue = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  loaded: boolean;
};

const FavoritesContext = createContext<FavoritesValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      // localStorage unavailable or invalid data — start empty
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage unavailable — favorites just won't persist
    }
  }, [favorites, loaded]);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, loaded }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}
