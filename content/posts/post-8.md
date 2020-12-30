---
template: SinglePost
title: Scssでのurl()での相対パスの指定方法
slug: '8'
tags: ["css", "web"]
status: Featured / Published
date: '2020-04-30'
featuredImage: 'https://ucarecdn.com/43614a0b-9a59-4a08-ad5c-428574b3a2c4/'
categories:
  - category: Web
---

# ハマりポイント
初投稿です．それにしても今日暑い

ハマりポイントはこれね．
[style.scssの設定を全てのscssで共有したい](https://github.com/deBroglieeeen/ekubo/issues/1)

文字情報やらカラー情報は'style.scss'に，全体の'App.scss'では

```scss
@import './style.scss';
```
を呼んで，綺麗に保ちたいけど，どうもエラーが出てしまう．

ちなみに，'style.scss'は以下．
```scss
@import './mixin/fonts';

@include font-face('Bellota', '../public/fonts/Bellota-Bold', bold, null, ttf);
// 以下略
```
# 解決策
表示されていたエラーをよく見ると，
`Module not found: Can't resolve './public/fonts/Bellota-Bold' in '/Users/munekiyonaoto/Desktop/inprog/ekubo/src'`
と出てくる．

これは，SassのコンパイラがURLの書き換えをまだサポートし切れていないことが原因みたい．
なのでここでは，次のようにする必要があるみたい．
```scss
@import './mixin/fonts';
$font-path: '../public/fonts/';
@include font-face('Bellota', "`#{$font-path}`Bellota-Bold", bold, null, ttf);
// 以下略
```
こうすると，ちゃんと相対パスを読み込んでくれました．

## 参考
[webpack+Sass+reactでカスタムフォントを使う](https://blog.mitsuruog.info/2016/10/webpack-with-custom-font)
