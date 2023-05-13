import { Schema, model } from 'mongoose';

export interface IUser {
  userId: string;
  email: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImgS3Path: string;
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
  firstName: {
    type: 'String',
  },
  lastName: {
    type: 'String',
  },
  password: {
    type: 'String', required: true,
  },
  profileImgS3Path: {
    type: 'String',
  },
}, { timestamps: true });

export const User = model('user', usersSchema);
