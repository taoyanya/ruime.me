import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
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
    remarkPlugins: [remarkToc],
    shikiConfig: {
      theme: "material-theme-lighter",
      wrap: true,
    },
  },
  redirects: {
    "/": "/summary",
  },
});
