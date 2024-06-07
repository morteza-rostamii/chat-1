import { Button } from "@chakra-ui/react"

export const NoContent = ({
  text,
  btnTxt='',
  onClick,
}:any) => {
  return (
    <div
    className="grid place-content-center gap-4 w-fit mx-auto
    bg-white border-2 rounded-md border-slate-200 p-4
    "
    >
      <h2 className="#font-bold text-center">
        {text}
      </h2>
      <Button
      style={{display: btnTxt ? 'block' : 'none'}}
      onClick={onClick}
      //variant={'outline'}
      colorScheme="green"
      >
        {btnTxt}
      </Button>
    </div>
  )
}
