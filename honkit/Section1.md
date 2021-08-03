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

### . ECRにDockerイメージをpushする
#### -1 

### . AWSのApp Runnerの画面に移動し、App Runnerの設定、デプロイを行う
#### -1 

### . デプロイが完了後、App Runnerの画面にURLがあるのでアクセスし、アプリが動いているかを確認する
#### -1 
