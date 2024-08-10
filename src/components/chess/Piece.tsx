import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

import { getPieceImage } from '../../utils'

interface PieceProps {
  id: string
  piece: string
  color: 'black' | 'white'
}

const Piece: React.FC<PieceProps> = ({ id, piece, color }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    cursor: 'grab',
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img src={getPieceImage(piece, color)} alt={piece} />
    </div>
  )
}

export default Piece
