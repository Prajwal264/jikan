import { injectable } from 'inversify';
import { User } from '../models/user.model';

@injectable()
export class ProfileService {
  async updateProfileForUser(userId: string, payload: {
    firstName: string;
    lastName: string;
    profileImgS3Path: string;
  }) {
    await User.updateOne({
      userId,
    }, payload);
  }
}
