import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import appSetup from './app-setup'
import type { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  appSetup(app)
  await app.listen(3000)
}

bootstrap()
