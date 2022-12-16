import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const baseConfig = {
    plugins: [react(), svgr()],
  };
  if (command === "serve") {
    return baseConfig;
  } else {
    return {
      ...baseConfig,
      base: "./",
    };
  }
});
