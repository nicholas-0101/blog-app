"use client";

import { useEffect, useState } from "react";
import { useBlogStore } from "@/lib/store/blogStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, PenIcon, Search, Trash2Icon } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManageSection() {
  const { blogs, fetchBlogs } = useBlogStore();
  const [editingBlogId, setEditingBlogId] = useState<any>(null); // stores the id of the blog currently being edited
  const [editedValues, setEditedValues] = useState<{
    // stores edited values
    title: string;
    thumbnail: string;
    content: string;
    category: string;
  }>({
    title: "",
    thumbnail: "",
    content: "",
    category: "",
  });

  const handleEdit = (blog: any) => {
    // into edit mode if we click the edit button
    setEditingBlogId(blog.id);
    setEditedValues({
      title: blog.title,
      thumbnail: blog.thumbnail,
      content: blog.content,
      category: blog.category,
    });
  };

  const onSave = async (id: string) => {
    // save the edtied blog
    try {
      await axios.patch(`http://localhost:4001/blog/edit/${id}`, editedValues);
      alert("Blog updated successfully");
      setEditingBlogId(null); // turn back to blog list
      fetchBlogs(); // to refresh list
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  const handleDelete = async (id: string) => {
    // delete blog if we click delete button
    if (!confirm("Delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:4001/blog/delete/${id}`);
      fetchBlogs(); // to refresh list
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  useEffect(() => {
    // fecth the blogs list
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <Card className="px-10">
      <div className="flex justify-between">
        <h1 className="font-black text-3xl">Your Stories</h1>

        <div className="flex justify-center items-center gap-2">
          <div className="flex flex-col justify-center items-center">
            <Search color="#475569" />
          </div>
          <div className="w-80">
            <Input
              placeholder="Search articles..."
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
            key={blog.id}
            className="p-4 rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-lg"
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

              <div className="text-left flex-1">
                {editingBlogId === blog.id ? ( // if blog id = that blog that want to edit, so shown editing mode
                  <div className="flex flex-col gap-2">
                    <Input
                      value={editedValues.title}
                      onChange={(
                        e // to change title vlue (same as the other)
                      ) =>
                        setEditedValues({
                          ...editedValues, // keep the other edited values
                          title: e.target.value, // only edit title value
                        })
                      }
                      placeholder="Title"
                    />

                    <Input
                      value={editedValues.thumbnail}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          thumbnail: e.target.value,
                        })
                      }
                      placeholder="Thumbnail URL"
                    />

                    <Textarea
                      value={editedValues.content}
                      onChange={(e) =>
                        setEditedValues({
                          ...editedValues,
                          content: e.target.value,
                        })
                      }
                      placeholder="Content"
                      className="h-24"
                    />

                    <div className="flex justify-between">
                      <Select
                        value={editedValues.category}
                        onValueChange={(value) =>
                          setEditedValues({
                            ...editedValues,
                            category: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="travel">Travel</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => onSave(blog.id)}
                          className="cursor-pointer"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => setEditingBlogId(null)} // set editing blog id to null, so back to blog list
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // if not in edit mode (shows the list of blogs)
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0">
                      <div className="flex justify-between items-start">
                        <h2 className="text-base font-bold">{blog.title}</h2>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => handleEdit(blog)}
                          >
                            <PenIcon color="#364153" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2Icon color="#FF8080" />
                          </Button>
                        </div>
                      </div>
                      <span className="inline-flex bg-black text-white text-xs font-semibold px-3 py-1 rounded-full justify-center w-20">
                        {blog.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 break-words">
                      {blog.content}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(blog.createdAt).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
