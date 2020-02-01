import { IsNotEmpty } from 'class-validator';

export class ActivityDto {
  @IsNotEmpty()
  name: string;
}
