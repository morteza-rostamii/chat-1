"use client"

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Logo } from "../compos/Logo"
import { useLogin } from "../features/auth/hooks/useLogin"

export const LoginPage = () => {
  const {
    formInput,
    errors,
    handInputChange,
    handSubmit,
    loading,
  } = useLogin();

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
      onSubmit={handSubmit}
      >
        <div
        className="flex flex-col items-center justify-center gap-4 text-center "
        >
          <Logo size={80} styles={'text-green-600'}/>
          <h1 className="text-lg max-w-[400px] bg-green-100 rounded-md p-2">
            Login Now! we have sent a verification code to your email.
            please enter the code here to login.
          </h1>
        </div>
        <FormControl
        
        >
          <FormLabel>
            Enter Your Code
          </FormLabel>
          <Input
          name="otp"
          value={formInput.otp}
          onChange={handInputChange}
          placeholder="Enter the code"
          />
        </FormControl>

        <Button
        colorScheme="green"
        type="submit"
        isLoading={loading}
        isDisabled={!!(errors.otp.length)}
        >
          Login
        </Button>
      </form>
    </div>
  )
}
