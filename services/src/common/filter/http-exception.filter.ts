import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const req = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const message = exception.getResponse()

    res.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      meta: {
        path: req.url,
        method: req.method
      },
      success: false,
      message
    })
  }
}
