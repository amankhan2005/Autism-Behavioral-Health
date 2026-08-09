/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: '1.25rem', screens: { '2xl': '1240px' } },
    extend: {
      colors: {
        // PRIMARY — professional, trustworthy blue (from the logo).
        brand: {
          50: '#EAF3FB', 100: '#D0E4F6', 200: '#A6CBEC', 300: '#72A9DD',
          400: '#3E86C9', 500: '#1D6FB8', 600: '#155C9E',
          700: '#124B82', 800: '#123E69', 900: '#0F3050',
        },
        // SECONDARY — natural, calming green (from the logo).
        green: {
          50: '#EAF7F0', 100: '#CFEDDD', 200: '#A4DCBE', 300: '#6FC79A',
          400: '#46B27C', 500: '#2E9E67', 600: '#237E52', 700: '#1D6543',
          800: '#1A5138', 900: '#143F2C',
        },
        // ACCENT — warm pink (from the logo). Used with restraint.
        pink: {
          50: '#FDEEF4', 100: '#FBD8E6', 200: '#F6B0CC', 300: '#EF83AC',
          400: '#EC6A9C', 500: '#DE4C85', 600: '#C33A6E', 700: '#9E2E58',
        },
        // SPECTRUM — neurodiversity-inspired accents. Small elements only.
        sun: '#F5B93B',       // yellow
        tangerine: '#F5893B', // orange
        coral: '#EF5B4C',     // red
        grape: '#7C5CBF',     // purple
        // CTA — the "Call Us Now" red. Prominent but professional.
        cta: { 500: '#E23B3B', 600: '#C62F2F', 700: '#A82626' },
        // Neutrals — cool, blue-tinted.
        ink: '#14263B',
        muted: '#54657C',
        line: '#E1E9F2',
        surface: '#F2F7FC',
        cream: '#FBFCFE',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightish: '-0.02em', tighter2: '-0.035em' },
      borderRadius: { xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem' },
      boxShadow: {
        soft: '0 6px 24px -12px rgba(15, 48, 80, 0.16)',
        lift: '0 20px 50px -20px rgba(15, 48, 80, 0.26)',
      },
      maxWidth: { prose: '42rem', '8xl': '88rem' },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee var(--marquee-duration, 32s) linear infinite' },
    },
  },
  plugins: [],
};
