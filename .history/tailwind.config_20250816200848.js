/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], //  giúp IntelliSense quét được
  theme: {
    extend: {},
  },
  plugins: [],
};
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        xs: "480px", // breakpoint mới cho điện thoại nhỏ
      },
    },
  },
};
