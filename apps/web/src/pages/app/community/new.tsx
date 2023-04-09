import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { useCommunity } from '@/hooks/useCommunity';
import { Button, Text, TextField } from '@shopify/polaris';

export default function CreateNewCommunityPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
  });
  const { isLoading, create } = useCommunity();
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

  const handleSubmit = async () => {
    create(formData);
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
        <div className='mb-8 text-center'>
          <div className='br-8 grid h-[4.5rem] w-[4.5rem] cursor-pointer place-content-center rounded-xl bg-gray-300/[0.3]'>
            <label
              htmlFor='communityIcon'
              className='grid h-[4.5rem] w-[4.5rem] cursor-pointer place-content-center text-[#8d8d8d]'
            >
              <svg
                width='32px'
                height='32px'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M16.006 4.364H5.455c-.904 0-1.637.732-1.637 1.636v13.091c0 .904.733 1.636 1.637 1.636h13.09c.904 0 1.637-.732 1.637-1.636v-8.87a4.603 4.603 0 01-1.636-.389v1.556l-1.637-1.636-5.318 5.318-2.864-2.863-3.272 3.272V6H15.83a4.583 4.583 0 01.175-1.636zM5.455 17.794v1.297h7.842l-4.57-4.57-3.272 3.273zm10.157 1.297h2.934v-5.388l-1.637-1.637-4.16 4.161 2.863 2.864zm-4.43-12.273a2.455 2.455 0 110 4.91 2.455 2.455 0 010-4.91zm0 1.637a.818.818 0 100 1.636.818.818 0 000-1.636z'
                  fill='currentColor'
                ></path>
                <path
                  stroke='currentColor'
                  stroke-width='1.506'
                  d='M17.455 5.457H24M20.729 8.727V2.182'
                ></path>
              </svg>
              <input type='file' id='communityIcon' className='hidden' />
            </label>
          </div>
        </div>
        <div className='mb-8  text-center'>
          <Text as='p' variant='bodyLg'>
            Communites are spaces for discussion where people can share
            thoughts, images, videos and links.
          </Text>
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
