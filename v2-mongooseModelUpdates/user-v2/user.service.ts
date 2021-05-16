import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { UserCreateDto, UserUpdateDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { ResourceService } from 'libs/services/resource.service';
import { AuditModel } from 'libs/models/audit.model';

interface UserModelDoc extends AuditModel, UserModel, Document {}

@Injectable()
export class UserService extends ResourceService<
  UserModelDoc,
  UserCreateDto | UserUpdateDto
> {
  constructor(
    @InjectModel('User')
    userMongo: Model<UserModelDoc>,
  ) {
    super(userMongo);
  }
}
