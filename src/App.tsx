import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root, Home, Chess, Auth, Error } from '@pages'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'chess',
        element: <Chess />,
      },
    ],
  },
])

const App: React.FC = () => <RouterProvider router={router} />

export default App
