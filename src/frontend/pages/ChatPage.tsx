import { BaseModal } from "../compos/BaseModal"
import { Chatroom } from "../compos/chat-room/Chatroom"
import { Groups } from "../compos/groups/Groups"
import { SideNav } from "../compos/side-nav/SideNav"
import { BaseModalProvider } from "../providers/BaseModalProvider"

export const ChatPage = () => {
  return (
    <div className="flex h-full">

        <BaseModalProvider>
          <SideNav/>
          <Groups/>
          <Chatroom/>
          
          <BaseModal/>
        </BaseModalProvider>

      
    </div>
  )
}
