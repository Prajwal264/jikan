import { inject } from 'inversify';
import { controller } from 'inversify-express-utils';
import { GroupService } from '../services/group.service';
import TYPES from '../types';
import { RequestWithContext } from '../types/request.type';
import { authMiddleware } from '../middlewares/auth.middleware';

@controller('/groups', authMiddleware())
export class GroupController {
  constructor(
    @inject(TYPES.GroupService) private readonly groupService: GroupService,
  ) { }

  async createGroup(req: RequestWithContext, _: Response) {
    const { userId } = req.user;
    const { communityId } = req.body;

    await this.groupService.createGroup({
      createdBy: userId,
      communityId,
    });
  }
}
