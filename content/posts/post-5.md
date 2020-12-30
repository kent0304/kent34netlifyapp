---
template: SinglePost
title: Chainerを使った回帰多層パーセプトロン
slug: '5'
tags: ["chainer", "ml"]
status: Featured / Published
date: '2019-11-11'
featuredImage: 'https://preferred.jp/wp-content/uploads/2019/07/thumb_news_logo_chainer.jpg'
categories:
  - category: ML
---

# はじめに
機械系の学科の研究室で設計システムの研究の手法の一つとして、ニューラルネットワークを使って回帰問題に取り組みます。初めてニューラルネットワークを実装するのですがChainerを使ってみました。「Chainer Tutorial」は初学者でもわかりやすく助かりました!![https://tutorials.chainer.org/ja/tutorial.html:embed:cite]

チュートリアルではネット上のデータセットを用いていたのですが、自分でデータを用意する方法が記載されていなかったのでまとめておきます。
ネットワークの準備段階以降のコードも載せておきますが、チュートリアルをみた方が早いと思います。


# 適用事例
## シャープペンシルの設計
シャープペンシルの設計問題を取り上げます。被験者にはシャープペンシルの設計パラメータ(グリップ素材、グリップ直径、グリップの形状)を変えた9つの試料を試し書きしてもらい、各試料の評価をしてもらいます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20191111/20191111111757.jpg)

ここでは手法の前段階で、ユーザに求められるニーズが「疲れない」「書きやすい」「持ちやすい」の3つが最も大きいことがわかっているので、これらを5点満点で評価してもらいます。
また、各ユーザにはそれぞれの嗜好があることから、本手法の前段階においてユーザのクラスタリングがなされ、グループ分けが既になされてるものとします。

## 入力値と目標値
今回の入力値はシャープペンシルの設計パラメータの値とするので以下の表のように「1, 2, 3」と対応するものとします。
![](https://cdn-ak.f.st-hatena.com/images/fotolife/k/kent34/20191111/20191111112603.png)

また、目標値は被験者の評価した5点満点の値をそのまま利用します。

# 実装
** 必要なものインポート
``` python
import chainer
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

## データを取り込む
入力値と出力値をCSVにして読み込む。
``` python
input_data = pd.read_csv('pen_nn_input.csv', header=0)
```

このとき、"header=0"は省略可能。CSVファイルにおいて最初の行にタイトルがある場合、行番号を0始まりで指定するという意味があります。
詳しくはこちらがわかりやすいです。
[https://note.nkmk.me/python-pandas-read-csv-tsv/:embed:cite]

## 入力値と目標値の分割
``` python
x = input_data.loc[:, ["Material","Diameter","Shape"]]
t = input_data.loc[:, ["Tired", "Write", "Hold"]]
```

ここではpandasのlocで列ラベルを指定しデータを参照します。
詳しくはこちら↓
[http://ailaby.com/lox_iloc_ix/:title]

``` python
x = np.array(x,np.float32)
t = np.array(t,np.float32)
```

またChainerがデフォルトで用いることのできるfloat32型に変換しておきます。

``` python
from chainer.datasets import TupleDataset
dataset = TupleDataset(x,t) 
```

TupleDatasetはchainer.datasetsというモジュールないのクラスで、入力値と目標値を一つずつセットにしてまとめるようなイメージです。

``` python
from chainer.datasets import split_dataset_random
train, valid = split_dataset_random(dataset, int(len(dataset) * 0.7), seed=0) 
```
ここでデータセット訓練用のtrainと検証用のvalidに分割します。この時のseedに0を代入することで抽出するデータを固定します。

## イテレータの作成
``` python
from chainer import iterators
batchsize = 8
train_iter = iterators.SerialIterator(train, batchsize, shuffle=True, repeat=True)
valid_iter = iterators.SerialIterator(valid, batchsize, shuffle=True, repeat=True)
```
何周も何周もデータを繰り返し読み込む必要がある場合はrepeat引数の値をTrueとし、全データを1周読み込み、それ以上データを取り出したくない場合にはFalseとする。
また、デフォルトではTrueなので省略可能。

## ネットワークの準備
``` python
import chainer.links as L
import chainer.functions as F

# ネットワークの定義
class MLP(chainer.Chain):
    def __init__(self, n_mid_units=100, n_out=3):
        super().__init__()

        with self.init_scope():
            self.fc1 = L.Linear(None, n_mid_units)
            self.fc2 = L.Linear(n_mid_units, n_mid_units)
            self.fc3 = L.Linear(n_mid_units, n_out)

        def forward(self, x):
            h = F.relu(self.fc1(x))
            h = F.relu(self.fc2(h))
            h = self.fc3(h)
            return h

net = MLP() #インスタンス化

from chainer import optimizers
from chainer.optimizer_hooks import WeightDecay

# 最適化手法の選択
optimizer = optimizers.MomentumSGD(lr=0.001, momentum=0.9)  # 学習率を 0.01 に設定
optimizer.setup(net)

for param in net.params():
    if param.name != 'b':  # バイアス以外だったら
        param.update_rule.add_hook(WeightDecay(0.0001))  # 重み減衰を適用

# バッチサイズ
n_batch = 4
# エポック数
n_epoch = 100


# ログ
results_train, results_valid = {}, {}
results_train['loss'], results_train['accuracy'] = [], []
results_valid['loss'], results_valid['accuracy'] = [], []

count = 1

train_batch = train_iter.next()
x_train, t_train = chainer.dataset.concat_examples(train_batch)

```


## 学習開始
``` python
for epoch in range(n_epoch):

    while True:

        # ミニバッチの取得
        train_batch = train_iter.next()

        # x と t に分割
        x_train, t_train = chainer.dataset.concat_examples(train_batch)


        # 予測値と目的関数の計算
        y_train = net(x_train)
        loss_train = F.mean_squared_error(y_train, t_train)


        # 勾配の初期化と勾配の計算
        net.cleargrads()
        loss_train.backward()

        # パラメータの更新
        optimizer.update()

        # カウントアップ
        count += 1

        # 1エポック終えたら、valid データで評価する
        if train_iter.is_new_epoch:

            # 検証用データに対する結果の確認
            with chainer.using_config('train', False), chainer.using_config('enable_backprop', False):
                x_valid, t_valid = chainer.dataset.concat_examples(valid)
                y_valid = net(x_valid)
                loss_valid = F.mean_squared_error(y_valid, t_valid)


            # 結果の表示
            print('epoch: {}, iteration: {}, loss (train): {:.4f}, loss (valid): {:.4f}'.format(epoch, count, loss_train.array.mean(), loss_valid.array.mean()))

            # 可視化用に保存
            results_train['loss'] .append(loss_train.array)
            results_valid['loss'].append(loss_valid.array)


            break
```

## 目的関数の可視化とネットワークの保存
``` python
#目的関数(損失)の可視化
plt.plot(results_train['loss'], label='train')  # label で凡例の設定
plt.plot(results_valid['loss'], label='valid')  # label で凡例の設定
plt.legend()  # 凡例の表示
plt.show()

# ネットワークの保存
chainer.serializers.save_npz('pen_nn.net', net)
```

