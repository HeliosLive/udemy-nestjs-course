import * as mongoose from 'mongoose';
import { AuditModel } from './audit.model';

export class ProductTypeModel {
  id: string;
  name: string;
  audit: AuditModel;
}

export const ProductTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Product Type Name must be unique'],
    required: [true, 'Product Type Name is required'],
  },
  audit: { type: Object },
});
