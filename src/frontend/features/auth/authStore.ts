
import helper from '@/utils/helper';
import { faker } from '@faker-js/faker';
import { create } from 'zustand'

export const useAuthStore = create<any>((
  set: any, 
  //get: any
) => ({
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

}));

//@ts-ignore
const unsub = useAuthStore.subscribe((state:any) => {
  console.log('useAuthStore:', state);
});