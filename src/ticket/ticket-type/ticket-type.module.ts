import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketTypeController } from './ticket-type.controller';
import { TicketTypeService } from './ticket-type.service';
import { TicketTypeSchema } from 'tools/models/ticket-type.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TicketType', schema: TicketTypeSchema },
    ]),
  ],
  controllers: [TicketTypeController],
  providers: [TicketTypeService],
})
export class TicketTypeModule {}
