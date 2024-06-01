import { Avatar, Image } from "@chakra-ui/react"
import moment from 'moment'

export const MessageCard = ({item}:any) => {
  return (
    <div
    className="flex items-start gap-3 max-w-[600px]"
    >
      <div>
        <Avatar src={item?.user?.image} size={'sm'}/>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 ">
          <span className="text-sm font-bold">
            {item.user.username}
          </span>
          <span className="text-gray-500 text-sm">
            {moment(item.createdAt).fromNow()}
          </span>
        </div>
        <div className="bg-slate-100 p-3 rounded-md">
          {item.content}
        </div>
        <div className="aspect-auto w-[200px] rounded-md !overflow-hidden">
          <Image 
          className="w-full object-cover"
          src={item.image}
          alt=""
          //fill
          />
        </div>
      </div>
    </div>
  )
}
