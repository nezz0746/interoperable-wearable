module.exports = {
  content: [
    "./app/**/*.{html,js,ts,tsx}",
    "./pages/**/*.{html,js,ts,tsx}",
    "./components/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["Play", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
