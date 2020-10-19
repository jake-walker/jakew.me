module.exports = {
  purge: false,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" }
      },
      colors: {
        primary: "#7F00FF",
        secondary: "#E100FF",
        purple: "#7F00FF",
        pink: "#E100FF"
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
    require("@tailwindcss/typography")
  ],
}
