import * as fs from 'fs'
import * as path from 'path'

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../key/private.key'), 'utf-8')
const publicKey = fs.readFileSync(path.join(__dirname, '../../key/public.key'), 'utf-8')

export default () => ({
    privateKey,
    publicKey
})
