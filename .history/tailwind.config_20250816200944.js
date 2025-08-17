/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // IntelliSense
  theme: {
    extend: {
      screens: {
        xs: "480px", // breakpoint mới cho điện thoại nhỏ
      },
    },
  },
  plugins: [],
};
