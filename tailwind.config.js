/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        diablo: {
          dark: '#0a0a0a',
          panel: '#1a1a1a',
          gold: '#c4a46a',
          red: '#8b0000',
          blue: '#1e3a8a',
          rare: '#ffff00',
          unique: '#908858',
          magic: '#4850b8',
          set: '#00ff00',
          corrupted: '#ff0000',
        }
      },
    },
  },
  plugins: [],
}
