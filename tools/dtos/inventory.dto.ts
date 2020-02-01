import { IsNotEmpty, Length } from 'class-validator';

export class InventoryDto {
  @IsNotEmpty()
  @Length(2, 25)
  barcode: number;
  @IsNotEmpty()
  @Length(2, 150)
  description: string;
}
