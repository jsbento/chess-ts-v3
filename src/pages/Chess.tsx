import React from 'react'

import { Board } from '../components'

const Chess: React.FC = () => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <Board size={500} />
    </div>
  )
}

export default Chess
