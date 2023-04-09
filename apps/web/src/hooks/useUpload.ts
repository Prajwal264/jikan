import uploadApiService from '@/services/api/upload-api.service';
import { useState } from 'react';

export const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const upload = async (file: File, folderPath = '') => {
    setIsLoading(true);
    const response = await uploadApiService.uploadFile(file, folderPath);
    setIsLoading(false);
    return response;
  };

  return { upload, isLoading };
};
