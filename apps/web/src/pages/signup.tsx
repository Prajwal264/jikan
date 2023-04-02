import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { Text, TextField, Button } from '@shopify/polaris'

export default function SignupPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    name: '',
    password: ''
  });

  const handleChange = React.useCallback(
    (value: string, fieldName: string) => {
      setFormData({
        ...formData,
        [fieldName]: value
      })
    },
    [],
  );
  const router = useRouter();
  return (
    <Layout>
      <Seo />
      <div className='h-full grid place-content-center m-auto'>
        <div className="h-full flex w-96 m-0 p-0">
          <div className='shadow-form rounded-lg bg-white p-8 w-full'>
            <div className='mb-4'>
              <Text as='h2' variant='heading2xl'>Signup</Text>
            </div>
            <div className='mb-4'>
              <TextField
                label="User Name"
                value={formData.name}
                onChange={(e) => handleChange(e, 'name')}
                autoComplete="off"
                requiredIndicator
              />
            </div>
            <div className='mb-4'>
              <TextField
                label="Email"
                value={formData.email}
                onChange={(e) => handleChange(e, 'email')}
                autoComplete="off"
                requiredIndicator
              />
            </div>
            <div className='mb-4'>
              <TextField
                label="Password"
                value={formData.password}
                onChange={(e) => handleChange(e, 'password')}
                autoComplete="off"
                requiredIndicator
              />
            </div>
            <Button fullWidth primary>Sign up</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
