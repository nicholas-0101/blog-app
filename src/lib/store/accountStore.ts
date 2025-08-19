import { create } from "zustand";

interface IAccount {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface IAccountStore {
  account: IAccount | null;
  setAccount: (account: IAccount) => void;
  signOut: () => void;
}

export const useAccountStore = create<IAccountStore>((set) => {
  return {
    account: null,
    setAccount: (account) => set({ account }),

    signOut: () => {
      localStorage.removeItem("tkn"); // remove the token, so if we signed out, keep signed out
      set({ account: null }); // if signed out, we set back the account and sign in history to blank (delete data from local Storage)
    },
  };
});
