// app/providers.tsx
'use client'

import { useAuthStore } from '@/frontend/features/auth/authStore';
import { useOnce } from '@/frontend/hooks/useOnce'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  // get authUser for client:
  const {getAuthAct} = useAuthStore();
  useOnce(() => {
    getAuthAct();
  });

  return <ChakraProvider>{children}</ChakraProvider>
}