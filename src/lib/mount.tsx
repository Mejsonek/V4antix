import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { SitePrefsProvider } from "@/lib/site-prefs";
import "../styles.css";

export function mount(node: ReactNode) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <SitePrefsProvider>{node}</SitePrefsProvider>
    </StrictMode>,
  );
}
