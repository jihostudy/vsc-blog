import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./mdx-components.tsx",
  ],
  safelist: [
    "pl-0",
    "pl-1",
    "pl-2",
    "pl-3",
    "pl-4",
    "pl-5",
    "pl-6",
    "pl-7",
    "pl-8",
    "pl-9",
    "pl-10",
    "pl-12",
    "pl-16",
    "pl-20",
    "w-full",
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "my-4",
    "px-10",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        navbar: "#333333",
        postlist: "#1E201F",
        postlistHover: "#2A2D2E",
        postlistFocused: "#04395E",
        post: "#252526",
        tabCloseHover: "#898A8B",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwind-scrollbar-hide")],
};
export default config;
