import { interfaces, controller, httpPut, request, response } from "inversify-express-utils";
import { authMiddleware } from "../middlewares/auth.middleware";
import { RequestWithContext } from "../types/request.type";

@controller('/profile', @authMiddleware())
export class ProfileController implements interfaces.Controller {

  @httpPut('/:userId')
  updateProfileForUser(@request() req: RequestWithContext, @response() _: Response) {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    await this.profileService.updateProfileForUser(userId, {
      firstName,
      lastName,
    })
    return { success: true }
  }
}

