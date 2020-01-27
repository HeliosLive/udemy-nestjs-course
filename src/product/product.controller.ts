import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'tools/dtos/product.dto';
import { ProductModel } from 'tools/models/product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async CreateProduct(@Body() body: ProductDto): Promise<ProductModel> {
    return this.productService.create(body);
  }

  @Get()
  async getAllProducts(): Promise<ProductModel[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async GetProduct(@Param() params): Promise<ProductModel> {
    return this.productService.findOne(params.id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductModel> {
    return this.productService.update(id, productDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.delete(id);
  }
}
