// tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'], // adjust this to your folder structure
    theme: {
      extend: {
        keyframes: {
          'spin-reverse': {
            from: { transform: 'rotate(360deg)' },
            to: { transform: 'rotate(0deg)' },
          },
        },
        animation: {
          'spin-reverse': 'spin-reverse 1s linear infinite',
        },
      },
    },
    plugins: [],
  }
  