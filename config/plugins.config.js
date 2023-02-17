const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// const HtmlResources = require('../plugins/html-resources')
const { VueLoaderPlugin } = require('vue-loader')

const {
  getAdminConfig,
  getProcessArgv,
  __public,
  __publicIndexHtml,
  __dist,
  isProd,
} = require('../utils')

const { useEslint } = getAdminConfig

const PluginsConfig = [
  new webpack.DefinePlugin({
    __ENV__: JSON.stringify(getProcessArgv()),
  }),
  new HtmlWebpackPlugin({
    template: __publicIndexHtml,
  }),
  isProd() ? new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css',
    ignoreOrder: true,
  }) : function() {},
  // new HtmlResources(),
  new VueLoaderPlugin()
]

// public文件夹静态资源复制
const files = glob.sync('**/*.*', {
  cwd: __public,
})
if (isProd() && files.length > 1) {
  PluginsConfig.push(
    new CopyPlugin({
      patterns: [
        {
          from: __public,
          to: __dist,
          globOptions: {
            ignore: ['**/*index.html'],
          },
        },
      ],
    })
  )
}

// 是否启动eslint
if (useEslint) {
  // PluginsConfig.push(
  //   new ESLintPlugin({
  //     formatter: require('eslint-friendly-formatter'),
  //     overrideConfigFile: path.join(__dirname, './eslint.config.js'),
  //     fix: false,
  //     useEslintrc: false,
  //     extensions: ['js', 'jsx', 'tsx'],
  //   })
  // )
}

PluginsConfig.concat(getAdminConfig.plugins || [])

module.exports = PluginsConfig
