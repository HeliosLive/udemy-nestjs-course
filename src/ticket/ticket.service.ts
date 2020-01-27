import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TicketModel } from 'tools/models/ticket.model';
import { TicketCreateDto } from 'tools/dtos/ticket.dto';
import { ResourceService } from 'libs/services/resource.service';

@Injectable()
export class TicketService extends ResourceService<
  TicketModel,
  TicketCreateDto,
  TicketCreateDto
> {
  constructor(
    @InjectModel('Ticket')
    ticketMongo: Model<TicketModel>,
  ) {
    super(ticketMongo);
  }
}
