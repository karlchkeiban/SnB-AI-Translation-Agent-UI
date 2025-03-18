/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        surface: 'var(--color-surface)',
        background: 'var(--color-background)',
        divider: 'var(--color-divider)'
      },
      boxShadow: {
        elevation1: 'var(--elevation-1)',
        elevation2: 'var(--elevation-2)'
      }
    },
  },
  plugins: [],
}
