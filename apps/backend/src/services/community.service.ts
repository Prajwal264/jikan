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
}
