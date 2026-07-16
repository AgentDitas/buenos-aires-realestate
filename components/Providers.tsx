"use client";

import { ReactNode } from "react";
import { AppSettingsProvider } from "@/contexts/AppSettingsContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <AppSettingsProvider>{children}</AppSettingsProvider>;
}
