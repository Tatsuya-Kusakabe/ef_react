// 全般はこちらを参照 (https://qiita.com/IgnorantCoder/items/c9b79dbab8c1a34b769f)

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
  // ソースマップ付きで js が出力されるため、コンパイル後のファイルからコンパイル前のファイルを追跡可能になり、デバッグが容易に
  // (https://webpack.js.org/guides/production/)
  // (http://chuckwebtips.hatenablog.com/entry/2016/03/02/000000)
  mode: 'development',
  devtool: 'inline-source-map',

  // 主な設定はこちらを参照 (https://webpack.js.org/configuration/dev-server/)
  // (outdated) ssl の設定はこちらを参照 (https://webpack.js.org/configuration/dev-server/#devserverhttps)
  // ** key, cert は、webpack.config では読み込まれず、webpack-cli では読み込まれた（原因は不明）
  devServer: {
    allowedHosts: ['app.expwy-footprints.com', 'react'],
    host: '0.0.0.0',
    port: 8080,
    inline: true, // dist 内の js が変更されたら、コンパイルして、自動でブラウザをリロード
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true, // dist 内の html, css が変更されても、自動でブラウザをリロード
  },
});
