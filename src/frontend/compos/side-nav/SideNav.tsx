"use client"
import { useGroupStore } from "@/frontend/features/group/stores/groupStore";
import { useBaseModal } from "@/frontend/providers/BaseModalProvider";
import { Avatar, Button, IconButton } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaPlus, FaSnapchat } from "react-icons/fa";
import { HiOutlinePlusSm } from "react-icons/hi";
import { CreateGroup } from "./CreateGroup";
import { Profile } from "./Profile";

export const SideNav = () => {
  const {groups, getGroupsAct} = useGroupStore(); 
  const {modalOn} = useBaseModal();

  useEffect(() => {
    getGroupsAct();
  }, []);

  
  return (
    <div
    className="
    sticky top-0 left-0
    flex flex-col justify-between items-center
    bg-green-500 h-full w-[70px] p-4
    "
    >
      <div className="flex flex-col gap-4">
        <div className="grid place-content-center text-white border-b-2 border-white pb-1">
        <FaSnapchat size={40}/>
        </div>

        <div
        className="grid place-content-center"
        >
          <IconButton
          aria-label=""
          icon={<HiOutlinePlusSm size={24}/>}
          isRound={true}
          onClick={() => modalOn(<CreateGroup/>, {title: 'Create a Group'})}
          />
        </div>

        <ul
        className="!flex !flex-col !gap-6 items-center"
        >
          {
            groups.length
            ?(
              groups.map((group:any, i:number) => {
                if (i > 5) return '';
                  
                return (
                  <div key={group.id}>
                    <IconButton
                    aria-label=""
                    isRound={true}
                    icon={<Avatar
                      className="border-2 border-white"
                      key={group.id}
                      src={group.image}
                      //size={'sm'}
                      />}
                    />
                  </div>
                )
              })
            ):''
          }
          <Button
          className="!text-white"
          size={'sm'}
          variant={'link'}
          colorScheme="whiteAlpha"
          >
            More
          </Button>
        </ul>
      </div>

      <IconButton 
      aria-label=""
      icon={<Avatar/>}
      isRound={true}
      onClick={() => modalOn(<Profile/>, {title: 'Update Your Profile'})}
      >
      </IconButton>
    </div>
  )
}
