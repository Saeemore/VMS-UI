// ✅ src/pages/RegisterPage.jsx
import React from 'react';
import VisitorForm from '../components/VisitorForm'; // adjust path if different
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 👇 Create a local QueryClient instance for this page
const queryClient = new QueryClient();

export default function RegisterPage() {
  return (
    // 👇 Wrap VisitorForm with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <VisitorForm />
    </QueryClientProvider>
  );
}
