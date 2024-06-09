
import { TCreateGroup } from '@/dtos/group-dto';
import apis from '@/routes/apis';
import helper from '@/utils/helper';
import { faker } from '@faker-js/faker';
import toast from 'react-hot-toast';
import { create } from 'zustand'

const toastError = (msg: string) => toast.error(msg || 'Some Error!');
const toastSuccess = (msg: string) => toast.success(msg || 'Some message!');

export const useGroupStore = create<any>((
  set: any, 
  get: any
) => ({
  groups: [],
  loadGroups: true,
  activeGroup: null,

  notifications: [],
  loadNotifications: true,

  loading: false,

  getGroupsAct: async () => {
    
    set((s:any) => ({...s, loadGroup: true}));
    try {
      

      set((s:any) => ({
        ...s,
        groups: [],
        activeGroup: get().getgroups[0],
      }));
        
      set((s:any) => ({...s, loadGroup: false}));
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loadGroup: false}));
    }
  },

  // get join group request
  getNotificationsAct: async () => {
    
    set((s:any) => ({...s, loadNotifications: true}));
    try {
      
      const notifications = Array.from({length: 12}).map((el:any) => {
        return {
          id: helper.getRandomId(),
          sender: {
            id: helper.getRandomId(),
            username: faker.lorem.word(),
            image: faker.image.avatar(),
          },
          content: faker.lorem.words({min:5, max:10}),
          link: {
            href: '#',
            name: 'visit this group'
          },
          createdAct: new Date(),
        };
      });

      set((s:any) => ({
        ...s,
        notifications: notifications,
      }));
        
      set((s:any) => ({...s, loadNotifications: false}));
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loadNotifications: false}));
    }
  },

  createGroupAct: async (payload: any) => {
    
    set((s:any) => ({...s, loading: true}));
    try {
      // upload file
      const result1 = await apis.upload(payload.formData);
      const data1 = result1?.data;
      if (!data1) return false;
      const image = data1.fileName;

      const promise = apis.createGroup({
        name: payload.name,
        image: image,
      });

      const result = await promise;
      const data = result?.data;
      
      if (!data) return false;
      console.log('Group created:---', data);
      set((s:any) => ({
        ...s,
        groups: [...s.groups, data.group],
      }));
        
      set((s:any) => ({...s, loading: false}));
      toastSuccess('Group Created!');
      return true;
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loading: false}));
      toastError("Can't create Group!");
      return false;
    }
  },

  // send join group request
  sendFriendRequestAct: async () => {
    
    set((s:any) => ({...s, loadNotifications: true}));
    try {
      
      const notifications = Array.from({length: 12}).map((el:any) => {
        return {
          id: helper.getRandomId(),
          sender: {
            id: helper.getRandomId(),
            username: faker.lorem.word(),
            image: faker.image.avatar(),
          },
          content: faker.lorem.words({min:5, max:10}),
          href: "#",
          createdAct: new Date(),
        };
      });

      set((s:any) => ({
        ...s,
        notifications: notifications,
      }));
        
      set((s:any) => ({...s, loadNotifications: false}));
    }
    catch(error:any) {
      console.log(error?.message || error);
      console.log(error?.response?.data);
      set((s:any) => ({...s, loadNotifications: false}));
    }
  },
}));

//@ts-ignore
const unsub = useGroupStore.subscribe((state:any) => {
  console.log('useGroupStore:', state);
});