import { defineConfig } from "astro/config";
import Unocss from "unocss/astro";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    Unocss({
      injectReset: true,
    }),
    vue(),
  ],
  markdown: {
    shikiConfig: {
      theme: "material-theme-lighter",
      wrap: true,
    },
  },
  redirects: {
    "/": "/summary",
  },
});
