import { Injectable } from '@nestjs/common';
import { UserModel } from 'tools/models/user.model';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResourceService } from 'libs/services/resource.service';
import environment from 'tools/environment/environment';

const bcrypt = require('bcrypt');

const saltRounds = 10;
const hashtext = environment.hashText;

@Injectable()
export class UserService extends ResourceService<
  UserModel,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(@InjectModel('User') userMongo: Model<UserModel>) {
    super(userMongo);
  }

  async convertToHash(value: string) {
    let hashPwd;
    await bcrypt.hash(`${hashtext}${value}`, saltRounds).then(hash => {
      hashPwd = hash;
    });
    return await hashPwd;
  }

  async compareHashes(password, hashed) {
    const match = await bcrypt.compareSync(`${hashtext}${password}`, hashed);
    return await match;
  }
}
