import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { InventoryTypeDto } from 'tools/dtos/inventory-type.dto';
import { InventoryTypeModel } from 'tools/models/inventory-type.model';
import { InventoryTypeService } from './inventory-type.service';

@Controller('inventory-type')
export class InventoryTypeController {
  constructor(private readonly inventoryTypeService: InventoryTypeService) {}

  @Post()
  async CreateInventoryType(
    @Body() body: InventoryTypeDto,
  ): Promise<InventoryTypeModel> {
    return this.inventoryTypeService.create(body);
  }

  @Get()
  async getAllInventoryTypes(): Promise<InventoryTypeModel[]> {
    return this.inventoryTypeService.findAll();
  }

  @Get(':id')
  async GetInventoryType(@Param() params): Promise<InventoryTypeModel> {
    return this.inventoryTypeService.findOne(params.id);
  }

  @Put(':id')
  async updateInventoryType(
    @Param('id') id: string,
    @Body() inventoryTypeDto: InventoryTypeDto,
  ): Promise<InventoryTypeModel> {
    return this.inventoryTypeService.update(id, inventoryTypeDto);
  }

  @Delete(':id')
  async removeInventoryType(
    @Param('id') id: string,
  ): Promise<InventoryTypeModel> {
    return this.inventoryTypeService.delete(id);
  }
}
