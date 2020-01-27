import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryTypeSchema } from 'tools/models/inventory-type.model';
import { InventoryTypeController } from './inventory-type.controller';
import { InventoryTypeService } from './inventory-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'InventoryType', schema: InventoryTypeSchema },
    ]),
  ],
  controllers: [InventoryTypeController],
  providers: [InventoryTypeService],
})
export class InventoryTypeModule {}
