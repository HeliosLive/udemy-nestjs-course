import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductTypeModel } from 'tools/models/product-type.model';
import { ProductTypeDto } from 'tools/dtos/product-type.dto';
import { ResourceService } from 'libs/services/resource.service';

@Injectable()
export class ProductTypeService extends ResourceService<
  ProductTypeModel,
  ProductTypeDto,
  ProductTypeDto
> {
  constructor(
    @InjectModel('ProductType')
    productTypeMongo: Model<ProductTypeModel>,
  ) {
    super(productTypeMongo);
  }
}
