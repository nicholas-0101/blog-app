// import { create } from "zustand";
// import { persist } from "zustand/middleware"; //uses persist, so if we reload the page, the sign in history dosnt get deleted. persist make the data saved to localStorage

// interface IPostHistory {
//   post: string;
//   setPost: (title: string) => void;
//   postHistory: string[];
//   addPostHistory: (title: string) => void;
// }

// export const usePostStore = create<IPostHistory>()(
//   persist(
//     (set) => ({
//       post: "",
//       setPost: (title: string) => set({ post: title }),
//       postHistory: [],
//       addPostHistory: (title: string) =>
//         set((state) => ({
//           postHistory: [...state.post, title],
//         })),
//     }),
//     {
//       name: "post-storage", // key for localStorage to save login data (keep login)
//     }
//   )
// );



import { create } from "zustand";
import axios from "axios";

interface Blog {
  objectId: string;
  title: string;
  thumbnail: string;
  content: string;
  categories: string;
  created: string;
}

interface BlogStore {
  blogs: Blog[];
  fetchBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  fetchBlogs: async () => {
    try {
      const res = await axios.get(
        "https://upwardskin-us.backendless.app/api/data/blogs"
      );
      set({ blogs: res.data });
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  },
}));
