import { Length, IsNotEmpty } from 'class-validator';

export class ProductTypeDto {
  @IsNotEmpty()
  @Length(2, 30)
  name: string;
}
