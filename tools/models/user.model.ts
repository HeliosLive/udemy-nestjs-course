import { AuditModel } from './audit.model';
import { RoleModel } from './role.model';
import { GroupModel } from './group.model';
import * as mongoose from 'mongoose';

export class UserModel {
  id: string;
  name: string;
  surname: string;
  image: string;
  email: string;
  password: string;
  birthDay: Date;
  audit: AuditModel;
  roles: RoleModel[];
  groups: GroupModel[];
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'User name is required'] },
  surname: { type: String, required: [true, 'User surname is required'] },
  image: { type: String },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'User email must be unique'],
    required: [true, 'User Email address is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'is invalid'],
  },
  password: { type: String, required: [true, 'User password is required'] },
  birthDay: { type: Date, required: [true, 'User birthDay is required'] },
  audit: { type: Object },
  roles: { type: Array },
  groups: { type: Array },
});
