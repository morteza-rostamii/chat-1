
import helper from '@/utils/helper';
import { faker } from '@faker-js/faker';
import { create } from 'zustand'

export const useGroupStore = create<any>((
  set: any, 
  //get: any
) => ({
  groups: [],
  loadGroups: true,
  activeGroup: null,

  loading: false,

  getGroupsAct: async () => {
    
    set((s:any) => ({...s, loadGroup: true}));
    try {
      
      const groups = Array.from({length: 12}).map((el:any) => {
        return {
          id: helper.getRandomId(),
          name: faker.lorem.word(),
          image: faker.image.urlPicsumPhotos(),
          createdAt: faker.date,
          members: Array.from({length: 12}).map(() => {
            return {
              id: helper.getRandomId(),
              username: faker.person.firstName(),
              image: faker.image.avatar(),
            }
          })
        };
      });

      set((s:any) => ({
        ...s,
        groups: groups,
        activeGroup: groups[0],
      }));
        
      set((s:any) => ({...s, loadGroup: false}));
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loadGroup: false}));
    }
  },

}));

//@ts-ignore
const unsub = useGroupStore.subscribe((state:any) => {
  console.log('useGroupStore:', state);
});