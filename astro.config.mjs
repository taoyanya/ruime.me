import { defineConfig } from "astro/config";
import remarkToc from "remark-toc";
import Unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
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
