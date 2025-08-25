export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        "> 0.5%",
        "last 2 versions",
        "Firefox ESR",
        "not dead",
        "not IE 11"
      ]
    },
  },
}
