import { Schema, model } from 'mongoose';

export interface IUser {
  userId: string;
  email: string;
  userName: string;
  password: string;
}

const usersSchema = new Schema({
  userId: {
    type: 'String', required: true, unique: true, index: true,
  },
  email: {
    type: 'String', required: true, unique: true, index: true,
  },
  userName: {
    type: 'String', required: true, unique: true, index: true,
  },
  password: {
    type: 'String', required: true,
  },
}, { timestamps: true });

export const User = model('user', usersSchema);
