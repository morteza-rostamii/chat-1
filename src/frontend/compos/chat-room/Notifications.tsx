"use client"

import { useGroupStore } from "@/frontend/features/group/stores/groupStore"
import { useOnce } from "@/frontend/hooks/useOnce";
import { NotiCard } from "./NotiCard";

export const Notifications = () => {
  const {notifications, loadNotifications, getNotificationsAct} = useGroupStore();

  useOnce(() => getNotificationsAct());

  console.log(notifications)
  return (
    <div 
    className="flex flex-col gap-4 p-4"
    >
      {
        notifications.length
        ?(
          notifications.map((el:any) => (
            <NotiCard
            key={el.id}
            item={el}
            />
          ))
        ):''
      }
    </div>
  )
}
