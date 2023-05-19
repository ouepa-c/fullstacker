const dtoNonPrimarykey = <T>(dto: T, idkey: string): T => {
  dto[idkey] && delete dto[idkey]
  return dto
}

export default dtoNonPrimarykey
