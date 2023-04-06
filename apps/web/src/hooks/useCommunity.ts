import communityApiService from '@/services/api/community-api.service';
import { useState } from "react";

export const useCommunity = () => {
  const [isLoading, setIsLoading] = useState(false);

  const create = async ({
    title,
    description,
  }: {
    title: string,
    description: string,
  }) => {
    setIsLoading(true);
    await communityApiService.create({
      title,
      description,
    });
    setIsLoading(false);
  }

  return { create, isLoading }
}