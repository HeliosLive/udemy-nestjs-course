import { TicketTypeModel } from 'tools/models/ticket-type.model';
import { UserModel } from 'tools/models/user.model';
import { AuditModel } from 'tools/models/audit.model';
import { ActivityModel } from 'tools/models/activity.model';
import { InventoryModel } from 'tools/models/inventory.model';
import { IsNotEmpty, Length } from 'class-validator';

export class TicketCreateDto {
  @IsNotEmpty()
  @Length(2, 30)
  name: string;
  @IsNotEmpty()
  @Length(2, 120)
  description: string;
  @IsNotEmpty()
  type: TicketTypeModel;
  @IsNotEmpty()
  responsible: UserModel;
  audit: AuditModel;
  activities: ActivityModel[];
  inventories: InventoryModel[];
}
