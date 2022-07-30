import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import fs from "fs-extra";
import path from "path";

function copyFile() {
  return {
    enforce: "post",
    async writeBundle() {
      await fs.copy(
        path.resolve(__dirname, "src/static"),
        path.join(
          __dirname,
          "unpackage/dist",
          process.env.NODE_ENV === "production" ? "build" : "dev",
          process.env.UNI_PLATFORM,
          "static"
        )
      );
    },
  };
}
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  base: "./",
  server: {
    port: 5173,
  },
  build: {
    sourcemap: true,
    // 压缩代码
    minify: "esbuild",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [uni(), copyFile()],
});
