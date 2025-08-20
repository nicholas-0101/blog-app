"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function PreVerifyPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

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
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md text-center flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-2">Account registered</h1>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Please check your email to verify your account
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
