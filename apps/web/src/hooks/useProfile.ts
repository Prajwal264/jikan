import profileApiService from '@/services/api/profile-api.service';
import { useState } from 'react';

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const update = async ({
    firstName,
    lastName,
    profileImgS3Path,
  }: {
    firstName: string;
    lastName: string;
    profileImgS3Path: string;
  }) => {
    setIsLoading(true);
    await profileApiService.update({
      firstName,
      lastName,
      profileImgS3Path,
    });
    setIsLoading(false);
  };

  return { update, isLoading };
};
