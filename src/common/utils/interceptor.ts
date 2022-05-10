import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { of } from 'rxjs';
import { RequestTicket } from '../models/ticket.model';

@Injectable()
export class CheckTypeInterceptor implements NestInterceptor {
  constructor() { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const bodyDto = req.body.bodyDto;

    if (bodyDto instanceof RequestTicket) {
      console.log("bodyDto", bodyDto)
      return next.handle();
    }

    return of([]);
  }
}