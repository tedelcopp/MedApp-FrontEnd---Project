/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  
    "./components/**/*.{js,ts,jsx,tsx}", 
    "./styles/globals.css", // Agrega esto si sigue sin funcionar
  ],
  theme: {
    extend: {
      colors: {
        backgroundLight: "var(--background-light)",
        backgroundDark: "var(--background-dark)",
      },
    },
  },
  plugins: [],
};
