import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const baseConfig = {
    plugins: [react()],
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
