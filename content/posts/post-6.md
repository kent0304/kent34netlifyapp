---
template: SinglePost
title: "スタバのおすすめカスタマイズ教えてくれるBOT作ってみた"
slug: '6'
tags: ["LINEbot"]
status: Featured / Published
date: '2020-01-01'
featuredImage: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20191231/20191231192412.jpg'
excerpt: none
categories:
  - category: Web
meta:
  canonicalLink: ''
  description: test meta description
  noindex: false
  title: test meta title
---

あけましておめでとうございます！
2020年1月1日になって早速LINEBot公開してみました！

みなさんスタバは好きですか？
僕はスタバでアルバイトをしていて(もうすぐ卒業)，プライベートでもよく作業をしたりコーヒーを飲みに行きます．
スターバックスのパートナーとして働いていて，無料でできてしまうカスタマイズがあまり知れ渡っておらずなんだかもったいないなーと思ったので今回はLINEBotにしてしまいました！

# 自己紹介
- 大学4年生．理系機械系．
- 設計工学の研究室．
- 趣味でRails触ったり，研究で機械学習ちょっと触ってます．

# 今回作ったLINEBot
今回作ったLINEBotがこちらです．
![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20191231/20191231192412.jpg)
![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20200101/20200101010329.png)

## 使い方
「使い方」と送ると簡単に使い方を教えてくれます．
![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20200101/20200101011114.png)

## ドリンクの名前を送る
気になるドリンクの名前を送るとそのドリンクのおすすめカスタマイズをランダムで1つ返してくれます．
![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20191231/20191231192450.png)

## コーヒーの名前を送る
スターバックスで販売されているコーヒー豆の名前を送ると，そのコーヒーの特徴，キーワード，酸味とコクのレベル，相性の良いフレーバーを返してくれます．
![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20191231/20191231192443.png)

## 雑談ができる
ただカスタマイズ教えてくれるだけだとつまらないと思ったので，雑談ができるBotにしました．AIとお話できます．リクルートの提供するA3RTのTalk APIを使いました．
![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20191231/20191231192437.png)

# 環境
- Heroku
- LINE Messaging API
- Flask

# 実装
## LINE Messaging APIとHeroku
LINE Messaging APIとHerokuの登録と設定を行います．
以下のサイトを参考にしました．

- [https://miyabi-lab.space/blog/21:title]

- [https://qiita.com/nkjm/items/38808bbc97d6927837cd:title]


## ファイルの作成

- runtime.txt：Pythonのバージョンを記載

- requirements.txt：インストールするライブラリを記載

- Procfile：プログラムの実行方法を記載

- main.py：メインとなるプログラムを記載

## main.pyの作成
今回作成したLINEBotは雑談のできるチャットボットをまず作成し，あらかじめ決めたキーワード(スタバのドリンク)を送るといくつかあるおすすめカスタマイズを一つランダムで返すという簡単な仕組みにしました．

本当は勉強がてらスクレイピングやらSQLやら触りたかったんですが，そこまでデータ数もなかったので自分で用意してしまいました．．．

最もメインとなる部分は以下です．
``` python
@handler.add(MessageEvent,message=TextMessage)
def handle_message(event):
    #入力された文字列を格納
    push_text = event.message.text

    #A3RTのTalkAPIにより応答
    reply_text = talkapi_response(push_text)

    #リプライ部分の記述
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=reply_text)
    )

```

A3RTのTALK apiを利用して返信する部分の実装はこのサイトを参考にしました．

- [https://qiita.com/neonsk/items/2dbd892191f379c81776:title]


続いて，おすすめカスタマイズを返す部分を加えていきます．

キャラメルフラペチーノのカスタマイズに注目していきます．

``` python
# キャラメルフラペチーノ
CRF_custom = [
    "【キャラメルフラペチーノのカスタマイズ】\n<カスタム内容①>",
    "【キャラメルフラペチーノのカスタマイズ】\n<カスタム内容②>",
    "【キャラメルフラペチーノのカスタマイズ】\n<カスタム内容③>",
    "【キャラメルフラペチーノのカスタマイズ】\n<カスタム内容④>",
    "【キャラメルフラペチーノのカスタマイズ】\n<カスタム内容⑤>"
]


for text in ["キャラメルフラペ", "キャラメルふらぺ"]:
        if text in push_text:
            # NumPy の random.choice で配列からランダムに取り出し
            reply_text = np.random.choice(CRF_custom)
```

あらかじめ定めたキーワードがユーザの送信メッセージに含まれる場合は"reply_text"にカスタマイズ内容が上書きされて返されるという簡単な仕組みです．

# まとめ
今回初めてLINEBotを作ってみたのですが，LINEのチャット画面がUIとなることでフロント部分を考えなくて良いのは楽で良いなと思いました．また，APIを叩けば発送次第でなんでも簡単に作れてしまうのでLINEBotはプログラミング初心者にもおすすめかなと感じます．

「近くのスタバ」と送れば，最寄りのスタバの位置情報を返してくれる機能も付けようかと思ったんですが，今回はやめてとりあえず公開してみました．

あと，一応非公式のBotなのであくまでお遊び程度で使っていただければというのと，期間限定メニューには対応しておらずオールシーズン販売されているコアメニューのみ対応しております．ただ，コアメニューでもココアやホットティーなど対応していないものも一部ございますのでご了承ください．


