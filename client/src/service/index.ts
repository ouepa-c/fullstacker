import Requester from '@/service/request'

export const $http = new Requester({
  baseURL: process.env.REACT_APP_BASEURL,
  timeout: 5000
})
