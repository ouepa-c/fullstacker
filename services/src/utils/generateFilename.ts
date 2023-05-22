import * as crypto from 'crypto'
import * as path from 'path'

const generateFilename = (originalFilename: string) => {
  const filename = crypto.randomBytes(10).toString('hex')
  const ext = path.extname(originalFilename)
  return `${filename}${ext}`
}

export default generateFilename
