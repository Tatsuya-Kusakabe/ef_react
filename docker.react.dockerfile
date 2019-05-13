################################
# node_modules を完成させるイメージ
################################
FROM node:alpine as base

# 先に npm install だけをしておき、リビルド時の差分を小さく
# (https://y-ohgi.com/introduction-docker/3_production/dockerfile/)
COPY ./package.json ./package-lock.json /

# コンテナの os を下記のコマンドで把握 -> alpine
# (https://qiita.com/oo2kazuma/items/015274769744545dd081)
# node-gyp 依存のモジュールをビルドするために、必要なパッケージをインストール
# (https://qiita.com/hoto17296/items/f3fe9cd9eac9e8ba2492)
# 進捗バーを非表示にして、npm install を高速化
# (https://blog.kazu69.net/2016/05/02/npm-install-speedup-in-docker/)
# ランタイムで使用するモジュールだけ prod_node_modules としてコピー
# (https://codefresh.io/docker-tutorial/node_docker_multistage/)
RUN apk add --virtual .gyp --no-cache python make g++ && \
    npm install --production --no-progress && \
    cp -R node_modules/ prod_node_modules && \
    npm install --no-progress && \
    apk del .gyp

# 中間イメージにラベルを付与 -> それを元に後からタグを付与
# (https://qiita.com/yagince/items/c1ca56331811fc8b33c1)
LABEL cache_base_react=true

########################################
# 開発環境用の server.js をビルドするイメージ
########################################
FROM node:alpine as dev

# 開発環境用のビルドは、ファイルコピーではなく bind mount を使用
# (https://hackernoon.com/how-to-move-code-into-a-docker-container-ab28edcc2901)
WORKDIR /app

# docker-compose.yml で指定した VIRTUAL_PORT を開放
EXPOSE 8080

# /bin/sh を介さずに実行（シェルの違いによらず、OS コマンドインジェクションを防げるため）
# (https://stackoverflow.com/questions/42805750/)
ENTRYPOINT ["npm", "start"]

########################################
# 本番環境用の server.js をビルドするイメージ
########################################
FROM node:alpine as prd_build

COPY --from=base . .

RUN npm run build

########################################
# 本番環境用のサーバを起動するイメージ（仮）
########################################
FROM node:alpine as prd

WORKDIR /app

COPY --from=prd_build /dist                   ./dist
COPY --from=prd_build /prod_node_modules      ./node_modules

EXPOSE 8080

ENTRYPOINT ["node", "./dist/server.js"]
