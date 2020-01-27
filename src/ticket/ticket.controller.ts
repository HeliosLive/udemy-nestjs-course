import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketModel } from 'tools/models/ticket.model';
import { TicketCreateDto } from 'tools/dtos/ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async CreateTicket(@Body() body: TicketCreateDto): Promise<TicketModel> {
    return this.ticketService.create(body);
  }

  @Get()
  async getAllTickets(): Promise<TicketModel[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async GetTicket(@Param() params): Promise<TicketModel> {
    return this.ticketService.findOne(params.id);
  }

  @Put(':id')
  async updateTicket(
    @Param('id') id: string,
    @Body() ticketUpdateDto: TicketCreateDto,
  ): Promise<TicketModel> {
    return this.ticketService.update(id, ticketUpdateDto);
  }

  @Delete(':id')
  async removeTicket(@Param('id') id: string): Promise<TicketModel> {
    return this.ticketService.delete(id);
  }
}
