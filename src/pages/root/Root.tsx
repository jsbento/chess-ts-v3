import React from 'react'
import { Outlet } from 'react-router-dom'

import './Root.css'

const Root: React.FC = () => {
  return (
    <>
      <div id='sidebar'>
        <h1>Chess TS</h1>
        <nav>
          <ul>
            <li>
              <a href={'/home'}>Home</a>
            </li>
            <li>
              <a href={'/chess'}>Play</a>
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
