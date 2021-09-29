module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          800: '#230051',
          900: '#180038',
        },
      },
      boxShadow: {
        lg: '0 0 30px 0 rgba(82,63,105,.05)',
      },
      minWidth: {
        300: '300px',
      },
      fontSize: {
        '10px': '10px',
        '9px': '9px',
        '8px': '8px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
