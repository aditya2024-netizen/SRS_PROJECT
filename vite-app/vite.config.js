import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/SRS_PROJECT/vite-app/",
  plugins: [react()],
});
