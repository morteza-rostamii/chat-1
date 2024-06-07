
import { ILogin, IRegister } from '@/dtos/auth-dto';
import apis from '@/routes/apis';
import helper from '@/utils/helper';
import { faker } from '@faker-js/faker';
import { create } from 'zustand'

import toast from "react-hot-toast";

const toastError = (msg: string) => toast.error(msg || 'Some Error!');
const toastSuccess = (msg: string) => toast.success(msg || 'Some message!');

export const useAuthStore = create<any>((
  set: any, 
  //get: any
) => ({
  authUser: null,
  loadAuthUser: true,
  users: [],
  loadUsers: true,

  loading: false,

  searchUsersByUsernameAct: async (
    payload: any,
  ) => {
    
    set((s:any) => ({...s, loadUsers: true}));
    try {
      
      const users = Array.from({length: 12}).map((el:any) => {
        return {
          id: helper.getRandomId(),
          username: faker.person.firstName(),
          image: faker.image.avatar(),
        };
      });

      set((s:any) => ({
        ...s,
        users: users,
      }));
        
      set((s:any) => ({...s, loadUsers: false}));
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loadUsers: false}));
    }
  },

  registerAct: async (
    payload: IRegister,
  ) => {
    
    set((s:any) => ({...s, loading: true}));
    try {
      
      const promise = apis.register(payload);
      const result = await promise;
      const data = result?.data;
      if (!data) return;

      console.log("registered:", result, data);
      set((s:any) => ({...s, loading: false}));
      toastSuccess("Registered Success!");
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loading: false}));
      toastError('Register Failed');
      return false;
    }
  },

  loginAct: async (
    payload: ILogin,
  ) => {
    
    set((s:any) => ({...s, loading: true}));
    try {
      
      const promise = apis.login(payload);
      const result = await promise;
      const data = result?.data;
      if (!data) return;

      console.log("Logged in:", data);
      set((s:any) => ({...s, loading: false}));
      set((s:any) => ({...s, authUser: data.user}));
      toastSuccess('Logged in successfully');
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loading: false}));
      toastError('Login Failed');
    }
  },

  getAuthAct: async () => {
    
    set((s:any) => ({...s, loadAuthUser: true}));
    try {
      
      const promise = apis.checkAuth();
      const result = await promise;
      const data = result?.data;
      if (!data) return;

      console.log("Logged in:", data);
      set((s:any) => ({...s, loadAuthUser: false}));
      set((s:any) => ({...s, authUser: data.user}));
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loadAuthUser: false}));
    }
  },
}));

//@ts-ignore
const unsub = useAuthStore.subscribe((state:any) => {
  console.log('useAuthStore:', state);
});