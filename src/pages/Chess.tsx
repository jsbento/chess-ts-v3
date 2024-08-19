import React, { useState } from 'react'

import { Board, History, Checkbox, NumberInput } from '@components'

const Chess: React.FC = () => {
  const [engineActive, setEngineActive] = useState(false)
  const [depth, setDepth] = useState(3)
  const [moveTime, setMoveTime] = useState(1000)

  return (
    <div className='grid grid-cols-3'>
      <div className='w-full flex flex-col'>
        Engine Controls
        <Checkbox
          label='Engine Active'
          labelClassName='mt-2'
          checked={engineActive}
          onChange={() => setEngineActive(!engineActive)}
        />
        <NumberInput
          label='Depth'
          labelClassName='mt-2'
          value={depth}
          onChange={(value) => setDepth(value)}
        />
        <NumberInput
          label='Move Time (ms)'
          labelClassName='mt-2'
          value={moveTime}
          onChange={(value) => setMoveTime(value)}
        />
      </div>
      <div className='w-full'>
        <Board size={500} />
      </div>
      <div className='flex justify-center w-full'>
        <History />
      </div>
    </div>
  )
}

export default Chess
