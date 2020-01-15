import { AuditModel } from './audit.model';
import { ProductTypeModel } from './product-type.model';

export class ProductModel {
  id: string;
  name: string;
  audit: AuditModel;
  type: ProductTypeModel;
}
