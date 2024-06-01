import { Avatar, Button } from "@chakra-ui/react"
import { HiMiniPlus } from "react-icons/hi2"

export const UserCard = ({user}:any) => {
  return (
    <div className="flex items-center gap-2 justify-between 
    bg-white p-3 card-1
    ">
      <div className="flex items-center gap-3 ">
        <div>
        <Avatar src={user.image}/>
        </div>
        <p>
        {user.username}
        </p>
      </div>
      <div className="#flex-1">
        <Button
        colorScheme="green"
        leftIcon={<HiMiniPlus size={24}/>}
        size={'sm'}
        >
          Invite
        </Button>
      </div>
    </div>
  )
}