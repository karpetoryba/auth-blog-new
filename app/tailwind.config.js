/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 20s linear infinite", // Длительность увеличена до 20 секунд
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" }, // Начальная позиция за пределами справа
          "100%": { transform: "translateX(-100%)" }, // Конечная позиция за пределами слева
        },
      },
    },
  },
  plugins: [],
};
