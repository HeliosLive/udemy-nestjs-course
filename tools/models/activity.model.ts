import { AuditModel } from './audit.model';
import { ActivityTypeModel } from './activity-type.model';

export class ActivityModel {
  id: string;
  name: string;
  audit: AuditModel;
  type: ActivityTypeModel;
}
