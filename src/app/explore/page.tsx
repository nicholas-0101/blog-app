"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, SearchX } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  category: string;
  createdAt: string;
  author: {
    username: string;
  };
}

export default function ExploreSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const result = await axios.get("http://localhost:4001/blog");
      console.log(result.data);

      setBlogs(result.data.blogs);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(searchLower) ||
      blog.category.toLowerCase().includes(searchLower) ||
      blog.content.toLowerCase().includes(searchLower) ||
      blog.author?.username?.toLowerCase().includes(searchLower);

    const matchesCategory = selectedCategory
      ? blog.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full flex justify-center">
        <div className="text-center mt-24 w-[1016px]">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
              Explore Stories
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Discover inspiring content from our community of writers
            </p>
          </div>

          <div className="flex justify-center items-center"></div>

          <div className="w-full flex justify-between gap-4">
            <div className="w-full flex gap-2">
              <div className="flex flex-col justify-center items-center">
                <Search color="#475569" />
              </div>
              <div className="max-w-lg w-full">
                <Input
                  placeholder="Search articles..."
                  type="text"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <Filter color="#475569" />
              </div>
              {["All", "Technology", "Food", "Travel", "Health", "Finance"].map(
                (category) => (
                  <Button
                    key={category}
                    className={`rounded-lg cursor-pointer transition
                      text-sm px-3 py-1
                      md:text-base md:px-4 md:py-2
                      ${
                        selectedCategory === category ||
                        (category === "All" && !selectedCategory)
                          ? "bg-black text-white hover:bg-neutral-800 hover:text-white"
                          : "bg-transparent"
                      }`}
                    variant="outline"
                    onClick={() =>
                      setSelectedCategory(category === "All" ? null : category)
                    }
                  >
                    {category}
                  </Button>
                )
              )}
            </div>
          </div>

          {filteredBlogs.length === 0 ? (
            <p className="text-gray-500 text-center text-2xl font-medium flex flex-col gap-2 justify-center items-center pt-25">
              <SearchX color="#475569" size={150} /> Blog Not Found
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
              {filteredBlogs.map((blog) => (
                <Link href={`/blog-detail/${blog.title}`} key={blog.id}>
                  <Card className="p-4 rounded-xl shadow-sm transition hover:shadow-lg text-left cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <div className="w-full h-40 rounded-md overflow-hidden mb-3 relative">
                        <Image
                          src={blog?.thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="justify-between">
                        <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full w-50">
                          {blog.category}
                        </span>

                        <div className="flex flex-col gap-1">
                          <h2 className="text-lg font-semibold mt-2 break-words truncate whitespace-nowrap overflow-hidden max-w-205">
                            {blog.title}
                          </h2>

                          <p
                            className="text-sm text-muted-foreground line-clamp-2 mt-1 break-words truncate whitespace-nowrap overflow-hidden max-w-205"
                            rel="noopener noreferrer"
                          >
                            {blog.content}
                          </p>
                        </div>

                        <div className="text-xs text-muted-foreground mt-2 flex gap-1">
                          {new Date(blog.createdAt).toLocaleDateString("id-ID")}
                          <p>•</p>
                          <h2>{blog.author.username}</h2>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
