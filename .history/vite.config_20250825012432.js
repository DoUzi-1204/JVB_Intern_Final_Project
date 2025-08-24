import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // When deploying to GitHub Pages under a repo (not user page),
  // set base to the repository name so assets and router paths resolve.
  base: "/JVB_Intern_Final_Project/",
  plugins: [react()],
  server: {
    // proxy /api requests to the local Express proxy server
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
