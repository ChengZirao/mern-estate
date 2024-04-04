import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Each time when request routes start with '/api',
      // add "http://localhost:3333" at the beginning
      "/api": {
        target: "http://localhost:3333",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
