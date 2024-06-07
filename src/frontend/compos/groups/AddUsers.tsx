import React from 'react'
import { SearchBox } from './SearchBox'
import { SearchedUsers } from './SearchedUsers'

export const AddUsers = () => {
  return (
    <div>
      <header
      className="
      flex items-center
      border-b-2 h-[60px] p-4
      "
      >
        <SearchBox />
      </header>

      <SearchedUsers />
    </div>
  )
}
