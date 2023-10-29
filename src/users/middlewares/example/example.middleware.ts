import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('example Middleware');
    console.log(req.headers.authorization);

    const auth = req.headers.authorization;
    if (!auth) {
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    }
    if (auth) next();
  }
}
