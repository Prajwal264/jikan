import { Schema, model } from 'mongoose';

export interface ICommunity {
  communityId: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const communitySchema = new Schema({
  communityId: {
    type: 'String', required: true, unique: true, index: true,
  },
  name: {
    type: 'String', required: true,
  },
  description: {
    type: 'String',
  },
  createdBy: {
    type: 'String', required: true, index: true,
  },
}, { timestamps: true });

export const Community = model('community', communitySchema);
