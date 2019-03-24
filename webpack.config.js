// 全般はこちらを参照 (https://qiita.com/IgnorantCoder/items/d26083d9f886ca66d4ae)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  // ソースマップ付きで js が出力されるため、コンパイル後のファイルからコンパイル前のファイルを追跡可能になり、デバッグが容易に
  // (https://ics.media/entry/16329#webpack-ts-react)
  // (https://qiita.com/pegass85/items/4bd80828f95ef13d6159)
  // (http://chuckwebtips.hatenablog.com/entry/2016/03/02/000000)
  mode: 'development',
  devtool: 'inline-source-map',

  // webpack 4 のデフォルト値 ... context: src, entry: src/index.tsx, output: dist/main.js
  // src/index.tsx を起点にビルドし、結果は dist/bundle.js に出力
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js?[hash]'
  },

　 // Hoge.tsx を import Hoge from './Hoge' みたいに書ける
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  // tsx -> js と同様に、src/index.html から、デプロイ用の dist/index.html を作成
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // 主な設定はこちらを参照 (https://qiita.com/riversun/items/d27f6d3ab7aaa119deab)
  devServer: {
    open: true,
    port: 3002,   // server を立ち上げたら、自動で localhost:3002/ を開く
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
      options: { emitErrors: true } // TSLint が出してくれた警告をエラーとして扱ってくれる
    }, {
      test: /\.tsx?$/,                         // xxx.ts, xxx.tsx に対して
      loader: 'ts-loader',                     // ts-loader を使ってトランスパイル
      exclude: [/node_modules/],
      options: { configFile: 'tsconfig.json' } // TypeScript のコンパイル設定ファイル
    }]
  }
};
