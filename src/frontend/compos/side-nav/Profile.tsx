import { Avatar, Button, FormControl, FormLabel, Input } from "@chakra-ui/react"

export const Profile = () => {
  return (
    <form
    className="
    flex flex-col #!items-center
    p-4 gap-4
    "
    >
      <div className="flex flex-col gap-4">
        <FormControl className="flex items-center justify-center w-fit">
          <FormLabel htmlFor="file" className="border-4 rounded-full border-green-400">
            <Avatar src={''} size={'lg'}/>
          </FormLabel>
          <input 
          className="hidden"
          type="file" 
          name="file" 
          id="file" 
          />
        </FormControl>

        <FormControl className="">
          <FormLabel>
            username
          </FormLabel>
          <Input
          name="username"
          placeholder="Enter Your username"
          />
        </FormControl>

        <Button
        type="submit"
        colorScheme="green"
        >
          Update Profile
        </Button>
      </div>
    </form>
  )
}
