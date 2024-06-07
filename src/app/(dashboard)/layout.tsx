
import { AuthGuard } from '../_guards/AuthGuard';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard>
        {children}
      </AuthGuard>
    </>
        
  );
}
