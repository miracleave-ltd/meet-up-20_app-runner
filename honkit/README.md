# 面倒臭いことはもうしない！<br/>AWS App RunnerでWebアプリを爆速でデプロイ！

## 事前準備
- Dockerのインストール
- AWSアカウント

## 今回の流れ

App Runnerを活用して、アプリケーションを実際にデプロイしてみます。

### 技術要素

- [AWS AppRunner](https://aws.amazon.com/jp/apprunner/)
- [Amazon Elastic Container Registry: ECR](https://aws.amazon.com/jp/ecr/)
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/ja/)
- [p5.js](https://p5js.org/)
- [jest](https://jestjs.io/ja/)

## 開発手順

- p5.jsのアプリを「git fork」し、ローカルにアプリを配置する
- ローカル環境でP5.jsのアプリを動かしてみる
- AWSにログインしECRのリポジトリを作成する
- Dockerイメージの作成
- ECRにDockerイメージをpushする
- AWSのApp Runnerの画面に移動し、App Runnerの設定、デプロイを行う
- デプロイが完了後、App Runnerの画面にURLがあるのでアクセスし、アプリが動いているかを確認する
