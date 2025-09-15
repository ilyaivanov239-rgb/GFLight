import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0f0f10", // почти чёрный
          700: "#1b1b1e",
          500: "#2a2a2f",
          100: "#f2f2f4",
        },
        accent: {
          500: "#ffffff",
        },
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0,0,0,.18)",
        card: "0 8px 30px rgba(0,0,0,.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
