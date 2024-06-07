//import Image from "next/image";

import { redirect } from "next/navigation";
//import { IUser } from "../_dtos/user-dto";

// async function getUsers() {
//   const response = await apis.getUsers();
//   if (!response?.data) return [];
//   return response.data.data; 
// }

export default async function Home() {
  return redirect('/chatroom');
  return <></>
}
