
import { useEffect, useState } from "react";
import { useAuthStore } from "../authStore";
import { redirect, useRouter } from "next/navigation";

export function useLogin() {
  const [formInput, setFormInput] = useState({
    otp: "",
  });

  const [errors, setErrors] = useState({
    otp: [],
  });

  // auth store
  const {
    loginAct,
    loading,
  } = useAuthStore();

  const router = useRouter();

  const validate = () => {
    const errors:any = {
      otp: [],
    };

    if (!formInput.otp) 
      errors.otp.push('Otp code is required');

    setErrors(errors);
  }

  const handInputChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
  
    switch(name) {
      case 'otp':
        setFormInput((c:any) => ({...c, otp: value}));
        break;
      default:
        break;
    }
  }

  const handSubmit = async (e:any) => {
    e.preventDefault();

    validate();

    if (
      errors.otp.length
    ) return;

    // store otp in localStorage

    const email = JSON.parse(localStorage.getItem('email') || '');
    await loginAct({
      otp: formInput.otp,
      email: email,
    });

    setFormInput({otp: ''});
    router.push('/');
  }

  useEffect(() => {
    validate();
  }, [formInput]);

  return {
    formInput,
    handSubmit,
    errors,
    handInputChange,
    loading,
  };
}