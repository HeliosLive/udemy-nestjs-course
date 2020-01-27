import * as mongoose from 'mongoose';
import { AuditModel } from './audit.model';

export class InventoryTypeModel {
  id: string;
  name: string;
  audit: AuditModel;
}

export const InventoryTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Inventory Type Name must be unique'],
    required: [true, 'Inventory Type Name is required'],
  },
  audit: { type: Object },
});
