// 全般はこちらを参照 (https://qiita.com/IgnorantCoder/items/d26083d9f886ca66d4ae)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

module.exports = {
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
    // docker-compose に加えて webpack でも指定しないと環境変数を読み込めない（原因は不明）
    // (https://stackoverflow.com/questions/55277860/)
    // (https://webpack.js.org/plugins/environment-plugin/)
    new webpack.EnvironmentPlugin(['GOOGLE_MAPS_KEY'])
  ],

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
      test: /\.tsx?$/,               // xxx.ts, xxx.tsx に対して
      loader: 'ts-loader',           // ts-loader を使ってトランスパイル
      exclude: [/node_modules/],
      options: {
        configFile: 'tsconfig.json', // TypeScript のコンパイル設定ファイル
        transpileOnly: true,         // 以下二つで、差分ビルドの対象となるファイル数を減らす
        experimentalWatchApi: true,  // (https://webpack.js.org/guides/build-performance/#typescript-loader)
      }
    }]
  }
};
