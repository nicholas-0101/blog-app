"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function VerifyPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      // grab token from URL (?tkn=xxx)
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("tkn");

      if (!token) {
        setMessage("Token missing");
        setStatus("error");
        return;
      }

      setStatus("loading");

      const res = await axios.get(
        `http://localhost:4400/auth/verify-account?tkn=${token}`
      );

      setMessage(res.data.message || "Account verified successfully");
      setStatus("success");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Verification failed");
      setStatus("error");
    }
  };

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("tkn")) {
      router.replace("/"); // or dashboard
    }
  }, [router]);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md text-center flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-2">Verify your account</h1>
            <p
              className={`mb-4 ${
                status === "success"
                  ? "text-green-600"
                  : status === "error"
                  ? "text-red-400"
                  : "text-gray-600"
              }`}
            >
              {status === "idle" &&
                "Click the button below to verify your account"}
              {status === "loading" && "Verifying your account..."}
              {(status === "success" || status === "error") && message}
            </p>

            {status === "idle" && (
              <Button
                onClick={handleVerify}
                className="w-full rounded cursor-pointer"
              >
                Verify
              </Button>
            )}
            {status === "success" && (
              <a href="/signin">
                <Button className="w-full rounded cursor-pointer">
                  Sign In
                </Button>
              </a>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
