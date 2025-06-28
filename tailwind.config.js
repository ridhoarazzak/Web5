// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Anda bisa menambahkan atau mengganti tema Tailwind di sini
      // Contoh: Menambahkan warna khusus
      colors: {
        'green-coffee-dark': '#3e2723', // Cokelat gelap untuk biji kopi
        'green-coffee-light': '#a7d9b9', // Hijau muda untuk daun
        'green-coffee-accent': '#f4a261', // Oranye/krem untuk aksen
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
