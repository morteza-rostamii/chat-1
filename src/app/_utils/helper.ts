import { headers } from "next/headers";

export function getUserFromHeader() {
  const headersList = headers();
  const authUser:any = headersList.get('user');
  if (!authUser) return null;
  return JSON.parse(authUser);
}