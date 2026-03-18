/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {

    extend: {

      colors: {

        indiaSaffron: "#FF9933",
        indiaGreen: "#138808",
        indiaBlue: "#0A3D62"

      },

      fontFamily: {

        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ]

      },

      boxShadow: {

        card: "0 4px 12px rgba(0,0,0,0.08)",
        cardHover: "0 10px 24px rgba(0,0,0,0.12)"

      }

    }

  },

  plugins: []

}