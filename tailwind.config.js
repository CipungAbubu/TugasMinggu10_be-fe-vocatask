import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Pastikan file JSX atau TSX tercakup
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Memastikan daisyui sudah terpasang
};
