# ゴミ掃除

## App Runnerサービス削除
次のリンクよりApp Runnerサービス一覧を表示します。  
[App Runnerサービス一覧](https://ap-northeast-1.console.aws.amazon.com/apprunner/home?region=ap-northeast-1#/services)  
![](img/40.png)  

画面に表示されている指示通り、入力欄に`delete`を入力し、`削除`ボタンをクリックします。  
![](img/41.png)  

本日作成したサービスが削除されていることを確認します。
![](img/42.png)

## IAM削除

### IAMユーザー削除

次のリンクよりIAMユーザー一覧を表示します。  
[IAMユーザー](https://console.aws.amazon.com/iamv2/home#/users)  

今回作成したユーザーを選択し、`削除`ボタンをクリックします。  
![](img/51.png)  

画面に表示されている指示通り、入力欄に`meet-up-app-runner-user`を入力し、`削除`ボタンをクリックします。  
![](img/52.png)  

対象のユーザーが削除されていることを確認します。  
![](img/53.png)  

### IAMポリシー削除

次のリンクよりIAMポリシー一覧を表示します。  
[IAMポリシー](https://console.aws.amazon.com/iamv2/home?#/policies)  

作成したIAMポリシーを選択し、`アクション`ボタンのドロップダウンより`削除`ボタンをクリックします。  
![](img/54.png)  

画面に表示されている指示通り、入力欄に`AccessEcrForAppRunner `を入力し、`削除`ボタンをクリックします。  
![](img/55.png)  

検索欄に`AccessEcrForAppRunner`を入力し、対象のポリシーが削除されていることを確認します。  
![](img/56.png) 

### IAMロール削除

次のリンクよりIAMロール一覧を表示します。  
[IAMロール](https://console.aws.amazon.com/iamv2/home#/roles)  

作成したIAMロールを選択し、`削除`ボタンをクリックします。  
![57](https://user-images.githubusercontent.com/55343055/129122840-94fe88c5-7983-4c1b-8dba-681924b14459.png)

画面に表示されている指示通り、入力欄に`AppRunnerECRAccessRole `を入力し、`削除`ボタンをクリックします。  
![58](https://user-images.githubusercontent.com/55343055/129122877-88a602a4-4533-4d0f-9e21-8e657497abd3.png)

## ローカルに構築したDockerイメージ削除

### コンテナの停止
次のコマンドを実行し、コンテナ状態を確認します。  
```
docker ps
---
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                                       NAMES
e572bd192f8d   app-runner-example   "docker-entrypoint.s…"   00 seconds ago   Up 00 seconds   0.0.0.0:3333->3333/tcp, :::3333->3333/tcp   nice_kare
```

上記で実行した`CONTAINER ID`を次のコマンドで利用します。  
起動中のコンテナを停止します。  
```
docker stop [CONTAINER ID]
```

### イメージの削除
次のコマンドを実行し、作成したコンテナイメージを確認します
```
docker images
```

まずは、ビルドで作成したコンテナイメージを削除します。（イメージ名が`app-runner-example`のイメージ） 

注意：[IMAGE ID]には、上記で実行した際に表示された、表示結果の左から３番目のランダムな文字列がIMAGE IDです。
```
docker rmi -f [IMAGE ID]
```

次のメッセージが表示されれば、成功です。  
> Untagged: app-runner-example...  

<br>

次にECRにプッシュしたイメージを削除します。 （イメージ名が`000000000000.dkr.ecr.ap-northeast-1.amazonaws.com/app-runner-example`の形式になっているイメージ） 

注意：[IMAGE ID]には、上記で実行した際に表示された、表示結果の左から３番目のランダムな文字列がIMAGE IDです。
```
docker rmi -f [IMAGE ID]
```

次のメッセージが表示されれば、成功です。  
> Untagged: 000000.dkr.ecr.ap-northeast-1.amazonaws.com/app-runner-example...  
> Deleted: sha256:f382b74e...  

<br>

最後にECRプッシュする際に使用したAWS CLIのイメージを削除します。（イメージ名が`amazon/aws-cli`のイメージ）

注意：[IMAGE ID]には、上記で実行した際に表示された、表示結果の左から３番目のランダムな文字列がIMAGE IDです。
```
docker rmi -f [IMAGE ID]
```

次のメッセージが表示されれば、成功です。
> Untagged: amazon/aws-cli:latest
> Untagged: amazon/aws-cli@sha256:8b40031b3b3a7ed06f0e4c6b7163d5045c242cf54b635901d87e05c6bd7b193c...

## フォルダの削除

次のコマンドでフォルダを完全に削除します。

**Macの場合**
```
# 一つ上の階層に移動
cd ../
# meet-up-20_app-runnerフォルダが存在しているかを確認
ls
# meet-up-20_app-runnerフォルダが存在している場合、下記コマンドを実行しフォルダを削除
rm -rf meet-up-20_app-runner
```

**Windowsの場合**
```
# 一つ上の階層に移動
cd ../
# meet-up-20_app-runnerフォルダが存在しているかを確認
dir
# meet-up-20_app-runnerフォルダが存在している場合、下記コマンドを実行しフォルダを削除
rd /s /q meet-up-20_app-runner
```

以上。
