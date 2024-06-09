
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useGroupStore } from "../stores/groupStore";
import apis from "@/routes/apis";
import { useBaseModal } from "@/frontend/providers/BaseModalProvider";

export function useCreateGroup() {
  const [formInput, setFormInput] = useState({
    name: "",
    file: null,
  });
  // string after uploading the file
  const [image, setImage] = useState('');
  // formData with file
  const [formData, setFormData] = useState(null);

  const [errors, setErrors] = useState({
    name: [],
    file: [],
  });

  // auth store
  const {
    loading,
    createGroupAct,
  } = useGroupStore();
  const router = useRouter();
  const {onClose} = useBaseModal();

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
    const {name, value, files} = e.target;
    
    const formData:any = new FormData();
    if (name === 'file') {
      formData.append(name, files[0]);
      setFormData(formData);
    }

    switch(name) {
      case 'name':
        setFormInput((c:any) => ({...c, name: value}));
        break;
      case 'file':
        setFormInput((c:any) => ({...c, file: files[0]}));
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

    // create group: with: name, image
    const success = await createGroupAct({
      name: formInput.name,
      formData,
    });

    if (success) {
      setFormInput({name: '', file: null});
      setImage('');
      onClose();
    }
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