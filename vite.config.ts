import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import yaml from "@rollup/plugin-yaml";
// import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  test: {
    // ...
  },
  plugins: [
    sveltekit(),
    yaml(),
    // commonjs({
    //   dynamicRequireTargets: [
    //     // include using a glob pattern (either a string or an array of strings)
    //     // 'node_modules/pg/*',
    //     'node_modules/sequelize*',
    //     'node_modules/pg*',
    //     // 'node_modules/pg/lib/*.js',
    //     // 'node_modules/pg/lib/crypto/*.js',
    //     // 'node_modules/pg/lib/native/*.js',

    //     // exclude files that are known to not be required dynamically, this allows for better optimizations
    //     '!node_modules/logform/index.js',
    //     '!node_modules/logform/format.js',
    //     '!node_modules/logform/levels.js',
    //     '!node_modules/logform/browser.js'
    //   ]
    // }),
  ],
});
