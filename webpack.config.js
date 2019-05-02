// 全般はこちらを参照 (https://qiita.com/IgnorantCoder/items/d26083d9f886ca66d4ae)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

const webpack = require("webpack")
require('dotenv').config();

module.exports = {
  // ソースマップ付きで js が出力されるため、コンパイル後のファイルからコンパイル前のファイルを追跡可能になり、デバッグが容易に
  // (https://ics.media/entry/16329#webpack-ts-react)
  // (https://qiita.com/pegass85/items/4bd80828f95ef13d6159)
  // (http://chuckwebtips.hatenablog.com/entry/2016/03/02/000000)
  mode: 'development',
  devtool: 'inline-source-map',

  // webpack 4 のデフォルト値 ... context: views, entry: views/index.tsx, output: dist/main.js
  // views/index.tsx を起点にビルドし、結果は dist/bundle.js に出力
  // webpack --watch を指定しないと、変更時に dist/bundle.js が更新されない
  // (https://stackoverflow.com/questions/41928358/)
  entry: './views/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js?[hash]'
  },

　 // Hoge.tsx を import Hoge from './Hoge' みたいに書ける
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    // tsx -> js と同様に、views/index.html から、デプロイ用の dist/index.html を作成
    new HtmlWebpackPlugin({
      template: './views/index.html'
    }),
    // .env をビルド時に読み込ませる
    // (http://hinoshita.hatenadiary.com/entry/2017/09/17/143445)
    new webpack.DefinePlugin({
      'process.env': {
        'GOOGLE_MAPS_KEY': JSON.stringify(process.env.GOOGLE_MAPS_KEY)
      }
    })
  ],

  // 主な設定はこちらを参照 (https://qiita.com/riversun/items/d27f6d3ab7aaa119deab)
  // ssl の設定はこちらを参照 (https://webpack.js.org/configuration/dev-server/#devserverhttps)
  // key, cert は、webpack.config では読み込まれず、webpack-cli では読み込まれた（原因は不明）
  devServer: {
    open: true,
    host: 'expwy-footprints.com', // server を立ち上げたら、自動で expwy-footprints:443/ を開く
    port: 443,
    inline: true, // dist 内の js が変更されたら、コンパイルして、自動でブラウザをリロード
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true, // dist 内の html, css が変更されても、自動でブラウザをリロード
  },

  module: {
    rules: [{
      enforce: 'pre',               // ビルド前に
      test: /\.tsx?$/,              // xxx.ts, xxx.tsx に対して
      loader: 'tslint-loader',      // tslint-loader を使って構文チェック
      exclude: [/node_modules/],
      options: {
        emitErrors: true, // TSLint が出してくれた警告をエラーとして扱ってくれる
        typeCheck: true   // warning を消す (https://qiita.com/kurosame/items/3c28f45c8b2e65f5c69d)
      }
    }, {
      test: /\.tsx?$/,                         // xxx.ts, xxx.tsx に対して
      loader: 'ts-loader',                     // ts-loader を使ってトランスパイル
      exclude: [/node_modules/],
      options: { configFile: 'tsconfig.json' } // TypeScript のコンパイル設定ファイル
    }]
  }
};
