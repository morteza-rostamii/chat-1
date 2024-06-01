import { HiMagnifyingGlass } from "react-icons/hi2";

export const SearchBox = ({
  setSearchUser,
}: any) => {
  return (
    <form 
    className="
    flex items-center rounded-md border-2 border-slate-200
    bg-white flex-1
    "
    >
      <input 
      className="p-2 border-none outline-none flex-1"
      type="search" 
      name="" 
      id="" 
      placeholder="Search for a user"

      onFocus={() => {
        setSearchUser(true);
      }}
      />
      <button
      className="p-2"
      >
        <HiMagnifyingGlass size={20}/>
      </button>
    </form>
  )
}
