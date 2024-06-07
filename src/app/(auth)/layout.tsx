
import { GuestGuard } from '../_guards/GuestGuard';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GuestGuard>
        {children}
      </GuestGuard>
    </>
        
  );
}
