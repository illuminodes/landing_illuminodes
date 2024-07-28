const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/frontend/templates/*.html", "./src/frontend/templates/**/*.html", "./src/backend/consts.rs",  ],
    plugins: [require("@tailwindcss/forms")],
    theme: {
        fontFamily: {
            'nostr-regular': ["SF-Pro", "sans-serif"],
            'nostr-bold': ["SF-Pro-Bold", "sans-serif"],
        },
        colors: {
            'nostr-dark': '#4B1862',
            'nostr-light': '#A334D5',
            'nostr-black': '#000000',
            'nostr-white': '#FFFFFF',
            'transparent': colors.transparent,
        },
        backgroundImage: {
            'img-logo': "url('../assets/backgrounds/background-principal.png')",
            'img-fuzzy': "url('./public/assets/backgrounds/purple-background.png')",
        },
    },
}

