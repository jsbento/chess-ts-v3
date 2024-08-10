import React from 'react'
import { useDroppable } from '@dnd-kit/core'

interface BoardCellProps {
  id: string
  color: string
  size: number
  children?: React.ReactNode
}

const BoardCell: React.FC<BoardCellProps> = ({ id, color, size, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })
  const style = {
    width: size,
    height: size,
    opacity: isOver ? 0.75 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${color} w-full flex justify-center items-center`}
    >
      {children}
    </div>
  )
}

export default BoardCell
