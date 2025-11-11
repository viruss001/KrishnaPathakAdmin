"use client";
import React from "react";
import { Construction } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl min-h-screen bg-gray-50 text-gray-800">
      <Construction className="w-12 h-12 text-yellow-500 mb-4" />
      <h1 className="text-2xl font-semibold">🚧 This Page is Under Construction</h1>
      <p className="mt-2 text-gray-500 text-center">
        We’re working hard to bring you something awesome. Check back soon!
      </p>
    </div>
  );
};

export default Page;
