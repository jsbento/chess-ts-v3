import React from 'react'

import { Board, History } from '@components'

const Chess: React.FC = () => {
  return (
    <div className='grid grid-cols-2'>
      <Board size={500} />
      <History />
    </div>
  )
}

export default Chess
