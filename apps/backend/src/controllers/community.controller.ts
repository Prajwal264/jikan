import { Response } from 'express';
import { inject } from 'inversify';
import {
  interfaces, controller, request, response, httpGet,
} from 'inversify-express-utils';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { CommunityService } from 'src/services/community.service';
import { RequestWithContext } from 'src/types/request.type';
import TYPES from '../types';

@controller('/communities', authMiddleware)
export class CommunitiesController implements interfaces.Controller {
  constructor(
    @inject(TYPES.CommunityService) readonly communityService: CommunityService,
  ) { }

  @httpGet('/')
  public async getAllCommunties(@request() req: RequestWithContext, @response() res: Response) {
    const communities = await this.communityService.getAllCommunities(req.user.userId);
    return communities;
  }

}