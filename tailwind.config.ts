import { error } from "console";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { DEFAULT_CIPHERS } from "tls";

export default {
  content: ["./src/html/**/*.twig", "./src/ts/**/*.ts", "./src/js/**/*.js"],
  theme: {
    screens: {
      xl: {
        max: "1439.98px",
      },
      mxl: {
        min: "1440px",
      },
      lg: {
        max: "991.98px",
      },
      mlg: {
        min: "992px",
      },
      sm: {
        max: "575.98px",
      },
      msm: {
        min: "576px",
      },
    },
    spacing: {
      px: "0.1rem",
      0: "0",
      0.5: "0.2rem",
      1: "0.4rem",
      1.5: "0.6rem",
      2: "0.8rem",
      2.5: "1rem",
      3: "1.2rem",
      3.5: "1.4rem",
      4: "1.6rem",
      4.5: "1.8rem",
      5: "2rem",
      6: "2.4rem",
      7: "2.8rem",
      8: "3.2rem",
      9: "3.6rem",
      10: "4rem",
      11: "4.4rem",
      12: "4.8rem",
      13: "5.2rem",
      14: "5.6rem",
      15: "6rem",
      16: "6.4rem",
      17: "6.8rem",
      18: "7.2rem",
      20: "8rem",
      24: "9.6rem",
      28: "11.2rem",
      32: "12.8rem",
      36: "14.4rem",
      40: "16rem",
      44: "17.6rem",
      48: "19.2rem",
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      black: {
        DEFAULT: "#1B1E1F",
      },
      blue: {
        DEFAULT: "#0297d4",
        200: "#6AD3FF",
        500: "#00A0E2",
        900: "#077aa9",
      },
      yellow: {
        DEFAULT: "#ffcd00",
        200: "#FFF5CC",
      },
      error: {
        DEFAULT: "#b80101",
      },
      white: {
        DEFAULT: "#FFFFFF",
      },
      grey: {
        DEFAULT: "#F5F5F5",
        900: "#F5F5F5",
        800: "#F2F4F8",
        500: "#777777",
        400: "#B3C8D1",
        300: "#586C75",
        200: "#4A585E",
        100: "#131515",
      },
      brown: {
        DEFAULT: "#271818",
      },
      light: {
        DEFAULT: "#F4F0EF",
      },
      red: {
        DEFAULT: "#E3341D",
      },
    },
    fontFamily: {
      serif: "SF-Pro-Text, serif",
    },
    fontSize: {},
    boxShadow: ({ theme }) => ({
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-${key}`,
          `inset 0 0 0 ${value}`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-bottom-${key}`,
          `inset 0 -${value} 0 0`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-top-${key}`,
          `inset 0 ${value} 0 0`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-left-${key}`,
          `inset ${value} 0 0 0`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-right-${key}`,
          `inset -${value} 0 0 0`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-${key}-out`,
          `0 0 0 ${value}`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-bottom-${key}-out`,
          `0 -${value} 0 0`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-top-${key}-out`,
          `0 ${value} 0 0`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-left-${key}-out`,
          `${value} 0 0 0`,
        ]),
      ),
      ...Object.fromEntries(
        Object.entries(theme("spacing")).map(([key, value]: any) => [
          `border-right-${key}-out`,
          `-${value} 0 0 0`,
        ]),
      ),
    }),
    extend: {
      transitionDuration: {
        DEFAULT: "300ms",
      },
      backgroundImage: {},
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-h-sb-l": {
          "font-weight": "600",
          "font-size": "5rem",
          "line-height": "1.2",
        },
        ".text-h-sb-m": {
          "font-weight": "600",
          "font-size": "4rem",
          "line-height": "1.2",

          "@screen sm": {
            "font-size": "3.6rem",
          },
        },
        ".text-h-b-m": {
          "font-weight": "700",
          "font-size": "3.2rem",
          "line-height": "1.2",
        },
        ".text-r-xl": {
          "font-weight": "400",
          "font-size": "3.2rem",
          "line-height": "1.2",
        },
        ".text-r-l": {
          "font-weight": "400",
          "font-size": "2.6rem",
          "line-height": "1.2",
        },
        ".text-sb-l": {
          "font-weight": "600",
          "font-size": "2.6rem",
          "line-height": "1.2",
        },
        ".text-b-l": {
          "font-weight": "700",
          "font-size": "2.6rem",
          "line-height": "1.2",
        },
        ".text-sb-c": {
          "font-weight": "600",
          "font-size": "2.2rem",
          "line-height": "1",
        },
        ".text-r-c": {
          "font-weight": "400",
          "font-size": "2.2rem",
          "line-height": "1.2",
        },
        ".text-r-m": {
          "font-weight": "400",
          "font-size": "2rem",
          "line-height": "1.2",

          "@screen sm": {
            "font-size": "2.8rem",
          },
        },
        ".text-r-m-u": {
          "font-weight": "400",
          "font-size": "2rem",
          "line-height": "1.2",
          "text-transform": "uppercase",

          "@screen sm": {
            "font-size": "2.8rem",
          },
        },
        ".text-sb-m": {
          "font-weight": "600",
          "font-size": "2rem",
          "line-height": "1.2",

          "@screen sm": {
            "font-size": "2.8rem",
          },
        },
        ".text-sb-m-u": {
          "font-weight": "600",
          "font-size": "2rem",
          "line-height": "1.2",
          "text-transform": "uppercase",

          "@screen sm": {
            "font-size": "2.8rem",
          },
        },
        ".text-b-m": {
          "font-weight": "700",
          "font-size": "2rem",
          "line-height": "1.2",

          "@screen sm": {
            "font-size": "2.8rem",
          },
        },

        ".text-r-md": {
          "font-weight": "400",
          "font-size": "1.8rem",
          "line-height": "1.2",

          "@screen sm": {
            "font-size": "2.8rem",
          },
        },
        ".text-r-sm": {
          "font-weight": "400",
          "font-size": "1.6rem",
          "line-height": "1.2",

          "@screen sm": {
            "font-size": "2rem",
          },
        },
        ".text-r-xsm": {
          "font-weight": "400",
          "font-size": "1.2rem",
          "line-height": "1.2",

          "@screen sm": {
            "font-size": "2rem",
          },
        },
      });
    }),
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "calc(172rem + 3.2rem * 2)",
          margin: "0 auto",
          "padding-left": "3.2rem",
          "padding-right": "3.2rem",
        },
      });
      addComponents({
        ".inner": {
          maxWidth: "140rem",
          margin: "0 auto",
        },
      });
    }),
  ],
} as Config;
