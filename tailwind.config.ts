import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8CC7A",
          dark: "#9A7A2F",
          glow: "#FFD700",
        },
        navy: {
          DEFAULT: "#0A0E1A",
          deep: "#060912",
          mid: "#0D1526",
          light: "#131C35",
        },
        purple: {
          deep: "#1A0A2E",
          mid: "#2D1B4E",
          light: "#4A2C7A",
          glow: "#8B5CF6",
        },
        glass: {
          DEFAULT: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.1)",
          hover: "rgba(255,255,255,0.08)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-cinematic":
          "linear-gradient(135deg, #060912 0%, #0A0E1A 30%, #1A0A2E 70%, #060912 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #C9A84C 0%, #E8CC7A 50%, #9A7A2F 100%)",
        "gradient-glow":
          "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        "spin-slow": "spin 20s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "particle": "particle 15s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(1deg)" },
          "66%": { transform: "translateY(-10px) rotate(-1deg)" },
        },
        pulseGold: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(201,168,76,0.3)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(201,168,76,0.6)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        particle: {
          "0%": { transform: "translateY(100vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100px) translateX(100px)", opacity: "0" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,168,76,0.2), 0 0 60px rgba(139,92,246,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(201,168,76,0.4), 0 0 100px rgba(139,92,246,0.2)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "gold": "0 0 30px rgba(201,168,76,0.3), 0 0 60px rgba(201,168,76,0.1)",
        "gold-strong": "0 0 50px rgba(201,168,76,0.5), 0 0 100px rgba(201,168,76,0.2)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "cinematic": "0 25px 80px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
