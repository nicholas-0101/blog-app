"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik, Form, FormikProps, FormikValues } from "formik";
import { ICreateValue, CreateSchema } from "./CreateSchema";
import axios from "axios";
import router from "next/router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccountStore } from "@/lib/store/accountStore";

export default function createSection() {
  const account = useAccountStore((state) => state.account);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const defaultValues: ICreateValue = {
    title: "",
    thumbnail: "",
    categories: "",
    content: "",
  };

  const onPost = async (values: ICreateValue) => {
    try {
      // console.log(values);
      // console.log(account)
      // const result = await axios.post(
      //   "https://upwardskin-us.backendless.app/api/data/blogs",
      //   values,
      // );

      // const blogId = result.data.objectId
      // console.log(blogId)
      // await axios.post(
      //   `https://upwardskin-us.backendless.app/api/data/blogs/${blogId}/account`,
      //   [
      //     {
      //       __type: "Pointer",
      //       className: "accounts",
      //       objectId: account,
      //     }
      //   ],
      // );


      // alert("your story just posted");
      // router.replace("#manage");


      if (!account?.objectId) {
        throw new Error("Account objectId is missing!");
      }

      // Step 1: Create blog post (without relation)
      const result = await axios.post(
        "https://upwardskin-us.backendless.app/api/data/blogs",
        values
      );

      const blogId = result.data?.objectId;
      if (!blogId) {
        throw new Error("Failed to retrieve blog objectId after creation.");
      }

      // Step 2: Create relation via /blogs/:id/account
      await axios.put(
        `https://upwardskin-us.backendless.app/api/data/blogs/${blogId}/account`,
        {
          objectIds: account.objectId,
        }
      );

      alert("Publish blog success");
    } catch (error: any) {
      console.error(
        "Error publishing blog:",
        error?.response?.data || error.message || error
      );
    }
  };

  return (
    <Formik
      initialValues={{ title: "", thumbnail: "", content: "", categories: "" }}
      validationSchema={CreateSchema}
      onSubmit={onPost}
    >
      {(props: FormikProps<ICreateValue>) => {
        const { errors, values, handleChange, setFieldValue } = props;
        return (
          <Form>
            <Card className="px-10 text-left">
              <h1 className="font-black text-3xl">Create a New Story</h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0">
                <label>Blog Title</label>
                <span className="text-red-400 italic text-sm">
                  {errors.title}
                </span>
                </div>
                <Input
                  placeholder="Enter an engaging title for your blog post..."
                  type="text"
                  name="title"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0">
                <label>Featured Image</label>
                <span className="text-red-400 italic text-sm">
                  {errors.thumbnail}
                </span>
                </div>
                <Input
                  placeholder="Enter an URL for your thumbnail..."
                  type="text"
                  name="thumbnail"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0">
                  <label>Blog Content</label>
                  <span className="text-red-400 italic text-sm">
                    {errors.content}
                  </span>
                </div>
                <Textarea
                  placeholder="Start writing your content here"
                  name="content"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 h-100"
                  required
                />
              </div>

              <div className="flex gap-4 max-w-[1016px]">
                <div className="flex flex-col gap-0">
                  <Select
                    onValueChange={(value) =>
                      setFieldValue("categories", value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <span className="text-red-400 italic text-sm">
                    {errors.categories}
                  </span>
                </div>

                <div className="w-full">
                  <div>
                    <Button type="submit" className="w-full cursor-pointer">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
}
