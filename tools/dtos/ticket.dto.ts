import { TicketTypeModel } from 'tools/models/ticket-type.model';
import { UserModel } from 'tools/models/user.model';
import { AuditModel } from 'tools/models/audit.model';
import { ActivityModel } from 'tools/models/activity.model';
import { InventoryModel } from 'tools/models/inventory.model';

export class TicketCreateDto {
  name: string;
  description: string;
  type: TicketTypeModel;
  responsible: UserModel;
  audit: AuditModel;
  activities: ActivityModel[];
  inventories: InventoryModel[];
}
