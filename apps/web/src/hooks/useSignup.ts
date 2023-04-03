import userApiService from '@/services/api/user.api.service';
import { useState } from "react";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signup = async ({
    email,
    password,
    userName
  }: {
    email: string,
    password: string,
    userName: string
  }) => {
    setIsLoading(true);
    await userApiService.register({
      email,
      password,
      userName
    });
    setIsLoading(false);
  }

  return { signup, isLoading }
}