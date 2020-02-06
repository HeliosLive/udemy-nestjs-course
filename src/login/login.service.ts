import { Injectable } from '@nestjs/common';
import { UserModel } from 'tools/models/user.model';
import { UserLoginDto } from 'tools/dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import environment from 'tools/environment/environment';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('User') private readonly userMongo: Model<UserModel>,
    private readonly userService: UserService,
  ) {}

  async loginUser(user: UserLoginDto): Promise<any> {
    try {
      const existUser = await this.userMongo
        .findOne({
          email: user.email,
        })
        .exec();

      if (existUser) {
        let checkPwd;
        await this.userService
          .compareHashes(user.password, existUser.password)
          .then(resp => {
            if (resp) {
              checkPwd = true;
            } else {
              checkPwd = false;
            }
          });

        if (checkPwd) {
          const authJsonWebToken = jwt.sign(
            { user: existUser },
            environment.jwtText,
          );
          return await { success: true, value: authJsonWebToken };
        } else {
          return await {
            success: false,
            response: 'user password is incorrect!',
          };
        }
      } else {
        return await { success: false, response: 'user does not exist!' };
      }
    } catch (ex) {
      return await {
        success: false,
        response: 'something went wrong while login process!',
        exception: ex,
      };
    }
  }
}
