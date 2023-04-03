import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import { Text, TextField, Button } from '@shopify/polaris'

export default function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleChange = React.useCallback(
    (value: string, fieldName: string) => {
      setFormData({
        ...formData,
        [fieldName]: value
      })
    },
    [],
  );

  const handleSubmit = () => {
    setLoading(true);
  }

  return (
    <Layout>
      <Seo />
      <div className='h-full grid place-content-center m-auto'>
        <div className="h-full flex w-96 m-0 p-0">
          <form className='shadow-form rounded-lg bg-white p-8 w-full'>
            <div className='mb-4'>
              <Text as='h2' variant='heading2xl'>Login</Text>
            </div>
            <div className='mb-4'>
              <TextField
                label="Email"
                type='email'
                value={formData.email}
                onChange={(e) => handleChange(e, 'email')}
                autoComplete="off"
                requiredIndicator
              />
            </div>
            <div className='mb-4'>
              <TextField
                label="Password"
                type='password'
                value={formData.password}
                onChange={(e) => handleChange(e, 'password')}
                autoComplete="off"
                requiredIndicator
              />
            </div>
            <Button onClick={handleSubmit} fullWidth primary loading={loading}>Login</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
