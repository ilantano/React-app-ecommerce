const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [
        // eslint-disable-next-line global-require
        require('tailwindcss'),
        // eslint-disable-next-line global-require
        require('autoprefixer'),
        // require('postcss-import'),
      ],
    },
  },
  webpack: {
    alias: {
      '@': path.join(path.resolve(__dirname, './src')),
    },
  },
};
