import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
          "custom-x": "80.5px",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        stats: {
          text: {
            textColor: "#2E2E30",
          },
          products: {
            primary: "#7A1E22",
            bg: "#F8E4E4",
          },
          orders: {
            primary: "#0063D0",
            bg: "#0063D00D",
          },
          categories: {
            primary: "#C83A4A",
            bg: "#FFE9EC",
          },
          revenue: {
            primary: "#12B76A",
            bg: "#ECFDF5",
          },
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        brand: {
          maroon: "#7A1E22",
          "maroon-dark": "#5A1418",
          "maroon-soft": "#F8E4E4",
          rose: "#C83A4A",
          "rose-soft": "#FFE9EC",
          accent: "#F6C7B8",
          cream: "#FFF7F2",
        },
        "custom-rose": {
          "25": "#FFF7F2",
          "50": "#FFE9EC",
          "60": "#5A1418",
          "70": "#7A1E221A",
          "100": "#F8E4E4",
          "200": "#F6C7B8",
          "300": "#EDA79A",
          "400": "#DD7A72",
          "500": "#C83A4A",
          "600": "#A92B35",
          "700": "#8E252B",
          "800": "#5A1418",
          "900": "#7A1E22",
        },
        "custom-purple": {
          "50": "#FFF7F2",
          "100": "#FFE9EC",
          "200": "#F8E4E4",
          "300": "#F6C7B8",
          "400": "#EDA79A",
          "500": "#DD7A72",
          "600": "#C83A4A",
          "700": "#A92B35",
          "800": "#5A1418",
          "900": "#7A1E22",
        },
        "blue-gray": {
          "50": "#F7F7F8",
          "60": "#D9D9D9",
          "100": "#EEEEF0",
          "200": "#DADADD",
          "300": "#BDBDC2",
          "400": "#99999F",
          "500": "#757575",
          "600": "#5F5F63",
          "700": "#4B4B4F",
          "800": "#3A3A3D",
          "900": "#2E2E30",
        },
        "custom-black": "#2E2E30",
        "custom-red-2": "#D50000",
        "custom-white": "#fbfbfd",
        "custom-blue": "#0063D0",
        "custom-gray": {
          "50": "#F5F5F5",
          "100": "#EBEBEB",
          "200": "#D6D6D6",
          "300": "#C2C2C2",
          "400": "#ADADAD",
          "500": "#999999",
          "600": "#858585",
          "700": "#707070",
          "800": "#5C5C5C",
          "900": "#474747",
        },
        "custom-red": {
          "50": "#EE1014",
          "60": "#F93F43",
          "70": "#CD3336",
          "80": "#C01518",
          "90": "#FDE9E9",
        },
        "mint-green": {
          "50": "#EBFBF6",
          "60": "#28A25F",
          "70": "#E2FFEF",
          "100": "#D7F7ED",
          "200": "#C4F3E3",
          "300": "#B0EFDA",
          "400": "#9CEBD1",
          "500": "#88E8C8",
          "600": "#74E4BF",
          "700": "#61E0B5",
          "800": "#4DDCAC",
          "900": "#39D8A3",
        },
        "emerald-leaf": {
          "50": "#ECFDF5",
          "100": "#D1FADF",
          "200": "#A6F4C5",
          "300": "#6CE9A6",
          "400": "#32D583",
          "500": "#12B76A",
          "600": "#039855",
          "700": "#027A48",
          "800": "#05603A",
          "900": "#054F31",
        },
        tableHeader: "#F5F5F5",

        flamingo: "#C83A4A",
        "rate-color": "#FBA707",
      },

      backgroundColor: {
        "main-color": "#FFF7F2",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "base-10": "10px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
