import { AuditModel } from './audit.model';
import { ActivityModel } from './activity.model';
import { InventoryModel } from './inventory.model';
import { TicketTypeModel } from './ticket-type.model';
import { UserModel } from './user.model';

export class TicketModel {
  id: string;
  name: string;
  description: string;
  type: TicketTypeModel;
  responsible: UserModel;
  audit: AuditModel;
  activities: ActivityModel[];
  inventories: InventoryModel[];
}
