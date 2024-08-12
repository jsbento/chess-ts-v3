import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any

  return (
    <div>
      <h1>Something unexpected happened...</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default Error
