/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bitbit: ["DNFBitBit", "sans-serif"],
        "nanum-light": ["NanumGothic-Light", "sans-serif"],
        nanum: ["NanumGothic-Regular", "sans-serif"],
        "nanum-bold": ["NanumGothic-Bold", "sans-serif"],
        "nanum-extrabold": ["NanumGothic-ExtraBold", "sans-serif"],
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
