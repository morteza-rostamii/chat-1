"use client"
import { useAuthStore } from "@/frontend/features/auth/authStore"
import { useEffect } from "react";
import { UserCard } from "./UserCard";
import { IconButton } from "@chakra-ui/react";
import { HiMiniXMark } from "react-icons/hi2";

export const SearchedUsers = ({
  setSearchUser,
}:any) => {
  const {users, searchUsersByUsernameAct} = useAuthStore();

  useEffect(() => {
    searchUsersByUsernameAct({username: ''});
  }, []);

  return (
    <section
    className="
    flex flex-col gap-3
    p-4
    "
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="#mb-2 text-gray-500 underline">
          Invite people to your group
        </h2>
        <IconButton 
        aria-label=""
        icon={<HiMiniXMark size={24}/>}
        size={'sm'}
        onClick={() => setSearchUser(false)}
        />
      </div>
      <div className="flex flex-col gap-4">
        {
          users.length
          ?(
            users.map((el:any) => (
              <UserCard
              key={el.id}
              user={el}
              />
            ))
          ):('')
        }
      </div>
    </section>
  )
}
