import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import environment from 'tools/environment/environment';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const authJsonWebToken = req.headers.authorization;

    if (req.baseUrl !== '/api/login' && req.baseUrl !== '/api/role') {
      if (!authJsonWebToken) {
        next();
        throw new HttpException('Jwt could not found!', HttpStatus.FORBIDDEN);
      } else {
        try {
          const user = jwt.verify(
            authJsonWebToken.slice(7, authJsonWebToken.length),
            environment.jwtText,
          );
          if (user) {
            req['user'] = user;
            next();
          } else {
            throw new HttpException(
              'something went wrong !',
              HttpStatus.GATEWAY_TIMEOUT,
            );
          }
        } catch (ex) {
          throw new HttpException(ex.message, HttpStatus.UNAUTHORIZED);
        }
      }
    } else {
      next();
      return;
    }
  }
}
