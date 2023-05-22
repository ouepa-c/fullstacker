import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import appSetup from './app-setup'
import type { NestExpressApplication } from '@nestjs/platform-express'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
  path: path.join(__dirname, '../.env')
})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  appSetup(app)
  await app.listen(process.env.APP_PORT)
}

bootstrap()
