import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductModel } from 'tools/models/product.model';
import { ProductDto } from 'tools/dtos/product.dto';
import { ResourceService } from 'libs/services/resource.service';

@Injectable()
export class ProductService extends ResourceService<
  ProductModel,
  ProductDto,
  ProductDto
> {
  constructor(
    @InjectModel('Product')
    productMongo: Model<ProductModel>,
  ) {
    super(productMongo);
  }
}
