import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const baseConfig = {
    plugins: [preact(), svgr()],
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
