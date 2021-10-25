module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        120: "60rem",
      },
      colors: {
        "soft-black": "#151515",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
