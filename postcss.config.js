module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      unitPrecision: 4,
      minPixelValue: 5,
      unitToConvert: 'px',
      selectorBlackList: ['ignore'],
      propList: ['*'],
    }
  }
}