"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ENDPOINTS } from "../../../../utils/api";

const PolicyList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(ENDPOINTS.BLOGS); // ✅ replace LOGIN with your actual blogs endpoint
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          📰 Blog Management Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Manage, edit, and update all your policy or blog documents from here.
        </p>
        <Link href="/dashboard/blog/newblog">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-blue-800 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Add New Blog
          </motion.button>
        </Link>
      </div>

      {/* Blog Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative w-full h-40">
              <img
                src={p.image || "/placeholder.jpg"} // fallback
                alt={p.title}
                fill
                 className="w-full h-48 object-cover rounded-t-lg"
                
              />
            </div>

            <div className="p-6 flex flex-col justify-between h-40">
              <h2 className="font-semibold text-lg text-gray-800 mb-2">
                {p.title}
              </h2>

              <div className="flex justify-between items-center mt-auto">
                
                <Link href={`/dashboard/blog/${p.id}/editblog`}>
                  <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-700">
          Company Policy Dashboard
        </span>
        . All rights reserved.
      </footer>
    </div>
  );
};

export default PolicyList;
