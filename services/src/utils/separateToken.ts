const separateToken = (bearer: string) => {
  return bearer.replace('Bearer ', '')
}

export default separateToken
