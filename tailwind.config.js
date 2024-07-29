/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {colors: {
        white: "#fff",
        darkslategray: "#353331",
        black: "#000",
        gainsboro: "#d9d9d9",
        firstcolor: "#024959",
        secondcolor: "#D9851E",
        thirdcolor: "#F27830",
        fourthcolor: "#F20505",
        fifthcolor: "#037893",
        sixthcolor: "#B6A89D",
        customTeal: '#4FD1C5',
        customTealDark: '#00FFCB',

      },
      fontSize: {
      xl: "30px",
      mini: "15px",
      inherit: "inherit",
      base:"20px",
      xxl: "100px",
    },
    fontFamily: {
        fontawesome: "FontAwesome",
        "fira-sans": "'Fira Sans'",
      },
      height: {
        '300': '300px', 
      }
    },
    boxShadow: {
        'custom': '12px 12px 24px rgba(79,209,197,.64)',
        'glow': '0 0 60px rgba(0,255,203,.64)',
      },
      animation: {
        'ring': 'ring 1.5s infinite',
      },
      keyframes: {
        ring: {
          '0%': { width: '30px', height: '30px', opacity: '1' },
          '100%': { width: '300px', height: '300px', opacity: '0' },
        },
      },
  },
  plugins: [],
}

