import { GenericSuccessResponse, RestApi } from './rest-api.service';

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  profileImgS3Path: string;
}

class Profile extends RestApi {
  protected override getInstanceConfig() {
    return {
      baseURL: `${this.baseUrl}profiles/`,
    };
  }

  public async update(
    payload: UpdateProfilePayload
  ): Promise<GenericSuccessResponse> {
    return this.put('', payload);
  }
}

export default new Profile();
