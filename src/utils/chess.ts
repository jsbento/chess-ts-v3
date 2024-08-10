import { Chess } from 'chess.js'

export const getCharBoard = (chess: Chess): string[] => {
  const charBoard: string[] = []

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = chess?.board()[rank][file] || null
      if (piece) {
        charBoard.push(`${piece.color}${piece.type}`)
      } else {
        charBoard.push('empty')
      }
    }
  }

  return charBoard
}

export const getPossiblePromotions = (chess: Chess, from: string, to: string) =>
  chess
    .moves({ verbose: true })
    .filter((move) => move.promotion && `${move.from}:${move.to}` === `${from}:${to}`)

export const indexToRankFile = (index: number): [number, number] => {
  const rank = 8 - Math.floor(index / 8)
  const file = index % 8

  return [rank, file]
}

export const indexToSquare = (index: string | number): string => {
  const rank = 8 - Math.floor(Number(index) / 8)
  const file = 'abcdefgh'[Number(index) % 8]

  return `${file}${rank}`
}

export const buildMove = (
  from: string | number,
  to: string | number,
): { from: string; to: string } => {
  return {
    from: indexToSquare(from),
    to: indexToSquare(to),
  }
}

export const squareToIndex = (square: string): number => {
  const [file, rank] = square.split('')
  return (8 - Number(rank)) * 8 + 'abcdefgh'.indexOf(file)
}

export const getPieceImage = (piece: string, color: string): string => {
  return `./src/assets/chess-pieces//Chess_${piece}${color === 'black' ? 'd' : 'l'}t60.png`
}
