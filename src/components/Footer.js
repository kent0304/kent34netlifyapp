import React from 'react'
import './Footer.css'

export default () => (
  <div>
    {/* <h2 className="taCenter">
      twitter{' '}
      <a href="https://twitter.com/kent0304">@kent0304</a>
    </h2> */}
    <br />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Crafted by{' '}
          <a href="https://twitter.com/kent0304">kent</a>.
        </span>
      </div>
    </footer>
  </div>
)
