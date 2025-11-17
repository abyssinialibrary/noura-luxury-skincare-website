/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nour-deep-olive': '#556B2F', // Your grounding, natural, intellectual green
        'nour-terracotta-gold': '#B8860B', // Your nurturing, radiant, refined gold
        'nour-bone-white': '#F8F8F8', // Your soft neutrals & bone white
        'nour-soft-neutral': '#E0E0E0', // Another soft neutral
        'nour-dark-text': '#2D2D2D', // Your deep, rich text color
        'nour-primary-blue': '#4949E9', // Keeping this from original for logo icon color
        'nour-dark': '#1b1b1dff', // Keeping this from original for logo icon color

      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'sans-serif'], // Primary typeface: clean geometric sans-serif
        'serif': ['var(--font-sora)', 'serif'],     // Optional for elevated editorial feel
      },
      screens: {
        'xs': '475px', // Custom extra small breakpoint
      },
      // Keyframes for the simple CSS animations
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      // Animation durations and timings
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'bounce-slow': 'bounceSlow 2s infinite',
      },
    },
  },
  plugins: [],
}