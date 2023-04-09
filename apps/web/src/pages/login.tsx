import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { Text, TextField, Button } from '@shopify/polaris';
import { useLogin } from '@/hooks/useLogin';

export default function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const { isLoading, login } = useLogin();
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
    await login(formData);
    router.push('/app/community/new');
  };

  return (
    <Layout>
      <Seo />
      <div className='m-auto grid h-full'>
        <div className='m-auto flex h-max w-1/4 p-0'>
          <form className='shadow-form h-max w-full rounded-lg bg-white p-8'>
            <div className='mb-4'>
              <Text as='h2' variant='heading3xl'>
                Login
              </Text>
            </div>
            <div className='mb-4'>
              <TextField
                label='Email'
                type='email'
                value={formData.email}
                onChange={(e) => handleChange(e, 'email')}
                autoComplete='off'
                requiredIndicator
              />
            </div>
            <div className='mb-4'>
              <TextField
                label='Password'
                type='password'
                value={formData.password}
                onChange={(e) => handleChange(e, 'password')}
                autoComplete='off'
                requiredIndicator
              />
            </div>
            <Button
              onClick={handleSubmit}
              fullWidth
              primary
              loading={isLoading}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
