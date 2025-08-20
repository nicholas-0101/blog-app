"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Formik, Form, FormikProps } from "formik";
import { ISignInValue, SignInSchema } from "./SigninSchema";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAccountStore } from "@/lib/store/accountStore";
import { Eye, EyeOff } from "lucide-react";

interface SignInError {
  email?: string;
  password?: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<SignInError>({});
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setAccount } = useAccountStore();
  const onSignin = async (values: ISignInValue) => {
    try {
      const result = await axios.post("http://localhost:4400/auth/signin", {
        email: values.email,
        password: values.password,
      });
      console.log(result.data);
      if (result.data.success) {
        setAccount(result.data.user); // menyimpan data ke global state zustand
        localStorage.setItem("tkn", result.data.user.token); // menyimpan data id ke localStorage untuk nanti keeplogin
        alert(`Welcome, ${result.data.user.username}`);
        window.location.replace("/");
      } else {
        alert("Account not found");
      }
    } catch (error: any) {
      console.log(error);
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 404) {
        setError({ email: "*account not found" });
      } else if (status === 401) {
        setError({ password: "*incorrect password" });
      } else {
        setError({ email: "*something went wrong. Try again later" });
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("tkn")) {
      router.replace("/"); 
    }
  }, [router]);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          <h1 className="text-2xl font-bold text-center">
            Sign in to your account
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Sign in to start writing
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={onSignin}
          >
            {(props: FormikProps<ISignInValue>) => {
              const { errors, values, handleChange } = props;
              return (
                <Form>
                  <div>
                    <Card className="p-6 bg-white dark:bg-gray-800 shadow-md">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-0">
                            <label>Your email</label>
                            <div className="flex gap-2">
                              <span className="text-red-400 italic text-sm">
                                {errors.email}
                              </span>
                            </div>
                          </div>

                          <Input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-0">
                            <label>Your password</label>
                            <div className="flex gap-2">
                              <span className="text-red-400 italic text-sm">
                                {errors.password}
                              </span>
                            </div>
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

                        <div className="flex flex-col gap-0">
                          {(error.email || error.password) && (
                            <span className="text-red-400 italic text-sm">
                              {error.email || error.password}
                            </span>
                          )}

                          <Button
                            variant={"outline"}
                            type="submit"
                            className="text-white p-2 rounded cursor-pointer hover:bg-neutral-800 hover:text-white transition-colors border-gray-300 mt-2 bg-black"
                          >
                            Sign In
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Form>
              );
            }}
          </Formik>

          <div className="flex justify-center">
            <p className="text-gray-600 flex flex-col justify-center">
              Doesn't have an account?
            </p>
            <a href="/signup">
              <Button
                type="button"
                variant={"link"}
                className="text-gray-600 hover:text-grey-400 p-0 pl-1.5"
              >
                Sign Up
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
