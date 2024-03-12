import formsPlugin from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   darkMode: ["class"],
   theme: {
      extend: {
         colors: {
            primary: "#019875",
            secondary: "#ecc94b",
            darkGrey: "#181B21",
            mediumGrey: "#23272F",
         },
         borderRadius: {
            'xs': '0.125rem',
            'sm': '3px',
          },
         fontFamily: {
            sans: ["Poppins", "sans-serif"],
         },
         fontSize: {
            md: "15px",
         },
      },
   },
   plugins: [formsPlugin],
};
