"use client";

import { useEffect } from "react";
import { useBlogStore } from "@/lib/store/blogStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Image from "next/image";

export default function ManageSection() {
  

  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <Card className="px-10">
      <div className="flex justify-between">
        <h1 className="font-black text-3xl">Your Stories</h1>

        <div className="flex justify-center items-center">
          <div className="w-80">
            <Input
              placeholder="⌕  Search articles..."
              type="text"
              name="search"
              className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col justify-center items-center">
            <Filter color="#475569" />
          </div>
          <Button className="rounded-lg cursor-pointer" variant={"outline"}>
            All
          </Button>
          <Button className="rounded-lg cursor-pointer" variant={"outline"}>
            Published
          </Button>
          <Button className="rounded-lg cursor-pointer" variant={"outline"}>
            Scheduled
          </Button>
          <Button className="rounded-lg cursor-pointer" variant={"outline"}>
            Draft
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {blogs.map((blog) => (
          <Card
            key={blog.objectId}
            className="p-4 rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-lg cursor-pointer"
          >
            <div className="flex gap-4">
              <div className="w-36 h-28 flex-shrink-0 bg-muted rounded-md overflow-hidden relative">
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-left">
                <div className="flex-1 flex flex-col justify-between">
                  <div className="mb-1">
                    <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.categories}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-foreground break-words">
                    {blog.title}
                  </h2>
                  <p
                    className="text-sm text-muted-foreground line-clamp-2 break-words truncate whitespace-nowrap overflow-hidden max-w-205"
                    rel="noopener noreferrer"
                  >
                    {blog.content}
                  </p>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    {new Date(blog.created).toLocaleDateString("id-ID")}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
