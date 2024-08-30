/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite-react/lib/**/*.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
      },
      backgroundImage: {
        'custom-image': "url('https://st.depositphotos.com/1032463/1373/i/450/depositphotos_13732950-stock-photo-background-of-old-vintage-newspapers.jpg')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}