import { injectable } from 'inversify';
import { generate } from 'shortid';
import { GroupMember } from '../models/group-member.model';
import { Group } from '../models/group.model';

@injectable()
export class GroupService {
  public async createGroup(payload: {
    createdBy: string,
    communityId: string,
  }) {
    const groupId = `group_${generate()}`;
    new Group({
      groupId,
      communityId: payload.communityId,
      createdBy: payload.createdBy,
      createdAt: new Date(),
    }).save();

    new GroupMember({
      groupId,
      userId: payload.createdBy,
    }).save();
  }
}
