import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import fs from "node:fs";

const roots = ["index.html", "kalkulator.html", "audyt.html"];
const blogPages = fs
  .readdirSync(path.resolve(__dirname, "blog"))
  .filter((f) => f.endsWith(".html"))
  .map((f) => `blog/${f}`);

const input: Record<string, string> = {};
for (const p of [...roots, ...blogPages]) {
  const key = p.replace(/\//g, "_").replace(/\.html$/, "");
  input[key] = path.resolve(__dirname, p);
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { rollupOptions: { input } },
});
