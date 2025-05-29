/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all JSX and TSX files inside src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // Custom primary color
        secondary: "#6b7280", // Custom secondary color
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        tab: "648px", // Custom breakpoint for tablets
        desktop: "740px", // Custom breakpoint for desktops
      },
    },
  },
  plugins: [
    import("@tailwindcss/forms").then((module) => module.default),
    import("@tailwindcss/typography").then((module) => module.default),
  ],
};
