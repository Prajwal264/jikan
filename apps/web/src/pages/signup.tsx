import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { Text, TextField, Button } from '@shopify/polaris';
import { useSignup } from '@/hooks/useSignup';

export default function SignupPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    userName: '',
    password: '',
  });
  const { signup, isLoading } = useSignup();
  const router = useRouter();

  const handleChange = React.useCallback(
    (value: string, fieldName: keyof typeof formData) => {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    },
    [formData]
  );

  const handleSubmit = async () => {
    await signup(formData);
    router.push('./login');
  };

  return (
    <Layout>
      <Seo />
      <div className='m-auto grid h-full'>
        <div className='m-auto flex h-max w-1/4 p-0'>
          <div className='shadow-form h-max w-full rounded-lg bg-white p-8'>
            <div className='mb-4'>
              <Text as='h2' variant='heading3xl'>
                Create an Account
              </Text>
            </div>
            <div className='mb-4'>
              <TextField
                label='User name'
                value={formData.userName}
                onChange={(e) => handleChange(e, 'userName')}
                autoComplete='off'
                requiredIndicator
              />
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
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
