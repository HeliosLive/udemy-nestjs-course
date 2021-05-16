import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { LoginModule } from 'src/login/login.module';
import { RoleModule } from 'src/role/role.module';
import { MailService } from 'libs/services/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    LoginModule,
    RoleModule,
  ],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
