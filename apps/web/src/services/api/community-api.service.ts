import { GenericSuccessResponse, RestApi } from './rest-api.service';

export interface CreateCommunityPayload {
  name: string;
  description: string;
  iconS3Path: string;
}

class Community extends RestApi {
  protected override getInstanceConfig() {
    return {
      baseURL: `${this.baseUrl}communities/`,
    };
  }

  public async create(
    payload: CreateCommunityPayload
  ): Promise<GenericSuccessResponse> {
    return this.post('', payload);
  }
}

export default new Community();
