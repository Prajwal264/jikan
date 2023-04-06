import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { useCommunity } from '@/hooks/useCommunity';
import { Text, TextField } from '@shopify/polaris';

export default function CreateNewCommunityPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    description: ''
  });
  const { isLoading, create } = useCommunity();
  const router = useRouter();

  const handleChange = React.useCallback(
    (value: string, fieldName: string) => {
      setFormData({
        ...formData,
        [fieldName]: value
      })
    },
    [formData],
  );

  const handleSubmit = async () => {
  }

  return (
    <Layout>
      <Seo />
      <div className='h-full max-w-xl flex flex-col items-center m-auto mt-24'>
        <div className='mb-8 text-center'>
          <Text as='h2' variant='heading4xl'>Create a new community</Text>
        </div>
        <div className='mb-8  text-center'>
          <Text as='p' variant='bodyLg'>Communites are spaces for discussion where people can share thoughts, images, videos and links.</Text>
        </div>
        <div className='mb-8 w-full px-16'>
          <TextField
            label="Community name"
            type='text'
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
            autoComplete="off"
            requiredIndicator
          />
        </div>
        <div className='mb-8 w-full px-16 h-16'>
          <TextField
            label="Description"
            type='text'
            value={formData.description}
            onChange={(e) => handleChange(e, 'description')}
            autoComplete="off"
            requiredIndicator
            multiline
          />
        </div>
      </div>
    </Layout>
  );
}
