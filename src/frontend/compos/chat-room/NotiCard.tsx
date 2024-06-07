import helper from "@/utils/helper"
import { Avatar, Button } from "@chakra-ui/react"
import moment from "moment"
import Link from "next/link"

export const NotiCard = ({item}:any) => {
  return (
    <div 
    className="flex gap-4 card-1 bg-green-50"
    >
      <div>
        <Avatar
        src=""
        size={'sm'}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <div className="flex items-center gap-3">
          <span className="font-bold">
            {item.sender.username}
          </span>
          <span className="text-gray-500">
            {moment(item.createdAt).fromNow()}
          </span>
        </div>

        <div>
          {helper.truncateText(item.content, 50)}
        </div>
        <Button 
        as={Link}
        variant={'link'}
        href={item.link.href}
        >
          {item.link.name}
        </Button>
      </div>
    </div>
  )
}
