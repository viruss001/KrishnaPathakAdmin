"use client";
import React from "react";
import { User } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[92vh] bg-linear-to-br from-blue-50 to-blue-100 text-gray-800 rounded-2xl">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-900 text-white p-4 rounded-full">
            <User className="w-10 h-10" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">Welcome, Admin!</h1>
        <p className="text-gray-600 mb-6">
          Great to see you back 👋 <br />
          Manage your dashboard and keep everything running smoothly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href=""
            className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Go to Home Section
          </a>
          <a
            href=""
            className="border border-blue-900 text-blue-900 px-5 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Manage Blogs
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
