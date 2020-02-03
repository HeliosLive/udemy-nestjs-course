import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'tools/models/user.model';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [LoginController],
  providers: [LoginService, UserService],
})
export class LoginModule {}
