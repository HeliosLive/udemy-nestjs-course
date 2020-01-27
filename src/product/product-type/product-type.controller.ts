import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ProductTypeModel } from 'tools/models/product-type.model';
import { ProductTypeDto } from 'tools/dtos/product-type.dto';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Post()
  async CreateProductType(
    @Body() body: ProductTypeDto,
  ): Promise<ProductTypeModel> {
    return this.productTypeService.create(body);
  }

  @Get()
  async getAllProductTypes(): Promise<ProductTypeModel[]> {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  async GetProductType(@Param() params): Promise<ProductTypeModel> {
    return this.productTypeService.findOne(params.id);
  }

  @Put(':id')
  async updateProductType(
    @Param('id') id: string,
    @Body() productTypeDto: ProductTypeDto,
  ): Promise<ProductTypeModel> {
    return this.productTypeService.update(id, productTypeDto);
  }

  @Delete(':id')
  async removeProductType(@Param('id') id: string): Promise<ProductTypeModel> {
    return this.productTypeService.delete(id);
  }
}
