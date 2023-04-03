import userApiService from '@/services/api/user.api.service';
import cookie from '@/services/cookie.service';
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({
    email,
    password,
  }: {
    email: string,
    password: string,
  }) => {
    setIsLoading(true);
    const { acesssToken, refreshToken } = await userApiService.login({
      email,
      password,
    });
    cookie.set('accessToken', acesssToken);
    cookie.set('refreshToken', refreshToken);
    setIsLoading(false);
  }

  return { login, isLoading }
}