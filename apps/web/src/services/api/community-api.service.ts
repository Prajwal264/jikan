import { GenericSuccessResponse, RestApi } from './rest-api.service';

export interface CreateCommunityPayload {
  title: string;
  description: string;
}

class Community extends RestApi {
  protected override getInstanceConfig() {
    return {
      baseURL: `${this.baseUrl}community/`,
    };
  }

  public async create(payload: CreateCommunityPayload): Promise<GenericSuccessResponse> {
    return this.post('', payload);
  }
}

export default new Community();
