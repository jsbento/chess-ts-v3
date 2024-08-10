import React, { useState, useEffect, useMemo, useRef, MouseEvent } from 'react'
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { Chess } from 'chess.js'

import { useDimensions } from '../../hooks'
import {
  indexToRankFile,
  buildMove,
  getCharBoard,
  getPossiblePromotions,
  squareToIndex,
  indexToSquare,
} from '../../utils'

import BoardCell from './BoardCell'
import Piece from './Piece'
import PromotionSquare from './PromotionSquare'
import Modal from '../common/Modal'

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: boardWidth,
      },
    }),
  )

  const [charBoard, setCharBoard] = useState<string[]>([])
  const [promotion, setPromotion] = useState<Move | undefined>(undefined)
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null)
  const [selectedPieceMoves, setSelectedPieceMoves] = useState<number[] | null>(null)

  const updateCharBoard = () => {
    setCharBoard(getCharBoard(chess))
  }

  useEffect(() => {
    updateCharBoard()
  }, [])

  const onMove = ({ from, to }: Move) => {
    setSelectedPiece(null)
    setSelectedPieceMoves(null)

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

  const onClickPiece = (id: number) => (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (selectedPiece == id) {
      setSelectedPiece(null)
      setSelectedPieceMoves(null)
      return
    }

    const moves = chess
      .moves({ verbose: true })
      .filter((move) => move.from === indexToSquare(id))
      .map((move) => move.to)

    setSelectedPiece(id)
    setSelectedPieceMoves(moves.map((move) => squareToIndex(move)))
  }

  const renderPieceCell = (cell: string, idx: number) => {
    if (promotion && squareToIndex(promotion.to) === idx) {
      return (
        <PromotionSquare turn={chess.turn()} onPromote={onPromote(promotion.from, promotion.to)} />
      )
    } else if (cell !== 'empty' && !(promotion && squareToIndex(promotion.from) === idx)) {
      const [color, piece] = cell
      return (
        <Piece
          id={idx.toString()}
          color={color === 'b' ? 'black' : 'white'}
          piece={piece}
          onClick={onClickPiece(idx)}
        />
      )
    } else {
      return null
    }
  }

  const boardCells = useMemo(() => {
    const cells: React.ReactElement[] = []

    charBoard.forEach((cell, idx) => {
      const [rank, file] = indexToRankFile(idx)
      const highlighted = selectedPieceMoves?.includes(idx)

      cells.push(
        <BoardCell
          key={idx}
          id={idx.toString()}
          size={cellSize}
          color={(rank + file) % 2 === 0 ? 'bg-white' : 'bg-gray-600'}
          highlight={highlighted}
        >
          {renderPieceCell(cell, idx)}
        </BoardCell>,
      )
    })

    return cells
  }, [charBoard, cellSize, promotion, selectedPieceMoves])

  return (
    <div ref={ref} style={{ width: size, height: size }}>
      <DndContext onDragEnd={onDragEnd} sensors={sensors}>
        <div className='grid grid-cols-8 grid-rows-8 w-full h-full'>{boardCells}</div>
      </DndContext>
      <StatusModal />
    </div>
  )
}

const StatusModal: React.FC = () => {
  const pGameStatus = () => {
    if (chess.isCheckmate()) {
      return `Checkmate! ${chess.turn() === 'w' ? 'Black' : 'White'} wins!`
    } else if (chess.isDraw()) {
      return 'Draw!'
    } else if (chess.isInsufficientMaterial()) {
      return 'Draw by Insufficient Material!'
    } else if (chess.isStalemate()) {
      return 'Draw by Stalemate!'
    } else if (chess.isThreefoldRepetition()) {
      return 'Draw by Threefold Repetition!'
    } else {
      return 'Something strange happened!'
    }
  }

  return (
    <Modal isOpen={chess.isGameOver()} showCloseButton={true} onClose={() => chess.reset()}>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>Game Over!</h2>
        <p className='text-lg'>{pGameStatus()}</p>
        <button className='mt-10 bg-gray-700' onClick={() => chess.reset()}>
          Reset
        </button>
      </div>
    </Modal>
  )
}

export default Board
