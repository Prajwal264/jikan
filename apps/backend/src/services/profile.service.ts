import { injectable } from 'inversify';
import { User } from 'src/models/user.model';

@injectable()
export class ProfileService {
  async updateProfileForUser(userId: string, payload: {
    firstName: string;
    lastName: string;
    profileImgS3Key: string;
  }) {
    await User.updateOne({
      userId,
    }, payload);
  }
}
