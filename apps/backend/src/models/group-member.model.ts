import { model, Schema } from 'mongoose';

export interface IGroupMemeber {
  communityId: string;
  userId: string;
}

const groupMemberSchema = new Schema({
  groupId: {
    type: 'String', required: true, index: true,
  },
  userId: {
    type: 'String', required: true, index: true,
  },
}, { timestamps: true });

export const GroupMember = model('groupmemeber', groupMemberSchema);
