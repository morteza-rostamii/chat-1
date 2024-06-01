import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
//import { Separator } from "@/components/ui/separator"

export function ScrollBox({children}:{children:React.ReactNode}) {
  return (
    <ScrollArea className="h-72 #w-48 rounded-md border">
      {children}
    </ScrollArea>
  )
}