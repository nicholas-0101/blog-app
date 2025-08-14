"use client";
import React from "react";
import Navbar from "./coreComponents/navbar";
import { Button } from "@/components/ui/button";
import { useAccountStore } from "@/lib/store/accountStore";

export default function HomePage() {
  const account = useAccountStore((state) => state.account);

  return (
    <div className="min-h-screen bg-white pb-10">
      {/* home */}
      <section className="text-center mt-24 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Share Your Stories
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          A modern blogging platform designed for writers who value simplicity
          and beautiful content presentation.
        </p>

        {account ? (
          <div className="flex justify-center gap-4">
            {/* if signed in, shows button "create blog", redirect to "/create" */}
            <a href="/write">
              <Button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 w-35 cursor-pointer">
                Create Blog
              </Button>
            </a>
            <a href="/explore">
              <Button
                variant={"outline"}
                className="border border-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 w-35 cursor-pointer"
              >
                Explore More
              </Button>
            </a>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            {/* if havent sign in, shows "get started" button and redirect to "/signup" */}
            <a href="/signup">
              <Button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 w-35 cursor-pointer">
                Get Started
              </Button>
            </a>
            {/* if havent sign in, shows "explore more" button and redirect to "/explore" */}
            <a href="/explore">
              <Button
                variant={"outline"}
                className="border border-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 w-35 cursor-pointer"
              >
                Explore More
              </Button>
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
