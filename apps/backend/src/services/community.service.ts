import { injectable } from 'inversify';
import { Community } from 'src/models/community.model';

@injectable()
export class CommunityService {
  public async getAllCommunities(userId: string) {
    return await Community.find({
      createdBy: userId,
    }).lean();
  }
}
