module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
        dark: { raw: "(prefers-color-scheme: dark)" }
      },
      colors: {
        primary: "#7F00FF",
        secondary: "#E100FF",
        black: "#151515",
        white: "#eee",
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
      },
      dark: {
        css: {
          color: theme('colors.gray.300'),
          a: {
            color: theme("colors.secondary"),
            "&:hover": {
              color: theme("colors.secondary")
            }
          },
          h1: {
            color: theme('colors.gray.300'),
          },
          h2: {
              color: theme('colors.gray.300'),
          },
          h3: {
              color: theme('colors.gray.300'),
          },
          h4: {
              color: theme('colors.gray.300'),
          },
          h5: {
              color: theme('colors.gray.300'),
          },
          h6: {
              color: theme('colors.gray.300'),
          },
          strong: {
              color: theme('colors.gray.300'),
          },
          code: {
              color: theme('colors.gray.300'),
          },
          figcaption: {
              color: theme('colors.gray.500'),
          }
        }
      }
    })
  },
  plugins: [
    require("@tailwindcss/typography"),
    function({ addBase, config }) {
      addBase({
        body: {
          color: config("theme.colors.black"),
          backgroundColor: config("theme.colors.white")
        },
        "@screen dark": {
          body: {
            color: config("theme.colors.white"),
            backgroundColor: config("theme.colors.black")
          }
        }
      })
    }
  ],
}
