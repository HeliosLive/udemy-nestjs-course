import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import {
  UserCreateDto,
  UserForgotPasswordDto,
  UserPasswordResetDto,
  UserUpdateDto,
} from './user.dto';
import { LoginService } from 'src/login/login.service';
import { FilterModel } from 'libs/models/filter.model';
import { AuditModel } from 'libs/models/audit.model';
import { RoleService } from 'src/role/role.service';
import { EndpointPermissions } from 'libs/decorator/permission.decorator';
import { MailService } from 'libs/services/mail.service';
import { MailModel } from 'libs/models/mail.model';
import environment from 'src/environment';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  // @EndpointPermissions('post:user')
  async CreateUser(@Body() body: UserCreateDto): Promise<any> {
    body.password = await this.loginService.convertToHash(body.password);
    const doesExist = await this.userService.findOneByEmail(body.email);
    if (doesExist) {
      return await {
        response: 'User already exist!',
        user: doesExist,
        success: false,
      };
      // throw new HttpException(
      //   {
      //     status: HttpStatus.NOT_ACCEPTABLE,
      //     error: 'User has already exist!',
      //     user: doesExist,
      //     success: false,
      //   },
      //   HttpStatus.NOT_ACCEPTABLE,
      // );
    } else {
      let newAudit = new AuditModel();
      newAudit.active = true;
      newAudit.createdBy = 'Admin';
      newAudit.createdDate = new Date();
      body.audit = newAudit;

      let roleFail = false;
      if (body.roles && body.roles.length > 0) {
        body.roles.forEach((element) => {
          if (!this.roleService.findOne(element['_id'])) {
            roleFail = true;
          }
        });
        if (roleFail) {
          return await {
            response: 'Some of Roles does not exist!',
            roles: body.roles,
            success: false,
          };
        } else {
          return this.userService.create(body);
        }
      } else {
        return this.userService.create(body);
      }
    }
  }

  @Post('/password-reset')
  async passwordReset(
    @Body() UserPasswordResetDto: UserPasswordResetDto,
  ): Promise<any> {
    let doesExist;
    if (await UserPasswordResetDto._id) {
      doesExist = await this.userService.findOne(UserPasswordResetDto._id);
    } else if (await UserPasswordResetDto.email) {
      doesExist = await this.userService.findOneByEmail(
        UserPasswordResetDto.email,
      );
    } else {
      doesExist = false;
    }

    try {
      if (doesExist) {
        if (doesExist.securityCode === UserPasswordResetDto.securityCode) {
          let checkPwd;
          if (await UserPasswordResetDto.oldPassword) {
            //change pwd
            checkPwd = await this.loginService.compareHashes(
              UserPasswordResetDto.oldPassword,
              doesExist.password,
            );
          } else {
            //reset pwd
            checkPwd = true;
          }
          const newPwd = await this.loginService.convertToHash(
            UserPasswordResetDto.newPassword,
          );
          if (checkPwd) {
            const existUser = new UserUpdateDto();
            existUser.password = newPwd;
            return this.userService.update(doesExist._id, existUser);
          } else {
            return await { response: 'Incorrect old password', success: false };
          }
        } else {
          return await { response: 'Security Code incorrect!', success: false };
        }
      } else {
        return await {
          response: 'User does not exist!',
          success: false,
        };
      }
    } catch (error) {
      return await {
        response: 'Something went wrong trying to password reset!',
        success: false,
      };
    }
  }

  @Post('/forgot-password')
  async forgotPassword(
    @Body() forgotPwdDto: UserForgotPasswordDto,
  ): Promise<any> {
    const doesExist = await this.userService.findOneByEmail(forgotPwdDto.email);

    try {
      if (doesExist) {
        // create random 8 digit number
        const randomDigits = Math.floor(10000000 + Math.random() * 90000000);

        // send an email
        const mailTemp = new MailModel();
        mailTemp.from = process.env.EMAIL_ADDRESS || environment.email_address;
        mailTemp.to = forgotPwdDto.email;
        mailTemp.subject =
          process.env.EMAIL_SUBJECT || environment.email_subject;
        mailTemp.text = `${randomDigits} created-text`;
        mailTemp.html = {
          name: doesExist.name,
          surname: doesExist.surname,
          secureCode: randomDigits,
        };

        const mailResp = await this.mailService
          .send(mailTemp)
          .then(async (resp) => {
            return resp;
          })
          .catch(async (err) => {
            return err;
          });

        if ((await mailResp) && (await mailResp.messageId)) {
          const existUser = new UserUpdateDto();
          existUser.securityCode = randomDigits;
          await this.userService.update(doesExist._id, existUser);
          return await {
            response: 'Password reset email sent!',
            success: true,
          };
        } else {
          return await {
            response: 'Something went wrong while sending an email!',
            success: false,
          };
        }
      } else {
        return await { response: 'User does not exist', success: false };
      }
    } catch (error) {
      return await {
        response: 'Something went wrong during process!',
        success: false,
      };
    }
  }

  @Get()
  @EndpointPermissions('get:user')
  async getAllUsers(@Query() query: FilterModel): Promise<UserModel[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  // @EndpointPermissions('get:user:id')
  async GetUser(@Param() params): Promise<UserModel> {
    return this.userService.findOne(params.id);
  }

  @Put(':id')
  @EndpointPermissions('put:user')
  async updateUser(
    @Param('id') id: string,
    @Body() UserUpdateDto: UserUpdateDto,
  ): Promise<any> {
    let roleFail = false;
    if (UserUpdateDto.roles && UserUpdateDto.roles.length > 0) {
      UserUpdateDto.roles.forEach((element) => {
        if (!this.roleService.findOne(element['_id'])) {
          roleFail = true;
        }
        delete element['permissions'];
        return element;
      });
      if (roleFail) {
        return await {
          response: 'Some of Roles does not exist!',
          roles: UserUpdateDto.roles,
          success: false,
        };
      } else {
        return this.userService.update(id, UserUpdateDto);
      }
    } else {
      return this.userService.update(id, UserUpdateDto);
    }
  }

  @Delete(':id')
  @EndpointPermissions('delete:user')
  async removeUser(@Param('id') id: string): Promise<any> {
    const res = await this.userService.delete(id);
    if (res) {
      return res;
    } else {
      return await {
        response: 'User does not exist!',
        success: false,
      };
    }
  }
}
