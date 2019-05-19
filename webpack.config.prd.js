// 全般はこちらを参照 (https://qiita.com/IgnorantCoder/items/c9b79dbab8c1a34b769f)

const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
});
