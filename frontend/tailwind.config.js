/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ enables dark mode manually using 'class'
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 10s ease infinite",
      },
    },
  },
  plugins: [],
}
