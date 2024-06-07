import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Logo } from "../compos/Logo"
import React from "react"

interface IAuthForm {
  logo: React.ReactNode,
  text: string,
  inputs: {
    id: string,
    name: string,
    label: string,
    placeholder:
  }[],
}

export const RegisterPage = ({
  logo,
  text,
  inputs,
  btn,
}: IAuthForm) => {
  return (
    <div
    className="
    flex items-center h-full bg-slate-100
    "
    >
      <form 
      className="
      flex flex-col gap-4
      card-1 mx-auto
      "
      >
        <div
        className="flex flex-col items-center justify-center gap-4 text-center"
        >
          {logo}
          <h1 className="text-lg font-bold max-w-[400px]">
            {text}
          </h1>
        </div>

        {
          inputs.length
          ?(
            inputs.map((input:any) => (
              <FormControl
              >
                <FormLabel>
                  {input.label}
                </FormLabel>
                <Input
                name={input.name}
                placeholder={input.placeholder}
                />
              </FormControl>
            ))
          ):''
        }

        <Button
        colorScheme="green"
        >
          {btn.text}
        </Button>
      </form>
    </div>
  )
}