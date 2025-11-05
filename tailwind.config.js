/** @type {import('tailwindcss').Config} */
module.exports = {
  // CORRECCIÓN: Quitamos 'src/' de todas las rutas
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};