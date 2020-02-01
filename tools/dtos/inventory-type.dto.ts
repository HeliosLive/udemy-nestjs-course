import { IsNotEmpty, Length } from 'class-validator';

export class InventoryTypeDto {
  @IsNotEmpty()
  @Length(2, 30)
  name: string;
}
