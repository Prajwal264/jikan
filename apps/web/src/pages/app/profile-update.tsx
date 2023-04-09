import * as React from 'react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { Button, Text, TextField } from '@shopify/polaris';
import { useUpload } from '@/hooks/useUpload';
import { useProfile } from '@/hooks/useProfile';

export default function UpdateProfilePage() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    profileImgS3Path: '',
  });
  const [icon, setIcon] = React.useState('');
  const { update, isLoading } = useProfile();
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
    const { s3FileName } = await upload(file, 'profile/icon');
    const image = URL.createObjectURL(file);
    setIcon(image);
    handleChange(`profile/icon/${s3FileName}`, 'profileImageS3Path');
  };

  const handleSubmit = async () => {
    await update(formData);
    router.push('');
  };

  return (
    <Layout>
      <Seo />
      <div className='m-auto mt-24 flex h-full max-w-xl flex-col items-center' >
        <div className='mb-8 text-center' >
          <Text as='h2' variant='heading4xl' >
            Set up your profile
          </Text>
        </div>
        <div className='mb-8  text-center' >
          <Text as='p' variant='bodyLg' >
            Choose the name and picture you want to use with your community.
          </Text>
        </div>
        <div className='mb-8 text-center' >
          <div className='br-8 grid h-[4.5rem] w-[4.5rem] cursor-pointer place-content-center rounded-xl bg-gray-300/[0.3]' >
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
            )
            }
          </div>
        </div>
        < div className='mb-8 w-full px-16' >
          <TextField
            label='Community name'
            type='text'
            value={formData.firstName}
            onChange={(e) => handleChange(e, 'name')}
            autoComplete='off'
            requiredIndicator
          />
        </div>
        < div className='mb-8 h-16 w-full px-16' >
          <TextField
            label='Description'
            type='text'
            value={formData.lastName}
            onChange={(e) => handleChange(e, 'description')}
            autoComplete='off'
            requiredIndicator
            multiline
          />
        </div>
        < div className='mb-8 h-16 w-full px-16' >
          <Button onClick={handleSubmit} fullWidth primary loading={isLoading} >
            Create Community
          </Button>
        </div>
      </div>
    </Layout >
  );
}
