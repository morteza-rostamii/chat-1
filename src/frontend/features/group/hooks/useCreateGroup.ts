
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useGroupStore } from "../stores/groupStore";

export function useCreateGroup() {
  const [formInput, setFormInput] = useState({
    name: "",
    file: null,
  });
  // string after uploading the file
  const [image, setImage] = useState();

  const [errors, setErrors] = useState({
    name: [],
    file: [],
  });

  // auth store
  const {
    loading,
  } = useGroupStore();
  const router = useRouter();

  const validate = () => {
    const errors:any = {
      name: [],
      file: []
    };

    if (!formInput.name) 
      errors.name.push('Name is required');

    if (!formInput.file) 
      errors.file.push('file is required');

    setErrors(errors);
  }

  const handInputChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
  
    switch(name) {
      case 'name':
        setFormInput((c:any) => ({...c, name: value}));
        break;
      case 'file':
        setFormInput((c:any) => ({...c, file: e.target.files[0]}));
        break;
      default:
        break;
    }
  }

  const handSubmit = async (e:any) => {
    e.preventDefault();

    validate();

    if (
      errors.name.length ||
      errors.file.length
    ) return;

    // store otp in localStorage

    console.log(formInput);
      
    //setFormInput({otp: ''});
    //router.push('/');
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