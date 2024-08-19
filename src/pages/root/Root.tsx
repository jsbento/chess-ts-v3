import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import { signOut } from '@behavior'
import { useAppDispatch, useAppSelector } from '@hooks'

import './Root.css'

const Root: React.FC = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.auth.user)

  return (
    <>
      <div id='sidebar'>
        <h1>Chess TS</h1>
        <nav>
          <ul>
            <li>
              {user ? (
                <div className='flex flex-col'>
                  <span>Hi {user.username}!</span>
                  <button onClick={() => signOut(dispatch)}>Sign Out</button>
                </div>
              ) : (
                <Link to={'/auth'}>Sign In</Link>
              )}
            </li>
            <li>
              <Link to={'/'}>Home</Link>
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
