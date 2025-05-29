/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // todo, fix my colour scheme.
        primary: "#4B3F72",
        secondary: "#E6E6FA",
        accent: "#FFC857",
        muted: "#F4F4F4",
        dark: "#0a0a0a",
        light: "#ededed",
        border: "#D1D5DB",
        link: "",
      },
    },
  },
  plugins: [],
};
