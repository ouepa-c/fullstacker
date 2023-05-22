import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface RequestConfiure<R = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: InterceptorConfigure<R>
}

export interface InterceptorConfigure<R> {
  requestOnFullfill?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestOnFailed?: (err: any) => any
  responseOnFullfill?: (response: R) => R
  responseOnFailed?: (err: any) => any
}

