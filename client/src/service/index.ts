import Requester from '@/service/request'

export const $http = new Requester({
  baseURL: process.env.PUBLIC_URL,
  timeout: 5000
})
