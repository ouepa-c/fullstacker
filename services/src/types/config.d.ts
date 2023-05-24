type Result<D = any> = {
  msg?: string
  data?: D
}

interface SignPayload {
  userId: number
  roleId: number
}

interface PageMeta {
  page: number
  size: number
}
