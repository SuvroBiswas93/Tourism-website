/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
      keyframes: {
        shakeX: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate3d(-10px, 0, 0)' },
          '20%, 40%, 60%, 80%': { transform: 'translate3d(10px, 0, 0)' },
        },
        backInLeft: {
          '0%': { transform: 'translateX(-2000px) scale(0.7)', opacity: '0.7' },
          '80%': { transform: 'translateX(0px) scale(0.7)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        backInRight: {
          '0%': { transform: 'translateX(2000px) scale(0.7)', opacity: '0.7' },
          '80%': { transform: 'translateX(0px) scale(0.7)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        backInUp: {
          '0%': { transform: 'translateY(1200px) scale(0.7)', opacity: '0.7' },
          '80%': { transform: 'translateY(0px) scale(0.7)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInLeft: {
          from: { opacity: '0', transform: 'translate3d(-100%, 0, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translate3d(0, -100%, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        pulse: {
          from: { transform: 'scale3d(1, 1, 1)' },
          '50%': { transform: 'scale3d(1.05, 1.05, 1.05)' },
          to: { transform: 'scale3d(1, 1, 1)' },
        },
        bounce: {
          '0%, 20%, 53%, 100%': {
            'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translate3d(0, 0, 0)',
          },
          '40%, 43%': {
            'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -30px, 0) scaleY(1.1)',
          },
          '70%': {
            'animation-timing-function': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -15px, 0) scaleY(1.05)',
          },
          '80%': {
            'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translate3d(0, 0, 0) scaleY(0.95)',
          },
          '90%': {
            transform: 'translate3d(0, -4px, 0) scaleY(1.02)',
          },
        },
        backInUp: {
          '0%': { transform: 'translateY(1200px) scale(0.7)', opacity: '0.7' },
          '80%': { transform: 'translateY(0px) scale(0.7)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        shakeX: 'shakeX 1s ease-in-out', // Define the animation name, duration, and easing
        backInLeft: 'backInLeft 1s ease-in-out', // You can adjust the duration and easing
        backInRight: 'backInRight 1s ease-in-out',
        backInUp: 'backInUp 1s ease-in-out',
        fadeInLeft: 'fadeInLeft 1s ease-out',
        fadeInDown: 'fadeInDown 1s ease-out',
        pulse: 'pulse 1s ease-in-out',
        bounce: 'bounce 1s',
        backInUp: 'backInUp 1s ease-in-out',
      },
    },
  },
  plugins: [],
};