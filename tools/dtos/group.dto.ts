import { RoleDto } from './role.dto';
import { IsNotEmpty, Length } from 'class-validator';

export class GroupCreateDto {
  @IsNotEmpty()
  @Length(2, 30)
  name: string;
  @IsNotEmpty()
  @Length(2, 130)
  description: string;
}

// tslint:disable-next-line: max-classes-per-file
export class GroupRolesDto {
  roles: RoleDto[];
}
