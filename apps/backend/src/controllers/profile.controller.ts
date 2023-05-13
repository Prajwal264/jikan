import { inject } from 'inversify';
import { interfaces, controller, httpPut } from 'inversify-express-utils';
import { Response } from 'express';
import { RequestWithContext } from '../types/request.type';
import TYPES from '../types';
import { ProfileService } from '../services/profile.service';
import { authMiddleware } from '../middlewares/auth.middleware';

@controller('/profiles', authMiddleware())
export class ProfileController implements interfaces.Controller {
  constructor(
    @inject(TYPES.ProfileService) readonly profileService: ProfileService,
  ) { }

  @httpPut('/')
  async updateProfileForUser(req: RequestWithContext, _: Response) {
    const { userId } = req.user;
    const { firstName, lastName, profileImgS3Path } = req.body;
    await this.profileService.updateProfileForUser(userId, {
      firstName,
      lastName,
      profileImgS3Path,
    });
    return { success: true };
  }
}
