import { defineConfig } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import { presetTypography } from "@unocss/preset-typography";

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography({
      cssExtend: {
        "code": {
          padding: "1px 1px 1px 1px",
          "box-sizing": "border-box"
        },
        h2: {
          margin: "0.5rem 0",
          "font-size": "1.2rem",
        },
      },
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: "Roboto",
        lato: {
          name: "Zodiak",
          italic: true,
        },
        cn: "ZCOOL XiaoWei",
        wide: "Black Ops One",
      },
    }),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        width: "1.2rem",
        height: "1.2rem",
        "vertical-align": "text-bottom",
      },
      collections: {
        iconoir: () =>
          import("@iconify-json/iconoir/icons.json").then((i) => i.default),
        ri: () => import("@iconify-json/ri/icons.json").then((i) => i.default),
      },
    }),
  ],
  shortcuts: {
    "~cp": "cursor-pointer",
    "~f-c-c": "flex justify-center items-center",
    "header-nav-item": "text-gray-500 hover:text-dark-500 transition-200 mx-2",
  },
});
