import * as mongoose from 'mongoose';
import { AuditModel } from './audit.model';
import { ProductTypeModel } from './product-type.model';

export class ProductModel {
  id: string;
  name: string;
  audit: AuditModel;
  type: ProductTypeModel;
}

export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Product Name must be unique'],
    required: [true, 'Product Name is required'],
  },
  audit: { type: Object },
  type: { type: Object, required: [true, 'Product Type is required'] },
});
