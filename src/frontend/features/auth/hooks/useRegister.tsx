
import { useEffect, useState } from "react";
import { useAuthStore } from "../authStore";
import { redirect, useRouter } from "next/navigation";

export function useRegister() {
  const [formInput, setFormInput] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: [],
  });

  // auth store
  const {
    registerAct,
    loading,
  } = useAuthStore();

  const router = useRouter();

  const validate = () => {
    const errors:any = {
      email: [],
    };

    if (!formInput.email) 
      errors.email.push('Email is required');

    setErrors(errors);
  }

  const handInputChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
  
    switch(name) {
      case 'email':
        setFormInput((c:any) => ({...c, email: value}));
        break;
      default:
        break;
    }
  }

  const handSubmit = async (e:any) => {
    e.preventDefault();

    validate();

    if (
      errors.email.length
    ) return;

    // store email in localStorage
    localStorage.setItem('email', JSON.stringify(formInput.email));

    const res = await registerAct(formInput);

    if (res) {
      setFormInput({email: ''});
      router.push('/login');
    }
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