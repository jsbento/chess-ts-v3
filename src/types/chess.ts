export type PromotionPiece = 'q' | 'r' | 'b' | 'n'

export type Move = {
  from: string
  to: string
}

export type SelectedPiece = {
  id: number
  moves: number[]
}
