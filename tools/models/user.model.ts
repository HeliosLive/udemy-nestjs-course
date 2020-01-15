import { AuditModel } from './audit.model';
import { RoleModel } from './role.model';
import { GroupModel } from './group.model';

export class UserModel {
  id: string;
  name: string;
  surname: string;
  image: string;
  email: string;
  password: string;
  birthDay: Date;
  audit: AuditModel;
  roles: RoleModel[];
  groups: GroupModel[];
}
