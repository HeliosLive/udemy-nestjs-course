import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryModel } from 'tools/models/inventory.model';
import { InventoryDto } from 'tools/dtos/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async CreateInventory(@Body() body: InventoryDto): Promise<InventoryModel> {
    return this.inventoryService.create(body);
  }

  @Get()
  async getAllInventories(): Promise<InventoryModel[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  async GetInventory(@Param() params): Promise<InventoryModel> {
    return this.inventoryService.findOne(params.id);
  }

  @Put(':id')
  async updateInventory(
    @Param('id') id: string,
    @Body() inventoryDto: InventoryDto,
  ): Promise<InventoryModel> {
    return this.inventoryService.update(id, inventoryDto);
  }

  @Delete(':id')
  async removeInventory(@Param('id') id: string): Promise<InventoryModel> {
    return this.inventoryService.delete(id);
  }
}
