module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
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
