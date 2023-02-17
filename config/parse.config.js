const miniCssExtractPlugin = require('mini-css-extract-plugin')
const { isProd } = require('../utils')
const babelConfig = require('./babel.config.js')
const postCssConfig = require('./postCss.config.js')
const { getAdminConfig } = require('../utils')
const { isRem } = getAdminConfig

const styleLoader = isProd() ? miniCssExtractPlugin.loader : 'style-loader'

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('autoprefixer')(postCssConfig)],
    },
  },
}

const remLoader = {
  loader: 'px2rem-loader',
  options: {
    remUnit: 75,
    remPrecision: 8,
  },
}

const parseConfig = {
  rules: [
    {
      test: /\.(ts|js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          ...babelConfig,
        },
      },
    },
    {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [styleLoader, 'css-loader', postCssLoader].concat(
        isRem ? [remLoader] : []
      ),
    },
    {
      test: /\.less$/,
      exclude: /node_modules/,
      use: [styleLoader, 'css-loader', postCssLoader]
        .concat(isRem ? [remLoader] : [])
        .concat(['less-loader']),
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [styleLoader, 'css-loader', postCssLoader],
    },
    {
      test: /\.less$/,
      include: /node_modules/,
      use: [styleLoader, 'css-loader', postCssLoader, 'less-loader'],
    },
    {
      test: /\.(png|jpg|svg|gif|otf)$/,
      type: 'asset',
    },
  ],
}

module.exports = parseConfig
