import { FaSnapchat } from "react-icons/fa"

export const Logo = ({size, styles}:any) => {
  return (
    <div className={`${styles} w-fit`}>
      <FaSnapchat size={size}/>
    </div>
  )
}
