import type { NestExpressApplication } from '@nestjs/platform-express'
import TransformInterceptor from './common/interceptor/transform.interceptor'
import { ValidationPipe } from '@nestjs/common'
import HttpExceptionFilter from './common/filter/http-exception.filter'
import *as  cors from 'cors'

export default (app: NestExpressApplication) => {
  app.useGlobalInterceptors(new TransformInterceptor)
    .useGlobalPipes(new ValidationPipe({whitelist: true}))
    .useGlobalFilters(new HttpExceptionFilter)
    .use(cors())
}
