'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client';
import BannerImageSection from '../components/BannerImageSection';

export default function Page() {
  return (
    <ApolloProvider client={client}>
      <main>
        <BannerImageSection />
      </main>
    </ApolloProvider>
  );
}
