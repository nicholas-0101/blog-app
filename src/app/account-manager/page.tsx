"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Formik, Form, FormikProps, FormikValues } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const account = useAccountStore((state) => state.account);

  const onPost = async () => {
    try {
      //   console.log("account: ", account);
      //   const payload = { // to store the data to backend
      //     title: values.title,
      //     thumbnail: values.thumbnail,
      //     category: values.categories
      //       ? values.categories.toLowerCase()
      //       : undefined,
      //     content: values.content,
      //     authorId: account?.id,
      //   };
      //   await axios.post("http://localhost:4001/blog/create", payload);
      //   alert("Publish blog success");
      //   router.replace("/explore");
    } catch (error: any) {
      //   console.error(
      //     "Error publishing blog:",
      //     error?.response?.data || error.message || error
      //   );
    }
  };

  return (
    <Formik
      initialValues={{ title: "", thumbnail: "", content: "", categories: "" }}
      onSubmit={onPost}
    >
      {(props) => {
        const { errors, values, handleChange, setFieldValue } = props;
        return (
          <section className="flex justify-center items-center min-h-screen">
            <div className="flex gap-6 w-full max-w-[1016px]">
              {/* First Card */}
              <Card className="px-10 text-left flex-1">
                <h1 className="font-black text-3xl">Your Profile</h1>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <label>Username</label>
                    <Badge
                      variant={"outline"}
                      className="h-8 w-50 text-neutral-500 text-[14px] font-normal"
                    >
                      {account?.username}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <label>Email</label>
                    <Badge
                      variant={"outline"}
                      className="h-8 w-50 text-neutral-500 text-[14px] font-normal"
                    >
                      {account?.email}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <label>Total Blogs</label>
                    <Badge
                      variant={"outline"}
                      className="h-8 w-50 text-neutral-500 text-[14px] font-normal"
                    >
                      on development
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Second Card */}
              <Card className="px-10 text-left flex-1">
                <h1 className="font-black text-3xl">Change Password</h1>
                <div className="flex flex-col gap-0">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <label>Your Password</label>
                        <Input
                          placeholder="Your old password"
                          type="text"
                          onChange={handleChange}
                          className="w-50 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <label>New Password</label>
                        <Input
                          placeholder="Enter a new password"
                          type="text"
                          onChange={handleChange}
                          className="w-50 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button
                      type="button"
                      variant={"link"}
                      className="text-gray-600 hover:text-grey-400 p-0 mt-3"
                    >
                      Forgot password?
                    </Button>
                  </div>

                  <div className="flex gap-4 mt-2 w-1/2 pr-2">
                    <Button
                      className="w-full cursor-pointer"
                      variant={"outline"}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="w-full cursor-pointer">
                      Save
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        );
      }}
    </Formik>
  );
}
