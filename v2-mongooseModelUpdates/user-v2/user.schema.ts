import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'User name is required'] },
  surname: { type: String, required: [true, 'User surname is required'] },
  imageUrl: { type: String },
  securityCode: { type: Number },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'User email must be unique'],
    required: [true, 'User Email address is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'is invalid'],
  },
  password: { type: String, required: [true, 'User password is required'] },
  // birthDay: { type: Date },
  audit: { type: Object },
  roles: { type: Array },
});
