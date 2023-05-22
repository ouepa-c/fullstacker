import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { RequestConfiure } from '@/service/request/interface'

class Requester {
  instance: AxiosInstance | undefined

  constructor(config: RequestConfiure) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      config => {

        return config
      },
      error => {

        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      response => {

        return response.data
      },
      error => {

        return Promise.reject(error)
      }
    )
    this.instance.interceptors.request.use(
      config.interceptor?.requestOnFullfill,
      config.interceptor?.requestOnFailed
    )
    this.instance.interceptors.response.use(
      config.interceptor?.responseOnFullfill,
      config.interceptor?.responseOnFailed
    )
  }

  request<R = any>(config: RequestConfiure<R>) {
    if (config.interceptor?.requestOnFullfill) {
      config = config.interceptor.requestOnFullfill(config as InternalAxiosRequestConfig)
    }
    return new Promise<R>((resolve, reject) => {
      this.instance?.request<any, R>(config)
        .then(response => {
          if (config.interceptor?.responseOnFullfill) {
            response = config.interceptor.responseOnFullfill(response)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  get = <R = any>(config: RequestConfiure<R>) => this.request<R>({
    ...config,
    method: 'get'
  })

  post = <R = any>(config: RequestConfiure<R>) => this.request<R>({
    ...config,
    method: 'post'
  })

  delete = <R = any>(config: RequestConfiure<R>) => this.request<R>({
    ...config,
    method: 'delete'
  })

  put = <R = any>(config: RequestConfiure<R>) => this.request<R>({
    ...config,
    method: 'put'
  })

  patch = <R = any>(config: RequestConfiure<R>) => this.request<R>({
    ...config,
    method: 'patch'
  })
}


export default Requester
