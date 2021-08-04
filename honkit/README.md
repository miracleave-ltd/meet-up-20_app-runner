# 面倒臭いことはもうしない！<br/>AWS App RunnerでWebアプリを爆速でデプロイ！

## 事前準備
- Dockerインストール
- GitHubアカウント
- AWSアカウント
## 今回の流れ
App Runnerを活用して、アプリケーションを実際にデプロイします。
### 技術要素
- [AWS AppRunner](https://aws.amazon.com/jp/apprunner/)
- [Amazon Elastic Container Registry: ECR](https://aws.amazon.com/jp/ecr/)
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/ja/)
- [p5.js](https://p5js.org/)
- [jest](https://jestjs.io/ja/)
## 開発手順
- デモアプリクローン
- デモアプリ動作確認
- コンテナレジストリパターン
  - ECRリポジトリ作成
  - Dockerイメージ作成
  - ECRプッシュ
- ソースコードリポジトリパターン
  - ...
- AppRunnerデプロイ
- ゴミ掃除

## 注意事項

App Runnerでは、まだ制限が多くあります。  
利用する際は、事前に制限内容を確認の上、検討をお願いします。  
ご参考までにロードマップ等ご確認ください。  
[App Runner - ロードマップ](https://github.com/aws/apprunner-roadmap)