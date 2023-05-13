import { inject, injectable } from 'inversify';
import { generate } from 'shortid';
import TYPES from '../types';
import { CommunityMember } from '../models/community-member.model';
import { Community } from '../models/community.model';
import { GroupService } from './group.service';

@injectable()
export class CommunityService {
  constructor(
    @inject(TYPES.GroupService) private readonly groupService: GroupService,
  ) { }

  public async getAllCommunities(userId: string) {
    return Community.find({
      createdBy: userId,
    }).lean();
  }

  public async getCommuntyById(communityId: string) {
    return Community.findOne({
      communityId,
    }).lean();
  }

  public async createCommunity(payload: {
    name: string,
    description: string,
    createdBy: string,
    iconS3Path: string,
  }) {
    const communityId = `community_${generate()}`;
    new Community({
      communityId,
      name: payload.name,
      description: payload.description,
      createdBy: payload.createdBy,
      iconS3Path: payload.iconS3Path,
    }).save();
    await new CommunityMember({
      communityId,
      userId: payload.createdBy,
    }).save();
    await this.groupService.createGroup({
      communityId,
      createdBy: payload.createdBy,
    });
  }

  public async editCommunity(communityId: string, payload: {
    name: string,
    description: string
  }) {
    return Community.updateOne({
      communityId,
    }, {
      $set: payload,
    });
  }
}
