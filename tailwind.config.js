/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#13a4ec",
                "background-light": "#f6f7f8",
                "background-dark": "#101c22",
            },
            fontFamily: {
                display: ["Spline Sans", "Noto Sans", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "3rem",
                full: "9999px",
            },
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
};