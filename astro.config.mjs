import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import Unocss from "unocss/astro";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    Unocss({
      injectReset: true,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
    shikiConfig: {
      theme: "material-theme-lighter",
      wrap: true,
    },
  },
});
