import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

const config = defineConfig({
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/jinq.js",
      format: "esm",
    },
  ],
  plugins: [typescript()],
});

export default config;
