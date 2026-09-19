import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f7ff",
          100: "#e4edff",
          500: "#3559e0",
          600: "#2448d6",
          700: "#1d3bb1",
        },
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
