"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ISignUpValue, SignUpSchema } from "./SignupSchema";
import { Formik, Form, FormikProps, FormikValues } from "formik";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useAccountStore } from "@/lib/store/accountStore";

const SignupPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  // add user data to database
  const onSignup = async (values: ISignUpValue) => {
    try {
      const result = await axios.post(
        "http://localhost:4001/blog/user/signup",
        {
          username: values.username,
          email: values.email,
          password: values.password,
        }
      );

      alert(result.data.message);
      router.replace("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          <h1 className="text-2xl font-bold text-center">
            Create your account
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Create an account to start writing
          </p>

          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={SignUpSchema}
            onSubmit={onSignup}
          >
            {(props: FormikProps<ISignUpValue>) => {
              const { errors, values, handleChange } = props;
              return (
                <Form>
                  <div>
                    <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-0">
                            <label>Create a new username</label>
                            <span className="text-red-400 italic text-sm">
                              {errors.username}
                            </span>
                          </div>

                          <Input
                            type="name"
                            name="username"
                            placeholder="your username..."
                            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-0">
                            <label>Your email</label>
                            <span className="text-red-400 italic text-sm">
                              {errors.email}
                            </span>
                          </div>

                          <Input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-0">
                            <label>Create a password</label>
                            <span className="text-red-400 italic text-sm">
                              {errors.password}
                            </span>
                          </div>

                          <div className="relative w-full">
                            <Input
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                              onChange={handleChange}
                            />

                            <Button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-2 top-2 text-gray-500 hover:text-black w-1 h-1"
                              variant={"ghost"}
                            >
                              {showPassword ? (
                                <Eye size={20} />
                              ) : (
                                <EyeOff size={20} />
                              )}
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant={"outline"}
                          type="submit"
                          className="text-white p-2 rounded cursor-pointer hover:bg-neutral-800 hover:text-white transition-colors border-gray-300 mt-[20px] bg-black"
                        >
                          Sign Up
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Form>
              );
            }}
          </Formik>

          <div className="flex justify-center">
            <p className="text-gray-600 flex flex-col justify-center">
              Already have an account?
            </p>
            <a href="/signin">
              <Button
                type="button"
                variant={"link"}
                className="text-gray-600 hover:text-grey-400 p-0 pl-1.5"
              >
                Sign In
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
