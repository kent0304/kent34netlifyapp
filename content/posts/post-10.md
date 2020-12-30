---
template: SinglePost
title: "Reactでグローバルメニューを固定してスクロールするとデザインの変わるデザインの実装"
slug: '10'
tags: ["react", "フロントエンド"]
status: Featured / Published
date: '2020-05-13'
featuredImage: './images/img-10/ekubo.png'
excerpt: none
categories:
  - category: Web
meta:
  canonicalLink: ''
  description: test meta description
  noindex: false
  title: test meta title
---

# 目標
Webサイトのデザインにおいて，グローバルメニュー(ヘッダーメニュー)はユーザーがそのサイトを利用する上で一番注目する箇所なのでUXを大きく左右する可能性があります．

今回はスクロール時にグローバルメニューを上に固定し，色を変化(透明→有色)させる実装をReactで行います。

![グローバルメニュー gif](./images/img-10/ekubo.gif)


# 方針
まず，グローバルメニューを一つのコンポーネントとして考えるのですが，スクロール時とそうでない時(サイトの一番上にいる時)とで条件分岐して考えたいので，stateを利用します．よって，今回はclassを用いてコンポーネント化します．

# 実装
今回はTypeScriptを使います．
## propsとstateの型宣言
propsは後々使うかもしれませんが今回は空白にしておきます．
```tsx
type NavbarProps = {

}

type NavbarState = {
  turningScrollpos: any,
  scrolled: boolean
}
```
## stateの初期化
```tsx
class Navbar extends React.Component<NavbarProps, NavbarState>  {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      turningScrollpos: 30,
      scrolled: false
    };
  }

// 以下略
}
```
ここで`turningScrollpos`がサイトの上からスクロールした量を表しています．よって，サイトの一番上から30だけしたにスクロールした箇所を指します．
`scrolled`はboolean形でtrueの時スクロールした状態を表し，falseはスクロールする前を表すようにしたいので，ここで初期値をfalseとします．(後々，スクロール量が0から30までをfalse, 30以上になる時をtrueになるようにします．)

## スクロールした時の状態を関数化
```tsx
// Adds an event listener when the component is mount.
  // スクロールを認知したらhandleScrollを実行
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // スクロールしているのか否か判断する関数
  handleScroll = () => {
    // window.pageYOffsetは垂直方向のスクロール量
    // currentScrollPosはスクロールした量
    const currentScrollPos = window.pageYOffset;
    const scrolled = this.state.turningScrollpos < currentScrollPos;

    this.setState({
      scrolled
    });
  };
```
ここで，componentDidMount()とcomponentWillUnmount()はReactのライフサイクルメソッドです．詳しくは[こちらの記事](https://iktakahiro.hatenablog.com/entry/2018/05/28/123000)をどうぞ．

また，addEventListenerやremoveEventListenerはJavaScriptからさまざまなイベント処理の実行を可能にするメソッドです．詳しくは[こちらの記事](https://www.sejuku.net/blog/57625)をどうぞ．

そして`handleScroll`がスクロールしたのかどうかを判断する関数です．`window.pageYOffset`は縦方向のスクロール量を表します．[詳しくはこちら](https://into-the-program.com/pagexoffset-pageyoffset/)．
currentScrollPos（スクロールした量）が最初に定めたポイント(turningScrollpos)を上回る時点をターニングポイントとします．

## render()部分
```tsx
render() {
    return (
      <header className={`App-header navbar-fixed ${this.state.scrolled ? "navbar-hidden" : ""}`}>

        <div className="container">
           <div className="name-box" >
             <a href="#">
               <h2 className="site-name">ekubo</h2>
             </a>
           </div>
           <nav className="menu">
             <ul>
                <li><RoundButton link="#" title="サービス概要"/></li>
                <li><RoundButton link="#" title="料金プラン"/></li>
                <li><RoundButton link="#" title="お申し込み"/></li>
                <li><RoundButton link="#" title="講師登録"/></li>
              </ul>
           </nav>
        </div>

      </header>


    );
  }
```
ここまで長かったですが，目標としてはスクロールした状態なのかどうかを判断したboolean型の`scrolled`を用意することでした．したがって，render部分では`scrolled`を上手く使って表示を切り替えるだけです．今回は三項演算子を使っています．ここで決めたclassNameに従って今回はscssファイルを以下のようにしました．
```scss
.navbar-fixed {
  position: fixed;
  width: 100%;
  top: 0;
  transition: 0.6s;
}

.navbar-hidden {
  background-color: $light-cream;
  transition: 0.6s;
}
```
## 全コード
最後に，Navbar.tsxの全コードをまとめておきます．
```tsx
import React, { Props } from 'react';
import './App.scss';
import './Navbar.scss';
import RoundButton from './round-button';

type NavbarProps = {

}

type NavbarState = {
  turningScrollpos: any,
  scrolled: boolean
}

class Navbar extends React.Component<NavbarProps, NavbarState>  {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      turningScrollpos: 30,
      scrolled: false
    };
  }

  // Adds an event listener when the component is mount.
  // スクロールを認知したらhandleScrollを実行
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // スクロールしているのか否か判断する関数
  handleScroll = () => {
    // window.pageYOffsetは垂直方向のスクロール量
    // currentScrollPosはスクロールした量
    const currentScrollPos = window.pageYOffset;
    const scrolled = this.state.turningScrollpos < currentScrollPos;

    this.setState({
      scrolled
    });
  };

  render() {
    return (
      <header className={`App-header navbar-fixed ${this.state.scrolled ? "navbar-hidden" : ""}`}>

        <div className="container">
           <div className="name-box" >
             <a href="#">
               <h2 className="site-name">ekubo</h2>
             </a>
           </div>
           <nav className="menu">
             <ul>
                <li><RoundButton link="#" title="サービス概要"/></li>
                <li><RoundButton link="#" title="料金プラン"/></li>
                <li><RoundButton link="#" title="お申し込み"/></li>
                <li><RoundButton link="#" title="講師登録"/></li>
              </ul>
           </nav>
        </div>

      </header>


    );
  }

}

export default Navbar;

```

[完成形こんな感じ](https://s27.aconvert.com/convert/p3r68-cdx67/yad4x-o81a5.gif)



# 参考文献

[className内で条件分岐](https://qiita.com/endam/items/1bde821c4b29f9b663da)
[Hide menu when scrolling in React.js](https://dev.to/guimg/hide-menu-when-scrolling-in-reactjs-47bj)
[window.pageYOffset](https://into-the-program.com/pagexoffset-pageyoffset/)
[addEventListenerについて](https://www.sejuku.net/blog/57625)
[ReactのComponentサイクル](https://iktakahiro.hatenablog.com/entry/2018/05/28/123000)
