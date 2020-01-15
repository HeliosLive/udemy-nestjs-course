import { RoleModel } from 'tools/models/role.model';
import { GroupModel } from 'tools/models/group.model';

export class UserCreateDto {
  name: string;
  surname: string;
  image: string;
  password: string;
  email: string;
  birthDay: Date;
}

// tslint:disable-next-line:max-classes-per-file
export class UserUpdateDto {
  name: string;
  surname: string;
  image: string;
  password: string;
  email: string;
  birthDay: Date;
  roles: RoleModel[];
  groups: GroupModel[];
}

// tslint:disable-next-line:max-classes-per-file
export class UserLoginDto {
  email: string;
  password: string;
}
