/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightBlue: "hsla(309, 37%, 56%, 1.00)",
        darkBlue: "hsla(282, 75%, 70%, 1.00)",
        lightGreen: "hsla(271, 56%, 42%, 1.00)",
        light: "#FAEDEB",
        raspberry: "#B24069",
        purple: "#522999",
        navy: "#24114B",
        dark: "#180018"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      spacing: {
        180: "32rem",
      },
    },
  },
  plugins: [],
};
