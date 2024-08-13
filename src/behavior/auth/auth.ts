import { post } from '@utils'
import { AppDispatch } from 'state/store'
import { login, logout } from '@reducers'
import { User, SignInReq, SignUpReq, AuthResp } from '@types'

export const signOut = (dispatch: AppDispatch) => {
  window.localStorage.removeItem('token')
  dispatch(logout())
}

export const signIn = async (
  dispatch: AppDispatch,
  data: SignInReq,
): Promise<User | null> => {
  try {
    const resp = await post<SignInReq, AuthResp>('/api/users/signin', data)

    if (!resp || !resp.user || !resp.token) {
      return null
    }

    window.localStorage.setItem('token', resp.token)

    dispatch(login(resp.user))
    return resp.user
  } catch (err) {
    console.log(err)
    return null
  }
}

export const signUp = async (
  dispatch: AppDispatch,
  data: SignUpReq,
): Promise<User | null> => {
  try {
    const resp = await post<SignUpReq, AuthResp>('/api/users/signup', data)

    if (!resp || !resp.user || !resp.token) {
      return null
    }

    window.localStorage.setItem('token', resp.token)

    dispatch(login(resp.user))
    return resp.user
  } catch (err) {
    console.log(err)
    return null
  }
}
