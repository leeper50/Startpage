import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // ...
  },
  plugins: [sveltekit()],
});
