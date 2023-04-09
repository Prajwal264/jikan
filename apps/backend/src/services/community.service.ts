import { injectable } from 'inversify';
import { generate } from 'shortid';
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
    description: string,
    createdBy: string,
    iconS3Path: string,
  }) {
    return new Community({
      communityId: generate(),
      name: payload.name,
      description: payload.description,
      createdBy: payload.createdBy,
      iconS3Path: payload.iconS3Path,
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
