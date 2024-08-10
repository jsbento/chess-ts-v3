import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Root, Home, Chess } from './pages'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Error: 404 Not Found</div>,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'chess',
        element: <Chess />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
