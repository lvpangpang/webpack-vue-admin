const { getAdminConfig } = require('../utils')

const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions'],
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/typescript',
  ],
  plugins: getAdminConfig.babelPlugins,
}

module.exports = babelConfig
