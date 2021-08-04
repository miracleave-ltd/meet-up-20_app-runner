# デモアプリ動作確認

## イメージ作成
```
# meet-up-20_app-runnerフォルダに移動
~/Desktop $ cd meet-up-20_app-runner
# Dockerイメージの作成
~/Desktop/meet-up-20_app-runner $ docker build . -t app-runner-example
```
## コンテナの作成、起動
```
~/Desktop/meet-up-20_app-runner $ docker run -p 3333:3333 -d app-runner-example
```
## アプリ確認
次のリンクよりデモアプリが動作しているか確認します。  
URL: http://localhost:3333  
※実際に動いていれば下記の画面が表示されます。
![](img/4.png)
