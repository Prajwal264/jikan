import { injectable } from 'inversify';
import { Community } from '../models/community.model';

@injectable()
export class CommunityService {
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
    description: string
  }) {
    return new Community({
      name: payload.name,
      description: payload.description,
    }).save();
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
