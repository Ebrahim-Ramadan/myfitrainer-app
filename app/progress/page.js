import React, { Suspense } from 'react';
import { Progress } from '@/components/progress/progress';
import { Reload } from '@/components/globals/Reload';

const Page = () => {
  return (
    <Suspense fallback={<Reload/>}>
      <Progress />    
    </Suspense>
  );
};

export default Page;
