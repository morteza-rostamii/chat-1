"use client"

import { useMessageStore } from "@/frontend/features/message/stores/messageStore"
import { Header } from "./Header"
import { MessageCard } from "./MessageCard";
import { useEffect } from "react";
import { Button, IconButton } from "@chakra-ui/react";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { NoContent } from "../alerts/NoMembers";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Chatroom = () => {
  const {
    messages, 
    loadMessages,
    getMessagesByGroupAct,
  } = useMessageStore();

  useEffect(() => {
    getMessagesByGroupAct();
  }, []);

  return (
    <div
    className="
    flex-1 h-full
    "
    >
      <Header/>

      <div className="overflow-hidden #h-full">
        <ScrollArea style={{height: 'calc(100vh - 166px)'}}>
          <div
          className="flex flex-col gap-14 p-4"
          
          >
            {
              messages.length
              ?(
                messages.map((msg:any) => (
                  <MessageCard
                  key={msg.id}
                  item={msg}
                  />
                ))
              ):(
                <NoContent
                text={'Send your first message to this group'}
                />
              )
            }
          </div>
        </ScrollArea>
        <div
        className="
        p-4 border-t-2 bg-slate-50
        "
        >
          <div className="flex items-center gap-4">
            <IconButton
            aria-label=""
            icon={<BsFillEmojiSunglassesFill size={24}/>}
            size={'sm'}
            colorScheme="blue"
            />
            <IconButton
            aria-label=""
            icon={<FaCloudUploadAlt size={24}/>}
            size={'sm'}
            colorScheme="blue"
            />
          </div>
          <form
          className="flex items-center justify-between gap-4 "
          >
            <input 
            className="flex-1 #h-full p-2 border-none outline-none bg-transparent"
            type="search" 
            name="" 
            id="" 
            placeholder="Type a message"
            />
            <Button
            className=""
            colorScheme="green"
            >
              SEND
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
