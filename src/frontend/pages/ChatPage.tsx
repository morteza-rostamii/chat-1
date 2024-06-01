import { Chatroom } from "../compos/chat-room/Chatroom"
import { Groups } from "../compos/groups/Groups"
import { SideNav } from "../compos/side-nav/SideNav"

export const ChatPage = () => {
  return (
    <div className="flex h-full">
      
      <SideNav/>
      <Groups/>
      <Chatroom/>
    </div>
  )
}
