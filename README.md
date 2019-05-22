# 機能
- `Google Maps JavaScript API` を使用し、高速道路の乗りつぶし記録を `CRUD` するサイト  

# 利用技術
- 環境構築: `Docker:18.09.2`  
- フレームワーク: `react:^16.8.6`  
- ステート管理 `(flux)`: `eventemitter2:^5.0.1`  

# 使用法
- 全体的な話は `ef_nginx` を参照  
- `.env` に、`docker-compose.yml` で定義されている環境変数を登録  

# 今までの取り組み
今まで、勉強してきたことをまとめておく

## 自分で編集したコマンド `(tsconfig.json)`  
- `sourceMap: true` ... コンパイル前後のファイルを結びつけ、`bunlde.js` を用いないデバッグが可能に  
- `target: es5` ... `typescript` を `es5` にコンパイル  
- `jsx: react` ... `react` 型の `jsx` を使用  
- `typeRoots: [types, node_modules/@types]` ... 型定義ファイルのありかを定義  
- `noImplicitAny: true`, `noImplicitReturns: true`, `noUnusedLocals: true`  
... 詳細は右記 (http://neos21.hatenablog.com/entry/2017/10/24/080000)  

## 自分で編集したコマンド `(tslint.json)`  
- `variable-name: allow-pascal-case` ... 変数名に `hogeFuga` だけでなく `HogeFuga` も使えるように
- `import-name: {...}` ... 望み通りの名前で `import` できるように  
(https://github.com/Microsoft/tslint-microsoft-contrib/issues/451)  
