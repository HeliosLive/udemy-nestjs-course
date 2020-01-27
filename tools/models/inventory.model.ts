import * as mongoose from 'mongoose';
import { AuditModel } from './audit.model';
import { InventoryTypeModel } from './inventory-type.model';
import { ProductModel } from './product.model';

export class InventoryModel {
  id: string;
  barcode: number;
  description: string;
  audit: AuditModel;
  type: InventoryTypeModel;
  product: ProductModel;
}

export const InventorySchema = new mongoose.Schema({
  barcode: {
    type: Number,
    unique: [true, 'Inventory barcode must be unique'],
    required: [true, 'Inventory barcode is required'],
  },
  description: {
    type: String,
    required: [true, 'Inventory description is required'],
  },
  audit: { type: Object },
  type: { type: Object },
  product: {
    type: Object,
    required: [true, 'Inventory Product is required'],
  },
});
