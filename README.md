# iOSRPC

# 依存関係のインストール

```
npm install
```

# ビルド&実行

```
npm run test
```

# Rich Presenceのステータス変更

httpリクエストでPOSTする

*リクエストJSON:*
```json
{
    "AppName": "パズドラ",
    "closing": false
}
```

パラメータ:

*AppName*:
アプリ名

*closing*:
閉じているか(trueの場合はデフォルトに戻す)

# (応用)iOSショートカットでステータスを変更する

ショートカット->オートメーション

*いつ*: 
```
パズドラが開かれたとき
```

*行う*: 
URLの内容を取得

|  URL  |  方法  |  本文を要求  |
| ---- | ---- | ---- |
|  ホストのIPとポート  |  POST  |  JSON  |

*JSONの内容*
```json
{
    "AppName": "パズドラ",
    "closing": false
}
```

※閉じているときはclosingをtrueにする

それ以外は同じ