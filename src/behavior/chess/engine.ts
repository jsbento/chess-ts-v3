import { post } from '@utils'

import {
  EvaluationReq,
  EvaluationResp,
  SearchPositionReq,
  SearchPositionResp,
} from '@types'

export const evaluatePosition = async (
  req: EvaluationReq,
): Promise<number | null> => {
  try {
    const resp = await post<EvaluationReq, EvaluationResp>(
      '/api/chess/eval',
      req,
    )
    return resp.score
  } catch (err) {
    console.log(err)
    return null
  }
}

export const searchPosition = async (
  req: SearchPositionReq,
): Promise<string | null> => {
  try {
    const resp = await post<SearchPositionReq, SearchPositionResp>(
      '/api/chess/search',
      req,
    )
    return resp.move
  } catch (err) {
    console.log(err)
    return null
  }
}
