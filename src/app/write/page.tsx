"use client";
import React from "react";
import Navbar from "../coreComponents/navbar";
import { Button } from "@/components/ui/button";
import { useAccountStore } from "@/lib/store/accountStore";
import Tab from "../coreComponents/tab-write";

export default function WritePage() {
  return (
    <div className="min-h-screen bg-white pb-10">
      <section className="text-center mt-24 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Write Your Story
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Create new posts or manage your existing content
        </p>
        <div className="w-full flex justify-center">
          <div className="w-[1016px]">
            <Tab />
          </div>
        </div>
      </section>
    </div>
  );
}
