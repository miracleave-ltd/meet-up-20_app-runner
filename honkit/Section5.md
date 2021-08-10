# ソースコードリポジトリパターン

この手順では次の手順を進めていきます。  
![](img/46.png)  

{% hint style='working' %}
**注意事項**  
- ソースコードリポジトリは、GitHubのみ対応しています。
- サービスランタイムは、Python3 / Nodejs 12のみとなります。
{% endhint %}

次のリンクよりApp Runnerページへ遷移します。  
[App Runner](https://ap-northeast-1.console.aws.amazon.com/apprunner/home?region=ap-northeast-1#/welcome)  

`App Runnerサービスを作成`ボタンをクリックします。  
![](img/25.png)  
`ソースコードリポジトリ`を選択します。  
![](img/24.png)  
GitHubとAWSを連携させるため、`新規追加`ボタンをクリックします。  
![](img/26.png)  
「AWS Connector for GitHub」というアプリをGitHubアカウントにインストールするための同意画面が表示されます。  
`Authorize AWS Connector for GitHub`ボタンをクリックします。  
![](img/27.png)  
`別のアプリケーションをインストールする`をクリックします。  
![](img/28.png)  
「AWS Connector for GitHub」をインストールするGitHubアカウントを選択してください。  
![](img/29.png)  
「AWS Connector for GitHub」をインストールするリポジトリを選択してください。  
![](img/30.png)  
選択したリポジトリが次のように「XXXXX/meet-up-20_app-runner」となっていることを確認し、`install`ボタンをクリックしてください。  
![](img/31.png)  
パスワード入力画面が表示した場合は、パスワードを入力し、`Confirm password`ボタンをクリックしてください。  
![](img/32.png)  
GitHubアプリケーションのセレクトボックスに対象GitHubアカウント名が表示されましたら、`次へ`ボタンをクリックしてください。  
![](img/33.png)  
以下の設定値を選択し、`次へ`ボタンをクリックしてください。  

> GitHubに接続：meetup-example
> リポジトリ：meet-up-20_app-runner
> ブランチ：main
> デプロイトリガー：自動

![](img/34.png)  

次の設定値を入力し、`次へ`ボタンをクリックしてください。  

> 設定ファイル：ここですべての設定を構成する
> ランタイム：Nodejs 12
> 構築コマンド：npm install
> 開始コマンド：node index.js
> ポート：3333

![](img/35.png)  

次の設定値を入力し、`次へ`ボタンをクリックしてください。  

> サービス名：meetup-app-runner
> 仮想CPU：1 vCPU
> メモリ：2 GB

![](img/36.png)  

内容の確認を行い、特に問題がなければ、`作成とデプロイ`ボタンをクリックします。  
![](img/37.png)  

ステータスが`Running`になると環境作成完了です。  
ドメインが発行されますので、デフォルトドメインのURLをクリックします。  
![](img/38.png)  

次のページが表示されれば、デプロイ完了です。  
![](img/39.png)  
