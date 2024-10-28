/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#020617",
      middle: "#3b82f6",
      secondary: "#dc2626",
      neutral: "#f5f5f5",
      white: "#ffffff",
      black: "#000000",
      green: "#008000"
    },
    extend: {
      backgroundImage: {
        "three-color-gradient": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      },
      keyframes: {
        cycle: {
          "0%": { left: "10%" },
          "100%": { left: "90%" },
        },
      },
      animation: {
        cycle: "cycle 15s linear infinite",
      },
      dropShadow: {
        glow: '0 0 15px rgba(171, 17, 17, 0.6)',  
        'md-glow': '0 0 25px rgba(171, 17, 17, 0.4)',
      },
    },
  },
  plugins: [],
};
