# Section1

## やってみよう！

### . P5.jsのアプリを「Git clone」し、ローカルにアプリを配置する
#### -1 Githubのリポジトリにアクセスする
![スクリーンショット 2021-08-02 21 17 47](https://user-images.githubusercontent.com/66664167/127860675-2844db8d-8557-4963-b434-73f50bb3c3e1.png)
URL:https://github.com/miracleave-ltd/meet-up-20_app-runner

#### -2 リポジトリをコピーする（Forkボタンを押下する）
<img width="1440" alt="スクリーンショット 2021-08-03 20 27 36" src="https://user-images.githubusercontent.com/66664167/128008196-b4cf89b2-46bc-4ba2-aba4-a88ce1d478f2.png">
※Forkボタンをクリック後、Githubにログインしている方は自動で自分のリポジトリに遷移します。

#### -3 リポジトリをローカルに配置する
##### 自分のリポジトリにコピーされたアプリのURLをコピーする
![スクリーンショット 2021-08-03 20 34 56](https://user-images.githubusercontent.com/66664167/128008838-a6c0f1ed-157f-4a71-8f4c-818cc6da4b91.png)
##### ターミナルに移動し、git cloneを行う
```
例：Desktopにクローンする場合
~ $ cd ~/Desktop
~/Desktop $ git clone [コピーしたURL] 
```

### . ローカル環境でP5.jsのアプリを動かしてみる
#### -1 イメージの作成
```
# meet-up-20_app-runnerフォルダに移動
~/Desktop $ cd meet-up-20_app-runner
# Dockerイメージの作成
~/Desktop/meet-up-20_app-runner $ docker build . -t app-runner-example
```
#### -2 コンテナの作成、起動
```
~/Desktop/meet-up-20_app-runner $ docker run -p 3333:3333 -d app-runner-example
```
#### -3 アプリが動いているかを確認
##### http://localhost:3333
※実際に動いていれば下記の画面が表示されます。
<img width="1440" alt="スクリーンショット 2021-08-03 20 58 45" src="https://user-images.githubusercontent.com/66664167/128011658-a378908e-8b27-48d2-a3a3-81d31b0803fb.png">


### . AWSにログインしECRのリポジトリを作成する
#### -1 ECRの画面に移動し、リポジトリを作成ボタンをクリックする
##### 検索欄から「ECR」と検索
![スクリーンショット 2021-08-03 21 13 58](https://user-images.githubusercontent.com/66664167/128013634-27a65469-2040-4e8e-b3e5-7798ac279343.png)
![スクリーンショット 2021-08-03 21 16 26](https://user-images.githubusercontent.com/66664167/128013920-1c095f4b-d2ae-4f7c-9e4e-402ae0e5fd46.png)

#### -2 ECRの設定を行い、リポジトリを作成する
![スクリーンショット 2021-08-03 21 19 40](https://user-images.githubusercontent.com/66664167/128014537-bad29997-4dc7-496b-a090-a810e406bf9b.png)

### . ローカルからECRにpushするためのIAM Userを作成
注意：すでに「AdministratorAccess」権限を持ち、プログラムのアクセスの権限のあるユーザーを作成されている場合は、このスッテプを飛ばしてください。
#### -1 IAMの画面に移動し、左メニューからポリシーを選択し、ポリシーを作成ボタンをクリックする
![スクリーンショット 2021-08-03 22 45 40](https://user-images.githubusercontent.com/66664167/128026358-ceac0edf-94ad-4698-88f1-8975e3f6f969.png)

#### -2 JSONを選択、下記をコピーし貼り付ける
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:*"
            ],
            "Resource": "*"
        }
    ]
}
```
![スクリーンショット 2021-08-03 22 50 02](https://user-images.githubusercontent.com/66664167/128026977-c239d6c4-521d-42e7-90a4-bc72dcfaf458.png)

#### -3 タグは設定せず、次のスッテプボタンをクリックし、ポリシー名を設定して作成する
名前： AccessEcrForAppRunner
![スクリーンショット 2021-08-03 22 58 52](https://user-images.githubusercontent.com/66664167/128028528-d7685e7e-9459-4ac8-b3d9-793f0c403962.png)

#### -4 左メニューからユーザーを選択し、ユーザーを追加ボタンをクリックする
![スクリーンショット 2021-08-03 21 36 19](https://user-images.githubusercontent.com/66664167/128016641-fe65c53f-4731-4b78-9682-e0d8c499cee6.png)

#### -5 IAMユーザーを作成する
ユーザー名： meet-up-app-runner-user
プログラムによるアクセスにチェック
![スクリーンショット 2021-08-03 23 03 52](https://user-images.githubusercontent.com/66664167/128029297-91ddbf30-947c-4cd9-b6e6-b72381f7138d.png)

##### 既存のポリシーを直接アタッチを選択し、「AccessEcrForAppRunner」にチェックを入れ、確認画面までスキップする
![スクリーンショット 2021-08-03 23 04 15](https://user-images.githubusercontent.com/66664167/128029327-86504574-e473-49bf-9057-2097d0870c8d.png)

##### 確認画面でCSVをダウンロードする
![スクリーンショット 2021-08-03 23 08 49](https://user-images.githubusercontent.com/66664167/128030387-716d15e2-31fd-450a-8d44-4f0135e3cd18.png)


### . ECRにDockerイメージをpushする
#### -1 認証情報の設定
##### credentialsの設定
```
# .awsに移動
~/Desktop/meet-up-20_app-runner $ cd ~/.aws
# credentialsを作成、修正
.aws $ vi credentials
```
##### 先ほど、CSVでダウンロードしたアクセスIDとアクセスキーを下記のイコールの後に値を設定する
```
[default]
aws_access_key_id = 
aws_secret_access_key = 
```
※設定後は esc -> :wp -> Enter の順番でキーボードを打ち、保存する

##### configの設定
```
.aws $ vi config
```
##### 下記の形式で設定する
```
[default]
region = ap-northeast-1
output = json
```
※設定後は esc -> :wp -> Enter の順番でキーボードを打ち、保存する

#### -2 ECR画面に移動し、プッシュコマンドを確認し、ECRにpushする
今回はAWS CLIをローカルにダウンロードせず、Dockerを通してAWS　CLIコマンドを実行します。
Dockerを通してAWS CLIコマンドを実行する際は下記コマンドをベースに実行します
```
docker run --rm -ti -v ~/.aws:/root/.aws -v $(pwd):/aws amazon/aws-cli [AWSコマンド]
```
##### プッシュコマンドを確認
![スクリーンショット 2021-08-03 23 49 49](https://user-images.githubusercontent.com/66664167/128037047-10cdcd04-20a2-47b1-b23c-85f2782ff271.png)
![スクリーンショット 2021-08-03 23 53 09](https://user-images.githubusercontent.com/66664167/128037302-fab17bdd-7dff-432f-91aa-28c23e87f920.png)

##### ECRにプッシュする
```
# クローンしてきたフォルダに移動
cd ~/Desktop/meet-up-20_app-runner
# ログインする（ログインが成功すると「Login Succeeded」が表示される）
docker run --rm -ti -v ~/.aws:/root/.aws -v $(pwd):/aws amazon/aws-cli [app-runner-exampleのプッシュコマンドの１をコピー（先頭のawsは省く）]
例：　docker run --rm -ti -v ~/.aws:/root/.aws -v $(pwd):/aws amazon/aws-cli ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 0000000000.dkr.ecr.ap-northeast-1.amazonaws.com
# app-runner-exampleのプッシュコマンドの3を実行
例： docker tag app-runner-example:latest 0000000000.dkr.ecr.ap-northeast-1.amazonaws.com/app-runner-example:latest
# app-runner-exampleのプッシュコマンドの4を実行
例： docker push 0000000000.dkr.ecr.ap-northeast-1.amazonaws.com/app-runner-example:latest
```

### . AWSのApp Runnerの画面に移動し、App Runnerの設定、デプロイを行う
#### -1 App Runnerの画面に移動し、App Runnerサービスを作成するボタンをクリック
![スクリーンショット 2021-08-04 0 35 42](https://user-images.githubusercontent.com/66664167/128044328-b3136e19-dbe6-4326-876f-057799f8c731.png)
![スクリーンショット 2021-08-04 0 36 47](https://user-images.githubusercontent.com/66664167/128044351-9d24d360-d64a-432b-b968-499680363a27.png)

#### -2 App Runnerサービスの設定、デプロイを行う
##### コンテナイメージのURIは、先ほど作成したECRリポジトリを選択する
![スクリーンショット 2021-08-04 0 38 48](https://user-images.githubusercontent.com/66664167/128044874-0c87a24a-1d9b-48c0-9143-19c56b13b106.png)
##### サービスを設定する
![スクリーンショット 2021-08-04 0 41 37](https://user-images.githubusercontent.com/66664167/128045207-cdf2cd20-7e90-40cc-9384-52c05cd000a1.png)
##### 作成とデプロイボタンをクリック
![スクリーンショット 2021-08-04 0 43 31](https://user-images.githubusercontent.com/66664167/128045443-c021afdd-21ef-46a8-98bd-2898af97d3f2.png)



### . デプロイが完了後、App Runnerの画面にURLがあるのでアクセスし、アプリが動いているかを確認する
#### -1 公開されたURLにアクセスし、実際にアプリが動いているか確認する
![スクリーンショット 2021-08-04 0 52 41](https://user-images.githubusercontent.com/66664167/128047070-19e8b04c-eafe-42c1-9c6d-47c170165d9e.png)

#### -2 アプリが問題なく動作している場合、下記の画面が表示されます
![スクリーンショット 2021-08-04 0 55 32](https://user-images.githubusercontent.com/66664167/128047434-212e12bc-7235-48e4-b339-3936d928eb3d.png)


