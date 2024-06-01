//import Image from "next/image";

import { ChatPage } from "@/frontend/pages/ChatPage";
import apis from "@/routes/apis";
//import { IUser } from "../_dtos/user-dto";

// async function getUsers() {
//   const response = await apis.getUsers();
//   if (!response?.data) return [];
//   return response.data.data; 
// }

export default async function Home() {
  //const users = await getUsers();
  
  return (
    <main className="#flex h-full">
      <ChatPage/>
      
    </main>
  );
}
