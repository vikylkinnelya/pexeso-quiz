/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
    theme: {
        extend: {
            // vlastní utilitky pro pexeso flip
            rotate: {
                "y-180": "rotateY(180deg)",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
                nabla: ["var(--font-nabla)"],
                roboto: ["var(--font-roboto)"],
            },
        },
    },
    plugins: [],
};
