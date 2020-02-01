import { IsNotEmpty, Length } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  @Length(2, 40)
  name: string;
}
