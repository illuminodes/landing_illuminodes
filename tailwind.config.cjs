const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/frontend/templates/*.html"],
    plugins: [require("@tailwindcss/forms")],
    theme: {
        fontFamily: {
            'modern': ["Righteous", "sans-serif"],
            'josefin': ["Josefin Sans", "sans-serif"],
        },
    },
}

