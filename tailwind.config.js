const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: false,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    fontSize: {
      xs: "0.85rem",
      sm: "0.975rem",
      base: "1.1rem",
      lg: "1.225rem",
      xl: "1.35rem",
      "2xl": "1.6rem",
      "3xl": "1.975rem",
      "4xl": "2.35rem",
      "5xl": "3.1rem",
      "6xl": "4.1rem"
    },
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" }
      },
      colors: {
        primary: "#7F00FF",
        secondary: "#E100FF",
        purple: "#7F00FF",
        pink: "#E100FF"
      },
      fontFamily: {
        sans: [
          "Work Sans", ...defaultTheme.fontFamily.sans
        ],
        serif: [
          "Space Mono", ...defaultTheme.fontFamily.serif
        ]
      }
    },
    container: {
      padding: {
        default: "2rem",
        lg: "4rem"
      }
    },
    typography: (theme) => ({
      default: {
        css: {
          color: theme("colors.gray.800"),
          a: {
            color: theme("colors.primary"),
            "text-decoration": "none",
            "&:hover": {
              color: theme("colors.primary"),
              "text-decoration": "underline"
            }
          },
          code: {
            "&::before": {
              content: "none !important"
            },
            "&::after": {
              content: "none !important"
            }
          }
        }
      }
    })
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function({ addBase, config }) {
      addBase({
        "h1": { fontSize: config("theme.fontSize.4xl"), fontFamily: config("theme.fontFamily.serif").join(", ") },
        "h2": { fontSize: config("theme.fontSize.3xl"), fontFamily: config("theme.fontFamily.serif").join(", ") },
        "h3": { fontSize: config("theme.fontSize.2xl"), fontFamily: config("theme.fontFamily.serif").join(", ") },
        "h4": { fontSize: config("theme.fontSize.xl"), fontFamily: config("theme.fontFamily.serif").join(", ") },
        "h5": { fontSize: config("theme.fontSize.lg"), fontFamily: config("theme.fontFamily.serif").join(", ") },
        "h6": { fontWeight: config("theme.fontWeight.bold"), fontSize: config("theme.fontSize.base"), fontFamily: config("theme.fontFamily.serif").join(", ") },
        "body": { fontSize: config("theme.fontSize.base") }
      })
    })
  ],
}
