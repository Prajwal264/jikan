import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();
  React.useEffect(() => {
    // check login
    // need to build this page later
    router.push('/signup');
  }, [])
  return (
    <Layout>
      <Seo />
      Home
    </Layout>
  );
}
