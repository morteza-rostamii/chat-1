"use client"
import { useState } from "react";
import { useGroupStore } from "@/frontend/features/group/stores/groupStore";
import { MemberCard } from "./MemberCard";
import { NoContent } from "../alerts/NoMembers";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Groups = () => {
  const {groups} = useGroupStore();

  return (
    <div
    className="
    border-r-2 #p-4 bg-slate-50 basis-[350px] overflow-hidden
    hidden md:block
    "
    >
      <section
      >
        <div
        className="p-4"
        style={{
          display: !groups?.length ? 'block' : 'none'
        }}
        >
          <NoContent
          text={'You have no group at the moment!'}
          btnTxt={'Create A New Group'}
          
          />
        </div>

        <div 
        //className=" overflow-y-auto "
        style={{
          display: groups?.length ? 'block' : 'none'
        }}
        >
          <ScrollArea style={{height: 'calc(100vh - 68px)'}}>
            <h2
            className="text-lg font-bold #mb-4 text-green-600 p-4 pb-0 underline"
            >
            Groups
            </h2>

            <ul
            className="flex flex-col gap-4 p-4 #pb-20"
            style={{
              height: 'calc(100vh - 60px)'
            }}
            >
              {
                groups?.members?.length
                ?(
                  groups.members.map((member:any) => (
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