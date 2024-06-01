"use client"

import { useGroupStore } from "@/frontend/features/group/stores/groupStore"
import { Avatar, IconButton } from "@chakra-ui/react";
import { HiBell, HiMiniClipboardDocumentList, HiSun } from "react-icons/hi2";

export const Header = () => {
  const {activeGroup} = useGroupStore();

  return (
    <header
    className="
    flex items-center justify-between p-4
    border-b-2 h-[60px]
    "
    >
      <div
      className="flex items-center gap-3"
      >
        <Avatar src={activeGroup?.image} size={'sm'}/>
        <h2 className="text-lg font-bold">
          {activeGroup?.name}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <IconButton
        aria-label=""
        icon={<HiBell size={24}/>}
        size={'sm'}
        />
        {/* <IconButton
        aria-label=""
        icon={<HiSun size={24}/>}
        size={'sm'}
        /> */}
        <IconButton
        aria-label=""
        icon={<HiMiniClipboardDocumentList size={24}/>}
        size={'sm'}
        />
      </div>
    </header>
  )
}
