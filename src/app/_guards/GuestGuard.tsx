import { cookies } from "next/headers"
import { ReactNode } from "react"
import { getUserFromHeader } from "../_utils/helper"
import { redirect } from "next/navigation";

export const GuestGuard = ({children}: {children: ReactNode}) => {
  // make a request to check for authUser
  //const cookieStore = cookies();
  //const session = cookieStore.get('session');

  const authUser = getUserFromHeader();
  
  if (authUser) return redirect('/');

  //console.log('auth guard--------', session?.value);
  return (
    <>
    {children}
    </>      
  )
}
