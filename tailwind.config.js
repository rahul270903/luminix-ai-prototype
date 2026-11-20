/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B111D',
          900: '#101827',
          800: '#152136',
          700: '#1D2939',
          600: '#344054',
        },
        slate: {
          850: '#1E293B',
          750: '#334155',
        },
        primary: {
          DEFAULT: '#4F7DF3',
          hover: '#3D68DC',
          light: '#EEF3FF',
          dark: '#2E50B6',
        },
        teal: {
          DEFAULT: '#27B6A8',
          light: '#E6F8F6',
          dark: '#1C8A80',
        },
        amber: {
          DEFAULT: '#E9AC45',
          light: '#FEF7E8',
          dark: '#B87F1B',
        },
        rose: {
          DEFAULT: '#E45D5D',
          light: '#FDECEC',
          dark: '#BE3737',
        },
        surface: {
          bg: '#F5F7FA',
          card: '#FFFFFF',
          border: '#E4E7EC',
          muted: '#667085',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
