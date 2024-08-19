import React, { useState, useEffect, useMemo, useRef, MouseEvent } from 'react'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Chess } from 'chess.js'

import {
  indexToRankFile,
  buildMove,
  getCharBoard,
  getPossiblePromotions,
  squareToIndex,
  indexToSquare,
  getGameStatus,
} from '@utils'

import BoardCell from './BoardCell'
import Piece from './Piece'
import PromotionSquare from './PromotionSquare'
import GameStatusModal from './GameStatusModal'

import { useDimensions, useAppDispatch } from '@hooks'
import { evaluatePosition } from '@behavior'
import { openGameStatusModal, addMove, clearMoves } from '@reducers'
import { PromotionPiece, Move, SelectedPiece } from '@types'

const DefaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const chess = new Chess(DefaultFEN)

interface BoardProps {
  fen?: string
  size?: string | number
}

const Board: React.FC<BoardProps> = ({ fen, size }) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)
  const { width: boardWidth } = useDimensions(ref)
  const cellSize = boardWidth / 8

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: boardWidth,
      },
    }),
  )

  const [charBoard, setCharBoard] = useState<string[]>(getCharBoard(chess))
  const [promotion, setPromotion] = useState<Move | undefined>(undefined)
  const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(null)
  const [score, setScore] = useState<number | null>(null)
  const gameOver = chess.isGameOver()
  const currentFen = chess.fen()
  const turn = chess.turn()

  useEffect(() => {
    if (gameOver) {
      dispatch(openGameStatusModal(getGameStatus(chess)))
    }
  }, [dispatch, gameOver])

  useEffect(() => {
    if (fen) {
      chess.load(fen)
      updateCharBoard()
    }
  }, [fen])

  useEffect(() => {
    ;(async () => {
      const newScore = await evaluatePosition({ fen: currentFen })
      if (!newScore) {
        return
      }
      if (turn === 'b') {
        setScore(-newScore)
      } else {
        setScore(newScore)
      }
    })()
  }, [currentFen, turn])

  const updateCharBoard = () => {
    setCharBoard(getCharBoard(chess))
  }

  const onMove = ({ from, to }: Move) => {
    setSelectedPiece(null)

    const promotions = getPossiblePromotions(chess, from, to)
    if (promotions.length > 0) {
      setPromotion({ from, to })
    } else {
      makeMove(from, to)
    }
  }

  const onPromote =
    (from: string, to: string) => (promotionPiece: PromotionPiece) => {
      makeMove(from, to, promotionPiece)
      setPromotion(undefined)
    }

  const makeMove = (from: string, to: string, promotion?: PromotionPiece) => {
    const move = chess.move({
      from,
      to,
      promotion,
    })

    if (move) {
      updateCharBoard()
      dispatch(addMove(move.san))
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

    if (selectedPiece?.id === id) {
      setSelectedPiece(null)
      return
    }

    const moves = chess
      .moves({ verbose: true })
      .filter((move) => move.from === indexToSquare(id))
      .map((move) => move.to)

    setSelectedPiece({
      id,
      moves: moves.map((move) => squareToIndex(move)),
    })
  }

  const resetBoard = () => {
    chess.reset()
    updateCharBoard()
    dispatch(clearMoves())
  }

  const renderPieceCell = (cell: string, idx: number) => {
    if (promotion && squareToIndex(promotion.to) === idx) {
      return (
        <PromotionSquare
          turn={chess.turn()}
          onPromote={onPromote(promotion.from, promotion.to)}
        />
      )
    } else if (
      cell !== 'empty' &&
      !(promotion && squareToIndex(promotion.from) === idx)
    ) {
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
      const highlighted =
        (selectedPiece && selectedPiece.moves.includes(idx)) || false

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charBoard, cellSize, selectedPiece, promotion])

  return (
    <div className='w-full h-full'>
      <h2 className='text-center text-2xl font-bold'>
        Score: {score && (score / 100).toFixed(2)}
      </h2>
      <div ref={ref} style={{ width: size, height: size }}>
        <DndContext onDragEnd={onDragEnd} sensors={sensors}>
          <div className='grid grid-cols-8 grid-rows-8 w-full h-full'>
            {boardCells}
          </div>
        </DndContext>
        <GameStatusModal resetBoard={resetBoard} />
      </div>
    </div>
  )
}

export default Board
