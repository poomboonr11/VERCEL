'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/map'), { ssr: false });

export default function YourPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <DynamicComponent />
      ) : (
        <div>Server-side rendering is in progress...</div>
      )}
    </>
  );
}