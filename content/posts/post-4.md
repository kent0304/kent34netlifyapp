---
template: SinglePost
title: Chainerのトレーナを使った学習
slug: '4'
tags: ["chainer", "ml"]
status: Published
date: '2019-10-05'
featuredImage: 'https://preferred.jp/wp-content/uploads/2019/07/thumb_news_logo_chainer.jpg'
categories:
  - category: ML
---


トレーナとエクステンションを使った Chainer の実装方法について備忘録用にまとめます。

# 1. Chainerや周辺ライブラリの準備
```python
import chainer
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

# 2. データセットの準備
Irisデータセットの読み込みから分割まで行います。

## 2.1. データの取得
``` python
from sklearn.datasets import load_iris

# Iris データセットの読み込み
dataset = load_iris()
# 入力値と目標値を別々の変数に変換
x = dataset.data
t = dataset.target
#Chainerがデフォルトでもちいるfloat32型に変換
x = np.array(x,np.float32)
t = np.array(t,np.int32)
```

以下のような書き方もできます。


【別の書き方】
``` python
from sklearn.datasets import load_iris

# Iris データセットの読み込み
x, t = load_iris(return_X_y=True)
# Chainer がデフォルトで用いる float32 型へ変換
x = np.array(x, np.float32)
t = np.array(t, np.int32)
```

データを与えるとき引数を "return_X_y=True" とすることでdataとtargetを直接取得できるようになります。

 
Chainer が用意する "Tuple Dataset" を使います。これは入力値を並べた配列と目標値を並べた配列を与えることで、一つ一つを取り出して対応するペアにして返してくれるものです。 

``` python
from chainer.datasets import TupleDataset
dataset = TupleDataset(x,t)
```

## 2.2. データの分割
続いて、データセットを訓練用、検証用、テスト用の3つに分割します。
``` python
from chainer.datasets import split_dataset_random
n_train = int(len(dataset)*0.7)
n_valid = int(len(dataset)*0.1)
train, valid_test = split_dataset_random(dataset, n_train, seed=0)
valid, test = split_dataset_random(valid_test, n_valid, seed=0)
```

データセットの中の70%を"train"に、残りは"valid_test"にランダムに振り分けます。"valid_test"も同様に"valid"と"test"に振り分けます。

3つ目の引数"seed=0"は固定して指定することで、何度も実行する度に振り分け方が変わってしないようにするためのものです。

## 2.3. Iteratorの利用
イテレータを使うと、順番のシャッフルやバッチサイズ個だけデータをまとめて返すなどの操作を自動的に行なえます。ここでは一番シンプルであると言われている"SerialIterator" を利用します。

学習ループを書く際に便利
next() メソッドで順番にミニバッチを返してくれる
1エポックが終了すると自動的にデータをシャッフルしてくれる
repeat 引数は全データを取り出した後に次のnext() の呼び出しに対して再びデータの先頭から取り出してミニバッチを返すかどうか指定できる
shuffle 引数はデータセット内のデータをエポックごとにシャッフルするかどうかを指定できる

``` python
from chainer import iterators

batchsize = 32

train_iter = iterators.SerialIterator(train, batchsize)
valid_iter = iterators.SerialIterator(valid, batchsize, shuffle=False, repeat=False)
```

 
# 3. ネットワークの準備
``` python
import chainer.links as L
import chainer.functions as F 

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
```


- super( )メソッドを用いると親クラスの明言を避けることができます。(複数)
  - [stackoverflow](https://stackoverflow.com/questions/576169/understanding-python-super-with-init-methods:embed:cite)

- 引数にNoneが使われると、初めてデータがこのネットワークに渡された時に、自動的にこの層の入力側のノード数を決定することができます。

 

# 4. アップデータオブジェクトの作成
アップデータを用いると一連の訓練のループを書く必要がなく簡潔にまとめることができます。アップデータには「イテレータ(データセットを持つ)」と「オプティマイザ(ネットワークを持つ)」の２つを渡す必要があります。

``` python
from chainer import optimizers
from chainer import training

# ネットワークを作成
predictor = MLP()

# L.Classifier でラップし、損失の計算などをモデルに含める
net = L.Classifier(predictor)

# 最適化手法を選択してオプティマイザを作成し、最適化対象のネットワークを持たせる
optimizer = optimizers.MomentumSGD(lr=0.1).setup(net)

# アップデータにイテレータとオプティマイザを渡す
updater = training.StandardUpdater(train_iter, optimizer, device=-1) # device=-1でCPUでの計算実行を指定
```


MLPはデータを入力して予測値を計算するネットワークそのもの
損失計算も考慮するために "L.Classifier" を利用。入力値と目標値を引数にとり、指定された目的関数の計算を行って、損失を返すようにネットワークをラップする。
デフォルトの 目的関数はソフトマックス交差エントロピー("F.softmax_cross_entropy")
 

# 5. トレーナの作成と終了タイミングの指定
``` python
trainer = training.Trainer(updater, (30, 'epoch'), out='results/iris_result1')
```

訓練を開始するために、トレーナを作成します。

トレーナは、アップデータを使って訓練のイテレーションを回す。
繰り返しの終了タイミングは"Trainer"の第２引数である"stop_trigger"に(整数, 単位)というタプルを渡して指定。
(100, 'epoch') : 100エポックで訓練終了
(100, 'iteration') : 100イテレーションで訓練終了
"stop_trigger"を指定しないと永遠にループは回り続ける。
 

# 6. エクステンションの指定
エクステンションを使えば付加的な処理を追加することができます。

``` python
from chainer.training import extensions
```

## LogReport
``` python
trainer.extend(extensions.LogReport(trigger=(1, 'epoch'), log_name='log'))
```

 指定された周期で、損失の値や正解率などを自動的に集計し、out引数で指定したディレクトリに"log_name"引数に指定されたファイル名で保存されます。

## Snapshot
``` python
trainer.extend(extensions.snapshot(filename='snapshot_epoch-{.updater.epoch}'))
```
トレーナオブジェクトを指定されたタイミング(デフォルト:1エポックごと)で保存します。"filename"という引数に保存時のファイル名を指定できます。

## dump_graph
``` python
trainer.extend(extensions.dump_graph('main/loss'))
```

 指定されたVariableオブジェクトからオブジェクトからたどることができる計算グラフをGraphviz描画可能なDOT形式で保存します。

## Evaluator
``` python
trainer.extend(extensions.Evaluator(valid_iter, net, device=-1), name='val')
```

検証用データセットのイテレータと、訓練を行うネットワークのオブジェクトを渡しておくことで、訓練中に指定されたタイミングで検証用データセットを用いたネットワークの評価を行います。

## PrintReport
```python
trainer.extend(extensions.PrintReport(['epoch', 'iteration', 'main/loss', 'main/accuracy', 'val/main/loss', 'val/main/accuracy', 'fc1/W/data/mean', 'elapsed_time']))
```
"LogReport"で集計した値を標準出力に出力します。 どの値を出力するかをリストの形で与えます。

## PlotReport
```python
trainer.extend(extensions.PlotReport(['fc1/W/grad/mean'], x_key='epoch', file_name='mean.png'))
trainer.extend(extensions.PlotReport(['main/loss', 'val/main/loss'], x_key='epoch', file_name='loss.png'))
trainer.extend(extensions.PlotReport(['main/accuracy', 'val/main/accuracy'], x_key='epoch', file_name='accuracy.png'))
```

第 1 引数に与えられるリストで指定された値の時間変化をグラフに描画し、出力ディレクトリに"filename"引数に指定されたファイル名で画像として保存します。 

1 つ目は、1 層目の全結合層のパラメータが持つ勾配の平均値の変遷を描画したグラフを "mean.png" に保存します。

2 つ目は、訓練用データセットと検証用データセットのそれぞれで計算した損失の値の変遷を 1 つのグラフにまとめ、"loss.png" という画像ファイルに保存します。

3 つ目は、訓練用・検証用データセットのそれぞれで計算した正解率の値の変遷を 1 つのグラフにまとめ、"accuracy.png" に保存します。

## ParameterStatistics
```python
trainer.extend(extensions.ParameterStatistics(net.predictor.fc1, {'mean': np.mean}, report_grads=True))
```
指定した "Link" が持つパラメータの平均・分散・最小値・最大値などの統計値を計算し、レポートします。 パラメータが発散していないかなどをチェックするのに便利です。

 

# 9. 訓練開始
```python
trainer.run()
```

## 9.1. 計算グラフの可視化
MLPというネットワークがどのような構造になっているのか可視化することが可能です。"dump_graph" エクステンションによって出力されたDOTファイルをpydotパッケージによって画像に変換します。

【Pillow の使い方】
- [https://qiita.com/uosansatox/items/4fa34e1d8d95d8783536:title]
- [https://www.python.ambitious-engineer.com/archives/1815:title]


```python
import pydot
from PIL import Image

file = pydot.graph_from_dot_file('results/iris_result2/cg.dot')
file[0].write_png('graph.png')
im = Image.open('graph.png')
im.show()
```


 

# 10. 訓練の早期終了
過学習を防ぐための正規化の手法の一つです。訓練用データセットばかりに特化したモデルとなり、テスト用データセットで正しく予測ができなくなってしまう前に訓練を途中で終了させる方法です。

- "EarlyStoppingTrigger"オブジェクトを作成し、トレーナに渡します。
  - どの指標で早期終了の判断を行うか、訓練回数の最大値の指定をします。

```python
from chainer.training.triggers import EarlyStoppingTrigger

trigger = EarlyStoppingTrigger(monitor='val/main/loss', check_trigger=(1, 'epoch'), patients=5, max_trigger=(30, 'epoch'))
trainer = training.Trainer(updater, trigger, out='results/iris_result3')
```

 再びエクステンションの設定をします。

```python
from chainer.training import extensions

trainer.extend(extensions.LogReport(trigger=(1, 'epoch'), log_name='log'))
trainer.extend(extensions.Evaluator(valid_iter, net, device=-1), name='val')
trainer.extend(extensions.PlotReport(['main/loss', 'val/main/loss'], x_key='epoch', file_name='loss.png'))
trainer.extend(extensions.PlotReport(['main/accuracy', 'val/main/accuracy'], x_key='epoch', file_name='accuracy.png'))
trainer.extend(extensions.PrintReport([
'epoch', 'main/loss', 'main/accuracy',
'val/main/loss', 'val/main/accuracy', 'elapsed_time']))
```
 

 訓練を開始します。

```python
trainer.run() 
```

- "monitor" に早期終了の判断に使われる指標を入力します。
  - これまでの"monitor" の値の平均値これまでの最良のものよりも悪化すれば訓練は停止されます。

- "check_trigger" はレポートされている変数の値をチェックするタイミングの指定をします。

- "max_trigger" ループの最大イテレーション数、最大エポック数を指定します。

- "patients" は早期終了のしやすさを指定します。小さければ小さいほど早期終了します。
  - もし値が5なら、チェック時にそれまでの値を更新できないことが5回連続で続いた場合に限って早期終了となります。