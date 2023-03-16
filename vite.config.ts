import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  test: {
    // ...
  },
  plugins: [sveltekit(), yaml()],
});
