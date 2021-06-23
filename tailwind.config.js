module.exports = {
  mode: "jit",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        discord_blue: "#295DE7",
        discord_blurple: "#7289da",
        discord_purple: "#5865f2",
        discord_green: "#3ba55c",
      },
      height: {
        "83vh": "83vh",
      },
      width: {
        "600px": "600px",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
