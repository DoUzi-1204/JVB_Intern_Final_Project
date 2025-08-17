/** @type {import('tailwindcss').Config} */
import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "390px", // breakpoint cho điện thoại siêu nhỏ
        xs: "480px", // breakpoint cho điện thoại nhỏ
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
