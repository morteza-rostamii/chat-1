"use client"

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Logo } from "../compos/Logo"
import { useAuthStore } from "../features/auth/authStore"
import { useRegister } from "../features/auth/hooks/useRegister"
import helper from "@/utils/helper"

export const RegisterPage = () => {
  const {
    formInput,
    handSubmit,
    errors,
    handInputChange,
    loading,
  } = useRegister();

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
        className="flex flex-col items-center justify-center gap-4 text-center"
        >
          <Logo size={80} styles={'text-green-600'}/>
          <h1 className="text-lg max-w-[400px] bg-green-100 rounded-md p-2">
            Register Now! and connect with random people on the internet
          </h1>
        </div>
        <FormControl
        
        >
          <FormLabel className="!flex !gap-2 !items-center">
            <span>Email</span>
            <span style={{display: !!errors.email.length ? 'block' : 'none'}} className="text-red-500 text-xl font-bold mt-2">*</span>
          </FormLabel>
          <Input
          name="email"
          placeholder="Enter your email"
          onChange={handInputChange}
          value={formInput.email}
          />

          <div className="mt-2 flex flex-col gap-2">
            {
            errors.email.length 
            ? errors.email.map((err:any) => <p key={helper.getRandomId()} className="text-red-500 text-sm">{err}</p>):''  
            }
          </div>
        </FormControl>

        <Button
        colorScheme="green"
        type="submit"
        isLoading={loading}
        isDisabled={!!errors.email.length}
        >
          Register
        </Button>
      </form>
    </div>
  )
}
