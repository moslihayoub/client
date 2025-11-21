/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '320px',   // phones
      md: '900px',   // tablets
      lg: '1100px',  // laptops
      xl: '1280px',  // desktops
      '2xl': '1536px', // large screens
    },
    extend: {
      fontFamily: {
        youngserif: ['Young_Serif', 'serif'],
        zalando: ['Zalando_Sans_Expanded', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        bricolagegrotesque: ['BricolageGrotesque', 'sans-serif'],
        vendsans: ['VendSans', 'sans-serif'],
      },
      backgroundImage: {
        "nexastay-gradient":
          "radial-gradient(94.74% 94.74% at 50% 7.34%, #2DD4BF 0%, #0EA5E9 55%, #D946EF 100%)",
        "nexastay-border":
          "radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)",
      },
      boxShadow: {
        "nexastay-default": "0px 4px 46px -1px rgba(0, 0, 0, 0.15)",
        "nexastay-hover": "0 5px 34px 0 rgba(0, 255, 195, 0.36)",
        "card-hover": "0 5px 34px 0 rgba(0, 255, 195, 0.36)",
      },
      textColor: {
        "nexastay-gradient":
          "transparent", // ensures text itself is transparent for bg-clip to show
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-medium": "float-medium 4s ease-in-out infinite",
        "float-fast": "float-fast 2.5s ease-in-out infinite",
        "drift": "drift 8s ease-in-out infinite",
        "gradient-blur": "gradient-blur 15s ease-in-out infinite",
      },
      keyframes: {
        'gradient-blur': {
          '0%, 100%': { filter: 'blur(60px)', transform: 'scale(1)' },
          '50%': { filter: 'blur(80px)', transform: 'scale(1.05)' },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-15px) translateX(5px)" },
          "50%": { transform: "translateY(-20px) translateX(0)" },
          "75%": { transform: "translateY(-10px) translateX(-5px)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-12px) translateX(8px)" },
          "66%": { transform: "translateY(-8px) translateX(-8px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(10px)" },
        },
        "drift": {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(20px) translateY(-10px)" },
          "50%": { transform: "translateX(0) translateY(-20px)" },
          "75%": { transform: "translateX(-20px) translateY(-10px)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-nexastay-gradient": {
          background:
            "radial-gradient(94.74% 94.74% at 50% 7.34%, #2DD4BF 0%, #0EA5E9 55%, #D946EF 100%)",
          "-webkit-background-clip": "text",
          "background-clip": "text",
          color: "transparent",
        },
        ".card-gradient-border": {
          position: "relative",
          "border-radius": "22px",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-2px",
            padding: "4px",
            background: "radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)",
            "border-radius": "inherit",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            "-webkit-mask": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            "mask-composite": "exclude",
            "-webkit-mask-composite": "xor",
            opacity: "0",
            transition: "opacity 0.2s ease-in-out",
            "z-index": "1",
          },
          "&:hover::before": {
            opacity: "35",
          },
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
}