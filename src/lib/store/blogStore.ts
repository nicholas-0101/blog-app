// import { create } from "zustand";
// import axios from "axios";

// interface Blog {
//   id: string;
//   title: string;
//   thumbnail: string;
//   content: string;
//   category: string;
//   createdAt: string;
// }

// interface BlogStore {
//   blogs: Blog[];
//   fetchBlogs: () => Promise<void>;
// }

// export const useBlogStore = create<BlogStore>((set) => ({
//   blogs: [],
//   fetchBlogs: async () => {
//     try {
//       const res = await axios.get("http://localhost:4001/blog");
//       set({ blogs: res.data.blogs });
//     } catch (err) {
//       console.error("Error fetching blogs:", err);
//     }
//   },
// }));

import { create } from "zustand";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  category: string;
  createdAt: string;
}

interface BlogStore {
  blogs: Blog[];       // explore (all blogs)
  myBlogs: Blog[];     // only current user blogs
  fetchBlogs: () => Promise<void>;
  fetchMyBlogs: (userId: number) => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  myBlogs: [],
  
  fetchBlogs: async () => {
    try {
      const res = await axios.get("http://localhost:4001/blog");
      set({ blogs: res.data.blogs });
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  },

  fetchMyBlogs: async (userId: number) => {
    try {
      const res = await axios.get(`http://localhost:4001/blog/myblogs/${userId}`);
      set({ myBlogs: res.data.blogs });
    } catch (err) {
      console.error("Error fetching user's blogs:", err);
    }
  },
}));
