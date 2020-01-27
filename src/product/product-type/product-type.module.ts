import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { ProductTypeSchema } from 'tools/models/product-type.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductType', schema: ProductTypeSchema },
    ]),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
})
export class ProductTypeModule {}
