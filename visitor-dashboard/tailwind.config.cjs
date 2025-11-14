// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'custom-blue': '#3B58FE',
//       }
//     },
//   },
//   plugins: [],
// }


// 




const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
   colors: {
      'custom-blue': '#3B58FE',
       'estmac-blue': {
          '50': '#d5d9e1',
          '100': '#aab3c2',
          '200': '#7f8d9f',
          '300': '#54677b',
          '400': '#2b405f',
          DEFAULT: '#1A2E65',
          '600': '#152451',
          '700': '#101a3d',
          '800': '#0b1129',
          '900': '#060715',
          '950': '#03040b',
        },
        'estmac-red': {
          '50': '#fce3e5',
          '100': '#f9c7cc',
          '200': '#f5aab3',
          '300': '#f28e9a',
          '400': '#ee7181',
          '500': '#eb5468',
          DEFAULT: '#E72B3C',
          '600': '#d22335',
          '700': '#be1c2e',
          '800': '#a91626',
          '900': '#940f1f',
          '950': '#710a17',
        },
        // Standard Tailwind gray palette
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#03040b'
        },
        'custom-light': '#c8eafa', // your light color
        'custom-dark': '#5ebddd',
        // Brand Core
        'primary': '#6366F1',
        'secondary': '#06B6D4',
        'accent': '#A855F7',
        'highlight': '#F59E0B',
        // Status Colors
        'success': '#22C55E',
        'warning': '#FACC15',
        'error': '#EF4444',
        // Neutral / Background
        'background': '#F9FAFB',
        'card': '#FFFFFF',
        'border': '#E5E7EB',
        // Gradient Colors
        'lavender-start': '#E0E0FF',
        'lavender-end': '#FFFFFF',
        'cream-start': '#FFEFB5',
        'cream-end': '#FFFFFF',
        'aqua-start': '#B5F6F9',
        'aqua-end': '#FFFFFF',
        // Dashboard Card Colors
        'dashboard-blue-start': '#4D58E2',
        'dashboard-blue-end': '#6B57EA',
        'dashboard-pink-start': '#FD79A8',
        'dashboard-pink-end': '#F96066',
        'dashboard-aqua-start': '#92F1C5',
        'dashboard-aqua-end': '#5B66F7',
        // Hero Section Gradient Colors
        'hero-blue-start': '#1C69D3',
        'hero-blue-end': '#4329B3',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1)',
        'gradient-accent': 'linear-gradient(135deg, #A855F7, #6366F1)',
        'gradient-warm': 'linear-gradient(135deg, #f05d5dff)',
        'gradient-success': 'linear-gradient(135deg, #53e98aff, #06B6D4)',
        'gradient-lavender': 'linear-gradient(to bottom, #8383edff)',
        'gradient-cream': 'linear-gradient(to bottom,  #f2e8e8ff)',
        'gradient-aqua': 'linear-gradient(to bottom, #B5F6F9, #FFFFFF)',
        'gradient-page': 'linear-gradient(to bottom right, #F9FAFB, #EEF2FF, #ECFEFF)',
        'gradient-blur': 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(6,182,212,0.5))',
        'gradient-card-blue': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-card-pink': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-card-aqua': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-hero-blue': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0,0,0,0.05)',
        'glow': '0 4px 20px rgba(99,102,241,0.3)',
      },
     
  },
  plugins: [],
};

