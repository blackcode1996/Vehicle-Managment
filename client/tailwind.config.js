/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors:{
      transparent: "transparent",
      current: "currentColor",
      primary: "#020617", 
      secondary: "#dc2626", 
      neutral: "#f5f5f5", 
      white: "#ffffff", 
      black: "#000000", 
    },
    extend: {
      keyframes: {
        cycle: {
          "0%": { left: "10%" },
          "100%": { left: "90%" },
        },
      },
      animation: {
        cycle: "cycle 15s linear infinite",
      },
    },
  },
  plugins: [],
};
