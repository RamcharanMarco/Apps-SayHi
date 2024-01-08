import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { useEffect } from 'react';

type user = any

interface TodoState {
  user: user;
  form: any;
  loginuser: (user: any) => void;
  logoutuser: () => void;
  setform: (form: any) => void;
  removeform: () => void;
}



export const useStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        user: false,
        form:false,
        loginuser: (user) => {
            set((state) => ({
              user: user,
            }),
            );
          },
          logoutuser: () => {
            set((state) => ({
              user: null,
            }));
          },
          setform: (form:any) => {
            set((state) => ({
              form: form,
            }),
            );
          },
          removeform: () => {
            set((state) => ({
              form: false,
            }));
          }
      }),
      {
        name: "contactme", // unique name
      }
))
  )

