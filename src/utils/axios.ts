import axios from 'axios'

const _axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
_axios.defaults.timeout = 2500 // 2.5 seconds in milliseconds

_axios.interceptors.request.use((config) => {
  return config
})

_axios.interceptors.response.use((response) => {
  return response
})

export const post = async <Req, Res>(uri: string, data: Req): Promise<Res> => {
  const response = await _axios.post<Res>(uri, data)
  return response.data
}

export const get = async <Req, Res>(uri: string, params: Req): Promise<Res> => {
  const response = await _axios.get<Res>(uri, { params })
  return response.data
}

export const put = async <Req, Res>(uri: string, data: Req): Promise<Res> => {
  const response = await _axios.put<Res>(uri, data)
  return response.data
}

export const del = async <Res>(uri: string): Promise<Res> => {
  const response = await _axios.delete<Res>(uri)
  return response.data
}
