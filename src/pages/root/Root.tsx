import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import './Root.css'

const Root: React.FC = () => {
  return (
    <>
      <div id='sidebar'>
        <h1>Chess TS</h1>
        <nav>
          <ul>
            <li>
              <Link to={'/home'}>Home</Link>
            </li>
            <li>
              <Link to={'/chess'}>Play</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id='detail'>
        <Outlet />
      </div>
    </>
  )
}

export default Root
