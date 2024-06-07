import { useCreateGroup } from "@/frontend/features/group/hooks/useCreateGroup"
import helper from "@/utils/helper";
import { Avatar, Button, FormControl, FormLabel, Input } from "@chakra-ui/react"

export const CreateGroup = () => {
  const {
    formInput,
    handInputChange,
    errors,
    handSubmit,
    loading,
  } = useCreateGroup();
  return (
    <form
    className="
    flex flex-col #!items-center
    p-4 gap-4
    "
    onSubmit={handSubmit}
    >
      <div className="flex flex-col gap-4">
        <FormControl className="flex flex-col text-center items-center justify-center w-fit">
          <FormLabel htmlFor="file" className="border-4 rounded-full border-green-400">
            <Avatar src={''} size={'lg'}/>
          </FormLabel>
          <input 
          className="hidden"
          type="file" 
          name="file" 
          id="file"
          onChange={handInputChange}
          />
          <div className="mt-2 flex flex-col gap-2">
            {
            errors.file.length 
            ? errors.file.map((err:any) => <p key={helper.getRandomId()} className="text-red-500 text-sm">{err}</p>):''  
            }
          </div>
        </FormControl>

        <FormControl className="">
        <FormLabel className="!flex !gap-2 !items-center">
            <span>Group's Name</span>
            <span style={{display: !!errors.name.length ? 'block' : 'none'}} className="text-red-500 text-xl font-bold mt-2">*</span>
          </FormLabel>
          <Input
          name="name"
          placeholder="Enter the group's name"
          value={formInput.name}
          onChange={handInputChange}
          />

          <div className="mt-2 flex flex-col gap-2">
            {
            errors.name.length 
            ? errors.name.map((err:any) => <p key={helper.getRandomId()} className="text-red-500 text-sm">{err}</p>):''  
            }
          </div>
        </FormControl>

        <Button
        type="submit"
        colorScheme="green"
        >
          Create
        </Button>
      </div>
    </form>
  )
}
