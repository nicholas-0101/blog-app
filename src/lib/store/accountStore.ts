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

    signOut: () =>
        set({
          account: null, // if signed out, we set back the account and sign in history to blank (delete data from local Storage)
          
        }),
  };
});




// import { create } from "zustand";
// import { persist } from "zustand/middleware"; //uses persist, so if we reload the page, the sign in history dosnt get deleted. persist make the data saved to localStorage

// interface IAuthHistory {
//   account: string;
//   setAccount: (objectId: string) => void;
//   signInHistory: string[];
//   addSignInHistory: (objectId: string) => void;
//   signOut: () => void;
// }

// export const useAccountStore = create<IAuthHistory>()(
//   persist(
//     (set) => ({
//       account: "",
//       setAccount: (objectId: string) => set({ account: objectId }),
//       signInHistory: [],
//       addSignInHistory: (username: string) =>
//         set((state) => ({
//           signInHistory: [...state.signInHistory, username],
//         })),
//       signOut: () =>
//         set({
//           account: "", // if signed out, we set back the account and sign in history to blank (delete data from local Storage)
//           signInHistory: [],
//         }),
//     }),
//     {
//       name: "account-storage", // key for localStorage to save login data (keep login)
//     }
//   )
// );




// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthHistory {
//   signInHistory: string;  
//   addSignInHistory: (objectId: string) => void;
//   account: string[];
//   setAccount: (objectId: string) => void;
//   signOut: () => void;
// }

// export const useAccountStore = create<AuthHistory>()(
//   persist(
//     (set, get) => ({
//       signInHistory: "",  
//       addSignInHistory: (objectId: string) => set({ signInHistory: objectId }),
//       account: [],
//       setAccount: (username: string) =>
//         set((state) => ({
//           account: [...state.account, username],
//         })),
//       signOut: () =>
//         set({
//           signInHistory: "",
//           account: [],
//         }),
//     }),
//     {
//       name: "account-storage", // key name in localStorage  

//       partialize: (state) => ({
//         signInHistory: state.signInHistory,  
//       }),
//     }
//   )
// );




// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthHistory {
//   account: string;  
//   setAccount: (objectId: string) => void;
//   signInHistory: string[];
//   addSignInHistory: (objectId: string) => void;
//   signOut: () => void;
// }

// export const useAccountStore = create<AuthHistory>()(
//   persist(
//     (set, get) => ({
//       account: "",  
//       setAccount: (objectId: string) => set({ account: objectId }),
//       signInHistory: [],
//       addSignInHistory: (username: string) =>
//         set((state) => ({
//           signInHistory: [...state.account, username],
//         })),
//       signOut: () =>
//         set({
//           account: "",
//           signInHistory: [],
//         }),
//     }),
//     {
//       name: "account-storage", // key name in localStorage  

//       partialize: (state) => ({
//         account: state.account,  
//       }),
//     }
//   )
// );




// interface AuthHistory {
//   account: string;
//   setAccount: (email: string) => void;
//   signInHistory: string[];
//   addSignInHistory: (email: string) => void;
//   signOut: () => void;
// }

// export const useAccountStore = create<AuthHistory>()(
//   persist(
//     (set) => ({
//       account: "",
//       setAccount: (email: string) => set({ account: email }),
//       signInHistory: [],
//       addSignInHistory: (email: string) =>
//         set((state) => ({
//           signInHistory: [...state.signInHistory, email],
//         })),
//       signOut: () =>
//         set({
//           account: "", // if signed out, we set back the account and sign in history to blank (delete data from local Storage)
//           signInHistory: [],
//         }),
//     }),
//     {
//       name: "account-storage", // key for localStorage to save login data (keep login)
//     }
//   )
// );







// import { create } from 'zustand';

// interface AuthHistory {
//   account: string;
//   setAccount: (username: string) => void;
//   signInHistory: string[];
//   addSignInHistory: (username: string) => void;
// }

// export const useAccountStore = create<AuthHistory>((set) => ({
//   account: "",
//   setAccount: (username: string) => set({ account: username }),
//   signInHistory: [],
//   addSignInHistory: (username: string) => set((state) => ({
//     signInHistory: [...state.signInHistory, username],
//     })),
// }));



// import { create } from "zustand";
// import { persist } from "zustand/middleware"; //uses persist, so if we reload the page, the sign in history dosnt get deleted. persist make the data saved to localStorage

// interface AuthHistory {
//   account: string;
//   setAccount: (username: string) => void;
//   signInHistory: string[];
//   addSignInHistory: (username: string) => void;
// }

// export const useAccountStore = create<AuthHistory>()(
//   persist(
//     (set) => ({
//       account: "",
//       setAccount: (username: string) => set({ account: username }),
//       signInHistory: [],
//       addSignInHistory: (username: string) =>
//         set((state) => ({
//           signInHistory: [...state.signInHistory, username],
//         })),
//     }),
//     {
//       name: "account-storage", // key for localStorage
//     }
//   )
// );

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthHistory {
//   account: string;
//   setAccount: (username: string) => void;
//   signInHistory: string[];
//   addSignInHistory: (username: string) => void;
//   signOut: () => void; // 👈 Add this
// }

// export const useAccountStore = create<AuthHistory>()(
//   persist(
//     (set) => ({
//       account: "",
//       setAccount: (username: string) => set({ account: username }),
//       signInHistory: [],
//       addSignInHistory: (username: string) =>
//         set((state) => ({
//           signInHistory: [...state.signInHistory, username],
//         })),
//       signOut: () =>
//         set({
//           account: "",
//           signInHistory: [],
//         }),
//     }),
//     {
//       name: "account-storage",
//     }
//   )
// );

