import { RoleModel } from '../role/role.model';
export class UserModel {
  // id: string;
  name: string;
  surname: string;
  imageUrl: string;
  email: string;
  password: string;
  securityCode: number;
  // birthDay: Date;
  audit: object;
  roles: RoleModel[];
}
