"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

const STORAGE_KEY = "altura-compare";
const MAX_COMPARE = 3;

type CompareValue = {
  compareIds: string[];
  isComparing: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isFull: boolean;
  loaded: boolean;
};

const CompareContext = createContext<CompareValue | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCompareIds(JSON.parse(stored));
    } catch {
      // localStorage unavailable or invalid data — start empty
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
    } catch {
      // localStorage unavailable — comparison list just won't persist
    }
  }, [compareIds, loaded]);

  const isComparing = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds]
  );

  const toggleCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        isComparing,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        isFull: compareIds.length >= MAX_COMPARE,
        loaded,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used inside CompareProvider");
  }
  return context;
}
