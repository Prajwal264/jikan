import communityApiService from '@/services/api/community-api.service';
import { useState } from 'react';

export const useCommunity = () => {
  const [isLoading, setIsLoading] = useState(false);

  const create = async ({
    name,
    description,
    iconS3Path,
  }: {
    name: string;
    description: string;
    iconS3Path: string;
  }) => {
    setIsLoading(true);
    await communityApiService.create({
      name,
      description,
      iconS3Path,
    });
    setIsLoading(false);
  };

  return { create, isLoading };
};
