import { AuditModel } from './audit.model';
import { RoleModel } from './role.model';

export class GroupModel {
  id: string;
  name: string;
  description: string;
  audit: AuditModel;
  roles: RoleModel[];
}
