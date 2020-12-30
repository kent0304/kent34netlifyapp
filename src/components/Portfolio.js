import React from 'react'
import './Portfolio.css'

export default () => (
  <div className="contents">
      <h1>About</h1>
        <img src="https://pbs.twimg.com/profile_images/1342444375603773441/gL9CqC-r_400x400.jpg" className="icon" />
        <p>kent</p>
        <p>自然言語処理の研究をしている大学院生</p>
        <ul>
          <li><a href="https://www.linkedin.com/in/kento-tanaka-9aa1a61a0/">linkedin</a></li>
          <li><a href="https://github.com/kent0304">github</a></li>
          <li><a href="https://twitter.com/kent0304">twitter</a></li>
          <li><a href="https://www.linkedin.com/posts/kento-tanaka_resume-activity-6735418913204523008-_1K-">CV</a></li>
      </ul>

      <h1>Education</h1>
      <ul>
          <li>Kyoto University</li>
          <li>Meiji University</li>
          <li>University of California, Berkeley</li>
      </ul>
      <h1>Internship</h1>
      <ul>
          <li>Nikkei</li>
          <li>Rakuten</li>
          <li>MonotaRO Co., Ltd.</li>
          <li>Cookpad Japan</li>
          <li>Benesse</li>
      </ul>
      <h1>Work Experience</h1>
      <ul>
          <li>Cookpad Japan</li>
          <li>Recruit</li>
      </ul>
      <h1>Award</h1>
      <ul>
          <li>Benesse Digital Plan Workshop 優秀賞</li>
          <li>楽天二子玉川夏の陣 優勝</li>
      </ul>
      <h1>Products</h1>
      <ul>
          <li>ボケてAI</li>
          <li>対話システム</li>
          <li>こどもニュース</li>
          <li>Amato MUSIC</li>
          <li>Table Share</li>
          <li>スタバおすすめカスタマイズbot</li>
      </ul>
  </div>
)
