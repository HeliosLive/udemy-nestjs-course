import { AuditDto } from './audit.dto';
import { IsNotEmpty, Length } from 'class-validator';

export class ActivityTypeDto {
  @IsNotEmpty()
  @Length(2, 30)
  name: string;
  audit: AuditDto;
}
