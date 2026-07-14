import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true,
    watch: {
      ignored: [
        "**/public/WhatsApp Image *.jpg",
        "**/public/WhatsApp Image *.jpeg",
      ],
    },
  },
});