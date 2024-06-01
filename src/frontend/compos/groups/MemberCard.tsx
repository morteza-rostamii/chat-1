import { Avatar } from "@chakra-ui/react"
//import moment from 'moment'
import { GoDotFill } from "react-icons/go";

export const MemberCard = ({item}:any) => {
  
  return (
    <li
    className="
    flex items-center gap-3 justify-between p-3 rounded-md border-2 border-slate-200
    bg-white
    "
    >
      <div className="flex items-center gap-3">
        <Avatar src={item.image} size={'sm'}/>
        <span>
          {item.username}
        </span>
      </div>
      <div className="text-green-500">
      <GoDotFill size={24}/>
      </div>
    </li>
  )
}
