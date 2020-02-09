import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TicketTypeService } from './ticket-type.service';
import { TicketTypeModel } from 'tools/models/ticket-type.model';
import { TicketTypeDto } from 'tools/dtos/ticket-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ticket-type')
@Controller('ticket-type')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @Post()
  async CreateTicketType(
    @Body() body: TicketTypeDto,
  ): Promise<TicketTypeModel> {
    return this.ticketTypeService.create(body);
  }

  @Get()
  async getAllTicketTypes(): Promise<TicketTypeModel[]> {
    return this.ticketTypeService.findAll();
  }

  @Get(':id')
  async GetTicketType(@Param() params): Promise<TicketTypeModel> {
    return this.ticketTypeService.findOne(params.id);
  }

  @Put(':id')
  async updateTicketType(
    @Param('id') id: string,
    @Body() ticketTypeDto: TicketTypeDto,
  ): Promise<TicketTypeModel> {
    return this.ticketTypeService.update(id, ticketTypeDto);
  }

  @Delete(':id')
  async removeTicketType(@Param('id') id: string): Promise<TicketTypeModel> {
    return this.ticketTypeService.delete(id);
  }
}
