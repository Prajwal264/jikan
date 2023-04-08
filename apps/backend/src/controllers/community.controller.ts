import { Response } from 'express';
import { inject } from 'inversify';
import {
  interfaces, controller, request, response, httpGet, httpPost, httpPut,
} from 'inversify-express-utils';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { CommunityService } from 'src/services/community.service';
import { RequestWithContext } from 'src/types/request.type';
import TYPES from '../types';

@controller('/communities', authMiddleware())
export class CommunitiesController implements interfaces.Controller {
  constructor(
    @inject(TYPES.CommunityService) readonly communityService: CommunityService,
  ) { }

  @httpGet('/')
  public async getAllCommunties(@request() req: RequestWithContext, @response() _: Response) {
    const communities = await this.communityService.getAllCommunities(req.user.userId);
    return communities;
  }

  @httpGet('/:communityId')
  public async getCommuntyById(@request() req: RequestWithContext, @response() _: Response) {
    const { communityId } = req.params;
    const communities = await this.communityService.getCommuntyById(communityId);
    return communities;
  }

  @httpPost('/')
  public async createCommunity(@request() req: RequestWithContext, @response() _: Response) {
    const { name, description } = req.body;
    if (!name) {
      throw new Error('name is mandatory');
    }
    await this.communityService.createCommunity({
      name,
      description,
    });
    return { success: true };
  }

  @httpPut('/:communityId')
  public async editCommunity(@request() req: RequestWithContext, @response() _: Response) {
    const { communityId } = req.params;
    const { name, description } = req.body;
    if (!name) {
      throw new Error('name is mandatory');
    }
    await this.communityService.editCommunity(communityId, {
      name,
      description,
    });
    return { success: true };
  }
}
