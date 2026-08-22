/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F5F3",
        surface: "#FFFFFF",
        ink: "#14161A",
        muted: "#6B6F76",
        line: "#E2E4E8",
        accent: "#2E5EFF",
        accentDim: "rgba(46,94,255,0.08)",
        accentDim2: "rgba(46,94,255,0.16)",
      },
      fontFamily: {
        disp: ['"Space Grotesk"', "sans-serif"],
        body: ['"IBM Plex Sans"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      maxWidth: {
        wrap: "1160px",
      },
    },
  },
  plugins: [],
};
