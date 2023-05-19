import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export default class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<Result>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((datas) => {
        const {
          msg = void 0,
          data = {}
        } = datas
        return {
          code: HttpStatus.OK,
          data,
          success: true,
          msg: msg || 'request successful'
        }
      })
    )
  }
}

export const fullfill = ({
  msg, data
}: Result) => ({
  msg,
  data
})
