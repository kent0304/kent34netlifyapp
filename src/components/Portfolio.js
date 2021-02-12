import React from 'react'
import './Portfolio.css'
import 'semantic-ui-css/semantic.min.css';

export default () => (
    <div className="contents-portfolio">
        <div className="section">
            <div className="section-heading">
                <h1 className="hedding-primary">About</h1>
            </div>
            <div className="about-item">
                <div className="about-image-wrapper">
                    <img className="ui small circular image" src="https://pbs.twimg.com/profile_images/1342444375603773441/gL9CqC-r_400x400.jpg" />
                </div>
                
                <p>kent</p>
                <p>自然言語処理の研究をしている修士課程1年生です。</p>
                <div className="ui list">
                    <div className="item">
                        <i class="linkedin icon" />
                        <div className="content">
                            <a href="https://www.linkedin.com/in/kento-tanaka-9aa1a61a0/">linkedin</a>
                        </div>
                    </div>
                    <div className="item">
                        <i class="github icon" />
                        <div className="content">
                            <a href="https://github.com/kent0304">GitHub</a>
                        </div>
                    </div>
                    <div className="item">
                        <i class="university icon" />
                        <div className="content">
                            <a href="https://drive.google.com/file/d/1mt0D_ftFTytFrneuhAFNJ-kNDeRh40Ec/view?usp=sharing">CV</a>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>


        <div className="section">
            <div className="section-heading">
                <h1 className="hedding-primary">Education</h1>
            </div>
                <div className="ui list">
                    <div className="item">
                        <i class="university icon" />
                        <div className="content">
                            <h3>Kyoto University</h3>
                            <div className="description">
                                <p>M.S. in Computer Science</p>
                                <p>2020.04 - 2022.03</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <i class="university icon" />
                        <div className="content">
                            <h3>Meiji University</h3>
                            <div className="description">
                                <p>B.S. in Mechanical Engineering Informatics</p>
                                <p>2016.04 - 2020.03</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <i class="university icon" />
                        <div className="content">
                            <h3>University of California, Berkeley</h3>
                            <div className="description">
                                <p>Summer Sessions</p>
                                <p>2017.04 - 2017.08</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
      
        <div className="section">
            <div className="section-heading">
                <h1 className="hedding-primary">Skill</h1>
            </div>
    
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
        </div>
      
        <div className="section">
            <div className="section-heading">
                <h1 className="hedding-primary">Internship</h1>
            </div>
       
            <ul>
                <li>
                    <h3>Nikkei, Inc.</h3>
                    <p>2020.08 (1 week) | Hackathon</p>
                    <h3></h3>
                </li>
                <li>
                    <h3>Rakuten Inc.</h3>
                    <p>2020.08 (2 weeks) | Hackathon</p>
                    <h3></h3>
                </li>
                <li>
                    <h3>MonotaRO Co., Ltd.</h3>
                    <p>2020.09 (1 week) | Data Scientist</p>
                    <h3></h3>
                </li>
                <li>
                    <h3>Cookpad Inc.</h3>
                    <p>2020.09 (1 week) | Web Engineer</p>
                    <h3></h3>
                </li>
                <li>
                    <h3>Benesse Corporation</h3>
                    <p>2020.09 (2 days) | Hackathon</p>
                    <h3></h3>
                </li>
            </ul>
        </div>

        <div className="section">
            <div className="section-heading">
                <h1 className="hedding-primary">Work Experience</h1>
            </div>
          
            <ul>
                <li>
                    <h3>Cookpad Inc.</h3>
                    <p>2020.11 - 2021.02 | Machine Learning Engineer</p>
                    <h3></h3>
                </li>
                <li>
                    <h3>Recruit Holdings Co.,Ltd.</h3>
                    <p>2021.02 - 2021.03 | Machine Learning Engineer</p>
                    <h3></h3>
                </li>
            </ul>
        </div>
      
        <div className="section">
            <div className="section-heading">
                <h1 className="hedding-primary">Award</h1>
            </div>
            <ul>
                <li>楽天二子玉川夏の陣 優勝</li>
                <li>Benesse Digital Plan Workshop 優秀賞</li>    
            </ul>
        </div>
   
        <div className="section">
            <div className="section-heading">
                <h1 className="hedding-primary">Products</h1>
            </div>
            <div className="ui list">
                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>写真でボケるAI</h3>
                            <div className="description">
                                <ul>
                                    <li><a href="https://kent34.netlify.app/19/">Blog</a></li>
                                    <li><a href="https://github.com/kent0304/Image2Boke">GitHub</a></li>
                                </ul>
                                <p>画像キャプション生成により、与えられた写真に対してユーモアある一文を生成する。</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>雑談のできる対話システム</h3>
                            <div className="description">
                                <ul>
                                    <li><a href="https://kent34.netlify.app/13/">Blog</a></li>
                                    <li><a href="https://github.com/kent0304/dsbook">GitHub</a></li>
                                </ul>
                                <p>Twitterから対話データを収集しseq2seqに学習させる。</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>

            

                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>レシピ画像検索</h3>
                            <div className="description">
                                <ul>
                                    <li><a href="https://github.com/kent0304/Text2ImageRetrieval">GitHub</a></li>
                                </ul>
                                <p>レシピテキスト（クエリ）をもとに適切な画像をデータセットから返す。</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>


                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>キーフレーズ抽出</h3>
                            <div className="description">
                                <ul>
                                    <li><a href="https://kent34.netlify.app/16/">Blog</a></li>
                                </ul>
                                <p>レビュー文書からキーフレーズを抽出する。</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>


                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>こどもニュース</h3>
                            <div className="description">
                                <ul>
                                    <li><a href="https://kent34.netlify.app/14/">Blog</a></li>
                                </ul>
                                <p>短期インターンシップで作成したサービスのプロトタイプ。記事の要約、平易化、感情分析を行うwebサービス。</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>Amato MUSIC</h3>
                            <div className="description">
                                <ul>
                                    <li><a href="https://kent34.netlify.app/15/">Blog</a></li>
                                    <li><a href="https://github.com/kent0304/Amato-MUSIC">GitHub</a></li>
                                </ul>
                                <p>楽天のハッカソン二子玉川夏の陣2020での優勝作品。人と人を音楽を通してつなげるwebサービス。</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>

             

                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>Table Share</h3>
                            <div className="description">
                                <ul>
                                    <li><a href="https://docs.google.com/presentation/d/1LH8fCrLOjBhwgHUpJv12QM5iNmoG_ezW_tKMOZssPdo/edit?usp=sharing">Google Slide</a></li>
                                    <li><a href="https://github.com/kent0304/cookpad-internship-2020-summer-pbl">GitHub</a></li>
                                </ul>
                                <p>クックパッドサマーインターンシップで開発したwebサービス。作った手料理の写真を手軽に投稿できる。</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>オンライン英会話サービスekubo</h3>
                            <div className="description">
                                <ul>
                                    <li><a href="https://inprog-inc.com/">inprog, inc.</a></li>
                                    <li><a href="https://github.com/kent0304/ekubo">GitHub</a></li>
                                </ul>
                                <p>"ekubo"はinprog株式会社の事業の一つ．英会話講師の国立大学の留学生によるオンライン英会話サービス</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <i class="check icon" />
                        <div className="content">
                            <h3>スタバおすすめカスタマイズbot</h3>
                            <div className="description">
                            <ul>
                                <li><a href="https://kent34.hatenablog.com/entry/2020/01/01/011740">Blog</a></li>
                                <li><a href="https://liff.line.me/1645278921-kWRPP32q/?accountId=458jtgfa&openerPlatform=native&openerKey=home%3Arecommend">LINE Bot</a></li>
                            </ul> 
                                <p>ドリンク名を送るとおすすめカスタマイズを教えてくれたり、コーヒー豆の種類を送るとその特徴を教えてくれたり、雑談ができるチャットボット。</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      
  </div>
)
