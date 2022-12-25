import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const baseConfig = {
    plugins: [preact(), svgr()],
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },
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
