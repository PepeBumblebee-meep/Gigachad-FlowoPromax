import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*.{js,ts,jsx,tsx,mdx}" // <--- Dòng này là "Bùa hộ mệnh", nó quét mọi ngóc ngách
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
