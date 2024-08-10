import React, { useState, useEffect, useMemo, useRef } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Chess } from 'chess.js'

import { useDimensions } from '../../hooks'
import {
  indexToRankFile,
  buildMove,
  getCharBoard,
  getPossiblePromotions,
  squareToIndex,
} from '../../utils'

import BoardCell from './BoardCell'
import Piece from './Piece'
import PromotionSquare from './PromotionSquare'

import { PromotionPiece, Move } from '../../types'

const DefaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const chess = new Chess(DefaultFEN)

interface BoardProps {
  fen?: string
  size?: string | number
}

const Board: React.FC<BoardProps> = ({ fen, size }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { width: boardWidth } = useDimensions(ref)
  const cellSize = boardWidth / 8

  const [charBoard, setCharBoard] = useState<string[]>([])
  const [promotion, setPromotion] = useState<Move | undefined>(undefined)

  const updateCharBoard = () => {
    setCharBoard(getCharBoard(chess))
  }

  useEffect(() => {
    updateCharBoard()
  }, [])

  const onMove = ({ from, to }: Move) => {
    const promotions = getPossiblePromotions(chess, from, to)
    if (promotions.length > 0) {
      setPromotion({ from, to })
    } else {
      makeMove(from, to)
    }
  }

  const onPromote = (from: string, to: string) => (promotionPiece: PromotionPiece) => {
    makeMove(from, to, promotionPiece)
    setPromotion(undefined)
  }

  const makeMove = (from: string, to: string, promotion?: PromotionPiece) => {
    const success = chess.move({
      from,
      to,
      promotion,
    })

    if (success) {
      updateCharBoard()
    }
  }

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) {
      return
    }

    onMove(buildMove(active.id, over.id))
  }

  const renderPieceCell = (cell: string, idx: number) => {
    if (promotion && squareToIndex(promotion.to) === idx) {
      return (
        <PromotionSquare turn={chess.turn()} onPromote={onPromote(promotion.from, promotion.to)} />
      )
    } else if (cell !== 'empty' && !(promotion && squareToIndex(promotion.from) === idx)) {
      const [color, piece] = cell
      return <Piece id={idx.toString()} color={color === 'b' ? 'black' : 'white'} piece={piece} />
    } else {
      return null
    }
  }

  const boardCells = useMemo(() => {
    const cells: React.ReactElement[] = []

    charBoard.forEach((cell, idx) => {
      const [rank, file] = indexToRankFile(idx)

      cells.push(
        <BoardCell
          key={idx}
          id={idx.toString()}
          size={cellSize}
          color={(rank + file) % 2 === 0 ? 'bg-white' : 'bg-gray-600'}
        >
          {renderPieceCell(cell, idx)}
        </BoardCell>,
      )
    })

    return cells
  }, [charBoard, cellSize, promotion])

  return (
    <div ref={ref} style={{ width: size, height: size }}>
      <DndContext onDragEnd={onDragEnd}>
        <div className='grid grid-cols-8 grid-rows-8 w-full h-full'>{boardCells}</div>
      </DndContext>
    </div>
  )
}

export default Board
