
import helper from '@/utils/helper';
import { faker } from '@faker-js/faker';
import { create } from 'zustand'

export const useMessageStore = create<any>((
  set: any, 
  //get: any
) => ({
  messages: [],
  loadMessages: true,

  loading: false,

  getMessagesByGroupAct: async () => {
    
    set((s:any) => ({...s, loadMessages: true}));
    try {
      
      const messages = Array.from({length: 12}).map((el:any) => {
        return {
          id: helper.getRandomId(),
          content: faker.lorem.words({min:5, max:20}),
          image: faker.image.urlLoremFlickr(),
          createdAt: new Date(),
          user: {
            id: helper.getRandomId(),
            username: faker.person.firstName(),
            image: faker.image.avatar(),
          },
        };
      });

      set((s:any) => ({
        ...s,
        messages: messages,
      }));
        
      set((s:any) => ({...s, loadMessages: false}));
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loadMessages: false}));
    }
  },

}));

//@ts-ignore
const unsub = useMessageStore.subscribe((state:any) => {
  console.log('useMessageStore:', state);
});