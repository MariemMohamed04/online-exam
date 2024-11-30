/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js", // Add Flowbite React components
    "./node_modules/flowbite/**/*.js", 
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'light-blue': '#4461F2',
        customPink: '#FF04FC',
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
} satisfies Config;
