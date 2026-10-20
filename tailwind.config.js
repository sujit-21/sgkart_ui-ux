/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#174EA6', // Royal Blue
          light: '#2A6FD6',
          hover: '#133E85',
          dark: '#0C2B61',
          50: '#F0F5FF',
          100: '#E0EBFF',
        },
        secondary: {
          DEFAULT: '#FFD54F', // Bright Yellow
          hover: '#FFCA28',
          active: '#FFB300',
          light: '#FFF9C4',
          50: '#FFFDE7',
        },
        page: '#F5F7FA', // Light Gray page background
        navy: {
          DEFAULT: '#172033', // Dark Navy text
          muted: '#5A6A85',
          light: '#8B98AD',
          border: '#E2E8F0',
        },
        kartGreen: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
          badge: '#388E3C',
        },
        kartRed: {
          DEFAULT: '#D32F2F',
          light: '#FFEBEE',
        },
        kartOrange: {
          DEFAULT: '#F57C00',
          light: '#FFF3E0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(23, 32, 51, 0.08)',
        'card-hover': '0 8px 24px rgba(23, 32, 51, 0.12)',
        'nav': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 10px 30px rgba(23, 32, 51, 0.15)',
      }
    },
  },
  plugins: [],
}
