import { GenericSuccessResponse, RestApi } from './rest-api.service';

export interface RegisterPayload {
  email: string;
  password: string;
  userName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  acesssToken: string;
  refreshToken: string;
}

class User extends RestApi {
  protected override getInstanceConfig() {
    return {
      baseURL: `${this.baseUrl}auth/`,
    };
  }

  public async register(payload: RegisterPayload): Promise<GenericSuccessResponse> {
    return this.post('register', payload);
  }

  public async login(payload: LoginPayload): Promise<LoginResponse> {
    return this.post('verify', payload);
  }
}

export default new User;
