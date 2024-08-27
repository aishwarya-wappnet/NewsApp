/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(237, 58, 86)",
        "primary-light": "#e26575",
        "primary-lighter": "#ec919c",
        secondary: "#f9fafb",
      },
      fontFamily: {
        sans: ['"Roboto"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
