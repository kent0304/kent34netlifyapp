import React from 'react'
import './Portfolio.css'

export default () => (
  <div className="contents">
      <h1>About</h1>
        <img src="https://pbs.twimg.com/profile_images/1342444375603773441/gL9CqC-r_400x400.jpg" className="icon" />
        <p>kent</p>
        <p>自然言語処理の研究をしている修士課程1年生です。</p>
        <ul>
          <li><a href="https://www.linkedin.com/in/kento-tanaka-9aa1a61a0/">linkedin</a></li>
          <li><a href="https://github.com/kent0304">github</a></li>
          <li><a href="https://twitter.com/kent0304">twitter</a></li>
          <li><a href="https://www.linkedin.com/in/kento-tanaka/detail/overlay-view/urn:li:fsd_profileTreasuryMedia:(ACoAAC8DpBIBnE3SacVmALSo1TH0jGEHtbyMWzc,1611656106674)/">CV</a></li>
      </ul>

      <h1>Education</h1>
      <ul>
          <li>
              <h3>Kyoto University</h3>
              <p>M.S. in Computer Science</p>
              <p>2020.04 - 2022.03</p>
          </li>
          <li>
            <h3>Meiji University</h3>
            <p>B.S. in Mechanical Engineering Informatics</p>
            <p>2016.04 - 2020.03</p>
          </li>
          <li>
              <h3>University of California, Berkeley</h3>
              <p>Summer Sessions</p>
            <p>2017.04 - 2017.08</p>
          </li>
      </ul>

      <h1>Skill</h1>
        <h2>Languages</h2>
        <ul>
            <li>Python</li>
            <li>Ruby</li>
            <li>Go</li>
            <li>HTML/CSS/Javascript(EC6)</li>
            <li>SQL</li>
        </ul>
        <h2>Frameworks</h2>
        <ul>
            <li>PyTorch</li>
            <li>Chainer</li>
            <li>React</li>
            <li>Ruby on Rails</li>
            <li>Docker</li>
        </ul>
            <h2>Interests</h2>
            <ul>
                <li>Natural Language Processing</li>
                <li>Machine Learning</li>
                <li>Web Frontend</li>
            </ul>
        

      <h1>Internship</h1>
      <ul>
          <li>
              <h3>Nikkei, Inc.</h3>
              <p>2020.08 (1 week) | Hackathon</p>
          </li>
          <li>
              <h3>Rakuten Inc.</h3>
              <p>2020.08 (2 weeks) | Hackathon</p>
          </li>
          <li>
              <h3>MonotaRO Co., Ltd.</h3>
              <p>2020.09 (1 week) | Data Scientist</p>
          </li>
          <li>
              <h3>Cookpad Inc.</h3>
              <p>2020.09 (1 week) | Web Engineer</p>
          </li>
          <li>
              <h3>Benesse Corporation</h3>
              <p>2020.09 (2 days) | Hackathon</p>
          </li>
      </ul>
      <h1>Work Experience</h1>
      <ul>
          <li>
              <h3>Cookpad Inc.</h3>
              <p>2020.11 - 2021.02 | Machine Learning Engineer</p>
          </li>
          <li>
              <h3>Recruit Holdings Co.,Ltd.</h3>
              <p>2021.02 - 2021.03 | Machine Learning Engineer</p>
          </li>
      </ul>
      <h1>Award</h1>
      <ul>
          <li>楽天二子玉川夏の陣 優勝</li>
          <li>Benesse Digital Plan Workshop 優秀賞</li>    
      </ul>
      <h1>Products</h1>
      <ul>
          <li>
              <h3>写真でボケるAI</h3>
              <ul>
                <li><a href="https://kent34.netlify.app/19/">ブログ</a></li>
                <li><a href="https://github.com/kent0304/Image2Boke">GitHub</a></li>
              </ul>
              <p>画像キャプション生成により、与えられた写真に対してユーモアある一文を生成する。</p>
          </li>
          <li>
              <h3>対話システム</h3>
              <ul>
                <li><a href="https://kent34.netlify.app/13/">ブログ</a></li>
                <li><a href="https://github.com/kent0304/dsbook">GitHub</a></li>
              </ul>
              <p>Twitterから対話データを収集しseq2seqに学習させる。</p>
          </li>
          <li>
              <h3>レシピ画像検索</h3>
              <ul>
                <li><a href="https://github.com/kent0304/Text2ImageRetrieval">GitHub</a></li>
              </ul> 
              <p>レシピテキスト（クエリ）をもとに適切な画像をデータセットから返す。</p>
          </li>
          <li>
              <h3>キーフレーズ抽出</h3>
              <ul>
                <li><a href="https://kent34.netlify.app/16/">ブログ</a></li>
              </ul> 
              
              <p>レビュー文書からキーフレーズを抽出する。</p>
          </li>
          <li>
              <h3>こどもニュース</h3>
              <ul>
                <li><a href="https://kent34.netlify.app/14/">ブログ</a></li>
              </ul> 
              
              <p>短期インターンシップで作成したサービスのプロトタイプ。記事の要約、平易化、感情分析を行うwebサービス。</p>
          </li>
          <li>
              <h3>Amato MUSIC</h3>
              <ul>
                <li><a href="https://kent34.netlify.app/15/">ブログ</a></li>
                <li><a href="https://github.com/kent0304/Amato-MUSIC">GitHub</a></li>
              </ul>
              <p>楽天のハッカソン二子玉川夏の陣2020での優勝作品。人と人を音楽を通してつなげるwebサービス。</p>
          </li>
          <li>
              <h3>Table Share</h3>
             
              <p>クックパッドサマーインターンシップで開発したwebサービス。作った手料理の写真を手軽に投稿できる。</p>
          </li>
          <li>
              <h3>オンライン英会話サービスekubo</h3>
             
              <p>"ekubo"はinprog株式会社の事業の一つ．英会話講師の国立大学の留学生によるオンライン英会話サービス</p>
          </li>
          <li>
              <h3>スタバおすすめカスタマイズbot</h3>
              <ul>
                <li><a href="https://kent34.hatenablog.com/entry/2020/01/01/011740">ブログ</a></li>
                <li><a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=458jtgfa&openerPlatform=native&openerKey=home%3Arecommend">LINE Bot</a></li>
              </ul> 
              <p>画像キャプション生成により、与えられた写真に対してユーモアある一文を生成する。</p>
          </li>
 
      </ul>
  </div>
)
