import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { useCommunity } from '@/hooks/useCommunity';
import { Button, Text, TextField } from '@shopify/polaris';
import { useUpload } from '@/hooks/useUpload';

export default function CreateNewCommunityPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    iconS3Path: '',
  });
  const [icon, setIcon] = React.useState('');
  const { isLoading, create } = useCommunity();
  const { upload } = useUpload();
  const router = useRouter();

  const handleChange = React.useCallback(
    (value: string, fieldName: string) => {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    },
    [formData]
  );

  const uploadIcon: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file: File = (e.target as any)?.files?.[0];
    const { s3FileName } = await upload(file, 'community/icon');
    const image = URL.createObjectURL(file);
    setIcon(image);
    handleChange(`community/icon/${s3FileName}`, 'iconS3Path');
  };

  const handleSubmit = async () => {
    await create(formData);
    router.push('');
  };

  return (
    <Layout>
      <Seo />
      <div className='m-auto mt-24 flex h-full max-w-xl flex-col items-center'>
        <div className='mb-8 text-center'>
          <Text as='h2' variant='heading4xl'>
            Create a new community
          </Text>
        </div>
        <div className='mb-8  text-center'>
          <Text as='p' variant='bodyLg'>
            Communites are spaces for discussion where people can share
            thoughts, images, videos and links.
          </Text>
        </div>
        <div className='mb-8 text-center'>
          <div className='br-8 grid h-[4.5rem] w-[4.5rem] cursor-pointer place-content-center rounded-xl bg-gray-300/[0.3]'>
            {!icon ? (
              <label
                htmlFor='communityIcon'
                className='grid h-[4.5rem] w-[4.5rem] cursor-pointer place-content-center text-[#8d8d8d]'
              >
                <img src="/svg/image-upload-placeholder.svg" />
                <input
                  type='file'
                  id='communityIcon'
                  className='hidden'
                  onChange={uploadIcon}
                />
              </label>
            ) : (
              <img
                className='br-8 grid h-[4.5rem] w-[4.5rem] rounded-xl object-cover'
                src={icon}
                alt='communityIcon'
              />
            )}
          </div>
        </div>
        <div className='mb-8 w-full px-16'>
          <TextField
            label='Community name'
            type='text'
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
            autoComplete='off'
            requiredIndicator
          />
        </div>
        <div className='mb-8 h-16 w-full px-16'>
          <TextField
            label='Description'
            type='text'
            value={formData.description}
            onChange={(e) => handleChange(e, 'description')}
            autoComplete='off'
            requiredIndicator
            multiline
          />
        </div>
        <div className='mb-8 h-16 w-full px-16'>
          <Button onClick={handleSubmit} fullWidth primary loading={isLoading}>
            Create Community
          </Button>
        </div>
      </div>
    </Layout>
  );
}
