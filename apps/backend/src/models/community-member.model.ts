import { model, Schema } from 'mongoose';

export interface ICommunityMember {
  communityId: string;
  userId: string;
}

const communityMemberSchema = new Schema({
  communityId: {
    type: 'String', required: true, index: true,
  },
  userId: {
    type: 'String', required: true, index: true,
  },
}, { timestamps: true });

export const CommunityMember = model('communitymember', communityMemberSchema);
