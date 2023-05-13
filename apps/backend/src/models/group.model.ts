import { Schema, model } from 'mongoose';

export interface IGroup {
  communityId: string;
  groupId: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const groupSchema = new Schema({
  communityId: {
    type: 'String', required: true, index: true,
  },
  groupId: {
    type: 'String', required: true, unique: true, index: true,
  },
  name: {
    type: 'String', required: true,
  },
  description: {
    type: 'String',
  },
  iconS3Path: {
    type: 'String',
  },
  createdBy: {
    type: 'String', required: true, index: true,
  },
}, { timestamps: true });

export const Group = model('Group', groupSchema);
