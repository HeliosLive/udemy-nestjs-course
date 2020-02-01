import { IsNotEmpty, Length } from 'class-validator';

export class TicketTypeDto {
  @IsNotEmpty()
  @Length(2, 30)
  name: string;
}
