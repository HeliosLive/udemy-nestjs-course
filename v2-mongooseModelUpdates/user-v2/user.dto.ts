import { IsNotEmpty, Length, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuditModel } from 'libs/models/audit.model';
import { RoleModel } from 'src/role/role.model';

export class UserCreateDto {
  @IsNotEmpty()
  @Length(2, 20)
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  imageUrl: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  // @ApiProperty()
  // @IsDateString()
  // birthDay: Date;
  @ApiProperty()
  roles: RoleModel[];
  audit: AuditModel;
}

// tslint:disable-next-line:max-classes-per-file
export class UserUpdateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  // in the future we need to create code table and keep whole codes in there..
  @ApiProperty()
  securityCode: number;
  // @ApiProperty()
  // birthDay: Date;
  @ApiProperty()
  roles: RoleModel[];
}

// tslint:disable-next-line:max-classes-per-file
export class UserPasswordResetDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  securityCode: number;
}

// tslint:disable-next-line:max-classes-per-file
export class UserForgotPasswordDto {
  @ApiProperty()
  email: string;
}

// tslint:disable-next-line:max-classes-per-file
export class UserLoginDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
