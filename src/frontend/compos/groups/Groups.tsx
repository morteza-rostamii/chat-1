"use client"
import helper from "@/utils/helper"
import { faker } from '@faker-js/faker';
import { useEffect, useMemo, useState } from "react";
import { SearchBox } from "./SearchBox";
import { useGroupStore } from "@/frontend/features/group/stores/groupStore";
import { MemberCard } from "./MemberCard";
import { NoContent } from "../alerts/NoMembers";
import { SearchedUsers } from "./SearchedUsers";
import { ScrollBox } from "../ScrollBox";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Groups = () => {
  const [searchUser, setSearchUser] = useState(false);
  const {activeGroup} = useGroupStore();

  console.log(searchUser)
  return (
    <div
    className="
    border-r-2 #p-4 bg-slate-50 basis-[350px] overflow-hidden
    hidden md:block
    "
    >
      <header
      className="
      flex items-center
      border-b-2 h-[60px] p-4
      "
      >
        <SearchBox setSearchUser={setSearchUser}/>
      </header>
      
      <div
      style={{display: searchUser ? 'block' : 'none'}}
      >
        <ScrollArea 
        style={{height: 'calc(100vh - 60px)'}}
        >
          <SearchedUsers setSearchUser={setSearchUser}/>
        </ScrollArea>
      </div>

      <section
      style={{display: searchUser ? 'none' : 'block'}}
      >
        <div
        className="p-4"
        style={{
          display: !activeGroup?.members?.length ? 'block' : 'none'
        }}
        >
          <NoContent
          text={'This group does not have any member yet'}
          btnTxt={'Find new member'}
          onClick={() => setSearchUser(true)}
          />
        </div>

        <div 
        //className=" overflow-y-auto "
        style={{
          display: activeGroup?.members?.length ? 'block' : 'none'
        }}
        >
          <ScrollArea style={{height: 'calc(100vh - 68px)'}}>
            <h2
            className="text-lg font-bold #mb-4 text-green-600 p-4 pb-0 underline"
            >
            {searchUser ? "Users" : "Group's Members"}
            </h2>

            <ul
            className="flex flex-col gap-4 p-4 #pb-20"
            style={{
              height: 'calc(100vh - 60px)'
            }}
            >
              {
                activeGroup?.members?.length
                ?(
                  activeGroup.members.map((member:any) => (
                    <MemberCard
                    key={member.id}
                    item={member}
                    />
                  ))
                ):''
              }
            </ul>
          </ScrollArea>
        </div>
      </section>
    </div>
  )
}